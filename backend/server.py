from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Annotated
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'evidencemed-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Email Configuration (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@evidencemed.com')

# Initialize Resend if API key is available
resend_client = None
if RESEND_API_KEY:
    try:
        import resend
        resend.api_key = RESEND_API_KEY
        resend_client = resend
        logging.info("Resend email client initialized")
    except ImportError:
        logging.warning("Resend library not installed, email notifications disabled")

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ====================
# Pydantic Models
# ====================

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    created_at: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# PubMed Models
class PubMedArticle(BaseModel):
    pmid: str
    title: str
    authors: List[str]
    journal: str
    year: str
    abstract: str
    doi: Optional[str] = None
    pmcid: Optional[str] = None
    pubmed_url: str

class PubMedSearchResponse(BaseModel):
    articles: List[PubMedArticle]
    total_count: int
    query: str

# Institutional Trial Request Model
class InstitutionalTrialRequest(BaseModel):
    institution_name: str
    institution_type: Optional[str] = None
    department: Optional[str] = None
    contact_name: str
    contact_email: EmailStr
    number_of_users: str
    message: Optional[str] = None

class InstitutionalTrialResponse(BaseModel):
    id: str
    institution_name: str
    contact_email: str
    status: str
    created_at: str

# Research Digest Subscription Model
class ResearchDigestSubscription(BaseModel):
    email: EmailStr
    frequency: str = "weekly"  # weekly, daily
    topics: List[str] = []

class ResearchDigestResponse(BaseModel):
    id: str
    email: str
    frequency: str
    topics: List[str]
    status: str
    created_at: str

# Research Alert Model (for backend storage)
class ResearchAlertCreate(BaseModel):
    query: str

class ResearchAlertResponse(BaseModel):
    id: str
    user_id: str
    query: str
    enabled: bool
    created_at: str

# Invite Code Models
class InviteCodeCreate(BaseModel):
    email: Optional[EmailStr] = None
    institution_name: Optional[str] = None
    tier: str = "starter"
    trial_days: int = 7

class InviteCodeResponse(BaseModel):
    id: str
    code: str
    email: Optional[str] = None
    institution_name: Optional[str] = None
    tier: str
    trial_days: int
    used: bool
    used_by: Optional[str] = None
    created_at: str
    expires_at: str

# Password Reset Models
class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str = Field(..., min_length=6)

# Email Verification Models
class EmailVerificationRequest(BaseModel):
    token: str

# PubMed Search with Filters
class PubMedSearchFilters(BaseModel):
    query: str
    date_from: Optional[str] = None  # YYYY/MM/DD format
    date_to: Optional[str] = None
    study_type: Optional[str] = None  # clinical_trial, meta_analysis, review, randomized_controlled_trial
    max_results: int = 20

# Weekly Digest Models
class DigestPreview(BaseModel):
    articles: List[dict]
    topic: str
    generated_at: str

# ====================
# Auth Utilities
# ====================

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ====================
# Email Utilities
# ====================

async def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """Send email using Resend API (non-blocking)"""
    if not resend_client:
        logger.warning(f"Email not sent (no API key): {subject} to {to_email}")
        return False
    
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [to_email],
            "subject": subject,
            "html": html_content
        }
        await asyncio.to_thread(resend_client.Emails.send, params)
        logger.info(f"Email sent: {subject} to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

async def send_welcome_email(user_email: str, institution_name: Optional[str] = None, tier: str = "starter"):
    """Send welcome email to new user"""
    institution_text = f" on behalf of <strong>{institution_name}</strong>" if institution_name else ""
    
    html_content = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 50px; height: 50px; background-color: #1e3a5f; border-radius: 8px; line-height: 50px; color: white; font-size: 24px; font-weight: bold;">E</div>
            <h1 style="color: #1e3a5f; margin: 10px 0 0 0;">EvidenceMed Archive</h1>
        </div>
        
        <h2 style="color: #333;">Welcome to EvidenceMed</h2>
        
        <p style="color: #555; line-height: 1.6;">
            Your account has been successfully created{institution_text}. You now have access to our institutional research archive 
            featuring evidence-based research on integrative and complementary medicine.
        </p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Account Details:</strong></p>
            <p style="margin: 5px 0; color: #555;">Email: {user_email}</p>
            <p style="margin: 5px 0; color: #555;">Tier: {tier.capitalize()}</p>
        </div>
        
        <p style="color: #555; line-height: 1.6;">
            <strong>What you can access:</strong>
        </p>
        <ul style="color: #555; line-height: 1.8;">
            <li>Live PubMed research search</li>
            <li>Curated bibliography of trusted resources</li>
            <li>Member-only research alerts</li>
            <li>Practitioner repository</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://medresearch-4.preview.emergentagent.com/member-resources" 
               style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Access Member Resources
            </a>
        </div>
        
        <p style="color: #888; font-size: 12px; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            © {datetime.now().year} EvidenceMed Archive. All rights reserved.<br>
            This email was sent because you registered for an EvidenceMed account.
        </p>
    </div>
    """
    
    await send_email(user_email, "Welcome to EvidenceMed Archive", html_content)

async def send_admin_notification_trial_request(request_data: dict):
    """Send notification to admin when new trial request is submitted"""
    html_content = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 50px; height: 50px; background-color: #1e3a5f; border-radius: 8px; line-height: 50px; color: white; font-size: 24px; font-weight: bold;">E</div>
            <h1 style="color: #1e3a5f; margin: 10px 0 0 0;">EvidenceMed Admin</h1>
        </div>
        
        <h2 style="color: #333;">New Trial Request</h2>
        
        <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e3a5f;">
            <p style="margin: 0 0 10px 0; color: #333;"><strong>Institution:</strong> {request_data.get('institution_name', 'N/A')}</p>
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Type:</strong> {request_data.get('institution_type', 'N/A')}</p>
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Department:</strong> {request_data.get('department', 'N/A')}</p>
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Contact:</strong> {request_data.get('contact_name', 'N/A')}</p>
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Email:</strong> {request_data.get('contact_email', 'N/A')}</p>
            <p style="margin: 0 0 10px 0; color: #555;"><strong>Users:</strong> {request_data.get('number_of_users', 'N/A')}</p>
            {f"<p style='margin: 0; color: #555;'><strong>Message:</strong> {request_data.get('message')}</p>" if request_data.get('message') else ""}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://medresearch-4.preview.emergentagent.com/admin" 
               style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Go to Admin Dashboard
            </a>
        </div>
        
        <p style="color: #888; font-size: 12px; text-align: center;">
            Submitted: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}
        </p>
    </div>
    """
    
    await send_email(ADMIN_EMAIL, f"New Trial Request: {request_data.get('institution_name', 'Unknown')}", html_content)

async def send_password_reset_email(user_email: str, reset_token: str):
    """Send password reset email"""
    reset_url = f"https://medresearch-4.preview.emergentagent.com/auth?reset_token={reset_token}"
    
    html_content = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 50px; height: 50px; background-color: #1e3a5f; border-radius: 8px; line-height: 50px; color: white; font-size: 24px; font-weight: bold;">E</div>
            <h1 style="color: #1e3a5f; margin: 10px 0 0 0;">EvidenceMed Archive</h1>
        </div>
        
        <h2 style="color: #333;">Password Reset Request</h2>
        
        <p style="color: #555; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password.
            This link will expire in 1 hour.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{reset_url}" 
               style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reset Password
            </a>
        </div>
        
        <p style="color: #888; font-size: 12px;">
            If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
        </p>
        
        <p style="color: #888; font-size: 12px; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            © {datetime.now().year} EvidenceMed Archive. All rights reserved.
        </p>
    </div>
    """
    
    await send_email(user_email, "Reset Your EvidenceMed Password", html_content)

async def send_verification_email(user_email: str, verification_token: str):
    """Send email verification"""
    verify_url = f"https://medresearch-4.preview.emergentagent.com/auth?verify_token={verification_token}"
    
    html_content = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 50px; height: 50px; background-color: #1e3a5f; border-radius: 8px; line-height: 50px; color: white; font-size: 24px; font-weight: bold;">E</div>
            <h1 style="color: #1e3a5f; margin: 10px 0 0 0;">EvidenceMed Archive</h1>
        </div>
        
        <h2 style="color: #333;">Verify Your Email</h2>
        
        <p style="color: #555; line-height: 1.6;">
            Thank you for registering! Please verify your email address by clicking the button below.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{verify_url}" 
               style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Verify Email
            </a>
        </div>
        
        <p style="color: #888; font-size: 12px; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            © {datetime.now().year} EvidenceMed Archive. All rights reserved.
        </p>
    </div>
    """
    
    await send_email(user_email, "Verify Your EvidenceMed Email", html_content)

async def send_weekly_digest_email(subscriber_email: str, articles: list, topic: str = "Integrative Medicine"):
    """Send weekly research digest email"""
    articles_html = ""
    for article in articles[:10]:  # Limit to 10 articles
        articles_html += f"""
        <div style="border-bottom: 1px solid #eee; padding: 15px 0;">
            <h3 style="margin: 0 0 8px 0; color: #1e3a5f; font-size: 16px;">
                <a href="{article.get('pubmed_url', '#')}" style="color: #1e3a5f; text-decoration: none;">
                    {article.get('title', 'Untitled')}
                </a>
            </h3>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 13px;">
                {', '.join(article.get('authors', ['Unknown'])[:3])} - {article.get('journal', 'Unknown Journal')} ({article.get('year', '')})
            </p>
            <p style="margin: 0; color: #888; font-size: 12px; line-height: 1.5;">
                {article.get('abstract', '')[:200]}...
            </p>
        </div>
        """
    
    html_content = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 50px; height: 50px; background-color: #1e3a5f; border-radius: 8px; line-height: 50px; color: white; font-size: 24px; font-weight: bold;">E</div>
            <h1 style="color: #1e3a5f; margin: 10px 0 0 0;">EvidenceMed Weekly Digest</h1>
        </div>
        
        <p style="color: #555; line-height: 1.6; text-align: center;">
            Your weekly roundup of the latest research in {topic}
        </p>
        
        <div style="margin: 20px 0;">
            {articles_html}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://medresearch-4.preview.emergentagent.com/research" 
               style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Explore More Research
            </a>
        </div>
        
        <p style="color: #888; font-size: 11px; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            You're receiving this because you subscribed to EvidenceMed Weekly Digest.<br>
            <a href="https://medresearch-4.preview.emergentagent.com/unsubscribe" style="color: #888;">Unsubscribe</a>
        </p>
    </div>
    """
    
    await send_email(subscriber_email, f"Weekly Research Digest: {topic}", html_content)

# ====================
# Auth Routes
# ====================

@api_router.post("/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    created_at = datetime.now(timezone.utc).isoformat()
    
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "hashed_password": hashed_password,
        "created_at": created_at,
        "is_active": True
    }
    
    await db.users.insert_one(user_doc)
    
    # Create token
    access_token = create_access_token(data={"sub": user_id, "email": user_data.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user_data.email,
            "created_at": created_at
        }
    }

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """Login user"""
    user = await db.users.find_one({"email": user_data.email})
    
    if not user or not verify_password(user_data.password, user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )
    
    access_token = create_access_token(data={"sub": user["id"], "email": user["email"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "created_at": user.get("created_at", "")
        }
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user(token: str):
    """Get current user from token"""
    payload = verify_token(token)
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"id": user_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user["id"],
        "email": user["email"],
        "created_at": user.get("created_at", ""),
        "email_verified": user.get("email_verified", False)
    }

# ====================
# Password Reset Routes
# ====================

@api_router.post("/auth/forgot-password")
async def forgot_password(data: PasswordResetRequest):
    """Request a password reset email"""
    user = await db.users.find_one({"email": data.email})
    
    # Always return success to prevent email enumeration
    if not user:
        return {"message": "If an account exists with this email, you will receive a password reset link."}
    
    # Generate reset token
    reset_token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
    
    # Store reset token
    await db.password_resets.insert_one({
        "user_id": user["id"],
        "email": data.email,
        "token": reset_token,
        "expires_at": expires_at.isoformat(),
        "used": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # Send reset email (non-blocking)
    asyncio.create_task(send_password_reset_email(data.email, reset_token))
    
    logger.info(f"Password reset requested for: {data.email}")
    
    return {"message": "If an account exists with this email, you will receive a password reset link."}

@api_router.post("/auth/reset-password")
async def reset_password(data: PasswordResetConfirm):
    """Reset password using token"""
    # Find valid reset token
    reset_doc = await db.password_resets.find_one({
        "token": data.token,
        "used": False
    })
    
    if not reset_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check expiration
    expires_at = datetime.fromisoformat(reset_doc["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Update user password
    new_hash = get_password_hash(data.new_password)
    await db.users.update_one(
        {"id": reset_doc["user_id"]},
        {"$set": {"hashed_password": new_hash, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    # Mark token as used
    await db.password_resets.update_one(
        {"token": data.token},
        {"$set": {"used": True, "used_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    logger.info(f"Password reset completed for user: {reset_doc['user_id']}")
    
    return {"message": "Password has been reset successfully"}

# ====================
# Email Verification Routes
# ====================

@api_router.post("/auth/send-verification")
async def send_verification(token: str):
    """Send email verification to current user"""
    payload = verify_token(token)
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("email_verified"):
        return {"message": "Email already verified"}
    
    # Generate verification token
    verification_token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(hours=24)
    
    # Store verification token
    await db.email_verifications.update_one(
        {"user_id": user_id},
        {"$set": {
            "user_id": user_id,
            "email": user["email"],
            "token": verification_token,
            "expires_at": expires_at.isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat()
        }},
        upsert=True
    )
    
    # Send verification email
    asyncio.create_task(send_verification_email(user["email"], verification_token))
    
    return {"message": "Verification email sent"}

@api_router.post("/auth/verify-email")
async def verify_email(data: EmailVerificationRequest):
    """Verify email using token"""
    verification = await db.email_verifications.find_one({"token": data.token})
    
    if not verification:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    
    expires_at = datetime.fromisoformat(verification["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Verification token has expired")
    
    # Update user
    await db.users.update_one(
        {"id": verification["user_id"]},
        {"$set": {"email_verified": True, "verified_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    # Delete verification token
    await db.email_verifications.delete_one({"token": data.token})
    
    logger.info(f"Email verified for user: {verification['user_id']}")
    
    return {"message": "Email verified successfully"}

# ====================
# PubMed Search Routes
# ====================

@api_router.get("/pubmed/search", response_model=PubMedSearchResponse)
async def search_pubmed(query: str, max_results: int = 20):
    """Search PubMed database using NCBI E-utilities API"""
    
    if not query.strip():
        return {"articles": [], "total_count": 0, "query": query}
    
    try:
        # Step 1: Search for article IDs
        search_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
        search_params = {
            "db": "pubmed",
            "term": query,
            "retmax": max_results,
            "retmode": "json",
            "sort": "relevance"
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            search_response = await client.get(search_url, params=search_params)
            search_data = search_response.json()
        
        id_list = search_data.get("esearchresult", {}).get("idlist", [])
        total_count = int(search_data.get("esearchresult", {}).get("count", 0))
        
        if not id_list:
            return {"articles": [], "total_count": 0, "query": query}
        
        # Step 2: Fetch article details
        fetch_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
        fetch_params = {
            "db": "pubmed",
            "id": ",".join(id_list),
            "retmode": "xml"
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            fetch_response = await client.get(fetch_url, params=fetch_params)
            xml_content = fetch_response.text
        
        # Parse XML response
        articles = parse_pubmed_xml(xml_content)
        
        return {
            "articles": articles,
            "total_count": total_count,
            "query": query
        }
        
    except Exception as e:
        logger.error(f"PubMed search error: {e}")
        raise HTTPException(status_code=500, detail=f"PubMed search failed: {str(e)}")

def parse_pubmed_xml(xml_content: str) -> List[dict]:
    """Parse PubMed XML response into article list"""
    import xml.etree.ElementTree as ET
    
    articles = []
    
    try:
        root = ET.fromstring(xml_content)
        
        for article in root.findall(".//PubmedArticle"):
            pmid = article.findtext(".//PMID", "")
            
            # Title
            title_elem = article.find(".//ArticleTitle")
            title = "".join(title_elem.itertext()) if title_elem is not None else "No title"
            
            # Authors
            authors = []
            for author in article.findall(".//Author"):
                last_name = author.findtext("LastName", "")
                fore_name = author.findtext("ForeName", "")
                if last_name:
                    authors.append(f"{last_name} {fore_name}".strip())
            
            # Journal
            journal = article.findtext(".//Journal/Title", "")
            if not journal:
                journal = article.findtext(".//ISOAbbreviation", "Unknown Journal")
            
            # Year
            year = article.findtext(".//PubDate/Year", "")
            if not year:
                medline_date = article.findtext(".//PubDate/MedlineDate", "")
                year = medline_date[:4] if medline_date else ""
            
            # Abstract
            abstract_parts = []
            for abstract_text in article.findall(".//AbstractText"):
                label = abstract_text.get("Label", "")
                text = "".join(abstract_text.itertext())
                if label:
                    abstract_parts.append(f"{label}: {text}")
                else:
                    abstract_parts.append(text)
            abstract = " ".join(abstract_parts) if abstract_parts else "No abstract available."
            
            # DOI
            doi = None
            for article_id in article.findall(".//ArticleId"):
                if article_id.get("IdType") == "doi":
                    doi = article_id.text
                    break
            
            # PMC ID
            pmcid = None
            for article_id in article.findall(".//ArticleId"):
                if article_id.get("IdType") == "pmc":
                    pmcid = article_id.text
                    break
            
            articles.append({
                "pmid": pmid,
                "title": title,
                "authors": authors[:5] if authors else ["Unknown"],
                "journal": journal,
                "year": year,
                "abstract": abstract[:1000] + "..." if len(abstract) > 1000 else abstract,
                "doi": doi,
                "pmcid": pmcid,
                "pubmed_url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
            })
        
    except ET.ParseError as e:
        logger.error(f"XML parsing error: {e}")
    
    return articles

# ====================
# Status Routes
# ====================

@api_router.get("/")
async def root():
    return {"message": "EvidenceMed API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# ====================
# Institutional Trial Routes
# ====================

@api_router.post("/institutional/trial-request", response_model=InstitutionalTrialResponse, status_code=status.HTTP_201_CREATED)
async def create_trial_request(request: InstitutionalTrialRequest):
    """Submit an institutional trial request"""
    trial_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    trial_doc = {
        "id": trial_id,
        "institution_name": request.institution_name,
        "institution_type": request.institution_type,
        "department": request.department,
        "contact_name": request.contact_name,
        "contact_email": request.contact_email,
        "number_of_users": request.number_of_users,
        "message": request.message,
        "status": "pending",
        "created_at": created_at
    }
    
    await db.trial_requests.insert_one(trial_doc)
    
    logger.info(f"New trial request from {request.institution_name} ({request.contact_email})")
    
    # Send admin notification email (non-blocking)
    asyncio.create_task(send_admin_notification_trial_request(trial_doc))
    
    return {
        "id": trial_id,
        "institution_name": request.institution_name,
        "contact_email": request.contact_email,
        "status": "pending",
        "created_at": created_at
    }

@api_router.get("/institutional/trial-requests")
async def get_trial_requests():
    """Get all trial requests (admin)"""
    requests = await db.trial_requests.find({}, {"_id": 0}).to_list(1000)
    return requests

# ====================
# Research Digest Routes
# ====================

@api_router.post("/digest/subscribe", response_model=ResearchDigestResponse, status_code=status.HTTP_201_CREATED)
async def subscribe_digest(subscription: ResearchDigestSubscription):
    """Subscribe to research digest emails"""
    # Check if already subscribed
    existing = await db.digest_subscriptions.find_one({"email": subscription.email})
    if existing:
        # Update existing subscription
        await db.digest_subscriptions.update_one(
            {"email": subscription.email},
            {"$set": {
                "frequency": subscription.frequency,
                "topics": subscription.topics,
                "status": "active",
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        return {
            "id": existing["id"],
            "email": subscription.email,
            "frequency": subscription.frequency,
            "topics": subscription.topics,
            "status": "active",
            "created_at": existing["created_at"]
        }
    
    # Create new subscription
    sub_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    sub_doc = {
        "id": sub_id,
        "email": subscription.email,
        "frequency": subscription.frequency,
        "topics": subscription.topics,
        "status": "active",
        "created_at": created_at
    }
    
    await db.digest_subscriptions.insert_one(sub_doc)
    
    logger.info(f"New digest subscription: {subscription.email} ({subscription.frequency})")
    
    return {
        "id": sub_id,
        "email": subscription.email,
        "frequency": subscription.frequency,
        "topics": subscription.topics,
        "status": "active",
        "created_at": created_at
    }

@api_router.delete("/digest/unsubscribe")
async def unsubscribe_digest(email: str):
    """Unsubscribe from research digest"""
    result = await db.digest_subscriptions.update_one(
        {"email": email},
        {"$set": {"status": "unsubscribed", "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Subscription not found")
    
    return {"message": "Successfully unsubscribed"}

# ====================
# Research Alerts Routes (Backend Storage)
# ====================

@api_router.post("/alerts", response_model=ResearchAlertResponse, status_code=status.HTTP_201_CREATED)
async def create_research_alert(alert: ResearchAlertCreate, token: str):
    """Create a research alert for a user"""
    payload = verify_token(token)
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Check if alert already exists
    existing = await db.research_alerts.find_one({"user_id": user_id, "query": alert.query})
    if existing:
        raise HTTPException(status_code=409, detail="Alert already exists for this query")
    
    alert_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    alert_doc = {
        "id": alert_id,
        "user_id": user_id,
        "query": alert.query,
        "enabled": True,
        "created_at": created_at
    }
    
    await db.research_alerts.insert_one(alert_doc)
    
    return {
        "id": alert_id,
        "user_id": user_id,
        "query": alert.query,
        "enabled": True,
        "created_at": created_at
    }

@api_router.get("/alerts")
async def get_user_alerts(token: str):
    """Get all alerts for a user"""
    payload = verify_token(token)
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    alerts = await db.research_alerts.find({"user_id": user_id}, {"_id": 0}).to_list(100)
    return alerts

@api_router.delete("/alerts/{alert_id}")
async def delete_research_alert(alert_id: str, token: str):
    """Delete a research alert"""
    payload = verify_token(token)
    user_id = payload.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    result = await db.research_alerts.delete_one({"id": alert_id, "user_id": user_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    return {"message": "Alert deleted"}

# ====================
# Admin Invite Code Routes
# ====================

def generate_invite_code_string() -> str:
    """Generate a random invite code"""
    import random
    import string
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=8))

class UserRegisterWithInvite(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    invite_code: str

@api_router.post("/admin/invite-codes", response_model=InviteCodeResponse, status_code=status.HTTP_201_CREATED)
async def create_invite_code(data: InviteCodeCreate):
    """Create a new invite code (admin only)"""
    code_id = str(uuid.uuid4())
    code_string = generate_invite_code_string()
    created_at = datetime.now(timezone.utc)
    expires_at = created_at + timedelta(days=data.trial_days)
    
    code_doc = {
        "id": code_id,
        "code": code_string,
        "email": data.email,
        "institution_name": data.institution_name,
        "tier": data.tier,
        "trial_days": data.trial_days,
        "used": False,
        "used_by": None,
        "created_at": created_at.isoformat(),
        "expires_at": expires_at.isoformat()
    }
    
    await db.invite_codes.insert_one(code_doc)
    
    logger.info(f"New invite code created: {code_string} for {data.email or data.institution_name or 'general'}")
    
    return {
        "id": code_id,
        "code": code_string,
        "email": data.email,
        "institution_name": data.institution_name,
        "tier": data.tier,
        "trial_days": data.trial_days,
        "used": False,
        "used_by": None,
        "created_at": created_at.isoformat(),
        "expires_at": expires_at.isoformat()
    }

@api_router.get("/admin/invite-codes", response_model=List[InviteCodeResponse])
async def get_invite_codes():
    """Get all invite codes (admin only)"""
    codes = await db.invite_codes.find({}, {"_id": 0}).to_list(1000)
    return codes

@api_router.delete("/admin/invite-codes/{code_id}")
async def delete_invite_code(code_id: str):
    """Delete an invite code (admin only)"""
    result = await db.invite_codes.delete_one({"id": code_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Invite code not found")
    
    return {"message": "Invite code deleted"}

@api_router.get("/admin/validate-invite-code")
async def validate_invite_code(code: str):
    """Validate an invite code without using it"""
    invite = await db.invite_codes.find_one({"code": code}, {"_id": 0})
    
    if not invite:
        raise HTTPException(status_code=404, detail="Invalid invite code")
    
    if invite.get("used"):
        raise HTTPException(status_code=400, detail="Invite code already used")
    
    expires_at = datetime.fromisoformat(invite["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Invite code has expired")
    
    return {
        "valid": True,
        "tier": invite.get("tier"),
        "trial_days": invite.get("trial_days"),
        "institution_name": invite.get("institution_name")
    }

@api_router.post("/auth/register-with-invite", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register_with_invite(user_data: UserRegisterWithInvite):
    """Register a new user with an invite code"""
    # Validate invite code first
    invite = await db.invite_codes.find_one({"code": user_data.invite_code})
    
    if not invite:
        raise HTTPException(status_code=400, detail="Invalid invite code")
    
    if invite.get("used"):
        raise HTTPException(status_code=400, detail="Invite code already used")
    
    expires_at = datetime.fromisoformat(invite["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Invite code has expired")
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    created_at = datetime.now(timezone.utc).isoformat()
    
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "hashed_password": hashed_password,
        "created_at": created_at,
        "is_active": True,
        "tier": invite.get("tier", "starter"),
        "institution_name": invite.get("institution_name"),
        "trial_expires_at": (datetime.now(timezone.utc) + timedelta(days=invite.get("trial_days", 7))).isoformat(),
        "role": "user"
    }
    
    await db.users.insert_one(user_doc)
    
    # Mark invite code as used
    await db.invite_codes.update_one(
        {"code": user_data.invite_code},
        {"$set": {"used": True, "used_by": user_id, "used_at": created_at}}
    )
    
    # Create token
    access_token = create_access_token(data={"sub": user_id, "email": user_data.email})
    
    logger.info(f"New user registered with invite code: {user_data.email}")
    
    # Send welcome email (non-blocking)
    asyncio.create_task(send_welcome_email(
        user_data.email, 
        invite.get("institution_name"), 
        invite.get("tier", "starter")
    ))
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user_data.email,
            "created_at": created_at
        }
    }

# Include the router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
