import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ExternalLink, BookOpen, ShoppingBag, GraduationCap, FileText, Building2, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Practitioner supply sources
const supplierCategories = [
  {
    category: "Professional-Grade Supplements",
    description: "Practitioner-only supplement brands with third-party testing and GMP certification",
    sources: [
      {
        name: "Fullscript",
        url: "https://fullscript.com/",
        description: "Practitioner dispensary with 300+ professional brands",
        badge: "Practitioner-Only"
      },
      {
        name: "Wellevate (Emerson Ecologics)",
        url: "https://wellevate.me/",
        description: "Professional supplement dispensary platform",
        badge: "Practitioner-Only"
      },
      {
        name: "Natural Partners",
        url: "https://www.naturalpartners.com/",
        description: "Wholesale practitioner supplements",
        badge: "Practitioner-Only"
      },
    ]
  },
  {
    category: "Retail Supplement Sources",
    description: "Consumer-accessible sources for patients and personal research",
    sources: [
      {
        name: "iHerb",
        url: "https://www.iherb.com/",
        description: "Wide selection of supplements with COA availability",
        badge: "Consumer"
      },
      {
        name: "Amazon Professional",
        url: "https://www.amazon.com/",
        description: "Verified seller supplements (check for authenticity)",
        badge: "Consumer"
      },
      {
        name: "Thorne",
        url: "https://www.thorne.com/",
        description: "Research-backed formulations, direct from manufacturer",
        badge: "Direct"
      },
      {
        name: "Pure Encapsulations",
        url: "https://www.pureencapsulations.com/",
        description: "Hypoallergenic, research-based supplements",
        badge: "Direct"
      },
    ]
  },
  {
    category: "Botanical & Herbal Suppliers",
    description: "Quality herbal products and raw materials",
    sources: [
      {
        name: "Mountain Rose Herbs",
        url: "https://mountainroseherbs.com/",
        description: "Organic herbs, teas, and botanical products",
        badge: "Organic"
      },
      {
        name: "Herb Pharm",
        url: "https://www.herb-pharm.com/",
        description: "Liquid herbal extracts and tinctures",
        badge: "Organic"
      },
      {
        name: "Gaia Herbs",
        url: "https://www.gaiaherbs.com/",
        description: "Traceable herbal supplements with MeetYourHerbs program",
        badge: "Traceable"
      },
    ]
  }
];

// Reference books for practitioners
const referenceBooks = [
  {
    category: "Clinical References",
    books: [
      {
        title: "Integrative Medicine, 4th Edition",
        author: "David Rakel, MD",
        publisher: "Elsevier",
        isbn: "978-0323358682",
        description: "Comprehensive textbook covering evidence-based integrative approaches"
      },
      {
        title: "Textbook of Natural Medicine, 5th Edition",
        author: "Joseph Pizzorno, ND & Michael Murray, ND",
        publisher: "Elsevier",
        isbn: "978-0323523424",
        description: "Definitive reference for naturopathic and botanical medicine"
      },
      {
        title: "Herb, Nutrient, and Drug Interactions",
        author: "Mitchell Bebel Stargrove",
        publisher: "Mosby",
        isbn: "978-0323029643",
        description: "Clinical implications and therapeutic strategies for drug-nutrient interactions"
      },
    ]
  },
  {
    category: "Botanical & Pharmacognosy",
    books: [
      {
        title: "Principles and Practice of Phytotherapy, 2nd Edition",
        author: "Kerry Bone & Simon Mills",
        publisher: "Churchill Livingstone",
        isbn: "978-0443069925",
        description: "Modern herbal medicine with scientific foundations"
      },
      {
        title: "Medical Herbalism",
        author: "David Hoffmann, FNIMH",
        publisher: "Healing Arts Press",
        isbn: "978-0892817498",
        description: "Science and practice of herbal medicine"
      },
      {
        title: "PDR for Herbal Medicines, 4th Edition",
        author: "Thomson Healthcare",
        publisher: "Thomson",
        isbn: "978-1563636783",
        description: "Physician's desk reference for herbal products"
      },
    ]
  },
  {
    category: "Nutritional Medicine",
    books: [
      {
        title: "Nutritional Medicine, 2nd Edition",
        author: "Alan Gaby, MD",
        publisher: "Fritz Perlberg Publishing",
        isbn: "978-0982885093",
        description: "Comprehensive nutritional therapeutics reference"
      },
      {
        title: "Encyclopedia of Nutritional Supplements",
        author: "Michael Murray, ND",
        publisher: "Prima Publishing",
        isbn: "978-0761504108",
        description: "Evidence-based guide to vitamins, minerals, and supplements"
      },
    ]
  }
];

// Professional journals
const professionalJournals = [
  {
    name: "Journal of Alternative and Complementary Medicine",
    publisher: "Mary Ann Liebert",
    impactFactor: "2.868",
    url: "https://www.liebertpub.com/loi/acm"
  },
  {
    name: "Phytomedicine",
    publisher: "Elsevier",
    impactFactor: "6.656",
    url: "https://www.sciencedirect.com/journal/phytomedicine"
  },
  {
    name: "Journal of Ethnopharmacology",
    publisher: "Elsevier",
    impactFactor: "5.195",
    url: "https://www.sciencedirect.com/journal/journal-of-ethnopharmacology"
  },
  {
    name: "Integrative Medicine Research",
    publisher: "Elsevier",
    impactFactor: "3.333",
    url: "https://www.sciencedirect.com/journal/integrative-medicine-research"
  },
  {
    name: "Evidence-Based Complementary and Alternative Medicine",
    publisher: "Hindawi",
    impactFactor: "2.629",
    url: "https://www.hindawi.com/journals/ecam/"
  },
  {
    name: "BMC Complementary Medicine and Therapies",
    publisher: "BMC",
    impactFactor: "3.943",
    url: "https://bmccomplementmedtherapies.biomedcentral.com/"
  },
];

const PractitionerRepository = () => {
  return (
    <>
      <Helmet>
        <title>Practitioner Repository | EvidenceMed Archive</title>
        <meta name="description" content="Professional resources for integrative medicine practitioners including supplement suppliers, reference texts, and peer-reviewed journals." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Header */}
          <section className="py-12 border-b border-border bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    For Healthcare Professionals
                  </Badge>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  Practitioner Repository
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  Curated professional resources for integrative medicine practitioners. This repository includes 
                  vetted supplement suppliers, essential reference texts, and peer-reviewed journals for 
                  clinical practice and continuing education.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Supplier Sources */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Professional Suppliers</h2>
                  <p className="text-sm text-muted-foreground">Quality-verified supplement and botanical sources</p>
                </div>
              </div>

              <div className="space-y-8">
                {supplierCategories.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-2">{category.category}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.sources.map((source) => (
                        <a
                          key={source.name}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {source.name}
                            </h4>
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {source.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{source.description}</p>
                          <div className="flex items-center gap-1 mt-3 text-xs text-primary">
                            <ExternalLink className="w-3 h-3" />
                            Visit website
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Disclaimer:</strong> EvidenceMed does not receive compensation from listed suppliers. 
                  Inclusion does not constitute endorsement. Practitioners should verify product quality, 
                  certifications, and suitability for individual patient needs.
                </p>
              </div>
            </div>
          </section>

          {/* Reference Books */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Reference Library</h2>
                  <p className="text-sm text-muted-foreground">Essential texts for integrative medicine practice</p>
                </div>
              </div>

              <div className="space-y-8">
                {referenceBooks.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.books.map((book) => (
                        <div
                          key={book.isbn}
                          className="p-4 bg-card border border-border rounded-lg"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-serif font-medium text-foreground">{book.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                              <p className="text-sm text-muted-foreground mt-2">{book.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs text-muted-foreground">{book.publisher}</p>
                              <p className="text-xs font-mono text-muted-foreground mt-1">ISBN: {book.isbn}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Professional Journals */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Peer-Reviewed Journals</h2>
                  <p className="text-sm text-muted-foreground">Leading publications in integrative medicine research</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {professionalJournals.map((journal) => (
                  <a
                    key={journal.name}
                    href={journal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <h3 className="font-serif font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                      {journal.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{journal.publisher}</span>
                      <Badge variant="outline" className="text-xs">
                        IF: {journal.impactFactor}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-primary">
                      <ExternalLink className="w-3 h-3" />
                      Access journal
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Back to Resources */}
          <section className="py-8 border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <Button variant="outline" asChild>
                <Link to="/member-resources">← Back to Member Resources</Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PractitionerRepository;
