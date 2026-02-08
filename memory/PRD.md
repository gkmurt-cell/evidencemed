# EvidenceMed - Institutional Research Archive

## Original Problem Statement
Transform the 'EvidenceMed' build from Lovable platform into a high-authority Institutional Archive for alternative and complementary medicine research.

## Core Requirements
- Remove all affiliate links, marketing pop-ups, and 'salesy' CTA buttons
- Simplified navigation focusing on Research, Methodology, and Member Resources
- Retain medical/clinical aesthetic with lean codebase
- Resources page styled as clean, text-based bibliography
- Authentication required for "Member Resources" section

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui, PWA
- **Backend:** Python, FastAPI, MongoDB (motor)
- **Authentication:** JWT (python-jose)
- **API Integrations:** PubMed, Resend, OpenAI GPT-5.2
- **Search:** thefuzz, python-Levenshtein (fuzzy search)

## What's Been Implemented

### Core Features (Completed)
- [x] Full JWT-based authentication system
- [x] Admin Dashboard with invite code system
- [x] Live PubMed search with filters
- [x] Research Alerts for saved searches
- [x] User Profile with saved articles and search history
- [x] Citation export and social sharing
- [x] Fuzzy search/spell correction for all search bars
- [x] Progressive Web App (PWA)
- [x] AI-powered search assistant (GPT-5.2) for low-result queries
- [x] Practitioner Verification system with badges
- [x] Compound annotations by verified practitioners
- [x] Public Practitioner Directory
- [x] Weekly Research Digest subscription

### Pages (Completed)
- [x] Home/Index
- [x] Research Library
- [x] Medical Conditions (with live PubMed data)
- [x] Natural Compounds (104 compounds)
- [x] Integrative Therapies
- [x] Methodology
- [x] Member Resources (authenticated)
- [x] Practitioner Repository
- [x] Practitioner Directory
- [x] Institutional Access
- [x] Institutional Pricing
- [x] Admin Dashboard
- [x] User Profile

### Latest Updates (Feb 8, 2026)
- [x] Updated navbar with original build headings:
  - Medical Conditions
  - Research Library
  - Natural Compounds
  - Integrative Therapies
- [x] Moved "Methodology" from navbar to footer
- [x] Verified condition pages bug fix (articles now display correctly)
- [x] Verified pagination working on condition pages
- [x] Added hover dropdown menus to all navbar items with subcategories
- [x] Fixed "Back to Conditions" link (was going to homepage, now goes to /conditions)
- [x] Removed broken "Shop" link from sidebar
- [x] Added "Where to Find" affiliate section to compound pages (iHerb, Amazon, Vitacost, Thorne, books)
- [x] Added affiliate disclaimer to footer
- [x] Added 29 new compounds (total now 133), including:
  - Vitamins: C, B12, Folate, E, K2, A, Biotin
  - Amino Acids: L-Theanine, Creatine
  - Adaptogens: Rhodiola, Maca
  - Mushrooms: Cordyceps, Chaga, Reishi
  - Joint Support: Glucosamine, MSM, Hyaluronic Acid, Collagen
  - Mitochondrial: Alpha Lipoic Acid, Acetyl-L-Carnitine
  - Omega-3s: Fish Oil, Krill Oil, Astaxanthin
  - Others: Melatonin, Quercetin, DHEA, Boswellia, Spirulina, Chlorella

## Navigation Structure

### Navbar
1. Medical Conditions → /conditions
2. Research Library → /research
3. Natural Compounds → /compounds
4. Integrative Therapies → /therapies

### Footer
- **Archive:** Conditions Database, Research Library, Natural Compounds
- **Methodology:** Methodology, Editorial Standards, Advisory Board, About
- **Institutions:** Institutional Access, For Practitioners, Practitioner Directory, Member Resources
- **Legal:** Medical Disclaimer, Privacy Policy, Terms of Service

## Key API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/pubmed/search` - PubMed search with spell correction
- `POST /api/ai-search` - AI-powered search suggestions
- `POST /api/practitioner/apply` - Submit verification request
- `GET /api/practitioners` - Public practitioner directory
- `POST /api/compounds/{id}/annotations` - Add compound annotation

## Database Collections
- users
- practitioner_applications
- compound_annotations
- trial_requests
- digest_subscriptions
- invite_codes

## Test Credentials
- **Admin:** admin@evidencemed.com / admin123

## Remaining Tasks

### P2 - Lower Priority
- [ ] Set up automated scheduler for weekly digest emails
- [ ] Review charting functionality
- [ ] Propose collaborative features for practitioners

### P3 - Backlog
- [ ] Add more compounds if user requests
- [ ] Performance optimization review
- [ ] SEO improvements
