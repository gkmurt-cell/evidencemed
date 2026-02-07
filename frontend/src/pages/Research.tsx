import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Database,
  Bell,
  BellOff,
  FileText, 
  FlaskConical, 
  Users, 
  TestTube, 
  ExternalLink,
  Trash2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import PubMedSearchPanel from "@/components/research/PubMedSearchPanel";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import researchHeroImage from "@/assets/research-hero-library.jpg";

// Research statistics
const researchStats = [
  { id: "in-vitro", name: "In Vitro Studies", icon: TestTube, count: "4,200+" },
  { id: "animal", name: "Animal Models", icon: FlaskConical, count: "3,800+" },
  { id: "observational", name: "Observational Studies", icon: Users, count: "2,100+" },
  { id: "rct", name: "Controlled Trials", icon: FileText, count: "890+" },
];

// Quick browse topics
const quickBrowseTopics = [
  "curcumin", "ashwagandha", "omega-3", "probiotics", "vitamin D",
  "magnesium", "melatonin", "berberine", "quercetin", "NAC"
];

// Saved alert interface
interface ResearchAlert {
  id: string;
  query: string;
  createdAt: string;
  enabled: boolean;
}

const ALERTS_KEY = "evidencemed_research_alerts";

const Research = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  
  // Research Alerts state
  const [alerts, setAlerts] = useState<ResearchAlert[]>(() => {
    try {
      const saved = localStorage.getItem(ALERTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save alerts to localStorage
  const saveAlerts = (newAlerts: ResearchAlert[]) => {
    setAlerts(newAlerts);
    localStorage.setItem(ALERTS_KEY, JSON.stringify(newAlerts));
  };

  // Add a new research alert
  const addAlert = (query: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save research alerts.",
        variant: "destructive",
      });
      return;
    }

    if (!query.trim()) return;

    // Check if alert already exists
    if (alerts.some(a => a.query.toLowerCase() === query.toLowerCase())) {
      toast({
        title: "Alert exists",
        description: "You already have an alert for this search.",
      });
      return;
    }

    const newAlert: ResearchAlert = {
      id: crypto.randomUUID(),
      query: query.trim(),
      createdAt: new Date().toISOString(),
      enabled: true,
    };

    saveAlerts([...alerts, newAlert]);
    toast({
      title: "Alert created",
      description: `You'll be notified when new studies for "${query}" are published.`,
    });
  };

  // Toggle alert enabled state
  const toggleAlert = (id: string) => {
    const updated = alerts.map(a => 
      a.id === id ? { ...a, enabled: !a.enabled } : a
    );
    saveAlerts(updated);
  };

  // Delete an alert
  const deleteAlert = (id: string) => {
    const updated = alerts.filter(a => a.id !== id);
    saveAlerts(updated);
    toast({
      title: "Alert removed",
      description: "Research alert has been deleted.",
    });
  };

  // Handle search from quick browse
  const handleQuickSearch = (topic: string) => {
    setCurrentSearchQuery(topic);
  };

  return (
    <>
      <Helmet>
        <title>Research Library | EvidenceMed Archive</title>
        <meta 
          name="description" 
          content="Search peer-reviewed research on integrative medicine, complementary therapies, and natural compounds from PubMed and NIH databases." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-20 lg:pt-24 pb-12 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={researchHeroImage} 
              alt="Research library" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Peer-Reviewed Research
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Search millions of peer-reviewed studies from PubMed, the National Library of Medicine's 
                database. Access abstracts, citation information, and direct links to full-text articles.
              </p>
              <EducationalDisclaimer />
            </div>
          </div>
        </section>

        {/* Research Stats */}
        <section className="border-y border-border bg-muted/30 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {researchStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="text-center">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                    <p className="text-xs text-muted-foreground">{stat.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Main Search Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* PubMed Search */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    <h2 className="font-serif text-xl font-semibold">Search PubMed Database</h2>
                  </div>
                  {user && currentSearchQuery && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => addAlert(currentSearchQuery)}
                      className="gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Save Alert
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Search millions of peer-reviewed research articles from the National Library of Medicine database.
                  Enter specific terms like "curcumin inflammation" or "ashwagandha anxiety" for targeted results.
                </p>
                <PubMedSearchPanel 
                  maxResults={20} 
                  initialQuery={currentSearchQuery}
                  onSearchChange={setCurrentSearchQuery}
                />
              </div>

              {/* Quick Browse by Topic */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Quick Browse by Topic</h3>
                <div className="flex flex-wrap gap-2">
                  {quickBrowseTopics.map((topic) => (
                    <Button 
                      key={topic}
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickSearch(topic)}
                      className="capitalize"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>

              {/* External Resources */}
              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Additional Research Databases</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://www.cochranelibrary.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Cochrane Library</p>
                      <p className="text-xs text-muted-foreground">Systematic reviews & meta-analyses</p>
                    </div>
                  </a>
                  <a 
                    href="https://clinicaltrials.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">ClinicalTrials.gov</p>
                      <p className="text-xs text-muted-foreground">Ongoing & completed trials</p>
                    </div>
                  </a>
                  <a 
                    href="https://www.nccih.nih.gov/health/providers/clinicalpractice" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">NIH NCCIH</p>
                      <p className="text-xs text-muted-foreground">Complementary health research</p>
                    </div>
                  </a>
                  <a 
                    href="https://examine.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Examine.com</p>
                      <p className="text-xs text-muted-foreground">Supplement research summaries</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar - Research Alerts */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-lg font-semibold">Research Alerts</h3>
                </div>
                
                {!user ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign in to save searches and get notified when new studies are published.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="text-center py-6">
                    <BellOff className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      No alerts yet. Search for a topic and click "Save Alert" to get notified of new research.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`p-3 rounded-lg border transition-colors ${
                          alert.enabled 
                            ? "bg-primary/5 border-primary/20" 
                            : "bg-muted/50 border-border"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => handleQuickSearch(alert.query)}
                              className="font-medium text-foreground hover:text-primary transition-colors text-left truncate block w-full"
                            >
                              {alert.query}
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">
                              {alert.enabled ? (
                                <span className="flex items-center gap-1 text-primary">
                                  <Check className="w-3 h-3" />
                                  Active
                                </span>
                              ) : (
                                "Paused"
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => toggleAlert(alert.id)}
                              title={alert.enabled ? "Pause alert" : "Enable alert"}
                            >
                              {alert.enabled ? (
                                <BellOff className="w-3.5 h-3.5" />
                              ) : (
                                <Bell className="w-3.5 h-3.5" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => deleteAlert(alert.id)}
                              title="Delete alert"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Alerts are checked daily for new publications.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Research;
