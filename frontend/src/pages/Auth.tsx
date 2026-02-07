import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/member-resources");
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Authentication Error",
            description: error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
          navigate("/member-resources");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast({
            title: "Registration Error",
            description: error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to EvidenceMed Archive.",
          });
          navigate("/member-resources");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Sign In" : "Sign Up"} | EvidenceMed Archive</title>
        <meta name="description" content="Access member resources at EvidenceMed Archive." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <a href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-serif text-2xl font-semibold text-foreground">EvidenceMed</span>
          </a>

          {/* Auth Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h1 className="font-serif text-2xl font-semibold text-foreground text-center mb-2">
              {isLogin ? "Member Sign In" : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              {isLogin 
                ? "Sign in to access member resources" 
                : "Create an account to access the full archive"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={errors.email ? "border-destructive" : ""}
                  data-testid="auth-email-input"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={errors.password ? "border-destructive" : ""}
                  data-testid="auth-password-input"
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg" 
                disabled={loading}
                data-testid="auth-submit-btn"
              >
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-sm text-primary hover:underline"
                data-testid="auth-toggle-btn"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>

          {/* Back to home */}
          <p className="text-center mt-6">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to home
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
