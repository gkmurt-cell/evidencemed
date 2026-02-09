import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  BookOpen,
  FileText,
  Globe,
  GraduationCap,
  Search,
  ExternalLink,
  Star,
  Filter,
  Database,
  Newspaper,
  Video,
  Podcast
} from "lucide-react";

// Resource Categories
const categories = [
  { id: "all", name: "All Resources", icon: Database },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "journals", name: "Journals", icon: FileText },
  { id: "databases", name: "Databases", icon: Database },
  { id: "organizations", name: "Organizations", icon: Globe },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "media", name: "Media", icon: Video },
];

// Curated Resources
const resources = [
  // BOOKS
  {
    id: 1,
    category: "books",
    title: "The Encyclopedia of Natural Medicine",
    authors: "Michael Murray, ND & Joseph Pizzorno, ND",
    description: "Comprehensive reference covering natural approaches to over 80 health conditions. Evidence-based protocols and clinical pearls.",
    url: "https://www.amazon.com/Encyclopedia-Natural-Medicine-Third/dp/1451663005",
    tags: ["Reference", "Clinical", "Naturopathy"],
    featured: true
  },
  {
    id: 2,
    category: "books",
    title: "Textbook of Functional Medicine",
    authors: "Institute for Functional Medicine",
    description: "The definitive textbook for functional medicine practitioners. Systems biology approach to chronic disease.",
    url: "https://www.ifm.org/ifm-textbook/",
    tags: ["Functional Medicine", "Textbook", "Clinical"],
    featured: true
  },
  {
    id: 3,
    category: "books",
    title: "Botanical Medicine for Women's Health",
    authors: "Aviva Romm, MD",
    description: "Evidence-based guide to herbal medicine for women's health across the lifespan.",
    url: "https://www.amazon.com/Botanical-Medicine-Womens-Health-Aviva/dp/0443072779",
    tags: ["Herbalism", "Women's Health", "Clinical"]
  },
  {
    id: 4,
    category: "books",
    title: "The Healing Power of Herbs",
    authors: "Michael Murray, ND",
    description: "Scientific review of over 70 commonly used herbs with clinical applications and dosing.",
    url: "https://www.amazon.com/Healing-Power-Herbs-Michael-Murray/dp/0761508198",
    tags: ["Herbalism", "Reference", "Evidence-Based"]
  },
  {
    id: 5,
    category: "books",
    title: "Chinese Herbal Medicine: Materia Medica",
    authors: "Dan Bensky & Andrew Gamble",
    description: "Definitive English-language reference on Chinese herbs. Used in TCM schools worldwide.",
    url: "https://www.amazon.com/Chinese-Herbal-Medicine-Materia-Medica/dp/0939616424",
    tags: ["TCM", "Reference", "Herbalism"],
    featured: true
  },
  {
    id: 6,
    category: "books",
    title: "The Web That Has No Weaver",
    authors: "Ted Kaptchuk",
    description: "Classic introduction to Traditional Chinese Medicine for Western readers. Explains theory and diagnosis.",
    url: "https://www.amazon.com/Web-That-Has-No-Weaver/dp/0809228408",
    tags: ["TCM", "Theory", "Introduction"]
  },
  {
    id: 7,
    category: "books",
    title: "Principles and Practice of Phytotherapy",
    authors: "Kerry Bone & Simon Mills",
    description: "Modern scientific approach to herbal medicine. Integrates traditional knowledge with current research.",
    url: "https://www.amazon.com/Principles-Practice-Phytotherapy-Kerry-Bone/dp/0443069921",
    tags: ["Herbalism", "Clinical", "Evidence-Based"]
  },
  {
    id: 8,
    category: "books",
    title: "Ayurvedic Medicine: The Principles of Traditional Practice",
    authors: "Sebastian Pole",
    description: "Comprehensive guide to Ayurvedic herbs and treatments with Western clinical applications.",
    url: "https://www.amazon.com/Ayurvedic-Medicine-Principles-Traditional-Practice/dp/1848191138",
    tags: ["Ayurveda", "Clinical", "Herbalism"]
  },
  {
    id: 9,
    category: "books",
    title: "The Body Keeps the Score",
    authors: "Bessel van der Kolk, MD",
    description: "Groundbreaking work on trauma and the body. Essential for mind-body medicine practitioners.",
    url: "https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748",
    tags: ["Mind-Body", "Trauma", "Neuroscience"],
    featured: true
  },
  {
    id: 10,
    category: "books",
    title: "Why Zebras Don't Get Ulcers",
    authors: "Robert Sapolsky",
    description: "Accessible exploration of stress physiology and its health impacts. Foundational for understanding stress-disease connection.",
    url: "https://www.amazon.com/Why-Zebras-Dont-Ulcers-Third/dp/0805073698",
    tags: ["Stress", "Physiology", "Science"]
  },

  // JOURNALS
  {
    id: 20,
    category: "journals",
    title: "Journal of Alternative and Complementary Medicine",
    authors: "Mary Ann Liebert Publishers",
    description: "Peer-reviewed journal covering CAM research. Indexed in PubMed.",
    url: "https://www.liebertpub.com/journal/acm",
    tags: ["Peer-Reviewed", "CAM", "Research"],
    featured: true
  },
  {
    id: 21,
    category: "journals",
    title: "Evidence-Based Complementary and Alternative Medicine",
    authors: "Hindawi (Open Access)",
    description: "Open-access journal promoting evidence-based CAM. All articles freely available.",
    url: "https://www.hindawi.com/journals/ecam/",
    tags: ["Open Access", "Peer-Reviewed", "Evidence-Based"]
  },
  {
    id: 22,
    category: "journals",
    title: "Integrative Medicine: A Clinician's Journal",
    authors: "InnoVision Health Media",
    description: "Clinical journal bridging conventional and integrative approaches. Case studies and protocols.",
    url: "https://www.imjournal.com/",
    tags: ["Clinical", "Integrative", "Case Studies"]
  },
  {
    id: 23,
    category: "journals",
    title: "Phytomedicine",
    authors: "Elsevier",
    description: "International journal of phytotherapy and phytopharmacology. High-impact herbal research.",
    url: "https://www.journals.elsevier.com/phytomedicine",
    tags: ["Herbalism", "Pharmacology", "Research"]
  },
  {
    id: 24,
    category: "journals",
    title: "Journal of Ethnopharmacology",
    authors: "Elsevier",
    description: "Research on traditional medicines worldwide. Ethnobotany and pharmacological validation.",
    url: "https://www.journals.elsevier.com/journal-of-ethnopharmacology",
    tags: ["Traditional Medicine", "Ethnobotany", "Research"]
  },
  {
    id: 25,
    category: "journals",
    title: "Explore: The Journal of Science and Healing",
    authors: "Elsevier",
    description: "Covers the full spectrum of integrative medicine including consciousness research.",
    url: "https://www.explorejournal.com/",
    tags: ["Integrative", "Mind-Body", "Consciousness"]
  },

  // DATABASES
  {
    id: 30,
    category: "databases",
    title: "PubMed / MEDLINE",
    authors: "National Library of Medicine",
    description: "The gold standard for biomedical literature. Over 35 million citations. Free access.",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    tags: ["Free", "Comprehensive", "Primary Source"],
    featured: true
  },
  {
    id: 31,
    category: "databases",
    title: "Natural Medicines Comprehensive Database",
    authors: "Therapeutic Research Center",
    description: "Evidence-based monographs on supplements, herbs, and interactions. Professional resource.",
    url: "https://naturalmedicines.therapeuticresearch.com/",
    tags: ["Evidence-Based", "Professional", "Interactions"]
  },
  {
    id: 32,
    category: "databases",
    title: "Cochrane Library",
    authors: "Cochrane Collaboration",
    description: "Systematic reviews and meta-analyses. Highest level of evidence synthesis.",
    url: "https://www.cochranelibrary.com/",
    tags: ["Systematic Reviews", "Meta-Analysis", "Evidence"],
    featured: true
  },
  {
    id: 33,
    category: "databases",
    title: "NCCIH Research Database",
    authors: "National Center for Complementary and Integrative Health",
    description: "NIH-funded research on complementary approaches. Fact sheets and clinical trials.",
    url: "https://www.nccih.nih.gov/",
    tags: ["NIH", "Research", "Fact Sheets"]
  },
  {
    id: 34,
    category: "databases",
    title: "Memorial Sloan Kettering About Herbs Database",
    authors: "MSKCC",
    description: "Evidence-based herb and supplement database. Includes cancer-specific information.",
    url: "https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs",
    tags: ["Cancer", "Evidence-Based", "Free"]
  },
  {
    id: 35,
    category: "databases",
    title: "ConsumerLab",
    authors: "ConsumerLab.com",
    description: "Independent testing of supplements for quality, purity, and label accuracy.",
    url: "https://www.consumerlab.com/",
    tags: ["Quality Testing", "Supplements", "Independent"]
  },

  // ORGANIZATIONS
  {
    id: 40,
    category: "organizations",
    title: "Institute for Functional Medicine (IFM)",
    authors: "Professional Organization",
    description: "Leading organization for functional medicine education and certification.",
    url: "https://www.ifm.org/",
    tags: ["Functional Medicine", "Education", "Certification"],
    featured: true
  },
  {
    id: 41,
    category: "organizations",
    title: "American Association of Naturopathic Physicians (AANP)",
    authors: "Professional Organization",
    description: "National professional organization for licensed naturopathic doctors.",
    url: "https://naturopathic.org/",
    tags: ["Naturopathy", "Professional", "Advocacy"]
  },
  {
    id: 42,
    category: "organizations",
    title: "Academy of Integrative Health & Medicine (AIHM)",
    authors: "Professional Organization",
    description: "Interprofessional organization for integrative health practitioners of all disciplines.",
    url: "https://www.aihm.org/",
    tags: ["Integrative", "Interprofessional", "Education"]
  },
  {
    id: 43,
    category: "organizations",
    title: "American Herbalists Guild (AHG)",
    authors: "Professional Organization",
    description: "Peer-reviewed professional organization for herbalists. Registered Herbalist credential.",
    url: "https://www.americanherbalistsguild.com/",
    tags: ["Herbalism", "Professional", "Certification"]
  },
  {
    id: 44,
    category: "organizations",
    title: "National Ayurvedic Medical Association (NAMA)",
    authors: "Professional Organization",
    description: "Professional organization representing Ayurvedic practitioners in North America.",
    url: "https://www.ayurvedanama.org/",
    tags: ["Ayurveda", "Professional", "Standards"]
  },
  {
    id: 45,
    category: "organizations",
    title: "Society for Integrative Oncology (SIO)",
    authors: "Professional Organization",
    description: "Advancing evidence-based integrative therapies in cancer care.",
    url: "https://integrativeonc.org/",
    tags: ["Oncology", "Integrative", "Research"]
  },

  // EDUCATION
  {
    id: 50,
    category: "education",
    title: "Bastyr University",
    authors: "Accredited University",
    description: "Leading naturopathic medical school. Degrees in naturopathic medicine, nutrition, herbalism.",
    url: "https://bastyr.edu/",
    tags: ["Naturopathy", "Degree Programs", "Accredited"],
    featured: true
  },
  {
    id: 51,
    category: "education",
    title: "National University of Natural Medicine (NUNM)",
    authors: "Accredited University",
    description: "Naturopathic and classical Chinese medicine programs. Research-focused.",
    url: "https://nunm.edu/",
    tags: ["Naturopathy", "TCM", "Research"]
  },
  {
    id: 52,
    category: "education",
    title: "Maryland University of Integrative Health (MUIH)",
    authors: "Accredited University",
    description: "Programs in integrative health, acupuncture, yoga therapy, health coaching.",
    url: "https://www.muih.edu/",
    tags: ["Integrative", "Acupuncture", "Online Options"]
  },
  {
    id: 53,
    category: "education",
    title: "Andrew Weil Center for Integrative Medicine",
    authors: "University of Arizona",
    description: "Fellowship and certificate programs for physicians in integrative medicine.",
    url: "https://integrativemedicine.arizona.edu/",
    tags: ["Fellowship", "Physicians", "Integrative"]
  },
  {
    id: 54,
    category: "education",
    title: "Kresser Institute",
    authors: "Chris Kresser",
    description: "ADAPT training programs for functional and ancestral health practitioners.",
    url: "https://kresserinstitute.com/",
    tags: ["Functional", "Online", "Practitioner Training"]
  },

  // MEDIA
  {
    id: 60,
    category: "media",
    title: "Found My Fitness",
    authors: "Dr. Rhonda Patrick",
    description: "Science-based podcast and videos on nutrition, longevity, and health optimization.",
    url: "https://www.foundmyfitness.com/",
    tags: ["Podcast", "Science", "Longevity"]
  },
  {
    id: 61,
    category: "media",
    title: "The Huberman Lab Podcast",
    authors: "Dr. Andrew Huberman",
    description: "Neuroscience-based discussions on health, performance, and well-being.",
    url: "https://hubermanlab.com/",
    tags: ["Podcast", "Neuroscience", "Protocols"],
    featured: true
  },
  {
    id: 62,
    category: "media",
    title: "Revolution Health Radio",
    authors: "Chris Kresser",
    description: "Functional and integrative medicine topics for practitioners and patients.",
    url: "https://chriskresser.com/podcasts/",
    tags: ["Podcast", "Functional Medicine", "Clinical"]
  },
  {
    id: 63,
    category: "media",
    title: "The Doctor's Farmacy",
    authors: "Dr. Mark Hyman",
    description: "Conversations on functional medicine, food as medicine, and health policy.",
    url: "https://drhyman.com/blog/category/podcasts/",
    tags: ["Podcast", "Functional Medicine", "Interviews"]
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(r => r.featured);

  return (
    <>
      <Helmet>
        <title>Resources - Curated Books, Journals & Databases | EvidenceMed</title>
        <meta name="description" content="Curated bibliography of trusted resources for integrative and natural medicine. Books, peer-reviewed journals, databases, professional organizations, and educational programs." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-500/10 text-blue-700 border-blue-500/20">
                  Curated Bibliography
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Resources
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A carefully curated collection of books, journals, databases, and organizations 
                  for evidence-based integrative and natural medicine research.
                </p>
              </div>

              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured Resources */}
              {selectedCategory === "all" && searchQuery === "" && (
                <section className="mb-12">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Featured Resources
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {featuredResources.slice(0, 6).map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl p-4 hover:shadow-lg hover:border-amber-500/40 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-amber-600 transition-colors line-clamp-2">
                            {resource.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                        <p className="text-xs text-amber-600 mb-2">{resource.authors}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* All Resources */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    {selectedCategory === "all" ? "All Resources" : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredResources.length} resources
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {resource.category}
                            </Badge>
                            {resource.featured && (
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-primary/80 mb-2">{resource.authors}</p>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>

                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No resources found matching your criteria.</p>
                  </div>
                )}
              </section>

              {/* Disclaimer */}
              <section className="mt-12">
                <div className="bg-secondary/30 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">About These Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    This bibliography represents resources that are frequently cited in integrative medicine 
                    literature and education. Inclusion does not constitute endorsement of all content. 
                    We encourage critical evaluation of all sources. External links open in new tabs and 
                    are not affiliated with EvidenceMed unless otherwise noted.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <RightSidebar />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Resources;
