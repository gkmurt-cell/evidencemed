import { useState, useMemo, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, ShoppingBag, Leaf, BookOpen, Video, Play, Package, AlertTriangle, Pill, Filter, ChevronDown, Search, Youtube, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { allBooks, bookCategories, type BookEntry } from "@/data/bookData";
import { useFuzzyBookSearch } from "@/hooks/useFuzzyBookSearch";

import herbNerdTshirt from "@/assets/herb-nerd-tshirt.png";
import herbMug from "@/assets/herb-mug.png";
import herbTote from "@/assets/herb-tote.png";
import herbStickers from "@/assets/herb-stickers.png";
import herbHoodie from "@/assets/herb-hoodie.png";

import cognitiveImg from "@/assets/shop/cognitive-health.jpg";
import immuneImg from "@/assets/shop/immune-support.jpg";
import essentialImg from "@/assets/shop/essential-vitamins.jpg";
import stressImg from "@/assets/shop/stress-adaptogens.jpg";
import gutImg from "@/assets/shop/gut-health.jpg";
import metabolicImg from "@/assets/shop/metabolic-health.jpg";
import longevityImg from "@/assets/shop/longevity.jpg";
import hormonalImg from "@/assets/shop/hormonal.jpg";
import antiInflammatoryImg from "@/assets/shop/anti-inflammatory.jpg";
import performanceImg from "@/assets/shop/performance.jpg";
import structuralImg from "@/assets/shop/structural.jpg";

// Per-product bottle image filenames (served from public/bottles/)
const bottleFileNames: Record<string, string> = {
  "1": "lions-mane", "2": "ashwagandha", "3": "curcumin", "4": "nmn",
  "5": "turkey-tail", "6": "vitamin-d3-k2", "7": "magnesium", "8": "omega3",
  "9": "berberine", "10": "tongkat-ali", "11": "l-theanine", "12": "quercetin",
  "13": "reishi", "14": "creatine", "15": "shilajit", "16": "probiotics",
  "17": "zinc", "18": "collagen", "19": "sea-moss", "20": "rhodiola",
  "21": "alpha-lipoic", "22": "coq10", "23": "spirulina", "24": "boron",
  "25": "bacopa", "26": "phosphatidylserine", "27": "citicoline", "28": "holy-basil",
  "29": "lemon-balm", "30": "boswellia", "31": "ginger", "32": "pea",
  "33": "resveratrol", "34": "spermidine", "35": "fisetin", "36": "chromium",
  "37": "cinnamon", "38": "fadogia", "39": "dim", "40": "beta-alanine",
  "41": "citrulline", "42": "tart-cherry", "43": "glutamine", "44": "psyllium",
  "45": "s-boulardii", "46": "hyaluronic", "47": "msm", "48": "biotin",
  "49": "elderberry", "50": "nac", "51": "selenium", "52": "iron",
};

const getBottleUrl = (id: string) => {
  const name = bottleFileNames[id];
  return name ? `/bottles/${name}.jpg` : null;
};

// ============ DATA TYPES ============

// Book type now imported from bookData.ts

interface Supplement {
  id: string;
  name: string;
  type: string;
  description: string;
  researchReference?: string;
  affiliateUrl: string;
  image: string;
  category: string;
}

interface SupplementCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  image: string;
}

const supplementCategories: SupplementCategory[] = [
  { id: "Cognitive", label: "Brain & Cognitive Health", description: "Nootropics and neuroprotective compounds", icon: "🧠", image: cognitiveImg },
  { id: "Immune", label: "Immune Support", description: "Immune-modulating compounds and mushrooms", icon: "🛡️", image: immuneImg },
  { id: "Essential", label: "Essential Vitamins & Minerals", description: "Foundational micronutrients for daily health", icon: "💊", image: essentialImg },
  { id: "Stress", label: "Stress & Adaptogens", description: "Adaptogenic herbs for stress resilience", icon: "🌿", image: stressImg },
  { id: "Gut", label: "Gut & Digestive Health", description: "Probiotics, prebiotics, and gut support", icon: "🦠", image: gutImg },
  { id: "Metabolic", label: "Metabolic Health", description: "Blood sugar, AMPK activation, and metabolism", icon: "⚡", image: metabolicImg },
  { id: "Longevity", label: "Longevity & Anti-Aging", description: "NAD+ precursors and cellular health", icon: "🧬", image: longevityImg },
  { id: "Hormonal", label: "Hormonal Balance", description: "Testosterone, cortisol, and endocrine support", icon: "🔬", image: hormonalImg },
  { id: "Inflammation", label: "Anti-Inflammatory", description: "Natural anti-inflammatory compounds", icon: "🔥", image: antiInflammatoryImg },
  { id: "Performance", label: "Performance & Recovery", description: "Sports nutrition and physical performance", icon: "💪", image: performanceImg },
  { id: "Structural", label: "Skin, Hair & Joints", description: "Collagen, connective tissue, and structural support", icon: "✨", image: structuralImg },
];

interface VideoLink {
  label: string;
  url: string;
  type: "youtube" | "book" | "course";
}

interface VideoContent {
  id: string;
  title: string;
  speaker: string;
  description: string;
  duration?: string;
  type: "free" | "paid";
  url: string;
  thumbnail?: string;
  category: string;
  affiliateLinks?: VideoLink[];
}

// ============ DATA ============

// Books now imported from bookData.ts

const supplements: Supplement[] = [
  {
    id: "1",
    name: "Lion's Mane Mushroom Extract",
    type: "Functional Mushroom",
    description: "Cognitive support from Hericium erinaceus fruiting body. Standardized for hericenones and erinacines.",
    researchReference: "Studies show NGF stimulation (Mori et al., 2009)",
    affiliateUrl: "https://www.amazon.com/dp/B078SZX3ML?tag=evidencemed1-20",
    image: "🍄",
    category: "Cognitive"
  },
  {
    id: "2",
    name: "Ashwagandha KSM-66",
    type: "Adaptogen",
    description: "Full-spectrum root extract, clinically studied at 600mg/day for stress and cortisol modulation.",
    researchReference: "Randomized trials on cortisol reduction (Chandrasekhar et al., 2012)",
    affiliateUrl: "https://www.amazon.com/dp/B07S76M4D5?tag=evidencemed1-20",
    image: "🌿",
    category: "Stress"
  },
  {
    id: "3",
    name: "Curcumin with BioPerine",
    type: "Anti-inflammatory",
    description: "Turmeric extract standardized to 95% curcuminoids with piperine for enhanced bioavailability.",
    researchReference: "2000+ published studies on curcumin bioactivity",
    affiliateUrl: "https://www.amazon.com/dp/B00VSVKJ8I?tag=evidencemed1-20",
    image: "🟡",
    category: "Inflammation"
  },
  {
    id: "4",
    name: "NMN (Nicotinamide Mononucleotide)",
    type: "Longevity",
    description: "NAD+ precursor supporting cellular energy metabolism and sirtuin activation.",
    researchReference: "Sinclair lab research at Harvard Medical School",
    affiliateUrl: "https://www.amazon.com/dp/B0FV281D99?tag=evidencemed1-20",
    image: "🧬",
    category: "Longevity"
  },
  {
    id: "5",
    name: "Turkey Tail Mushroom",
    type: "Functional Mushroom",
    description: "Immune-supporting polysaccharides (PSK/PSP) from Trametes versicolor.",
    researchReference: "NIH-funded studies on PSK immunomodulation",
    affiliateUrl: "https://www.amazon.com/dp/B0053DR1EM?tag=evidencemed1-20",
    image: "🍄",
    category: "Immune"
  },
  {
    id: "6",
    name: "Vitamin D3 + K2 (MK-7)",
    type: "Essential Vitamin",
    description: "Synergistic formula directing calcium to bones. D3 5000 IU with K2 as MK-7.",
    researchReference: "Meta-analyses on vitamin D deficiency and cardiovascular outcomes",
    affiliateUrl: "https://www.amazon.com/dp/B00XHK9SEO?tag=evidencemed1-20",
    image: "☀️",
    category: "Essential"
  },
  {
    id: "7",
    name: "Magnesium Glycinate",
    type: "Essential Mineral",
    description: "Highly bioavailable chelated magnesium for sleep, muscle relaxation, and nervous system support.",
    researchReference: "Abbasi et al., 2012 — magnesium and sleep quality",
    affiliateUrl: "https://www.amazon.com/dp/B000BD0RT0?tag=evidencemed1-20",
    image: "💎",
    category: "Essential"
  },
  {
    id: "8",
    name: "Omega-3 Fish Oil (EPA/DHA)",
    type: "Essential Fatty Acid",
    description: "Molecularly distilled, triglyceride-form fish oil. 1000mg EPA + 500mg DHA per serving.",
    researchReference: "REDUCE-IT trial; cardiovascular and neurological outcomes",
    affiliateUrl: "https://www.amazon.com/dp/B001LF39RO?tag=evidencemed1-20",
    image: "🐟",
    category: "Essential"
  },
  {
    id: "9",
    name: "Berberine HCl",
    type: "Alkaloid",
    description: "Plant alkaloid studied for AMPK activation, glucose metabolism, and gut microbiome modulation.",
    researchReference: "Yin et al., 2008 — metabolic syndrome meta-analysis",
    affiliateUrl: "https://www.amazon.com/dp/B08HHQWBBZ?tag=evidencemed1-20",
    image: "🌱",
    category: "Metabolic"
  },
  {
    id: "10",
    name: "Tongkat Ali (Eurycoma longifolia)",
    type: "Adaptogen",
    description: "Standardized root extract studied for testosterone support and cortisol reduction.",
    researchReference: "Talbott et al., 2013 — stress hormones and mood",
    affiliateUrl: "https://www.amazon.com/dp/B07TTDFXFV?tag=evidencemed1-20",
    image: "🌴",
    category: "Hormonal"
  },
  {
    id: "11",
    name: "L-Theanine",
    type: "Amino Acid",
    description: "Non-protein amino acid from green tea promoting calm focus via alpha-wave modulation.",
    researchReference: "Nobre et al., 2008 — alpha brainwave activity",
    affiliateUrl: "https://www.amazon.com/dp/B000H7P9M0?tag=evidencemed1-20",
    image: "🍵",
    category: "Cognitive"
  },
  {
    id: "12",
    name: "Quercetin Phytosome",
    type: "Flavonoid",
    description: "Enhanced-absorption quercetin with phospholipid complex. Zinc ionophore and immune modulator.",
    researchReference: "Li et al., 2016 — immune and antiviral mechanisms",
    affiliateUrl: "https://www.amazon.com/dp/B0797DQTVZ?tag=evidencemed1-20",
    image: "🧅",
    category: "Immune"
  },
  {
    id: "13",
    name: "Reishi Mushroom Extract",
    type: "Functional Mushroom",
    description: "Ganoderma lucidum dual-extract for immune modulation, sleep support, and stress adaptation.",
    researchReference: "Wachtel-Galor et al., 2011 — immunomodulation review",
    affiliateUrl: "https://www.amazon.com/dp/B078SJ9F8S?tag=evidencemed1-20",
    image: "🍄",
    category: "Immune"
  },
  {
    id: "14",
    name: "Creatine Monohydrate",
    type: "Performance Compound",
    description: "Most researched sports supplement. Benefits extend to cognitive function and neuroprotection.",
    researchReference: "1100+ studies; Kreider et al., 2017 ISSN position stand",
    affiliateUrl: "https://www.amazon.com/dp/B0013OXD38?tag=evidencemed1-20",
    image: "💪",
    category: "Performance"
  },
  {
    id: "15",
    name: "Shilajit (Purified)",
    type: "Mineral Complex",
    description: "Himalayan fulvic acid mineral complex studied for mitochondrial energy and testosterone.",
    researchReference: "Pandit et al., 2016 — testosterone and spermatogenesis",
    affiliateUrl: "https://www.amazon.com/dp/B0C3V61VG5?tag=evidencemed1-20",
    image: "🏔️",
    category: "Hormonal"
  },
  {
    id: "16",
    name: "Probiotics (Multi-Strain)",
    type: "Gut Health",
    description: "Clinically studied multi-strain probiotic with Lactobacillus and Bifidobacterium species.",
    researchReference: "Sanders et al., 2019 — probiotics and gut-brain axis",
    affiliateUrl: "https://www.amazon.com/dp/B00Y8MP4G6?tag=evidencemed1-20",
    image: "🦠",
    category: "Gut"
  },
  {
    id: "17",
    name: "Zinc Picolinate",
    type: "Essential Mineral",
    description: "Highly absorbable chelated zinc for immune function, wound healing, and hormone metabolism.",
    researchReference: "Prasad et al., 2008 — zinc and immune function",
    affiliateUrl: "https://www.amazon.com/dp/B001GAOHTS?tag=evidencemed1-20",
    image: "⚙️",
    category: "Essential"
  },
  {
    id: "18",
    name: "Collagen Peptides (Type I & III)",
    type: "Structural Protein",
    description: "Hydrolyzed collagen for skin elasticity, joint health, and connective tissue support.",
    researchReference: "Asserin et al., 2015 — skin hydration and elasticity",
    affiliateUrl: "https://www.amazon.com/dp/B00K6JUG4K?tag=evidencemed1-20",
    image: "✨",
    category: "Structural"
  },
  {
    id: "19",
    name: "Sea Moss (Irish Moss)",
    type: "Marine Superfood",
    description: "Chondrus crispus providing 92 of 102 essential minerals. Thyroid and gut health support.",
    researchReference: "Liu et al., 2015 — marine polysaccharides and prebiotic effects",
    affiliateUrl: "https://www.amazon.com/dp/B0DBXK87D8?tag=evidencemed1-20",
    image: "🌊",
    category: "Gut"
  },
  {
    id: "20",
    name: "Rhodiola Rosea",
    type: "Adaptogen",
    description: "Arctic root adaptogen studied for fatigue reduction, stress resilience, and exercise performance.",
    researchReference: "Darbinyan et al., 2000 — mental fatigue under stress",
    affiliateUrl: "https://www.amazon.com/dp/B0013OQEO0?tag=evidencemed1-20",
    image: "🌸",
    category: "Stress"
  },
  {
    id: "21",
    name: "Alpha-Lipoic Acid (R-ALA)",
    type: "Antioxidant",
    description: "Universal antioxidant active in both water and fat. Studied for neuropathy and blood sugar.",
    researchReference: "Ziegler et al., 2006 — diabetic neuropathy trials",
    affiliateUrl: "https://www.amazon.com/dp/B0019GW3G8?tag=evidencemed1-20",
    image: "⚡",
    category: "Metabolic"
  },
  {
    id: "22",
    name: "CoQ10 (Ubiquinol)",
    type: "Mitochondrial Support",
    description: "Active form of Coenzyme Q10 for mitochondrial energy production and cardiovascular support.",
    researchReference: "Mortensen et al., 2014 — Q-SYMBIO heart failure trial",
    affiliateUrl: "https://www.amazon.com/dp/B073VL4WKN?tag=evidencemed1-20",
    image: "❤️",
    category: "Essential"
  },
  {
    id: "23",
    name: "Spirulina Powder",
    type: "Superfood",
    description: "Blue-green algae rich in phycocyanin, protein, and B-vitamins. Antioxidant and anti-inflammatory.",
    researchReference: "Deng & Chow, 2010 — hypolipidemic and antioxidant effects",
    affiliateUrl: "https://www.amazon.com/dp/B0039ITKFY?tag=evidencemed1-20",
    image: "🌿",
    category: "Immune"
  },
  {
    id: "24",
    name: "Boron (as Glycinate)",
    type: "Trace Mineral",
    description: "Essential trace mineral for bone metabolism, hormone regulation, and cognitive function.",
    researchReference: "Newnham, 1994 — arthritis and boron essentiality",
    affiliateUrl: "https://www.amazon.com/dp/B000BV1O7E?tag=evidencemed1-20",
    image: "🪨",
    category: "Essential"
  },
  // ---- Additional Cognitive ----
  {
    id: "25",
    name: "Bacopa Monnieri",
    type: "Nootropic Herb",
    description: "Ayurvedic herb with bacosides studied for memory consolidation and attention in 12-week trials.",
    researchReference: "Calabrese et al., 2008 — systematic review of cognitive effects",
    affiliateUrl: "https://www.amazon.com/dp/B07D6VBXFY?tag=evidencemed1-20",
    image: "🧠",
    category: "Cognitive"
  },
  {
    id: "26",
    name: "Phosphatidylserine (PS)",
    type: "Phospholipid",
    description: "Cell membrane phospholipid supporting cognitive function, cortisol modulation, and memory.",
    researchReference: "Kato-Kataoka et al., 2010 — cognitive function in elderly",
    affiliateUrl: "https://www.amazon.com/dp/B00020IP9G?tag=evidencemed1-20",
    image: "💡",
    category: "Cognitive"
  },
  {
    id: "27",
    name: "CDP-Choline (Citicoline)",
    type: "Nootropic",
    description: "Precursor to acetylcholine and phosphatidylcholine. Studied for focus, memory, and neuroprotection.",
    researchReference: "McGlade et al., 2012 — attention and psychomotor speed",
    affiliateUrl: "https://www.amazon.com/dp/B01A3BED8U?tag=evidencemed1-20",
    image: "⚡",
    category: "Cognitive"
  },
  // ---- Additional Stress ----
  {
    id: "28",
    name: "Holy Basil (Tulsi)",
    type: "Adaptogen",
    description: "Sacred Ayurvedic herb studied for cortisol regulation, anxiety, and metabolic stress.",
    researchReference: "Cohen, 2014 — human efficacy and safety review",
    affiliateUrl: "https://www.amazon.com/dp/B0006NZPGA?tag=evidencemed1-20",
    image: "🌱",
    category: "Stress"
  },
  {
    id: "29",
    name: "Lemon Balm (Melissa officinalis)",
    type: "Calming Herb",
    description: "GABA-transaminase inhibitor studied for anxiety reduction, sleep quality, and calm focus.",
    researchReference: "Cases et al., 2011 — anxiolytic effects in humans",
    affiliateUrl: "https://www.amazon.com/dp/B0013OQIJY?tag=evidencemed1-20",
    image: "🍋",
    category: "Stress"
  },
  // ---- Additional Inflammation ----
  {
    id: "30",
    name: "Boswellia Serrata",
    type: "Resin Extract",
    description: "5-LOX inhibitor from Indian frankincense. Studied for joint inflammation and IBD.",
    researchReference: "Ammon, 2006 — anti-inflammatory mechanisms",
    affiliateUrl: "https://www.amazon.com/dp/B0013OQGNO?tag=evidencemed1-20",
    image: "🌳",
    category: "Inflammation"
  },
  {
    id: "31",
    name: "Ginger Extract (Zingiber officinale)",
    type: "Anti-inflammatory",
    description: "COX-2 inhibitor with gingerols and shogaols. Studied for pain, nausea, and inflammation.",
    researchReference: "Terry et al., 2011 — anti-inflammatory review",
    affiliateUrl: "https://www.amazon.com/dp/B0756FW8RL?tag=evidencemed1-20",
    image: "🫚",
    category: "Inflammation"
  },
  {
    id: "32",
    name: "Palmitoylethanolamide (PEA)",
    type: "Endocannabinoid",
    description: "Endogenous fatty acid amide with analgesic and anti-inflammatory properties via PPAR-α activation.",
    researchReference: "Petrosino & Di Marzo, 2017 — PEA and neuroinflammation",
    affiliateUrl: "https://www.amazon.com/dp/B07RCCHJBV?tag=evidencemed1-20",
    image: "🧪",
    category: "Inflammation"
  },
  // ---- Additional Longevity ----
  {
    id: "33",
    name: "Resveratrol (Trans-Resveratrol)",
    type: "Polyphenol",
    description: "SIRT1 activator from grape skins. Studied for cardiovascular protection and cellular aging.",
    researchReference: "Baur et al., 2006 — resveratrol and sirtuins",
    affiliateUrl: "https://www.amazon.com/dp/B08QBXMHRT?tag=evidencemed1-20",
    image: "🍇",
    category: "Longevity"
  },
  {
    id: "34",
    name: "Spermidine",
    type: "Polyamine",
    description: "Autophagy-inducing polyamine studied for cellular renewal and healthy aging.",
    researchReference: "Eisenberg et al., 2009 — autophagy and longevity",
    affiliateUrl: "https://www.amazon.com/dp/B08KSGPNWL?tag=evidencemed1-20",
    image: "🔬",
    category: "Longevity"
  },
  {
    id: "35",
    name: "Fisetin",
    type: "Senolytic Flavonoid",
    description: "Potent senolytic compound from strawberries studied for clearing senescent cells.",
    researchReference: "Yousefzadeh et al., 2018 — senolytic activity in vivo",
    affiliateUrl: "https://www.amazon.com/dp/B0CKQTW37B?tag=evidencemed1-20",
    image: "🍓",
    category: "Longevity"
  },
  // ---- Additional Metabolic ----
  {
    id: "36",
    name: "Chromium Picolinate",
    type: "Trace Mineral",
    description: "Insulin-sensitizing trace mineral studied for glucose tolerance and carbohydrate metabolism.",
    researchReference: "Anderson, 1998 — chromium in insulin signaling",
    affiliateUrl: "https://www.amazon.com/dp/B0019LPNLK?tag=evidencemed1-20",
    image: "🔩",
    category: "Metabolic"
  },
  {
    id: "37",
    name: "Cinnamon Extract (Ceylon)",
    type: "Botanical",
    description: "True cinnamon extract studied for insulin sensitivity and fasting blood glucose reduction.",
    researchReference: "Davis & Yokoyama, 2011 — cinnamon and type 2 diabetes",
    affiliateUrl: "https://www.amazon.com/dp/B08FK82Q31?tag=evidencemed1-20",
    image: "🫙",
    category: "Metabolic"
  },
  // ---- Additional Hormonal ----
  {
    id: "38",
    name: "Fadogia Agrestis",
    type: "Testosterone Support",
    description: "Nigerian shrub stem extract studied for luteinizing hormone and testosterone elevation.",
    researchReference: "Yakubu et al., 2005 — androgenic effects",
    affiliateUrl: "https://www.amazon.com/dp/B0BPVL8S53?tag=evidencemed1-20",
    image: "🌿",
    category: "Hormonal"
  },
  {
    id: "39",
    name: "DIM (Diindolylmethane)",
    type: "Estrogen Modulator",
    description: "Cruciferous vegetable metabolite supporting healthy estrogen metabolism via 2-OH pathway.",
    researchReference: "Thomson et al., 2016 — estrogen metabolism in women",
    affiliateUrl: "https://www.amazon.com/dp/B006KL4TYG?tag=evidencemed1-20",
    image: "🥦",
    category: "Hormonal"
  },
  // ---- Additional Performance ----
  {
    id: "40",
    name: "Beta-Alanine",
    type: "Amino Acid",
    description: "Carnosine precursor buffering muscle acidity. Studied for endurance and high-intensity performance.",
    researchReference: "Hobson et al., 2012 — meta-analysis on exercise capacity",
    affiliateUrl: "https://www.amazon.com/dp/B00MWE8WAM?tag=evidencemed1-20",
    image: "🏋️",
    category: "Performance"
  },
  {
    id: "41",
    name: "Citrulline Malate",
    type: "Amino Acid",
    description: "Nitric oxide precursor enhancing blood flow, exercise performance, and recovery.",
    researchReference: "Pérez-Guisado & Jakeman, 2010 — resistance exercise performance",
    affiliateUrl: "https://www.amazon.com/dp/B00EYDJTRE?tag=evidencemed1-20",
    image: "🍉",
    category: "Performance"
  },
  {
    id: "42",
    name: "Tart Cherry Extract",
    type: "Recovery Aid",
    description: "Rich in anthocyanins studied for exercise recovery, sleep quality, and uric acid reduction.",
    researchReference: "Howatson et al., 2010 — marathon recovery trial",
    affiliateUrl: "https://www.amazon.com/dp/B07TD6KJS3?tag=evidencemed1-20",
    image: "🍒",
    category: "Performance"
  },
  // ---- Additional Gut ----
  {
    id: "43",
    name: "L-Glutamine",
    type: "Amino Acid",
    description: "Primary fuel for intestinal epithelial cells. Studied for gut permeability and mucosal repair.",
    researchReference: "Rao & Samak, 2012 — intestinal barrier function",
    affiliateUrl: "https://www.amazon.com/dp/B002FJY3W0?tag=evidencemed1-20",
    image: "🧬",
    category: "Gut"
  },
  {
    id: "44",
    name: "Psyllium Husk (Organic)",
    type: "Prebiotic Fiber",
    description: "Soluble fiber supporting gut motility, microbiome diversity, and cholesterol reduction.",
    researchReference: "McRorie, 2015 — clinical guide to soluble fiber",
    affiliateUrl: "https://www.amazon.com/dp/B00JDOAKRM?tag=evidencemed1-20",
    image: "🌾",
    category: "Gut"
  },
  {
    id: "45",
    name: "Saccharomyces Boulardii",
    type: "Probiotic Yeast",
    description: "Beneficial yeast probiotic studied for antibiotic-associated diarrhea and C. difficile prevention.",
    researchReference: "McFarland, 2010 — meta-analysis on efficacy",
    affiliateUrl: "https://www.amazon.com/dp/B0719BVG2Q?tag=evidencemed1-20",
    image: "🍞",
    category: "Gut"
  },
  // ---- Additional Structural ----
  {
    id: "46",
    name: "Hyaluronic Acid",
    type: "Glycosaminoglycan",
    description: "Naturally occurring molecule for joint lubrication, skin hydration, and wound healing.",
    researchReference: "Oe et al., 2016 — oral HA and skin moisture",
    affiliateUrl: "https://www.amazon.com/dp/B085F2TJGL?tag=evidencemed1-20",
    image: "💧",
    category: "Structural"
  },
  {
    id: "47",
    name: "MSM (Methylsulfonylmethane)",
    type: "Sulfur Compound",
    description: "Organic sulfur for joint flexibility, connective tissue support, and exercise recovery.",
    researchReference: "Butawan et al., 2017 — MSM review for joint health",
    affiliateUrl: "https://www.amazon.com/dp/B000NU2L4A?tag=evidencemed1-20",
    image: "🦴",
    category: "Structural"
  },
  {
    id: "48",
    name: "Biotin (High-Dose)",
    type: "B-Vitamin",
    description: "10,000 mcg biotin for hair growth, nail strength, and keratin infrastructure support.",
    researchReference: "Patel et al., 2017 — biotin and hair/nail outcomes",
    affiliateUrl: "https://www.amazon.com/dp/B0C5S39L5X?tag=evidencemed1-20",
    image: "💅",
    category: "Structural"
  },
  // ---- Additional Immune ----
  {
    id: "49",
    name: "Elderberry Extract (Sambucus)",
    type: "Berry Extract",
    description: "Anthocyanin-rich berry studied for reducing duration and severity of upper respiratory infections.",
    researchReference: "Tiralongo et al., 2016 — air-traveler immune trial",
    affiliateUrl: "https://www.amazon.com/dp/B005P0UZL4?tag=evidencemed1-20",
    image: "🫐",
    category: "Immune"
  },
  {
    id: "50",
    name: "N-Acetyl Cysteine (NAC)",
    type: "Amino Acid Derivative",
    description: "Glutathione precursor with mucolytic, antioxidant, and liver-protective properties.",
    researchReference: "Atkuri et al., 2007 — NAC and glutathione pathways",
    affiliateUrl: "https://www.amazon.com/dp/B0046HIBSQ?tag=evidencemed1-20",
    image: "🛡️",
    category: "Immune"
  },
  // ---- Additional Essential ----
  {
    id: "51",
    name: "Selenium (Selenomethionine)",
    type: "Essential Mineral",
    description: "Trace mineral essential for thyroid function, glutathione peroxidase, and DNA synthesis.",
    researchReference: "Rayman, 2012 — selenium and health review",
    affiliateUrl: "https://www.amazon.com/dp/B0019GXOWA?tag=evidencemed1-20",
    image: "🔶",
    category: "Essential"
  },
  {
    id: "52",
    name: "Iron Bisglycinate",
    type: "Essential Mineral",
    description: "Gentle chelated iron with superior absorption and minimal GI side effects.",
    researchReference: "Milman et al., 2014 — iron bisglycinate vs ferrous sulfate",
    affiliateUrl: "https://www.amazon.com/dp/B001F0R5C4?tag=evidencemed1-20",
    image: "🩸",
    category: "Essential"
  },
];

const videoContent: VideoContent[] = [
  {
    id: "1",
    title: "Ivermectin: The Evidence",
    speaker: "Dr. John Campbell",
    description: "Comprehensive review of ivermectin research and its potential applications as a repurposed drug.",
    duration: "25 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs",
    affiliateLinks: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DrJohnCampbell?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "2",
    title: "Vitamin D and Immune Function",
    speaker: "Dr. John Campbell",
    description: "The science behind vitamin D deficiency and its critical role in immune system regulation.",
    duration: "30 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Vitamins",
    affiliateLinks: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DrJohnCampbell?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "3",
    title: "Repurposing Existing Medications",
    speaker: "Dr. John Campbell",
    description: "How existing approved drugs are being studied for new therapeutic applications.",
    duration: "28 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs",
    affiliateLinks: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DrJohnCampbell?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "4",
    title: "Fluvoxamine Research Update",
    speaker: "Dr. John Campbell",
    description: "Analysis of clinical trials examining fluvoxamine as a repurposed therapeutic agent.",
    duration: "22 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs",
    affiliateLinks: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DrJohnCampbell?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "5",
    title: "Metformin: Beyond Diabetes",
    speaker: "Dr. John Campbell",
    description: "Exploring research on metformin's potential benefits for longevity and other conditions.",
    duration: "32 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs",
    affiliateLinks: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DrJohnCampbell?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "6",
    title: "Understanding NAD+ and Cellular Aging",
    speaker: "Dr. David Sinclair",
    description: "Harvard professor explains the science of longevity and NAD+ metabolism.",
    duration: "45 min",
    type: "free",
    url: "https://youtube.com",
    category: "Longevity",
    affiliateLinks: [
      { label: "Lifespan (Book)", url: "https://www.amazon.com/dp/1501191977", type: "book" },
      { label: "YouTube Channel", url: "https://www.youtube.com/@davidsinclairphd?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "7",
    title: "Metabolic Health Masterclass",
    speaker: "Dr. Peter Attia",
    description: "Deep dive into metabolic health, glucose regulation, and longevity medicine.",
    duration: "2 hours",
    type: "paid",
    url: "#",
    category: "Metabolic",
    affiliateLinks: [
      { label: "Outlive (Book)", url: "https://www.amazon.com/dp/0593236599", type: "book" },
      { label: "Peter Attia Courses", url: "https://peterattiamd.com", type: "course" },
    ],
  },
  {
    id: "8",
    title: "Autoimmune Protocol Explained",
    speaker: "Dr. Terry Wahls",
    description: "How to use nutrition and lifestyle to address autoimmune conditions.",
    duration: "1 hour",
    type: "free",
    url: "https://youtube.com",
    category: "Autoimmune",
    affiliateLinks: [
      { label: "The Wahls Protocol (Book)", url: "https://www.amazon.com/dp/1583335544", type: "book" },
      { label: "Wahls Protocol Course", url: "https://terrywahls.com", type: "course" },
    ],
  },
  {
    id: "9",
    title: "Gut Microbiome & Immunity",
    speaker: "Dr. Will Bulsiewicz",
    description: "The connection between gut health, fiber, and immune function.",
    duration: "55 min",
    type: "free",
    url: "https://youtube.com",
    category: "Gut Health",
    affiliateLinks: [
      { label: "Fiber Fueled (Book)", url: "https://www.amazon.com/dp/059308456X", type: "book" },
    ],
  },
  {
    id: "10",
    title: "Integrative Oncology Webinar",
    speaker: "Dr. Paul Marik",
    description: "Evidence-based integrative approaches in cancer care.",
    duration: "90 min",
    type: "paid",
    url: "#",
    category: "Oncology",
    affiliateLinks: [
      { label: "FLCCC Courses", url: "https://covid19criticalcare.com", type: "course" },
    ],
  },
  {
    id: "11",
    title: "Fasting Science Deep Dive",
    speaker: "Dr. Jason Fung",
    description: "Understanding intermittent fasting and therapeutic fasting protocols.",
    duration: "1 hour",
    type: "free",
    url: "https://youtube.com",
    category: "Metabolic",
    affiliateLinks: [
      { label: "The Obesity Code (Book)", url: "https://www.amazon.com/dp/1771641258", type: "book" },
      { label: "YouTube Channel", url: "https://www.youtube.com/@drjasonfung?sub_confirmation=1", type: "youtube" },
    ],
  },
  {
    id: "12",
    title: "Low Dose Naltrexone Research",
    speaker: "Dr. John Campbell",
    description: "Reviewing the evidence for LDN as a repurposed drug for autoimmune and chronic conditions.",
    duration: "26 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs",
    affiliateLinks: [
      { label: "YouTube Channel", url: "https://www.youtube.com/@DrJohnCampbell?sub_confirmation=1", type: "youtube" },
    ],
  },
];

// ============ COMPONENTS ============

function AffiliateDisclosureBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 md:p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
            Affiliate Disclosure
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            Some products listed here are affiliate links. EvidenceMed receives a small commission at no extra cost to you. 
            All content is educational; <strong>this is not medical advice</strong>. Always consult a qualified healthcare 
            provider before starting any supplement or treatment protocol.
          </p>
        </div>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: BookEntry }) {
  return (
    <article className="group bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex gap-4">
        <div className="w-16 h-20 bg-muted/50 rounded flex-shrink-0 overflow-hidden">
          <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <Link to={`/library/${book.category}`} className="text-xs text-primary hover:underline mb-1 inline-block">
            {bookCategories.find(c => c.id === book.category)?.label ?? book.category}
          </Link>
          <h3 className="font-serif font-medium text-foreground text-sm leading-tight mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
          {book.researchReference && (
            <p className="text-xs text-primary/70 mb-2">{book.researchReference}</p>
          )}
          <a
            href={book.sources[0]?.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Publisher link</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function SupplementCard({ supplement }: { supplement: Supplement }) {
  const bottleImg = getBottleUrl(supplement.id);
  return (
    <a
      href={supplement.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card rounded-lg border border-border overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3 p-4">
        {/* Product bottle image */}
        <div className="w-16 h-20 rounded bg-muted/30 flex-shrink-0 overflow-hidden">
          {bottleImg ? (
            <img src={bottleImg} alt={supplement.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Leaf className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">{supplement.type}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{supplement.category}</span>
          </div>
          <h3 className="font-serif font-medium text-foreground text-sm leading-tight mb-1">
            {supplement.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {supplement.description}
          </p>
          {supplement.researchReference && (
            <p className="text-xs text-primary/70 mb-2">
              {supplement.researchReference}
            </p>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <span>View product</span>
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function SupplementCategoryNav({ activeCategory, onCategoryClick }: { activeCategory: string | null; onCategoryClick: (id: string | null) => void }) {
  const activeCats = supplementCategories.filter(cat => supplements.some(s => s.category === cat.id));
  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onCategoryClick(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            activeCategory === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
          }`}
        >
          All Categories
        </button>
        {activeCats.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
            }`}
          >
            <span className="mr-1">{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SupplementCategoryBlock({ cat }: { cat: SupplementCategory }) {
  const catSupplements = supplements.filter(s => s.category === cat.id);
  if (catSupplements.length === 0) return null;
  return (
    <div id={`shop-${cat.id}`}>
      {/* Category hero banner */}
      <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-4">
        <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground">{cat.label}</h3>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-md">{cat.description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {catSupplements.map(supplement => (
          <SupplementCard key={supplement.id} supplement={supplement} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: VideoContent }) {
  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Lecture-style thumbnail: neutral academic aesthetic */}
      <div className="aspect-video bg-slate-800 relative overflow-hidden">
        {/* Podium/presentation visual */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Abstract slide/presentation element */}
          <div className="w-3/4 h-2/3 bg-slate-700/80 rounded-sm border border-slate-600 flex items-center justify-center mb-2">
            <div className="text-center px-4">
              <div className="w-12 h-0.5 bg-slate-500 mx-auto mb-2" />
              <div className="w-16 h-0.5 bg-slate-500 mx-auto mb-2" />
              <div className="w-10 h-0.5 bg-slate-500 mx-auto" />
            </div>
          </div>
          {/* Podium indicator */}
          <div className="w-8 h-1 bg-slate-600 rounded-full" />
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/20">
            <Play className="h-5 w-5 text-white ml-0.5" />
          </div>
        </div>
        {/* Badges */}
        <Badge className={`absolute top-3 left-3 ${video.type === 'paid' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-emerald-600/90 hover:bg-emerald-600'}`}>
          {video.type === 'paid' ? 'Premium' : 'Free'}
        </Badge>
        {video.duration && (
          <Badge variant="outline" className="absolute top-3 right-3 bg-slate-900/80 text-slate-200 border-slate-600">
            {video.duration}
          </Badge>
        )}
        {/* Speaker indicator - neutral talking head style */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center">
            <span className="text-xs text-slate-300 font-medium">
              {video.speaker.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[120px]">
            {video.speaker}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1 font-medium">{video.category}</p>
        <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <span>{video.type === 'paid' ? 'Get Access' : 'Watch Lecture'}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          {video.affiliateLinks && video.affiliateLinks.length > 0 && (
            <>
              <span className="text-muted-foreground/40">|</span>
              {video.affiliateLinks.map((link, i) => {
                const Icon = link.type === "youtube" ? Youtube : link.type === "book" ? BookOpen : GraduationCap;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-3 w-3" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="text-center py-12">
      <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
      <p className="text-muted-foreground">No {category} available yet.</p>
    </div>
  );
}

// ============ MAIN COMPONENT ============

export default function Merch() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl && ["all", "books", "supplements", "videos"].includes(tabFromUrl) ? tabFromUrl : "all");
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [bookSearch, setBookSearch] = useState("");
  const [activeShopCategory, setActiveShopCategory] = useState<string | null>(null);

  useEffect(() => {
    if (tabFromUrl && ["all", "books", "supplements", "videos"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  const { filteredBooks, suggestion, correctedQuery } = useFuzzyBookSearch(bookSearch);

  const applySuggestion = useCallback(() => {
    if (correctedQuery) setBookSearch(correctedQuery);
  }, [correctedQuery]);
  
  const VIDEOS_PER_PAGE = 6;
  const hasMoreVideos = visibleVideos < videoContent.length;
  
  const loadMoreVideos = () => {
    setVisibleVideos(prev => Math.min(prev + VIDEOS_PER_PAGE, videoContent.length));
  };
  
  const displayedVideos = videoContent.slice(0, visibleVideos);

  return (
    <>
      <Helmet>
        <title>Reference Library | EvidenceMed</title>
        <meta name="description" content="Curated reference materials including peer-reviewed books, researched compounds, and educational lectures. Bibliography-style resources for further reading." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16 lg:pt-20">






          {/* Products Section with Tabs */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent">
                    <TabsTrigger 
                      value="all" 
                      className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      All Resources
                    </TabsTrigger>
                    <TabsTrigger 
                      value="books" 
                      className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                    >
                      <BookOpen className="h-4 w-4 mr-1" /> Books
                    </TabsTrigger>
                    <TabsTrigger 
                      value="supplements" 
                      className="rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                    >
                      <Pill className="h-4 w-4 mr-1" /> Supplement Shop
                    </TabsTrigger>
                    <TabsTrigger 
                      value="videos" 
                      className="rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      <Video className="h-4 w-4 mr-1" /> Videos
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>Filter by category above</span>
                  </div>
                </div>

                {/* All Resources */}
                <TabsContent value="all" className="space-y-12">
                  {/* Books Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <h2 className="font-serif text-xl font-medium text-foreground">Published Works</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Medical reference books and health guides across integrative medicine
                    </p>
                    {/* Search bar */}
                    <div className="relative max-w-sm mb-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search books by title, author, or topic…"
                        value={bookSearch}
                        onChange={(e) => setBookSearch(e.target.value)}
                        className="pl-10 text-sm"
                      />
                    </div>
                    {suggestion && (
                      <p className="text-sm text-muted-foreground mb-4">
                        Did you mean{" "}
                        <button
                          onClick={applySuggestion}
                          className="text-primary font-medium italic hover:underline"
                        >
                          {suggestion}
                        </button>
                        ?
                      </p>
                    )}
                    {bookSearch.trim() && filteredBooks.length === 0 && !suggestion && (
                      <p className="text-sm text-muted-foreground mb-4">
                        No results found for "<span className="font-medium">{bookSearch}</span>"
                      </p>
                    )}
                    {/* Category chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {bookCategories.map((cat) => (
                        <Link key={cat.id} to={`/library/${cat.id}`}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                            {cat.label}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredBooks.slice(0, 6).map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                    {filteredBooks.length > 6 && (
                      <div className="flex justify-center mt-4">
                        <Link to="/library/nutrition">
                          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            View all {filteredBooks.length} books →
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Supplement Shop Section - grouped by category */}
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">Supplement Shop</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Research-backed supplements organized by health category
                    </p>
                    <SupplementCategoryNav activeCategory={activeShopCategory} onCategoryClick={setActiveShopCategory} />
                    <div className="space-y-10">
                      {supplementCategories
                        .filter(cat => supplements.some(s => s.category === cat.id))
                        .filter(cat => activeShopCategory === null || cat.id === activeShopCategory)
                        .map(cat => (
                          <SupplementCategoryBlock key={cat.id} cat={cat} />
                        ))}
                    </div>
                  </div>

                  {/* Lectures Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="h-5 w-5 text-muted-foreground" />
                      <h2 className="font-serif text-xl font-medium text-foreground">Educational Lectures</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Recorded presentations and talks from researchers and clinicians
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayedVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                    {hasMoreVideos && (
                      <div className="flex justify-center mt-6">
                        <Button 
                          variant="ghost" 
                          onClick={loadMoreVideos}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Show more ({videoContent.length - visibleVideos} additional)
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Books Tab */}
                <TabsContent value="books">
                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-1">Published Works</h2>
                    <p className="text-sm text-muted-foreground mb-4">Medical reference books and health guides</p>
                    <div className="relative max-w-sm mb-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search books by title, author, or topic…"
                        value={bookSearch}
                        onChange={(e) => setBookSearch(e.target.value)}
                        className="pl-10 text-sm"
                      />
                    </div>
                    {suggestion && (
                      <p className="text-sm text-muted-foreground mb-4">
                        Did you mean{" "}
                        <button
                          onClick={applySuggestion}
                          className="text-primary font-medium italic hover:underline"
                        >
                          {suggestion}
                        </button>
                        ?
                      </p>
                    )}
                    {bookSearch.trim() && filteredBooks.length === 0 && !suggestion && (
                      <p className="text-sm text-muted-foreground mb-4">
                        No results found for "<span className="font-medium">{bookSearch}</span>"
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {bookCategories.map((cat) => (
                        <Link key={cat.id} to={`/library/${cat.id}`}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                            {cat.label}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState category="books" />
                  )}
                </TabsContent>

                {/* Supplement Shop Tab */}
                <TabsContent value="supplements">
                  <div className="mb-6">
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">Supplement Shop</h2>
                    <p className="text-sm text-muted-foreground">Research-backed supplements organized by health category</p>
                  </div>
                  <SupplementCategoryNav activeCategory={activeShopCategory} onCategoryClick={setActiveShopCategory} />
                  {supplements.length > 0 ? (
                    <div className="space-y-10">
                      {supplementCategories
                        .filter(cat => supplements.some(s => s.category === cat.id))
                        .filter(cat => activeShopCategory === null || cat.id === activeShopCategory)
                        .map(cat => (
                          <SupplementCategoryBlock key={cat.id} cat={cat} />
                        ))}
                    </div>
                  ) : (
                    <EmptyState category="supplements" />
                  )}
                </TabsContent>

                {/* Lectures Tab */}
                <TabsContent value="videos">
                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-1">Educational Lectures</h2>
                    <p className="text-sm text-muted-foreground">Recorded presentations and talks from researchers and clinicians</p>
                  </div>
                  {videoContent.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedVideos.map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                      </div>
                      {hasMoreVideos && (
                        <div className="flex justify-center mt-6">
                          <Button 
                            variant="ghost" 
                            onClick={loadMoreVideos}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Show more ({videoContent.length - visibleVideos} additional)
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <EmptyState category="lectures" />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Affiliate Disclosure */}
          <section className="py-4 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
              <AffiliateDisclosureBanner />
            </div>
          </section>

          {/* Bottom Disclaimer */}
          <section className="py-8 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Educational Disclaimer:</strong> The products and resources on this page are provided for 
                  educational purposes only. They are not intended to diagnose, treat, cure, or prevent any disease. 
                  Always consult with a qualified healthcare professional before starting any new supplement or treatment. 
                  EvidenceMed is not responsible for any adverse effects resulting from the use of any products linked here.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
