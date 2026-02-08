import { useState, useCallback } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

export interface AISearchResult {
  query: string;
  ai_summary: string;
  suggested_terms: string[];
  related_topics: string[];
  source: string;
}

export function useAISearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AISearchResult | null>(null);

  const search = useCallback(async (query: string, context?: string) => {
    if (!query.trim()) {
      setResult(null);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/ai-search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, context }),
      });

      if (!response.ok) {
        throw new Error("AI search failed");
      }

      const data: AISearchResult = await response.json();
      setResult(data);
      setIsLoading(false);
      return data;
    } catch (e) {
      console.error("AI search error:", e);
      setError("AI search failed. Please try again.");
      setIsLoading(false);
      return null;
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    search,
    clearResult,
    result,
    isLoading,
    error,
  };
}
