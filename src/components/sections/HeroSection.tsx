import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

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

      {/* Botanical Illustrations - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-64 lg:w-96 pointer-events-none">
        {/* Fern/Leaf 1 */}
        <svg 
          className="absolute top-20 -left-10 w-48 h-48 lg:w-64 lg:h-64 text-primary-foreground/10 drop-shadow-lg" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50 95 C50 95 20 70 15 45 C10 20 30 5 50 5 C50 5 40 25 42 45 C44 65 50 95 50 95 Z" />
          <path d="M50 95 C50 95 35 75 30 55 C25 35 35 25 50 20 C50 20 42 35 44 50 C46 65 50 95 50 95 Z" opacity="0.7" />
        </svg>
        
        {/* Herb Sprig 1 */}
        <svg 
          className="absolute top-1/3 -left-5 w-40 h-56 lg:w-52 lg:h-72 text-primary-foreground/8 drop-shadow-md rotate-12" 
          viewBox="0 0 80 120" 
          fill="currentColor"
        >
          <path d="M40 115 Q40 60 40 10 M40 20 Q25 15 15 25 Q25 35 40 30 M40 35 Q55 30 65 40 Q55 50 40 45 M40 50 Q25 45 15 55 Q25 65 40 60 M40 65 Q55 60 65 70 Q55 80 40 75 M40 80 Q25 75 15 85 Q25 95 40 90" 
            strokeWidth="2" 
            stroke="currentColor" 
            fill="none"
          />
          <ellipse cx="27" cy="25" rx="12" ry="8" opacity="0.6" />
          <ellipse cx="53" cy="40" rx="12" ry="8" opacity="0.6" />
          <ellipse cx="27" cy="55" rx="12" ry="8" opacity="0.6" />
          <ellipse cx="53" cy="70" rx="12" ry="8" opacity="0.6" />
          <ellipse cx="27" cy="85" rx="12" ry="8" opacity="0.6" />
        </svg>

        {/* Large Leaf Bottom */}
        <svg 
          className="absolute bottom-32 -left-16 w-56 h-56 lg:w-72 lg:h-72 text-primary-foreground/6 drop-shadow-xl -rotate-15" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M85 50 C85 25 65 5 40 5 C15 5 5 30 10 50 C15 70 35 85 50 90 C65 85 85 75 85 50 Z" />
          <path d="M50 90 Q50 50 40 15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M50 90 Q45 60 30 30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
          <path d="M50 90 Q55 65 65 35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
        </svg>
      </div>

      {/* Botanical Illustrations - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-64 lg:w-96 pointer-events-none">
        {/* Eucalyptus Branch */}
        <svg 
          className="absolute top-16 -right-8 w-44 h-64 lg:w-56 lg:h-80 text-primary-foreground/10 drop-shadow-lg -rotate-6" 
          viewBox="0 0 80 140" 
          fill="currentColor"
        >
          <path d="M40 135 Q42 70 45 10" stroke="currentColor" strokeWidth="2" fill="none" />
          <ellipse cx="30" cy="25" rx="15" ry="10" transform="rotate(-20 30 25)" opacity="0.7" />
          <ellipse cx="55" cy="40" rx="15" ry="10" transform="rotate(25 55 40)" opacity="0.7" />
          <ellipse cx="28" cy="55" rx="14" ry="9" transform="rotate(-15 28 55)" opacity="0.6" />
          <ellipse cx="52" cy="70" rx="14" ry="9" transform="rotate(20 52 70)" opacity="0.6" />
          <ellipse cx="30" cy="85" rx="13" ry="8" transform="rotate(-10 30 85)" opacity="0.5" />
          <ellipse cx="48" cy="100" rx="12" ry="7" transform="rotate(15 48 100)" opacity="0.5" />
          <ellipse cx="35" cy="115" rx="10" ry="6" transform="rotate(-5 35 115)" opacity="0.4" />
        </svg>

        {/* Ginkgo Leaves */}
        <svg 
          className="absolute top-1/2 -right-4 w-36 h-36 lg:w-48 lg:h-48 text-primary-foreground/8 drop-shadow-md rotate-12" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50 95 L50 50 M50 50 Q30 45 20 25 Q35 10 50 20 Q65 10 80 25 Q70 45 50 50 Z" opacity="0.6" />
          <path d="M50 50 Q50 35 50 20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>

        {/* Herb Cluster Bottom */}
        <svg 
          className="absolute bottom-24 -right-12 w-48 h-48 lg:w-64 lg:h-64 text-primary-foreground/7 drop-shadow-xl rotate-6" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50 95 Q48 50 45 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M35 90 Q33 55 30 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M65 90 Q67 55 70 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
          <circle cx="45" cy="15" r="8" opacity="0.5" />
          <circle cx="30" cy="25" r="6" opacity="0.4" />
          <circle cx="70" cy="22" r="7" opacity="0.4" />
          <ellipse cx="50" cy="35" rx="10" ry="6" opacity="0.3" />
        </svg>
      </div>

      {/* Floating Small Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-1/4 left-1/4 w-8 h-8 text-primary-foreground/10 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22 C12 22 4 16 4 10 C4 4 10 2 12 2 C12 2 8 8 10 14 C12 20 12 22 12 22 Z" />
        </svg>
        <svg className="absolute top-1/3 right-1/4 w-6 h-6 text-primary-foreground/8 animate-pulse delay-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22 C12 22 4 16 4 10 C4 4 10 2 12 2 C12 2 8 8 10 14 C12 20 12 22 12 22 Z" />
        </svg>
        <svg className="absolute bottom-1/3 left-1/3 w-10 h-10 text-primary-foreground/6 animate-pulse delay-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22 C12 22 4 16 4 10 C4 4 10 2 12 2 C12 2 8 8 10 14 C12 20 12 22 12 22 Z" />
        </svg>
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
            <span className="opacity-90">Alternative Medicine</span>
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
