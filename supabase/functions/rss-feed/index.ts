import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = "https://evidencemed.lovable.app";
const SITE_TITLE = "EvidenceMed: Integrative & Complementary Therapies Research";
const SITE_DESCRIPTION = "Research-backed education on integrative medicine, complementary therapies, natural compounds, and alternative treatments.";

// Static content items representing site sections/pages
const feedItems = [
  {
    title: "Curcumin (Turmeric Extract) – Evidence Profile",
    link: "/compound/curcumin",
    description: "Comprehensive research summary on curcumin's anti-inflammatory, antioxidant, and neuroprotective properties based on peer-reviewed studies.",
    category: "Natural Compounds",
    pubDate: "2025-06-01T00:00:00Z",
  },
  {
    title: "Berberine – Evidence Profile",
    link: "/compound/berberine",
    description: "Research overview of berberine's effects on blood sugar regulation, cardiovascular health, and metabolic syndrome.",
    category: "Natural Compounds",
    pubDate: "2025-06-05T00:00:00Z",
  },
  {
    title: "Quercetin – Evidence Profile",
    link: "/compound/quercetin",
    description: "Evidence summary on quercetin's antiviral, anti-inflammatory, and immune-modulating properties from clinical trials.",
    category: "Natural Compounds",
    pubDate: "2025-06-10T00:00:00Z",
  },
  {
    title: "Conditions Database Now Available",
    link: "/conditions",
    description: "Browse our comprehensive database of health conditions with linked research studies, natural compounds, and integrative therapy options.",
    category: "Platform Updates",
    pubDate: "2025-07-01T00:00:00Z",
  },
  {
    title: "Research Library – PubMed Integration",
    link: "/research",
    description: "Search and explore peer-reviewed research from PubMed directly on EvidenceMed with curated filters for integrative medicine topics.",
    category: "Platform Updates",
    pubDate: "2025-07-15T00:00:00Z",
  },
  {
    title: "Integrative Therapies Guide",
    link: "/integrative-therapies",
    description: "Explore evidence-based integrative therapies including acupuncture, meditation, herbal medicine, and mind-body practices.",
    category: "Guides",
    pubDate: "2025-08-01T00:00:00Z",
  },
  {
    title: "Ayurvedic Medicine – Traditional Knowledge Meets Modern Research",
    link: "/ayurveda",
    description: "Discover the science behind Ayurvedic herbs and practices, with research-backed profiles and traditional usage context.",
    category: "Guides",
    pubDate: "2025-08-15T00:00:00Z",
  },
  {
    title: "Reference Library – Curated Books & Resources",
    link: "/merch",
    description: "Browse our curated collection of books from leading integrative medicine experts, organized by specialty and topic.",
    category: "Resources",
    pubDate: "2025-09-01T00:00:00Z",
  },
  {
    title: "Vitamins & Minerals Evidence Profiles",
    link: "/compounds",
    description: "New evidence profiles added for essential vitamins and minerals including Vitamin D, Magnesium, Zinc, and Omega-3 fatty acids.",
    category: "Natural Compounds",
    pubDate: "2025-10-01T00:00:00Z",
  },
  {
    title: "Editorial Methodology & Advisory Board",
    link: "/editorial-methodology",
    description: "Learn about our rigorous editorial process, PRISMA-aligned methodology, and the advisory board guiding our content standards.",
    category: "Transparency",
    pubDate: "2025-10-15T00:00:00Z",
  },
];

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const sortedItems = [...feedItems].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const itemsXml = sortedItems
    .map(
      (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${SITE_URL}${item.link}</link>
      <guid>${SITE_URL}${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <category>${item.category}</category>
      <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/functions/v1/rss-feed" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
});
