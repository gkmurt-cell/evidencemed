import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  FileText, 
  FlaskConical, 
  Users, 
  TestTube, 
  AlertTriangle, 
  Shield, 
  Link2, 
  ExternalLink,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  BookOpen,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import DemoDisclaimer from "@/components/layout/DemoDisclaimer";
import PubMedSearchPanel from "@/components/research/PubMedSearchPanel";
import { StudyTypeIcon, StudyCountBar, EvidenceTierIcon, EvidencePyramid, TimelineDots } from "@/components/research/EvidenceVisuals";
import { cn } from "@/lib/utils";
import {
  allStudies,
  studyTypeFilters,
  evidenceLevelFilters,
  getEvidenceBadge,
  searchStudies,
  type StudyType,
  type EvidenceLevel,
  type Study,
} from "@/data/researchData";
import researchHeroImage from "@/assets/research-hero-library.jpg";

const ITEMS_PER_PAGE = 10;

const researchStats = [
  { id: "in-vitro", name: "In Vitro Studies", icon: TestTube, count: "4,200+" },
  { id: "animal", name: "Animal Models", icon: FlaskConical, count: "3,800+" },
  { id: "observational", name: "Observational Studies", icon: Users, count: "2,100+" },
  { id: "rct", name: "Controlled Trials", icon: FileText, count: "890+" },
];

const Research = () => {
  const [activeTab, setActiveTab] = useState("pubmed");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<StudyType>("all");
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceLevel | "all">("all");
  const [compoundFilter, setCompoundFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);
  const [pubmedSearchQuery, setPubmedSearchQuery] = useState("");

  // Get unique compounds for filter dropdown
  const allCompounds = useMemo(() => {
    const compounds = new Set<string>();
    allStudies.forEach((study) => {
      study.compounds?.forEach((c) => compounds.add(c));
    });
    return Array.from(compounds).sort();
  }, []);

  // Filter and search studies
  const filteredStudies = useMemo(() => {
    let results = allStudies;

    // Apply search
    if (searchQuery.trim()) {
      results = searchStudies(results, searchQuery);
    }

    // Apply type filter
    if (typeFilter !== "all") {
      results = results.filter((study) => study.typeId === typeFilter);
    }

    // Apply evidence filter
    if (evidenceFilter !== "all") {
      results = results.filter((study) => study.evidenceLevel === evidenceFilter);
    }

    // Apply compound filter
    if (compoundFilter) {
      results = results.filter((study) =>
        study.compounds?.some((c) => c.toLowerCase() === compoundFilter.toLowerCase())
      );
    }

    return results;
  }, [searchQuery, typeFilter, evidenceFilter, compoundFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredStudies.length / ITEMS_PER_PAGE);
  const paginatedStudies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStudies, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setEvidenceFilter("all");
    setCompoundFilter("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || typeFilter !== "all" || evidenceFilter !== "all" || compoundFilter;

  return (
    <>
      <Helmet>
        <title>Research Library | EvidenceMed: Integrative Medicine & Complementary Therapies</title>
        <meta
          name="description"
          content="Browse peer-reviewed integrative medicine research on natural compounds, herbal medicine, and complementary therapies. Filter by study type, evidence level, and compounds."
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 min-h-screen bg-background">
        {/* Hero Section with Background */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={researchHeroImage}
              alt="Researcher reviewing scientific literature"
              className="w-full h-full object-cover object-center animate-fade-in"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm">
                <BookOpen className="w-3 h-3 mr-1" />
                Research Library
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 drop-shadow-sm">
                Peer-Reviewed Studies
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                Every research entry includes study type, institution, journal, publication year,
                and direct links to original sources. Filter by evidence level, study type, or
                search for specific compounds.
              </p>
              <DemoDisclaimer className="mb-4" />
              <EducationalDisclaimer />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger value="pubmed" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                PubMed Search
              </TabsTrigger>
              <TabsTrigger value="curated" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Curated Studies
              </TabsTrigger>
            </TabsList>

            {/* PubMed Search Tab */}
            <TabsContent value="pubmed" className="mt-0 space-y-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">Search PubMed Database</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Search millions of peer-reviewed research articles from the National Library of Medicine database.
                  Enter specific terms like "curcumin inflammation" or "ashwagandha anxiety" for targeted results.
                </p>
                <PubMedSearchPanel maxResults={20} />
              </div>

              {/* Featured Research Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-1">
                      Featured Research
                    </h2>
                    <p className="text-muted-foreground">
                      Trending studies from peer-reviewed journals
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("curated")}
                    className="hidden md:flex"
                  >
                    View All Curated Studies
                  </Button>
                </div>

                {/* Featured Studies Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {allStudies.slice(0, 6).map((study) => (
                    <FeaturedStudyCard key={study.id} study={study} />
                  ))}
                </div>

                <div className="flex justify-center md:hidden">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("curated")}
                  >
                    View All Curated Studies
                  </Button>
                </div>

                {/* Quick Browse by Topic */}
                <div className="bg-muted/30 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Browse by Topic</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { term: "curcumin inflammation", label: "Curcumin & Inflammation" },
                      { term: "ashwagandha stress anxiety", label: "Ashwagandha & Stress" },
                      { term: "omega-3 cardiovascular", label: "Omega-3 & Heart Health" },
                      { term: "vitamin D immune", label: "Vitamin D & Immunity" },
                      { term: "probiotics gut microbiome", label: "Probiotics & Gut Health" },
                      { term: "berberine blood sugar", label: "Berberine & Blood Sugar" },
                      { term: "lion's mane cognitive", label: "Lion's Mane & Cognition" },
                      { term: "magnesium sleep", label: "Magnesium & Sleep" },
                    ].map((topic) => (
                      <Button
                        key={topic.term}
                        variant="secondary"
                        size="sm"
                        className="rounded-full"
                        onClick={() => {
                          setPubmedSearchQuery(topic.term);
                          // Scroll to search panel
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {topic.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Curated Studies Tab */}
            <TabsContent value="curated" className="mt-0 space-y-8">
              {/* Stats Cards with Study Type Icons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {researchStats.map((stat) => (
                  <button
                    key={stat.id}
                    onClick={() => handleFilterChange(setTypeFilter, stat.id as StudyType)}
                    className={cn(
                      "p-6 rounded-xl bg-card border border-border text-center transition-all hover:border-primary/50 hover:shadow-md group",
                      typeFilter === stat.id && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <stat.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                      <StudyTypeIcon type={stat.id as any} size="md" />
                    </div>
                    <p className="font-mono text-2xl font-bold text-foreground mb-1">
                      {stat.count}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                  </button>
                ))}
              </div>
              
              {/* Data Visualization Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Study Distribution Bar Chart */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Study Distribution by Type
                  </h3>
                  <StudyCountBar 
                    data={[
                      { label: "In Vitro", count: 4200, type: "in-vitro" },
                      { label: "Animal", count: 3800, type: "animal" },
                      { label: "Observational", count: 2100, type: "observational" },
                      { label: "RCTs", count: 890, type: "rct" },
                      { label: "Meta-Analyses", count: 340, type: "meta-analysis" },
                    ]}
                  />
                </div>

                {/* Evidence Hierarchy Pyramid */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Evidence Hierarchy
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Higher tiers indicate stronger evidence quality
                  </p>
                  <EvidencePyramid />
                </div>
              </div>

              {/* Publication Timeline */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Publication Timeline
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Distribution of curated studies by publication year
                </p>
                <TimelineDots 
                  years={allStudies.map(s => parseInt(s.year, 10)).filter(y => !isNaN(y))} 
                  className="h-16"
                />
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Publication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary opacity-50" />
                    <span>Higher density = larger dot</span>
                  </div>
                </div>
              </div>

              {/* Evidence Tier Legend */}
              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Evidence Level Guide</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <EvidenceTierIcon level="high" size="lg" />
                    <div>
                      <p className="font-medium text-sm text-foreground">Strong Evidence</p>
                      <p className="text-xs text-muted-foreground">
                        Systematic reviews, meta-analyses, and high-quality RCTs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <EvidenceTierIcon level="moderate" size="lg" />
                    <div>
                      <p className="font-medium text-sm text-foreground">Moderate Evidence</p>
                      <p className="text-xs text-muted-foreground">
                        Cohort studies, observational research with consistent results
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <EvidenceTierIcon level="preliminary" size="lg" />
                    <div>
                      <p className="font-medium text-sm text-foreground">Preliminary</p>
                      <p className="text-xs text-muted-foreground">
                        In vitro, animal studies, case reports requiring further research
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-gradient-to-r from-primary/20 via-primary/15 to-accent/20 border-2 border-primary/40 rounded-xl p-4 shadow-md">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input
                      type="text"
                      placeholder="Search studies, compounds, conditions..."
                      value={searchQuery}
                      onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                      className="pl-10 bg-background border-primary/30 focus:border-primary"
                    />
                  </div>

                  {/* Type Filter */}
                  <Select
                    value={typeFilter}
                    onValueChange={(v) => handleFilterChange(setTypeFilter, v as StudyType)}
                  >
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Study Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {studyTypeFilters.map((filter) => (
                        <SelectItem key={filter.id} value={filter.id}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Evidence Level Filter */}
                  <Select
                    value={evidenceFilter}
                    onValueChange={(v) =>
                      handleFilterChange(setEvidenceFilter, v as EvidenceLevel | "all")
                    }
                  >
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Evidence Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {evidenceLevelFilters.map((filter) => (
                        <SelectItem key={filter.id} value={filter.id}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Compound Filter */}
                  <Select
                    value={compoundFilter}
                    onValueChange={(v) => handleFilterChange(setCompoundFilter, v === "all" ? "" : v)}
                  >
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Compound" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Compounds</SelectItem>
                      {allCompounds.map((compound) => (
                        <SelectItem key={compound} value={compound}>
                          {compound}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters & Clear */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                          Search: {searchQuery}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => handleFilterChange(setSearchQuery, "")}
                          />
                        </Badge>
                      )}
                      {typeFilter !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                          {studyTypeFilters.find((f) => f.id === typeFilter)?.label}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => handleFilterChange(setTypeFilter, "all")}
                          />
                        </Badge>
                      )}
                      {evidenceFilter !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                          {evidenceLevelFilters.find((f) => f.id === evidenceFilter)?.label}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => handleFilterChange(setEvidenceFilter, "all")}
                          />
                        </Badge>
                      )}
                      {compoundFilter && (
                        <Badge variant="secondary" className="gap-1">
                          {compoundFilter}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => handleFilterChange(setCompoundFilter, "")}
                          />
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                      Clear all
                    </Button>
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{paginatedStudies.length}</span>{" "}
                  of <span className="font-medium text-foreground">{filteredStudies.length}</span>{" "}
                  curated studies
                </p>
              </div>

              {/* Studies List */}
              <div className="space-y-4">
                {paginatedStudies.map((study) => (
                  <StudyCard
                    key={study.id}
                    study={study}
                    isExpanded={expandedStudy === study.id}
                    onToggle={() => setExpandedStudy(expandedStudy === study.id ? null : study.id)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredStudies.length === 0 && (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No studies found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria.
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - currentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, i, arr) => (
                        <span key={page}>
                          {i > 0 && arr[i - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        </span>
                      ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </>
  );
};

interface StudyCardProps {
  study: Study;
  isExpanded: boolean;
  onToggle: () => void;
}

const StudyCard = ({ study, isExpanded, onToggle }: StudyCardProps) => {
  const evidenceBadge = getEvidenceBadge(study.evidenceLevel);

  return (
    <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
      <div className="flex flex-col gap-3">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {study.type}
            </span>
            <EvidenceTierIcon level={study.evidenceLevel} size="sm" showLabel />
            <span className="text-xs text-muted-foreground">{study.year}</span>
            {study.sampleSize && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {study.sampleSize}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a 
              href={study.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/` : study.doiUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Full Study
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {study.title}
        </h3>

        {/* Abstract */}
        <p className="text-sm text-muted-foreground leading-relaxed">{study.abstract}</p>

        {/* Compounds & Conditions Tags */}
        <div className="flex flex-wrap gap-1.5">
          {study.compounds?.map((compound) => (
            <span
              key={compound}
              className="px-2 py-0.5 rounded bg-primary/10 text-xs text-primary font-medium"
            >
              {compound}
            </span>
          ))}
          {study.conditions?.map((condition) => (
            <span
              key={condition}
              className="px-2 py-0.5 rounded bg-secondary text-xs text-secondary-foreground"
            >
              {condition}
            </span>
          ))}
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground border-t border-border pt-4">
          <span className="font-medium">{study.journal}</span>
          <span className="hidden sm:inline">•</span>
          <span>{study.institution}</span>
        </div>

        {/* Source Links */}
        <div className="flex flex-wrap items-center gap-4">
          {study.pmid && (
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" />
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline font-mono"
              >
                PMID: {study.pmid}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-muted-foreground" />
            <a
              href={study.pmid ? `https://doi.org/${study.doi}` : study.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary hover:underline font-mono"
            >
              DOI: {study.doi}
            </a>
          </div>
        </div>

        {/* Safety Notes - Expandable */}
        {study.safetyNotes && (
          <div className="mt-2">
            <button
              onClick={onToggle}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="font-medium">Safety & Considerations</span>
              <span className="text-xs">{isExpanded ? "▲" : "▼"}</span>
            </button>

            {isExpanded && (
              <div className="mt-3 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">
                      Research Context Only — Not Medical Advice
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.safetyNotes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

// Compact card for featured studies on PubMed tab
const FeaturedStudyCard = ({ study }: { study: Study }) => {
  const evidenceBadge = getEvidenceBadge(study.evidenceLevel);

  return (
    <a
      href={study.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/` : study.doiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {study.type}
        </span>
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium border",
            evidenceBadge.className
          )}
        >
          {evidenceBadge.label}
        </span>
        <span className="text-xs text-muted-foreground ml-auto">{study.year}</span>
      </div>

      <h3 className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
        {study.title}
      </h3>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {study.abstract}
      </p>

      <div className="flex flex-wrap gap-1 mb-2">
        {study.compounds?.slice(0, 3).map((compound) => (
          <span
            key={compound}
            className="px-1.5 py-0.5 rounded bg-primary/10 text-xs text-primary"
          >
            {compound}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{study.journal}</span>
        <span className="flex items-center gap-1 text-primary font-medium">
          View <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
};

export default Research;
