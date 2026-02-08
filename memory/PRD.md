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
- [x] Added 15 more compounds (total now 148):
  - TCM Herbs: Panax Ginseng, Dong Quai, Schisandra, He Shou Wu, Rehmannia, Goji Berry
  - Ayurvedic: Shilajit, Bacopa (Brahmi), Mucuna Pruriens
  - Performance: Beta-Glucan, L-Citrulline, Beetroot, HMB, Phosphatidylserine, Tribulus
- [x] Added Ayurveda page route (/ayurveda) - comprehensive page with dosha quiz, five elements, constitutional principles
- [x] Created "Traditional Medicine Systems" featured section on Integrative Therapies page with prominent Ayurveda card
- [x] Added Ayurveda to navbar dropdown under Integrative Therapies
- [x] Created comprehensive Traditional Chinese Medicine (TCM) page (`/tcm`) with:
  - Yin & Yang theory
  - Five Elements (Wu Xing) with interactive selection
  - Fundamental Substances (Qi, Blood, Jing, Shen, Body Fluids)
  - Common TCM Patterns (Pattern Differentiation)
  - Constitution Assessment quiz
  - Major TCM Herbs with links to compounds
  - TCM Treatment Methods (Eight Branches)
- [x] Added TCM route and navbar dropdown link
- [x] Made TCM card on Integrative Therapies page clickable
- [x] Added 11 new TCM herbs & formulas (total compounds now 159):
  - Dan Shen, San Qi, Huang Qi, Bai Zhu, Fu Ling
  - Chai Hu, Huang Qin, Gan Cao
  - Formulas: Dang Gui Bu Xue Tang, Liu Wei Di Huang Wan, Yin Qiao San
- [x] Created Naturopathic Medicine page (`/naturopathy`) with:
  - Six Principles of Naturopathic Medicine
  - Therapeutic Order hierarchy
  - Therapeutic Modalities (Clinical Nutrition, Botanical Medicine, Hydrotherapy, etc.)
  - Vitality Assessment quiz
  - Key Naturopathic Herbs
- [x] Created Homeopathy page (`/homeopathy`) with:
  - Core Principles (Law of Similars, Minimum Dose, Single Remedy, Proving, Vital Force)
  - Potency Scales (X, C, LM/Q)
  - Constitutional Types (Calcarea, Lycopodium, Natrum Mur, etc.)
  - Common Acute Remedies
  - Constitutional Indicator quiz
  - Scientific context disclaimer
- [x] Added routes for Naturopathy and Homeopathy pages
- [x] Updated navbar dropdown with all four traditional medicine systems
- [x] Made all Traditional Medicine System cards clickable on Integrative Therapies page
- [x] Added 10 new Western/Naturopathic herbs (total compounds now 169):
  - Echinacea, St. John's Wort, Saw Palmetto, Black Cohosh, Hawthorn
  - Valerian, Ginkgo Biloba, Kava, Andrographis, Milk Thistle
- [x] Created Functional Medicine page (`/functional-medicine`)
- [x] Created Aromatherapy page (`/aromatherapy`) with essential oil categories

### Major Content Expansion (Feb 8, 2026 - Latest)
- [x] Created Unani Medicine page (`/unani`) with:
  - Four Humors (Akhlat) theory with interactive cards
  - Six Essential Factors (Asbab-e-Sitta Zarooriya)
  - Treatment Methods (Ilaj)
  - Classical Unani Formulations
  - Historical Pioneers (Hippocrates, Ibn Sina, Al-Razi)
- [x] Created Energy Healing page (`/energy-healing`) with:
  - 6 Modalities: Reiki, Qigong, Pranic Healing, Therapeutic Touch, Healing Touch, Polarity
  - Complete Chakra System guide (7 chakras)
  - Research Evidence summary
- [x] Created Mind-Body Medicine page (`/mind-body`) with:
  - 6 Core Practices: Meditation, Breathwork, Yoga, Tai Chi, Biofeedback, Hypnotherapy
  - Psychoneuroimmunology concepts
  - Expressive & Creative Therapies (Art, Music, Dance, Drama, Writing)
- [x] Created Bodywork & Manual Therapies page (`/bodywork`) with:
  - 6 Categories: Massage, Chiropractic, Osteopathy, Structural Integration, Movement, Energy-Based
  - 40+ specific modalities with descriptions
  - Evidence table by condition
  - Safety considerations
- [x] Created Nutritional Therapy page (`/nutrition`) with:
  - 6 Therapeutic Diets: Mediterranean, Anti-Inflammatory, Elimination, Low FODMAP, Ketogenic, Plant-Based
  - Essential Nutrients guide (Omega-3s, Vitamins, Minerals, B-Vitamins)
  - Functional Nutrition Testing
  - Practitioner types explained
- [x] Created Sound & Vibrational Therapy page (`/sound-therapy`) with:
  - 6 Modalities: Singing Bowls, Tuning Forks, Gong Therapy, Voice/Toning, Binaural Beats, Music Therapy
  - Frequency Reference Guide (Solfeggio, 432 Hz, etc.)
  - Brainwave states (Delta, Theta, Alpha, Beta, Gamma)
  - Research Evidence summary
- [x] Created Hydrotherapy page (`/hydrotherapy`) with:
  - 4 Categories: Temperature Therapies, Therapeutic Bathing, Aquatic Exercise, Specialized
  - 25+ specific modalities
  - Evidence by condition table
  - Safety guidelines
- [x] Updated Integrative Therapies page with new "Therapeutic Approaches" section featuring all new pages
- [x] Made Unani Medicine card clickable (was previously static)
- [x] Added 20 new compounds (total now 198):
  - Minerals: Iodine, Boron, Molybdenum, Manganese
  - Amino Acids: Glycine, Taurine, L-Carnitine, Citrulline
  - Specialized: PQQ, NMN, Spermidine, Fisetin
  - Herbal: Schisandra, Mucuna, Cordyceps Militaris
  - Extracts: Pine Bark (Pycnogenol), Olive Leaf, Artichoke
  - Connective Tissue: Hyaluronic Acid, Silica

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

### P1 - Higher Priority
- [ ] Implement real affiliate tracking codes (Amazon Associates, iHerb referral) for "Where to Find" links

### P2 - Lower Priority
- [ ] Set up automated scheduler for weekly digest emails
- [ ] Review charting functionality
- [ ] Propose collaborative features for practitioners
- [ ] Create dedicated browsable "Resources" page for books/journals

### P3 - Backlog
- [ ] Consider migrating compoundData.ts (6600+ lines) to MongoDB for scalability
- [ ] Performance optimization review
- [ ] SEO improvements
