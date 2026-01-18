import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, Building2, User, Users, ArrowRight, Shield, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: User,
    price: "$5",
    period: "per month",
    yearlyPrice: "$50/year",
    yearlySavings: "Save 17%",
    description: "Perfect for health-conscious individuals exploring evidence-based alternatives",
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    id: "professional",
    name: "Professional",
    icon: Users,
    price: "$19",
    period: "per month",
    yearlyPrice: "$190/year",
    yearlySavings: "Save 17%",
    description: "Full access for practitioners, researchers, and healthcare professionals",
    cta: "Start 7-Day Free Trial",
    variant: "default" as const,
    popular: true,
  },
  {
    id: "institution",
    name: "Institution",
    icon: Building2,
    price: "Custom",
    period: "pricing",
    description: "For universities, hospitals, clinics, and healthcare organizations",
    cta: "Contact Sales",
    variant: "outline" as const,
  },
];

const features = [
  {
    category: "Research Access",
    items: [
      { name: "Condition summaries", starter: "10", professional: "100+", institution: "100+" },
      { name: "Research article previews", starter: "50", professional: "Unlimited", institution: "Unlimited" },
      { name: "Full research library access", starter: false, professional: true, institution: true },
      { name: "Natural compounds database", starter: false, professional: true, institution: true },
      { name: "Investigational drug research", starter: false, professional: true, institution: true },
      { name: "Video resource library", starter: false, professional: true, institution: true },
    ],
  },
  {
    category: "Search & Discovery",
    items: [
      { name: "Basic search", starter: true, professional: true, institution: true },
      { name: "Advanced filters", starter: false, professional: true, institution: true },
      { name: "Saved searches", starter: false, professional: true, institution: true },
      { name: "Research alerts", starter: false, professional: true, institution: true },
    ],
  },
  {
    category: "Tools & Export",
    items: [
      { name: "Citation export", starter: false, professional: true, institution: true },
      { name: "PDF downloads", starter: false, professional: true, institution: true },
      { name: "Research bookmarks", starter: "5", professional: "Unlimited", institution: "Unlimited" },
      { name: "API access", starter: false, professional: false, institution: true },
    ],
  },
  {
    category: "Support & Training",
    items: [
      { name: "Email support", starter: "Standard", professional: "Priority", institution: "Dedicated" },
      { name: "Knowledge base access", starter: true, professional: true, institution: true },
      { name: "Training sessions", starter: false, professional: false, institution: true },
      { name: "Custom onboarding", starter: false, professional: false, institution: true },
    ],
  },
  {
    category: "Administration",
    items: [
      { name: "User accounts", starter: "1", professional: "1", institution: "Unlimited" },
      { name: "Admin dashboard", starter: false, professional: false, institution: true },
      { name: "Usage analytics", starter: false, professional: false, institution: true },
      { name: "Custom integrations", starter: false, professional: false, institution: true },
      { name: "SSO/SAML support", starter: false, professional: false, institution: true },
    ],
  },
];

const faqs = [
  {
    question: "What's included in the 7-day free trial?",
    answer: "The free trial gives you full access to all Professional plan features. No credit card required to start. You can explore the complete research library, use advanced search, and access all tools.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, the change takes effect at your next billing cycle.",
  },
  {
    question: "Do you offer academic or practitioner discounts?",
    answer: "Yes! We offer special pricing for verified students, educators, and licensed healthcare practitioners. Contact us with your credentials to receive a discount code.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for institutional accounts. Annual plans can also be paid via invoice.",
  },
  {
    question: "How does institutional licensing work?",
    answer: "Institutional licenses provide organization-wide access with centralized billing, admin controls, and usage analytics. We offer flexible seat-based or campus-wide licensing options.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption, are HIPAA-aware in our practices, and never share your personal information or research history with third parties.",
  },
];

const FeatureValue = ({ value }: { value: boolean | string }) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-primary mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="text-sm font-medium text-foreground">{value}</span>;
};

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing & Plans | EvidenceMed</title>
        <meta
          name="description"
          content="Choose the right EvidenceMed plan for your needs. Individual, professional, and institutional pricing for evidence-based alternative medicine research."
        />
        <link rel="canonical" href="https://evidencemed.org/pricing" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Transparent Pricing
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Plans for Every Need
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                From individual researchers to large institutions, find the right level of access 
                to our peer-reviewed evidence base on alternative medicine.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl bg-card border transition-all duration-300 ${
                    plan.popular
                      ? "border-primary shadow-strong scale-105"
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

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <span className="font-serif text-5xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  </div>

                  {plan.yearlyPrice && (
                    <p className="text-sm text-primary font-medium mb-4">
                      {plan.yearlySavings}: {plan.yearlyPrice}
                    </p>
                  )}

                  <p className="text-muted-foreground mb-8 min-h-[48px]">
                    {plan.description}
                  </p>

                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Compare Features
              </h2>
              <p className="text-muted-foreground">
                See exactly what's included in each plan
              </p>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-medium text-foreground w-1/3">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-foreground">
                      <span className="block text-sm text-muted-foreground">Starter</span>
                      <span className="block">$5/mo</span>
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-foreground bg-primary/5 rounded-t-lg">
                      <span className="block text-sm text-primary">Professional</span>
                      <span className="block">$19/mo</span>
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-foreground">
                      <span className="block text-sm text-muted-foreground">Institution</span>
                      <span className="block">Custom</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <>
                      <tr key={category.category} className="bg-muted/50">
                        <td
                          colSpan={4}
                          className="py-3 px-4 font-semibold text-foreground text-sm uppercase tracking-wide"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((item, itemIndex) => (
                        <tr
                          key={item.name}
                          className={`border-b border-border/50 ${
                            itemIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                          }`}
                        >
                          <td className="py-3 px-4 text-sm text-foreground">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <FeatureValue value={item.starter} />
                          </td>
                          <td className="py-3 px-4 text-center bg-primary/5">
                            <FeatureValue value={item.professional} />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <FeatureValue value={item.institution} />
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our plans
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid gap-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
                Ready to Access Evidence-Based Research?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Start your 7-day free trial today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
