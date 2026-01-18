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
    dosage: "Typical research doses range from 500mg to 3000mg daily of fruiting body extract. Standardized to contain beta-glucans and/or hericenones.",
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
    dosage: "Research doses typically range from 1-3g daily of extract. PSK studies often used 3g daily in divided doses.",
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
    dosage: "Standard curcumin doses range from 500mg-2000mg daily. Enhanced absorption formulations (with piperine, phospholipids, or nanoparticles) may be effective at lower doses.",
    safetyNotes: [
      "Well-tolerated up to 8g/day in short-term studies",
      "May cause GI discomfort in some individuals",
      "Poor bioavailability without enhancement",
      "Avoid high doses before surgery (bleeding risk)"
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
    dosage: "Typical research doses: 500mg 2-3 times daily with meals (1000-1500mg total). Best absorbed when divided throughout the day.",
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
    dosage: "Research doses typically range from 300-600mg daily of root extract standardized to 5-10% withanolides. KSM-66 and Sensoril are common standardized forms.",
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
    dosage: "Research varies widely: 25-1100mg of leaf extract. Traditional use often involves fresh leaf juice. No standardized dosing established.",
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
    dosage: "General health: 250-500mg combined EPA/DHA daily. Therapeutic doses: 1-4g daily for specific conditions. Higher EPA ratios often used for mood support.",
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
    dosage: "RDA: 310-420mg daily (varies by age/sex). Therapeutic doses: 200-400mg of elemental magnesium. Different forms have different absorption and effects.",
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
    dosage: "Maintenance: 1000-2000 IU daily for most adults. Correction of deficiency may require higher doses (5000+ IU) under medical supervision. Test levels periodically.",
    safetyNotes: [
      "Toxicity possible with very high doses (>10,000 IU/day long-term)",
      "Symptoms of excess: hypercalcemia, kidney stones",
      "Test blood levels to guide dosing",
      "D3 (cholecalciferol) preferred over D2"
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
    dosage: "General wellness: 100-200mg daily. Heart health/statin users: 100-300mg daily. Ubiquinol form may be better absorbed, especially in older adults.",
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
    dosage: "Research doses vary widely: 150-500mg daily for general wellness. Trans-resveratrol is the active form. Higher doses may be needed due to poor bioavailability.",
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
    dosage: "Highly strain-specific. General range: 1-10 billion CFU daily for maintenance. Specific strains studied at specific doses for specific conditions.",
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
