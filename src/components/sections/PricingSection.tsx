import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$5",
    period: "per month",
    description: "Basic access to explore the platform",
    features: [
      "10 condition summaries",
      "50 research previews",
      "Weekly newsletter",
      "Basic search functionality",
    ],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Professional",
    price: "$19",
    period: "per month",
    yearlyPrice: "$190/year",
    description: "Full access for practitioners & researchers",
    features: [
      "All 200+ conditions",
      "Complete research library",
      "Advanced search & filters",
      "Natural compounds database",
      "Investigational drug research",
      "Video resource library",
      "Export & citation tools",
      "Priority email support",
    ],
    cta: "Start 7-Day Trial",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Institution",
    price: "Custom",
    period: "",
    description: "For universities & healthcare organizations",
    features: [
      "Everything in Professional",
      "Multi-seat licensing",
      "API access",
      "Custom integrations",
      "Admin dashboard",
      "Usage analytics",
      "Dedicated support",
      "Training sessions",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-10 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Choose Your Access Level
          </h2>
          <p className="text-lg text-muted-foreground">
            From free exploration to full research access. 
            All plans include our commitment to evidence-based, peer-reviewed content.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl bg-card border transition-all duration-300 ${
                plan.popular
                  ? "border-primary shadow-strong scale-105 lg:scale-110"
                  : "border-border hover:border-primary/30 hover:shadow-medium"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="font-serif text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
                {plan.yearlyPrice && (
                  <p className="text-sm text-primary font-medium">
                    Save 17% with yearly: {plan.yearlyPrice}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === "Institution" ? (
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/pricing#institutional">{plan.cta}</Link>
                </Button>
              ) : plan.name === "Professional" ? (
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full"
                  onClick={() => document.getElementById('trial-signup')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.cta}
                </Button>
              ) : (
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full"
                  onClick={() => document.getElementById('trial-signup')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Academic and practitioner discounts available. 
            <a href="#" className="text-primary hover:underline ml-1">
              Learn more about coupon codes
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
