import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PubMed E-utilities base URLs
const ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
const EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";

interface PubMedArticle {
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

interface SearchParams {
  query: string;
  maxResults?: number;
  condition?: string;
}

// Parse XML response to extract article data
function parseArticleXml(xmlText: string): PubMedArticle[] {
  const articles: PubMedArticle[] = [];
  
  // Split by PubmedArticle tags
  const articleMatches = xmlText.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || [];
  
  for (const articleXml of articleMatches) {
    try {
      // Extract PMID
      const pmidMatch = articleXml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
      const pmid = pmidMatch ? pmidMatch[1] : "";
      
      // Extract title
      const titleMatch = articleXml.match(/<ArticleTitle>([^<]*(?:<[^>]+>[^<]*)*)<\/ArticleTitle>/);
      let title = titleMatch ? titleMatch[1] : "";
      // Clean HTML tags from title
      title = title.replace(/<[^>]+>/g, "");
      
      // Extract authors
      const authors: string[] = [];
      const authorMatches = articleXml.match(/<Author[^>]*>[\s\S]*?<\/Author>/g) || [];
      for (const authorXml of authorMatches.slice(0, 5)) { // Limit to first 5 authors
        const lastNameMatch = authorXml.match(/<LastName>([^<]+)<\/LastName>/);
        const foreNameMatch = authorXml.match(/<ForeName>([^<]+)<\/ForeName>/);
        if (lastNameMatch) {
          const name = foreNameMatch 
            ? `${lastNameMatch[1]} ${foreNameMatch[1].charAt(0)}`
            : lastNameMatch[1];
          authors.push(name);
        }
      }
      
      // Extract journal
      const journalMatch = articleXml.match(/<Title>([^<]+)<\/Title>/);
      const journal = journalMatch ? journalMatch[1] : "";
      
      // Extract year
      const yearMatch = articleXml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/);
      const year = yearMatch ? yearMatch[1] : "";
      
      // Extract abstract
      const abstractMatch = articleXml.match(/<AbstractText[^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/AbstractText>/);
      let abstract = abstractMatch ? abstractMatch[1] : "";
      abstract = abstract.replace(/<[^>]+>/g, "").substring(0, 500);
      if (abstract.length === 500) abstract += "...";
      
      // Extract DOI
      const doiMatch = articleXml.match(/<ArticleId IdType="doi">([^<]+)<\/ArticleId>/);
      const doi = doiMatch ? doiMatch[1] : null;
      
      // Extract PMCID
      const pmcidMatch = articleXml.match(/<ArticleId IdType="pmc">([^<]+)<\/ArticleId>/);
      const pmcid = pmcidMatch ? pmcidMatch[1] : null;
      
      // Extract MeSH terms
      const meshTerms: string[] = [];
      const meshMatches = articleXml.match(/<DescriptorName[^>]*>([^<]+)<\/DescriptorName>/g) || [];
      for (const mesh of meshMatches.slice(0, 5)) {
        const termMatch = mesh.match(/>([^<]+)</);
        if (termMatch) meshTerms.push(termMatch[1]);
      }
      
      // Extract publication type
      const publicationType: string[] = [];
      const pubTypeMatches = articleXml.match(/<PublicationType[^>]*>([^<]+)<\/PublicationType>/g) || [];
      for (const pt of pubTypeMatches) {
        const typeMatch = pt.match(/>([^<]+)</);
        if (typeMatch) publicationType.push(typeMatch[1]);
      }
      
      if (pmid && title) {
        articles.push({
          pmid,
          title,
          authors,
          journal,
          year,
          abstract,
          doi,
          pmcid,
          meshTerms,
          publicationType,
        });
      }
    } catch (e) {
      console.error("Error parsing article:", e);
    }
  }
  
  return articles;
}

// Map condition to PubMed search terms
function getConditionSearchTerms(condition: string): string {
  const conditionMap: Record<string, string> = {
    cancer: "(neoplasms[MeSH] OR cancer[tiab]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH] OR phytotherapy[MeSH])",
    neurological: "(neurodegenerative diseases[MeSH] OR dementia[MeSH] OR alzheimer[tiab] OR parkinson[tiab]) AND (neuroprotection[tiab] OR natural products[MeSH])",
    cardiovascular: "(cardiovascular diseases[MeSH] OR heart diseases[MeSH]) AND (dietary supplements[MeSH] OR phytotherapy[MeSH])",
    metabolic: "(metabolic diseases[MeSH] OR diabetes mellitus[MeSH] OR obesity[MeSH]) AND (herbal medicine[MeSH] OR dietary supplements[MeSH])",
    autoimmune: "(autoimmune diseases[MeSH] OR rheumatoid arthritis[MeSH]) AND (anti-inflammatory agents[MeSH] OR immunomodulation[tiab])",
    infectious: "(communicable diseases[MeSH] OR COVID-19[MeSH] OR viral infections) AND (antiviral agents[MeSH] OR immunomodulation[tiab])",
    musculoskeletal: "(musculoskeletal diseases[MeSH] OR osteoarthritis[MeSH]) AND (dietary supplements[MeSH] OR glucosamine[tiab])",
  };
  
  return conditionMap[condition.toLowerCase()] || condition;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, maxResults = 20, condition } = await req.json() as SearchParams;
    
    if (!query && !condition) {
      return new Response(
        JSON.stringify({ error: "Query or condition is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build search query
    let searchQuery = query || "";
    if (condition) {
      searchQuery = getConditionSearchTerms(condition);
    }
    
    // Add filters for quality: human studies, English, recent
    const fullQuery = `${searchQuery} AND (humans[MeSH] OR clinical trial[pt] OR review[pt]) AND english[la]`;
    
    console.log("PubMed search query:", fullQuery);

    // Step 1: Search for PMIDs
    const searchParams = new URLSearchParams({
      db: "pubmed",
      term: fullQuery,
      retmax: String(maxResults),
      retmode: "json",
      sort: "relevance",
      usehistory: "y",
    });

    const searchResponse = await fetch(`${ESEARCH_URL}?${searchParams}`);
    if (!searchResponse.ok) {
      throw new Error(`PubMed search failed: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    const pmids = searchData.esearchresult?.idlist || [];
    const totalCount = parseInt(searchData.esearchresult?.count || "0", 10);
    
    console.log(`Found ${totalCount} total results, fetching ${pmids.length} articles`);

    if (pmids.length === 0) {
      return new Response(
        JSON.stringify({ articles: [], totalCount: 0, query: searchQuery }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Fetch article details
    const fetchParams = new URLSearchParams({
      db: "pubmed",
      id: pmids.join(","),
      retmode: "xml",
      rettype: "abstract",
    });

    const fetchResponse = await fetch(`${EFETCH_URL}?${fetchParams}`);
    if (!fetchResponse.ok) {
      throw new Error(`PubMed fetch failed: ${fetchResponse.status}`);
    }
    
    const xmlText = await fetchResponse.text();
    const articles = parseArticleXml(xmlText);
    
    console.log(`Parsed ${articles.length} articles`);

    return new Response(
      JSON.stringify({ 
        articles, 
        totalCount, 
        query: searchQuery,
        source: "PubMed/NCBI"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PubMed search error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
