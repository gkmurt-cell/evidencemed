import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Building2, GraduationCap, Stethoscope, BookOpen, Award, Shield, Users, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Featured institutional users (anonymized examples)
const institutionalCategories = [
  {
    type: "Academic Medical Centers",
    icon: GraduationCap,
    description: "Teaching hospitals and university health systems using EvidenceMed for education and research",
    examples: [
      "Integrative Medicine Departments",
      "Medical School Libraries",
      "Residency Training Programs",
      "Continuing Medical Education"
    ]
  },
  {
    type: "Healthcare Systems",
    icon: Stethoscope,
    description: "Hospital networks and health systems integrating CAM resources into clinical practice",
    examples: [
      "Integrative Oncology Programs",
      "Wellness & Prevention Centers",
      "Pain Management Clinics",
      "Rehabilitation Services"
    ]
  },
  {
    type: "Educational Institutions",
    icon: BookOpen,
    description: "Schools and programs training the next generation of integrative practitioners",
    examples: [
      "Naturopathic Medical Schools",
      "Acupuncture & Oriental Medicine",
      "Nutrition & Dietetics Programs",
      "Pharmacy Schools"
    ]
  },
  {
    type: "Research Organizations",
    icon: Building2,
    description: "Research institutions studying complementary and integrative health approaches",
    examples: [
      "NIH-Funded Research Centers",
      "Clinical Trial Networks",
      "Botanical Research Labs",
      "Outcomes Research Groups"
    ]
  }
];

// Standards and compliance
const standards = [
  {
    title: "Evidence-Based Content",
    description: "All research summaries are derived from peer-reviewed publications indexed in PubMed/MEDLINE",
    icon: CheckCircle2
  },
  {
    title: "Editorial Independence",
    description: "No pharmaceutical or supplement industry funding influences content selection or presentation",
    icon: Shield
  },
  {
    title: "Regular Updates",
    description: "Database updated weekly with new research from major medical journals",
    icon: Award
  },
  {
    title: "Transparent Methodology",
    description: "Clear editorial standards and inclusion criteria publicly documented",
    icon: BookOpen
  }
];

// Institutional access features
const accessFeatures = [
  {
    title: "IP Authentication",
    description: "Seamless campus-wide access through institutional IP recognition",
    available: true
  },
  {
    title: "SAML/SSO Integration",
    description: "Single sign-on integration with institutional identity providers",
    available: true
  },
  {
    title: "Usage Statistics",
    description: "COUNTER-compliant usage reports for library assessment",
    available: true
  },
  {
    title: "API Access",
    description: "RESTful API for integration with existing library systems",
    available: true
  },
  {
    title: "LTI Integration",
    description: "Learning Tools Interoperability for LMS integration",
    available: true
  },
  {
    title: "Custom Branding",
    description: "Co-branded portal with institutional identity",
    available: false
  }
];

const InstitutionalAccess = () => {
  return (
    <>
      <Helmet>
        <title>Institutional Access | EvidenceMed Archive</title>
        <meta name="description" content="EvidenceMed institutional access for universities, hospitals, and research organizations. Enterprise features for academic medical libraries." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="py-16 bg-gradient-to-b from-primary/5 to-background border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
                  For Institutions
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Evidence-Based Integrative Medicine for Your Institution
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Provide your faculty, students, and clinicians with comprehensive access to peer-reviewed 
                  research on complementary and integrative therapies. Trusted by academic medical centers 
                  and healthcare systems worldwide.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link to="/institutional-pricing">View Plans & Pricing</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/methodology">View Our Standards</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Who Uses EvidenceMed */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Trusted by Leading Institutions
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  EvidenceMed serves academic medical centers, healthcare systems, and educational institutions 
                  seeking reliable, evidence-based integrative medicine resources.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {institutionalCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.type} className="p-6 bg-card border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">{category.type}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example) => (
                          <Badge key={example} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Editorial Standards */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Institutional-Grade Standards
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Built to meet the rigorous requirements of academic medical libraries and healthcare compliance teams.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {standards.map((standard) => {
                  const Icon = standard.icon;
                  return (
                    <div key={standard.title} className="p-6 bg-card border border-border rounded-xl text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{standard.title}</h3>
                      <p className="text-sm text-muted-foreground">{standard.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Access Features */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Enterprise Access Features
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Seamless integration with your existing library infrastructure and authentication systems.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-4">
                  {accessFeatures.map((feature) => (
                    <div 
                      key={feature.title} 
                      className={`p-4 rounded-lg border ${
                        feature.available 
                          ? "bg-card border-border" 
                          : "bg-muted/30 border-border/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          feature.available ? "bg-emerald-500/20" : "bg-muted"
                        }`}>
                          <CheckCircle2 className={`w-3 h-3 ${
                            feature.available ? "text-emerald-600" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            feature.available ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {feature.title}
                            {!feature.available && <span className="text-xs ml-2">(Coming Soon)</span>}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-primary/5 border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Start your 30-day free trial or contact our team to discuss 
                custom requirements for your organization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/institutional-pricing">View Plans & Start Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:institutions@evidencemed.com">Contact Sales</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Or email us directly at <a href="mailto:institutions@evidencemed.com" className="text-primary hover:underline">institutions@evidencemed.com</a>
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstitutionalAccess;
