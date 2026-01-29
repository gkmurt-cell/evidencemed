export interface Compound {
  id: string;
  name: string;
  latinName: string;
  category: string;
  studies: number;
  image: string;
  description: string;
  traditionalUse: string;
  keyBenefits: string[];
  mechanisms: string[];
  dosage: string;
  safetyNotes: string[];
  interactions: string[];
  sources: string[];
  relatedCompounds: string[];
}

export const compoundsData: Compound[] = [
  {
    id: "lions-mane",
    name: "Lion's Mane",
    latinName: "Hericium erinaceus",
    category: "Functional Mushroom",
    studies: 340,
    image: "🍄",
    description: "Lion's Mane is a culinary and medicinal mushroom with a long history of use in traditional Chinese medicine. Modern research focuses on its unique compounds that may support nerve growth and cognitive function.",
    traditionalUse: "Used for centuries in East Asian medicine to support digestive health, strengthen the spleen, and nourish the mind. Known as 'yamabushitake' in Japan and 'hou tou gu' in China.",
    keyBenefits: [
      "Cognitive function and memory support",
      "Nerve growth factor (NGF) stimulation",
      "Neuroprotective properties",
      "Mood and emotional wellbeing",
      "Digestive health support"
    ],
    mechanisms: [
      "Stimulates production of Nerve Growth Factor (NGF)",
      "Contains hericenones and erinacines - unique bioactive compounds",
      "Supports neuroplasticity and brain-derived neurotrophic factor (BDNF)",
      "Exhibits antioxidant and anti-inflammatory properties"
    ],
    dosage: "Research studies have reported doses ranging from 500mg to 3000mg daily of fruiting body extract, standardized to contain beta-glucans and/or hericenones. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated in clinical studies",
      "Rare reports of GI discomfort or skin sensitivity",
      "Those with mushroom allergies should avoid",
      "Limited data on long-term use (>16 weeks)"
    ],
    interactions: [
      "May have additive effects with anticoagulant medications",
      "Theoretical interaction with antidiabetic drugs (monitor blood sugar)",
      "Consult healthcare provider before combining with immunomodulatory medications"
    ],
    sources: ["Fruiting body (mushroom)", "Mycelium on grain", "Dual extract (water + alcohol)"],
    relatedCompounds: ["Reishi", "Cordyceps", "Chaga", "Turkey Tail"]
  },
  {
    id: "turkey-tail",
    name: "Turkey Tail",
    latinName: "Trametes versicolor",
    category: "Functional Mushroom",
    studies: 280,
    image: "🍄",
    description: "Turkey Tail is one of the most researched medicinal mushrooms, particularly for its polysaccharide compounds PSK and PSP. It has been used as an adjunct therapy in several countries.",
    traditionalUse: "Known as 'Yun Zhi' in Chinese medicine and 'Kawaratake' in Japan, used traditionally to support immune function, clear dampness, and strengthen the body.",
    keyBenefits: [
      "Immune system modulation",
      "Gut microbiome support",
      "Antioxidant properties",
      "Prebiotic effects",
      "General wellness support"
    ],
    mechanisms: [
      "Contains polysaccharide-K (PSK/Krestin)",
      "Polysaccharopeptide (PSP) immunomodulating effects",
      "Beta-glucans activate immune cells",
      "Supports beneficial gut bacteria growth"
    ],
    dosage: "Published research has reported doses of 1-3g daily of extract. PSK studies have documented 3g daily in divided doses. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally considered safe with low toxicity",
      "Rare GI symptoms reported",
      "Long history of use in traditional medicine",
      "Those with autoimmune conditions should consult healthcare provider"
    ],
    interactions: [
      "May enhance effects of immunotherapy (theoretical)",
      "Caution with immunosuppressant medications",
      "Monitor if using with chemotherapy agents"
    ],
    sources: ["Fruiting body", "Mycelium", "Hot water extract"],
    relatedCompounds: ["Lion's Mane", "Reishi", "Maitake", "Shiitake"]
  },
  {
    id: "curcumin",
    name: "Curcumin",
    latinName: "Curcuma longa",
    category: "Herbal Compound",
    studies: 890,
    image: "🌿",
    description: "Curcumin is the primary bioactive compound in turmeric, responsible for its characteristic yellow color. It is one of the most extensively studied natural compounds for its anti-inflammatory and antioxidant properties.",
    traditionalUse: "Turmeric has been used for over 4,000 years in Ayurvedic and traditional Chinese medicine for digestive support, wound healing, and as a general tonic.",
    keyBenefits: [
      "Anti-inflammatory effects",
      "Powerful antioxidant activity",
      "Joint health support",
      "Digestive wellness",
      "Cardiovascular health markers"
    ],
    mechanisms: [
      "Inhibits NF-κB inflammatory pathway",
      "Modulates multiple inflammatory cytokines (COX-2, LOX, TNF-α)",
      "Potent free radical scavenger",
      "Supports healthy inflammatory response"
    ],
    dosage: "Clinical studies have reported curcumin doses ranging from 500mg-2000mg daily. Enhanced absorption formulations (with piperine, phospholipids, or nanoparticles) have been studied at lower doses. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Research indicated tolerability at studied doses",
      "May cause GI discomfort in some individuals",
      "Poor bioavailability without enhancement noted in literature",
      "Research protocols typically avoided high doses before surgery (bleeding risk)"
    ],
    interactions: [
      "May enhance effects of blood thinners (warfarin, aspirin)",
      "Piperine increases bioavailability but affects drug metabolism",
      "May lower blood sugar - monitor with diabetes medications",
      "Iron absorption may be affected with high doses"
    ],
    sources: ["Turmeric root", "Standardized extract (95% curcuminoids)", "Enhanced absorption formulations"],
    relatedCompounds: ["Ginger", "Boswellia", "Quercetin", "Resveratrol"]
  },
  {
    id: "berberine",
    name: "Berberine",
    latinName: "Berberis vulgaris",
    category: "Alkaloid",
    studies: 420,
    image: "🌱",
    description: "Berberine is an alkaloid found in several plants including goldenseal, barberry, and Oregon grape. It has gained significant research attention for its effects on metabolic health markers.",
    traditionalUse: "Used in traditional Chinese and Ayurvedic medicine for thousands of years to address digestive issues, infections, and as a bitter tonic for liver and gallbladder support.",
    keyBenefits: [
      "Blood sugar regulation",
      "Lipid metabolism support",
      "Gut microbiome modulation",
      "Cardiovascular health markers",
      "Metabolic wellness"
    ],
    mechanisms: [
      "Activates AMPK (cellular energy sensor)",
      "Improves insulin sensitivity markers",
      "Modulates gut microbiota composition",
      "Inhibits intestinal glucose absorption"
    ],
    dosage: "Published research has documented doses of 500mg 2-3 times daily with meals (1000-1500mg total), noting improved absorption when divided throughout the day. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "GI side effects common initially (cramping, diarrhea)",
      "May cause constipation in some individuals",
      "Not recommended during pregnancy or breastfeeding",
      "Liver function monitoring recommended with long-term use"
    ],
    interactions: [
      "Strong interaction with cytochrome P450 enzymes",
      "May enhance effects of diabetes medications (hypoglycemia risk)",
      "Interacts with antibiotics - avoid concurrent use",
      "May affect levels of many medications - consult pharmacist"
    ],
    sources: ["Goldenseal root", "Barberry bark", "Oregon grape root", "Chinese goldthread"],
    relatedCompounds: ["Cinnamon", "Bitter Melon", "Gymnema", "Alpha-lipoic acid"]
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    latinName: "Withania somnifera",
    category: "Adaptogen",
    studies: 510,
    image: "🌿",
    description: "Ashwagandha is a premier adaptogenic herb in Ayurvedic medicine, known as 'Indian Ginseng.' Its name means 'smell of horse,' referring to both its scent and the strength it is believed to impart.",
    traditionalUse: "Revered in Ayurveda for over 3,000 years as a 'Rasayana' (rejuvenating tonic) to promote longevity, vitality, and resistance to stress and disease.",
    keyBenefits: [
      "Stress and cortisol regulation",
      "Anxiety reduction support",
      "Sleep quality improvement",
      "Physical performance enhancement",
      "Thyroid function support"
    ],
    mechanisms: [
      "Modulates HPA axis (stress response system)",
      "Contains withanolides - active steroidal compounds",
      "GABAergic activity for calming effects",
      "Antioxidant and anti-inflammatory properties"
    ],
    dosage: "Clinical trials have reported doses of 300-600mg daily of root extract standardized to 5-10% withanolides, using forms such as KSM-66 and Sensoril. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated in clinical trials",
      "May cause mild drowsiness",
      "Not recommended during pregnancy",
      "Rare reports of liver issues with high doses"
    ],
    interactions: [
      "May enhance effects of thyroid medications",
      "Additive sedation with CNS depressants",
      "May affect blood sugar levels",
      "Theoretical immunomodulatory interactions"
    ],
    sources: ["Root extract", "Whole root powder", "Leaf extract (less common)"],
    relatedCompounds: ["Rhodiola", "Holy Basil", "Eleuthero", "Ginseng"]
  },
  {
    id: "green-papaya-leaf",
    name: "Green Papaya Leaf",
    latinName: "Carica papaya",
    category: "Herbal",
    studies: 180,
    image: "🍃",
    description: "Papaya leaf has gained research interest for its unique enzyme content and traditional uses in tropical medicine, particularly in regions where dengue fever is endemic.",
    traditionalUse: "Used in traditional medicine across tropical regions for digestive support, fever reduction, and as a general health tonic. Particularly prominent in Southeast Asian folk medicine.",
    keyBenefits: [
      "Platelet support (research focus)",
      "Digestive enzyme activity",
      "Antioxidant properties",
      "Immune system support",
      "Traditional fever applications"
    ],
    mechanisms: [
      "Contains papain and other proteolytic enzymes",
      "Rich in flavonoids and phenolic compounds",
      "Research on platelet membrane stabilization",
      "Antioxidant compounds protect cellular integrity"
    ],
    dosage: "Published research has documented a wide range of doses from 25-1100mg of leaf extract. Traditional use has involved fresh leaf juice. No standardized protocol has been established. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Limited clinical safety data",
      "May cause GI upset",
      "Avoid during pregnancy (papain may be contraindicated)",
      "Quality and contamination concerns with sourcing"
    ],
    interactions: [
      "Theoretical interaction with blood thinners",
      "May affect blood sugar - monitor with diabetes medications",
      "Papain may interact with certain antibiotics"
    ],
    sources: ["Fresh leaf juice", "Dried leaf powder", "Leaf extract capsules"],
    relatedCompounds: ["Bromelain", "Papain", "Neem", "Moringa"]
  },
  {
    id: "omega-3",
    name: "Omega-3 Fatty Acids",
    latinName: "EPA & DHA",
    category: "Essential Fatty Acid",
    studies: 2500,
    image: "🐟",
    description: "Omega-3 fatty acids, particularly EPA and DHA, are essential polyunsaturated fats crucial for brain function, heart health, and inflammation regulation. They cannot be synthesized by the body and must be obtained from diet.",
    traditionalUse: "Fish and seafood have been dietary staples in coastal cultures for millennia. Cod liver oil was traditionally used in Nordic countries for vitamin D and general health.",
    keyBenefits: [
      "Cardiovascular health support",
      "Brain and cognitive function",
      "Anti-inflammatory properties",
      "Eye health (DHA)",
      "Mood and emotional wellbeing"
    ],
    mechanisms: [
      "Precursors to anti-inflammatory eicosanoids",
      "DHA is structural component of brain and retina",
      "Modulates cell membrane fluidity",
      "Reduces triglyceride synthesis in liver"
    ],
    dosage: "Research literature has documented 250-500mg combined EPA/DHA daily in general population studies, with clinical trials reporting 1-4g daily for specific research outcomes. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally very safe at recommended doses",
      "May cause fishy burps or GI upset",
      "High doses (>3g) may increase bleeding risk",
      "Quality important - check for oxidation and contaminants"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "Additive effects with blood pressure medications",
      "May affect blood sugar control"
    ],
    sources: ["Fatty fish (salmon, mackerel, sardines)", "Fish oil", "Krill oil", "Algae oil (vegan)"],
    relatedCompounds: ["Vitamin D", "Vitamin E", "Astaxanthin", "CoQ10"]
  },
  {
    id: "magnesium",
    name: "Magnesium",
    latinName: "Mg",
    category: "Essential Mineral",
    studies: 1800,
    image: "💎",
    description: "Magnesium is an essential mineral involved in over 300 enzymatic reactions in the body. It plays crucial roles in energy production, muscle function, nervous system regulation, and bone health.",
    traditionalUse: "Epsom salt (magnesium sulfate) baths have been used for centuries for muscle relaxation. Mineral-rich waters from natural springs were valued for their magnesium content.",
    keyBenefits: [
      "Sleep quality improvement",
      "Muscle relaxation and recovery",
      "Stress and anxiety support",
      "Blood sugar regulation",
      "Bone health maintenance"
    ],
    mechanisms: [
      "Cofactor for ATP production",
      "Regulates NMDA receptor activity",
      "Modulates calcium channel function",
      "Supports healthy inflammatory response"
    ],
    dosage: "Government RDA values are 310-420mg daily (varying by demographic). Clinical studies have documented 200-400mg of elemental magnesium with varying absorption by form. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "High doses cause GI effects (diarrhea)",
      "Magnesium oxide poorly absorbed",
      "Caution with kidney disease",
      "Forms like glycinate better tolerated"
    ],
    interactions: [
      "May reduce absorption of certain antibiotics",
      "May enhance effects of muscle relaxants",
      "Can affect blood pressure medications",
      "Separate from bisphosphonates by 2 hours"
    ],
    sources: ["Magnesium glycinate", "Magnesium citrate", "Magnesium threonate", "Magnesium malate"],
    relatedCompounds: ["Zinc", "Vitamin D", "Vitamin B6", "Calcium"]
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    latinName: "Cholecalciferol (D3)",
    category: "Fat-Soluble Vitamin",
    studies: 3200,
    image: "☀️",
    description: "Vitamin D is a fat-soluble vitamin that functions as a hormone in the body. It is unique in that it can be synthesized in the skin through sunlight exposure, yet deficiency remains widespread globally.",
    traditionalUse: "Cod liver oil was traditionally used in Northern Europe to prevent rickets. Sunlight exposure has been intuitively valued for health across cultures.",
    keyBenefits: [
      "Bone health and calcium absorption",
      "Immune system regulation",
      "Mood and seasonal wellness",
      "Muscle function support",
      "Metabolic health"
    ],
    mechanisms: [
      "Regulates calcium and phosphorus homeostasis",
      "Activates vitamin D receptors throughout body",
      "Modulates innate and adaptive immunity",
      "Influences gene expression (over 1000 genes)"
    ],
    dosage: "Research literature has documented 1000-2000 IU daily in maintenance studies, with deficiency correction studies reporting higher amounts under clinical supervision. Blood level testing is commonly recommended in research protocols. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Toxicity concerns noted in literature with very high long-term supplementation",
      "Research documented symptoms of excess including hypercalcemia, kidney stones",
      "Blood level testing recommended in research protocols",
      "D3 (cholecalciferol) form commonly used in research over D2"
    ],
    interactions: [
      "Some medications reduce vitamin D levels (steroids, anticonvulsants)",
      "May increase calcium absorption - caution with calcium supplements",
      "Fat absorption issues reduce vitamin D uptake"
    ],
    sources: ["Sunlight exposure", "Fatty fish", "Fortified foods", "D3 supplements (often from lanolin)"],
    relatedCompounds: ["Vitamin K2", "Calcium", "Magnesium", "Omega-3"]
  },
  {
    id: "coq10",
    name: "Coenzyme Q10",
    latinName: "Ubiquinone/Ubiquinol",
    category: "Mitochondrial Support",
    studies: 1200,
    image: "⚡",
    description: "CoQ10 is a vitamin-like compound essential for cellular energy production in the mitochondria. It also functions as a powerful antioxidant. Production declines with age and certain medications.",
    traditionalUse: "No traditional use - discovered in 1957. Has become one of the most popular supplements, particularly in Japan where much early research was conducted.",
    keyBenefits: [
      "Cellular energy production",
      "Heart health support",
      "Antioxidant protection",
      "Statin side effect mitigation",
      "Exercise performance"
    ],
    mechanisms: [
      "Essential component of electron transport chain",
      "Required for ATP synthesis in mitochondria",
      "Regenerates other antioxidants (vitamin E)",
      "Protects cell membranes from oxidation"
    ],
    dosage: "Clinical studies have documented 100-200mg daily in wellness research, with cardiology studies reporting 100-300mg daily. Ubiquinol form absorption has been studied particularly in older populations. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Very safe with long track record",
      "Rare GI upset or insomnia",
      "Ubiquinol (reduced form) better for those over 40",
      "Take with food for better absorption"
    ],
    interactions: [
      "May reduce effectiveness of warfarin",
      "Statins deplete CoQ10 - supplementation often recommended",
      "May enhance blood pressure medication effects",
      "Beta-blockers may also deplete CoQ10"
    ],
    sources: ["Ubiquinone (oxidized form)", "Ubiquinol (reduced form)", "Organ meats", "Fatty fish"],
    relatedCompounds: ["PQQ", "NAD+", "Alpha-lipoic acid", "Acetyl-L-carnitine"]
  },
  {
    id: "resveratrol",
    name: "Resveratrol",
    latinName: "3,5,4'-trihydroxy-trans-stilbene",
    category: "Polyphenol",
    studies: 950,
    image: "🍇",
    description: "Resveratrol is a polyphenol found in grapes, red wine, berries, and peanuts. It gained fame through the 'French Paradox' - the observation of low heart disease rates in France despite high fat intake.",
    traditionalUse: "Red wine has been consumed for millennia and valued for various health properties. Japanese knotweed (a major resveratrol source) is used in traditional Chinese medicine.",
    keyBenefits: [
      "Cardiovascular protection",
      "Antioxidant activity",
      "Cellular aging support (sirtuin activation)",
      "Metabolic health",
      "Neuroprotective properties"
    ],
    mechanisms: [
      "Activates SIRT1 (longevity-associated enzyme)",
      "Mimics some effects of caloric restriction",
      "Modulates inflammatory pathways",
      "Supports mitochondrial biogenesis"
    ],
    dosage: "Research literature has documented doses of 150-500mg daily, noting trans-resveratrol as the studied form. Bioavailability considerations are frequently discussed in the literature. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated",
      "GI upset possible at higher doses",
      "Limited human safety data for long-term high doses",
      "Quality varies significantly between products"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "Affects cytochrome P450 enzymes (many drug interactions)",
      "May have estrogenic effects - caution with hormone-sensitive conditions"
    ],
    sources: ["Trans-resveratrol supplements", "Japanese knotweed extract", "Grape skin extract", "Red wine"],
    relatedCompounds: ["Pterostilbene", "Quercetin", "EGCG", "Curcumin"]
  },
  {
    id: "probiotics",
    name: "Probiotics",
    latinName: "Various strains",
    category: "Microbiome Support",
    studies: 2800,
    image: "🦠",
    description: "Probiotics are live microorganisms that confer health benefits when consumed in adequate amounts. Research has exploded on the gut-brain axis and the role of the microbiome in overall health.",
    traditionalUse: "Fermented foods have been consumed across cultures for thousands of years - yogurt, kefir, sauerkraut, kimchi, miso, and many others preserve food and provide beneficial bacteria.",
    keyBenefits: [
      "Gut health and digestion",
      "Immune system support",
      "Mental health and mood (gut-brain axis)",
      "Skin health",
      "Metabolic wellness"
    ],
    mechanisms: [
      "Compete with pathogenic bacteria",
      "Strengthen intestinal barrier function",
      "Produce short-chain fatty acids (SCFAs)",
      "Modulate immune responses",
      "Produce neurotransmitter precursors"
    ],
    dosage: "Research is highly strain-specific. Published studies have documented ranges of 1-10 billion CFU daily, with specific strains studied at specific doses for particular research outcomes. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally very safe for healthy individuals",
      "May cause initial GI symptoms (gas, bloating)",
      "Caution in severely immunocompromised",
      "Quality and viability vary between products"
    ],
    interactions: [
      "Antibiotics kill probiotic bacteria - separate by 2+ hours",
      "May enhance immune response (consider with immunosuppressants)",
      "Generally safe with most medications"
    ],
    sources: ["Lactobacillus strains", "Bifidobacterium strains", "Saccharomyces boulardii", "Fermented foods"],
    relatedCompounds: ["Prebiotics", "Postbiotics", "Digestive enzymes", "L-glutamine"]
  },
  {
    id: "cacao",
    name: "Cacao",
    latinName: "Theobroma cacao",
    category: "Functional Food",
    studies: 680,
    image: "🍫",
    description: "Raw cacao is the unprocessed form of chocolate, rich in flavanols, theobromine, and other bioactive compounds. It has been studied extensively for cardiovascular, cognitive, and mood-related benefits.",
    traditionalUse: "Revered by ancient Mesoamerican civilizations as 'food of the gods.' The Aztecs and Mayans used cacao in ceremonial drinks for energy, mood enhancement, and as a form of currency.",
    keyBenefits: [
      "Cardiovascular health support",
      "Cognitive function enhancement",
      "Mood and emotional wellbeing",
      "Antioxidant protection",
      "Blood flow improvement"
    ],
    mechanisms: [
      "Flavanols improve endothelial function and nitric oxide production",
      "Theobromine provides mild stimulant effects",
      "Phenylethylamine (PEA) affects mood neurotransmitters",
      "High ORAC value for antioxidant capacity"
    ],
    dosage: "Research has documented 200-900mg of cocoa flavanols daily in cardiovascular studies. Dark chocolate with 70%+ cacao content has been used in clinical research. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally very safe as a food",
      "Contains caffeine and theobromine - may cause stimulant effects",
      "May trigger migraines in susceptible individuals",
      "High oxalate content - caution with kidney stones"
    ],
    interactions: [
      "Caffeine content may interact with stimulant medications",
      "MAOIs may interact with tyramine in chocolate",
      "May enhance effects of blood pressure medications"
    ],
    sources: ["Raw cacao powder", "Cacao nibs", "Dark chocolate (70%+)", "Cocoa flavanol supplements"],
    relatedCompounds: ["Resveratrol", "EGCG", "Quercetin", "Coffee"]
  },
  {
    id: "nmn",
    name: "NMN",
    latinName: "Nicotinamide Mononucleotide",
    category: "Longevity Compound",
    studies: 280,
    image: "🧬",
    description: "NMN is a direct precursor to NAD+, a vital molecule involved in energy metabolism, DNA repair, and cellular aging. It has become one of the most popular longevity supplements following prominent research publications.",
    traditionalUse: "No traditional use - a modern discovery. Gained mainstream attention through research from Harvard scientist David Sinclair and studies on NAD+ decline with aging.",
    keyBenefits: [
      "NAD+ level restoration",
      "Cellular energy production",
      "DNA repair support",
      "Metabolic health markers",
      "Longevity research focus"
    ],
    mechanisms: [
      "Converts directly to NAD+ in cells",
      "Supports sirtuin enzyme activity",
      "Enhances mitochondrial function",
      "Supports cellular repair mechanisms"
    ],
    dosage: "Human clinical trials have documented doses of 250-1200mg daily. A 2022 study used 250mg daily for 12 weeks. Optimal dosing protocols are still under investigation. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated in human trials",
      "Limited long-term safety data",
      "May cause mild flushing or GI upset",
      "Quality varies significantly between products"
    ],
    interactions: [
      "Theoretical interaction with chemotherapy agents",
      "May affect blood sugar - monitor with diabetes medications",
      "No major drug interactions documented yet"
    ],
    sources: ["NMN powder", "Sublingual NMN", "Liposomal formulations"],
    relatedCompounds: ["NAD+", "NR (Nicotinamide Riboside)", "Resveratrol", "Pterostilbene"]
  },
  {
    id: "collagen",
    name: "Collagen Peptides",
    latinName: "Hydrolyzed Collagen",
    category: "Structural Protein",
    studies: 720,
    image: "✨",
    description: "Collagen is the most abundant protein in the body, providing structure to skin, bones, tendons, and connective tissue. Hydrolyzed collagen peptides have become one of the top trending supplements on social media for skin and joint health.",
    traditionalUse: "Bone broth and gelatin-rich foods have been consumed across cultures for joint and skin health. Traditional Chinese medicine valued collagen-rich foods for beauty and vitality.",
    keyBenefits: [
      "Skin elasticity and hydration",
      "Joint health and mobility",
      "Hair and nail strength",
      "Bone density support",
      "Gut lining integrity"
    ],
    mechanisms: [
      "Provides amino acid building blocks (glycine, proline, hydroxyproline)",
      "Stimulates fibroblast collagen production",
      "Supports cartilage structure",
      "May signal tissue repair pathways"
    ],
    dosage: "Clinical studies have documented 2.5-15g daily of hydrolyzed collagen peptides. Most skin studies used 2.5-5g daily for 8-12 weeks. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Very safe with long track record",
      "Rarely causes mild GI upset",
      "Marine collagen may trigger seafood allergies",
      "Bovine source concerns for some individuals"
    ],
    interactions: [
      "No significant drug interactions documented",
      "May support medication absorption due to gut effects"
    ],
    sources: ["Bovine collagen", "Marine collagen", "Chicken collagen (Type II)", "Bone broth"],
    relatedCompounds: ["Vitamin C", "Hyaluronic Acid", "Biotin", "Silica"]
  },
  {
    id: "sea-moss",
    name: "Sea Moss",
    latinName: "Chondrus crispus",
    category: "Marine Superfood",
    studies: 85,
    image: "🌊",
    description: "Sea moss (Irish moss) is a red algae that has gone viral on social media for its mineral content and gel-forming properties. It contains 92 of the 102 minerals the body needs according to popular claims.",
    traditionalUse: "Used for centuries in Ireland and the Caribbean as a food source and traditional remedy for respiratory issues, digestive health, and as a natural thickener.",
    keyBenefits: [
      "Mineral-rich nutrition",
      "Thyroid support (iodine content)",
      "Digestive health",
      "Skin health applications",
      "Immune support"
    ],
    mechanisms: [
      "Rich in iodine for thyroid function",
      "Contains carrageenan (prebiotic fiber)",
      "Provides trace minerals and vitamins",
      "Mucilaginous properties soothe digestive tract"
    ],
    dosage: "Traditional use suggests 1-2 tablespoons of gel daily. No standardized clinical dosing established. Iodine content varies widely by source. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "High iodine content - risk of thyroid dysfunction with excess",
      "Heavy metal contamination possible depending on source",
      "May cause GI upset in some individuals",
      "Quality and purity vary significantly"
    ],
    interactions: [
      "May interact with thyroid medications",
      "Blood thinning effects possible",
      "May affect blood pressure medications"
    ],
    sources: ["Dried sea moss", "Sea moss gel", "Capsules", "Powder"],
    relatedCompounds: ["Spirulina", "Chlorella", "Kelp", "Bladderwrack"]
  },
  {
    id: "shilajit",
    name: "Shilajit",
    latinName: "Asphaltum punjabianum",
    category: "Mineral Complex",
    studies: 145,
    image: "🏔️",
    description: "Shilajit is a sticky, tar-like substance found in Himalayan rocks, formed over centuries from decomposed plant matter. It has gained significant social media attention for energy, testosterone, and longevity claims.",
    traditionalUse: "Used for over 3,000 years in Ayurvedic medicine as a 'Rasayana' (rejuvenator). Known as 'conqueror of mountains and destroyer of weakness' in Sanskrit texts.",
    keyBenefits: [
      "Energy and vitality",
      "Testosterone support (in men)",
      "Cognitive function",
      "Antioxidant properties",
      "Mineral absorption enhancement"
    ],
    mechanisms: [
      "Rich in fulvic acid - enhances nutrient absorption",
      "Contains dibenzo-α-pyrones (DBPs)",
      "Supports mitochondrial function",
      "Provides over 80 trace minerals"
    ],
    dosage: "Clinical studies have documented 250-500mg daily of purified shilajit standardized to fulvic acid content. Quality varies significantly. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Must be purified - raw shilajit may contain contaminants",
      "May lower blood pressure",
      "Not recommended during pregnancy",
      "Quality and authenticity concerns common"
    ],
    interactions: [
      "May enhance effects of blood pressure medications",
      "Iron absorption may be increased",
      "May affect blood sugar levels"
    ],
    sources: ["Purified resin", "Powder", "Capsules"],
    relatedCompounds: ["Ashwagandha", "Tongkat Ali", "Maca", "Cordyceps"]
  },
  {
    id: "tongkat-ali",
    name: "Tongkat Ali",
    latinName: "Eurycoma longifolia",
    category: "Adaptogen",
    studies: 190,
    image: "🌴",
    description: "Tongkat Ali is a Southeast Asian herb that has become extremely popular in fitness and biohacking communities. Research focuses on its effects on testosterone, stress hormones, and physical performance.",
    traditionalUse: "Used in Malaysian and Indonesian traditional medicine for centuries as an aphrodisiac, energy tonic, and treatment for various ailments. Known as 'Malaysian Ginseng'.",
    keyBenefits: [
      "Testosterone optimization",
      "Stress and cortisol reduction",
      "Physical performance enhancement",
      "Libido support",
      "Body composition"
    ],
    mechanisms: [
      "Contains eurycomanone and quassinoids",
      "May reduce SHBG (sex hormone binding globulin)",
      "Adaptogenic effects on HPA axis",
      "Supports healthy cortisol levels"
    ],
    dosage: "Clinical studies have documented 200-400mg daily of standardized root extract. Hot water extraction traditional. Eurycomanone standardization varies. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated in studies",
      "May cause restlessness or insomnia",
      "Not recommended for hormone-sensitive conditions",
      "Avoid during pregnancy and breastfeeding"
    ],
    interactions: [
      "May interact with blood pressure medications",
      "Theoretical interaction with diabetes medications",
      "May enhance effects of testosterone therapy"
    ],
    sources: ["Root extract", "Standardized capsules", "Traditional decoction"],
    relatedCompounds: ["Ashwagandha", "Fadogia Agrestis", "Maca", "Tribulus"]
  },
  {
    id: "apigenin",
    name: "Apigenin",
    latinName: "4',5,7-trihydroxyflavone",
    category: "Flavonoid",
    studies: 320,
    image: "🌼",
    description: "Apigenin is a natural flavonoid found in chamomile, parsley, and celery. It has gained attention in the biohacking community for sleep support and its potential anti-anxiety effects without sedation.",
    traditionalUse: "Chamomile tea has been used for centuries as a calming beverage and sleep aid. The relaxing effects are largely attributed to apigenin content.",
    keyBenefits: [
      "Sleep quality improvement",
      "Anxiolytic effects",
      "Neuroprotection",
      "Anti-inflammatory properties",
      "NAD+ enzyme support"
    ],
    mechanisms: [
      "Binds to GABA-A receptors (benzodiazepine site)",
      "Inhibits CD38 enzyme (preserves NAD+)",
      "Crosses blood-brain barrier",
      "Modulates inflammatory pathways"
    ],
    dosage: "Research has documented 50-500mg daily. Sleep studies often use 50mg before bed. Higher doses studied for other applications. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated",
      "May cause sedation at higher doses",
      "Avoid before activities requiring alertness",
      "Limited long-term human safety data"
    ],
    interactions: [
      "May enhance sedative medications",
      "Affects cytochrome P450 enzymes",
      "May interact with blood thinners"
    ],
    sources: ["Chamomile extract", "Isolated apigenin", "Celery seed extract"],
    relatedCompounds: ["L-Theanine", "Magnesium", "GABA", "Passionflower"]
  },
  {
    id: "l-theanine",
    name: "L-Theanine",
    latinName: "γ-glutamylethylamide",
    category: "Amino Acid",
    studies: 410,
    image: "🍵",
    description: "L-Theanine is an amino acid found primarily in tea leaves. It promotes relaxation without drowsiness and is widely used for focus, anxiety reduction, and enhanced sleep quality. Often combined with caffeine for synergistic effects.",
    traditionalUse: "Green tea has been consumed in East Asia for thousands of years, valued for providing calm alertness. L-theanine is responsible for the 'zen' state associated with tea drinking.",
    keyBenefits: [
      "Calm focus and alertness",
      "Anxiety reduction",
      "Sleep quality improvement",
      "Cognitive performance",
      "Caffeine synergy (smooth energy)"
    ],
    mechanisms: [
      "Increases alpha brain wave activity",
      "Modulates GABA, dopamine, and serotonin",
      "Crosses blood-brain barrier easily",
      "Reduces cortisol response to stress"
    ],
    dosage: "Clinical studies have documented 100-400mg daily. Common dose is 200mg. Often combined with caffeine at 2:1 ratio (L-theanine:caffeine). These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Extremely safe - no known toxicity",
      "May cause mild headache in sensitive individuals",
      "Safe for long-term use based on available data",
      "Does not cause dependence"
    ],
    interactions: [
      "May enhance effects of blood pressure medications",
      "Additive effects with sedatives",
      "Generally safe with most medications"
    ],
    sources: ["Green tea", "Suntheanine®", "Isolated L-theanine capsules"],
    relatedCompounds: ["Caffeine", "GABA", "Apigenin", "Magnesium"]
  },
  {
    id: "maca",
    name: "Maca Root",
    latinName: "Lepidium meyenii",
    category: "Adaptogen",
    studies: 280,
    image: "🥔",
    description: "Maca is a Peruvian root vegetable grown at high altitudes in the Andes. It has become extremely popular on social media for energy, hormone balance, and libido enhancement claims.",
    traditionalUse: "Cultivated for over 2,000 years in Peru at elevations above 13,000 feet. Traditionally used as a food and medicine for energy, fertility, and endurance by Incan warriors.",
    keyBenefits: [
      "Energy and stamina",
      "Hormone balance",
      "Libido enhancement",
      "Mood and wellbeing",
      "Exercise performance"
    ],
    mechanisms: [
      "Contains macamides and macaenes (unique compounds)",
      "Does not contain hormones but may modulate them",
      "Adaptogenic effects on HPA axis",
      "Rich in glucosinolates and amino acids"
    ],
    dosage: "Clinical studies have documented 1.5-3g daily of maca powder. Gelatinized maca may be better tolerated. Different colors (red, black, yellow) studied for different effects. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Very safe as a food with long history",
      "May cause GI upset or insomnia in some",
      "Goitrogenic effects possible (thyroid concerns)",
      "Avoid with hormone-sensitive conditions without guidance"
    ],
    interactions: [
      "Theoretical interaction with hormone therapies",
      "May affect blood pressure",
      "No major drug interactions documented"
    ],
    sources: ["Raw maca powder", "Gelatinized maca", "Maca extract", "Black/Red/Yellow varieties"],
    relatedCompounds: ["Ashwagandha", "Tribulus", "Tongkat Ali", "Ginseng"]
  },
  {
    id: "reishi",
    name: "Reishi",
    latinName: "Ganoderma lucidum",
    category: "Functional Mushroom",
    studies: 480,
    image: "🍄",
    description: "Reishi is known as the 'Mushroom of Immortality' in traditional Chinese medicine. It's one of the most studied medicinal mushrooms, prized for immune modulation, stress adaptation, and sleep support.",
    traditionalUse: "Revered for over 2,000 years in China as 'Lingzhi' (spirit plant). Reserved for royalty in ancient times and depicted in classical art as a symbol of health and longevity.",
    keyBenefits: [
      "Immune system modulation",
      "Stress and anxiety reduction",
      "Sleep quality improvement",
      "Liver health support",
      "Longevity and vitality"
    ],
    mechanisms: [
      "Beta-glucans activate immune cells",
      "Triterpenes (ganoderic acids) modulate inflammation",
      "Adaptogenic effects on stress response",
      "Supports calm through GABA-like effects"
    ],
    dosage: "Clinical studies have documented 1.5-9g daily of dried mushroom or 980-3000mg of extract. Dual extraction (water + alcohol) captures both beta-glucans and triterpenes. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally safe with long history of use",
      "May cause dry mouth, dizziness, or GI upset",
      "Rare liver toxicity reports with powdered products",
      "Avoid before surgery (blood thinning effects)"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "May affect blood pressure medications",
      "Immunomodulating effects - caution with immunosuppressants"
    ],
    sources: ["Fruiting body extract", "Spore oil", "Dual extract", "Mycelium"],
    relatedCompounds: ["Lion's Mane", "Chaga", "Turkey Tail", "Cordyceps"]
  },
  {
    id: "cordyceps",
    name: "Cordyceps",
    latinName: "Cordyceps militaris",
    category: "Functional Mushroom",
    studies: 350,
    image: "🍄",
    description: "Cordyceps is a parasitic fungus known for its effects on energy and athletic performance. It gained fame after Chinese Olympic athletes credited it for their success. Now widely cultivated for supplementation.",
    traditionalUse: "Used in traditional Chinese and Tibetan medicine for centuries to treat fatigue, kidney disease, and low libido. Wild cordyceps (sinensis) grows on caterpillars at high altitudes in Tibet.",
    keyBenefits: [
      "Athletic performance",
      "Energy and stamina",
      "Respiratory function",
      "Libido and vitality",
      "Anti-aging properties"
    ],
    mechanisms: [
      "Contains cordycepin (adenosine analog)",
      "Increases cellular ATP production",
      "Improves oxygen utilization",
      "Supports healthy inflammatory response"
    ],
    dosage: "Clinical studies have documented 1-3g daily of cordyceps powder or 500-1000mg of extract. Cordyceps militaris now commonly used as cultivated alternative to wild sinensis. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated",
      "May cause mild GI upset or dry mouth",
      "Avoid in autoimmune conditions without guidance",
      "Wild-harvested very expensive and often adulterated"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "May affect blood sugar levels",
      "Immunomodulating effects - caution with immunosuppressants"
    ],
    sources: ["Cordyceps militaris (cultivated)", "CS-4 extract", "Fruiting body", "Wild Cordyceps sinensis (rare)"],
    relatedCompounds: ["Reishi", "Lion's Mane", "Chaga", "Rhodiola"]
  },
  {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    latinName: "Rhodiola rosea",
    category: "Adaptogen",
    studies: 340,
    image: "🌸",
    description: "Rhodiola is a powerful adaptogenic herb used traditionally in Russia and Scandinavia. It's known for enhancing mental performance, reducing fatigue, and helping the body adapt to stress.",
    traditionalUse: "Used for centuries in Russia, Scandinavia, and Tibet to increase physical endurance, work productivity, and resistance to high altitude sickness. Vikings allegedly used it for strength.",
    keyBenefits: [
      "Mental performance under stress",
      "Physical endurance",
      "Fatigue reduction",
      "Mood support",
      "Cognitive function"
    ],
    mechanisms: [
      "Contains rosavins and salidroside (active compounds)",
      "Modulates cortisol and stress response",
      "Influences serotonin and dopamine",
      "Supports mitochondrial ATP production"
    ],
    dosage: "Clinical studies have documented 200-600mg daily of extract standardized to 3% rosavins and 1% salidroside. Best taken early in the day. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated",
      "May cause jitteriness or insomnia if taken late",
      "Stimulating - avoid with anxiety disorders in some cases",
      "Cycling recommended (5 days on, 2 off)"
    ],
    interactions: [
      "May enhance effects of antidepressants",
      "May affect blood pressure medications",
      "Additive effects with stimulants"
    ],
    sources: ["Root extract", "SHR-5 extract", "Standardized capsules"],
    relatedCompounds: ["Ashwagandha", "Eleuthero", "Ginseng", "Cordyceps"]
  },
  {
    id: "quercetin",
    name: "Quercetin",
    latinName: "3,3',4',5,7-Pentahydroxyflavone",
    category: "Flavonoid",
    studies: 580,
    image: "🧅",
    description: "Quercetin is one of the most abundant dietary flavonoids, found in onions, apples, and berries. It gained significant attention during the pandemic for immune support and as a zinc ionophore.",
    traditionalUse: "Consumed through diet for millennia in fruits, vegetables, and herbs. Foods high in quercetin have been traditionally valued for their health-promoting properties.",
    keyBenefits: [
      "Immune system support",
      "Anti-inflammatory effects",
      "Antioxidant protection",
      "Allergy symptom relief",
      "Cardiovascular support"
    ],
    mechanisms: [
      "Potent antioxidant and free radical scavenger",
      "Zinc ionophore - helps zinc enter cells",
      "Inhibits inflammatory enzymes",
      "Stabilizes mast cells (anti-histamine effects)"
    ],
    dosage: "Clinical studies have documented 500-1000mg daily. Often combined with vitamin C or bromelain for enhanced absorption. Phytosome forms show improved bioavailability. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally safe at typical doses",
      "High doses may cause headache or GI upset",
      "May accumulate with chronic high-dose use",
      "Poor bioavailability without enhancement"
    ],
    interactions: [
      "May interact with antibiotics (quinolones)",
      "May enhance effects of blood thinners",
      "Affects cytochrome P450 enzymes"
    ],
    sources: ["Quercetin dihydrate", "Quercetin phytosome", "Onion extract", "Rutin (quercetin glycoside)"],
    relatedCompounds: ["Zinc", "Vitamin C", "Bromelain", "EGCG"]
  },
  {
    id: "elderberry",
    name: "Elderberry",
    latinName: "Sambucus nigra",
    category: "Herbal Immune Support",
    studies: 220,
    image: "🫐",
    description: "Elderberry is one of the most popular immune support supplements, especially during cold and flu season. It has a long history of traditional use and has gained mainstream popularity on social media.",
    traditionalUse: "Used in European folk medicine for centuries for colds, flu, and inflammation. Hippocrates referred to the elder tree as his 'medicine chest.' Traditional preparations include syrups, wines, and teas.",
    keyBenefits: [
      "Immune system support",
      "Upper respiratory health",
      "Antioxidant protection",
      "Anti-inflammatory effects",
      "Cold and flu symptom duration"
    ],
    mechanisms: [
      "Rich in anthocyanins and flavonoids",
      "May inhibit viral replication",
      "Modulates cytokine production",
      "Supports innate immune response"
    ],
    dosage: "Clinical studies have documented 300-600mg of standardized extract daily during acute illness, or 175mg daily for prevention. Syrup formulations common (15ml 4x daily). These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally safe when properly prepared",
      "Raw berries, bark, and leaves are toxic (contain cyanogenic glycosides)",
      "May cause GI upset",
      "Some concern about cytokine storm in severe illness (theoretical)"
    ],
    interactions: [
      "May interact with immunosuppressants",
      "Diuretic effects may interact with related medications",
      "May lower blood sugar - monitor with diabetes medications"
    ],
    sources: ["Standardized extract", "Elderberry syrup", "Lozenges", "Gummies"],
    relatedCompounds: ["Vitamin C", "Zinc", "Echinacea", "Astragalus"]
  },
  {
    id: "creatine",
    name: "Creatine",
    latinName: "Creatine Monohydrate",
    category: "Performance Compound",
    studies: 1100,
    image: "💪",
    description: "Creatine is one of the most researched and effective sports supplements. Beyond athletic performance, recent research explores cognitive benefits, making it popular in biohacking communities.",
    traditionalUse: "No traditional use - discovered in 1832 and popularized as a supplement in the 1990s. Now one of the most widely used and studied sports supplements globally.",
    keyBenefits: [
      "Strength and power output",
      "Muscle mass support",
      "Cognitive function",
      "High-intensity exercise performance",
      "Recovery enhancement"
    ],
    mechanisms: [
      "Increases phosphocreatine stores in muscles",
      "Enhances ATP regeneration during exercise",
      "Supports brain energy metabolism",
      "May have neuroprotective effects"
    ],
    dosage: "Research has documented 3-5g daily of creatine monohydrate as maintenance dose. Loading protocols (20g/day for 5-7 days) studied but not required. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Extremely well-studied and safe",
      "May cause water retention initially",
      "Stay well hydrated",
      "Kidney function monitoring recommended for pre-existing conditions"
    ],
    interactions: [
      "Caffeine may blunt ergogenic effects (debated)",
      "NSAIDs may increase kidney stress when combined",
      "Generally safe with most medications"
    ],
    sources: ["Creatine monohydrate", "Creatine HCL", "Buffered creatine", "Micronized creatine"],
    relatedCompounds: ["Beta-Alanine", "Citrulline", "HMB", "Taurine"]
  },
  {
    id: "spirulina",
    name: "Spirulina",
    latinName: "Arthrospira platensis",
    category: "Blue-Green Algae",
    studies: 480,
    image: "🌿",
    description: "Spirulina is a blue-green algae considered one of the most nutrient-dense foods on earth. It's popular in health and wellness circles for its protein content, antioxidants, and detoxification support.",
    traditionalUse: "Consumed by the Aztecs and other Mesoamerican cultures. Also harvested from Lake Chad in Africa for centuries. NASA has studied it as a potential food source for space missions.",
    keyBenefits: [
      "Complete protein source",
      "Heavy metal detoxification",
      "Antioxidant protection",
      "Immune system support",
      "Cholesterol and blood pressure"
    ],
    mechanisms: [
      "Contains phycocyanin (powerful antioxidant)",
      "Binds heavy metals for excretion",
      "Rich in chlorophyll and carotenoids",
      "Supports healthy inflammatory response"
    ],
    dosage: "Clinical studies have documented 1-8g daily. Common dose is 3-5g (approximately 1 teaspoon). Start low due to detox effects. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally safe but sourcing critical",
      "Contamination risk with heavy metals/microcystins",
      "May cause GI upset or headache initially",
      "Avoid with autoimmune conditions (immune stimulating)"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "May interact with immunosuppressants",
      "May affect blood sugar medications"
    ],
    sources: ["Tablets", "Powder", "Capsules", "Fresh-frozen"],
    relatedCompounds: ["Chlorella", "Sea Moss", "Barley Grass", "Wheat Grass"]
  },
  {
    id: "glycine",
    name: "Glycine",
    latinName: "Aminoacetic acid",
    category: "Amino Acid",
    studies: 520,
    image: "😴",
    description: "Glycine is the simplest amino acid with important roles in sleep, collagen synthesis, and neurotransmitter function. It has gained popularity for sleep improvement without next-day grogginess.",
    traditionalUse: "Consumed through protein-rich foods throughout human history. Bone broth is particularly high in glycine. The amino acid was first isolated from gelatin in 1820.",
    keyBenefits: [
      "Sleep quality improvement",
      "Collagen production support",
      "Liver detoxification",
      "Blood sugar regulation",
      "Cognitive function"
    ],
    mechanisms: [
      "Inhibitory neurotransmitter in CNS",
      "Lowers core body temperature (promotes sleep)",
      "Essential for glutathione synthesis",
      "Required for creatine and heme production"
    ],
    dosage: "Sleep studies have documented 3g taken before bed. Higher doses (10-15g) studied for metabolic effects. Can be consumed in divided doses. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Very safe - naturally occurring amino acid",
      "May cause mild GI upset at high doses",
      "Generally well-tolerated long-term",
      "No known toxicity"
    ],
    interactions: [
      "May enhance effects of antipsychotic medications",
      "Additive effects with other sleep aids",
      "Generally safe with most medications"
    ],
    sources: ["Glycine powder", "Capsules", "Bone broth", "Collagen supplements"],
    relatedCompounds: ["Magnesium", "L-Theanine", "Taurine", "GABA"]
  }
];

export const getCompoundById = (id: string): Compound | undefined => {
  return compoundsData.find((c) => c.id === id);
};

export const getCompoundByName = (name: string): Compound | undefined => {
  return compoundsData.find(
    (c) => c.name.toLowerCase() === name.toLowerCase() ||
           c.latinName.toLowerCase() === name.toLowerCase()
  );
};

export const getRelatedCompounds = (compound: Compound): Compound[] => {
  return compound.relatedCompounds
    .map((name) => compoundsData.find((c) => 
      c.name.toLowerCase() === name.toLowerCase()
    ))
    .filter(Boolean) as Compound[];
};
