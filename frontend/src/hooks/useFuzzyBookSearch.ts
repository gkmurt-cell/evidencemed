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

/** Generate bigrams from a string */
function bigrams(s: string): Set<string> {
  const bg = new Set<string>();
  for (let i = 0; i < s.length - 1; i++) bg.add(s.slice(i, i + 2));
  return bg;
}

/** Dice coefficient similarity (0-1) between two strings using bigrams */
function diceSimilarity(a: string, b: string): number {
  if (a.length < 2 || b.length < 2) return 0;
  const bgA = bigrams(a);
  const bgB = bigrams(b);
  let intersection = 0;
  bgA.forEach((bg) => { if (bgB.has(bg)) intersection++; });
  return (2 * intersection) / (bgA.size + bgB.size);
}

/** Normalize a string: lowercase, remove apostrophes/hyphens, trim */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[''`\-]/g, "").trim();
}

/** Build a word corpus from all book data */
function buildCorpus(): string[] {
  const words = new Set<string>();
  for (const b of allBooks) {
    normalize(b.title).split(/\s+/).forEach((w) => w.length > 2 && words.add(w));
    normalize(b.author).split(/\s+/).forEach((w) => w.length > 2 && words.add(w));
    normalize(b.description).split(/\s+/).forEach((w) => w.length > 3 && words.add(w));
  }
  for (const c of bookCategories) {
    words.add(normalize(c.label));
    normalize(c.description).split(/\s+/).forEach((w) => w.length > 2 && words.add(w));
  }
  return Array.from(words);
}

const corpus = buildCorpus();

/** Find the best correction for a single word using Levenshtein + bigram similarity */
function correctWord(word: string): string | null {
  const norm = normalize(word);
  if (norm.length < 3) return null;

  // Check exact match first
  if (corpus.includes(norm)) return null;

  let bestLev: string | null = null;
  let bestLevDist = Infinity;
  // Scale max distance with word length
  const maxDist = norm.length <= 4 ? 1 : norm.length <= 6 ? 2 : 3;

  let bestDice: string | null = null;
  let bestDiceScore = 0;

  for (const candidate of corpus) {
    // Skip candidates with very different lengths
    if (Math.abs(candidate.length - norm.length) > maxDist + 1) continue;

    const d = levenshtein(norm, candidate);
    if (d === 0) return null; // exact match
    if (d <= maxDist && d < bestLevDist) {
      bestLevDist = d;
      bestLev = candidate;
    }

    // Bigram similarity as fallback for harder misspellings
    const dice = diceSimilarity(norm, candidate);
    if (dice > bestDiceScore && dice >= 0.4) {
      bestDiceScore = dice;
      bestDice = candidate;
    }
  }

  // Prefer Levenshtein match, fall back to bigram match
  return bestLev ?? bestDice;
}

export interface FuzzyBookSearchResult {
  filteredBooks: BookEntry[];
  suggestion: string | null;
  correctedQuery: string | null;
}

/** Search books with text matching */
function searchBooks(query: string): BookEntry[] {
  const q = normalize(query);
  return allBooks.filter(
    (b) =>
      normalize(b.title).includes(q) ||
      normalize(b.author).includes(q) ||
      normalize(b.category).includes(q) ||
      normalize(b.description).includes(q)
  );
}

export function useFuzzyBookSearch(query: string): FuzzyBookSearchResult {
  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return { filteredBooks: allBooks, suggestion: null, correctedQuery: null };

    const directResults = searchBooks(trimmed);

    if (directResults.length > 0) {
      return { filteredBooks: directResults, suggestion: null, correctedQuery: null };
    }

    // Try to correct each word
    const words = normalize(trimmed).split(/\s+/);
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

    // Try full corrected string
    const correctedResults = searchBooks(correctedStr);
    if (correctedResults.length > 0) {
      return { filteredBooks: correctedResults, suggestion: correctedStr, correctedQuery: correctedStr };
    }

    // Try individual corrected words
    const wordResults = allBooks.filter((b) =>
      corrected.some(
        (w) =>
          normalize(b.title).includes(w) ||
          normalize(b.author).includes(w) ||
          normalize(b.category).includes(w) ||
          normalize(b.description).includes(w)
      )
    );
    if (wordResults.length > 0) {
      return { filteredBooks: wordResults, suggestion: correctedStr, correctedQuery: correctedStr };
    }

    return { filteredBooks: [], suggestion: null, correctedQuery: null };
  }, [query]);
}
