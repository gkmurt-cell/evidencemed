import { useMemo, useState, useEffect } from "react";
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
import StudyTypeLinks from "@/components/compound/StudyTypeLinks";
import EvidenceGradeBadge, { deriveEvidenceGrade } from "@/components/compound/EvidenceGradeBadge";
import LastReviewedBadge from "@/components/compound/LastReviewedBadge";
import CitationExport from "@/components/compound/CitationExport";
import COIDisclosure from "@/components/compound/COIDisclosure";
import PRISMAMethodology from "@/components/compound/PRISMAMethodology";
import CompoundJsonLd from "@/components/compound/CompoundJsonLd";
import AuthorityReferences from "@/components/compound/AuthorityReferences";
import CompoundAnnotations from "@/components/practitioners/CompoundAnnotations";
import WhereToBuy from "@/components/compound/WhereToBuy";
import { useAuth } from "@/hooks/useAuth";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

const CompoundPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const compound = id ? getCompoundById(id) : undefined;
  const { user } = useAuth();
  const [isVerifiedPractitioner, setIsVerifiedPractitioner] = useState(false);

  // Fetch user's practitioner status
  useEffect(() => {
    const fetchPractitionerStatus = async () => {
      const token = localStorage.getItem("evidencemed_token");
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/api/practitioners/my-status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setIsVerifiedPractitioner(data.status === "approved" || data.verification?.status === "approved");
        }
      } catch (error) {
        console.error("Failed to fetch practitioner status:", error);
      }
    };

    fetchPractitionerStatus();
  }, [user]);

  // Determine back link based on compound category
  const getBackLink = () => {
    if (!compound) return { to: "/compounds", label: "Back to Compounds" };
    if (compound.category === "Fat-Soluble Vitamin" || compound.category === "Water-Soluble Vitamin") {
      return { to: "/compounds?category=Vitamins", label: "Back to Vitamins" };
    }
    if (compound.category === "Essential Mineral") {
      return { to: "/compounds?category=Essential Mineral", label: "Back to Minerals" };
    }
    return { to: "/compounds", label: "Back to Compounds" };
  };

  const backLink = getBackLink();

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
              <h1 className="text-2xl font-semibold text-foreground mb-4">Compound Not Found</h1>
              <p className="text-muted-foreground mb-6">The compound you're looking for doesn't exist in our database.</p>
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

  const evidenceGrade = deriveEvidenceGrade(compound.studies, compound.category);

  return (
    <>
      <Helmet>
        <title>{compound.name} Research | EvidenceMed - Natural Medicine Database</title>
        <meta
          name="description"
          content={`Research on ${compound.name} (${compound.latinName}): ${compound.description.slice(0, 150)}...`}
        />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <CompoundJsonLd compound={compound} />

      <Navbar />

      <main className="pt-20 lg:pt-22 pb-10 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-3">
            <Link
              to={backLink.to}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLink.label}
            </Link>
          </div>

          {/* Header */}
          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-5xl">{compound.image}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">{compound.category}</Badge>
                    <EvidenceGradeBadge grade={evidenceGrade} size="sm" />
                  </div>
                  <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
                    {compound.name}
                  </h1>
                  <p className="text-base text-muted-foreground italic mt-0.5">
                    {compound.latinName}
                  </p>
                </div>
              </div>
              
              {/* Last Reviewed Timestamp */}
              <LastReviewedBadge
                lastReviewed="2026-02-01"
                nextReviewDue="2026-05-01"
                className="mb-3"
              />
              
              <p className="text-base text-muted-foreground leading-relaxed mb-3">
                {compound.description}
              </p>
              <EducationalDisclaimer />
            </div>

            {/* Stats Card */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary mb-3">
                <FlaskConical className="w-4 h-4" />
                <span className="font-semibold text-sm">Research Overview</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Total Studies</span>
                  <span className="font-serif text-xl font-semibold text-foreground">
                    {compound.studies}+
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">In Our Library</span>
                  <span className="font-serif text-xl font-semibold text-primary">
                    {relatedStudies.length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Evidence Grade</span>
                  <EvidenceGradeBadge grade={evidenceGrade} size="sm" />
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground text-sm">Category</span>
                  <Badge variant="outline" className="text-xs">{compound.category}</Badge>
                </div>
                <div className="pt-1">
                  <StudyTypeLinks compoundName={compound.name} latinName={compound.latinName} />
                </div>
              </div>
              <Button className="w-full mt-4" size="sm" asChild>
                <Link to={`/research?compound=${encodeURIComponent(compound.name)}`}>
                  View All Studies
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

            {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Traditional Use */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <BookOpen className="w-4 h-4" />
                  <h2 className="font-serif text-lg font-semibold">Traditional Use</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{compound.traditionalUse}</p>
              </section>

              {/* Key Benefits */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Leaf className="w-4 h-4" />
                  <h2 className="font-serif text-lg font-semibold">Research Focus Areas</h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {compound.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Mechanisms */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Beaker className="w-4 h-4" />
                  <h2 className="font-serif text-lg font-semibold">Mechanisms of Action</h2>
                </div>
                <ul className="space-y-2">
                  {compound.mechanisms.map((mechanism, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded bg-muted/50">
                      <span className="text-primary font-semibold text-sm">{i + 1}.</span>
                      <span className="text-sm text-muted-foreground">{mechanism}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Research-Reported Dosages */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Pill className="w-4 h-4" />
                  <h2 className="font-serif text-lg font-semibold">Research-Reported Dosages</h2>
                </div>
                <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 mb-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-0.5">
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
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{compound.dosage}</p>
                <div className="p-2 rounded bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground italic">
                    Individual responses vary significantly. Factors including age, health status, 
                    medications, and individual biochemistry can affect outcomes. Research settings 
                    differ from real-world conditions.
                  </p>
                </div>
              </section>

              {/* Related Studies */}
              {relatedStudies.length > 0 && (
                <section className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-primary">
                      <FlaskConical className="w-4 h-4" />
                      <h2 className="font-serif text-lg font-semibold">Related Studies</h2>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/research?compound=${encodeURIComponent(compound.name)}`}>View all</Link>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {relatedStudies.slice(0, 3).map((study) => (
                      <StudyCard key={study.id} study={study} />
                    ))}
                  </div>
                </section>
              )}

              {/* Professional Annotations Section */}
              <section className="bg-card border border-border rounded-lg p-4">
                <CompoundAnnotations
                  compoundId={compound.id}
                  compoundName={compound.name}
                  token={localStorage.getItem("evidencemed_token") || undefined}
                  isVerifiedPractitioner={isVerifiedPractitioner}
                />
              </section>

              {/* Scientific References with Citation Export */}
              {compound.references && compound.references.length > 0 && (
                <div>
                  <div className="flex items-center justify-end mb-2">
                    <CitationExport references={compound.references} compoundName={compound.name} />
                  </div>
                  <ReferencesSection references={compound.references} compoundName={compound.name} />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {/* Safety Notes */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-3">
                  <Shield className="w-4 h-4" />
                  <h2 className="font-serif text-base font-semibold">Safety Considerations</h2>
                </div>
                <ul className="space-y-2">
                  {compound.safetyNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      {note}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Interactions */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <h2 className="font-serif text-base font-semibold">Drug Interactions</h2>
                </div>
                <ul className="space-y-1.5">
                  {compound.interactions.map((interaction, i) => (
                    <li key={i} className="text-xs text-muted-foreground p-2 rounded bg-rose-500/5 border border-rose-500/10">
                      {interaction}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Sources */}
              <section className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Leaf className="w-4 h-4" />
                  <h2 className="font-serif text-base font-semibold">Common Sources</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {compound.sources.map((source, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{source}</Badge>
                  ))}
                </div>
              </section>

              {/* PRISMA Methodology */}
              <PRISMAMethodology
                compoundName={compound.name}
                included={compound.studies}
              />

              {/* COI Disclosure */}
              <COIDisclosure compoundName={compound.name} />

              {/* Institutional References */}
              <AuthorityReferences
                compoundName={compound.name}
                latinName={compound.latinName}
                category={compound.category}
              />

              {/* Related Compounds */}
              {relatedCompounds.length > 0 && (
                <section className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Link2 className="w-4 h-4" />
                    <h2 className="font-serif text-base font-semibold">Related Compounds</h2>
                  </div>
                  <div className="space-y-1.5">
                    {relatedCompounds.map((related) => (
                      <Link
                        key={related.id}
                        to={`/compound/${related.id}`}
                        className="flex items-center justify-between p-2 rounded bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{related.image}</span>
                          <div>
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {related.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{related.studies} studies</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Also Check These */}
              {compound.relatedCompounds.length > relatedCompounds.length && (
                <section className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">Also research these:</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {compound.relatedCompounds
                      .filter((name) => !relatedCompounds.some((c) => c.name === name))
                      .map((name, i) => (
                        <Badge key={i} variant="outline" className="text-xs text-muted-foreground">{name}</Badge>
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
    <div className="p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
        <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
          {study.type}
        </span>
        <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-medium border", evidenceBadge.className)}>
          {evidenceBadge.label}
        </span>
      </div>
      <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-2">{study.title}</h4>
      <p className="text-[10px] text-muted-foreground mb-2">
        {study.journal} • {study.year}
      </p>
      <Button variant="ghost" size="sm" className="w-full h-7 text-xs" asChild>
        <a href={study.doiUrl} target="_blank" rel="noopener noreferrer">
          View Study
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </Button>
    </div>
  );
};

export default CompoundPage;
