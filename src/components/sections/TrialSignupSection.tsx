import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Building2, Users, Briefcase, Sparkles } from "lucide-react";
import { getBackendClient } from "@/lib/backend";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

const licensePlans: {
  id: string;
  name: string;
  icon: typeof Users;
  userLimit: number | null;
  price: string;
  features: string[];
}[] = [
  {
    id: "individual",
    name: "Individual",
    icon: Users,
    userLimit: 1,
    price: "$19/mo",
    features: ["Full platform access", "7-day free trial", "Email support"],
  },
  {
    id: "practice",
    name: "Private Practice",
    icon: Briefcase,
    userLimit: 5,
    price: "$79/mo",
    features: ["Up to 5 practitioners", "Shared resources", "Priority support", "Custom branding"],
  },
  {
    id: "institution",
    name: "Institution",
    icon: Building2,
    userLimit: null,
    price: "Custom",
    features: ["Unlimited users", "API access", "Admin dashboard", "Dedicated support", "Training sessions"],
  },
];

const TrialSignupSection = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("individual");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    organization: "",
    couponCode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailResult = emailSchema.safeParse(formData.email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const client = await getBackendClient();
      if (!client) {
        throw new Error("Backend unavailable");
      }

      const { error } = await client.from("trial_signups").insert({
        email: formData.email,
        name: formData.name,
        organization: formData.organization || null,
        license_type: selectedPlan as "individual" | "practice" | "institution",
        coupon_code: formData.couponCode || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Trial signup successful!",
        description: "Check your email for next steps.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Welcome to EvidenceMed!
            </h2>
            <p className="text-muted-foreground mb-6">
              Check your email ({formData.email}) for your trial access credentials and getting started guide.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="/auth">Create Account</a>
              </Button>
              <Button variant="outline" onClick={() => {
                setSubmitted(false);
                setFormData({ email: "", name: "", organization: "", couponCode: "" });
              }}>
                Sign up another
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="trial-signup" className="py-12 lg:py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Start Your Free Trial
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground">
              Select your plan and begin your 7-day free trial.
              Use a coupon code for special institutional or practitioner discounts.
            </p>
          </div>

          {/* License Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {licensePlans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-medium"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.userLimit === null ? "Unlimited users" : `Up to ${plan.userLimit} user${plan.userLimit > 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-4">{plan.price}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Full Name *
                </label>
                <Input
                  placeholder="Dr. Jane Doe"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={errors.name ? "border-destructive" : ""}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="jane@practice.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={errors.email ? "border-destructive" : ""}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Organization (optional)
                </label>
                <Input
                  placeholder="Your clinic or institution"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Coupon / Master Code (optional)
                </label>
                <Input
                  placeholder="INST2026 or practitioner code"
                  value={formData.couponCode}
                  onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter institution or affiliate code for special pricing
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-sm text-muted-foreground">
                By signing up, you agree to receive trial-related emails and updates.
              </p>
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "Submitting..." : "Start 7-Day Free Trial"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TrialSignupSection;
