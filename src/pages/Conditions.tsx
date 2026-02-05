import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, ArrowUpDown, Filter, X, ChevronRight, BookOpen, Beaker } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { conditions } from "@/data/searchData";
import conditionsHeroImage from "@/assets/conditions-hero-scientist.jpg";

// Define condition categories based on tags
const categoryDefinitions: { id: string; label: string; keywords: string[] }[] = [
  { id: "all", label: "All Categories", keywords: [] },
  { id: "autoimmune", label: "Autoimmune", keywords: ["autoimmune", "lupus", "sle", "rheumatoid", "scleroderma", "sjogrens", "myasthenia"] },
  { id: "cancer", label: "Cancer & Oncology", keywords: ["cancer", "oncology", "tumor"] },
  { id: "cardiovascular", label: "Cardiovascular", keywords: ["heart", "cardiovascular", "blood pressure", "hypertension", "circulation", "cardiac"] },
  { id: "digestive", label: "Digestive & Gut", keywords: ["digestive", "gut", "bowel", "ibs", "ibd", "crohns", "colitis", "stomach", "liver", "intestine", "gastro"] },
  { id: "hormonal", label: "Hormonal & Endocrine", keywords: ["hormonal", "thyroid", "diabetes", "pcos", "menopause", "testosterone", "adrenal", "insulin", "endocrine"] },
  { id: "infections", label: "Infections", keywords: ["infection", "virus", "viral", "bacterial", "fungal", "lyme", "covid", "herpes", "ebv"] },
  { id: "longevity", label: "Longevity & Aging", keywords: ["aging", "longevity", "senescence", "telomere", "mitochondrial", "oxidative", "cognitive decline", "sarcopenia"] },
  { id: "mental-health", label: "Mental Health", keywords: ["mental health", "anxiety", "depression", "ptsd", "ocd", "bipolar", "adhd", "autism", "stress", "mood"] },
  { id: "metabolic", label: "Metabolic", keywords: ["metabolic", "obesity", "weight", "blood sugar", "insulin resistance"] },
  { id: "neurological", label: "Neurological", keywords: ["neurological", "brain", "dementia", "alzheimers", "parkinsons", "cognitive", "memory", "neurodegenerative"] },
  { id: "pain", label: "Pain & Fatigue", keywords: ["pain", "fatigue", "fibromyalgia", "chronic fatigue", "migraine", "headache", "neuropathy"] },
  { id: "respiratory", label: "Respiratory", keywords: ["respiratory", "lungs", "asthma", "copd", "breathing", "bronchitis", "pulmonary"] },
  { id: "skin", label: "Skin & Dermatology", keywords: ["skin", "dermatology", "psoriasis", "eczema", "acne", "rosacea", "vitiligo"] },
  { id: "urinary", label: "Urinary & Kidney", keywords: ["kidney", "renal", "urinary", "bladder", "prostate", "uti"] },
  { id: "womens-health", label: "Women's Health", keywords: ["women", "fertility", "endometriosis", "ovary", "uterus", "menstrual", "pregnancy", "perimenopause"] },
  { id: "mens-health", label: "Men's Health", keywords: ["men", "testosterone", "prostate", "erectile", "libido"] },
  { id: "eye", label: "Eye & Vision", keywords: ["eye", "vision", "retina", "macular", "glaucoma", "cataracts"] },
];

type SortOption = "alphabetical" | "alphabetical-desc" | "studies-high" | "studies-low";

const Conditions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("alphabetical");

  // Categorize conditions
  const categorizeCondition = (condition: typeof conditions[0]): string[] => {
    const matchedCategories: string[] = [];
    const tagsLower = condition.tags.map(t => t.toLowerCase());
    const titleLower = condition.title.toLowerCase();
    const descLower = condition.description.toLowerCase();
    const combined = [...tagsLower, titleLower, descLower].join(" ");

    for (const cat of categoryDefinitions) {
      if (cat.id === "all") continue;
      if (cat.keywords.some(kw => combined.includes(kw.toLowerCase()))) {
        matchedCategories.push(cat.id);
      }
    }

    return matchedCategories.length > 0 ? matchedCategories : ["other"];
  };

  // Filter and sort conditions
  const filteredConditions = useMemo(() => {
    let result = conditions.filter(c => c.category === "condition");

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(c => {
        const categories = categorizeCondition(c);
        return categories.includes(selectedCategory);
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "alphabetical-desc":
          return b.title.localeCompare(a.title);
        case "studies-high":
          return (b.studies || 0) - (a.studies || 0);
        case "studies-low":
          return (a.studies || 0) - (b.studies || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: conditions.filter(c => c.category === "condition").length };
    
    conditions
      .filter(c => c.category === "condition")
      .forEach(condition => {
        const categories = categorizeCondition(condition);
        categories.forEach(cat => {
          counts[cat] = (counts[cat] || 0) + 1;
        });
      });

    return counts;
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("alphabetical");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || sortBy !== "alphabetical";

  return (
    <>
      <Helmet>
        <title>200+ Health Conditions Library | EvidenceMed</title>
        <meta
          name="description"
          content="Browse our comprehensive library of 200+ health conditions with evidence-based research. Filter by category, search conditions, and explore integrative therapy studies."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Header */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={conditionsHeroImage}
              alt="Scientist documenting research data"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 bg-background/80 backdrop-blur-sm">
                <BookOpen className="w-3 h-3 mr-1" />
                Research Library
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 drop-shadow-sm">
                Health Conditions Library
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Explore evidence-based research for{" "}
                <span className="text-primary font-semibold">{conditions.filter(c => c.category === "condition").length}+</span>{" "}
                health conditions. Find integrative therapy studies, natural compounds, and clinical research.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b border-border bg-card/50 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px] bg-background">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryDefinitions.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                        {categoryCounts[cat.id] && (
                          <span className="text-muted-foreground ml-2">
                            ({categoryCounts[cat.id]})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">A → Z</SelectItem>
                    <SelectItem value="alphabetical-desc">Z → A</SelectItem>
                    <SelectItem value="studies-high">Most Studies</SelectItem>
                    <SelectItem value="studies-low">Least Studies</SelectItem>
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-3 text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredConditions.length}</span> conditions
              {selectedCategory !== "all" && (
                <span>
                  {" "}in <span className="font-medium text-primary">{categoryDefinitions.find(c => c.id === selectedCategory)?.label}</span>
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Conditions Grid */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {filteredConditions.length === 0 ? (
              <div className="text-center py-16">
                <Beaker className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No conditions found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredConditions.map((condition) => (
                  <Link
                    key={condition.id}
                    to={condition.link}
                    className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {condition.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {condition.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        <Beaker className="w-3 h-3 mr-1" />
                        {condition.studies?.toLocaleString() || 0} studies
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Category Links */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categoryDefinitions
                .filter(cat => cat.id !== "all" && categoryCounts[cat.id] > 0)
                .map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {cat.label}
                    <span className="ml-1 text-xs opacity-70">({categoryCounts[cat.id]})</span>
                  </Button>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Conditions;
