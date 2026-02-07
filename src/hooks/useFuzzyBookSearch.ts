import { useMemo } from "react";
import { allBooks, bookCategories, type BookEntry } from "@/data/bookData";

/** Levenshtein distance between two strings */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

/** Build a word corpus from all book titles, authors, and categories */
function buildCorpus(): string[] {
  const words = new Set<string>();
  for (const b of allBooks) {
    b.title.toLowerCase().split(/\s+/).forEach((w) => w.length > 2 && words.add(w));
    b.author.toLowerCase().split(/\s+/).forEach((w) => w.length > 2 && words.add(w));
  }
  for (const c of bookCategories) {
    words.add(c.label.toLowerCase());
    c.description.toLowerCase().split(/\s+/).forEach((w) => w.length > 2 && words.add(w));
  }
  return Array.from(words);
}

const corpus = buildCorpus();

/** Find the best correction for a single word */
function correctWord(word: string): string | null {
  if (word.length < 3) return null;
  let best: string | null = null;
  let bestDist = Infinity;
  const maxDist = word.length <= 4 ? 1 : 2;

  for (const candidate of corpus) {
    if (candidate === word) return null; // exact match, no correction needed
    const d = levenshtein(word, candidate);
    if (d <= maxDist && d < bestDist) {
      bestDist = d;
      best = candidate;
    }
  }
  return best;
}

export interface FuzzyBookSearchResult {
  filteredBooks: BookEntry[];
  suggestion: string | null;
  correctedQuery: string | null;
}

export function useFuzzyBookSearch(query: string): FuzzyBookSearchResult {
  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return { filteredBooks: allBooks, suggestion: null, correctedQuery: null };

    const q = trimmed.toLowerCase();
    const directResults = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );

    // If we got results, no correction needed
    if (directResults.length > 0) {
      return { filteredBooks: directResults, suggestion: null, correctedQuery: null };
    }

    // Try to correct each word
    const words = q.split(/\s+/);
    let changed = false;
    const corrected = words.map((w) => {
      const fix = correctWord(w);
      if (fix) { changed = true; return fix; }
      return w;
    });

    if (!changed) {
      return { filteredBooks: [], suggestion: null, correctedQuery: null };
    }

    const correctedStr = corrected.join(" ");
    const correctedResults = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(correctedStr) ||
        b.author.toLowerCase().includes(correctedStr) ||
        b.category.toLowerCase().includes(correctedStr) ||
        b.description.toLowerCase().includes(correctedStr)
    );

    // Also try individual corrected words
    if (correctedResults.length === 0) {
      const wordResults = allBooks.filter((b) =>
        corrected.some(
          (w) =>
            b.title.toLowerCase().includes(w) ||
            b.author.toLowerCase().includes(w) ||
            b.category.toLowerCase().includes(w) ||
            b.description.toLowerCase().includes(w)
        )
      );
      if (wordResults.length > 0) {
        return { filteredBooks: wordResults, suggestion: correctedStr, correctedQuery: correctedStr };
      }
    }

    return {
      filteredBooks: correctedResults,
      suggestion: correctedResults.length > 0 ? correctedStr : null,
      correctedQuery: correctedResults.length > 0 ? correctedStr : null,
    };
  }, [query]);
}
