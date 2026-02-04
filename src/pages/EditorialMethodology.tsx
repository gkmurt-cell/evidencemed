import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Search, 
  FileCheck, 
  Users, 
  RefreshCw, 
  Shield,
  CheckCircle,
  AlertTriangle,
  Database,
  GraduationCap
} from "lucide-react";

const EditorialMethodology = () => {
  const principles = [
    {
      icon: Search,
      title: "Evidence-Based Research",
      description: "We systematically review peer-reviewed literature from PubMed, Cochrane Library, and other reputable scientific databases to ensure accuracy and reliability."
    },
    {
      icon: FileCheck,
      title: "Rigorous Source Verification",
      description: "Every claim is cross-referenced with primary research sources. We prioritize randomized controlled trials, meta-analyses, and systematic reviews."
    },
    {
      icon: Users,
      title: "Expert Review Process",
      description: "Content is reviewed by healthcare professionals and researchers with relevant expertise to ensure clinical accuracy and practical relevance."
    },
    {
      icon: RefreshCw,
      title: "Regular Updates",
      description: "We continuously monitor new research and update our content to reflect the latest scientific findings and clinical guidelines."
    },
    {
      icon: Shield,
      title: "Transparency & Disclosure",
      description: "We clearly disclose study limitations, conflicting evidence, and potential biases. Our affiliate relationships are always disclosed."
    },
    {
      icon: Database,
      title: "Comprehensive Data",
      description: "We aggregate data from multiple studies to provide a balanced view, including both positive findings and null results."
    }
  ];

  const researchProcess = [
    {
      step: 1,
      title: "Literature Search",
      description: "Systematic searches across PubMed, Cochrane, and specialized databases using standardized search terms and filters."
    },
    {
      step: 2,
      title: "Study Selection",
      description: "Studies are screened based on methodology quality, sample size, and relevance. We prioritize human clinical trials over in-vitro or animal studies."
    },
    {
      step: 3,
      title: "Data Extraction",
      description: "Key findings, dosages, study parameters, and safety data are extracted and organized for synthesis."
    },
    {
      step: 4,
      title: "Quality Assessment",
      description: "Each study is evaluated using established frameworks (e.g., Cochrane Risk of Bias, GRADE) to assess evidence quality."
    },
    {
      step: 5,
      title: "Content Synthesis",
      description: "Information is synthesized into accessible summaries while maintaining scientific accuracy and nuance."
    },
    {
      step: 6,
      title: "Review & Publication",
      description: "Final content undergoes editorial and expert review before publication, with ongoing monitoring for updates."
    }
  ];

  const evidenceHierarchy = [
    { level: "Highest", type: "Systematic Reviews & Meta-Analyses", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { level: "High", type: "Randomized Controlled Trials (RCTs)", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { level: "Moderate", type: "Cohort & Observational Studies", color: "text-amber-600 bg-amber-50 border-amber-200" },
    { level: "Lower", type: "Case Studies & Expert Opinion", color: "text-orange-600 bg-orange-50 border-orange-200" },
    { level: "Preliminary", type: "In Vitro & Animal Studies", color: "text-rose-600 bg-rose-50 border-rose-200" },
  ];

  return (
    <>
      <Helmet>
        <title>Editorial Methodology | EvidenceMed</title>
        <meta 
          name="description" 
          content="Learn about our evidence-based editorial methodology, research process, and commitment to scientific accuracy in natural medicine education." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 lg:pt-24">
          {/* Hero Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <GraduationCap className="w-4 h-4" />
                  Our Commitment to Accuracy
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Editorial Methodology
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that reliable health information requires rigorous methodology. 
                  Learn how we research, verify, and present evidence-based content on natural 
                  compounds and integrative therapies.
                </p>
              </div>
            </div>
          </section>

          {/* Core Principles */}
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                    Core Editorial Principles
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our editorial standards are designed to ensure every piece of content 
                    meets the highest standards of scientific accuracy and objectivity.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {principles.map((principle) => (
                    <Card key={principle.title} className="border-border hover:border-primary/30 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                          <principle.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{principle.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {principle.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Evidence Hierarchy */}
          <section className="py-16 lg:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                    Evidence Hierarchy
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We categorize research by evidence quality to help readers understand 
                    the strength of scientific support for each finding.
                  </p>
                </div>

                <div className="space-y-3">
                  {evidenceHierarchy.map((item, index) => (
                    <div 
                      key={item.level}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${item.color}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.level} Quality:</span>
                        <span className="ml-2">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Important Note on Preliminary Research</p>
                      <p className="text-sm text-muted-foreground">
                        In vitro (cell culture) and animal studies provide early insights but often do not 
                        translate directly to human outcomes. We clearly label such findings as "preliminary" 
                        and emphasize the need for human clinical trials before drawing conclusions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Research Process */}
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                    Our Research Process
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Every piece of content follows a structured research and review process 
                    to ensure accuracy and reliability.
                  </p>
                </div>

                <div className="space-y-6">
                  {researchProcess.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1 pb-6 border-b border-border last:border-0">
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What We Don't Do */}
          <section className="py-16 lg:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                    What We Don't Do
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Maintaining editorial integrity means avoiding practices that could 
                    compromise the quality of our content.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Make treatment recommendations or prescriptive advice",
                    "Accept payment for favorable coverage of products",
                    "Present preliminary research as conclusive evidence",
                    "Ignore conflicting studies or null results",
                    "Overstate benefits or understate risks",
                    "Use sensational language or fear-based messaging"
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                      <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-destructive text-xs font-bold">✕</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Corrections Policy */}
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>Corrections & Updates Policy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We are committed to accuracy and will promptly correct any errors brought to our attention. 
                      When corrections are made:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>Minor corrections (typos, formatting) are made silently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>Substantive corrections are noted with an update timestamp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>Major revisions include a detailed changelog</span>
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                      To report an error or suggest an update, please contact us at{" "}
                      <a href="mailto:editorial@evidencemed.com" className="text-primary hover:underline">
                        editorial@evidencemed.com
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Educational Disclaimer */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <EducationalDisclaimer />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EditorialMethodology;
