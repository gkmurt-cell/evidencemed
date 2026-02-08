import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { allBooks, bookCategories, type BookEntry } from "@/data/bookData";

interface TrustedResource {
  id: string;
  title: string;
  url: string;
  description: string;
  type: string;
}

// Trusted external resources - expanded bibliography
const trustedResources: TrustedResource[] = [
  // Primary Databases
  {
    id: "1",
    title: "PubMed Central",
    url: "https://www.ncbi.nlm.nih.gov/pmc/",
    description: "Free full-text archive of biomedical and life sciences journal literature at the U.S. National Institutes of Health.",
    type: "Database"
  },
  {
    id: "2",
    title: "Cochrane Library",
    url: "https://www.cochranelibrary.com/",
    description: "Collection of databases containing high-quality, independent evidence to inform healthcare decision-making.",
    type: "Database"
  },
  {
    id: "3",
    title: "Natural Medicines Database",
    url: "https://naturalmedicines.therapeuticresearch.com/",
    description: "Evidence-based information on natural medicines, dietary supplements, and complementary therapies.",
    type: "Database"
  },
  {
    id: "4",
    title: "Memorial Sloan Kettering - About Herbs Database",
    url: "https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs",
    description: "Evidence-based information about herbs, botanicals, and supplements used by cancer patients.",
    type: "Database"
  },
  {
    id: "5",
    title: "Examine.com",
    url: "https://examine.com/",
    description: "Independent nutrition and supplement research analysis with human effect matrices.",
    type: "Database"
  },
  {
    id: "6",
    title: "ConsumerLab",
    url: "https://www.consumerlab.com/",
    description: "Independent testing and reviews of health and nutrition products.",
    type: "Database"
  },
  // Research Institutions
  {
    id: "7",
    title: "NIH National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/",
    description: "Federal government's lead agency for scientific research on complementary and integrative health approaches.",
    type: "Institution"
  },
  {
    id: "8",
    title: "Andrew Weil Center for Integrative Medicine",
    url: "https://integrativemedicine.arizona.edu/",
    description: "Leading academic institution for integrative medicine education and research at University of Arizona.",
    type: "Institution"
  },
  {
    id: "9",
    title: "Duke Integrative Medicine",
    url: "https://dukeintegrativemedicine.org/",
    description: "Research and clinical center advancing the science of integrative health at Duke University.",
    type: "Institution"
  },
  {
    id: "10",
    title: "Cleveland Clinic Center for Integrative Medicine",
    url: "https://my.clevelandclinic.org/departments/wellness/integrative",
    description: "Integrative medicine clinical and research programs at Cleveland Clinic.",
    type: "Institution"
  },
  // Peer-Reviewed Journals
  {
    id: "11",
    title: "Journal of Alternative and Complementary Medicine",
    url: "https://www.liebertpub.com/loi/acm",
    description: "Peer-reviewed journal covering paradigms, practice, and policy related to complementary and integrative medicine.",
    type: "Journal"
  },
  {
    id: "12",
    title: "Integrative Medicine: A Clinician's Journal",
    url: "https://www.imjournal.com/",
    description: "Peer-reviewed journal focusing on the clinical application of integrative medicine.",
    type: "Journal"
  },
  {
    id: "13",
    title: "Evidence-Based Complementary and Alternative Medicine",
    url: "https://www.hindawi.com/journals/ecam/",
    description: "Open access journal promoting evidence-based complementary and alternative medicine.",
    type: "Journal"
  },
  {
    id: "14",
    title: "Phytomedicine",
    url: "https://www.sciencedirect.com/journal/phytomedicine",
    description: "International journal of phytotherapy and phytopharmacology.",
    type: "Journal"
  },
  {
    id: "15",
    title: "Journal of Ethnopharmacology",
    url: "https://www.sciencedirect.com/journal/journal-of-ethnopharmacology",
    description: "Research on biological activities of plant, animal, and mineral substances used in traditional medicine.",
    type: "Journal"
  },
  {
    id: "16",
    title: "Frontiers in Pharmacology",
    url: "https://www.frontiersin.org/journals/pharmacology",
    description: "Open access journal covering all areas of pharmacology including natural products.",
    type: "Journal"
  },
  // Professional Organizations
  {
    id: "17",
    title: "American Botanical Council",
    url: "https://www.herbalgram.org/",
    description: "Independent, nonprofit research and education organization disseminating science-based herbal medicine information.",
    type: "Organization"
  },
  {
    id: "18",
    title: "Academy of Integrative Health & Medicine",
    url: "https://aihm.org/",
    description: "Professional membership organization advancing integrative health and medicine.",
    type: "Organization"
  },
  {
    id: "19",
    title: "American College of Lifestyle Medicine",
    url: "https://lifestylemedicine.org/",
    description: "Medical specialty society advancing lifestyle medicine as standard of care.",
    type: "Organization"
  },
  {
    id: "20",
    title: "Institute for Functional Medicine",
    url: "https://www.ifm.org/",
    description: "Educational organization advancing functional medicine approach to healthcare.",
    type: "Organization"
  },
  // Dispensary & Supplement Sources
  {
    id: "21",
    title: "iHerb",
    url: "https://www.iherb.com/",
    description: "Global retailer offering a wide selection of supplements, natural products, and health foods with third-party testing.",
    type: "Dispensary"
  }
];

// Recommended reading - bibliography format
const recommendedBooks = allBooks.slice(0, 12);

const MemberResources = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Member Resources | EvidenceMed Archive</title>
        <meta name="description" content="Curated bibliography of trusted resources for integrative medicine research and education." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Header */}
          <section className="py-12 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  Member Resources
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  A curated bibliography of peer-reviewed databases, journals, and reference materials 
                  for integrative medicine research. All resources are vetted for scientific rigor 
                  and editorial standards.
                </p>
              </div>
            </div>
          </section>

          {/* Trusted Databases & Journals */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Trusted Databases & Journals
              </h2>
              <div className="space-y-4">
                {trustedResources.map((resource) => (
                  <article key={resource.id} className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">{resource.type}</span>
                        <h3 className="font-serif text-lg font-medium text-foreground mt-1">
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {resource.title}
                          </a>
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {resource.description}
                        </p>
                      </div>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline whitespace-nowrap"
                      >
                        Visit →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Recommended Reading */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Recommended Reading
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Selected texts in integrative medicine, nutrition science, and complementary therapies. 
                Listed for educational reference.
              </p>
              <div className="space-y-3">
                {recommendedBooks.map((book) => (
                  <article key={book.id} className="p-4 bg-card border border-border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <span className="text-xs text-muted-foreground">
                          {bookCategories.find(c => c.id === book.category)?.label || book.category}
                        </span>
                        <h3 className="font-serif text-base font-medium text-foreground mt-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {book.author}
                        </p>
                        {book.researchReference && (
                          <p className="text-xs text-primary/70 mt-2">
                            {book.researchReference}
                          </p>
                        )}
                      </div>
                      {book.sources[0]?.url && (
                        <a 
                          href={book.sources[0].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          Publisher →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Archive Navigation */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Archive Sections
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/research" className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                  <h3 className="font-serif text-lg font-medium text-foreground">Research Library</h3>
                  <p className="text-sm text-muted-foreground mt-2">Browse peer-reviewed studies and publications</p>
                </Link>
                <Link to="/conditions" className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                  <h3 className="font-serif text-lg font-medium text-foreground">Conditions Database</h3>
                  <p className="text-sm text-muted-foreground mt-2">Research organized by health condition</p>
                </Link>
                <Link to="/compounds" className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                  <h3 className="font-serif text-lg font-medium text-foreground">Compounds Index</h3>
                  <p className="text-sm text-muted-foreground mt-2">Natural compounds and their research profiles</p>
                </Link>
              </div>
            </div>
          </section>

          {/* Practitioner Resources - Subtle link */}
          <section className="py-8 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  Healthcare professional? Access our curated supplier directory and reference library.
                </p>
                <Link 
                  to="/practitioner-repository" 
                  className="text-sm text-primary hover:underline"
                >
                  Practitioner Repository →
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MemberResources;
