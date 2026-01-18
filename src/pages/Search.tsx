import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchContent, SearchItem } from "@/data/searchData";
import { Search, ArrowRight, Leaf, Heart, FlaskConical, FileText } from "lucide-react";

const categoryIcons = {
  condition: FlaskConical,
  compound: Leaf,
  therapy: Heart,
  research: FileText,
};

const categoryColors = {
  condition: "bg-rose-500/10 text-rose-600",
  compound: "bg-emerald-500/10 text-emerald-600",
  therapy: "bg-violet-500/10 text-violet-600",
  research: "bg-blue-500/10 text-blue-600",
};

const categoryLabels = {
  condition: "Condition",
  compound: "Compound",
  therapy: "Therapy",
  research: "Research",
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const searchQuery = searchParams.get("q") || "";
    setQuery(searchQuery);
    if (searchQuery) {
      setResults(searchContent(searchQuery));
    } else {
      setResults([]);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const filteredResults = activeFilter === "all" 
    ? results 
    : results.filter(r => r.category === activeFilter);

  const resultCounts = {
    all: results.length,
    condition: results.filter(r => r.category === "condition").length,
    compound: results.filter(r => r.category === "compound").length,
    therapy: results.filter(r => r.category === "therapy").length,
  };

  return (
    <>
      <Helmet>
        <title>{query ? `Search: ${query}` : "Search"} | EvidenceMed</title>
        <meta name="description" content="Search for alternative medicine research, natural compounds, and integrative therapies." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20 lg:pt-24">
          {/* Search Header */}
          <div className="bg-primary/5 py-12">
            <div className="container mx-auto px-4">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-6">
                Search Research Library
              </h1>
              
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search conditions, compounds, therapies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-24 text-lg rounded-xl"
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="container mx-auto px-4 py-12">
            {query ? (
              <>
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {(["all", "condition", "compound", "therapy"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {filter === "all" ? "All" : categoryLabels[filter]} ({resultCounts[filter]})
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <p className="text-muted-foreground mb-6">
                  {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} for "{query}"
                </p>

                {/* Results List */}
                {filteredResults.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredResults.map((result) => {
                      const Icon = categoryIcons[result.category];
                      const colorClass = categoryColors[result.category];
                      
                      return (
                        <Link
                          key={result.id}
                          to={result.link}
                          className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}>
                                  {categoryLabels[result.category]}
                                </span>
                                {result.studies && (
                                  <span className="text-xs text-muted-foreground">
                                    {result.studies}+ studies
                                  </span>
                                )}
                              </div>
                              <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {result.title}
                              </h3>
                              <p className="text-muted-foreground mt-1 line-clamp-2">
                                {result.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {result.tags.slice(0, 5).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try different keywords or browse our categories
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <Link to="/#conditions">Browse Conditions</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/#compounds">Browse Compounds</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/integrative-therapies">Browse Therapies</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Start Your Search
                </h3>
                <p className="text-muted-foreground mb-6">
                  Search for conditions, natural compounds, or integrative therapies
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
                  {["cancer", "turmeric", "reiki", "diabetes", "mushroom", "ayurveda", "inflammation"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchParams({ q: term })}
                      className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
