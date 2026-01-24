import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoDisclaimer from "@/components/layout/DemoDisclaimer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText, FlaskConical } from "lucide-react";
import { conditions } from "@/data/searchData";

// Extended condition data for detail pages
const conditionDetails: Record<string, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  overview: string;
  researchAreas: string[];
  sampleStudies: { title: string; journal: string; year: number }[];
}> = {
  cancer: {
    icon: FlaskConical,
    color: "bg-rose-500/10 text-rose-600",
    overview: "Research into complementary and integrative approaches for cancer care continues to expand. Studies examine herbal compounds, mind-body practices, and nutritional interventions as potential adjuncts to conventional treatment.",
    researchAreas: ["Herbal compound interactions", "Quality of life outcomes", "Symptom management", "Immunomodulation studies"],
    sampleStudies: [
      { title: "Sample: Curcumin and chemotherapy tolerance", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Mushroom polysaccharides in oncology", journal: "Demo Journal", year: 2022 },
    ]
  },
  neurological: {
    icon: FlaskConical,
    color: "bg-violet-500/10 text-violet-600",
    overview: "Neurological research explores neuroprotective compounds, cognitive enhancement strategies, and interventions for neurodegenerative conditions.",
    researchAreas: ["Neuroprotection", "Cognitive function", "Neuroplasticity", "Mitochondrial health"],
    sampleStudies: [
      { title: "Sample: Lion's Mane and nerve growth factor", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Omega-3 and cognitive decline", journal: "Demo Journal", year: 2022 },
    ]
  },
  cardiovascular: {
    icon: FlaskConical,
    color: "bg-red-500/10 text-red-600",
    overview: "Cardiovascular research investigates natural compounds and lifestyle interventions that may support heart health and circulatory function.",
    researchAreas: ["Blood pressure regulation", "Lipid metabolism", "Endothelial function", "Inflammation markers"],
    sampleStudies: [
      { title: "Sample: Beetroot and nitric oxide", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Omega-3 and arrhythmia", journal: "Demo Journal", year: 2022 },
    ]
  },
  metabolic: {
    icon: FlaskConical,
    color: "bg-amber-500/10 text-amber-600",
    overview: "Metabolic disorder research focuses on blood sugar regulation, weight management, and metabolic syndrome interventions.",
    researchAreas: ["Glucose metabolism", "Insulin sensitivity", "Gut microbiome", "Weight management"],
    sampleStudies: [
      { title: "Sample: Berberine and glucose regulation", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Cinnamon and insulin sensitivity", journal: "Demo Journal", year: 2022 },
    ]
  },
  autoimmune: {
    icon: FlaskConical,
    color: "bg-teal-500/10 text-teal-600",
    overview: "Autoimmune research explores immunomodulating compounds and anti-inflammatory interventions.",
    researchAreas: ["Immune modulation", "Inflammation control", "Gut-immune axis", "Autoantibody reduction"],
    sampleStudies: [
      { title: "Sample: Turmeric and inflammatory markers", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Vitamin D and autoimmunity", journal: "Demo Journal", year: 2022 },
    ]
  },
  infectious: {
    icon: FlaskConical,
    color: "bg-blue-500/10 text-blue-600",
    overview: "Infectious disease research examines antiviral compounds, immune support, and post-infection recovery interventions.",
    researchAreas: ["Antiviral properties", "Immune enhancement", "Post-viral syndromes", "Respiratory health"],
    sampleStudies: [
      { title: "Sample: Elderberry and viral replication", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Zinc and immune response", journal: "Demo Journal", year: 2022 },
    ]
  },
  musculoskeletal: {
    icon: FlaskConical,
    color: "bg-orange-500/10 text-orange-600",
    overview: "Musculoskeletal research investigates joint health, bone density, and pain management through natural interventions.",
    researchAreas: ["Joint health", "Bone density", "Inflammation reduction", "Collagen synthesis"],
    sampleStudies: [
      { title: "Sample: Glucosamine and joint function", journal: "Demo Journal", year: 2023 },
      { title: "Sample: Vitamin K2 and bone health", journal: "Demo Journal", year: 2022 },
    ]
  },
};

const ConditionPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find condition from search data
  const condition = conditions.find(c => c.id === id);
  const details = id ? conditionDetails[id] : null;
  
  if (!condition) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 lg:pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold mb-4">Condition Not Found</h1>
            <Button asChild>
              <Link to="/#conditions">Browse All Conditions</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = details?.icon || FlaskConical;

  return (
    <>
      <Helmet>
        <title>{condition.title} | EvidenceMed Research</title>
        <meta name="description" content={condition.description} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20 lg:pt-24">
          {/* Header */}
          <div className="bg-primary/5 py-12">
            <div className="container mx-auto px-4">
              <Link 
                to="/#conditions" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Conditions
              </Link>
              
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${details?.color || "bg-primary/10 text-primary"} flex items-center justify-center shrink-0`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <DemoDisclaimer compact className="mb-3" />
                  <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                    {condition.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {condition.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-sm font-medium text-primary">
                      {condition.studies?.toLocaleString()}+ sample studies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-12">
            <DemoDisclaimer className="mb-8" />
            
            {details && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Overview */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="font-serif text-xl font-semibold">Research Overview</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{details.overview}</p>
                  
                  <h3 className="font-medium mb-3">Key Research Areas</h3>
                  <ul className="space-y-2">
                    {details.researchAreas.map((area, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Studies */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h2 className="font-serif text-xl font-semibold">Sample Studies</h2>
                  </div>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mb-4">
                    ⚠️ These are placeholder examples, not real publications
                  </p>
                  
                  <div className="space-y-4">
                    {details.sampleStudies.map((study, i) => (
                      <div key={i} className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">{study.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {study.journal} • {study.year}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <Link to="/research">
                      View Research Library
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Real research integration with PubMed is coming soon.
              </p>
              <Button asChild>
                <Link to="/#conditions">Browse All Conditions</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConditionPage;
