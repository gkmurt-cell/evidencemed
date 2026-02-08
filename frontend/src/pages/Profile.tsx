import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, Link } from "react-router-dom";
import { 
  User, 
  Search, 
  BookmarkCheck, 
  Clock, 
  Trash2, 
  ExternalLink,
  Calendar,
  Building2,
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw,
  Shield,
  MessageSquare
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import PractitionerVerification from "@/components/practitioners/PractitionerVerification";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

interface SearchHistoryEntry {
  id: string;
  query: string;
  filters?: {
    date_from?: string;
    date_to?: string;
    study_type?: string;
  };
  results_count: number;
  searched_at: string;
}

interface SavedArticle {
  id: string;
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  saved_at: string;
}

interface VerificationStatus {
  status: string;
  verification?: {
    id: string;
    license_number: string;
    license_state: string;
    specialty: string;
    credentials: string;
    status: string;
    submitted_at: string;
    reviewed_at?: string;
    rejection_reason?: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  email_verified: boolean;
  tier?: string;
  institution_name?: string;
  is_verified_practitioner?: boolean;
  practitioner_credentials?: string;
  practitioner_specialty?: string;
  search_history: SearchHistoryEntry[];
  saved_articles: SavedArticle[];
  stats: {
    total_searches: number;
    saved_articles_count: number;
    annotations_count?: number;
    member_since: string;
    last_search?: string;
  };
}

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState<"saved" | "history">("saved");
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchVerificationStatus();
    }
  }, [user]);

  const fetchVerificationStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      const response = await fetch(`${API_URL}/api/practitioners/my-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setVerificationStatus(data);
      }
    } catch (error) {
      console.error("Failed to fetch verification status:", error);
    }
  };

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const token = localStorage.getItem("evidencemed_token");
      if (!token) throw new Error("No token");

      const response = await fetch(`${API_URL}/api/user/profile?token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const deleteSearchHistory = async (entryId: string) => {
    try {
      const token = localStorage.getItem("evidencemed_token");
      const response = await fetch(
        `${API_URL}/api/user/search-history/${entryId}?token=${token}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProfile(prev => prev ? {
          ...prev,
          search_history: prev.search_history.filter(h => h.id !== entryId),
          stats: { ...prev.stats, total_searches: prev.stats.total_searches - 1 }
        } : null);
        toast({ title: "Search entry deleted" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete search entry",
        variant: "destructive",
      });
    }
  };

  const clearAllHistory = async () => {
    try {
      const token = localStorage.getItem("evidencemed_token");
      const response = await fetch(
        `${API_URL}/api/user/search-history?token=${token}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProfile(prev => prev ? {
          ...prev,
          search_history: [],
          stats: { ...prev.stats, total_searches: 0 }
        } : null);
        toast({ title: "Search history cleared" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear history",
        variant: "destructive",
      });
    }
  };

  const unsaveArticle = async (pmid: string) => {
    try {
      const token = localStorage.getItem("evidencemed_token");
      const response = await fetch(
        `${API_URL}/api/user/saved-articles/${pmid}?token=${token}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProfile(prev => prev ? {
          ...prev,
          saved_articles: prev.saved_articles.filter(a => a.pmid !== pmid),
          stats: { ...prev.stats, saved_articles_count: prev.stats.saved_articles_count - 1 }
        } : null);
        toast({ title: "Article removed from saved" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove article",
        variant: "destructive",
      });
    }
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

  return (
    <>
      <Helmet>
        <title>Profile | EvidenceMed Archive</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          {/* Profile Header */}
          <section className="py-8 border-b border-border bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-semibold text-foreground">
                      {profile?.email || user.email}
                    </h1>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                      {profile?.email_verified ? (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600">
                          <XCircle className="w-3 h-3" /> Unverified
                        </span>
                      )}
                      {profile?.is_verified_practitioner && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                          <Shield className="w-3 h-3 mr-1" />
                          {profile.practitioner_credentials} • {profile.practitioner_specialty}
                        </Badge>
                      )}
                      {profile?.tier && (
                        <Badge variant="secondary" className="capitalize">
                          {profile.tier}
                        </Badge>
                      )}
                      {profile?.institution_name && (
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {profile.institution_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {!profile?.is_verified_practitioner && (
                    <PractitionerVerification
                      token={localStorage.getItem("evidencemed_token") || ""}
                      currentStatus={verificationStatus || undefined}
                      onVerificationSubmitted={fetchVerificationStatus}
                    />
                  )}
                  <Button variant="outline" size="sm" onClick={fetchProfile}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-6 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-2xl font-semibold text-foreground">
                    {profile?.stats.saved_articles_count || 0}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <BookmarkCheck className="w-3 h-3" />
                    Saved Articles
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-2xl font-semibold text-foreground">
                    {profile?.stats.total_searches || 0}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Search className="w-3 h-3" />
                    Total Searches
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-2xl font-semibold text-foreground">
                    {profile?.stats.annotations_count || 0}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Annotations
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    {profile?.stats.member_since 
                      ? new Date(profile.stats.member_since).toLocaleDateString()
                      : "—"}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Member Since
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    {profile?.stats.last_search 
                      ? new Date(profile.stats.last_search).toLocaleDateString()
                      : "Never"}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last Search
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex gap-4 mb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "saved"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4 inline mr-2" />
                  Saved Articles ({profile?.saved_articles.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "history"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Search History ({profile?.search_history.length || 0})
                </button>
              </div>

              {loadingProfile ? (
                <div className="text-center py-12">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : activeTab === "saved" ? (
                /* Saved Articles */
                <div className="space-y-3">
                  {profile?.saved_articles.length === 0 ? (
                    <div className="text-center py-12">
                      <BookmarkCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-foreground mb-2">No saved articles</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Save articles while browsing to access them here
                      </p>
                      <Button asChild>
                        <Link to="/research">Browse Research</Link>
                      </Button>
                    </div>
                  ) : (
                    profile?.saved_articles.map((article) => (
                      <div 
                        key={article.pmid} 
                        className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <a 
                              href={`https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {article.title}
                            </a>
                            <p className="text-sm text-muted-foreground mt-1">
                              {article.authors.slice(0, 3).join(", ")}
                              {article.authors.length > 3 && " et al."}
                            </p>
                            <p className="text-sm text-primary mt-1">
                              {article.journal} ({article.year})
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Saved {new Date(article.saved_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                            >
                              <a 
                                href={`https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => unsaveArticle(article.pmid)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Search History */
                <div className="space-y-3">
                  {profile?.search_history.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-foreground mb-2">No search history</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your searches will appear here
                      </p>
                      <Button asChild>
                        <Link to="/research">Start Searching</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-end mb-4">
                        <Button variant="outline" size="sm" onClick={clearAllHistory}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Clear All
                        </Button>
                      </div>
                      {profile?.search_history.map((entry) => (
                        <div 
                          key={entry.id} 
                          className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <Link 
                                to={`/research?q=${encodeURIComponent(entry.query)}`}
                                className="font-medium text-foreground hover:text-primary transition-colors"
                              >
                                "{entry.query}"
                              </Link>
                              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                <span>{entry.results_count.toLocaleString()} results</span>
                                {entry.filters?.study_type && (
                                  <Badge variant="secondary" className="text-xs">
                                    {entry.filters.study_type.replace(/_/g, " ")}
                                  </Badge>
                                )}
                                {entry.filters?.date_from && (
                                  <span>From {entry.filters.date_from}</span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(entry.searched_at).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <Link to={`/research?q=${encodeURIComponent(entry.query)}`}>
                                  <Search className="w-3 h-3 mr-1" />
                                  Search Again
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => deleteSearchHistory(entry.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
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

export default Profile;
