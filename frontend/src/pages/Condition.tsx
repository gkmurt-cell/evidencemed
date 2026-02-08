import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Database, FlaskConical, BarChart3 } from "lucide-react";
import { conditions } from "@/data/searchData";
import PubMedSearchPanel from "@/components/research/PubMedSearchPanel";
import { StudyCountBar, EvidenceTierIcon } from "@/components/research/EvidenceVisuals";
import { ConditionJsonLd } from "@/components/compound/CompoundJsonLd";
import LastReviewedBadge from "@/components/compound/LastReviewedBadge";

// Condition metadata with study distribution data
const conditionMeta: Record<string, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  overview: string;
  researchAreas: string[];
  studyDistribution: Array<{
    label: string;
    count: number;
    type: "rct" | "meta-analysis" | "observational" | "in-vitro" | "animal";
  }>;
  evidenceStrength: "high" | "moderate" | "preliminary";
}> = {
  cancer: {
    icon: FlaskConical,
    color: "bg-rose-500/10 text-rose-600",
    overview: "Research into complementary and integrative approaches for cancer care continues to expand. Studies examine herbal compounds, mind-body practices, and nutritional interventions as potential adjuncts to conventional treatment.",
    researchAreas: ["Herbal compound interactions", "Quality of life outcomes", "Symptom management", "Immunomodulation studies"],
    studyDistribution: [
      { label: "In Vitro", count: 2840, type: "in-vitro" },
      { label: "Animal", count: 1920, type: "animal" },
      { label: "Observational", count: 680, type: "observational" },
      { label: "RCTs", count: 340, type: "rct" },
      { label: "Meta-Analyses", count: 85, type: "meta-analysis" },
    ],
    evidenceStrength: "moderate",
  },
  neurological: {
    icon: FlaskConical,
    color: "bg-violet-500/10 text-violet-600",
    overview: "Neurological research explores neuroprotective compounds, cognitive enhancement strategies, and interventions for neurodegenerative conditions.",
    researchAreas: ["Neuroprotection", "Cognitive function", "Neuroplasticity", "Mitochondrial health"],
    studyDistribution: [
      { label: "In Vitro", count: 1560, type: "in-vitro" },
      { label: "Animal", count: 2100, type: "animal" },
      { label: "Observational", count: 420, type: "observational" },
      { label: "RCTs", count: 180, type: "rct" },
      { label: "Meta-Analyses", count: 45, type: "meta-analysis" },
    ],
    evidenceStrength: "moderate",
  },
  cardiovascular: {
    icon: FlaskConical,
    color: "bg-red-500/10 text-red-600",
    overview: "Cardiovascular research investigates natural compounds and lifestyle interventions that may support heart health and circulatory function.",
    researchAreas: ["Blood pressure regulation", "Lipid metabolism", "Endothelial function", "Inflammation markers"],
    studyDistribution: [
      { label: "In Vitro", count: 890, type: "in-vitro" },
      { label: "Animal", count: 1240, type: "animal" },
      { label: "Observational", count: 1560, type: "observational" },
      { label: "RCTs", count: 620, type: "rct" },
      { label: "Meta-Analyses", count: 180, type: "meta-analysis" },
    ],
    evidenceStrength: "high",
  },
  metabolic: {
    icon: FlaskConical,
    color: "bg-amber-500/10 text-amber-600",
    overview: "Metabolic disorder research focuses on blood sugar regulation, weight management, and metabolic syndrome interventions.",
    researchAreas: ["Glucose metabolism", "Insulin sensitivity", "Gut microbiome", "Weight management"],
    studyDistribution: [
      { label: "In Vitro", count: 720, type: "in-vitro" },
      { label: "Animal", count: 980, type: "animal" },
      { label: "Observational", count: 890, type: "observational" },
      { label: "RCTs", count: 480, type: "rct" },
      { label: "Meta-Analyses", count: 120, type: "meta-analysis" },
    ],
    evidenceStrength: "high",
  },
  autoimmune: {
    icon: FlaskConical,
    color: "bg-teal-500/10 text-teal-600",
    overview: "Autoimmune research explores immunomodulating compounds and anti-inflammatory interventions.",
    researchAreas: ["Immune modulation", "Inflammation control", "Gut-immune axis", "Autoantibody reduction"],
    studyDistribution: [
      { label: "In Vitro", count: 560, type: "in-vitro" },
      { label: "Animal", count: 780, type: "animal" },
      { label: "Observational", count: 340, type: "observational" },
      { label: "RCTs", count: 140, type: "rct" },
      { label: "Meta-Analyses", count: 35, type: "meta-analysis" },
    ],
    evidenceStrength: "moderate",
  },
  infectious: {
    icon: FlaskConical,
    color: "bg-blue-500/10 text-blue-600",
    overview: "Infectious disease research examines antiviral compounds, immune support, and post-infection recovery interventions.",
    researchAreas: ["Antiviral properties", "Immune enhancement", "Post-viral syndromes", "Respiratory health"],
    studyDistribution: [
      { label: "In Vitro", count: 1240, type: "in-vitro" },
      { label: "Animal", count: 680, type: "animal" },
      { label: "Observational", count: 420, type: "observational" },
      { label: "RCTs", count: 280, type: "rct" },
      { label: "Meta-Analyses", count: 65, type: "meta-analysis" },
    ],
    evidenceStrength: "moderate",
  },
  musculoskeletal: {
    icon: FlaskConical,
    color: "bg-orange-500/10 text-orange-600",
    overview: "Musculoskeletal research investigates joint health, bone density, and pain management through natural interventions.",
    researchAreas: ["Joint health", "Bone density", "Inflammation reduction", "Collagen synthesis"],
    studyDistribution: [
      { label: "In Vitro", count: 340, type: "in-vitro" },
      { label: "Animal", count: 560, type: "animal" },
      { label: "Observational", count: 680, type: "observational" },
      { label: "RCTs", count: 420, type: "rct" },
      { label: "Meta-Analyses", count: 95, type: "meta-analysis" },
    ],
    evidenceStrength: "high",
  },
};

const ConditionPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find condition from search data
  const condition = conditions.find(c => c.id === id);
  const meta = id ? conditionMeta[id] : null;
  
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

  const IconComponent = meta?.icon || FlaskConical;

  return (
    <>
      <Helmet>
        <title>{condition.title} | EvidenceMed Research</title>
        <meta name="description" content={condition.description} />
      </Helmet>

      <ConditionJsonLd condition={{ title: condition.title, description: condition.description, id: condition.id }} />

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20 lg:pt-24">
          {/* Header */}
          <div className="bg-primary/5 py-12">
            <div className="container mx-auto px-4">
              <Link 
                to="/conditions" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Conditions
              </Link>
              
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl ${meta?.color || "bg-primary/10 text-primary"} flex items-center justify-center shrink-0`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Live PubMed Data</span>
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                    {condition.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {condition.description}
                  </p>
                  <LastReviewedBadge lastReviewed="2026-01-15" nextReviewDue="2026-04-15" className="mt-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar - Overview with Data Visual */}
              {meta && (
                <div className="lg:col-span-1 space-y-6">
                  {/* Research Overview */}
                  <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold">Research Overview</h2>
                    </div>
                    
                    {/* Evidence Strength Indicator */}
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50">
                      <EvidenceTierIcon level={meta.evidenceStrength} size="lg" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {meta.evidenceStrength === "high" ? "Strong" : meta.evidenceStrength === "moderate" ? "Moderate" : "Preliminary"} Evidence Base
                        </p>
                        <p className="text-xs text-muted-foreground">Overall research quality</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-6">{meta.overview}</p>
                    
                    <h3 className="font-medium mb-3 text-sm">Key Research Areas</h3>
                    <ul className="space-y-2 mb-6">
                      {meta.researchAreas.map((area, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {area}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Study Distribution - Single Visual */}
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-medium mb-3 text-sm flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        Study Distribution
                      </h3>
                      <StudyCountBar data={meta.studyDistribution} />
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content - PubMed Results */}
              <div className={meta ? "lg:col-span-2" : "lg:col-span-3"}>
                <h2 className="font-serif text-2xl font-semibold mb-6">
                  Recent Research from PubMed
                </h2>
                <PubMedSearchPanel condition={id} maxResults={15} />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center border-t border-border pt-8">
              <Button asChild variant="outline">
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
