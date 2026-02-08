import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, Building2, Users, GraduationCap, Sparkles } from "lucide-react";
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

// Pricing tiers
const pricingTiers = [
  {
    id: "academic",
    name: "Academic",
    description: "For educational institutions and training programs",
    price: "$2,400",
    period: "/year",
    icon: GraduationCap,
    features: [
      "Unlimited student & faculty access",
      "IP authentication",
      "COUNTER-compliant usage reports",
      "LMS integration (LTI)",
      "Curriculum integration support",
      "Email support"
    ],
    highlighted: false,
    cta: "Start 30-Day Trial"
  },
  {
    id: "clinical",
    name: "Clinical",
    description: "For hospitals, clinics, and healthcare systems",
    price: "$4,800",
    period: "/year",
    icon: Building2,
    features: [
      "Everything in Academic, plus:",
      "Multi-site licensing",
      "SAML/SSO integration",
      "API access for EHR integration",
      "Custom clinical protocols",
      "Priority phone support",
      "Dedicated account manager"
    ],
    highlighted: true,
    cta: "Start 30-Day Trial"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large health systems and research networks",
    price: "Custom",
    period: "",
    icon: Users,
    features: [
      "Everything in Clinical, plus:",
      "Unlimited site licenses",
      "Custom API integrations",
      "White-label options",
      "On-site training",
      "SLA guarantees",
      "Executive reviews"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

// Institution types for the form
const institutionTypes = [
  { value: "medical-school", label: "Medical School / University" },
  { value: "hospital", label: "Hospital / Health System" },
  { value: "clinic", label: "Clinic / Private Practice" },
  { value: "naturopathic", label: "Naturopathic / Integrative School" },
  { value: "research", label: "Research Institution" },
  { value: "library", label: "Medical Library" },
  { value: "other", label: "Other" }
];

const InstitutionalPricing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    institutionName: "",
    contactName: "",
    email: "",
    phone: "",
    institutionType: "",
    estimatedUsers: "",
    plan: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Request Submitted",
      description: "Thank you for your interest. Our institutional team will contact you within 1-2 business days.",
    });

    // Reset form
    setFormData({
      institutionName: "",
      contactName: "",
      email: "",
      phone: "",
      institutionType: "",
      estimatedUsers: "",
      plan: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const selectPlan = (planId: string) => {
    setFormData(prev => ({ ...prev, plan: planId }));
    // Scroll to form
    document.getElementById("trial-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Institutional Pricing & Trial | EvidenceMed Archive</title>
        <meta name="description" content="EvidenceMed institutional subscription plans for universities, hospitals, and healthcare organizations. Start your 30-day free trial." />
        <meta name="robots" content="noindex" /> {/* Keep page subtle/unlisted */}
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Header */}
          <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 text-center">
              <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
                Institutional Subscriptions
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                Plans for Every Institution
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Provide your faculty, students, and clinicians with comprehensive access to 
                evidence-based integrative medicine research. All plans include a 30-day free trial.
              </p>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {pricingTiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div 
                      key={tier.id}
                      className={`relative p-6 rounded-2xl border ${
                        tier.highlighted 
                          ? "bg-primary/5 border-primary/30 shadow-lg" 
                          : "bg-card border-border"
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tier.highlighted ? "bg-primary/20" : "bg-muted"
                        }`}>
                          <Icon className={`w-5 h-5 ${tier.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">{tier.name}</h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                              tier.highlighted ? "text-primary" : "text-emerald-500"
                            }`} />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full" 
                        variant={tier.highlighted ? "default" : "outline"}
                        onClick={() => selectPlan(tier.id)}
                      >
                        {tier.cta}
                      </Button>
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                All prices in USD. Annual billing. Volume discounts available for multi-year commitments.
              </p>
            </div>
          </section>

          {/* Trial Signup Form */}
          <section id="trial-form" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    Request a Trial or Quote
                  </h2>
                  <p className="text-muted-foreground">
                    Complete the form below and our institutional team will contact you within 1-2 business days 
                    to set up your trial access or provide a custom quote.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="institutionName">Institution Name *</Label>
                      <Input
                        id="institutionName"
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange("institutionName", e.target.value)}
                        placeholder="University of..."
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="institutionType">Institution Type *</Label>
                      <Select 
                        value={formData.institutionType} 
                        onValueChange={(value) => handleInputChange("institutionType", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {institutionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Dr. Jane Smith"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="jsmith@university.edu"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedUsers">Estimated Users</Label>
                      <Select 
                        value={formData.estimatedUsers} 
                        onValueChange={(value) => handleInputChange("estimatedUsers", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select range..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50 users</SelectItem>
                          <SelectItem value="51-200">51-200 users</SelectItem>
                          <SelectItem value="201-500">201-500 users</SelectItem>
                          <SelectItem value="501-1000">501-1,000 users</SelectItem>
                          <SelectItem value="1000+">1,000+ users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="plan">Interested Plan</Label>
                    <Select 
                      value={formData.plan} 
                      onValueChange={(value) => handleInputChange("plan", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a plan..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic - $2,400/year</SelectItem>
                        <SelectItem value="clinical">Clinical - $4,800/year</SelectItem>
                        <SelectItem value="enterprise">Enterprise - Custom pricing</SelectItem>
                        <SelectItem value="unsure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Information</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your institution's needs, specific departments, or any questions..."
                      rows={4}
                      className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Request Trial Access"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to be contacted by our institutional sales team. 
                    We respect your privacy and will not share your information with third parties.
                  </p>
                </form>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-10">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className="p-5 bg-card border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">What's included in the 30-day trial?</h3>
                    <p className="text-sm text-muted-foreground">
                      Full access to all features of your selected plan, including unlimited searches, 
                      full article access, and administrative tools. No credit card required.
                    </p>
                  </div>
                  
                  <div className="p-5 bg-card border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">How does IP authentication work?</h3>
                    <p className="text-sm text-muted-foreground">
                      We recognize your institution's IP address range, allowing seamless access for all 
                      users on your network without individual logins. We also support proxy server configurations.
                    </p>
                  </div>
                  
                  <div className="p-5 bg-card border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Can we get a multi-year discount?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, we offer 10% off for 2-year commitments and 15% off for 3-year commitments. 
                      Contact our sales team for custom pricing on longer terms.
                    </p>
                  </div>
                  
                  <div className="p-5 bg-card border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Do you provide usage statistics for libraries?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, all plans include COUNTER-compliant usage reports that integrate with your 
                      library's assessment tools. Reports are available monthly or on-demand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="py-12 border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground mb-4">
                Have questions? Contact our institutional team directly.
              </p>
              <p className="text-sm">
                <a href="mailto:institutions@evidencemed.com" className="text-primary hover:underline">
                  institutions@evidencemed.com
                </a>
                {" · "}
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstitutionalPricing;
