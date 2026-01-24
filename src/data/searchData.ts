// Centralized searchable content for the site

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "condition" | "compound" | "therapy" | "research";
  tags: string[];
  link: string;
  studies?: number;
}

export const conditions: SearchItem[] = [
  {
    id: "cancer",
    title: "Cancer Research",
    description: "Complementary therapy studies including herbal compounds and adjunct treatments",
    category: "condition",
    tags: ["cancer", "oncology", "herbal", "complementary", "alternative cancer treatments"],
    link: "/condition/cancer",
    studies: 2400,
  },
  {
    id: "neurological",
    title: "Neurological Conditions",
    description: "Dementia, Parkinson's, Alzheimer's and cognitive health research",
    category: "condition",
    tags: ["brain", "dementia", "alzheimers", "parkinsons", "cognitive", "neurological", "memory"],
    link: "/condition/neurological",
    studies: 1800,
  },
  {
    id: "cardiovascular",
    title: "Cardiovascular Health",
    description: "Heart disease, hypertension, and circulatory system studies",
    category: "condition",
    tags: ["heart", "cardiovascular", "blood pressure", "hypertension", "circulation"],
    link: "/condition/cardiovascular",
    studies: 1500,
  },
  {
    id: "metabolic",
    title: "Metabolic Disorders",
    description: "Diabetes, obesity, and metabolic syndrome research",
    category: "condition",
    tags: ["diabetes", "obesity", "metabolic", "blood sugar", "weight", "insulin"],
    link: "/condition/metabolic",
    studies: 1200,
  },
  {
    id: "autoimmune",
    title: "Autoimmune Conditions",
    description: "Lupus, rheumatoid arthritis, and immune system disorders",
    category: "condition",
    tags: ["autoimmune", "lupus", "arthritis", "rheumatoid", "immune", "inflammation"],
    link: "/condition/autoimmune",
    studies: 900,
  },
  {
    id: "infectious",
    title: "Infectious Disease",
    description: "Long-COVID, viral infections, and emerging health conditions",
    category: "condition",
    tags: ["covid", "virus", "infection", "long covid", "viral", "immune"],
    link: "/condition/infectious",
    studies: 750,
  },
  {
    id: "musculoskeletal",
    title: "Musculoskeletal Health",
    description: "Arthritis, osteoporosis, and joint health research",
    category: "condition",
    tags: ["arthritis", "osteoporosis", "joints", "bones", "muscle", "pain"],
    link: "/condition/musculoskeletal",
    studies: 650,
  },
];

export const compounds: SearchItem[] = [
  {
    id: "lions-mane",
    title: "Lion's Mane (Hericium erinaceus)",
    description: "Research on neuroprotective properties, cognitive function associations, and NGF pathway studies",
    category: "compound",
    tags: ["lions mane", "mushroom", "brain", "cognitive", "neuroprotection", "memory", "ngf"],
    link: "/#compounds",
    studies: 340,
  },
  {
    id: "turkey-tail",
    title: "Turkey Tail (Trametes versicolor)",
    description: "Studies on immune response modulation, PSK research, and gut microbiome associations",
    category: "compound",
    tags: ["turkey tail", "mushroom", "immune", "psk", "gut", "cancer"],
    link: "/#compounds",
    studies: 280,
  },
  {
    id: "curcumin",
    title: "Curcumin (Turmeric)",
    description: "Research on inflammatory biomarkers and antioxidant properties from Curcuma longa",
    category: "compound",
    tags: ["curcumin", "turmeric", "anti-inflammatory", "antioxidant", "inflammation", "herbal"],
    link: "/#compounds",
    studies: 890,
  },
  {
    id: "berberine",
    title: "Berberine",
    description: "Studies on metabolic pathways, AMPK activation, and gut microbiome interactions",
    category: "compound",
    tags: ["berberine", "metabolic", "blood sugar", "diabetes", "ampk", "gut"],
    link: "/#compounds",
    studies: 420,
  },
  {
    id: "ashwagandha",
    title: "Ashwagandha (Withania somnifera)",
    description: "Research on stress biomarkers, cortisol associations, and sleep quality measures",
    category: "compound",
    tags: ["ashwagandha", "adaptogen", "stress", "cortisol", "sleep", "anxiety", "ayurveda"],
    link: "/#compounds",
    studies: 510,
  },
  {
    id: "papaya-leaf",
    title: "Green Papaya Leaf",
    description: "Studies on platelet parameters, dengue research, and enzyme content analysis",
    category: "compound",
    tags: ["papaya", "platelet", "dengue", "enzyme", "herbal"],
    link: "/#compounds",
    studies: 180,
  },
  {
    id: "nitric-oxide",
    title: "Nitric Oxide",
    description: "Research on vasodilation mechanisms, cardiovascular associations, and exercise physiology",
    category: "compound",
    tags: ["nitric oxide", "cardiovascular", "blood flow", "exercise", "vasodilation"],
    link: "/#compounds",
    studies: 1250,
  },
  {
    id: "methylene-blue",
    title: "Methylene Blue",
    description: "Studies on mitochondrial pathways and cognitive function associations (investigational)",
    category: "compound",
    tags: ["methylene blue", "mitochondria", "cognitive", "nootropic", "brain"],
    link: "/#compounds",
    studies: 620,
  },
  {
    id: "c60",
    title: "Carbon 60 (Buckminsterfullerene)",
    description: "Preliminary research on antioxidant properties and cellular studies (limited human data)",
    category: "compound",
    tags: ["c60", "carbon 60", "antioxidant", "longevity", "free radical"],
    link: "/#compounds",
    studies: 145,
  },
];

export const therapies: SearchItem[] = [
  {
    id: "acupuncture",
    title: "Acupuncture",
    description: "Ancient Chinese medicine using ultra-fine needles to unblock Qi energy flow",
    category: "therapy",
    tags: ["acupuncture", "chinese medicine", "tcm", "energy", "meridian", "pain", "alternative therapy"],
    link: "/integrative-therapies",
    studies: 450,
  },
  {
    id: "reiki",
    title: "Reiki Energy Healing",
    description: "Japanese light touch healing that moves energy blocks and nourishes the whole being",
    category: "therapy",
    tags: ["reiki", "energy healing", "japanese", "spiritual", "relaxation", "alternative medicine"],
    link: "/integrative-therapies",
    studies: 28,
  },
  {
    id: "ayurveda",
    title: "Ayurveda",
    description: "Ancient Indian system of medicine emphasizing balance through diet, herbs, and lifestyle",
    category: "therapy",
    tags: ["ayurveda", "indian medicine", "dosha", "vata", "pitta", "kapha", "herbal", "alternative medicine"],
    link: "/ayurveda",
    studies: 156,
  },
  {
    id: "chinese-medicine",
    title: "Traditional Chinese Medicine",
    description: "Comprehensive system including acupuncture, herbal medicine, Tui Na, and Qigong",
    category: "therapy",
    tags: ["chinese medicine", "tcm", "herbal", "qigong", "yin yang", "alternative medicine"],
    link: "/integrative-therapies",
    studies: 320,
  },
  {
    id: "massage",
    title: "Massage Therapy",
    description: "Soft tissue manipulation for restoration of function and release of tension",
    category: "therapy",
    tags: ["massage", "bodywork", "relaxation", "pain relief", "muscle", "tension"],
    link: "/integrative-therapies",
    studies: 200,
  },
  {
    id: "craniosacral",
    title: "Craniosacral Therapy",
    description: "Gentle work with spine, skull, and fascia to ease restrictions and promote healing",
    category: "therapy",
    tags: ["craniosacral", "bodywork", "gentle", "headache", "tmj", "fibromyalgia"],
    link: "/integrative-therapies",
    studies: 45,
  },
  {
    id: "chiropractic",
    title: "Chiropractic Care",
    description: "Healthcare focusing on musculoskeletal disorders through spinal adjustment",
    category: "therapy",
    tags: ["chiropractic", "spine", "adjustment", "back pain", "neck pain", "bodywork"],
    link: "/integrative-therapies",
    studies: 180,
  },
  {
    id: "essential-oils",
    title: "Essential Oils & Aromatherapy",
    description: "Therapeutic use of concentrated plant extracts for physical and emotional wellness",
    category: "therapy",
    tags: ["essential oils", "aromatherapy", "lavender", "peppermint", "eucalyptus", "relaxation"],
    link: "/integrative-therapies",
    studies: 120,
  },
  {
    id: "sai-vibrionics",
    title: "Sai Vibrionics",
    description: "Spiritual healing system using vibrational remedies based on Sri Sathya Sai Baba teachings",
    category: "therapy",
    tags: ["vibrionics", "vibrational", "spiritual", "energy healing", "alternative therapy"],
    link: "/integrative-therapies",
    studies: 10,
  },
  {
    id: "hypnotherapy",
    title: "Hypnotherapy & Past Life Regression",
    description: "Accessing deeper consciousness levels for healing and transformation",
    category: "therapy",
    tags: ["hypnotherapy", "hypnosis", "past life", "regression", "subconscious", "trauma"],
    link: "/integrative-therapies",
    studies: 85,
  },
  {
    id: "yoga-therapy",
    title: "Yoga Therapy",
    description: "Using yoga postures, breathing, and meditation to improve mental and physical health",
    category: "therapy",
    tags: ["yoga", "meditation", "breathing", "postures", "flexibility", "stress"],
    link: "/integrative-therapies",
    studies: 350,
  },
];

export const allSearchItems: SearchItem[] = [...conditions, ...compounds, ...therapies];

export function searchContent(query: string): SearchItem[] {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  
  return allSearchItems
    .map((item) => {
      const searchableText = [
        item.title,
        item.description,
        ...item.tags,
      ].join(" ").toLowerCase();
      
      // Calculate relevance score
      let score = 0;
      for (const term of searchTerms) {
        if (item.title.toLowerCase().includes(term)) score += 10;
        if (item.tags.some(tag => tag.includes(term))) score += 5;
        if (item.description.toLowerCase().includes(term)) score += 2;
        if (searchableText.includes(term)) score += 1;
      }
      
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
