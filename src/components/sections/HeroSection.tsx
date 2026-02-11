import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroLabImage from "@/assets/hero-lab-microscopy.jpg";

const HeroSection = () => {
  const features = [
    "Peer-reviewed research only",
    "200+ health conditions covered",
    "Updated weekly from PubMed",
  ];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroLabImage} 
          alt="Laboratory microscopy research" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Scientific Data Elements - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-64 lg:w-96 pointer-events-none">
        {/* Molecular Structure Diagram */}
        <svg 
          className="absolute top-20 left-4 w-48 h-48 lg:w-64 lg:h-64 text-primary-foreground/10 drop-shadow-lg" 
          viewBox="0 0 100 100" 
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          {/* Hexagonal ring structure */}
          <polygon points="50,20 70,35 70,55 50,70 30,55 30,35" />
          <line x1="50" y1="20" x2="50" y2="5" />
          <line x1="70" y1="35" x2="85" y2="28" />
          <line x1="70" y1="55" x2="85" y2="62" />
          <line x1="50" y1="70" x2="50" y2="85" />
          <line x1="30" y1="55" x2="15" y2="62" />
          <line x1="30" y1="35" x2="15" y2="28" />
          {/* Node circles */}
          <circle cx="50" cy="20" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="70" cy="35" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="70" cy="55" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="70" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="30" cy="55" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="30" cy="35" r="3" fill="currentColor" opacity="0.4" />
        </svg>
        
        {/* Data Graph Lines */}
        <svg 
          className="absolute top-1/3 left-8 w-40 h-32 lg:w-52 lg:h-40 text-primary-foreground/8 drop-shadow-md" 
          viewBox="0 0 100 60" 
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          {/* Axis */}
          <line x1="10" y1="50" x2="90" y2="50" opacity="0.4" />
          <line x1="10" y1="10" x2="10" y2="50" opacity="0.4" />
          {/* Data line */}
          <polyline 
            points="10,45 25,38 40,42 55,28 70,32 85,18" 
            strokeWidth="1.2"
            opacity="0.6"
          />
          {/* Data points */}
          <circle cx="10" cy="45" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="25" cy="38" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="40" cy="42" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="55" cy="28" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="70" cy="32" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="85" cy="18" r="2" fill="currentColor" opacity="0.5" />
        </svg>

        {/* Bar Chart */}
        <svg 
          className="absolute bottom-32 left-6 w-48 h-32 lg:w-56 lg:h-40 text-primary-foreground/6 drop-shadow-xl" 
          viewBox="0 0 100 60" 
          fill="currentColor"
        >
          <rect x="10" y="40" width="10" height="15" opacity="0.3" />
          <rect x="25" y="30" width="10" height="25" opacity="0.4" />
          <rect x="40" y="20" width="10" height="35" opacity="0.5" />
          <rect x="55" y="35" width="10" height="20" opacity="0.35" />
          <rect x="70" y="15" width="10" height="40" opacity="0.55" />
          <rect x="85" y="25" width="10" height="30" opacity="0.45" />
        </svg>
      </div>

      {/* Scientific Data Elements - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-64 lg:w-96 pointer-events-none">
        {/* DNA/Compound Helix abstraction */}
        <svg 
          className="absolute top-16 right-8 w-44 h-64 lg:w-56 lg:h-80 text-primary-foreground/10 drop-shadow-lg" 
          viewBox="0 0 60 140" 
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          {/* Vertical backbone lines */}
          <path d="M20 10 Q30 35 20 60 Q10 85 20 110 Q30 130 20 140" opacity="0.5" />
          <path d="M40 10 Q30 35 40 60 Q50 85 40 110 Q30 130 40 140" opacity="0.5" />
          {/* Cross bonds */}
          <line x1="20" y1="25" x2="40" y2="25" opacity="0.4" />
          <line x1="20" y1="50" x2="40" y2="50" opacity="0.4" />
          <line x1="20" y1="75" x2="40" y2="75" opacity="0.4" />
          <line x1="20" y1="100" x2="40" y2="100" opacity="0.4" />
          <line x1="20" y1="125" x2="40" y2="125" opacity="0.4" />
        </svg>

        {/* Scatter Plot */}
        <svg 
          className="absolute top-1/2 right-4 w-36 h-36 lg:w-48 lg:h-48 text-primary-foreground/8 drop-shadow-md" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <circle cx="15" cy="75" r="3" opacity="0.4" />
          <circle cx="25" cy="60" r="2.5" opacity="0.35" />
          <circle cx="35" cy="65" r="3" opacity="0.4" />
          <circle cx="45" cy="50" r="2" opacity="0.3" />
          <circle cx="55" cy="45" r="3.5" opacity="0.45" />
          <circle cx="65" cy="35" r="2.5" opacity="0.35" />
          <circle cx="75" cy="40" r="3" opacity="0.4" />
          <circle cx="85" cy="25" r="2" opacity="0.3" />
          <circle cx="40" cy="80" r="2" opacity="0.25" />
          <circle cx="60" cy="55" r="2.5" opacity="0.35" />
          <circle cx="80" cy="30" r="3" opacity="0.4" />
        </svg>

        {/* Study Count Indicator */}
        <svg 
          className="absolute bottom-24 right-12 w-48 h-48 lg:w-64 lg:h-64 text-primary-foreground/7 drop-shadow-xl" 
          viewBox="0 0 100 100" 
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        >
          {/* Concentric analysis circles */}
          <circle cx="50" cy="50" r="45" opacity="0.2" />
          <circle cx="50" cy="50" r="35" opacity="0.3" />
          <circle cx="50" cy="50" r="25" opacity="0.4" />
          <circle cx="50" cy="50" r="15" opacity="0.5" />
          {/* Cross hairs */}
          <line x1="5" y1="50" x2="95" y2="50" opacity="0.15" />
          <line x1="50" y1="5" x2="50" y2="95" opacity="0.15" />
        </svg>
      </div>

      {/* Floating Data Points */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-foreground/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary-foreground/15 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-primary-foreground/10 rounded-full animate-pulse delay-500" />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-primary-foreground/15 rounded-full animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 pt-10 pb-32 lg:pt-14 lg:pb-40 relative z-10">
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
            <span className="opacity-90">Integrative & Alternative Medicine</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-up delay-200">
            Explore peer-reviewed research on alternative therapy, complementary and alternative medicine, 
            natural compounds, and alternative cancer treatments. Evidence-based information 
            for practitioners and health-conscious consumers.
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
          <div className="flex flex-col items-center gap-3 animate-fade-up delay-400">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/research">
                  <BookOpen className="w-5 h-5" />
                  Explore Research Library
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/auth">
                  Start 7-Day Free Trial
                </Link>
              </Button>
            </div>
            <Link 
              to="/pricing" 
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground underline underline-offset-2 transition-colors"
            >
              See pricing for individuals and institutions
            </Link>
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
