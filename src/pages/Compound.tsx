import { useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  Pill,
  Beaker,
  Shield,
  ExternalLink,
  Link2,
  FlaskConical,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { cn } from "@/lib/utils";
import { getCompoundById, getRelatedCompounds, compoundsData, type Compound } from "@/data/compoundData";
import { allStudies, getEvidenceBadge, type Study } from "@/data/researchData";
import ReferencesSection from "@/components/compound/ReferencesSection";

const CompoundPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const compound = id ? getCompoundById(id) : undefined;

  // Determine back link based on compound category
  const getBackLink = () => {
    if (!compound) return { to: "/compounds", label: "Back to Compounds" };
    
    // Check if it's a vitamin
    if (compound.category === "Fat-Soluble Vitamin" || compound.category === "Water-Soluble Vitamin") {
      return { to: "/compounds?category=Vitamins", label: "Back to Vitamins" };
    }
    
    // Check if it's a mineral
    if (compound.category === "Essential Mineral") {
      return { to: "/compounds?category=Essential Mineral", label: "Back to Minerals" };
    }
    
    return { to: "/compounds", label: "Back to Compounds" };
  };

  const backLink = getBackLink();

  // Get related studies
  const relatedStudies = useMemo(() => {
    if (!compound) return [];
    return allStudies.filter((study) =>
      study.compounds?.some(
        (c) =>
          c.toLowerCase() === compound.name.toLowerCase() ||
          c.toLowerCase() === compound.latinName.toLowerCase() ||
          compound.name.toLowerCase().includes(c.toLowerCase()) ||
          c.toLowerCase().includes(compound.name.toLowerCase())
      )
    );
  }, [compound]);

  // Get related compounds that exist in our data
  const relatedCompounds = useMemo(() => {
    if (!compound) return [];
    return getRelatedCompounds(compound);
  }, [compound]);

  if (!compound) {
    return (
      <>
        <Navbar />
        <main className="pt-20 lg:pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h1 className="text-2xl font-semibold text-foreground mb-4">
                Compound Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The compound you're looking for doesn't exist in our database.
              </p>
              <Button asChild>
                <Link to="/compounds">Browse All Compounds</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{compound.name} Research | EvidenceMed - Natural Medicine Database</title>
        <meta
          name="description"
          content={`Research on ${compound.name} (${compound.latinName}): ${compound.description.slice(0, 150)}...`}
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 lg:pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to={backLink.to}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLink.label}
            </Link>
          </div>

          {/* Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-6xl">{compound.image}</span>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {compound.category}
                  </Badge>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                    {compound.name}
                  </h1>
                  <p className="text-lg text-muted-foreground italic mt-1">
                    {compound.latinName}
                  </p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {compound.description}
              </p>
              <EducationalDisclaimer />
            </div>

            {/* Stats Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <FlaskConical className="w-5 h-5" />
                <span className="font-semibold">Research Overview</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Total Studies</span>
                  <span className="font-serif text-2xl font-semibold text-foreground">
                    {compound.studies}+
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">In Our Library</span>
                  <span className="font-serif text-2xl font-semibold text-primary">
                    {relatedStudies.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="outline">{compound.category}</Badge>
                </div>
              </div>
              <Button className="w-full mt-6" asChild>
                <Link to={`/research?compound=${encodeURIComponent(compound.name)}`}>
                  View All Studies
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Traditional Use */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="font-serif text-xl font-semibold">Traditional Use</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {compound.traditionalUse}
                </p>
              </section>

              {/* Key Benefits */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Leaf className="w-5 h-5" />
                  <h2 className="font-serif text-xl font-semibold">Research Focus Areas</h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {compound.keyBenefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Mechanisms */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Beaker className="w-5 h-5" />
                  <h2 className="font-serif text-xl font-semibold">Mechanisms of Action</h2>
                </div>
                <ul className="space-y-3">
                  {compound.mechanisms.map((mechanism, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <span className="text-primary font-semibold">{i + 1}.</span>
                      <span className="text-muted-foreground">{mechanism}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Research-Reported Dosages */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Pill className="w-5 h-5" />
                  <h2 className="font-serif text-xl font-semibold">Research-Reported Dosages</h2>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                        Research Context Only — Not Medical Advice
                      </p>
                      <p className="text-xs text-muted-foreground">
                        The following information reflects dosages reported in published research studies. 
                        This is NOT a recommendation for personal use. Always consult a qualified healthcare 
                        provider before starting any supplement regimen.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                  {compound.dosage}
                </p>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground italic">
                    Individual responses vary significantly. Factors including age, health status, 
                    medications, and individual biochemistry can affect outcomes. Research settings 
                    differ from real-world conditions.
                  </p>
                </div>
              </section>

              {/* Related Studies */}
              {relatedStudies.length > 0 && (
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <FlaskConical className="w-5 h-5" />
                      <h2 className="font-serif text-xl font-semibold">Related Studies</h2>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/research?compound=${encodeURIComponent(compound.name)}`}>
                        View all
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {relatedStudies.slice(0, 3).map((study) => (
                      <StudyCard key={study.id} study={study} />
                    ))}
                  </div>
                </section>
              )}

              {/* Scientific References */}
              {compound.references && compound.references.length > 0 && (
                <ReferencesSection 
                  references={compound.references} 
                  compoundName={compound.name} 
                />
              )}
            </div>

            {/* Right Column - Safety & More */}
            <div className="space-y-6">
              {/* Safety Notes */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
                  <Shield className="w-5 h-5" />
                  <h2 className="font-serif text-lg font-semibold">Safety Considerations</h2>
                </div>
                <ul className="space-y-2">
                  {compound.safetyNotes.map((note, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      {note}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Interactions */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                  <h2 className="font-serif text-lg font-semibold">Drug Interactions</h2>
                </div>
                <ul className="space-y-2">
                  {compound.interactions.map((interaction, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground p-2 rounded bg-rose-500/5 border border-rose-500/10"
                    >
                      {interaction}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Sources */}
              <section className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Leaf className="w-5 h-5" />
                  <h2 className="font-serif text-lg font-semibold">Common Sources</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {compound.sources.map((source, i) => (
                    <Badge key={i} variant="secondary">
                      {source}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Related Compounds */}
              {relatedCompounds.length > 0 && (
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <Link2 className="w-5 h-5" />
                    <h2 className="font-serif text-lg font-semibold">Related Compounds</h2>
                  </div>
                  <div className="space-y-2">
                    {relatedCompounds.map((related) => (
                      <Link
                        key={related.id}
                        to={`/compound/${related.id}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{related.image}</span>
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {related.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {related.studies} studies
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Also Check These */}
              {compound.relatedCompounds.length > relatedCompounds.length && (
                <section className="bg-muted/50 border border-border rounded-xl p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Also research these:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {compound.relatedCompounds
                      .filter((name) => !relatedCompounds.some((c) => c.name === name))
                      .map((name, i) => (
                        <Badge key={i} variant="outline" className="text-muted-foreground">
                          {name}
                        </Badge>
                      ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

interface StudyCardProps {
  study: Study;
}

const StudyCard = ({ study }: StudyCardProps) => {
  const evidenceBadge = getEvidenceBadge(study.evidenceLevel);

  return (
    <div className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {study.type}
        </span>
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium border",
            evidenceBadge.className
          )}
        >
          {evidenceBadge.label}
        </span>
      </div>
      <h4 className="font-medium text-foreground mb-2 line-clamp-2">{study.title}</h4>
      <p className="text-xs text-muted-foreground mb-3">
        {study.journal} • {study.year}
      </p>
      <Button variant="ghost" size="sm" className="w-full" asChild>
        <a href={study.doiUrl} target="_blank" rel="noopener noreferrer">
          View Study
          <ExternalLink className="w-3 h-3 ml-2" />
        </a>
      </Button>
    </div>
  );
};

export default CompoundPage;
