import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shield, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const features = [
    "Peer-reviewed research only",
    "100+ health conditions covered",
    "Updated weekly from PubMed",
  ];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-up">
            <Shield className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Evidence-Based • Peer-Reviewed • Educational
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-primary-foreground leading-tight mb-6 animate-fade-up delay-100">
            Research-Backed
            <br />
            <span className="opacity-90">Complementary Medicine</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-up delay-200">
            Explore peer-reviewed research on alternative therapies, natural compounds, 
            and investigational treatments. Summarized, sourced, and organized for 
            practitioners and educated consumers.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-up delay-300">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
            <Button variant="hero" size="xl">
              <BookOpen className="w-5 h-5" />
              Explore Research Library
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Start 7-Day Free Trial
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/20 animate-fade-up delay-500">
            <p className="text-sm text-primary-foreground/60 mb-4">
              Trusted by researchers and practitioners worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-primary-foreground/40">
              <span className="font-serif text-lg">PubMed</span>
              <span className="font-serif text-lg">NIH</span>
              <span className="font-serif text-lg">Cochrane</span>
              <span className="font-serif text-lg">The Lancet</span>
              <span className="font-serif text-lg">Nature</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
