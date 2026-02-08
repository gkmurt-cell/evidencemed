import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Key, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
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

type AuthMode = "login" | "register" | "forgot" | "reset";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(
    searchParams.get("reset_token") ? "reset" : 
    searchParams.get("verify_token") ? "login" : "login"
  );
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState(searchParams.get("code") || "");
  const [inviteValidation, setInviteValidation] = useState<InviteValidation | null>(null);
  const [validatingCode, setValidatingCode] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; inviteCode?: string; confirmPassword?: string }>({});
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn } = useAuth();

  // Handle email verification on page load
  useEffect(() => {
    const verifyToken = searchParams.get("verify_token");
    if (verifyToken) {
      verifyEmail(verifyToken);
    }
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      
      if (response.ok) {
        toast({
          title: "Email Verified!",
          description: "Your email has been verified successfully. You can now sign in.",
        });
      } else {
        toast({
          title: "Verification Failed",
          description: "The verification link is invalid or has expired.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to verify email. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/member-resources");
    }
  }, [user, navigate]);

  // Validate invite code when it changes
  useEffect(() => {
    if (inviteCode && inviteCode.length >= 8 && mode === "register") {
      validateInviteCode(inviteCode);
    } else {
      setInviteValidation(null);
    }
  }, [inviteCode, mode]);

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
    const newErrors: typeof errors = {};
    
    if (mode !== "reset") {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        newErrors.email = emailResult.error.errors[0].message;
      }
    }
    
    if (mode === "login" || mode === "register" || mode === "reset") {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
    }

    if (mode === "reset" && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (mode === "register" && !inviteCode) {
      newErrors.inviteCode = "Invite code is required for registration";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.errors[0].message });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        toast({
          title: "Check Your Email",
          description: "If an account exists, you'll receive a password reset link.",
        });
        setResetSuccess(true);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    const resetToken = searchParams.get("reset_token");
    if (!resetToken) {
      toast({
        title: "Error",
        description: "Invalid reset link. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, new_password: password })
      });

      if (response.ok) {
        toast({
          title: "Password Reset!",
          description: "Your password has been updated. You can now sign in.",
        });
        setMode("login");
        navigate("/auth");
      } else {
        const error = await response.json();
        toast({
          title: "Reset Failed",
          description: error.detail || "Failed to reset password.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "forgot") {
      handleForgotPassword();
      return;
    }

    if (mode === "reset") {
      handleResetPassword();
      return;
    }
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (mode === "login") {
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
          localStorage.setItem("evidencemed_token", data.access_token);
          localStorage.setItem("evidencemed_user", JSON.stringify(data.user));
          
          toast({
            title: "Account created!",
            description: "Welcome to EvidenceMed Archive.",
          });
          
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

  const getTitle = () => {
    switch (mode) {
      case "login": return "Member Sign In";
      case "register": return "Create Account";
      case "forgot": return "Reset Password";
      case "reset": return "Set New Password";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login": return "Sign in to access member resources";
      case "register": return "Enter your invite code to create an account";
      case "forgot": return "Enter your email to receive a reset link";
      case "reset": return "Create a new password for your account";
    }
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()} | EvidenceMed Archive</title>
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
            {(mode === "forgot" || mode === "reset") && (
              <button
                onClick={() => setMode("login")}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to sign in
              </button>
            )}

            <h1 className="font-serif text-2xl font-semibold text-foreground text-center mb-2">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              {getSubtitle()}
            </p>

            {resetSuccess && mode === "forgot" ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  If an account exists with {email}, you'll receive a password reset link.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => { setMode("login"); setResetSuccess(false); }}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Invite Code - Only for registration */}
                {mode === "register" && (
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

                {/* Email - Not needed for reset */}
                {mode !== "reset" && (
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
                )}

                {/* Password - Not needed for forgot */}
                {mode !== "forgot" && (
                  <div>
                    <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4" />
                      {mode === "reset" ? "New Password" : "Password"}
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
                )}

                {/* Confirm Password - Only for reset */}
                {mode === "reset" && (
                  <div>
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4" />
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  disabled={loading || (mode === "register" && !inviteValidation?.valid)}
                  data-testid="auth-submit-btn"
                >
                  {loading ? "Please wait..." : 
                    mode === "login" ? "Sign In" : 
                    mode === "register" ? "Create Account" :
                    mode === "forgot" ? "Send Reset Link" :
                    "Reset Password"}
                </Button>
              </form>
            )}

            {/* Footer links */}
            {mode === "login" && (
              <>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Forgot your password?
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-sm text-primary hover:underline"
                    data-testid="auth-toggle-btn"
                  >
                    Have an invite code? Create account
                  </button>
                </div>
              </>
            )}

            {mode === "register" && (
              <>
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-sm text-primary hover:underline"
                    data-testid="auth-toggle-btn"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Need an invite code? Contact your institution administrator or{" "}
                  <a href="/institutional-pricing" className="text-primary hover:underline">
                    request institutional access
                  </a>
                  .
                </p>
              </>
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
