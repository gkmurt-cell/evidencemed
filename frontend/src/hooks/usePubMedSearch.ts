import { useState, useCallback } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  abstract: string;
  doi: string | null;
  pmcid: string | null;
  pubmed_url: string;
}

export interface PubMedSearchResult {
  articles: PubMedArticle[];
  total_count: number;
  query: string;
  suggestion?: string | null;  // Spell correction suggestion
}

export interface SearchFilters {
  dateFrom?: string;
  dateTo?: string;
  studyType?: string;
}

export function usePubMedSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PubMedSearchResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  const search = useCallback(async (
    query: string, 
    maxResults = 20, 
    page = 1,
    filters?: SearchFilters
  ) => {
    if (!query.trim()) {
      setResults(null);
      return null;
    }

    setIsLoading(true);
    setError(null);
    if (filters) {
      setCurrentFilters(filters);
    }

    try {
      // Build URL with filters
      const params = new URLSearchParams({
        query,
        max_results: maxResults.toString()
      });

      const activeFilters = filters || currentFilters;
      
      if (activeFilters.dateFrom) {
        params.append("date_from", activeFilters.dateFrom);
      }
      if (activeFilters.dateTo) {
        params.append("date_to", activeFilters.dateTo);
      }
      if (activeFilters.studyType) {
        params.append("study_type", activeFilters.studyType);
      }

      const response = await fetch(`${API_URL}/api/pubmed/search?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      
      // Map to expected format
      const result: PubMedSearchResult = {
        articles: data.articles.map((a: any) => ({
          ...a,
          meshTerms: [],
          publicationType: [],
        })),
        total_count: data.total_count,
        query: data.query,
        suggestion: data.suggestion || null,  // Include spell correction suggestion
      };

      setResults(result);
      setCurrentPage(page);
      setIsLoading(false);
      return result;
    } catch (e) {
      console.error("PubMed search error:", e);
      setError("Search failed. Please try again.");
      setIsLoading(false);
      return null;
    }
  }, [currentFilters]);

  const searchByCondition = useCallback(async (
    condition: string, 
    maxResults = 20, 
    page = 1,
    filters?: SearchFilters
  ) => {
    return search(condition, maxResults, page, filters);
  }, [search]);

  const goToPage = useCallback(async (page: number) => {
    return null;
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
    setCurrentPage(1);
    setCurrentFilters({});
  }, []);

  const totalPages = results ? Math.ceil(results.total_count / pageSize) : 0;

  return {
    search,
    searchByCondition,
    goToPage,
    clearResults,
    results,
    isLoading,
    error,
    currentPage,
    totalPages,
    pageSize,
    currentFilters,
  };
}

// Helper to get DOI URL
export function getDoiUrl(doi: string | null): string | null {
  return doi ? `https://doi.org/${doi}` : null;
}

// Helper to get PubMed URL
export function getPubMedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

// Helper to determine study type from publication types
export function getStudyType(publicationTypes: string[]): { type: string; color: string } {
  const types = publicationTypes.map(t => t.toLowerCase());
  
  if (types.some(t => t.includes("randomized controlled trial"))) {
    return { type: "RCT", color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" };
  }
  if (types.some(t => t.includes("meta-analysis"))) {
    return { type: "Meta-Analysis", color: "bg-violet-500/10 text-violet-700 border-violet-500/20" };
  }
  if (types.some(t => t.includes("systematic review"))) {
    return { type: "Systematic Review", color: "bg-blue-500/10 text-blue-700 border-blue-500/20" };
  }
  if (types.some(t => t.includes("clinical trial"))) {
    return { type: "Clinical Trial", color: "bg-teal-500/10 text-teal-700 border-teal-500/20" };
  }
  if (types.some(t => t.includes("review"))) {
    return { type: "Review", color: "bg-amber-500/10 text-amber-700 border-amber-500/20" };
  }
  if (types.some(t => t.includes("observational"))) {
    return { type: "Observational", color: "bg-slate-500/10 text-slate-700 border-slate-500/20" };
  }
  
  return { type: "Journal Article", color: "bg-gray-500/10 text-gray-700 border-gray-500/20" };
}

// Study type options for filters
export const STUDY_TYPE_OPTIONS = [
  { value: "all", label: "All Study Types" },
  { value: "randomized_controlled_trial", label: "Randomized Controlled Trials" },
  { value: "clinical_trial", label: "Clinical Trials" },
  { value: "meta_analysis", label: "Meta-Analyses" },
  { value: "systematic_review", label: "Systematic Reviews" },
  { value: "review", label: "Reviews" },
  { value: "observational", label: "Observational Studies" },
  { value: "case_report", label: "Case Reports" },
];
