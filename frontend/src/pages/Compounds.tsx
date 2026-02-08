import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowLeft, ArrowRight, Leaf, Filter, Lightbulb } from "lucide-react";
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
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { compoundsData, type Compound } from "@/data/compoundData";
import compoundsHeroImage from "@/assets/compounds-hero-pharmacognosy.jpg";

const categories = [
  "All Categories",
  "Ayurvedic Compound",
  "Functional Mushroom",
  "Herbal Compound",
  "Alkaloid",
  "Adaptogen",
  "Essential Fatty Acid",
  "Essential Mineral",
  "Mitochondrial Support",
  "Polyphenol",
  "Microbiome Support",
  "Longevity Compound",
  "Structural Protein",
  "Marine Superfood",
  "Mineral Complex",
  "Flavonoid",
  "Amino Acid",
  "Herbal Immune Support",
  "Performance Compound",
  "Blue-Green Algae",
];

// Categories to exclude from default "All Categories" view
const vitaminCategories = ["Fat-Soluble Vitamin", "Water-Soluble Vitamin"];

// Helper to get page title based on filter
const getPageTitle = (category: string) => {
  if (category === "Essential Mineral") return "Essential Minerals";
  return null;
};

// Fuzzy match helper for compound names (Levenshtein distance)
const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
};

// Get spell suggestion for compound search
const getCompoundSuggestion = (query: string, compounds: Compound[]): string | null => {
  if (!query || query.length < 3) return null;
  
  const queryLower = query.toLowerCase().trim();
  
  // Check if exact match exists
  const exactMatch = compounds.find(c => 
    c.name.toLowerCase() === queryLower || 
    c.latinName.toLowerCase() === queryLower
  );
  if (exactMatch) return null;
  
  // Find best fuzzy match
  let bestMatch: string | null = null;
  let bestScore = Infinity;
  
  for (const compound of compounds) {
    const nameDistance = levenshteinDistance(queryLower, compound.name.toLowerCase());
    const latinDistance = levenshteinDistance(queryLower, compound.latinName.toLowerCase());
    const minDistance = Math.min(nameDistance, latinDistance);
    
    // Only suggest if distance is reasonable (1-3 characters different)
    if (minDistance > 0 && minDistance <= 3 && minDistance < bestScore) {
      bestScore = minDistance;
      bestMatch = nameDistance <= latinDistance ? compound.name : compound.latinName;
    }
  }
  
  return bestMatch;
};

const Compounds = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All Categories";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(categoryFromUrl);

  // Update filter when URL changes
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCategoryFilter(category);
    }
  }, [searchParams]);

  const pageTitle = getPageTitle(categoryFilter);

  const filteredCompounds = useMemo(() => {
    let results = compoundsData;

    // Exclude vitamins from default "All Categories" view
    if (categoryFilter === "All Categories") {
      results = results.filter(
        (compound) => !vitaminCategories.includes(compound.category)
      );
    } else {
      results = results.filter((compound) => compound.category === categoryFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (compound) =>
          compound.name.toLowerCase().includes(query) ||
          compound.latinName.toLowerCase().includes(query) ||
          compound.description.toLowerCase().includes(query) ||
          compound.keyBenefits.some((b) => b.toLowerCase().includes(query))
      );
    }

    return results;
  }, [searchQuery, categoryFilter]);

  // Get spell suggestion when search has few/no results
  const spellSuggestion = useMemo(() => {
    if (!searchQuery.trim() || filteredCompounds.length > 0) return null;
    return getCompoundSuggestion(searchQuery, compoundsData);
  }, [searchQuery, filteredCompounds.length]);

  const handleSuggestionClick = () => {
    if (spellSuggestion) {
      setSearchQuery(spellSuggestion);
    }
  };

  return (
    <>
      <Helmet>
        <title>Natural Compounds Library | EvidenceMed - Herbal Medicine Research</title>
        <meta
          name="description"
          content="Browse our comprehensive library of natural compounds, herbs, and nutraceuticals with research summaries, safety information, and study references."
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 min-h-screen bg-background">
        {/* Hero Section with Background */}
        <section className="relative py-8 lg:py-12 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-muted">
            <img
              src={compoundsHeroImage}
              alt="Pharmacognosy research with mortar and pestle and botanical specimens"
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
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-2 bg-background/80 backdrop-blur-sm">
                <Leaf className="w-3 h-3 mr-1" />
                {pageTitle || "Natural Compounds"}
              </Badge>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 drop-shadow-sm">
                {pageTitle || "Herbal & Functional Medicine Library"}
              </h1>
              <p className="text-sm text-muted-foreground mb-2 max-w-xl">
                {pageTitle 
                  ? `Research profiles for ${pageTitle.toLowerCase()}. Each entry includes mechanisms of action, research summaries, and safety considerations.`
                  : "Comprehensive research profiles for herbs, nutraceuticals, and functional compounds. Each entry includes traditional use context, mechanisms of action, research summaries, and safety considerations."
                }
                {" "}All information is for educational purposes only.
              </p>
              <EducationalDisclaimer compact />
            </div>
          </div>
        </section>

        {/* Most Researched Compounds - Only show on main compounds page, not category pages */}
        {categoryFilter === "All Categories" && (
          <div className="container mx-auto px-4 pt-3 lg:pt-4">
            <div className="mb-3">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-0.5">Most Researched Compounds</h2>
              <p className="text-xs text-muted-foreground">Ranked by volume of published peer-reviewed studies</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
              {compoundsData
                .filter((c) => !vitaminCategories.includes(c.category))
                .sort((a, b) => b.studies - a.studies)
                .slice(0, 12)
                .map((compound) => (
                  <Link
                    key={compound.id}
                    to={`/compound/${compound.id}`}
                    className="group flex flex-col items-center p-2 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
                  >
                    <span className="text-xl mb-0.5">{compound.image}</span>
                  <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {compound.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{compound.studies.toLocaleString()}+ studies</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-4 lg:pb-6">
          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-2 mb-3">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search compounds by name, benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-56">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Spell Suggestion */}
          {spellSuggestion && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-3" data-testid="compound-spell-suggestion">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-sm text-muted-foreground">Did you mean:</span>
              <button
                onClick={handleSuggestionClick}
                className="text-sm font-medium text-primary hover:underline focus:outline-none focus:underline"
                data-testid="compound-spell-suggestion-link"
              >
                "{spellSuggestion}"
              </button>
              <span className="text-sm text-muted-foreground">?</span>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground text-sm">
              Showing{" "}
              <span className="font-medium text-foreground">{filteredCompounds.length}</span>{" "}
              compounds
            </p>
          </div>

          {/* Compounds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {filteredCompounds.map((compound) => (
              <CompoundCard key={compound.id} compound={compound} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCompounds.length === 0 && (
            <div className="text-center py-10 bg-card border border-border rounded-lg">
              <Leaf className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No compounds found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All Categories");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

interface CompoundCardProps {
  compound: Compound;
}

const CompoundCard = ({ compound }: CompoundCardProps) => {
  return (
    <Link
      to={`/compound/${compound.id}`}
      className="group relative p-4 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-3 right-3 text-5xl opacity-10 group-hover:opacity-20 transition-opacity">
        {compound.image}
      </div>

      <div className="relative">
        <Badge variant="secondary" className="mb-2 text-xs">
          {compound.category}
        </Badge>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
          {compound.name}
        </h3>
        <p className="text-xs text-muted-foreground italic mb-2">{compound.latinName}</p>

        {/* Key Benefits Preview */}
        <div className="flex flex-wrap gap-1 mb-3">
          {compound.keyBenefits.slice(0, 3).map((benefit) => (
            <span
              key={benefit}
              className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs font-medium text-primary">{compound.studies} studies</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default Compounds;
