import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, FileText, FlaskConical, Users, TestTube } from "lucide-react";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";

const researchTypes = [
  { name: "In Vitro Studies", icon: TestTube, count: "4,200+" },
  { name: "Animal Models", icon: FlaskConical, count: "3,800+" },
  { name: "Observational Studies", icon: Users, count: "2,100+" },
  { name: "Controlled Trials", icon: FileText, count: "890+" },
];

const featuredStudies = [
  {
    title: "Curcumin and Inflammatory Biomarkers: A Controlled Study",
    journal: "Journal of Natural Products",
    year: "2024",
    type: "Randomized Controlled Trial",
    institution: "Stanford University",
    abstract: "This study examined associations between curcumin supplementation and inflammatory biomarker levels in participants with elevated baseline markers...",
  },
  {
    title: "Associations Between Lion's Mane Supplementation and Cognitive Measures",
    journal: "Frontiers in Aging Neuroscience",
    year: "2024",
    type: "Human Observational",
    institution: "Tokyo Medical University",
    abstract: "A 12-month observational study investigating correlations between Hericium erinaceus supplementation and cognitive assessment scores in adults with mild cognitive changes...",
  },
  {
    title: "Green Tea Catechins and Metabolic Parameters: A Meta-Analysis",
    journal: "Nutrients",
    year: "2023",
    type: "Meta-Analysis",
    institution: "Harvard School of Public Health",
    abstract: "Comprehensive meta-analysis of 47 studies examining associations between EGCG intake and metabolic parameters across diverse populations...",
  },
];

const ResearchSection = () => {
  return (
    <section id="research" className="py-10 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Research Library
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Peer-Reviewed Studies
            <br />
            <span className="text-muted-foreground">Summarized & Sourced</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Every research entry includes study type, institution, journal, publication year, 
            and direct links to original sources. Plain-language summaries make complex 
            research accessible.
          </p>
          <EducationalDisclaimer />
        </div>

        {/* Research Type Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {researchTypes.map((type) => (
            <div
              key={type.name}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <type.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl font-semibold text-foreground mb-1">
                {type.count}
              </p>
              <p className="text-sm text-muted-foreground">{type.name}</p>
            </div>
          ))}
        </div>

        {/* Featured Studies */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
            Featured Research
          </h3>
          <div className="space-y-4">
            {featuredStudies.map((study, index) => (
              <div
                key={study.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {study.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {study.year}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                      {study.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {study.abstract}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>{study.journal}</span>
                      <span>•</span>
                      <span>{study.institution}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    View Study
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Button size="lg">
              Explore Full Library
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
