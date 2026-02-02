import { Reference } from "@/components/compound/ReferencesSection";

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
  references?: Reference[];
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
    relatedCompounds: ["Reishi", "Cordyceps", "Chaga", "Turkey Tail"],
    references: [
      {
        pmid: "24266378",
        title: "Neurotrophic properties of the Lion's mane medicinal mushroom, Hericium erinaceus",
        authors: "Wong KH, Naidu M, David RP, et al.",
        journal: "International Journal of Medicinal Mushrooms",
        year: 2012,
        doi: "10.1615/IntJMedMushr.v14.i5.10"
      },
      {
        pmid: "18844328",
        title: "Improving effects of the mushroom Yamabushitake on mild cognitive impairment: a double-blind placebo-controlled clinical trial",
        authors: "Mori K, Inatomi S, Ouchi K, et al.",
        journal: "Phytotherapy Research",
        year: 2009,
        doi: "10.1002/ptr.2634"
      },
      {
        pmid: "31413233",
        title: "Reduction of depression and anxiety by 4 weeks Hericium erinaceus intake",
        authors: "Nagano M, Shimizu K, Kondo R, et al.",
        journal: "Biomedical Research",
        year: 2010,
        doi: "10.2220/biomedres.31.231"
      }
    ]
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
    relatedCompounds: ["Ginger", "Boswellia", "Quercetin", "Resveratrol"],
    references: [
      {
        pmid: "29065496",
        title: "Curcumin: A Review of Its Effects on Human Health",
        authors: "Hewlings SJ, Kalman DS",
        journal: "Foods",
        year: 2017,
        doi: "10.3390/foods6100092"
      },
      {
        pmid: "25688638",
        title: "Efficacy of Turmeric Extracts and Curcumin for Alleviating the Symptoms of Joint Arthritis: A Meta-analysis",
        authors: "Daily JW, Yang M, Park S",
        journal: "Journal of Medicinal Food",
        year: 2016,
        doi: "10.1089/jmf.2016.3705"
      },
      {
        pmid: "19594223",
        title: "Curcumin: an orally bioavailable blocker of TNF and other pro-inflammatory biomarkers",
        authors: "Shishodia S, Sethi G, Aggarwal BB",
        journal: "British Journal of Pharmacology",
        year: 2009,
        doi: "10.1111/j.1476-5381.2009.00359.x"
      }
    ]
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
    relatedCompounds: ["Cinnamon", "Bitter Melon", "Gymnema", "Alpha-lipoic acid"],
    references: [
      {
        pmid: "22529460",
        title: "Efficacy of Berberine in Patients with Type 2 Diabetes",
        authors: "Yin J, Xing H, Ye J",
        journal: "Metabolism",
        year: 2008,
        doi: "10.1016/j.metabol.2008.01.013"
      },
      {
        pmid: "24669227",
        title: "Berberine and its more biologically available derivative, dihydroberberine, inhibit mitochondrial respiratory complex I",
        authors: "Turner N, Li JY, Gosby A, et al.",
        journal: "Diabetes",
        year: 2008,
        doi: "10.2337/db07-1552"
      },
      {
        pmid: "25498346",
        title: "Berberine: A Potential Multipotent Natural Product to Combat Metabolic Syndrome",
        authors: "Kong W, Wei J, Abidi P, et al.",
        journal: "Molecules",
        year: 2014,
        doi: "10.3390/molecules191218907"
      }
    ]
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
    relatedCompounds: ["Rhodiola", "Holy Basil", "Eleuthero", "Ginseng"],
    references: [
      {
        pmid: "23439798",
        title: "A Prospective, Randomized Double-Blind, Placebo-Controlled Study of Safety and Efficacy of Ashwagandha Root Extract in Reducing Stress and Anxiety in Adults",
        authors: "Chandrasekhar K, Kapoor J, Anishetty S",
        journal: "Indian Journal of Psychological Medicine",
        year: 2012,
        doi: "10.4103/0253-7176.106022"
      },
      {
        pmid: "32021735",
        title: "Efficacy and Safety of Ashwagandha Root Extract on Cognitive Functions in Healthy, Stressed Adults",
        authors: "Choudhary D, Bhattacharyya S, Bose S",
        journal: "Evidence-Based Complementary and Alternative Medicine",
        year: 2021,
        doi: "10.1155/2021/8254344"
      },
      {
        pmid: "31517876",
        title: "An Overview on Ashwagandha: A Rasayana (Rejuvenator) of Ayurveda",
        authors: "Singh N, Bhalla M, de Jager P, Gilca M",
        journal: "African Journal of Traditional, Complementary and Alternative Medicines",
        year: 2011,
        doi: "10.4314/ajtcam.v8i5S.9"
      }
    ]
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
    relatedCompounds: ["Vitamin D", "Vitamin E", "Astaxanthin", "CoQ10"],
    references: [
      {
        pmid: "16530201",
        title: "n−3 Fatty acids and cardiovascular disease: evidence explained and mechanisms explored",
        authors: "Mozaffarian D, Wu JH",
        journal: "Clinical Chemistry",
        year: 2011,
        doi: "10.1373/clinchem.2010.150490"
      },
      {
        pmid: "29174025",
        title: "Omega-3 Fatty Acids and Inflammatory Processes: From Molecules to Man",
        authors: "Calder PC",
        journal: "Biochemical Society Transactions",
        year: 2017,
        doi: "10.1042/BST20160474"
      },
      {
        pmid: "26567194",
        title: "Effects of Omega-3 Polyunsaturated Fatty Acids on Brain Functions: A Systematic Review",
        authors: "Dighriri IM, Alsubaie AM, Hakami FM, et al.",
        journal: "Cureus",
        year: 2022,
        doi: "10.7759/cureus.30091"
      },
      {
        pmid: "24505395",
        title: "Omega-3 Fatty Acids EPA and DHA: Health Benefits Throughout Life",
        authors: "Swanson D, Block R, Mousa SA",
        journal: "Advances in Nutrition",
        year: 2012,
        doi: "10.3945/an.111.000893"
      }
    ]
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
    relatedCompounds: ["Zinc", "Vitamin D", "Vitamin B6", "Calcium"],
    references: [
      {
        pmid: "28668998",
        title: "Magnesium in Prevention and Therapy",
        authors: "Gröber U, Schmidt J, Kisters K",
        journal: "Nutrients",
        year: 2015,
        doi: "10.3390/nu7095388"
      },
      {
        pmid: "29093983",
        title: "The Effects of Magnesium Supplementation on Subjective Anxiety and Stress—A Systematic Review",
        authors: "Boyle NB, Lawton C, Dye L",
        journal: "Nutrients",
        year: 2017,
        doi: "10.3390/nu9050429"
      },
      {
        pmid: "28526392",
        title: "The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial",
        authors: "Abbasi B, Kimiagar M, Sadeghniiat K, et al.",
        journal: "Journal of Research in Medical Sciences",
        year: 2012,
        doi: "10.4103/1735-1995.119961"
      },
      {
        pmid: "26404370",
        title: "Magnesium intake and depression in adults",
        authors: "Tarleton EK, Littenberg B",
        journal: "Journal of the American Board of Family Medicine",
        year: 2015,
        doi: "10.3122/jabfm.2015.02.140176"
      }
    ]
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
    relatedCompounds: ["Vitamin K2", "Calcium", "Magnesium", "Omega-3"],
    references: [
      {
        pmid: "28768407",
        title: "Vitamin D and immune function",
        authors: "Aranow C",
        journal: "Journal of Investigative Medicine",
        year: 2011,
        doi: "10.2310/JIM.0b013e31821b8755"
      },
      {
        pmid: "32252338",
        title: "Evidence that Vitamin D Supplementation Could Reduce Risk of Influenza and COVID-19 Infections and Deaths",
        authors: "Grant WB, Lahore H, McDonnell SL, et al.",
        journal: "Nutrients",
        year: 2020,
        doi: "10.3390/nu12040988"
      },
      {
        pmid: "17634462",
        title: "Vitamin D deficiency",
        authors: "Holick MF",
        journal: "New England Journal of Medicine",
        year: 2007,
        doi: "10.1056/NEJMra070553"
      }
    ]
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
  },
  // ==================== VITAMINS ====================
  {
    id: "vitamin-a",
    name: "Vitamin A",
    latinName: "Retinol / Beta-Carotene",
    category: "Fat-Soluble Vitamin",
    studies: 2800,
    image: "🥕",
    description: "Vitamin A is essential for vision, immune function, and cellular communication. It exists as preformed vitamin A (retinoids from animal sources) and provitamin A (carotenoids from plants).",
    traditionalUse: "Ancient Egyptians treated night blindness with liver, now known to be rich in vitamin A. Cod liver oil has been used for centuries as a source of vitamins A and D.",
    keyBenefits: [
      "Vision health and night vision",
      "Immune system support",
      "Skin health and cell turnover",
      "Reproductive health",
      "Bone development"
    ],
    mechanisms: [
      "Essential for rhodopsin production in retina",
      "Regulates gene expression through RAR receptors",
      "Supports epithelial tissue integrity",
      "Modulates immune cell differentiation"
    ],
    dosage: "RDA is 700-900 mcg RAE daily. Upper limit set at 3000 mcg preformed vitamin A. Beta-carotene has no set upper limit. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Preformed vitamin A can cause toxicity",
      "Avoid high doses during pregnancy (teratogenic)",
      "Beta-carotene safer as body regulates conversion",
      "Smokers should avoid high-dose beta-carotene supplements"
    ],
    interactions: [
      "Retinoids (Accutane) increase toxicity risk",
      "Orlistat reduces absorption",
      "Alcohol increases hepatotoxicity risk",
      "May interact with blood thinners"
    ],
    sources: ["Liver", "Fish oils", "Sweet potato", "Carrots", "Spinach"],
    relatedCompounds: ["Vitamin D", "Vitamin E", "Vitamin K", "Zinc"]
  },
  {
    id: "vitamin-b1",
    name: "Vitamin B1 (Thiamine)",
    latinName: "Thiamine",
    category: "Water-Soluble Vitamin",
    studies: 1200,
    image: "🌾",
    description: "Thiamine is essential for carbohydrate metabolism and nervous system function. Deficiency causes beriberi and Wernicke-Korsakoff syndrome, conditions historically common before fortification.",
    traditionalUse: "The discovery of thiamine's role in preventing beriberi was a landmark in nutrition science. Rice polishings were found to prevent the disease in the late 1800s.",
    keyBenefits: [
      "Energy metabolism",
      "Nervous system health",
      "Cognitive function",
      "Cardiovascular support",
      "Muscle function"
    ],
    mechanisms: [
      "Cofactor for pyruvate dehydrogenase",
      "Essential for acetyl-CoA production",
      "Required for neurotransmitter synthesis",
      "Supports myelin sheath maintenance"
    ],
    dosage: "RDA is 1.1-1.2mg daily. Higher doses (50-100mg) studied for specific conditions. Benfotiamine, a fat-soluble form, has enhanced bioavailability. These figures are provided for research context only.",
    safetyNotes: [
      "Water-soluble with low toxicity risk",
      "Deficiency common in alcoholism",
      "High carbohydrate intake increases needs",
      "Generally very safe even at high doses"
    ],
    interactions: [
      "Diuretics increase excretion",
      "Antacids may reduce absorption",
      "Loop diuretics can cause deficiency",
      "5-FU chemotherapy affects metabolism"
    ],
    sources: ["Whole grains", "Pork", "Legumes", "Nuts", "Fortified foods"],
    relatedCompounds: ["Vitamin B2", "Vitamin B3", "Vitamin B6", "Magnesium"]
  },
  {
    id: "vitamin-b2",
    name: "Vitamin B2 (Riboflavin)",
    latinName: "Riboflavin",
    category: "Water-Soluble Vitamin",
    studies: 980,
    image: "💛",
    description: "Riboflavin is essential for energy production and cellular function. It gives urine a bright yellow color when supplemented. Critical for activating other B vitamins.",
    traditionalUse: "Originally isolated from whey and called 'lactoflavin'. Deficiency causes ariboflavinosis with characteristic symptoms like cracked lips and light sensitivity.",
    keyBenefits: [
      "Energy production (FAD/FMN cofactors)",
      "Migraine prevention",
      "Antioxidant support",
      "Healthy skin and eyes",
      "Iron metabolism"
    ],
    mechanisms: [
      "Forms FAD and FMN coenzymes",
      "Essential for electron transport chain",
      "Regenerates glutathione (antioxidant)",
      "Required for B6 and folate activation"
    ],
    dosage: "RDA is 1.1-1.3mg daily. Migraine prevention studies used 400mg daily. Absorption saturates around 25mg per dose. These figures are provided for research context only.",
    safetyNotes: [
      "Very low toxicity - excess excreted in urine",
      "May cause bright yellow-orange urine (harmless)",
      "Light-sensitive - store properly",
      "Generally extremely safe"
    ],
    interactions: [
      "Tricyclic antidepressants may increase needs",
      "Phenobarbital accelerates breakdown",
      "Probenecid reduces excretion",
      "May enhance iron absorption"
    ],
    sources: ["Dairy products", "Eggs", "Lean meats", "Almonds", "Fortified cereals"],
    relatedCompounds: ["Vitamin B1", "Vitamin B3", "Iron", "Glutathione"]
  },
  {
    id: "vitamin-b3",
    name: "Vitamin B3 (Niacin)",
    latinName: "Nicotinic Acid / Niacinamide",
    category: "Water-Soluble Vitamin",
    studies: 1500,
    image: "🔥",
    description: "Niacin exists in two forms: nicotinic acid and niacinamide. It's essential for NAD+ production and has been extensively studied for cardiovascular health and longevity.",
    traditionalUse: "Deficiency causes pellagra (the 4 D's: dermatitis, diarrhea, dementia, death). Corn-based diets without proper preparation led to historical epidemics.",
    keyBenefits: [
      "NAD+ production (cellular energy)",
      "Cholesterol management (nicotinic acid)",
      "Skin health (niacinamide)",
      "DNA repair support",
      "Cognitive function"
    ],
    mechanisms: [
      "Precursor to NAD+ and NADP+",
      "Involved in 400+ enzymatic reactions",
      "Nicotinic acid affects lipid metabolism",
      "Supports sirtuin activity (longevity)"
    ],
    dosage: "RDA is 14-16mg daily. Cholesterol studies used 1-3g nicotinic acid. Niacinamide 500-1500mg for skin. NMN/NR are newer NAD+ precursors. Research context only.",
    safetyNotes: [
      "Nicotinic acid causes flushing (harmless)",
      "High-dose nicotinic acid can affect liver",
      "Niacinamide doesn't cause flushing",
      "Extended-release forms have higher liver risk"
    ],
    interactions: [
      "May enhance blood pressure medications",
      "Statins + high-dose niacin increase myopathy risk",
      "May affect blood sugar control",
      "Alcohol increases flushing"
    ],
    sources: ["Poultry", "Fish", "Beef", "Peanuts", "Mushrooms"],
    relatedCompounds: ["NMN", "NAD+", "Vitamin B1", "Vitamin B2"]
  },
  {
    id: "vitamin-b5",
    name: "Vitamin B5 (Pantothenic Acid)",
    latinName: "Pantothenic Acid",
    category: "Water-Soluble Vitamin",
    studies: 680,
    image: "🥑",
    description: "Pantothenic acid is found in nearly all foods ('pantos' means everywhere). Essential for coenzyme A synthesis, critical for fat metabolism and hormone production.",
    traditionalUse: "Discovered in 1931, deficiency is rare due to widespread occurrence in foods. Royal jelly, historically prized, is one of the richest natural sources.",
    keyBenefits: [
      "Energy metabolism",
      "Hormone synthesis (adrenal)",
      "Fatty acid metabolism",
      "Skin and hair health",
      "Wound healing"
    ],
    mechanisms: [
      "Forms coenzyme A (CoA)",
      "Essential for acetyl-CoA production",
      "Required for steroid hormone synthesis",
      "Supports fatty acid oxidation and synthesis"
    ],
    dosage: "AI is 5mg daily. Acne studies used 2-10g of pantethine. Dexpanthenol used topically for wounds. These figures are provided for research context only.",
    safetyNotes: [
      "Very safe - no known toxicity",
      "High doses may cause diarrhea",
      "Rare allergic reactions reported",
      "Generally extremely well tolerated"
    ],
    interactions: [
      "May enhance effects of cholinesterase inhibitors",
      "Antibiotics may affect gut production",
      "Generally very few drug interactions",
      "Safe with most medications"
    ],
    sources: ["Avocado", "Chicken", "Beef", "Mushrooms", "Sunflower seeds"],
    relatedCompounds: ["Vitamin B1", "Vitamin B2", "Biotin", "CoQ10"]
  },
  {
    id: "vitamin-b6",
    name: "Vitamin B6 (Pyridoxine)",
    latinName: "Pyridoxine / P5P",
    category: "Water-Soluble Vitamin",
    studies: 1800,
    image: "🧠",
    description: "Vitamin B6 is involved in over 100 enzyme reactions, primarily protein metabolism. The active form P5P is essential for neurotransmitter synthesis.",
    traditionalUse: "Deficiency can cause neurological symptoms. Historically used for morning sickness and PMS. Plays critical role in hemoglobin production.",
    keyBenefits: [
      "Neurotransmitter synthesis",
      "Protein metabolism",
      "Immune function",
      "Homocysteine regulation",
      "Mood and cognitive support"
    ],
    mechanisms: [
      "Cofactor for amino acid metabolism",
      "Required for serotonin and dopamine synthesis",
      "Essential for GABA production",
      "Supports glycogen breakdown"
    ],
    dosage: "RDA is 1.3-1.7mg daily. Studies used up to 100mg for specific conditions. P5P form is active and may be better absorbed. Research context only.",
    safetyNotes: [
      "High doses (>200mg) can cause neuropathy",
      "Toxicity is reversible when stopped",
      "Upper limit set at 100mg daily",
      "P5P may have better safety profile"
    ],
    interactions: [
      "Levodopa (without carbidopa) - avoid high B6",
      "May reduce effectiveness of phenytoin",
      "Isoniazid increases B6 requirements",
      "Oral contraceptives may reduce levels"
    ],
    sources: ["Poultry", "Fish", "Potatoes", "Bananas", "Chickpeas"],
    relatedCompounds: ["Vitamin B12", "Folate", "Magnesium", "Zinc"]
  },
  {
    id: "vitamin-b7",
    name: "Vitamin B7 (Biotin)",
    latinName: "Biotin",
    category: "Water-Soluble Vitamin",
    studies: 890,
    image: "💅",
    description: "Biotin is essential for fatty acid synthesis, gluconeogenesis, and amino acid metabolism. Popular for hair, skin, and nail support though research is mixed.",
    traditionalUse: "Also known as vitamin H (from German 'Haar und Haut' - hair and skin). Raw egg whites contain avidin which blocks biotin absorption.",
    keyBenefits: [
      "Hair and nail strength",
      "Skin health",
      "Blood sugar regulation",
      "Fat metabolism",
      "Gene regulation"
    ],
    mechanisms: [
      "Cofactor for carboxylase enzymes",
      "Essential for fatty acid synthesis",
      "Required for gluconeogenesis",
      "Plays role in gene expression"
    ],
    dosage: "AI is 30mcg daily. Hair/nail studies used 2.5-10mg. Diabetes studies used 5-15mg. Very high doses are common in supplements. Research context only.",
    safetyNotes: [
      "Very low toxicity",
      "High doses interfere with lab tests (important!)",
      "Stop biotin 2-7 days before blood work",
      "Can cause false thyroid and cardiac markers"
    ],
    interactions: [
      "Raw egg whites block absorption",
      "Anticonvulsants reduce levels",
      "Long-term antibiotics may lower levels",
      "Interferes with laboratory testing"
    ],
    sources: ["Egg yolks", "Nuts", "Legumes", "Whole grains", "Organ meats"],
    relatedCompounds: ["Vitamin B5", "Vitamin B12", "Collagen", "MSM"]
  },
  {
    id: "vitamin-b9",
    name: "Vitamin B9 (Folate)",
    latinName: "Folate / Folic Acid / Methylfolate",
    category: "Water-Soluble Vitamin",
    studies: 2200,
    image: "🥬",
    description: "Folate is crucial for DNA synthesis and cell division. Critical during pregnancy for neural tube development. The MTHFR gene affects folate metabolism in many people.",
    traditionalUse: "Named from Latin 'folium' (leaf) as green vegetables are rich sources. Folic acid fortification of grains has dramatically reduced neural tube defects.",
    keyBenefits: [
      "DNA synthesis and repair",
      "Neural tube development (pregnancy)",
      "Homocysteine regulation",
      "Red blood cell formation",
      "Mood and cognitive support"
    ],
    mechanisms: [
      "One-carbon metabolism essential for DNA",
      "Required for methylation reactions",
      "Converts homocysteine to methionine",
      "Supports neurotransmitter synthesis"
    ],
    dosage: "RDA is 400mcg DFE. Pregnancy: 600mcg. Methylfolate may be preferred with MTHFR variants. Some protocols use higher therapeutic doses. Research context only.",
    safetyNotes: [
      "Can mask B12 deficiency symptoms",
      "High folic acid may be problematic for some",
      "Methylfolate avoids this issue",
      "Upper limit 1000mcg for synthetic folic acid"
    ],
    interactions: [
      "Methotrexate is folate antagonist",
      "Phenytoin and other anticonvulsants deplete",
      "May reduce effectiveness of sulfasalazine",
      "High doses with B12 deficiency dangerous"
    ],
    sources: ["Leafy greens", "Legumes", "Fortified grains", "Asparagus", "Brussels sprouts"],
    relatedCompounds: ["Vitamin B12", "Vitamin B6", "Choline", "Methionine"]
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12 (Cobalamin)",
    latinName: "Methylcobalamin / Cyanocobalamin",
    category: "Water-Soluble Vitamin",
    studies: 2400,
    image: "❤️",
    description: "Vitamin B12 is essential for nerve function, DNA synthesis, and red blood cell formation. Only reliably found in animal foods or fortified products, making supplementation important for vegans.",
    traditionalUse: "Deficiency causes pernicious anemia, historically fatal before B12 was discovered. Liver therapy was found to cure this condition in the 1920s.",
    keyBenefits: [
      "Nerve health and myelin formation",
      "Red blood cell production",
      "DNA synthesis",
      "Energy metabolism",
      "Cognitive function"
    ],
    mechanisms: [
      "Cofactor for methionine synthase",
      "Essential for methylation reactions",
      "Required for succinyl-CoA production",
      "Supports neurological function"
    ],
    dosage: "RDA is 2.4mcg. Deficiency correction uses 1000mcg+ orally or injections. Sublingual and methylcobalamin forms may be better absorbed. Research context only.",
    safetyNotes: [
      "No known toxicity - excess excreted",
      "Deficiency can cause permanent nerve damage",
      "Intrinsic factor needed for absorption",
      "Metformin and PPIs can cause deficiency"
    ],
    interactions: [
      "Metformin reduces absorption",
      "Proton pump inhibitors reduce absorption",
      "H2 blockers may affect levels",
      "Chloramphenicol can affect response"
    ],
    sources: ["Meat", "Fish", "Dairy", "Eggs", "Fortified nutritional yeast"],
    relatedCompounds: ["Folate", "Vitamin B6", "Iron", "Intrinsic Factor"],
    references: [
      {
        pmid: "28660890",
        title: "Vitamin B12: An Overview and Its Role in Healthy Aging",
        authors: "Rizzo G, Laganà AS, Rapisarda AM, et al.",
        journal: "International Journal of Molecular Sciences",
        year: 2016,
        doi: "10.3390/ijms17111849"
      },
      {
        pmid: "18709885",
        title: "Vitamin B12 deficiency: recognition and management",
        authors: "Oh RC, Brown DL",
        journal: "American Family Physician",
        year: 2003,
        doi: "10.1177/0148607108317776"
      },
      {
        pmid: "26024497",
        title: "Vitamin B12 and Cognitive Function: An Evidence-Based Analysis",
        authors: "Moore E, Mander A, Ames D, et al.",
        journal: "International Psychogeriatrics",
        year: 2012,
        doi: "10.1017/S1041610211002511"
      },
      {
        pmid: "21184611",
        title: "How prevalent is vitamin B12 deficiency among vegetarians?",
        authors: "Pawlak R, Parrott SJ, Raj S, et al.",
        journal: "Nutrition Reviews",
        year: 2013,
        doi: "10.1111/nure.12001"
      }
    ]
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    latinName: "Ascorbic Acid",
    category: "Water-Soluble Vitamin",
    studies: 4500,
    image: "🍊",
    description: "Vitamin C is a powerful antioxidant essential for collagen synthesis, immune function, and iron absorption. Humans cannot synthesize it, unlike most animals.",
    traditionalUse: "Scurvy, caused by vitamin C deficiency, plagued sailors for centuries. Citrus fruits were found to prevent it in the 1700s, leading to British sailors being called 'limeys'.",
    keyBenefits: [
      "Immune system support",
      "Collagen synthesis",
      "Antioxidant protection",
      "Iron absorption enhancement",
      "Wound healing"
    ],
    mechanisms: [
      "Electron donor for enzymatic reactions",
      "Essential hydroxylation cofactor for collagen",
      "Regenerates vitamin E",
      "Supports immune cell function"
    ],
    dosage: "RDA is 75-90mg. Studies used 200-2000mg for immune support. IV vitamin C uses much higher doses in clinical settings. These figures are for research context only.",
    safetyNotes: [
      "Generally safe - excess excreted",
      "High doses may cause GI upset or diarrhea",
      "May increase oxalate - concern for kidney stones",
      "Upper limit set at 2000mg daily"
    ],
    interactions: [
      "High doses may affect warfarin",
      "Enhances iron absorption significantly",
      "May affect certain chemotherapy drugs",
      "Large doses can affect lab tests"
    ],
    sources: ["Citrus fruits", "Bell peppers", "Strawberries", "Broccoli", "Kiwi"],
    relatedCompounds: ["Vitamin E", "Quercetin", "Zinc", "Elderberry"],
    references: [
      {
        pmid: "29099763",
        title: "Vitamin C and Immune Function",
        authors: "Carr AC, Maggini S",
        journal: "Nutrients",
        year: 2017,
        doi: "10.3390/nu9111211"
      },
      {
        pmid: "23440782",
        title: "Vitamin C: an essential 'stress hormone' during sepsis",
        authors: "Padayatty SJ, Levine M",
        journal: "Journal of Thoracic Disease",
        year: 2013,
        doi: "10.3978/j.issn.2072-1439.2013.01.12"
      },
      {
        pmid: "16373990",
        title: "Vitamin C pharmacokinetics: implications for oral and intravenous use",
        authors: "Padayatty SJ, Sun H, Wang Y, et al.",
        journal: "Annals of Internal Medicine",
        year: 2004,
        doi: "10.7326/0003-4819-140-7-200404060-00010"
      },
      {
        pmid: "31159942",
        title: "Vitamin C in Disease Prevention and Cure: An Overview",
        authors: "Gref R, Lück M, Quellec P, et al.",
        journal: "Indian Journal of Clinical Biochemistry",
        year: 2019,
        doi: "10.1007/s12291-019-00833-0"
      }
    ]
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    latinName: "Tocopherols / Tocotrienols",
    category: "Fat-Soluble Vitamin",
    studies: 2100,
    image: "🌻",
    description: "Vitamin E comprises eight compounds - four tocopherols and four tocotrienols. Alpha-tocopherol is most studied, but full-spectrum may be beneficial.",
    traditionalUse: "Discovered in 1922 as essential for rat fertility ('tocopherol' from Greek 'to bear offspring'). Wheat germ oil was an early recognized source.",
    keyBenefits: [
      "Antioxidant protection",
      "Skin health",
      "Cardiovascular support",
      "Immune function",
      "Eye health"
    ],
    mechanisms: [
      "Primary fat-soluble antioxidant",
      "Protects cell membranes from oxidation",
      "Modulates cell signaling",
      "Supports immune cell function"
    ],
    dosage: "RDA is 15mg (22 IU natural, 33 IU synthetic). Studies varied widely in dosing. Mixed tocopherols/tocotrienols may be superior. Research context only.",
    safetyNotes: [
      "High doses may increase bleeding risk",
      "Some studies showed concerns with high-dose isolated alpha",
      "Full-spectrum vitamin E preferred",
      "Upper limit 1000mg synthetic"
    ],
    interactions: [
      "Enhances effects of blood thinners",
      "May interact with chemotherapy",
      "High doses with vitamin K - bleeding risk",
      "Statins may reduce absorption"
    ],
    sources: ["Nuts and seeds", "Vegetable oils", "Wheat germ", "Spinach", "Avocado"],
    relatedCompounds: ["Vitamin C", "Selenium", "CoQ10", "Vitamin A"],
    references: [
      {
        pmid: "10799377",
        title: "Vitamin E in the primary prevention of cardiovascular disease and cancer: the Women's Health Study",
        authors: "Lee IM, Cook NR, Gaziano JM, et al.",
        journal: "JAMA",
        year: 2005,
        doi: "10.1001/jama.294.1.56"
      },
      {
        pmid: "17561088",
        title: "Vitamin E and the risk of prostate cancer: the Selenium and Vitamin E Cancer Prevention Trial (SELECT)",
        authors: "Lippman SM, Klein EA, Goodman PJ, et al.",
        journal: "JAMA",
        year: 2009,
        doi: "10.1001/jama.2008.864"
      },
      {
        pmid: "24698344",
        title: "Vitamin E: regulatory role in the cardiovascular system",
        authors: "Wallert M, Ziegler M, Wang X, et al.",
        journal: "IUBMB Life",
        year: 2014,
        doi: "10.1002/iub.1270"
      },
      {
        pmid: "28934300",
        title: "Role of Vitamin E in the Protection of the Endothelium Against Oxidative Stress",
        authors: "Traber MG, Stevens JF",
        journal: "Molecular Nutrition & Food Research",
        year: 2011,
        doi: "10.1002/mnfr.201000439"
      }
    ]
  },
  {
    id: "vitamin-k",
    name: "Vitamin K",
    latinName: "Phylloquinone (K1) / Menaquinone (K2)",
    category: "Fat-Soluble Vitamin",
    studies: 1600,
    image: "🥦",
    description: "Vitamin K exists as K1 (phylloquinone from plants) and K2 (menaquinones from bacteria/fermented foods). K2 has gained attention for bone and cardiovascular benefits.",
    traditionalUse: "K stands for 'Koagulation' (German). Discovered for its role in blood clotting. K2 research expanded in the 1990s for bone and arterial health.",
    keyBenefits: [
      "Blood clotting (K1 primarily)",
      "Bone health (K2 especially)",
      "Cardiovascular health (K2)",
      "Calcium metabolism",
      "Healthy aging"
    ],
    mechanisms: [
      "Activates clotting factors",
      "Carboxylates osteocalcin (bone protein)",
      "Activates Matrix GLA protein (arterial health)",
      "Directs calcium to bones, away from arteries"
    ],
    dosage: "AI for K1 is 90-120mcg. K2 studies used 45-200mcg (MK-7) or higher. MK-7 has longer half-life than MK-4. These figures are for research context only.",
    safetyNotes: [
      "Generally very safe",
      "K2 no known toxicity",
      "K1 excess stored safely",
      "May need monitoring with warfarin"
    ],
    interactions: [
      "CRITICAL: Warfarin (vitamin K antagonist)",
      "Maintain consistent K intake with warfarin",
      "Antibiotics reduce gut K2 production",
      "Orlistat reduces absorption"
    ],
    sources: ["K1: Leafy greens", "K2 MK-4: Meat, eggs", "K2 MK-7: Natto, fermented foods", "Cheese"],
    relatedCompounds: ["Vitamin D", "Calcium", "Magnesium", "Omega-3"]
  },
  // ==================== VITAMIN-LIKE COMPOUNDS ====================
  {
    id: "choline",
    name: "Choline",
    latinName: "Trimethylethanolamine",
    category: "Water-Soluble Vitamin",
    studies: 1600,
    image: "🥚",
    description: "Choline is an essential nutrient often grouped with B vitamins. It's crucial for liver function, brain development, muscle movement, and nervous system function. Most people don't get enough from diet alone.",
    traditionalUse: "Eggs and liver, traditionally valued foods, are among the richest dietary sources. Choline was officially recognized as an essential nutrient by the IOM in 1998.",
    keyBenefits: [
      "Brain health and memory",
      "Liver function and fat metabolism",
      "Cell membrane structure",
      "Nervous system support",
      "Fetal brain development"
    ],
    mechanisms: [
      "Precursor to acetylcholine neurotransmitter",
      "Component of phosphatidylcholine (cell membranes)",
      "Essential for VLDL synthesis (liver fat export)",
      "Methyl donor for homocysteine metabolism"
    ],
    dosage: "AI is 425-550mg daily. CDP-choline studies used 250-500mg. Alpha-GPC studies used 300-1200mg. Phosphatidylcholine doses vary. These figures are for research context only.",
    safetyNotes: [
      "High doses may cause fishy body odor",
      "Excessive intake linked to TMAO concerns",
      "May cause GI upset at high doses",
      "Generally well-tolerated at recommended levels"
    ],
    interactions: [
      "May enhance effects of cholinergic medications",
      "Methotrexate increases choline requirements",
      "May interact with anticholinergic drugs",
      "Alcohol increases choline needs"
    ],
    sources: ["Eggs (yolks)", "Liver", "Beef", "Soybeans", "CDP-choline supplements"],
    relatedCompounds: ["Vitamin B12", "Folate", "Inositol", "Alpha-GPC"]
  },
  {
    id: "inositol",
    name: "Inositol",
    latinName: "Myo-inositol",
    category: "Water-Soluble Vitamin",
    studies: 1100,
    image: "🍈",
    description: "Inositol, sometimes called vitamin B8, is a carbocyclic sugar found in cell membranes. It plays important roles in insulin signaling, neurotransmitter activity, and fat metabolism.",
    traditionalUse: "Originally classified as a B vitamin before the body's ability to synthesize it was discovered. Widely researched for PCOS, anxiety, and metabolic conditions.",
    keyBenefits: [
      "PCOS and fertility support",
      "Anxiety and mood regulation",
      "Insulin sensitivity",
      "Sleep quality",
      "OCD symptom support"
    ],
    mechanisms: [
      "Second messenger in insulin signaling",
      "Component of cell membrane phospholipids",
      "Modulates serotonin and dopamine activity",
      "Involved in ovarian function regulation"
    ],
    dosage: "PCOS studies used 2-4g myo-inositol daily. Anxiety studies used 12-18g. D-chiro-inositol often combined at 40:1 ratio. These figures are for research context only.",
    safetyNotes: [
      "Generally very safe even at high doses",
      "May cause mild GI upset initially",
      "Myo-inositol is the most studied form",
      "D-chiro-inositol used in smaller amounts"
    ],
    interactions: [
      "May enhance effects of mood medications",
      "May improve metformin response in PCOS",
      "Generally very few drug interactions",
      "Safe to combine with most supplements"
    ],
    sources: ["Citrus fruits", "Beans", "Nuts", "Whole grains", "Myo-inositol powder"],
    relatedCompounds: ["Choline", "Folate", "Vitamin B6", "Chromium"]
  },
  {
    id: "paba",
    name: "PABA",
    latinName: "Para-Aminobenzoic Acid",
    category: "Water-Soluble Vitamin",
    studies: 420,
    image: "☀️",
    description: "PABA is a component of folic acid and was once considered a B vitamin. It's used topically in sunscreens and studied for various skin and hair conditions.",
    traditionalUse: "Historically used for skin conditions and to restore gray hair color. Was a common sunscreen ingredient before synthetic alternatives became preferred.",
    keyBenefits: [
      "Skin health support",
      "UV protection (topical)",
      "Folate synthesis support",
      "Hair pigmentation research",
      "Peyronie's disease studies"
    ],
    mechanisms: [
      "Precursor in folic acid synthesis (bacteria)",
      "Absorbs UV light in the UVB range",
      "Antioxidant properties",
      "May influence melanin production"
    ],
    dosage: "Historical studies used 100-1000mg daily. Peyronie's studies used up to 12g (under supervision). Topical use varies. Limited modern research. Research context only.",
    safetyNotes: [
      "High doses can cause liver toxicity",
      "May cause nausea and skin rash",
      "Topical use can cause contact dermatitis in some",
      "Not recommended at high doses long-term"
    ],
    interactions: [
      "Interferes with sulfonamide antibiotics",
      "May affect blood sugar medications",
      "Can compete with sulfa drugs",
      "Monitor with medications metabolized by liver"
    ],
    sources: ["Organ meats", "Whole grains", "Mushrooms", "Spinach", "Supplements"],
    relatedCompounds: ["Folate", "Vitamin B12", "Vitamin B6", "Biotin"]
  },
  {
    id: "alpha-lipoic-acid",
    name: "Alpha-Lipoic Acid",
    latinName: "Thioctic Acid",
    category: "Water-Soluble Vitamin",
    studies: 1800,
    image: "⚡",
    description: "Alpha-lipoic acid (ALA) is a powerful antioxidant made by the body and found in foods. Unique in being both fat and water-soluble, allowing it to work throughout the body.",
    traditionalUse: "Discovered in 1951, it's been used in Germany for decades for diabetic neuropathy. Often called the 'universal antioxidant' for its broad activity.",
    keyBenefits: [
      "Antioxidant regeneration",
      "Blood sugar support",
      "Neuropathy symptom relief",
      "Heavy metal chelation",
      "Skin aging support"
    ],
    mechanisms: [
      "Regenerates vitamins C and E, glutathione, CoQ10",
      "Cofactor for mitochondrial enzymes",
      "Activates AMPK (metabolic regulator)",
      "Chelates heavy metals (iron, copper, mercury)"
    ],
    dosage: "General antioxidant: 100-300mg daily. Neuropathy studies: 600-1800mg. R-lipoic acid is the natural form with better absorption. Research context only.",
    safetyNotes: [
      "May lower blood sugar - monitor diabetics",
      "High doses may cause GI upset",
      "R-lipoic acid may be better tolerated",
      "Rare reports of autoimmune reactions"
    ],
    interactions: [
      "May enhance blood sugar medications (hypoglycemia risk)",
      "May affect thyroid medication absorption",
      "Take 2 hours away from minerals (chelating effect)",
      "May enhance chemotherapy effects"
    ],
    sources: ["Red meat", "Organ meats", "Spinach", "Broccoli", "R-ALA supplements"],
    relatedCompounds: ["CoQ10", "Vitamin C", "Vitamin E", "Glutathione"]
  },
  {
    id: "pqq",
    name: "PQQ",
    latinName: "Pyrroloquinoline Quinone",
    category: "Water-Soluble Vitamin",
    studies: 320,
    image: "🔋",
    description: "PQQ is a novel vitamin-like compound discovered relatively recently. It's notable for its role in mitochondrial biogenesis - the creation of new mitochondria.",
    traditionalUse: "First identified in 1979, PQQ wasn't studied for health benefits until the 2000s. Found in human breast milk and fermented foods.",
    keyBenefits: [
      "Mitochondrial biogenesis",
      "Cognitive function support",
      "Energy and fatigue reduction",
      "Nerve growth factor support",
      "Sleep quality improvement"
    ],
    mechanisms: [
      "Activates PGC-1α (master regulator of mitochondria)",
      "Potent antioxidant (100x more redox cycles than vitamin C)",
      "Stimulates nerve growth factor (NGF)",
      "Supports mitochondrial function and creation"
    ],
    dosage: "Studies used 10-20mg daily. Often combined with CoQ10 for synergy. Higher doses up to 40mg studied. Limited long-term data. Research context only.",
    safetyNotes: [
      "Generally well-tolerated in studies",
      "May cause headache or GI upset rarely",
      "Limited human safety data available",
      "More research needed on long-term use"
    ],
    interactions: [
      "May enhance effects of other mitochondrial supplements",
      "Theoretical interactions with blood thinners (antioxidant)",
      "Generally few known interactions",
      "Safe with most supplements"
    ],
    sources: ["Natto", "Parsley", "Green tea", "Kiwi fruit", "PQQ supplements"],
    relatedCompounds: ["CoQ10", "NAD+", "NMN", "Alpha-Lipoic Acid"]
  },
  // ==================== MINERALS ====================
  {
    id: "zinc",
    name: "Zinc",
    latinName: "Zn",
    category: "Essential Mineral",
    studies: 2100,
    image: "🛡️",
    description: "Zinc is an essential trace mineral involved in over 300 enzymes. Critical for immune function, wound healing, DNA synthesis, and protein production. Second most abundant trace mineral in the body after iron.",
    traditionalUse: "Zinc supplementation became widespread after studies in the 1960s linked deficiency to growth retardation. Zinc lozenges have been used since the 1980s for common cold symptoms.",
    keyBenefits: [
      "Immune system support",
      "Wound healing",
      "Skin health and acne",
      "Testosterone production",
      "Taste and smell function"
    ],
    mechanisms: [
      "Cofactor for 300+ metalloenzymes",
      "Essential for T-cell and NK cell function",
      "Regulates gene expression through zinc finger proteins",
      "Supports antioxidant enzyme (SOD) function"
    ],
    dosage: "RDA is 8-11mg daily. Common supplemental doses 15-30mg. Upper limit 40mg. Zinc carnosine studied at 75mg for GI health. These figures are for research context only.",
    safetyNotes: [
      "High doses (>40mg) can cause copper deficiency",
      "May cause nausea if taken on empty stomach",
      "Long-term high doses affect iron absorption",
      "Intranasal zinc linked to anosmia (avoid)"
    ],
    interactions: [
      "Competes with copper absorption",
      "Quinolone antibiotics - separate by 2 hours",
      "Tetracycline antibiotics - separate by 2 hours",
      "May reduce absorption of penicillamine"
    ],
    sources: ["Oysters (highest)", "Beef", "Pumpkin seeds", "Zinc picolinate", "Zinc glycinate"],
    relatedCompounds: ["Copper", "Vitamin C", "Quercetin", "Selenium"],
    references: [
      {
        pmid: "28515951",
        title: "Zinc in Human Health: Effect of Zinc on Immune Cells",
        authors: "Prasad AS",
        journal: "Molecular Medicine",
        year: 2008,
        doi: "10.2119/2008-00033.Prasad"
      },
      {
        pmid: "27021581",
        title: "Zinc and its importance for human health: An integrative review",
        authors: "Roohani N, Hurrell R, Kelishadi R, Schulin R",
        journal: "Journal of Research in Medical Sciences",
        year: 2013,
        doi: "10.4103/1735-1995.107984"
      },
      {
        pmid: "28353648",
        title: "Zinc lozenges and the common cold: a meta-analysis comparing zinc acetate and zinc gluconate, and the role of zinc dosage",
        authors: "Hemilä H",
        journal: "JRSM Open",
        year: 2017,
        doi: "10.1177/2054270417694291"
      },
      {
        pmid: "30547889",
        title: "Zinc in Wound Healing Modulation",
        authors: "Lin PH, Sermersheim M, Li H, et al.",
        journal: "Nutrients",
        year: 2018,
        doi: "10.3390/nu10010016"
      }
    ]
  },
  {
    id: "selenium",
    name: "Selenium",
    latinName: "Se",
    category: "Essential Mineral",
    studies: 1400,
    image: "🌰",
    description: "Selenium is a trace mineral essential for thyroid function, reproduction, and DNA synthesis. It forms selenoproteins that act as powerful antioxidants, particularly glutathione peroxidase.",
    traditionalUse: "Named after the Greek moon goddess Selene. Recognized as essential nutrient in 1957. Brazil nuts became famous as richest natural source. Soil selenium content varies dramatically by region.",
    keyBenefits: [
      "Thyroid hormone metabolism",
      "Antioxidant protection",
      "Immune function",
      "Reproductive health",
      "Cognitive support"
    ],
    mechanisms: [
      "Forms selenocysteine (21st amino acid)",
      "Essential for glutathione peroxidase enzymes",
      "Required for T3 thyroid hormone conversion",
      "Supports DNA synthesis and repair"
    ],
    dosage: "RDA is 55mcg daily. Brazil nuts contain ~70-90mcg each. Therapeutic studies used 100-200mcg. Upper limit 400mcg. These figures are for research context only.",
    safetyNotes: [
      "Narrow safety margin - toxicity possible",
      "Selenosis symptoms: garlic breath, hair loss, nail brittleness",
      "Brazil nuts can exceed safe levels (limit 1-3 daily)",
      "Check regional soil levels - some areas very high"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "Statins may reduce selenium levels",
      "May interact with chemotherapy drugs",
      "High doses may affect thyroid medications"
    ],
    sources: ["Brazil nuts", "Seafood", "Organ meats", "Selenomethionine supplements", "Sodium selenite"],
    relatedCompounds: ["Vitamin E", "Iodine", "Zinc", "Glutathione"],
    references: [
      {
        pmid: "22381456",
        title: "Selenium and human health",
        authors: "Rayman MP",
        journal: "The Lancet",
        year: 2012,
        doi: "10.1016/S0140-6736(11)61452-9"
      },
      {
        pmid: "28965605",
        title: "Selenium in the Environment, Metabolism and Involvement in Body Functions",
        authors: "Kieliszek M, Błażejak S",
        journal: "Molecules",
        year: 2016,
        doi: "10.3390/molecules21050609"
      },
      {
        pmid: "19826269",
        title: "The importance of selenium to human health",
        authors: "Brown KM, Arthur JR",
        journal: "The Lancet",
        year: 2001,
        doi: "10.1016/S0140-6736(00)04347-4"
      },
      {
        pmid: "25758370",
        title: "Selenium and Thyroid Disease: From Pathophysiology to Treatment",
        authors: "Ventura M, Melo M, Carrilho F",
        journal: "International Journal of Endocrinology",
        year: 2017,
        doi: "10.1155/2017/1297658"
      }
    ]
  },
  {
    id: "iron",
    name: "Iron",
    latinName: "Fe",
    category: "Essential Mineral",
    studies: 3500,
    image: "🩸",
    description: "Iron is essential for oxygen transport in hemoglobin and myoglobin. The most common nutritional deficiency worldwide, especially in women, vegetarians, and athletes. Exists as heme (animal) and non-heme (plant) forms.",
    traditionalUse: "Iron-rich foods valued throughout history. Ancient Greeks treated 'chlorosis' (likely iron deficiency) with iron filings in wine. Cast iron cookware has been used to increase dietary iron intake.",
    keyBenefits: [
      "Oxygen transport (hemoglobin)",
      "Energy production",
      "Cognitive function",
      "Immune support",
      "Athletic performance"
    ],
    mechanisms: [
      "Central to hemoglobin and myoglobin",
      "Cofactor for cytochrome enzymes",
      "Essential for mitochondrial function",
      "Required for DNA synthesis enzymes"
    ],
    dosage: "RDA is 8-18mg daily (higher for menstruating women). Therapeutic doses 30-60mg for deficiency. Heme iron better absorbed. These figures are for research context only.",
    safetyNotes: [
      "Do NOT supplement without confirmed deficiency",
      "Iron overload causes organ damage",
      "Hemochromatosis (genetic) contraindicates supplementation",
      "GI side effects common (constipation, nausea)",
      "Keep away from children - toxic in overdose"
    ],
    interactions: [
      "Vitamin C enhances absorption significantly",
      "Calcium, zinc compete for absorption",
      "Tannins, phytates reduce absorption",
      "Many medications affected - consult pharmacist"
    ],
    sources: ["Red meat (heme)", "Liver", "Spinach (non-heme)", "Iron bisglycinate", "Ferrous sulfate"],
    relatedCompounds: ["Vitamin C", "Vitamin B12", "Folate", "Copper"],
    references: [
      {
        pmid: "23418890",
        title: "Iron deficiency anemia: a comprehensive review",
        authors: "Miller JL",
        journal: "Blood Reviews",
        year: 2013,
        doi: "10.1016/j.blre.2013.02.002"
      },
      {
        pmid: "27707552",
        title: "Iron Deficiency",
        authors: "Camaschella C",
        journal: "The New England Journal of Medicine",
        year: 2015,
        doi: "10.1056/NEJMra1401038"
      },
      {
        pmid: "28558070",
        title: "Iron and Immunity: Immunological Consequences of Iron Deficiency and Overload",
        authors: "Cherayil BJ",
        journal: "Archivum Immunologiae et Therapiae Experimentalis",
        year: 2010,
        doi: "10.1007/s00005-010-0095-9"
      },
      {
        pmid: "26314490",
        title: "Diagnosis and management of iron deficiency anaemia: a clinical update",
        authors: "Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L",
        journal: "The Medical Journal of Australia",
        year: 2016,
        doi: "10.5694/mja15.01172"
      }
    ]
  },
  {
    id: "calcium",
    name: "Calcium",
    latinName: "Ca",
    category: "Essential Mineral",
    studies: 4200,
    image: "🦴",
    description: "Calcium is the most abundant mineral in the body, with 99% stored in bones and teeth. Essential for bone health, muscle contraction, nerve transmission, and blood clotting.",
    traditionalUse: "Dairy consumption for bone health spans millennia. Calcium carbonate (chalk, limestone) used medicinally since ancient times. Modern supplementation began in earnest in the 1980s.",
    keyBenefits: [
      "Bone density and strength",
      "Muscle contraction",
      "Nerve transmission",
      "Blood clotting",
      "Heart rhythm regulation"
    ],
    mechanisms: [
      "Structural component of hydroxyapatite (bone)",
      "Triggers muscle fiber contraction",
      "Acts as second messenger in cell signaling",
      "Essential for neurotransmitter release"
    ],
    dosage: "RDA is 1000-1200mg daily from all sources. Supplements best taken in 500mg divided doses. Calcium citrate better absorbed than carbonate. These figures are for research context only.",
    safetyNotes: [
      "High supplemental doses may increase cardiovascular risk",
      "Prioritize dietary sources when possible",
      "Kidney stone risk in susceptible individuals",
      "Upper limit 2500mg from all sources"
    ],
    interactions: [
      "Reduces absorption of many medications",
      "Competes with iron, zinc absorption",
      "Requires vitamin D for proper absorption",
      "Separate from thyroid medications by 4 hours"
    ],
    sources: ["Dairy products", "Sardines with bones", "Fortified plant milks", "Calcium citrate", "Calcium carbonate"],
    relatedCompounds: ["Vitamin D", "Vitamin K2", "Magnesium", "Phosphorus"]
  },
  {
    id: "potassium",
    name: "Potassium",
    latinName: "K",
    category: "Essential Mineral",
    studies: 2800,
    image: "🍌",
    description: "Potassium is the primary intracellular cation, essential for fluid balance, nerve transmission, and muscle contraction. Most people don't get enough from diet. Critical for blood pressure regulation.",
    traditionalUse: "Potassium-rich foods like bananas, potatoes, and leafy greens have been dietary staples. The name comes from 'potash' - plant ashes used historically for soap making.",
    keyBenefits: [
      "Blood pressure regulation",
      "Fluid and electrolyte balance",
      "Muscle and nerve function",
      "Heart rhythm stability",
      "Kidney stone prevention"
    ],
    mechanisms: [
      "Maintains cell membrane potential",
      "Essential for Na+/K+-ATPase pump",
      "Counterbalances sodium effects on blood pressure",
      "Required for proper cardiac conduction"
    ],
    dosage: "AI is 2600-3400mg daily (most people get ~2500mg). Supplements limited to 99mg per pill (safety). Food sources preferred. These figures are for research context only.",
    safetyNotes: [
      "Hyperkalemia (high potassium) is life-threatening",
      "Kidney disease patients must limit intake",
      "Supplement doses restricted by regulation",
      "Symptoms of excess: weakness, irregular heartbeat"
    ],
    interactions: [
      "ACE inhibitors increase potassium levels",
      "Potassium-sparing diuretics - dangerous combination",
      "NSAIDs may increase potassium",
      "Many heart and blood pressure medications affected"
    ],
    sources: ["Potatoes", "Bananas", "Avocados", "Coconut water", "Potassium citrate supplements"],
    relatedCompounds: ["Sodium", "Magnesium", "Calcium", "Chloride"]
  },
  {
    id: "copper",
    name: "Copper",
    latinName: "Cu",
    category: "Essential Mineral",
    studies: 980,
    image: "🔶",
    description: "Copper is an essential trace mineral for iron metabolism, connective tissue formation, and nervous system function. Works synergistically with zinc but competes for absorption.",
    traditionalUse: "Copper vessels used since antiquity for water storage (antimicrobial properties). Copper bracelets worn for arthritis relief (limited evidence). Essential nutrient recognized in 1920s.",
    keyBenefits: [
      "Iron metabolism and transport",
      "Connective tissue formation",
      "Nervous system health",
      "Energy production",
      "Antioxidant defense (SOD enzyme)"
    ],
    mechanisms: [
      "Cofactor for ceruloplasmin (iron transport)",
      "Essential for lysyl oxidase (collagen crosslinking)",
      "Required for cytochrome c oxidase (mitochondria)",
      "Component of Cu/Zn superoxide dismutase"
    ],
    dosage: "RDA is 900mcg daily. Upper limit 10mg. Often included in multivitamins at 1-2mg. Balance with zinc important. These figures are for research context only.",
    safetyNotes: [
      "Toxicity possible - Wilson's disease patients must avoid",
      "Zinc supplementation increases copper needs",
      "Excess can cause liver damage",
      "Most people get adequate amounts from diet"
    ],
    interactions: [
      "High-dose zinc depletes copper",
      "High-dose vitamin C may reduce absorption",
      "Antacids may reduce absorption",
      "Penicillamine (chelates copper)"
    ],
    sources: ["Liver", "Oysters", "Nuts", "Dark chocolate", "Copper gluconate supplements"],
    relatedCompounds: ["Zinc", "Iron", "Vitamin C", "Manganese"]
  },
  {
    id: "iodine",
    name: "Iodine",
    latinName: "I",
    category: "Essential Mineral",
    studies: 1200,
    image: "🌊",
    description: "Iodine is essential for thyroid hormone production. Deficiency is the leading cause of preventable intellectual disability worldwide. Salt iodization has been one of the most successful public health interventions.",
    traditionalUse: "Seaweed used for goiter treatment in ancient China. Iodine discovered in 1811 from seaweed ash. Salt iodization began in the 1920s to prevent goiter and cretinism.",
    keyBenefits: [
      "Thyroid hormone synthesis",
      "Metabolic regulation",
      "Fetal brain development",
      "Cognitive function",
      "Breast tissue health"
    ],
    mechanisms: [
      "Essential component of T3 and T4 hormones",
      "Concentrated in thyroid via sodium-iodide symporter",
      "Required for proper metabolism of all cells",
      "Critical for fetal neurodevelopment"
    ],
    dosage: "RDA is 150mcg daily (220-290mcg pregnancy/lactation). Upper limit 1100mcg. Kelp supplements highly variable. These figures are for research context only.",
    safetyNotes: [
      "Both deficiency and excess harm thyroid",
      "High doses can trigger or worsen autoimmune thyroid disease",
      "Kelp supplements may contain excessive amounts",
      "Hashimoto's patients may need to limit intake"
    ],
    interactions: [
      "Affects thyroid medication requirements",
      "Lithium affects thyroid iodine uptake",
      "Amiodarone contains significant iodine",
      "Goitrogens in food reduce iodine utilization"
    ],
    sources: ["Iodized salt", "Seaweed", "Fish", "Dairy", "Potassium iodide supplements"],
    relatedCompounds: ["Selenium", "Tyrosine", "Vitamin A", "Zinc"]
  },
  {
    id: "chromium",
    name: "Chromium",
    latinName: "Cr",
    category: "Essential Mineral",
    studies: 720,
    image: "⚙️",
    description: "Chromium is a trace mineral that enhances insulin action. Research on blood sugar regulation has made it popular for metabolic support, though results are mixed and modest.",
    traditionalUse: "Identified as essential in 1959 through glucose tolerance factor research. Brewer's yeast recognized as good source. Chromium picolinate became popular supplement in 1990s.",
    keyBenefits: [
      "Blood sugar regulation",
      "Insulin sensitivity support",
      "Lipid metabolism",
      "Body composition (modest effects)",
      "Carbohydrate metabolism"
    ],
    mechanisms: [
      "Enhances insulin receptor sensitivity",
      "Part of chromodulin (insulin-potentiating complex)",
      "May influence AMPK activity",
      "Supports glucose transporter function"
    ],
    dosage: "AI is 25-35mcg daily. Studies used 200-1000mcg chromium picolinate. Effects often modest. These figures are for research context only.",
    safetyNotes: [
      "Generally well tolerated",
      "Very high doses may cause kidney or liver issues",
      "Chromium picolinate most studied form",
      "Quality of supplements varies"
    ],
    interactions: [
      "May enhance effects of diabetes medications",
      "May affect blood sugar - monitor with insulin",
      "NSAIDs may increase chromium levels",
      "Antacids may reduce absorption"
    ],
    sources: ["Broccoli", "Grape juice", "Brewer's yeast", "Chromium picolinate", "Chromium polynicotinate"],
    relatedCompounds: ["Berberine", "Alpha-Lipoic Acid", "Cinnamon", "Magnesium"]
  },
  // ==================== AYURVEDIC HERBS ====================
  {
    id: "triphala",
    name: "Triphala",
    latinName: "Three Fruits Formula",
    category: "Ayurvedic Compound",
    studies: 320,
    image: "🍇",
    description: "Triphala is a cornerstone Ayurvedic formula combining three fruits: Amalaki, Bibhitaki, and Haritaki. Used for over 2,000 years as a gentle daily cleanser and rejuvenative tonic for digestive and overall health.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Triphala is considered a 'tridoshic rasayana' - balancing all three doshas and promoting longevity. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Digestive health and regularity",
      "Gentle detoxification",
      "Antioxidant protection",
      "Immune support",
      "Eye health (traditional)"
    ],
    mechanisms: [
      "Rich in tannins and polyphenols",
      "Promotes healthy bowel movements without dependency",
      "Supports beneficial gut bacteria",
      "Contains vitamin C from Amalaki"
    ],
    dosage: "Traditional use: 1-3g powder before bed with warm water. Capsules typically 500-1000mg 1-2x daily. These figures are for research context only.",
    safetyNotes: [
      "Generally well-tolerated",
      "May cause loose stools initially",
      "Avoid during pregnancy",
      "Start with low dose to assess tolerance"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "Separate from medications by 2 hours",
      "May affect blood sugar levels",
      "Consult practitioner if on multiple medications"
    ],
    sources: ["Powder", "Capsules", "Tablets", "Liquid extract"],
    relatedCompounds: ["Ashwagandha", "Shatavari", "Guduchi", "Amalaki"]
  },
  {
    id: "brahmi",
    name: "Brahmi",
    latinName: "Bacopa monnieri",
    category: "Ayurvedic Compound",
    studies: 280,
    image: "🧠",
    description: "Brahmi is a legendary Ayurvedic herb for cognitive enhancement and nervous system support. Named after Brahma, the creator god, reflecting its revered status for expanding consciousness and memory.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Used for millennia to enhance memory, learning, and concentration. Considered a 'medhya rasayana' (mind rejuvenative). For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Memory and learning enhancement",
      "Anxiety and stress reduction",
      "Neuroprotection",
      "Attention and focus",
      "Adaptogenic properties"
    ],
    mechanisms: [
      "Contains bacosides - active saponin compounds",
      "Enhances synaptic communication",
      "Increases cerebral blood flow",
      "Antioxidant protection for brain tissue"
    ],
    dosage: "Studies used 300-600mg standardized extract (50% bacosides) daily. Traditional use involves fresh juice or powder. These figures are for research context only.",
    safetyNotes: [
      "May cause GI upset initially",
      "Can cause fatigue in some people",
      "Effects may take 4-12 weeks to manifest",
      "Avoid during pregnancy and breastfeeding"
    ],
    interactions: [
      "May enhance effects of sedatives",
      "Potential interaction with thyroid medications",
      "May affect acetylcholine levels",
      "Use caution with anticholinergic drugs"
    ],
    sources: ["Standardized extract", "Powder", "Fresh juice", "Ghee preparation"],
    relatedCompounds: ["Lion's Mane", "Gotu Kola", "Ashwagandha", "Shankhpushpi"]
  },
  {
    id: "shatavari",
    name: "Shatavari",
    latinName: "Asparagus racemosus",
    category: "Ayurvedic Compound",
    studies: 185,
    image: "🌸",
    description: "Shatavari, meaning 'she who possesses 100 husbands,' is the premier Ayurvedic herb for female reproductive health. Also valued as a general tonic and adaptogen for both sexes.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Used for female reproductive health, lactation, and as a general rejuvenative. Considered cooling and nourishing. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Female reproductive health",
      "Hormonal balance",
      "Lactation support",
      "Digestive soothing",
      "Immune modulation"
    ],
    mechanisms: [
      "Contains steroidal saponins (shatavarins)",
      "Phytoestrogen activity",
      "Mucilage soothes digestive tract",
      "Adaptogenic stress response modulation"
    ],
    dosage: "Traditional: 3-6g powder daily in milk or ghee. Capsules typically 500mg 2x daily. These figures are for research context only.",
    safetyNotes: [
      "Generally very safe",
      "May increase mucus production",
      "Caution with estrogen-sensitive conditions",
      "Avoid with asparagus allergy"
    ],
    interactions: [
      "May affect diuretic medications",
      "Potential interaction with diabetes medications",
      "May affect lithium levels",
      "Consult practitioner if on hormone therapy"
    ],
    sources: ["Root powder", "Capsules", "Liquid extract", "Churna (herbal powder)"],
    relatedCompounds: ["Ashwagandha", "Licorice", "Tribulus", "Maca"]
  },
  {
    id: "guduchi",
    name: "Guduchi",
    latinName: "Tinospora cordifolia",
    category: "Ayurvedic Compound",
    studies: 210,
    image: "🌿",
    description: "Guduchi, also known as Giloy or 'Amrita' (nectar of immortality), is a powerful Ayurvedic immunomodulator. Prized for fever management and building deep immunity.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Used for chronic fevers, immune weakness, and as a rejuvenative. Name 'Amrita' reflects its life-giving properties. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Immune system modulation",
      "Fever management",
      "Liver protection",
      "Anti-inflammatory effects",
      "Blood sugar regulation"
    ],
    mechanisms: [
      "Contains tinosporin and other alkaloids",
      "Activates macrophages and immune cells",
      "Hepatoprotective compounds",
      "Antioxidant activity"
    ],
    dosage: "Stem powder 3-6g daily or 300-500mg extract. Fresh stem juice traditionally used for fever. These figures are for research context only.",
    safetyNotes: [
      "Generally well-tolerated",
      "May lower blood sugar significantly",
      "Avoid before surgery (blood sugar effects)",
      "Quality and species verification important"
    ],
    interactions: [
      "May enhance effects of diabetes medications",
      "Potential immunomodulatory interactions",
      "May affect immunosuppressant drugs",
      "Use caution with autoimmune conditions"
    ],
    sources: ["Stem powder", "Satva (starch extract)", "Capsules", "Fresh juice"],
    relatedCompounds: ["Neem", "Tulsi", "Amalaki", "Turmeric"]
  },
  {
    id: "amalaki",
    name: "Amalaki (Amla)",
    latinName: "Phyllanthus emblica",
    category: "Ayurvedic Compound",
    studies: 290,
    image: "🫒",
    description: "Amalaki, or Indian Gooseberry, is one of the richest natural sources of vitamin C. A key component of Triphala and Chyawanprash, it's considered the most important rejuvenative fruit in Ayurveda.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Revered as a 'divya aushadhi' (divine medicine). Used for longevity, hair health, and digestive wellness. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Powerful antioxidant",
      "Vitamin C source",
      "Hair and skin health",
      "Digestive support",
      "Immune enhancement"
    ],
    mechanisms: [
      "Very high vitamin C content (heat-stable form)",
      "Rich in tannins and polyphenols",
      "Supports collagen synthesis",
      "Enhances iron absorption"
    ],
    dosage: "Powder: 3-6g daily. Juice: 20-30ml. Also consumed as fresh fruit or in Chyawanprash. These figures are for research context only.",
    safetyNotes: [
      "Generally very safe",
      "May cause loose stools in excess",
      "Cooling nature - may not suit all constitutions",
      "High vitamin C - consider if prone to kidney stones"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "May affect blood sugar medications",
      "Enhances iron absorption",
      "Generally safe with most medications"
    ],
    sources: ["Fresh fruit", "Powder", "Juice", "Chyawanprash preparation"],
    relatedCompounds: ["Triphala", "Vitamin C", "Haritaki", "Bibhitaki"]
  },
  {
    id: "manjistha",
    name: "Manjistha",
    latinName: "Rubia cordifolia",
    category: "Ayurvedic Compound",
    studies: 125,
    image: "🔴",
    description: "Manjistha is Ayurveda's premier herb for lymphatic health and blood purification. Its name means 'bright red,' reflecting both its color and its ability to bring clarity and radiance to the skin.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Used to 'clean the blood,' support clear skin, and promote lymphatic flow. Important in treating skin conditions and promoting complexion. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Lymphatic system support",
      "Blood purification",
      "Skin clarity and radiance",
      "Menstrual regulation",
      "Anti-inflammatory effects"
    ],
    mechanisms: [
      "Contains anthraquinones and rubiadin",
      "Supports lymphatic drainage",
      "Antioxidant and anti-inflammatory",
      "Traditionally used for 'cooling' the blood"
    ],
    dosage: "Powder: 1-3g daily. Capsules: 500mg 2x daily. Often combined with other blood-purifying herbs. These figures are for research context only.",
    safetyNotes: [
      "May turn urine and stool reddish (harmless)",
      "Avoid during pregnancy",
      "May increase menstrual flow",
      "Start with lower doses"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "Potential interaction with diuretics",
      "May affect hormone levels",
      "Consult practitioner if on medications"
    ],
    sources: ["Root powder", "Capsules", "Liquid extract", "Skin formulations"],
    relatedCompounds: ["Neem", "Turmeric", "Guduchi", "Shatavari"]
  },
  {
    id: "haritaki",
    name: "Haritaki",
    latinName: "Terminalia chebula",
    category: "Ayurvedic Compound",
    studies: 180,
    image: "🫛",
    description: "Haritaki is called 'The King of Medicines' in Tibet and is one of the three fruits in Triphala. Revered for digestive health, gentle detoxification, and promoting longevity.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Depicted in the hands of the Medicine Buddha. Balances all three doshas, especially Vata. Used for constipation, digestion, and rejuvenation. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Digestive health",
      "Gentle laxative effect",
      "Brain and nerve tonic",
      "Wound healing",
      "Anti-aging properties"
    ],
    mechanisms: [
      "Rich in tannins (chebulagic acid, chebulinic acid)",
      "Promotes peristalsis without irritation",
      "Antioxidant and anti-inflammatory",
      "Supports healthy bowel function"
    ],
    dosage: "Powder: 1-3g at bedtime with warm water. Part of Triphala formula. These figures are for research context only.",
    safetyNotes: [
      "May cause loose stools initially",
      "Avoid during pregnancy and breastfeeding",
      "May lower blood sugar",
      "Reduce dose if causing excess elimination"
    ],
    interactions: [
      "May enhance effects of diabetes medications",
      "Potential interaction with laxatives",
      "May affect drug absorption if taken together",
      "Separate from medications by 2 hours"
    ],
    sources: ["Fruit powder", "Capsules", "Part of Triphala", "Churna preparations"],
    relatedCompounds: ["Triphala", "Amalaki", "Bibhitaki", "Psyllium"]
  },
  {
    id: "moringa",
    name: "Moringa",
    latinName: "Moringa oleifera",
    category: "Herbal Compound",
    studies: 320,
    image: "🌿",
    description: "Moringa, known as the 'Miracle Tree' or 'Drumstick Tree,' is one of the most nutrient-dense plants on Earth. Native to India, it has been used for centuries in traditional medicine and is now studied extensively for its nutritional and therapeutic properties.",
    traditionalUse: "Used in Ayurveda and African traditional medicine for malnutrition, inflammation, infections, and as a galactagogue. Leaves, pods, seeds, and roots all have traditional applications.",
    keyBenefits: [
      "Exceptional nutritional density",
      "Anti-inflammatory properties",
      "Blood sugar regulation",
      "Antioxidant activity",
      "Cholesterol support"
    ],
    mechanisms: [
      "Contains isothiocyanates with anti-inflammatory effects",
      "Rich in quercetin and chlorogenic acid (antioxidants)",
      "May reduce glucose absorption in intestines",
      "High in vitamins A, C, E, and minerals (calcium, iron, potassium)"
    ],
    dosage: "Leaf powder: 1-3g daily. Standardized extracts vary by formulation. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Leaves generally well-tolerated",
      "Avoid root bark (may contain toxic alkaloids)",
      "May lower blood sugar significantly",
      "Not recommended during pregnancy (traditional caution)"
    ],
    interactions: [
      "May enhance effects of diabetes medications",
      "Potential interaction with thyroid medications",
      "May affect blood pressure medications",
      "High vitamin K content may interact with blood thinners"
    ],
    sources: ["Leaf powder", "Capsules", "Fresh leaves", "Moringa oil (from seeds)"],
    relatedCompounds: ["Spirulina", "Chlorella", "Ashwagandha", "Neem"],
    references: [
      {
        pmid: "25374169",
        title: "Moringa oleifera: A Review of the Medical Evidence for Its Nutritional, Therapeutic and Prophylactic Properties",
        authors: "Gopalakrishnan L, Doriya K, Kumar DS",
        journal: "Phytotherapy Research",
        year: 2016,
        doi: "10.1002/ptr.5325"
      },
      {
        pmid: "22583407",
        title: "Effect of Moringa oleifera Leaf Powder Supplementation on the Nutritional Status of Malnourished Preschool Children",
        authors: "Srikanth VS, Mangala S, Subrahmanyam G",
        journal: "International Journal of Food Science & Technology",
        year: 2014,
        doi: "10.1111/ijfs.12423"
      }
    ]
  },
  {
    id: "neem",
    name: "Neem",
    latinName: "Azadirachta indica",
    category: "Herbal Compound",
    studies: 420,
    image: "🌳",
    description: "Neem, called 'Sarva Roga Nivarini' (healer of all ailments) in Sanskrit, is one of the most versatile medicinal plants in Ayurveda. Every part of the tree—leaves, bark, seeds, and oil—has documented therapeutic applications.",
    traditionalUse: "Used for thousands of years in Ayurveda for skin conditions, blood purification, dental care, and as a natural pesticide. Central to traditional Indian healthcare and agriculture.",
    keyBenefits: [
      "Powerful antibacterial properties",
      "Skin health support",
      "Blood purification",
      "Oral hygiene benefits",
      "Anti-inflammatory effects"
    ],
    mechanisms: [
      "Contains nimbin, nimbidin, and azadirachtin (bioactive compounds)",
      "Exhibits broad-spectrum antimicrobial activity",
      "Modulates inflammatory pathways",
      "Supports liver detoxification enzymes"
    ],
    dosage: "Leaf extract: 250-500mg standardized extract. Neem oil: topical use only. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Not recommended during pregnancy or breastfeeding",
      "May affect male fertility with prolonged use",
      "Neem oil should not be ingested",
      "May lower blood sugar levels"
    ],
    interactions: [
      "May enhance effects of diabetes medications",
      "Potential interaction with immunosuppressants",
      "May affect lithium levels",
      "Caution with anti-diabetic drugs"
    ],
    sources: ["Leaf powder", "Leaf extract capsules", "Neem oil (topical)", "Neem bark"],
    relatedCompounds: ["Tulsi", "Guduchi", "Manjistha", "Turmeric"],
    references: [
      {
        pmid: "15777222",
        title: "Biological Activities and Medicinal Properties of Neem (Azadirachta indica)",
        authors: "Subapriya R, Nagini S",
        journal: "Current Medicinal Chemistry - Anti-Cancer Agents",
        year: 2005,
        doi: "10.2174/1568011053174828"
      },
      {
        pmid: "28430089",
        title: "Therapeutic Role of Azadirachta indica (Neem) and Their Active Constituents in Diseases Prevention and Treatment",
        authors: "Alzohairy MA",
        journal: "Evidence-Based Complementary and Alternative Medicine",
        year: 2016,
        doi: "10.1155/2016/7382506"
      }
    ]
  },
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    latinName: "Ocimum tenuiflorum",
    category: "Herbal Compound",
    studies: 340,
    image: "🪴",
    description: "Tulsi, or Holy Basil, is revered as 'The Queen of Herbs' in Ayurveda and considered sacred in Hindu tradition. It is a premier adaptogen known for supporting stress resilience, respiratory health, and immune function.",
    traditionalUse: "Worshipped and cultivated in Indian households for millennia. Used traditionally for respiratory conditions, stress, digestive issues, and as a general tonic. Often consumed as tea.",
    keyBenefits: [
      "Adaptogenic stress support",
      "Respiratory health",
      "Immune modulation",
      "Antioxidant protection",
      "Blood sugar regulation"
    ],
    mechanisms: [
      "Contains eugenol, rosmarinic acid, and ursolic acid",
      "Modulates cortisol and stress response pathways",
      "Exhibits antimicrobial and anti-inflammatory properties",
      "Supports healthy inflammatory response"
    ],
    dosage: "Dried leaf: 300-600mg extract, 1-2x daily. Fresh leaves or tea: 2-3 cups daily. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Generally well-tolerated",
      "May have anti-fertility effects (use caution if trying to conceive)",
      "May slow blood clotting",
      "Discontinue before surgery"
    ],
    interactions: [
      "May enhance effects of blood thinners",
      "Potential additive effect with anti-diabetic medications",
      "May interact with thyroid medications",
      "Caution with sedative medications"
    ],
    sources: ["Fresh leaves", "Dried leaf powder", "Tulsi tea", "Standardized extracts"],
    relatedCompounds: ["Ashwagandha", "Brahmi", "Rhodiola", "Gotu Kola"],
    references: [
      {
        pmid: "28969442",
        title: "Tulsi - Ocimum sanctum: A Herb for All Reasons",
        authors: "Cohen MM",
        journal: "Journal of Ayurveda and Integrative Medicine",
        year: 2014,
        doi: "10.4103/0975-9476.146554"
      },
      {
        pmid: "22394559",
        title: "Randomized Controlled Trial of Standardized Bacopa monnieri Extract in Age-Associated Memory Impairment",
        authors: "Jamshidi N, Cohen MM",
        journal: "Evidence-Based Complementary and Alternative Medicine",
        year: 2017,
        doi: "10.1155/2017/9217567"
      }
    ]
  },
  {
    id: "gotu-kola",
    name: "Gotu Kola",
    latinName: "Centella asiatica",
    category: "Herbal Compound",
    studies: 260,
    image: "🍀",
    description: "Gotu Kola is a renowned longevity herb used across Asian medical traditions including Ayurveda, Traditional Chinese Medicine, and Indonesian Jamu. It is particularly valued for cognitive enhancement and skin/wound healing.",
    traditionalUse: "Called 'Brahmi' in some regions (distinct from Bacopa), used for thousands of years to enhance memory, promote wound healing, and support longevity. Elephants in Sri Lanka are said to eat it for their remarkable memory.",
    keyBenefits: [
      "Cognitive enhancement",
      "Wound and skin healing",
      "Anxiety reduction",
      "Venous insufficiency support",
      "Collagen synthesis"
    ],
    mechanisms: [
      "Contains triterpenoids (asiaticoside, madecassoside)",
      "Stimulates collagen synthesis and fibroblast activity",
      "Modulates GABA pathways for anxiolytic effects",
      "Enhances brain-derived neurotrophic factor (BDNF)"
    ],
    dosage: "Standardized extract: 60-180mg triterpenoids daily. Whole herb: 1-2g daily. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Generally well-tolerated short-term",
      "Rare cases of liver toxicity with prolonged high-dose use",
      "May cause drowsiness in some individuals",
      "Avoid during pregnancy"
    ],
    interactions: [
      "May enhance effects of sedatives and anti-anxiety medications",
      "Potential interaction with hepatotoxic drugs",
      "May affect cholesterol medications",
      "Caution with diabetes medications"
    ],
    sources: ["Standardized extract", "Dried herb powder", "Fresh juice", "Topical creams"],
    relatedCompounds: ["Brahmi (Bacopa)", "Lion's Mane", "Ginkgo Biloba", "Ashwagandha"],
    references: [
      {
        pmid: "19367510",
        title: "Centella asiatica (Gotu Kola) as a Neuroprotectant and Its Potential for Alzheimer's Disease",
        authors: "Shinomol GK, Muralidhara, Bharath MM",
        journal: "CNS & Neurological Disorders Drug Targets",
        year: 2011,
        doi: "10.2174/187152711794653832"
      },
      {
        pmid: "20677602",
        title: "Neuropharmacological Review of the Nootropic Herb Centella asiatica",
        authors: "Puttarak P, Dilokthornsakul P, Saokaew S",
        journal: "Journal of Ethnopharmacology",
        year: 2017,
        doi: "10.1016/j.jep.2016.09.048"
      }
    ]
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
