import { useState, useEffect } from "react";
import { Search, Loader2, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePubMedSearch } from "@/hooks/usePubMedSearch";
import PubMedArticleCard from "./PubMedArticleCard";

interface PubMedSearchPanelProps {
  initialQuery?: string;
  condition?: string;
  maxResults?: number;
}

const PubMedSearchPanel = ({ 
  initialQuery = "", 
  condition,
  maxResults = 20 
}: PubMedSearchPanelProps) => {
  const [query, setQuery] = useState(initialQuery);
  const { search, searchByCondition, results, isLoading, error } = usePubMedSearch();

  // Auto-search if condition is provided
  useEffect(() => {
    if (condition) {
      searchByCondition(condition, maxResults);
    }
  }, [condition, maxResults, searchByCondition]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query, maxResults);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      {!condition && (
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search PubMed for research studies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </form>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Searching PubMed database...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8 text-destructive">
          <p>Error: {error}</p>
          <p className="text-sm text-muted-foreground mt-2">Please try again later.</p>
        </div>
      )}

      {/* Results */}
      {results && !isLoading && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Showing {results.articles.length} of {results.totalCount.toLocaleString()} results from PubMed
              </span>
            </div>
          </div>

          {/* Articles Grid */}
          {results.articles.length > 0 ? (
            <div className="grid gap-4">
              {results.articles.map((article) => (
                <PubMedArticleCard key={article.pmid} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No articles found for this search.</p>
            </div>
          )}

          {/* Attribution */}
          <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
            Data sourced from PubMed®, a service of the National Library of Medicine (NLM).
          </p>
        </div>
      )}
    </div>
  );
};

export default PubMedSearchPanel;
