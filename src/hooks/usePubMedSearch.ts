import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  abstract: string;
  doi: string | null;
  pmcid: string | null;
  meshTerms: string[];
  publicationType: string[];
}

export interface PubMedSearchResult {
  articles: PubMedArticle[];
  totalCount: number;
  query: string;
  source: string;
}

export function usePubMedSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PubMedSearchResult | null>(null);

  const search = useCallback(async (query: string, maxResults = 20) => {
    if (!query.trim()) {
      setResults(null);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("pubmed-search", {
        body: { query, maxResults },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data);
      return data as PubMedSearchResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setError(message);
      console.error("PubMed search error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchByCondition = useCallback(async (condition: string, maxResults = 20) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("pubmed-search", {
        body: { condition, maxResults },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data);
      return data as PubMedSearchResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Search failed";
      setError(message);
      console.error("PubMed search error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    search,
    searchByCondition,
    clearResults,
    results,
    isLoading,
    error,
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
