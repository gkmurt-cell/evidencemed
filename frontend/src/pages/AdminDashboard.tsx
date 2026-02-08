import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { 
  Users, 
  Mail, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw,
  Send,
  Calendar,
  Building2,
  Key
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

interface InviteCode {
  id: string;
  code: string;
  email?: string;
  institution_name?: string;
  tier: string;
  trial_days: number;
  used: boolean;
  used_by?: string;
  created_at: string;
  expires_at: string;
}

interface TrialRequest {
  id: string;
  institution_name: string;
  contact_name: string;
  contact_email: string;
  number_of_users: string;
  status: string;
  created_at: string;
}

// Admin emails - in production this would be from backend
const ADMIN_EMAILS = ["admin@evidencemed.com", "test@evidencemed.com"];

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  // State
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [trialRequests, setTrialRequests] = useState<TrialRequest[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // New invite form
  const [newInvite, setNewInvite] = useState({
    email: "",
    institution_name: "",
    tier: "starter",
    trial_days: 7
  });

  // Check if user is admin
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  // Fetch data
  useEffect(() => {
    if (isAdmin) {
      fetchInviteCodes();
      fetchTrialRequests();
    }
  }, [isAdmin]);

  const fetchInviteCodes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/invite-codes`);
      if (response.ok) {
        const data = await response.json();
        setInviteCodes(data);
      }
    } catch (error) {
      console.error("Failed to fetch invite codes:", error);
    }
  };

  const fetchTrialRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/api/institutional/trial-requests`);
      if (response.ok) {
        const data = await response.json();
        setTrialRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch trial requests:", error);
    }
  };

  const generateInviteCode = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/invite-codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvite),
      });

      if (!response.ok) throw new Error("Failed to generate code");

      const data = await response.json();
      setInviteCodes(prev => [data, ...prev]);
      
      toast({
        title: "Invite Code Generated",
        description: `Code: ${data.code} - Valid for 7 days`,
      });

      // Reset form
      setNewInvite({
        email: "",
        institution_name: "",
        tier: "starter",
        trial_days: 7
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invite code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Copied!",
      description: "Invite code copied to clipboard",
    });
  };

  const deleteCode = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/invite-codes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInviteCodes(prev => prev.filter(c => c.id !== id));
        toast({
          title: "Deleted",
          description: "Invite code removed",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete code",
        variant: "destructive",
      });
    }
  };

  const sendInviteEmail = async (code: InviteCode) => {
    if (!code.email) return;
    
    toast({
      title: "Email Sent",
      description: `Invite sent to ${code.email}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | EvidenceMed</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Header */}
          <section className="py-6 border-b border-border bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-semibold text-foreground">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Manage invite codes and trial requests</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  <Key className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              </div>
            </div>
          </section>

          {/* Generate Invite Code */}
          <section className="py-6 border-b border-border">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Generate Invite Code
              </h2>
              
              <div className="grid md:grid-cols-5 gap-4 items-end">
                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@institution.com"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    placeholder="Wellness Center Name"
                    value={newInvite.institution_name}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, institution_name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="tier">Tier</Label>
                  <select
                    id="tier"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={newInvite.tier}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, tier: e.target.value }))}
                  >
                    <option value="starter">Starter (1-10 users)</option>
                    <option value="standard">Standard (11-50 users)</option>
                    <option value="enterprise">Enterprise (51+ users)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="days">Trial Days</Label>
                  <select
                    id="days"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={newInvite.trial_days}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, trial_days: parseInt(e.target.value) }))}
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>
                <Button onClick={generateInviteCode} disabled={isGenerating}>
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4 mr-2" />}
                  Generate Code
                </Button>
              </div>
            </div>
          </section>

          {/* Active Invite Codes */}
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Active Invite Codes
                </h2>
                <Button variant="outline" size="sm" onClick={fetchInviteCodes}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {inviteCodes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No invite codes generated yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 font-medium">Code</th>
                        <th className="text-left py-3 px-4 font-medium">Email/Institution</th>
                        <th className="text-left py-3 px-4 font-medium">Tier</th>
                        <th className="text-left py-3 px-4 font-medium">Trial</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Expires</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inviteCodes.map((code) => (
                        <tr key={code.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-3 px-4">
                            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                              {code.code}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              {code.email && <p>{code.email}</p>}
                              {code.institution_name && (
                                <p className="text-muted-foreground">{code.institution_name}</p>
                              )}
                              {!code.email && !code.institution_name && (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary" className="capitalize">{code.tier}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{code.trial_days} days</span>
                          </td>
                          <td className="py-3 px-4">
                            {code.used ? (
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                Used
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {new Date(code.expires_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => copyCode(code.code)}
                              >
                                {copiedCode === code.code ? (
                                  <Check className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              {code.email && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => sendInviteEmail(code)}
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => deleteCode(code.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Trial Requests */}
          <section className="py-6 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Trial Requests ({trialRequests.length})
              </h2>

              {trialRequests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No trial requests yet.</p>
              ) : (
                <div className="grid gap-3">
                  {trialRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-card border border-border rounded-lg flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium">{request.institution_name}</p>
                          <Badge variant="secondary">{request.number_of_users} users</Badge>
                          <Badge variant="outline" className="capitalize">{request.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {request.contact_name} · {request.contact_email} · {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => {
                          setNewInvite({
                            email: request.contact_email,
                            institution_name: request.institution_name,
                            tier: request.number_of_users.includes("1-10") ? "starter" : 
                                  request.number_of_users.includes("11-50") ? "standard" : "enterprise",
                            trial_days: 7
                          });
                        }}
                      >
                        <Key className="w-4 h-4 mr-2" />
                        Create Invite
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
