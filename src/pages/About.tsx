import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, BookOpen, Shield, Target, Sparkles, Quote, FileText } from "lucide-react";

const MISSION_PILLARS = [
  {
    title: "Evidence-Based Research",
    description: "Every compound, therapy, and condition is backed by peer-reviewed research. We rate evidence honestly—including when it's weak or inconclusive.",
    icon: BookOpen,
  },
  {
    title: "Practitioner Support",
    description: "Designed for healthcare practitioners, researchers, and informed individuals seeking reliable integrative medicine information.",
    icon: Users,
  },
  {
    title: "Unbiased Information",
    description: "No affiliate deals influence our ratings. Our mission is truth, not sales. We present research as it is, not as supplement companies wish it to be.",
    icon: Shield,
  },
  {
    title: "Bridging the Gap",
    description: "We bridge the gap between clinical research and practical application, making complex studies accessible and actionable.",
    icon: Target,
  },
];

const FOCUS_AREAS = [
  {
    title: "Natural Compounds",
    description: "Comprehensive database of herbs, vitamins, minerals, and bioactive compounds with research summaries and evidence ratings.",
    icon: Sparkles,
  },
  {
    title: "Health Conditions",
    description: "200+ conditions covered with integrative therapy research, from autoimmune diseases to longevity and aging.",
    icon: Heart,
  },
  {
    title: "Integrative Therapies",
    description: "Mind-body practices, traditional medicine systems, and complementary approaches evaluated through a scientific lens.",
    icon: Users,
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About EvidenceMed | Evidence-Based Integrative Health Research</title>
        <meta name="description" content="EvidenceMed is dedicated to bridging the gap between integrative medicine research and clinical practice. Evidence-based natural health information for practitioners and patients." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">Our Mission</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Evidence-Based Integrative Health for Everyone
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  EvidenceMed exists to help people make informed health decisions. We curate 
                  peer-reviewed research on natural compounds, integrative therapies, and holistic 
                  approaches—cutting through marketing hype to show what the science actually says.
                </p>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto flex items-start gap-4">
                <Quote className="w-10 h-10 text-primary/50 flex-shrink-0 mt-1" />
                <blockquote className="text-lg italic text-muted-foreground">
                  "The biggest problem in integrative medicine isn't lack of information—it's too much 
                  noise. EvidenceMed cuts through the marketing to show you what research actually supports."
                </blockquote>
              </div>
            </div>
          </section>

          {/* Mission Pillars */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground text-center mb-10">
                  What Guides Us
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {MISSION_PILLARS.map((pillar, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <pillar.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              {pillar.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Focus Areas */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Our Focus Areas
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We cover the full spectrum of integrative health research to help practitioners 
                    and patients find evidence-based options.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {FOCUS_AREAS.map((area, index) => (
                    <Card key={index} className="text-center hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <area.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {area.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {area.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why This Matters Section */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground text-center mb-8">
                  Why EvidenceMed Exists
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The gap between what research actually shows and what gets marketed to people 
                    is enormous. Supplement companies make bold claims. Social media influencers 
                    push unproven remedies. And people desperate for answers waste money on 
                    products that don't work—or worse, could harm them.
                  </p>
                  <p>
                    EvidenceMed was built to fix this problem. Every compound, therapy, and condition 
                    on this site is backed by peer-reviewed research. We rate the evidence honestly, 
                    including when it's weak or inconclusive.
                  </p>
                  <p>
                    Whether you're a healthcare practitioner looking for integrative options for 
                    your patients, a researcher exploring natural compounds, or an individual 
                    seeking evidence-based alternatives—EvidenceMed is your trusted resource.
                  </p>
                  <p className="font-medium text-foreground text-center pt-4">
                    Our commitment: Research over marketing. Evidence over hype. Your health over profits.
                  </p>
                  <div className="flex justify-center pt-6">
                    <Link 
                      to="/editorial-methodology" 
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      See our Editorial Methodology
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="py-12 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Who We Serve
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-2">Healthcare Practitioners</h3>
                    <p className="text-sm text-muted-foreground">
                      Naturopaths, functional medicine doctors, integrative physicians, and allied health professionals.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-2">Researchers</h3>
                    <p className="text-sm text-muted-foreground">
                      Academic researchers, clinical investigators, and students studying integrative medicine.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-2">Health-Conscious Individuals</h3>
                    <p className="text-sm text-muted-foreground">
                      Anyone seeking evidence-based information about natural health options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;
