import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-10 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative p-8 lg:p-12 rounded-2xl hero-gradient overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full blur-3xl" />
            </div>

            <div className="relative text-center">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4">
                Start Your Research Journey
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Access peer-reviewed research on alternative and complementary medicine. 
                Join researchers, practitioners, and educated consumers exploring 
                evidence-based natural health.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/auth">
                    <BookOpen className="w-5 h-5" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  variant="heroOutline" 
                  size="xl"
                  onClick={() => document.getElementById('trial-signup')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Mail className="w-5 h-5" />
                  Subscribe to Updates
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { value: "10,000+", label: "Research Studies" },
              { value: "200+", label: "Health Conditions" },
              { value: "500+", label: "Natural Compounds" },
              { value: "Weekly", label: "Content Updates" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
