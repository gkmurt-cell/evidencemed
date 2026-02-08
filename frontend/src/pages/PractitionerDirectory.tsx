import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Search, 
  Building2, 
  MessageSquare, 
  Filter,
  Users,
  ArrowLeft,
  Stethoscope,
  GraduationCap,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

interface Practitioner {
  id: string;
  display_name: string;
  credentials: string;
  specialty: string;
  institution?: string;
  bio?: string;
  verified_at: string;
  annotation_count: number;
}

interface SpecialtyCount {
  specialty: string;
  count: number;
}

const CREDENTIAL_OPTIONS = [
  { value: "all", label: "All Credentials" },
  { value: "MD", label: "MD - Doctor of Medicine" },
  { value: "DO", label: "DO - Doctor of Osteopathic Medicine" },
  { value: "ND", label: "ND - Naturopathic Doctor" },
  { value: "DC", label: "DC - Doctor of Chiropractic" },
  { value: "LAc", label: "LAc - Licensed Acupuncturist" },
  { value: "RD", label: "RD - Registered Dietitian" },
  { value: "PharmD", label: "PharmD - Doctor of Pharmacy" },
  { value: "PhD", label: "PhD - Doctor of Philosophy" },
  { value: "NP", label: "NP - Nurse Practitioner" },
  { value: "PA", label: "PA - Physician Assistant" },
];

const PractitionerDirectory = () => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [specialties, setSpecialties] = useState<SpecialtyCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCredentials, setSelectedCredentials] = useState("all");

  useEffect(() => {
    fetchPractitioners();
    fetchSpecialties();
  }, []);

  const fetchPractitioners = async () => {
    try {
      const response = await fetch(`${API_URL}/api/practitioners/directory`);
      if (response.ok) {
        const data = await response.json();
        setPractitioners(data);
      }
    } catch (error) {
      console.error("Failed to fetch practitioners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const response = await fetch(`${API_URL}/api/practitioners/specialties`);
      if (response.ok) {
        const data = await response.json();
        setSpecialties(data);
      }
    } catch (error) {
      console.error("Failed to fetch specialties:", error);
    }
  };

  const filteredPractitioners = useMemo(() => {
    let filtered = practitioners;

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(p => 
        p.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    // Filter by credentials
    if (selectedCredentials !== "all") {
      filtered = filtered.filter(p => 
        p.credentials.toLowerCase() === selectedCredentials.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.display_name.toLowerCase().includes(query) ||
        p.specialty.toLowerCase().includes(query) ||
        p.credentials.toLowerCase().includes(query) ||
        (p.institution && p.institution.toLowerCase().includes(query)) ||
        (p.bio && p.bio.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [practitioners, selectedSpecialty, selectedCredentials, searchQuery]);

  const getCredentialColor = (credentials: string): string => {
    const colors: Record<string, string> = {
      "MD": "bg-blue-500/10 text-blue-600 border-blue-500/30",
      "DO": "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
      "ND": "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
      "DC": "bg-purple-500/10 text-purple-600 border-purple-500/30",
      "LAc": "bg-amber-500/10 text-amber-600 border-amber-500/30",
      "RD": "bg-pink-500/10 text-pink-600 border-pink-500/30",
      "PharmD": "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
      "PhD": "bg-rose-500/10 text-rose-600 border-rose-500/30",
      "NP": "bg-teal-500/10 text-teal-600 border-teal-500/30",
      "PA": "bg-orange-500/10 text-orange-600 border-orange-500/30",
    };
    return colors[credentials] || "bg-gray-500/10 text-gray-600 border-gray-500/30";
  };

  return (
    <>
      <Helmet>
        <title>Practitioner Directory | EvidenceMed</title>
        <meta
          name="description"
          content="Browse verified healthcare practitioners specializing in integrative and functional medicine."
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-8 lg:py-12 border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                  Practitioner Directory
                </h1>
                <p className="text-sm text-muted-foreground">
                  {practitioners.length} verified healthcare professionals
                </p>
              </div>
            </div>

            <p className="text-muted-foreground max-w-2xl mb-6">
              Browse our community of verified practitioners specializing in integrative medicine, 
              functional medicine, and evidence-based natural therapies. All practitioners have 
              verified credentials.
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, specialty, institution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="practitioner-search"
                />
              </div>

              {/* Specialty Filter */}
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full sm:w-48">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((s) => (
                    <SelectItem key={s.specialty} value={s.specialty}>
                      {s.specialty} ({s.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Credentials Filter */}
              <Select value={selectedCredentials} onValueChange={setSelectedCredentials}>
                <SelectTrigger className="w-full sm:w-48">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Credentials" />
                </SelectTrigger>
                <SelectContent>
                  {CREDENTIAL_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Practitioners Grid */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredPractitioners.length}</span> practitioners
              </p>
              {(selectedSpecialty !== "all" || selectedCredentials !== "all" || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedSpecialty("all");
                    setSelectedCredentials("all");
                    setSearchQuery("");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-lg animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-3" />
                    <div className="h-6 bg-muted rounded w-2/3 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                    <div className="h-16 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : filteredPractitioners.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-lg">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No practitioners found</h3>
                <p className="text-muted-foreground mb-4">
                  {practitioners.length === 0
                    ? "Be the first to verify your credentials and join the directory!"
                    : "Try adjusting your search or filter criteria."}
                </p>
                {practitioners.length === 0 ? (
                  <Button asChild>
                    <Link to="/profile">Verify as Practitioner</Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSpecialty("all");
                      setSelectedCredentials("all");
                      setSearchQuery("");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPractitioners.map((practitioner) => (
                  <div
                    key={practitioner.id}
                    className="p-4 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all"
                    data-testid={`practitioner-card-${practitioner.id}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getCredentialColor(practitioner.credentials)}>
                          <Shield className="w-3 h-3 mr-1" />
                          {practitioner.credentials}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                          Verified
                        </Badge>
                      </div>
                    </div>

                    {/* Name & Specialty */}
                    <h3 className="font-semibold text-foreground mb-1">
                      {practitioner.display_name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {practitioner.specialty}
                    </p>

                    {/* Institution */}
                    {practitioner.institution && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                        <Building2 className="w-3 h-3" />
                        {practitioner.institution}
                      </p>
                    )}

                    {/* Bio */}
                    {practitioner.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {practitioner.bio}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {practitioner.annotation_count} annotations
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Verified {new Date(practitioner.verified_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              Are you a healthcare practitioner?
            </h2>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
              Join our community of verified practitioners. Share your expertise through 
              professional annotations and connect with researchers worldwide.
            </p>
            <Button asChild>
              <Link to="/profile">
                <Shield className="w-4 h-4 mr-2" />
                Get Verified
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PractitionerDirectory;
