import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = "https://evidencemed.lovable.app";
const SITE_TITLE = "EvidenceMed: Integrative & Complementary Therapies Research";
const SITE_DESCRIPTION = "Research-backed education on integrative medicine, complementary therapies, natural compounds, and alternative treatments.";

// ──────────── COMPOUNDS ────────────
// Add new compounds here and they auto-appear in the feed
const compounds: Array<{ id: string; name: string; category: string; desc: string }> = [
  { id: "lions-mane", name: "Lion's Mane", category: "Functional Mushroom", desc: "Research on nerve growth factor stimulation, cognitive function, and neuroprotective properties." },
  { id: "turkey-tail", name: "Turkey Tail", category: "Functional Mushroom", desc: "Evidence on immune modulation, polysaccharide-K (PSK), and adjunct cancer therapy support." },
  { id: "curcumin", name: "Curcumin", category: "Bioactive Compound", desc: "Anti-inflammatory, antioxidant, and neuroprotective properties from turmeric extract." },
  { id: "berberine", name: "Berberine", category: "Alkaloid", desc: "Blood sugar regulation, cardiovascular health, and metabolic syndrome research." },
  { id: "ashwagandha", name: "Ashwagandha", category: "Adaptogen", desc: "Stress adaptation, cortisol modulation, and thyroid function support studies." },
  { id: "green-papaya-leaf", name: "Green Papaya Leaf", category: "Herbal Extract", desc: "Platelet support, dengue research, and digestive enzyme studies." },
  { id: "omega-3", name: "Omega-3 Fatty Acids", category: "Essential Fatty Acid", desc: "Cardiovascular, neurological, and anti-inflammatory research on EPA and DHA." },
  { id: "magnesium", name: "Magnesium", category: "Essential Mineral", desc: "Muscle function, sleep quality, and metabolic health evidence." },
  { id: "vitamin-d", name: "Vitamin D", category: "Vitamin", desc: "Immune regulation, bone health, and mood support research." },
  { id: "coq10", name: "Coenzyme Q10", category: "Enzyme Cofactor", desc: "Mitochondrial energy production, heart health, and antioxidant studies." },
  { id: "resveratrol", name: "Resveratrol", category: "Polyphenol", desc: "Anti-aging, cardiovascular, and sirtuin activation research." },
  { id: "probiotics", name: "Probiotics", category: "Live Microorganisms", desc: "Gut microbiome, immune function, and mental health axis studies." },
  { id: "cacao", name: "Cacao", category: "Superfood", desc: "Flavanol content, cardiovascular benefits, and mood enhancement evidence." },
  { id: "nmn", name: "NMN", category: "NAD+ Precursor", desc: "Nicotinamide mononucleotide research on aging, energy metabolism, and DNA repair." },
  { id: "collagen", name: "Collagen Peptides", category: "Structural Protein", desc: "Skin elasticity, joint health, and gut lining support studies." },
  { id: "sea-moss", name: "Sea Moss", category: "Marine Algae", desc: "Mineral-rich seaweed research on thyroid, immunity, and gut health." },
  { id: "shilajit", name: "Shilajit", category: "Mineral Pitch", desc: "Fulvic acid content, testosterone, and mitochondrial function studies." },
  { id: "tongkat-ali", name: "Tongkat Ali", category: "Herbal Extract", desc: "Hormonal balance, athletic performance, and stress resilience research." },
  { id: "apigenin", name: "Apigenin", category: "Flavonoid", desc: "Sleep quality, anxiolytic effects, and anti-inflammatory properties." },
  { id: "l-theanine", name: "L-Theanine", category: "Amino Acid", desc: "Relaxation without sedation, focus enhancement, and alpha brain wave research." },
  { id: "maca", name: "Maca Root", category: "Adaptogen", desc: "Energy, hormonal balance, and fertility support studies." },
  { id: "reishi", name: "Reishi", category: "Functional Mushroom", desc: "Immune modulation, sleep support, and longevity research." },
  { id: "cordyceps", name: "Cordyceps", category: "Functional Mushroom", desc: "Athletic performance, oxygen utilization, and energy metabolism studies." },
  { id: "rhodiola", name: "Rhodiola Rosea", category: "Adaptogen", desc: "Fatigue reduction, stress resilience, and cognitive performance research." },
  { id: "quercetin", name: "Quercetin", category: "Flavonoid", desc: "Antiviral, anti-inflammatory, and immune-modulating properties." },
  { id: "elderberry", name: "Elderberry", category: "Berry Extract", desc: "Antiviral properties, cold and flu duration, and immune support studies." },
  { id: "creatine", name: "Creatine", category: "Amino Acid Derivative", desc: "Muscle performance, cognitive function, and neuroprotection research." },
  { id: "spirulina", name: "Spirulina", category: "Blue-Green Algae", desc: "Nutrient density, antioxidant, and heavy metal detoxification studies." },
  { id: "glycine", name: "Glycine", category: "Amino Acid", desc: "Sleep quality, collagen synthesis, and neurotransmitter function research." },
  { id: "vitamin-a", name: "Vitamin A", category: "Vitamin", desc: "Vision, immune function, and cell growth research." },
  { id: "vitamin-b1", name: "Vitamin B1 (Thiamine)", category: "Vitamin", desc: "Energy metabolism and nervous system function studies." },
  { id: "vitamin-b2", name: "Vitamin B2 (Riboflavin)", category: "Vitamin", desc: "Cellular energy production and antioxidant protection research." },
  { id: "vitamin-b3", name: "Vitamin B3 (Niacin)", category: "Vitamin", desc: "Cholesterol management, NAD+ production, and pellagra prevention." },
  { id: "vitamin-b5", name: "Vitamin B5 (Pantothenic Acid)", category: "Vitamin", desc: "Coenzyme A synthesis and adrenal function support." },
  { id: "vitamin-b6", name: "Vitamin B6 (Pyridoxine)", category: "Vitamin", desc: "Neurotransmitter synthesis, homocysteine metabolism, and immune function." },
  { id: "vitamin-b7", name: "Vitamin B7 (Biotin)", category: "Vitamin", desc: "Hair, skin, and nail health plus glucose metabolism research." },
  { id: "vitamin-b9", name: "Vitamin B9 (Folate)", category: "Vitamin", desc: "DNA synthesis, neural tube development, and methylation studies." },
  { id: "vitamin-b12", name: "Vitamin B12 (Cobalamin)", category: "Vitamin", desc: "Neurological function, red blood cell formation, and energy metabolism." },
  { id: "vitamin-c", name: "Vitamin C", category: "Vitamin", desc: "Immune defense, collagen synthesis, and antioxidant research." },
  { id: "vitamin-e", name: "Vitamin E", category: "Vitamin", desc: "Antioxidant protection, skin health, and cardiovascular studies." },
  { id: "vitamin-k", name: "Vitamin K", category: "Vitamin", desc: "Blood clotting, bone metabolism, and cardiovascular calcification research." },
  { id: "choline", name: "Choline", category: "Vitamin-Like Compound", desc: "Brain development, liver function, and methylation studies." },
  { id: "inositol", name: "Inositol", category: "Vitamin-Like Compound", desc: "PCOS management, anxiety reduction, and insulin signaling research." },
  { id: "paba", name: "PABA", category: "Vitamin-Like Compound", desc: "UV protection, folate metabolism, and skin health studies." },
  { id: "alpha-lipoic-acid", name: "Alpha-Lipoic Acid", category: "Vitamin-Like Compound", desc: "Universal antioxidant, diabetic neuropathy, and heavy metal chelation." },
  { id: "pqq", name: "PQQ", category: "Vitamin-Like Compound", desc: "Mitochondrial biogenesis, neuroprotection, and cognitive support research." },
  { id: "zinc", name: "Zinc", category: "Essential Mineral", desc: "Immune function, wound healing, and enzymatic activity studies." },
  { id: "selenium", name: "Selenium", category: "Trace Mineral", desc: "Thyroid function, antioxidant defense, and cancer prevention research." },
  { id: "iron", name: "Iron", category: "Essential Mineral", desc: "Oxygen transport, energy production, and anemia prevention studies." },
  { id: "calcium", name: "Calcium", category: "Essential Mineral", desc: "Bone density, muscle contraction, and nerve signaling research." },
  { id: "potassium", name: "Potassium", category: "Essential Mineral", desc: "Blood pressure regulation, fluid balance, and cardiac function." },
  { id: "chromium", name: "Chromium", category: "Trace Mineral", desc: "Insulin sensitivity, glucose metabolism, and weight management studies." },
  { id: "manganese", name: "Manganese", category: "Trace Mineral", desc: "Bone formation, antioxidant enzymes, and metabolic function research." },
  { id: "copper", name: "Copper", category: "Trace Mineral", desc: "Iron metabolism, connective tissue, and neurological function studies." },
  { id: "boron", name: "Boron", category: "Trace Mineral", desc: "Bone health, hormone metabolism, and cognitive function research." },
  { id: "iodine", name: "Iodine", category: "Essential Mineral", desc: "Thyroid hormone synthesis, metabolic rate, and cognitive development." },
  // ← Add new compounds above this line
];

// ──────────── CONDITIONS ────────────
// Add new conditions here and they auto-appear in the feed
const conditions: Array<{ id: string; title: string; desc: string; category: string }> = [
  { id: "cancer", title: "Cancer Research", desc: "Complementary therapy studies including herbal compounds and adjunct treatments.", category: "Major Disease" },
  { id: "neurological", title: "Neurological Conditions", desc: "Dementia, Parkinson's, Alzheimer's and cognitive health research.", category: "Major Disease" },
  { id: "cardiovascular", title: "Cardiovascular Health", desc: "Heart disease, hypertension, and circulatory system studies.", category: "Major Disease" },
  { id: "metabolic", title: "Metabolic Disorders", desc: "Diabetes, obesity, and metabolic syndrome research.", category: "Major Disease" },
  { id: "autoimmune", title: "Autoimmune Conditions", desc: "Autoimmune disorder research and immune system dysregulation.", category: "Major Disease" },
  { id: "infectious", title: "Infectious Disease", desc: "Long-COVID, viral infections, and emerging health conditions.", category: "Major Disease" },
  { id: "musculoskeletal", title: "Musculoskeletal Health", desc: "Arthritis, osteoporosis, and joint health research.", category: "Major Disease" },
  { id: "psoriasis", title: "Psoriasis", desc: "Autoimmune skin condition causing red, scaly patches.", category: "Skin Conditions" },
  { id: "eczema", title: "Eczema (Atopic Dermatitis)", desc: "Chronic inflammatory skin condition research.", category: "Skin Conditions" },
  { id: "acne", title: "Acne", desc: "Skin condition involving clogged pores and inflammation.", category: "Skin Conditions" },
  { id: "rosacea", title: "Rosacea", desc: "Chronic facial skin condition causing redness.", category: "Skin Conditions" },
  { id: "vitiligo", title: "Vitiligo", desc: "Autoimmune condition causing loss of skin pigmentation.", category: "Skin Conditions" },
  { id: "lupus", title: "Lupus (SLE)", desc: "Systemic lupus erythematosus affecting multiple organs.", category: "Autoimmune" },
  { id: "rheumatoid-arthritis", title: "Rheumatoid Arthritis", desc: "Autoimmune disorder causing chronic joint inflammation.", category: "Autoimmune" },
  { id: "multiple-sclerosis", title: "Multiple Sclerosis", desc: "Autoimmune disease affecting the central nervous system.", category: "Autoimmune" },
  { id: "hashimotos", title: "Hashimoto's Thyroiditis", desc: "Autoimmune thyroid condition causing hypothyroidism.", category: "Autoimmune" },
  { id: "celiac", title: "Celiac Disease", desc: "Autoimmune reaction to gluten affecting the small intestine.", category: "Autoimmune" },
  { id: "ibs", title: "Irritable Bowel Syndrome (IBS)", desc: "Functional digestive disorder affecting the large intestine.", category: "Digestive" },
  { id: "ibd", title: "Inflammatory Bowel Disease", desc: "Chronic inflammation of the digestive tract.", category: "Digestive" },
  { id: "crohns", title: "Crohn's Disease", desc: "Inflammatory bowel disease affecting the digestive tract lining.", category: "Digestive" },
  { id: "ulcerative-colitis", title: "Ulcerative Colitis", desc: "Inflammatory bowel disease affecting the colon and rectum.", category: "Digestive" },
  { id: "gerd", title: "GERD (Acid Reflux)", desc: "Gastroesophageal reflux disease causing heartburn.", category: "Digestive" },
  { id: "anxiety", title: "Anxiety Disorders", desc: "Generalized anxiety, panic disorder, and phobia research.", category: "Mental Health" },
  { id: "depression", title: "Depression", desc: "Major depressive disorder and mood regulation studies.", category: "Mental Health" },
  { id: "insomnia", title: "Insomnia & Sleep Disorders", desc: "Sleep quality, circadian rhythm, and natural sleep aid research.", category: "Mental Health" },
  { id: "adhd", title: "ADHD", desc: "Attention deficit hyperactivity disorder and focus research.", category: "Mental Health" },
  { id: "ptsd", title: "PTSD", desc: "Post-traumatic stress disorder and trauma recovery studies.", category: "Mental Health" },
  { id: "migraine", title: "Migraine", desc: "Migraine pathophysiology and natural prevention research.", category: "Neurological" },
  { id: "fibromyalgia", title: "Fibromyalgia", desc: "Chronic widespread pain and fatigue condition studies.", category: "Pain" },
  { id: "chronic-fatigue", title: "Chronic Fatigue Syndrome", desc: "ME/CFS research on energy metabolism and immune dysfunction.", category: "Complex Conditions" },
  { id: "diabetes-type-2", title: "Type 2 Diabetes", desc: "Blood sugar management and insulin resistance research.", category: "Metabolic" },
  { id: "obesity", title: "Obesity", desc: "Weight management, appetite regulation, and metabolic studies.", category: "Metabolic" },
  { id: "pcos", title: "PCOS", desc: "Polycystic ovary syndrome hormone and metabolic research.", category: "Women's Health" },
  { id: "endometriosis", title: "Endometriosis", desc: "Endometrial tissue growth and pain management studies.", category: "Women's Health" },
  { id: "menopause", title: "Menopause", desc: "Hormonal transition, hot flashes, and bone health research.", category: "Women's Health" },
  { id: "prostate", title: "Prostate Health", desc: "BPH, prostate cancer prevention, and urinary health studies.", category: "Men's Health" },
  { id: "erectile-dysfunction", title: "Erectile Dysfunction", desc: "Vascular, hormonal, and natural remedy research.", category: "Men's Health" },
  { id: "asthma", title: "Asthma", desc: "Airway inflammation and bronchodilation research.", category: "Respiratory" },
  { id: "copd", title: "COPD", desc: "Chronic obstructive pulmonary disease management studies.", category: "Respiratory" },
  { id: "allergies", title: "Allergies", desc: "Histamine response, immunotherapy, and natural antihistamine research.", category: "Immune" },
  { id: "lyme-disease", title: "Lyme Disease", desc: "Borrelia infection, co-infections, and integrative treatment studies.", category: "Infectious" },
  { id: "long-covid", title: "Long COVID", desc: "Post-acute COVID-19 syndrome and recovery research.", category: "Infectious" },
  // ← Add new conditions above this line
];

// Generate a stable pseudo-date based on index so items have varied pubDates
function itemDate(index: number, total: number): string {
  // Spread items across the last 12 months
  const now = Date.now();
  const msPerDay = 86400000;
  const daysBack = Math.floor((index / total) * 365);
  return new Date(now - daysBack * msPerDay).toUTCString();
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const allItems: Array<{ title: string; link: string; desc: string; category: string; date: string }> = [];
  const totalEntries = compounds.length + conditions.length;

  compounds.forEach((c, i) => {
    allItems.push({
      title: `${c.name} – Evidence Profile`,
      link: `${SITE_URL}/compound/${c.id}`,
      desc: `${c.desc} Category: ${c.category}.`,
      category: `Compounds – ${c.category}`,
      date: itemDate(i, totalEntries),
    });
  });

  conditions.forEach((c, i) => {
    allItems.push({
      title: `${c.title} – Research Summary`,
      link: `${SITE_URL}/condition/${c.id}`,
      desc: c.desc,
      category: `Conditions – ${c.category}`,
      date: itemDate(compounds.length + i, totalEntries),
    });
  });

  // Sort newest first
  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemsXml = allItems
    .map(
      (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <description><![CDATA[${item.desc}]]></description>
      <category>${item.category}</category>
      <pubDate>${item.date}</pubDate>
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
