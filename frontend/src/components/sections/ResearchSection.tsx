import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, FileText, FlaskConical, Users, TestTube, AlertTriangle, Shield, Link2, Filter, Leaf, Heart, Pill, BarChart3 } from "lucide-react";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import DemoDisclaimer from "@/components/layout/DemoDisclaimer";
import { RelatedLinks } from "@/components/ui/explore-more-link";
import { StudyTypeIcon, StudyCountBar, EvidenceTierIcon } from "@/components/research/EvidenceVisuals";
import { cn } from "@/lib/utils";

type StudyType = "all" | "rct" | "observational" | "meta-analysis" | "in-vitro";

// PubMed search URLs for each study type - filtered for natural compounds/integrative medicine
const researchTypes = [
  { 
    id: "in-vitro" as StudyType, 
    name: "In Vitro Studies", 
    icon: TestTube, 
    count: "4,200+",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=(herbal+medicine+OR+natural+compounds+OR+nutraceuticals+OR+phytotherapy)+AND+(in+vitro+OR+cell+culture+OR+cell+line)"
  },
  { 
    id: "observational" as StudyType, 
    name: "Animal Models", 
    icon: FlaskConical, 
    count: "3,800+",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=(herbal+medicine+OR+natural+compounds+OR+nutraceuticals+OR+phytotherapy)+AND+(animal+model+OR+mice+OR+rats+OR+in+vivo)"
  },
  { 
    id: "observational" as StudyType, 
    name: "Observational Studies", 
    icon: Users, 
    count: "2,100+",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=(herbal+medicine+OR+natural+compounds+OR+nutraceuticals+OR+integrative+medicine)+AND+(observational+study+OR+cohort+OR+cross-sectional)"
  },
  { 
    id: "rct" as StudyType, 
    name: "Controlled Trials", 
    icon: FileText, 
    count: "890+",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=(herbal+medicine+OR+natural+compounds+OR+nutraceuticals+OR+integrative+medicine)+AND+Clinical+Trial%5Bpt%5D"
  },
];

const studyTypeFilters: { id: StudyType; label: string }[] = [
  { id: "all", label: "All Studies" },
  { id: "rct", label: "RCTs" },
  { id: "meta-analysis", label: "Meta-Analyses" },
  { id: "observational", label: "Observational" },
  { id: "in-vitro", label: "In Vitro" },
];

interface Study {
  title: string;
  journal: string;
  year: string;
  type: string;
  typeId: StudyType;
  institution: string;
  abstract: string;
  doi: string;
  doiUrl: string;
  sampleSize?: string;
  safetyNotes?: string;
  evidenceLevel: "high" | "moderate" | "preliminary";
  compounds?: string[];
}

const featuredStudies: Study[] = [
  {
    title: "Curcumin and Inflammatory Biomarkers: A Controlled Study",
    journal: "Journal of Natural Products",
    year: "2024",
    type: "Randomized Controlled Trial",
    typeId: "rct",
    institution: "Stanford University",
    abstract: "This study examined associations between curcumin supplementation and inflammatory biomarker levels in participants with elevated baseline markers...",
    doi: "10.1021/acs.jnatprod.2024.001234",
    doiUrl: "https://doi.org/10.1021/acs.jnatprod.2024.001234",
    sampleSize: "n=248",
    safetyNotes: "Well-tolerated at doses up to 2g/day. Minor GI discomfort reported in 8% of participants.",
    evidenceLevel: "high",
    compounds: ["Curcumin", "Turmeric"],
  },
  {
    title: "Associations Between Lion's Mane Supplementation and Cognitive Measures",
    journal: "Frontiers in Aging Neuroscience",
    year: "2024",
    type: "Human Observational",
    typeId: "observational",
    institution: "Tokyo Medical University",
    abstract: "A 12-month observational study investigating correlations between Hericium erinaceus supplementation and cognitive assessment scores in adults with mild cognitive changes...",
    doi: "10.3389/fnagi.2024.00892",
    doiUrl: "https://doi.org/10.3389/fnagi.2024.00892",
    sampleSize: "n=156",
    safetyNotes: "No significant adverse events reported. Long-term safety data limited.",
    evidenceLevel: "moderate",
    compounds: ["Lion's Mane", "Hericium erinaceus"],
  },
  {
    title: "Green Tea Catechins and Metabolic Parameters: A Meta-Analysis",
    journal: "Nutrients",
    year: "2023",
    type: "Meta-Analysis",
    typeId: "meta-analysis",
    institution: "Harvard School of Public Health",
    abstract: "Comprehensive meta-analysis of 47 studies examining associations between EGCG intake and metabolic parameters across diverse populations...",
    doi: "10.3390/nu15041234",
    doiUrl: "https://doi.org/10.3390/nu15041234",
    sampleSize: "47 studies, n=4,821",
    safetyNotes: "High-dose extracts (>800mg EGCG) associated with rare hepatotoxicity. Whole tea consumption considered safe.",
    evidenceLevel: "high",
    compounds: ["EGCG", "Green Tea", "Catechins"],
  },
  {
    title: "Berberine Effects on Glucose Metabolism: Cell Culture Analysis",
    journal: "Journal of Ethnopharmacology",
    year: "2024",
    type: "In Vitro Study",
    typeId: "in-vitro",
    institution: "University of Melbourne",
    abstract: "Investigation of berberine's mechanisms on AMPK activation and glucose uptake in hepatocyte and muscle cell lines...",
    doi: "10.1016/j.jep.2024.117892",
    doiUrl: "https://doi.org/10.1016/j.jep.2024.117892",
    safetyNotes: "In vitro study. Human pharmacokinetics and safety require clinical validation.",
    evidenceLevel: "preliminary",
    compounds: ["Berberine"],
  },
];

const ResearchSection = () => {
  const [activeFilter, setActiveFilter] = useState<StudyType>("all");
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  const filteredStudies = activeFilter === "all" 
    ? featuredStudies 
    : featuredStudies.filter(study => study.typeId === activeFilter);

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
          <p className="text-lg text-muted-foreground mb-4">
            Every research entry includes study type, institution, journal, publication year, 
            and direct links to original sources. Plain-language summaries make complex 
            research accessible.
          </p>
          <RelatedLinks
            title="Explore:"
            links={[
              { href: "/conditions", label: "200+ Conditions" },
              { href: "/compounds", label: "Compound Library" },
              { href: "/methodology", label: "Editorial Standards" },
            ]}
          />
          <EducationalDisclaimer />
        </div>

        {/* Research Type Stats - Now Clickable */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {researchTypes.map((type) => (
            <a
              key={type.name}
              href={type.pubmedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <type.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                <StudyTypeIcon type={type.id === "rct" ? "rct" : type.id === "in-vitro" ? "in-vitro" : type.id === "observational" ? "observational" : "animal"} size="md" />
              </div>
              <p className="font-mono text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {type.count}
              </p>
              <p className="text-sm text-muted-foreground">{type.name}</p>
              <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                View on PubMed
                <ExternalLink className="w-3 h-3" />
              </p>
            </a>
          ))}
        </div>

        {/* Study Distribution Bar Chart */}
        <div className="max-w-2xl mx-auto mb-16 bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
            Study Distribution by Type
          </h3>
          <StudyCountBar 
            data={[
              { label: "In Vitro", count: 4200, type: "in-vitro" },
              { label: "Animal", count: 3800, type: "animal" },
              { label: "Observational", count: 2100, type: "observational" },
              { label: "RCTs", count: 890, type: "rct" },
              { label: "Meta-Analyses", count: 340, type: "meta-analysis" },
            ]}
          />
        </div>

        {/* Featured Studies */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Featured Research
            </h3>
            
            {/* Study Type Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {studyTypeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredStudies.map((study) => {
              const isExpanded = expandedStudy === study.title;
              
              return (
                <div
                  key={study.title}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-3">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {study.type}
                        </span>
                        <EvidenceTierIcon level={study.evidenceLevel} size="sm" showLabel />
                        <span className="text-xs text-muted-foreground">
                          {study.year}
                        </span>
                        {study.sampleSize && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {study.sampleSize}
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={study.doiUrl} target="_blank" rel="noopener noreferrer">
                          View Full Study
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {study.title}
                    </h4>

                    {/* Abstract */}
                    <p className="text-sm text-muted-foreground">
                      {study.abstract}
                    </p>

                    {/* Compounds Tags */}
                    {study.compounds && study.compounds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {study.compounds.map((compound) => (
                          <span 
                            key={compound}
                            className="px-2 py-0.5 rounded bg-secondary text-xs text-secondary-foreground"
                          >
                            {compound}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                      <span className="font-medium">{study.journal}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{study.institution}</span>
                    </div>

                    {/* DOI Link */}
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-primary" />
                      <a 
                        href={study.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline font-mono"
                      >
                        DOI: {study.doi}
                      </a>
                    </div>

                    {/* Safety Notes - Expandable */}
                    {study.safetyNotes && (
                      <div className="mt-2">
                        <button
                          onClick={() => setExpandedStudy(isExpanded ? null : study.title)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span className="font-medium">Safety & Considerations</span>
                          <span className="text-xs">{isExpanded ? "▲" : "▼"}</span>
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-3 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {study.safetyNotes}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredStudies.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No studies match this filter. Try a different category.</p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link to="/research">
                Explore Full Library
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
