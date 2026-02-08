import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, X, Building2, Users, User, GraduationCap, Sparkles, Shield, BookOpen, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Individual/Professional plans (from original build)
const individualPlans = [
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
    period: "",
    description: "For universities, hospitals, clinics, and healthcare organizations",
    cta: "View Institutional Tiers",
    variant: "default" as const,
  },
];

// Institutional user-based tiers (from original build)
const institutionalTiers = [
  {
    id: "starter",
    name: "Starter",
    icon: User,
    users: "1–10",
    description: "Small wellness centers and private practices",
    features: "Full access to all conditions, research library, natural compounds, video resources, export & citation tools",
    price: "Custom Quote"
  },
  {
    id: "standard",
    name: "Standard",
    icon: Users,
    users: "11–50",
    description: "Medium-sized clinics and departments",
    features: "Everything in Starter + advanced search & filters, priority email support",
    price: "Custom Quote"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    users: "51+",
    description: "Large hospitals, universities, and health systems",
    features: "Everything in Standard + multi-seat licensing, API access, admin dashboard, analytics, dedicated support & training",
    price: "Custom Quote",
    popular: true
  },
];

// Feature comparison
const features = [
  {
    category: "Research Access",
    items: [
      { name: "Condition summaries", starter: "10", professional: "200+", institution: "200+" },
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

// FAQs
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
    question: "How does institutional licensing work?",
    answer: "Institutional licenses provide organization-wide access with centralized billing, admin controls, and usage analytics. We offer flexible seat-based licensing based on your user count.",
  },
  {
    question: "What about small wellness centers?",
    answer: "Our Starter institutional tier (1-10 users) is perfect for small wellness centers, private practices, and integrative medicine clinics. Contact us for affordable custom pricing.",
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

const InstitutionalPricing = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    institutionName: "",
    department: "",
    contactName: "",
    contactEmail: "",
    numberOfUsers: "",
    institutionType: "",
    message: "",
  });

  const handleQuoteFormChange = (field: string, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const API_URL = process.env.REACT_APP_BACKEND_URL || "";

    try {
      const response = await fetch(`${API_URL}/api/institutional/trial-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institution_name: quoteForm.institutionName,
          institution_type: quoteForm.institutionType,
          department: quoteForm.department,
          contact_name: quoteForm.contactName,
          contact_email: quoteForm.contactEmail,
          number_of_users: quoteForm.numberOfUsers,
          message: quoteForm.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      toast({
        title: "Quote Request Submitted",
        description: "Our team will contact you within 24 hours with a custom quote.",
      });

      setQuoteForm({
        institutionName: "",
        department: "",
        contactName: "",
        contactEmail: "",
        numberOfUsers: "",
        institutionType: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToInstitutional = () => {
    document.getElementById('institutional')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Pricing & Plans | EvidenceMed Archive</title>
        <meta name="description" content="EvidenceMed pricing for individuals, professionals, and institutions. Flexible plans from $5/month to custom enterprise licensing." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 text-center">
              <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
                <Shield className="w-3 h-3 mr-1" />
                Transparent Pricing
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                Plans for Every Need
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From individual researchers to large institutions, find the right level of access 
                to our peer-reviewed evidence base on integrative medicine.
              </p>
            </div>
          </section>

          {/* Individual/Professional Plans */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {individualPlans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div 
                      key={plan.id}
                      className={`relative p-6 rounded-2xl bg-card border transition-all ${
                        plan.popular 
                          ? "border-primary shadow-lg scale-105" 
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">{plan.name}</h3>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      </div>
                      
                      {plan.yearlyPrice && (
                        <p className="text-sm text-primary font-medium mb-4">
                          {plan.yearlySavings}: {plan.yearlyPrice}
                        </p>
                      )}
                      
                      <p className="text-sm text-muted-foreground mb-6 min-h-[48px]">
                        {plan.description}
                      </p>
                      
                      {plan.id === "institution" ? (
                        <Button 
                          variant={plan.variant} 
                          className="w-full"
                          onClick={scrollToInstitutional}
                        >
                          {plan.cta}
                        </Button>
                      ) : (
                        <Button variant={plan.variant} className="w-full" asChild>
                          <Link to="/auth">{plan.cta}</Link>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Feature Comparison */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Compare Features
                </h2>
                <p className="text-muted-foreground">See exactly what's included in each plan</p>
              </div>

              <div className="max-w-5xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse bg-card rounded-xl border border-border">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-medium text-foreground w-1/3">Feature</th>
                      <th className="text-center py-4 px-4 font-medium text-foreground">
                        <span className="block text-sm text-muted-foreground">Starter</span>
                        <span className="block">$5/mo</span>
                      </th>
                      <th className="text-center py-4 px-4 font-medium text-foreground bg-primary/5">
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
                    {features.map((category) => (
                      <>
                        <tr key={category.category} className="bg-muted/50">
                          <td colSpan={4} className="py-3 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                            {category.category}
                          </td>
                        </tr>
                        {category.items.map((item, idx) => (
                          <tr key={item.name} className={`border-b border-border/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                            <td className="py-3 px-4 text-sm text-foreground">{item.name}</td>
                            <td className="py-3 px-4 text-center"><FeatureValue value={item.starter} /></td>
                            <td className="py-3 px-4 text-center bg-primary/5"><FeatureValue value={item.professional} /></td>
                            <td className="py-3 px-4 text-center"><FeatureValue value={item.institution} /></td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Institutional Tiers Section */}
          <section id="institutional" className="py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  Institutional Access
                </Badge>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Flexible Access for Institutions, Universities & Wellness Centers
                </h2>
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  "Scale your access based on the number of users in your organization."
                </p>
              </div>

              <div className="max-w-4xl mx-auto mb-10">
                <p className="text-center text-muted-foreground leading-relaxed">
                  EvidenceMed offers research-backed educational access to over <span className="font-semibold text-foreground">200 health conditions</span>, <span className="font-semibold text-foreground">4,000+ peer-reviewed studies</span>, and natural compound profiles. Institutional packages are customized based on the number of users, perfect for small wellness centers to large university health systems.
                </p>
              </div>

              {/* User-Based Tiers Table */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left py-4 px-6 font-semibold text-foreground">Tier</th>
                        <th className="text-center py-4 px-6 font-semibold text-foreground">Users</th>
                        <th className="text-left py-4 px-6 font-semibold text-foreground">Features</th>
                        <th className="text-center py-4 px-6 font-semibold text-foreground">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {institutionalTiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                          <tr key={tier.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                            <td className="py-5 px-6">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  tier.popular ? "bg-primary" : "bg-primary/10"
                                }`}>
                                  <Icon className={`w-5 h-5 ${tier.popular ? "text-primary-foreground" : "text-primary"}`} />
                                </div>
                                <div>
                                  <span className="font-semibold text-foreground">{tier.name}</span>
                                  {tier.popular && (
                                    <Badge className="ml-2 text-xs bg-primary/20 text-primary">Popular</Badge>
                                  )}
                                  <p className="text-xs text-muted-foreground">{tier.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-5 px-6 text-center">
                              <span className="text-lg font-medium text-foreground">{tier.users}</span>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-muted-foreground">{tier.features}</p>
                            </td>
                            <td className="py-5 px-6 text-center">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {tier.price}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  All pricing is based on the number of users. Contact our team for a tailored quote to fit your organization's needs.
                </p>
              </div>

              {/* Quote Request Form */}
              <div className="max-w-2xl mx-auto">
                <div className="p-8 rounded-2xl bg-card border border-border shadow-lg">
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Request a Custom Quote
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="institutionName">Institution Name *</Label>
                        <Input
                          id="institutionName"
                          placeholder="Your organization..."
                          required
                          value={quoteForm.institutionName}
                          onChange={(e) => handleQuoteFormChange("institutionName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institutionType">Institution Type</Label>
                        <Select 
                          value={quoteForm.institutionType} 
                          onValueChange={(value) => handleQuoteFormChange("institutionType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wellness-center">Wellness Center</SelectItem>
                            <SelectItem value="private-practice">Private Practice</SelectItem>
                            <SelectItem value="clinic">Clinic / Medical Center</SelectItem>
                            <SelectItem value="hospital">Hospital / Health System</SelectItem>
                            <SelectItem value="university">University / Medical School</SelectItem>
                            <SelectItem value="research">Research Institution</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          placeholder="Your full name"
                          required
                          value={quoteForm.contactName}
                          onChange={(e) => handleQuoteFormChange("contactName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="you@organization.com"
                          required
                          value={quoteForm.contactEmail}
                          onChange={(e) => handleQuoteFormChange("contactEmail", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfUsers">Estimated Number of Users *</Label>
                        <Select 
                          value={quoteForm.numberOfUsers} 
                          onValueChange={(value) => handleQuoteFormChange("numberOfUsers", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select range..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 users (Starter)</SelectItem>
                            <SelectItem value="11-50">11-50 users (Standard)</SelectItem>
                            <SelectItem value="51-100">51-100 users (Enterprise)</SelectItem>
                            <SelectItem value="101-500">101-500 users</SelectItem>
                            <SelectItem value="500+">500+ users</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="e.g., Integrative Medicine"
                          value={quoteForm.department}
                          onChange={(e) => handleQuoteFormChange("department", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <textarea
                        id="message"
                        placeholder="Tell us about your organization's needs..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={quoteForm.message}
                        onChange={(e) => handleQuoteFormChange("message", e.target.value)}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Request Custom Quote
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Supporting Copy */}
                  <div className="mt-8 pt-6 border-t border-border space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Discounts available for academic institutions and wellness centers</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Access can be expanded at any time as your team grows</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>All access is non-prescriptive and for educational purposes only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">Everything you need to know about our plans</p>
              </div>

              <div className="max-w-3xl mx-auto grid gap-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
                Ready to Access Evidence-Based Research?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Start your 7-day free trial today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/auth">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={scrollToInstitutional}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstitutionalPricing;
