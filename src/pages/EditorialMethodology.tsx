import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Search, 
  FileCheck, 
  Users, 
  Shield,
  CheckCircle,
  AlertTriangle,
  FlaskConical,
  TestTube,
  FileText,
  RefreshCw,
  Mail,
  Scale,
  GraduationCap,
  Info
} from "lucide-react";

const EditorialMethodology = () => {
  const studyTypes = [
    { name: "In vitro", description: "Cellular or molecular studies", icon: TestTube },
    { name: "Animal studies", description: "Preclinical research in animal models", icon: FlaskConical },
    { name: "Observational human studies", description: "Cohort, cross-sectional, case-control", icon: Users },
    { name: "Randomized controlled trials", description: "Experimental human studies", icon: FileCheck },
    { name: "Systematic reviews and meta-analyses", description: "Aggregated evidence synthesis", icon: BookOpen },
  ];

  const editorialProcess = [
    { 
      step: "Initial Identification", 
      description: "Studies are identified via academic databases, journal feeds, and alerts",
      icon: Search
    },
    { 
      step: "Screening", 
      description: "Research is screened for relevance, source quality, and completeness",
      icon: FileCheck
    },
    { 
      step: "Categorization", 
      description: "Studies are tagged by condition, compound, modality, and study type",
      icon: BookOpen
    },
    { 
      step: "Summary", 
      description: "Plain-language summaries are written to reflect study scope and findings without prescriptive interpretation",
      icon: FileText
    },
    { 
      step: "Verification", 
      description: "Source links and metadata are checked prior to publication",
      icon: CheckCircle
    },
  ];

  const intendedAudience = [
    "Researchers and students",
    "Practitioners seeking research context",
    "Educated members of the public interested in primary literature"
  ];

  return (
    <>
      <Helmet>
        <title>Editorial Methodology | EvidenceMed</title>
        <meta 
          name="description" 
          content="Learn about EvidenceMed's editorial methodology, content inclusion criteria, evidence classification, and commitment to research integrity." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 lg:pt-24">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <GraduationCap className="w-4 h-4" />
                  Research Integrity
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Editorial Methodology
                </h1>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="max-w-4xl mx-auto space-y-16">
              
              {/* Purpose and Scope */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Purpose and Scope
                </h2>
                <div className="prose prose-muted max-w-none space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    EvidenceMed is an educational research platform designed to aggregate, organize, and summarize 
                    peer-reviewed scientific literature relating to complementary, alternative, and integrative therapies.
                  </p>
                  <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">
                          The platform does not provide medical advice, diagnosis, treatment recommendations, or 
                          dosing guidance. All content is presented for research and informational purposes only.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <p className="text-muted-foreground leading-relaxed">
                    This page outlines how content is selected, reviewed, categorized, and maintained.
                  </p>
                </div>
              </section>

              {/* Content Inclusion Criteria */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Content Inclusion Criteria
                </h2>
                <p className="text-muted-foreground mb-6">
                  EvidenceMed includes research that meets all of the following criteria:
                </p>
                
                <div className="space-y-6">
                  {/* Source Quality */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Source Quality
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Published in peer-reviewed journals, or</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Hosted in recognized academic repositories (e.g. PubMed, institutional databases)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                          <span>Preprints are clearly labeled as such and separated from peer-reviewed literature</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Relevance */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Relevance
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Relates to complementary, alternative, or integrative therapies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Includes natural compounds, lifestyle interventions, investigational or repurposed agents, and adjunctive approaches</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Addresses mechanisms, associations, or observed effects relevant to health conditions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Transparency */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-primary" />
                        Transparency
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Study metadata is available (authors, institution, journal, year)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>Original source links (DOI, PubMed ID, or publisher link) are provided</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Study Types and Evidence Classification */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Study Types and Evidence Classification
                </h2>
                <p className="text-muted-foreground mb-6">
                  Research on EvidenceMed is categorized by study type, not by outcome or claim. 
                  Typical categories include:
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {studyTypes.map((type) => (
                    <Card key={type.name} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <type.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{type.name}</p>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground">
                      <strong>EvidenceMed does not rank therapies by effectiveness or endorse conclusions.</strong>{" "}
                      Study type is provided to help readers contextualize the strength and limitations of available evidence.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Editorial Review Process */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Editorial Review Process
                </h2>
                
                <div className="space-y-4">
                  {editorialProcess.map((item, index) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 pb-4 border-b border-border last:border-0">
                        <h3 className="font-semibold text-foreground mb-1">{item.step}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground mt-6 italic">
                  EvidenceMed does not alter study conclusions or reinterpret data beyond summarization.
                </p>
              </section>

              {/* Safety and Limitations */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Safety and Limitations
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Safety notes are included only when discussed within the original research</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>EvidenceMed does not extrapolate safety, efficacy, or suitability for individuals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Absence of evidence is not presented as evidence of absence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Conflicting findings are acknowledged where present</span>
                  </li>
                </ul>
              </section>

              {/* Dosage and Protocols */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Dosage and Protocols
                </h2>
                <p className="text-muted-foreground mb-4">
                  Where studies report dosages, durations, or protocols, this information is treated as 
                  contextual research data only.
                </p>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <p className="font-medium text-foreground mb-4">EvidenceMed:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <span className="text-destructive text-xs font-bold">✕</span>
                        </div>
                        <span>Does not recommend dosages</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <span className="text-destructive text-xs font-bold">✕</span>
                        </div>
                        <span>Does not provide protocols</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <span className="text-destructive text-xs font-bold">✕</span>
                        </div>
                        <span>Does not suggest replication of study conditions</span>
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                      Such information is included solely to accurately represent the published research.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Conflicts of Interest */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Conflicts of Interest and Commercial Separation
                </h2>
                <p className="text-muted-foreground mb-4">
                  EvidenceMed may reference books, resources, or products via affiliate links on clearly 
                  designated Shop / Resources pages.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Commercial content is visually and structurally separated from research content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Affiliate relationships are disclosed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Editorial inclusion of research is not influenced by commercial relationships</span>
                  </li>
                </ul>
              </section>

              {/* Content Updates */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Content Updates and Maintenance
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Content is reviewed and updated on a rolling basis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>New research is added regularly as it becomes available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Corrections are made if source errors or misclassifications are identified</span>
                  </li>
                </ul>
              </section>

              {/* Intended Audience */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Intended Audience
                </h2>
                <p className="text-muted-foreground mb-4">
                  EvidenceMed is designed for:
                </p>
                <ul className="space-y-2 mb-6">
                  {intendedAudience.map((audience) => (
                    <li key={audience} className="flex items-center gap-3 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary shrink-0" />
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
                <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground font-medium">
                      The platform is not intended for self-diagnosis or treatment decisions.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Editorial Independence */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Editorial Independence Statement
                </h2>
                <p className="text-muted-foreground mb-4">
                  EvidenceMed operates as an independent educational platform.
                </p>
                <p className="text-muted-foreground italic">
                  Inclusion of research does not imply endorsement, recommendation, or clinical applicability.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Contact and Feedback
                </h2>
                <p className="text-muted-foreground mb-4">
                  Feedback regarding sourcing, categorization, or accuracy may be submitted via the{" "}
                  <Link to="/about" className="text-primary hover:underline">contact page</Link>.
                </p>
                <Card className="border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      EvidenceMed welcomes corrections supported by verifiable sources.
                    </p>
                  </CardContent>
                </Card>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EditorialMethodology;
