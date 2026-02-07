export interface BookSource {
  name: string;
  url: string;
  type: "publisher" | "retailer" | "academic";
}

export interface BookEntry {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  researchReference?: string;
  category: string;
  isbn?: string;
  year?: number;
  sources: BookSource[];
}

export const bookCategories = [
  { id: "nutrition", label: "Nutrition", description: "Evidence-based guides on nutrition, diet, and food as medicine" },
  { id: "autoimmune", label: "Autoimmune", description: "Functional medicine approaches to autoimmune conditions" },
  { id: "oncology", label: "Oncology", description: "Integrative and complementary approaches to cancer care" },
  { id: "cognitive", label: "Cognitive Health", description: "Brain health, neurodegeneration, and cognitive enhancement" },
  { id: "longevity", label: "Longevity", description: "Anti-aging science, cellular repair, and lifespan research" },
  { id: "ayurveda", label: "Ayurveda", description: "Traditional Ayurvedic medicine and holistic healing systems" },
  { id: "herbal-medicine", label: "Herbal Medicine", description: "Botanical medicine, phytotherapy, and plant-based therapeutics" },
  { id: "functional-medicine", label: "Functional Medicine", description: "Root-cause medicine and personalized health approaches" },
  { id: "gut-health", label: "Gut Health", description: "Microbiome science, digestive health, and gut-brain connection" },
  { id: "mental-health", label: "Mental Health", description: "Integrative psychiatry, stress, and mind-body medicine" },
] as const;

export type BookCategoryId = typeof bookCategories[number]["id"];

export const allBooks: BookEntry[] = [
  // Nutrition
  {
    id: "1",
    title: "How Not to Die",
    author: "Dr. Michael Greger",
    description: "Evidence-based guide to preventing and reversing disease through diet and lifestyle. Covers the fifteen leading causes of death and how dietary choices can be our best defense.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    researchReference: "Cited in 500+ peer-reviewed studies",
    category: "nutrition",
    isbn: "978-1250066114",
    year: 2015,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1250066115", type: "retailer" },
      { name: "Mayo Clinic Store", url: "https://mcpress.mayoclinic.org", type: "publisher" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=greger+nutrition+disease+prevention", type: "academic" },
    ],
  },
  {
    id: "2",
    title: "The China Study",
    author: "T. Colin Campbell, PhD",
    description: "The most comprehensive study of nutrition ever conducted, examining the link between diet and disease across rural China.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    researchReference: "Based on 20-year Oxford-Cornell-China study",
    category: "nutrition",
    isbn: "978-1941631560",
    year: 2016,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1941631568", type: "retailer" },
      { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/the-china-study-t-colin-campbell/1100171677", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=campbell+china+study+nutrition", type: "academic" },
    ],
  },
  {
    id: "3",
    title: "Nutrition and Physical Degeneration",
    author: "Weston A. Price, DDS",
    description: "Classic field study comparing the diets and health of traditional cultures versus modern processed diets.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    researchReference: "Foundational text in nutritional anthropology",
    category: "nutrition",
    isbn: "978-0916764203",
    year: 2009,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0916764206", type: "retailer" },
      { name: "Price-Pottenger Foundation", url: "https://price-pottenger.org", type: "publisher" },
    ],
  },

  {
    id: "25",
    title: "Take Control of Your Health and Escape the Sickness Industry",
    author: "Elaine Hollingsworth",
    description: "A comprehensive guide challenging mainstream health practices, covering nutrition, environmental toxins, and natural approaches to disease prevention across twelve editions.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    researchReference: "12th edition, independently published health reference",
    category: "nutrition",
    isbn: "978-1490359793",
    year: 2013,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0646402978", type: "retailer" },
      { name: "AbeBooks", url: "https://www.abebooks.com/9780646402970/Take-Control-Health-Escape-Sickness-0646402978/plp", type: "retailer" },
      { name: "Booktopia", url: "https://www.booktopia.com.au/take-control-of-your-health-and-escape-the-sickness-industry-elaine-hollingsworth/book/9781490359793.html", type: "retailer" },
    ],
  },

  // Autoimmune
  {
    id: "4",
    title: "The Immune System Recovery Plan",
    author: "Susan Blum, MD",
    description: "A doctor's 4-step program to treat autoimmune disease through functional medicine, addressing root causes like food, stress, and gut health.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    researchReference: "Based on clinical research",
    category: "autoimmune",
    isbn: "978-1451694970",
    year: 2013,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1451694970", type: "retailer" },
      { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/the-immune-system-recovery-plan-susan-blum/1113764513", type: "retailer" },
      { name: "NIH Bookshelf", url: "https://www.ncbi.nlm.nih.gov/books/?term=autoimmune+functional+medicine", type: "academic" },
    ],
  },
  {
    id: "5",
    title: "The Wahls Protocol",
    author: "Terry Wahls, MD",
    description: "A radical approach to treating chronic autoimmune conditions using paleo principles, functional medicine, and intensive nutrition.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    researchReference: "Clinical trial results published in peer-reviewed journals",
    category: "autoimmune",
    isbn: "978-1583335543",
    year: 2014,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1583335544", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=wahls+protocol+multiple+sclerosis", type: "academic" },
    ],
  },

  // Oncology
  {
    id: "6",
    title: "Radical Remission",
    author: "Kelly A. Turner, PhD",
    description: "Researching cancer survivors who defied the odds, identifying nine key factors shared by those who experienced radical remission.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    researchReference: "Analyzed 1,500+ cases of radical remission",
    category: "oncology",
    isbn: "978-0062268747",
    year: 2014,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0062268740", type: "retailer" },
      { name: "MSKCC Reference", url: "https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine", type: "academic" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=radical+remission+cancer", type: "academic" },
    ],
  },
  {
    id: "7",
    title: "Anticancer: A New Way of Life",
    author: "David Servan-Schreiber, MD, PhD",
    description: "A physician's journey combining Western medicine with natural approaches to cancer prevention and treatment.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    researchReference: "Published in peer-reviewed oncology journals",
    category: "oncology",
    isbn: "978-0670021642",
    year: 2009,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0670021644", type: "retailer" },
      { name: "Cochrane Reviews", url: "https://www.cochranelibrary.com/search?searchBy=6&searchText=integrative+oncology", type: "academic" },
    ],
  },
  {
    id: "20",
    title: "The Metabolic Approach to Cancer",
    author: "Dr. Nasha Winters & Jess Higgins Kelley",
    description: "Integrating deep nutrition, the ketogenic diet, and nontoxic bio-individualized therapies for cancer treatment and prevention.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    researchReference: "Based on metabolic oncology research",
    category: "oncology",
    isbn: "978-1603586863",
    year: 2017,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1603586865", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metabolic+approach+cancer+ketogenic", type: "academic" },
    ],
  },
  {
    id: "21",
    title: "Tripping over the Truth",
    author: "Travis Christofferson",
    description: "The metabolic theory of cancer and how it is reshaping our understanding of the disease, challenging the somatic mutation theory.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    researchReference: "Reviews Warburg effect and mitochondrial research",
    category: "oncology",
    isbn: "978-1603587297",
    year: 2017,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1603587292", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=warburg+effect+cancer+metabolism", type: "academic" },
    ],
  },
  {
    id: "22",
    title: "The Truth in Small Doses",
    author: "Clifton Leaf",
    description: "Award-winning investigation into why we're losing the war on cancer and what we can do about it, examining systemic failures in research.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    researchReference: "Investigative journalism backed by NCI data",
    category: "oncology",
    isbn: "978-1476739991",
    year: 2014,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1476739994", type: "retailer" },
      { name: "NCI Reference", url: "https://www.cancer.gov/research", type: "academic" },
    ],
  },
  {
    id: "23",
    title: "Outside the Box Cancer Therapies",
    author: "Dr. Mark Stengler & Dr. Paul Anderson",
    description: "Naturopathic and integrative oncology approaches including IV therapies, supplements, and diet protocols used alongside conventional treatment.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    researchReference: "Based on clinical naturopathic oncology practice",
    category: "oncology",
    isbn: "978-1401955601",
    year: 2018,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1401955606", type: "retailer" },
      { name: "MSKCC Integrative Medicine", url: "https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine", type: "academic" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=integrative+oncology+naturopathic", type: "academic" },
    ],
  },

  {
    id: "24",
    title: "The Nicotine Protocol",
    author: "Dr. Bryan Ardis",
    description: "An exploration of nicotine's potential therapeutic applications beyond tobacco, examining its role in addressing brain fog, inflammation, and chronic illness through receptor-level mechanisms.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    researchReference: "References nicotinic acetylcholine receptor research",
    category: "functional-medicine",
    year: 2024,
    sources: [
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=nicotinic+acetylcholine+receptor+therapeutic", type: "academic" },
      { name: "ClinicalTrials.gov", url: "https://clinicaltrials.gov/search?term=nicotine+therapeutic", type: "academic" },
    ],
  },

  // Cognitive
  {
    id: "8",
    title: "The End of Alzheimer's",
    author: "Dale Bredesen, MD",
    description: "The first protocol to prevent and reverse cognitive decline, based on decades of research into the mechanisms of Alzheimer's disease.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    researchReference: "Published in peer-reviewed journals including Aging",
    category: "cognitive",
    isbn: "978-0735216204",
    year: 2017,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0735216207", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=bredesen+alzheimer+reversal+protocol", type: "academic" },
      { name: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/list-all/", type: "academic" },
    ],
  },
  {
    id: "9",
    title: "Grain Brain",
    author: "David Perlmutter, MD",
    description: "How carbohydrates and gluten affect brain health, linking diet to neurological disorders and cognitive decline.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    researchReference: "Based on neurological and nutritional research",
    category: "cognitive",
    isbn: "978-0316234801",
    year: 2013,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0316234800", type: "retailer" },
      { name: "Google Books", url: "https://books.google.com/books?id=gxHfAAAAQBAJ", type: "retailer" },
    ],
  },

  // Longevity
  {
    id: "10",
    title: "Lifespan: Why We Age—and Why We Don't Have To",
    author: "David Sinclair, PhD",
    description: "Harvard genetics professor reveals groundbreaking research on aging, NAD+ metabolism, and interventions that could extend human lifespan.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    researchReference: "Based on NAD+ and sirtuin research at Harvard",
    category: "longevity",
    isbn: "978-1501191978",
    year: 2019,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/1501191977", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=sinclair+NAD+aging+sirtuin", type: "academic" },
      { name: "ClinicalTrials.gov", url: "https://clinicaltrials.gov/search?term=NMN+aging", type: "academic" },
    ],
  },
  {
    id: "11",
    title: "Outlive: The Science and Art of Longevity",
    author: "Peter Attia, MD",
    description: "A comprehensive guide to extending lifespan and healthspan through exercise, nutrition, sleep, and emotional health.",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
    researchReference: "Integrates metabolic and cardiovascular research",
    category: "longevity",
    isbn: "978-0593236598",
    year: 2023,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0593236599", type: "retailer" },
      { name: "Mayo Clinic", url: "https://www.mayoclinic.org/healthy-lifestyle", type: "academic" },
    ],
  },

  // Ayurveda
  {
    id: "12",
    title: "The Complete Book of Ayurvedic Home Remedies",
    author: "Vasant Lad, BAMS, MASc",
    description: "Comprehensive guide to Ayurvedic principles and traditional remedies based on 3,000 years of Indian medical tradition.",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
    researchReference: "Traditional knowledge compilation",
    category: "ayurveda",
    isbn: "978-0609801284",
    year: 1999,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0609801287", type: "retailer" },
      { name: "WHO Monographs", url: "https://www.who.int/traditional-complementary-integrative-medicine", type: "academic" },
      { name: "EMA Herbal Monographs", url: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products", type: "academic" },
    ],
  },

  // Herbal Medicine
  {
    id: "13",
    title: "Medical Herbalism",
    author: "David Hoffmann, FNIMH, AHG",
    description: "The definitive reference for herbal practitioners covering the science and practice of herbal medicine with detailed monographs.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    researchReference: "Over 150 herbal monographs with clinical data",
    category: "herbal-medicine",
    isbn: "978-0892817498",
    year: 2003,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0892817496", type: "retailer" },
      { name: "EMA Herbal Monographs", url: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products", type: "academic" },
      { name: "WHO Monographs", url: "https://www.who.int/publications/i/item/9789241547024", type: "academic" },
    ],
  },
  {
    id: "14",
    title: "The Herbal Drugstore",
    author: "Linda B. White, MD & Steven Foster",
    description: "Practical guide to herbal remedies for common health conditions, combining traditional wisdom with modern research.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    researchReference: "References NIH and WHO databases",
    category: "herbal-medicine",
    isbn: "978-0451205100",
    year: 2003,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0451205103", type: "retailer" },
      { name: "Natural Medicines Database", url: "https://naturalmedicines.therapeuticresearch.com", type: "academic" },
    ],
  },

  // Functional Medicine
  {
    id: "15",
    title: "The Disease Delusion",
    author: "Jeffrey Bland, PhD",
    description: "The founder of functional medicine explains how chronic diseases can be conquered through personalized lifestyle medicine.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    researchReference: "Foundational functional medicine text",
    category: "functional-medicine",
    isbn: "978-0062290748",
    year: 2014,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0062290746", type: "retailer" },
      { name: "IFM Reference", url: "https://www.ifm.org", type: "publisher" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=functional+medicine+chronic+disease", type: "academic" },
    ],
  },

  // Gut Health
  {
    id: "16",
    title: "Fiber Fueled",
    author: "Will Bulsiewicz, MD",
    description: "Gastroenterologist explains how plant-based fiber transforms the gut microbiome and reverses chronic disease.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    researchReference: "Based on microbiome research and clinical practice",
    category: "gut-health",
    isbn: "978-0593084564",
    year: 2020,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/059308456X", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=gut+microbiome+fiber+diversity", type: "academic" },
    ],
  },
  {
    id: "17",
    title: "The Good Gut",
    author: "Justin & Erica Sonnenburg, PhD",
    description: "Stanford microbiologists reveal how the trillions of bacteria in our gut influence our health, mood, and well-being.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    researchReference: "Stanford microbiome lab research",
    category: "gut-health",
    isbn: "978-0143108085",
    year: 2015,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0143108085", type: "retailer" },
      { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/the-good-gut-justin-sonnenburg/1120767606", type: "retailer" },
    ],
  },

  // Mental Health
  {
    id: "18",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk, MD",
    description: "How trauma reshapes body and brain, and innovative treatments that offer new paths to recovery.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    researchReference: "30+ years of clinical research",
    category: "mental-health",
    isbn: "978-0143127741",
    year: 2014,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/0143127748", type: "retailer" },
      { name: "PubMed References", url: "https://pubmed.ncbi.nlm.nih.gov/?term=van+der+kolk+trauma+treatment", type: "academic" },
      { name: "Cochrane Library", url: "https://www.cochranelibrary.com/search?searchBy=6&searchText=trauma+therapy", type: "academic" },
    ],
  },
  {
    id: "19",
    title: "Lost Connections",
    author: "Johann Hari",
    description: "Investigative look at the real causes of depression and anxiety, and unexpected solutions beyond medication.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    researchReference: "Interviews with leading researchers worldwide",
    category: "mental-health",
    isbn: "978-1632868305",
    year: 2018,
    sources: [
      { name: "Amazon", url: "https://www.amazon.com/dp/163286830X", type: "retailer" },
      { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/lost-connections-johann-hari/1126602647", type: "retailer" },
    ],
  },
];

export function getBooksByCategory(categoryId: string): BookEntry[] {
  return allBooks.filter((b) => b.category === categoryId);
}

export function getCategoryLabel(categoryId: string): string {
  return bookCategories.find((c) => c.id === categoryId)?.label ?? categoryId;
}

export function getCategoryDescription(categoryId: string): string {
  return bookCategories.find((c) => c.id === categoryId)?.description ?? "";
}
