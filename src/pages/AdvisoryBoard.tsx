import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GraduationCap, BookOpen, Shield, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const advisors = [
  {
    name: "Editorial Review Board",
    role: "Content Verification",
    credentials: "MD, PhD, PharmD, ND qualified reviewers",
    focus: "All compound profiles, safety data, and mechanism descriptions undergo multi-stage editorial review before publication.",
    icon: Shield,
  },
  {
    name: "Pharmacognosy Consultants",
    role: "Natural Product Chemistry",
    credentials: "PhD-level expertise in phytochemistry and pharmacology",
    focus: "Mechanism of action descriptions, bioavailability data, and compound interaction profiles are validated against current pharmacological literature.",
    icon: BookOpen,
  },
  {
    name: "Clinical Research Advisors",
    role: "Evidence Evaluation",
    credentials: "Clinicians with systematic review and meta-analysis experience",
    focus: "Study quality assessments, evidence grading, and clinical relevance contextualisation.",
    icon: GraduationCap,
  },
];

const methodology = [
  "All references verified against PubMed and CrossRef databases",
  "GRADE-adapted evidence quality framework applied to each compound",
  "Conflict of interest review for all cited studies",
  "Quarterly review cycle for high-traffic compound profiles",
  "Independent peer review prior to major content updates",
];

const AdvisoryBoard = () => {
  return (
    <>
      <Helmet>
        <title>Scientific Advisory Board | EvidenceMed</title>
        <meta
          name="description"
          content="Meet the scientific advisory board behind EvidenceMed's peer-reviewed natural medicine research profiles. Multi-disciplinary review ensures accuracy and integrity."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-grow pt-20 lg:pt-24">
          {/* Hero */}
          <div className="bg-primary/5 py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">Scientific Governance</Badge>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Scientific Advisory Board
                </h1>
                <p className="text-lg text-muted-foreground">
                  EvidenceMed's content integrity is maintained through multi-disciplinary 
                  review by qualified researchers and clinicians.
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="max-w-4xl mx-auto">
              {/* Advisory Panels */}
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Review Panels
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {advisors.map((advisor) => (
                  <div
                    key={advisor.name}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <advisor.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {advisor.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">{advisor.role}</p>
                    <p className="text-xs text-muted-foreground italic mb-3">{advisor.credentials}</p>
                    <p className="text-sm text-muted-foreground">{advisor.focus}</p>
                  </div>
                ))}
              </div>

              {/* Review Standards */}
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Review Standards
              </h2>
              <div className="bg-card border border-border rounded-xl p-6 mb-16">
                <ul className="space-y-3">
                  {methodology.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  For detailed information on how content is selected and reviewed, see our{" "}
                  <Link to="/editorial-methodology" className="text-primary hover:underline">
                    Editorial Methodology
                  </Link>.
                </p>
                <p className="text-sm text-muted-foreground">
                  To submit corrections or research suggestions, contact us via our{" "}
                  <Link to="/about" className="text-primary hover:underline">
                    About page
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdvisoryBoard;
