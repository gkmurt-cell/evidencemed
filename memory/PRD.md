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

### Phase 8 (Feb 2026) - Complete Remaining Backlog
- ✅ Rate Limiting:
  - 5 requests/minute on /api/auth/register
  - 10 requests/minute on /api/auth/login
  - 30 requests/minute on /api/pubmed/search
  - Uses slowapi library with proper error handling
- ✅ User Profile Page (/profile):
  - User avatar with email and verification status
  - Stats cards: Saved Articles, Total Searches, Member Since, Last Search
  - Tabbed interface: Saved Articles | Search History
  - Delete individual items or clear all history
  - Links to re-run searches from history
- ✅ Search History Tracking:
  - POST /api/user/search-history - Add search entry
  - DELETE /api/user/search-history/{id} - Remove entry
  - DELETE /api/user/search-history - Clear all
  - Stores query, filters, results count, timestamp
- ✅ Saved Articles:
  - POST /api/user/saved-articles - Save article
  - DELETE /api/user/saved-articles/{pmid} - Remove article
  - GET /api/user/saved-articles - List all saved
  - Save button on every article card
- ✅ Citation Export (BibTeX, RIS, APA):
  - Copy to clipboard: APA, BibTeX, RIS formats
  - Download files: .bib and .ris formats
  - Dropdown menu on each article card
- ✅ Social Sharing:
  - Twitter share with article title and link
  - LinkedIn share
  - Email share with subject and body
  - Copy link to clipboard
  - Dropdown menu on each article card
- ✅ Navbar Profile Link:
  - User dropdown shows "My Profile" link
  - Direct access to /profile page

### Phase 9 (Feb 2026) - Mobile App (PWA)
- ✅ Progressive Web App (PWA) Configuration:
  - manifest.json with app metadata and icons
  - Service worker for offline support and caching
  - Install prompt component for mobile users
  - Apple touch icons and meta tags
- ✅ PWA Features:
  - Add to home screen functionality
  - Standalone display mode (no browser UI)
  - Offline page caching (static assets)
  - App shortcuts: Search, Compounds, Profile
  - Push notification support ready (for research alerts)
- ✅ Mobile-Optimized UI:
  - Responsive design across all pages
  - Touch-friendly buttons and interactions
  - Mobile navigation with hamburger menu
  - Optimized viewport settings
- ✅ Fixed Footer: Single Legal section (Medical Disclaimer, Privacy, Terms)

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
- Automated Weekly Digest scheduling (requires external cron service)

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
- ✅ PWA (Progressive Web App) for mobile installation
- ✅ Fuzzy search/spell correction on PubMed search
- ✅ Compact UI with reduced padding for fast scrolling

### Phase 10 (Feb 2026) - Fuzzy Search & UI Refinements
- ✅ Fuzzy Search/Spell Correction:
  - Backend: `get_spell_suggestion()` function using `thefuzz` library
  - Medical terms dictionary with 100+ common compounds, conditions, and study types
  - Shows "Did you mean: [suggestion]?" when misspellings detected
  - Clicking suggestion updates search query and performs new search
  - Only suggests when results < 50 or no results found
  - Score threshold 60-95 to avoid identical or very different suggestions
- ✅ Compact UI for Fast Scrolling:
  - /compounds page:
    - Hero section: py-16 lg:py-24 → py-8 lg:py-12
    - Compound cards: p-6 → p-4
    - Filter section: p-3 → p-2
    - Grid gaps reduced throughout
    - "Most Researched" cards: more compact with smaller text
  - /compound/:id detail pages:
    - Stats card: p-6 → p-4
    - All content sections: p-6 → p-4
    - Safety notes and interactions: more compact
    - Font sizes reduced for better information density
    - Border radius: rounded-xl → rounded-lg
- ✅ Better laptop/desktop UX - users can see more content without excessive scrolling

### Phase 11 (Feb 2026) - AI-Powered Search & Additional Features
- ✅ Spell Correction on ALL Search Bars:
  - Compounds page: Client-side Levenshtein distance algorithm
  - PubMed search: Server-side `thefuzz` library with medical terms dictionary
  - Shows "Did you mean: [suggestion]?" for both search types
- ✅ iHerb Added to Member Resources:
  - Added as "Dispensary" type resource
  - URL: https://www.iherb.com/
  - Description: Global retailer for supplements with third-party testing
- ✅ Research Page Background Image:
  - Hero section now shows visible background image
  - Gradient overlay: from-background/95 via-background/85 to-background/70
- ✅ AI-Powered Search Fallback (GPT-5.2):
  - Integration: OpenAI GPT-5.2 via Emergent LLM Key
  - Trigger: Appears when PubMed returns < 20 results
  - Features:
    - AI summary of the research topic
    - Suggested alternative search terms (clickable buttons)
    - Related research topics (clickable badges)
  - Disclaimer: "AI-generated information should be verified with primary sources"
  - Badge: "Powered by GPT-5.2"

