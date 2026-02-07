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

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (with token)
- `GET /api/pubmed/search` - Search PubMed database

## Prioritized Backlog

### P0 (Critical)
- None currently

### P1 (High Priority)
- Add password reset functionality
- Implement email verification for new accounts
- Add rate limiting for API endpoints

### P2 (Medium Priority)
- Add "Research Alerts" feature for saved searches
- Implement user profile with saved articles
- Add citation export (BibTeX, RIS, APA)

### P3 (Low Priority/Future)
- Social sharing for research articles
- Collaborative annotation feature
- API access for institutional partners

## Next Tasks
1. Implement password reset flow with email
2. Add more filtering options for PubMed search (date range, study type)
3. Create user dashboard with search history
