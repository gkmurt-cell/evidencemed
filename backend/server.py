from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
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
        "created_at": user.get("created_at", "")
    }

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
