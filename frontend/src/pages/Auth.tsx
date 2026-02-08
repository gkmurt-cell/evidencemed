import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Key, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

interface InviteValidation {
  valid: boolean;
  tier?: string;
  trial_days?: number;
  institution_name?: string;
}

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState(searchParams.get("code") || "");
  const [inviteValidation, setInviteValidation] = useState<InviteValidation | null>(null);
  const [validatingCode, setValidatingCode] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; inviteCode?: string }>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/member-resources");
    }
  }, [user, navigate]);

  // Validate invite code when it changes
  useEffect(() => {
    if (inviteCode && inviteCode.length >= 8 && !isLogin) {
      validateInviteCode(inviteCode);
    } else {
      setInviteValidation(null);
    }
  }, [inviteCode, isLogin]);

  const validateInviteCode = async (code: string) => {
    setValidatingCode(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/validate-invite-code?code=${code}`);
      if (response.ok) {
        const data = await response.json();
        setInviteValidation(data);
        setErrors(prev => ({ ...prev, inviteCode: undefined }));
      } else {
        const error = await response.json();
        setInviteValidation(null);
        setErrors(prev => ({ ...prev, inviteCode: error.detail }));
      }
    } catch {
      setInviteValidation(null);
    } finally {
      setValidatingCode(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string; inviteCode?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    // Invite code is required for registration
    if (!isLogin && !inviteCode) {
      newErrors.inviteCode = "Invite code is required for registration";
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
        // Register with invite code
        const response = await fetch(`${API_URL}/api/auth/register-with-invite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            invite_code: inviteCode
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Store token and update auth state
          localStorage.setItem("evidencemed_token", data.access_token);
          localStorage.setItem("evidencemed_user", JSON.stringify(data.user));
          
          toast({
            title: "Account created!",
            description: "Welcome to EvidenceMed Archive.",
          });
          
          // Force page reload to update auth state
          window.location.href = "/member-resources";
        } else {
          const error = await response.json();
          toast({
            title: "Registration Error",
            description: error.detail || "Failed to create account",
            variant: "destructive",
          });
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
                : "Enter your invite code to create an account"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invite Code - Only for registration */}
              {!isLogin && (
                <div>
                  <Label htmlFor="inviteCode" className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4" />
                    Invite Code
                  </Label>
                  <div className="relative">
                    <Input
                      id="inviteCode"
                      type="text"
                      placeholder="Enter your invite code"
                      value={inviteCode}
                      onChange={(e) => {
                        setInviteCode(e.target.value.toUpperCase());
                        if (errors.inviteCode) setErrors({ ...errors, inviteCode: undefined });
                      }}
                      className={`uppercase font-mono ${errors.inviteCode ? "border-destructive" : inviteValidation?.valid ? "border-emerald-500" : ""}`}
                      data-testid="auth-invite-code-input"
                    />
                    {validatingCode && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Checking...
                      </span>
                    )}
                    {inviteValidation?.valid && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  {errors.inviteCode && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.inviteCode}
                    </p>
                  )}
                  {inviteValidation?.valid && (
                    <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                        Valid invite code
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {inviteValidation.institution_name && `Institution: ${inviteValidation.institution_name} · `}
                        Tier: {inviteValidation.tier} · {inviteValidation.trial_days} day trial
                      </p>
                    </div>
                  )}
                </div>
              )}

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
                disabled={loading || (!isLogin && !inviteValidation?.valid)}
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
                  setInviteValidation(null);
                }}
                className="text-sm text-primary hover:underline"
                data-testid="auth-toggle-btn"
              >
                {isLogin 
                  ? "Have an invite code? Create account" 
                  : "Already have an account? Sign in"}
              </button>
            </div>

            {!isLogin && (
              <p className="mt-4 text-xs text-center text-muted-foreground">
                Need an invite code? Contact your institution administrator or{" "}
                <a href="/institutional-pricing" className="text-primary hover:underline">
                  request institutional access
                </a>
                .
              </p>
            )}
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
