import { useState, useEffect } from "react";
import { Search, Loader2, Database, ChevronLeft, ChevronRight, Filter, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePubMedSearch, STUDY_TYPE_OPTIONS, SearchFilters } from "@/hooks/usePubMedSearch";
import PubMedArticleCard from "./PubMedArticleCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PubMedSearchPanelProps {
  initialQuery?: string;
  condition?: string;
  maxResults?: number;
  onSearchChange?: (query: string) => void;
}

const PubMedSearchPanel = ({ 
  initialQuery = "", 
  condition,
  maxResults = 20,
  onSearchChange
}: PubMedSearchPanelProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  
  const { 
    search, 
    searchByCondition, 
    goToPage, 
    results, 
    isLoading, 
    error,
    currentPage,
    totalPages
  } = usePubMedSearch();

  // Update query when initialQuery changes (for quick browse)
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
      search(initialQuery, maxResults, 1, filters);
      onSearchChange?.(initialQuery);
    }
  }, [initialQuery]);

  // Auto-search if condition is provided
  useEffect(() => {
    if (condition) {
      searchByCondition(condition, maxResults, 1, filters);
    }
  }, [condition, maxResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query, maxResults, 1, filters);
      onSearchChange?.(query);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value === "all" ? undefined : value || undefined };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    if (query.trim()) {
      search(query, maxResults, 1, filters);
    }
  };

  const clearFilters = () => {
    setFilters({});
    if (query.trim()) {
      search(query, maxResults, 1, {});
    }
  };

  const hasActiveFilters = filters.dateFrom || filters.dateTo || filters.studyType;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      goToPage(page);
    }
  };

  // Generate page numbers to display
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Search Form */}
      {!condition && (
        <div className="space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search PubMed for research studies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                data-testid="pubmed-search-input"
              />
            </div>
            <Button type="submit" disabled={isLoading} data-testid="pubmed-search-btn">
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

          {/* Filters Toggle */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </Button>
              </CollapsibleTrigger>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                  <X className="w-3 h-3" />
                  Clear filters
                </Button>
              )}
            </div>

            <CollapsibleContent className="pt-3">
              <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Study Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Study Type</label>
                    <Select 
                      value={filters.studyType || ""} 
                      onValueChange={(v) => handleFilterChange("studyType", v)}
                    >
                      <SelectTrigger data-testid="study-type-filter">
                        <SelectValue placeholder="All Study Types" />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDY_TYPE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date From Filter */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      From Year
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 2020"
                      value={filters.dateFrom || ""}
                      onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                      maxLength={4}
                      data-testid="date-from-filter"
                    />
                  </div>

                  {/* Date To Filter */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      To Year
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 2024"
                      value={filters.dateTo || ""}
                      onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                      maxLength={4}
                      data-testid="date-to-filter"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={applyFilters} disabled={isLoading} size="sm">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
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
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * maxResults) + 1}-{Math.min(currentPage * maxResults, results.total_count)} of {results.total_count.toLocaleString()} results from PubMed
              </span>
            </div>
            {totalPages > 1 && (
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages.toLocaleString()}
              </span>
            )}
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
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Try removing filters
                </Button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination>
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isLoading}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  </PaginationItem>

                  {/* Page Numbers */}
                  {getVisiblePages().map((page, idx) => (
                    <PaginationItem key={idx}>
                      {page === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  {/* Next Button */}
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || isLoading}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
