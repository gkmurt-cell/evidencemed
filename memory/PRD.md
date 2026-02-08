# EvidenceMed - Institutional Research Archive

## Original Problem Statement
Transform the EvidenceMed build from Lovable into a high-authority Institutional Archive:
- DELETE all affiliate links, marketing pop-ups, and 'salesy' CTA buttons
- SIMPLIFY navigation to focus on 'Research,' 'Methodology,' and 'Member Resources'
- RETAIN medical/clinical aesthetic with academic palette (grays, navy, white)
- Remove Lovable-specific wrapper scripts
- STYLIZE 'Resources' page as clean, text-based bibliography
- Simple headings without icons (no tiles)
- Member Resources requires authentication

## User Personas
1. **Researchers & Academics** - Seeking peer-reviewed studies on integrative medicine
2. **Healthcare Practitioners** - Looking for evidence-based complementary therapy information
3. **Students** - Studying integrative medicine and natural compounds
4. **Institutional Libraries** - Curating trusted resources for their collections

## Core Requirements (Static)
- Clean, academic design without marketing elements
- Simplified navigation: Research, Methodology, Member Resources
- JWT-based authentication for Member Resources
- Live PubMed search integration via NIH E-utilities API
- Curated bibliography of trusted databases, journals, and organizations
- Mobile-responsive design
- No affiliate links or promotional content

## Architecture
- **Frontend**: React (CRA), TailwindCSS, shadcn/ui components
- **Backend**: FastAPI (Python), MongoDB (Motor async driver)
- **Authentication**: JWT tokens with bcrypt password hashing
- **External API**: NIH E-utilities (PubMed/NCBI) for live research search

## What's Been Implemented

### Phase 1 (Jan 2026)
- ✅ Removed all marketing components (CTASection, PricingSection, TrialSignupSection, etc.)
- ✅ Removed Lovable-specific wrapper scripts (visual-edits plugin disabled)
- ✅ Simplified navigation to Research, Methodology, Member Resources
- ✅ Applied academic palette design
- ✅ Simplified headings without icons
- ✅ Member Resources requires authentication

### Phase 2 (Jan 2026)
- ✅ Real backend JWT authentication (register/login APIs)
- ✅ Live PubMed search integration via NIH E-utilities API
- ✅ Expanded bibliography with 20 trusted resources:
  - 6 Databases (PubMed Central, Cochrane, Natural Medicines, MSK Herbs, Examine, ConsumerLab)
  - 4 Research Institutions (NIH NCCIH, Arizona, Duke, Cleveland Clinic)
  - 6 Peer-Reviewed Journals
  - 4 Professional Organizations

### Phase 3 (Jan 2026)
- ✅ Removed demo data tabs from Research page
- ✅ Research Alerts feature implemented:
  - Save search queries as alerts
  - Toggle alerts on/off
  - Delete alerts
  - Stored in localStorage
  - Visual feedback for active alerts
- ✅ Quick Browse by Topic with 10 popular research topics
- ✅ Additional Research Databases section with external links

### Phase 4 (Jan 2026) - Institutional & High-Authority Features
- ✅ Removed all "Demo Data" disclaimers from homepage sections
- ✅ Practitioner Repository page (/practitioner-repository):
  - Professional-grade supplement suppliers (Fullscript, Wellevate, Natural Partners)
  - Retail supplement sources (iHerb, Amazon, Thorne, Pure Encapsulations)
  - Botanical suppliers (Mountain Rose Herbs, Herb Pharm, Gaia Herbs)
  - Reference Library with clinical textbooks (ISBNs included)
  - Peer-reviewed journal list with impact factors
- ✅ Institutional Access page (/institutional-access):
  - Information for academic medical centers, hospitals, research organizations
  - Editorial standards and compliance information
  - Enterprise access features (IP Auth, SSO, API, LTI)
- ✅ Institutional Pricing page (/institutional-pricing):
  - Individual plans: Starter ($5/mo), Professional ($19/mo), Institution (Custom)
  - User-based institutional tiers: Starter (1-10), Standard (11-50), Enterprise (51+)
  - Feature comparison table
  - 7-day free trial for Professional plan
  - Trial signup form connected to backend API
  - Page has noindex for subtle discovery
- ✅ Footer updated with "Institutions" section
- ✅ Member Resources links to Practitioner Repository (subtle)

### Phase 5 (Jan 2026) - Backend APIs & Weekly Digest
- ✅ Backend API endpoints added:
  - POST /api/institutional/trial-request - Store institutional trial requests
  - POST /api/digest/subscribe - Subscribe to weekly research digest
  - DELETE /api/digest/unsubscribe - Unsubscribe from digest
  - POST /api/alerts - Create research alerts (backend storage)
  - GET /api/alerts - Get user's research alerts
  - DELETE /api/alerts/{id} - Delete research alert
- ✅ Weekly Research Digest subscription form on Research page
- ✅ Trial signup form connected to real backend API
- ✅ All forms show proper success/error feedback

### Phase 6 (Feb 2026) - Admin Dashboard & Invite Code System
- ✅ Admin Dashboard page (/admin) with restricted access
- ✅ Invite Code System for controlled user registration:
  - POST /api/admin/invite-codes - Generate invite codes
  - GET /api/admin/invite-codes - List all invite codes
  - DELETE /api/admin/invite-codes/{id} - Delete invite codes
  - GET /api/admin/validate-invite-code?code=XXX - Validate codes
  - POST /api/auth/register-with-invite - Register with invite code
- ✅ Invite codes support:
  - Email assignment (optional)
  - Institution name
  - Tier selection (starter, standard, enterprise)
  - Trial days (7, 14, 30)
  - Automatic expiration dates
  - Used/Pending status tracking
- ✅ Admin Dashboard features:
  - Generate Invite Code form with all options
  - Active Invite Codes table with copy/send/delete actions
  - Trial Requests section with quick "Create Invite" buttons
- ✅ Auth page updated for invite-only registration:
  - Invite code field with real-time validation
  - Shows code validity, tier, trial days, and institution
  - Disabled submit until code is valid
- ✅ Email Notification System (Resend integration):
  - Welcome email sent to users upon registration with invite code
  - Admin notification email sent when new trial requests are submitted
  - Non-blocking async email sending
- ✅ Fixed duplicate Legal sections in footer

### Phase 7 (Feb 2026) - Complete Backlog Implementation
- ✅ Password Reset Flow:
  - POST /api/auth/forgot-password - Send reset link
  - POST /api/auth/reset-password - Update password with token
  - Frontend forgot password / reset password UI in Auth page
  - Tokens expire in 1 hour
- ✅ Email Verification:
  - POST /api/auth/send-verification - Send verification email
  - POST /api/auth/verify-email - Verify with token
  - User email_verified flag in database
- ✅ PubMed Search Filters:
  - date_from and date_to year filters
  - study_type filter (RCT, Clinical Trial, Meta-Analysis, Review, Observational, Case Report)
  - Collapsible filter panel in search UI
  - Apply/Clear filters functionality
- ✅ Weekly Research Digest:
  - GET /api/digest/preview - Preview digest content
  - POST /api/digest/send-test - Send test digest email
  - POST /api/digest/send-all - Send to all subscribers (for scheduled jobs)
  - Email templates with article summaries
- ✅ Admin Dashboard Weekly Digest Section:
  - Digest Preview panel with Load Preview button
  - Shows topic, article count, and generation timestamp
  - Article list with titles, authors, journals, and PubMed links
  - Send Test Digest to specific email
  - Broadcast Digest to all subscribers button
  - Schedule indicator (Monday 9:00 AM UTC)
- ✅ Cron Job Scripts:
  - /app/backend/cron/weekly_digest.py - Python cron script
  - /app/backend/scripts/send_weekly_digest.sh - Bash script for external schedulers
- ✅ Fixed duplicate Legal sections in footer
- ✅ Cleaned up old /app/src folder (leftover from Vite migration)

## API Endpoints
- `POST /api/auth/register` - User registration (open)
- `POST /api/auth/register-with-invite` - Register with invite code
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (with token)
- `GET /api/pubmed/search` - Search PubMed database
- `POST /api/admin/invite-codes` - Create invite code (admin)
- `GET /api/admin/invite-codes` - List invite codes (admin)
- `DELETE /api/admin/invite-codes/{id}` - Delete invite code (admin)
- `GET /api/admin/validate-invite-code` - Validate invite code

## Prioritized Backlog

### P0 (Critical)
- None - All critical features implemented ✅

### P1 (High Priority)  
- All completed ✅

### P2 (Medium Priority)
- All completed ✅

### P3 (Low Priority/Future)
- Collaborative annotation feature
- Advanced analytics dashboard
- API access documentation page for institutions
- Mobile app version

## All Features Complete
- ✅ Institutional archive transformation
- ✅ JWT authentication with invite codes
- ✅ Live PubMed search with filters
- ✅ Research Alerts
- ✅ Weekly Research Digest with admin controls
- ✅ Admin Dashboard with invite code system
- ✅ Password reset & email verification
- ✅ User Profile with saved articles & search history
- ✅ Citation export (BibTeX, RIS, APA)
- ✅ Social sharing (Twitter, LinkedIn, Email)
- ✅ Rate limiting on API endpoints
