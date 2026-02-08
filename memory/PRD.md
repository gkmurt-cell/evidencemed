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
- None currently

### P1 (High Priority)
- Add password reset functionality
- Implement email verification for new accounts
- Add rate limiting for API endpoints
- Connect Research Alerts to backend for email notifications

### P2 (Medium Priority)
- Implement user profile with saved articles
- Add citation export (BibTeX, RIS, APA)
- Add search filters for PubMed (date range, study type)

### P3 (Low Priority/Future)
- Social sharing for research articles
- Collaborative annotation feature
- API access for institutional partners

## Next Tasks
1. Implement password reset flow with email
2. Add more filtering options for PubMed search (date range, study type)
3. Create user dashboard with search history
