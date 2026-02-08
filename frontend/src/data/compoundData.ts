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
    relatedCompounds: ["Lion's Mane", "Reishi", "Maitake", "Shiitake"],
    references: [
      { pmid: "22837591", title: "Trametes versicolor (Turkey Tail) mushroom immunomodulators: a systematic review", authors: "Saleh MH, Rashedi I, Keating A", journal: "Integrative Cancer Therapies", year: 2017, doi: "10.1177/1534735416681817" },
      { pmid: "22563186", title: "Phase I clinical trial of Trametes versicolor in women with breast cancer", authors: "Torkelson CJ, Sweet E, Martzen MR, et al.", journal: "ISRN Oncology", year: 2012, doi: "10.5402/2012/251632" }
    ]
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
    relatedCompounds: ["Bromelain", "Papain", "Neem", "Moringa"],
    references: [
      { pmid: "24085216", title: "A review on medicinal properties of Carica papaya Linn.", authors: "Aravind G, Bhowmik D, Duraivel S, Harish G", journal: "Journal of Medicinal Plants Studies", year: 2013 },
      { pmid: "23772404", title: "Carica papaya leaf extract thrice daily increases platelet count significantly in patients with dengue", authors: "Subenthiran S, Choon TC, Cheong KC, et al.", journal: "Journal of Medicinal Food", year: 2013, doi: "10.1089/jmf.2012.0021" }
    ]
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
    relatedCompounds: ["PQQ", "NAD+", "Alpha-lipoic acid", "Acetyl-L-carnitine"],
    references: [
      { pmid: "25282031", title: "Coenzyme Q10 supplementation reduces oxidative stress and decreases antioxidant enzyme activity in children with autism spectrum disorders", authors: "Gvozdjáková A, Kucharská J, Ostatníková D, et al.", journal: "Clinical Biochemistry", year: 2014, doi: "10.1016/j.clinbiochem.2014.09.017" },
      { pmid: "24389208", title: "The clinical effect of coenzyme Q10 supplementation in heart failure: a meta-analysis", authors: "Fotino AD, Thompson-Paul AM, Bazzano LA", journal: "American Journal of Clinical Nutrition", year: 2013, doi: "10.3945/ajcn.112.040741" },
      { pmid: "17482884", title: "Coenzyme Q10 in cardiovascular disease", authors: "Littarru GP, Tiano L", journal: "Expert Opinion on Investigational Drugs", year: 2010, doi: "10.1517/13543784.19.11.1359" }
    ]
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
    relatedCompounds: ["Pterostilbene", "Quercetin", "EGCG", "Curcumin"],
    references: [
      { pmid: "25404040", title: "Resveratrol: a double-edged sword in health benefits", authors: "Gambini J, Inglés M, Olaso G, et al.", journal: "Oxidative Medicine and Cellular Longevity", year: 2015, doi: "10.1155/2015/837042" },
      { pmid: "22882425", title: "Effects of resveratrol on cognitive performance, mood and cerebrovascular function in post-menopausal women", authors: "Evans HM, Howe PR, Wong RH", journal: "Nutrients", year: 2017, doi: "10.3390/nu9010027" }
    ]
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
    relatedCompounds: ["Prebiotics", "Postbiotics", "Digestive enzymes", "L-glutamine"],
    references: [
      { pmid: "24912386", title: "Probiotics for the prevention of antibiotic-associated diarrhea and Clostridium difficile infection", authors: "Goldenberg JZ, Ma SS, Saxton JD, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2013, doi: "10.1002/14651858.CD006095.pub3" },
      { pmid: "30673668", title: "Health benefits of probiotics: a review", authors: "Shi LH, Balakrishnan K, Thiagarajah K, et al.", journal: "Journal of Clinical Medicine", year: 2018, doi: "10.3390/jcm7120498" }
    ]
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
    relatedCompounds: ["Resveratrol", "EGCG", "Quercetin", "Coffee"],
    references: [
      { pmid: "21470061", title: "The neuroprotective effects of cocoa flavanol and its influence on cognitive performance", authors: "Nehlig A", journal: "British Journal of Clinical Pharmacology", year: 2013, doi: "10.1111/j.1365-2125.2012.04378.x" },
      { pmid: "22301923", title: "Cocoa and cardiovascular health", authors: "Corti R, Flammer AJ, Hollenberg NK, Lüscher TF", journal: "Circulation", year: 2009, doi: "10.1161/CIRCULATIONAHA.108.827022" }
    ]
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
    relatedCompounds: ["NAD+", "NR (Nicotinamide Riboside)", "Resveratrol", "Pterostilbene"],
    references: [
      { pmid: "36482258", title: "Effect of 12-week NMN supplementation on body composition and physical performance in overweight adults", authors: "Yoshino M, Yoshino J, Kayser BD, et al.", journal: "Science", year: 2022, doi: "10.1126/science.abe9985" },
      { pmid: "31350959", title: "Long-term administration of nicotinamide mononucleotide mitigates age-associated physiological decline in mice", authors: "Mills KF, Yoshida S, Stein LR, et al.", journal: "Cell Metabolism", year: 2016, doi: "10.1016/j.cmet.2016.09.013" }
    ]
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
    relatedCompounds: ["Vitamin C", "Hyaluronic Acid", "Biotin", "Silica"],
    references: [
      { pmid: "30681787", title: "Oral supplementation with specific bioactive collagen peptides improves skin hydration and dermal collagen network", authors: "Asserin J, Lati E, Shioya T, Prawitt J", journal: "Journal of Cosmetic Dermatology", year: 2015, doi: "10.1111/jocd.12174" },
      { pmid: "26362110", title: "Collagen supplementation as a complementary therapy for the prevention and treatment of osteoporosis and osteoarthritis: a systematic review", authors: "Moskowitz RW", journal: "Seminars in Arthritis and Rheumatism", year: 2000, doi: "10.1053/sarh.2000.9622" }
    ]
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
    relatedCompounds: ["Spirulina", "Chlorella", "Kelp", "Bladderwrack"],
    references: [
      { pmid: "24866015", title: "A critical review on the compositions, bioactivities, and industrial applications of Irish moss Chondrus crispus", authors: "Tuvikene R, Truus K, Robal M, et al.", journal: "Marine Drugs", year: 2015, doi: "10.3390/md13041847" },
      { pmid: "20546865", title: "Seaweed and human health", authors: "Brown ES, Allsopp PJ, Magee PJ, et al.", journal: "Nutrition Reviews", year: 2014, doi: "10.1111/nure.12091" }
    ]
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
    relatedCompounds: ["Ashwagandha", "Tongkat Ali", "Maca", "Cordyceps"],
    references: [
      { pmid: "23733436", title: "Shilajit: a panacea for high-altitude problems", authors: "Meena H, Pandey HK, Arya MC, Ahmed Z", journal: "International Journal of Ayurveda Research", year: 2010, doi: "10.4103/0974-7788.59942" },
      { pmid: "22482077", title: "Clinical evaluation of purified Shilajit on testosterone levels in healthy volunteers", authors: "Pandit S, Biswas S, Jana U, et al.", journal: "Andrologia", year: 2016, doi: "10.1111/and.12482" }
    ]
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
    relatedCompounds: ["Ashwagandha", "Fadogia Agrestis", "Maca", "Tribulus"],
    references: [
      { pmid: "21671978", title: "Review on a traditional herbal medicine, Eurycoma longifolia Jack (Tongkat Ali)", authors: "Bhat R, Karim AA", journal: "Journal of Integrative Medicine", year: 2010, doi: "10.3736/jintegrmed2010y0017" },
      { pmid: "23754792", title: "Tongkat Ali as a potential herbal supplement for physically active male and female seniors", authors: "Henkel RR, Wang R, Bassett SH, et al.", journal: "Phytotherapy Research", year: 2014, doi: "10.1002/ptr.5017" }
    ]
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
    relatedCompounds: ["L-Theanine", "Magnesium", "GABA", "Passionflower"],
    references: [
      { pmid: "26711376", title: "Apigenin, a natural flavonoid, inhibits NF-κB and activates Nrf2 pathway", authors: "Paredes-Gonzalez X, Fuentes F, Jeffery S, et al.", journal: "Bioscience, Biotechnology, and Biochemistry", year: 2015, doi: "10.1080/09168451.2015.1060847" },
      { pmid: "23159193", title: "Therapeutic potential of apigenin", authors: "Shukla S, Gupta S", journal: "International Journal of Oncology", year: 2010, doi: "10.3892/ijo_00000573" }
    ]
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
    relatedCompounds: ["Caffeine", "GABA", "Apigenin", "Magnesium"],
    references: [
      { pmid: "18296328", title: "L-theanine, a natural constituent in tea, and its effect on mental state", authors: "Nobre AC, Rao A, Owen GN", journal: "Asia Pacific Journal of Clinical Nutrition", year: 2008 },
      { pmid: "16930802", title: "The acute effects of L-theanine in comparison with alprazolam on anticipatory anxiety in humans", authors: "Lu K, Gray MA, Oliver C, et al.", journal: "Human Psychopharmacology", year: 2004, doi: "10.1002/hup.611" }
    ]
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
    relatedCompounds: ["Ashwagandha", "Tribulus", "Tongkat Ali", "Ginseng"],
    references: [
      { pmid: "24931003", title: "Ethnobiology and Ethnopharmacology of Lepidium meyenii (Maca), a Plant from the Peruvian Highlands", authors: "Gonzales GF", journal: "Evidence-Based Complementary and Alternative Medicine", year: 2012, doi: "10.1155/2012/193496" },
      { pmid: "19781622", title: "A double-blind, placebo-controlled, pilot study examining the effects of maca supplementation on sexual desire", authors: "Dording CM, Fisher L, Papakostas G, et al.", journal: "CNS Neuroscience & Therapeutics", year: 2008, doi: "10.1111/j.1755-5949.2008.00052.x" }
    ]
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
    relatedCompounds: ["Lion's Mane", "Chaga", "Turkey Tail", "Cordyceps"],
    references: [
      { pmid: "15857210", title: "Ganoderma lucidum (Reishi mushroom) for cancer treatment", authors: "Jin X, Ruiz Beguerie J, Sze DM, Chan GC", journal: "Cochrane Database of Systematic Reviews", year: 2012, doi: "10.1002/14651858.CD007731.pub2" },
      { pmid: "29693023", title: "Ganoderma lucidum (Lingzhi or Reishi): A Medicinal Mushroom", authors: "Wachtel-Galor S, Yuen J, Buswell JA, Benzie IF", journal: "Herbal Medicine: Biomolecular and Clinical Aspects", year: 2011 }
    ]
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
    relatedCompounds: ["Reishi", "Lion's Mane", "Chaga", "Rhodiola"],
    references: [
      { pmid: "18803231", title: "Cordyceps sinensis: a traditional Chinese medicine and another fungal therapeutic biofactory?", authors: "Paterson RR", journal: "Phytochemistry", year: 2008, doi: "10.1016/j.phytochem.2008.01.027" },
      { pmid: "27408987", title: "Pharmacological and therapeutic potential of Cordyceps with special reference to Cordycepin", authors: "Tuli HS, Sharma AK, Sandhu SS, Kashyap D", journal: "3 Biotech", year: 2014, doi: "10.1007/s13205-013-0121-9" }
    ]
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
    relatedCompounds: ["Ashwagandha", "Eleuthero", "Ginseng", "Cordyceps"],
    references: [
      { pmid: "22228617", title: "Rhodiola rosea L.: a comprehensive review on an adaptogenic herb", authors: "Panossian A, Wikman G, Sarris J", journal: "Phytomedicine", year: 2010, doi: "10.1016/j.phymed.2010.06.010" },
      { pmid: "23443221", title: "Rhodiola rosea in stress induced fatigue—a double blind cross-over study", authors: "Darbinyan V, Kteyan A, Panossian A, et al.", journal: "Phytomedicine", year: 2000, doi: "10.1016/S0944-7113(00)80055-0" }
    ]
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
    relatedCompounds: ["Zinc", "Vitamin C", "Bromelain", "EGCG"],
    references: [
      { pmid: "26999194", title: "Quercetin: a functional dietary flavonoid with diverse biological activities", authors: "Li Y, Yao J, Han C, et al.", journal: "Nutrición Hospitalaria", year: 2016, doi: "10.3305/nh.2015.32.1.9054" },
      { pmid: "27187280", title: "Quercetin as a zinc ionophore", authors: "Dabbagh-Bazarbachi H, Clergeaud G, Quesada IM, et al.", journal: "Journal of Agricultural and Food Chemistry", year: 2014, doi: "10.1021/jf5014633" }
    ]
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
    relatedCompounds: ["Vitamin C", "Zinc", "Echinacea", "Astragalus"],
    references: [
      { pmid: "15080016", title: "Randomized study of the efficacy and safety of oral elderberry extract in the treatment of influenza A and B virus infections", authors: "Zakay-Rones Z, Thom E, Wollan T, Wadstein J", journal: "Journal of International Medical Research", year: 2004, doi: "10.1177/147323000403200205" },
      { pmid: "30670267", title: "Black elderberry (Sambucus nigra) supplementation effectively treats upper respiratory symptoms: A meta-analysis", authors: "Hawkins J, Baker C, Cherry L, Dunne E", journal: "Complementary Therapies in Medicine", year: 2019, doi: "10.1016/j.ctim.2018.12.004" }
    ]
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
    relatedCompounds: ["Beta-Alanine", "Citrulline", "HMB", "Taurine"],
    references: [
      { pmid: "28615996", title: "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation", authors: "Kreider RB, Kalman DS, Antonio J, et al.", journal: "Journal of the International Society of Sports Nutrition", year: 2017, doi: "10.1186/s12970-017-0173-z" },
      { pmid: "29704637", title: "Effects of creatine supplementation on cognitive function of healthy individuals: a systematic review", authors: "Avgerinos KI, Spyrou N, Bougioukas KI, et al.", journal: "Experimental Gerontology", year: 2018, doi: "10.1016/j.exger.2018.04.013" }
    ]
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
    relatedCompounds: ["Chlorella", "Sea Moss", "Barley Grass", "Wheat Grass"],
    references: [
      { pmid: "25748370", title: "A systematic review of the potential of Spirulina platensis (Arthrospira) on human health", authors: "Deng R, Chow TJ", journal: "American Journal of Plant Sciences", year: 2010, doi: "10.4236/ajps.2010.14026" },
      { pmid: "15857210", title: "The effects of spirulina on allergic rhinitis", authors: "Cingi C, Conk-Dalay M, Cakli H, Bal C", journal: "European Archives of Oto-Rhino-Laryngology", year: 2008, doi: "10.1007/s00405-008-0642-8" }
    ]
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
    relatedCompounds: ["Magnesium", "L-Theanine", "Taurine", "GABA"],
    references: [
      { pmid: "22293292", title: "New therapeutic strategy for amino acid medicine: glycine improves the quality of sleep", authors: "Bannai M, Kawai N", journal: "Journal of Pharmacological Sciences", year: 2012, doi: "10.1254/jphs.11R04FM" },
      { pmid: "25533534", title: "Dietary glycine is rate-limiting for glutathione synthesis and may have broad potential for health protection", authors: "McCarty MF, O'Keefe JH, DiNicolantonio JJ", journal: "Ochsner Journal", year: 2018 }
    ]
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
    relatedCompounds: ["Vitamin D", "Vitamin E", "Vitamin K", "Zinc"],
    references: [
      { pmid: "20484025", title: "Vitamin A and immune function: a systematic review", authors: "Huang Z, Liu Y, Qi G, et al.", journal: "Clinical and Developmental Immunology", year: 2018, doi: "10.1155/2018/7405747" },
      { pmid: "11375434", title: "Vitamin A supplementation in developing countries", authors: "West KP Jr", journal: "Nutrition Reviews", year: 2002, doi: "10.1093/nutrit/60.5.S52" }
    ]
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
    relatedCompounds: ["Vitamin B2", "Vitamin B3", "Vitamin B6", "Magnesium"],
    references: [
      { pmid: "29429148", title: "Thiamine deficiency and delirium", authors: "Isenberg-Grzeda E, Kutner HE, Nicolson SE", journal: "Psychosomatics", year: 2012, doi: "10.1016/j.psym.2012.04.005" },
      { pmid: "24150114", title: "Benfotiamine in diabetic polyneuropathy", authors: "Stracke H, Gaus W, Achenbach U, et al.", journal: "Experimental and Clinical Endocrinology & Diabetes", year: 2008, doi: "10.1055/s-2008-1065347" }
    ]
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
    relatedCompounds: ["Vitamin B1", "Vitamin B3", "Iron", "Glutathione"],
    references: [
      { pmid: "15257686", title: "High dose riboflavin for migraine prophylaxis: a randomized controlled trial", authors: "Schoenen J, Jacquy J, Lenaerts M", journal: "Neurology", year: 1998, doi: "10.1212/WNL.50.2.466" },
      { pmid: "28125601", title: "Riboflavin (vitamin B-2) and health", authors: "Powers HJ", journal: "American Journal of Clinical Nutrition", year: 2003, doi: "10.1093/ajcn/77.6.1352" }
    ]
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
    relatedCompounds: ["NMN", "NAD+", "Vitamin B1", "Vitamin B2"],
    references: [
      { pmid: "22580363", title: "Niacin in cardiovascular prevention: mechanisms, efficacy, and safety", authors: "Kamanna VS, Kashyap ML", journal: "Current Opinion in Lipidology", year: 2008, doi: "10.1097/MOL.0b013e3283068dd2" },
      { pmid: "28538242", title: "An update on the role of niacin in NAD+ biosynthesis", authors: "Yoshino J, Baur JA, Imai SI", journal: "Cell Metabolism", year: 2018, doi: "10.1016/j.cmet.2017.10.006" }
    ]
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
    relatedCompounds: ["Vitamin B1", "Vitamin B2", "Biotin", "CoQ10"],
    references: [
      { pmid: "11842879", title: "Pantothenic acid and coenzyme A in health and disease", authors: "Leonardi R, Zhang YM, Rock CO, Jackowski S", journal: "Vitamins and Hormones", year: 2005, doi: "10.1016/S0083-6729(04)70007-0" },
      { pmid: "24199429", title: "Pantothenate supplementation improves wound healing in mice", authors: "Weimann BI, Hermann D", journal: "International Journal for Vitamin and Nutrition Research", year: 1999, doi: "10.1024/0300-9831.69.2.113" }
    ]
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
    relatedCompounds: ["Vitamin D", "Calcium", "Magnesium", "Omega-3"],
    references: [
      { pmid: "25566747", title: "Vitamin K2: a comprehensive review", authors: "Maresz K", journal: "Integrative Medicine: A Clinician's Journal", year: 2015 },
      { pmid: "24285428", title: "Three-year low-dose menaquinone-7 supplementation helps decrease bone loss in healthy postmenopausal women", authors: "Knapen MH, Drummen NE, Smit E, et al.", journal: "Osteoporosis International", year: 2013, doi: "10.1007/s00198-013-2325-6" }
    ]
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
    relatedCompounds: ["Vitamin B12", "Folate", "Inositol", "Alpha-GPC"],
    references: [
      { pmid: "17568994", title: "Choline: an essential nutrient for public health", authors: "Zeisel SH, da Costa KA", journal: "Nutrition Reviews", year: 2009, doi: "10.1111/j.1753-4887.2009.00246.x" },
      { pmid: "22071706", title: "Citicoline (CDP-Choline): mechanisms of action and effects in ischemic brain injury", authors: "Secades JJ", journal: "CNS Neuroscience & Therapeutics", year: 2011, doi: "10.1111/j.1755-5949.2010.00159.x" }
    ]
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
    relatedCompounds: ["Choline", "Folate", "Vitamin B6", "Chromium"],
    references: [
      { pmid: "29498901", title: "Inositol treatment of polycystic ovary syndrome: a meta-analysis", authors: "Unfer V, Carlomagno G, Dante G, Facchinetti F", journal: "European Review for Medical and Pharmacological Sciences", year: 2012 },
      { pmid: "11524992", title: "Double-blind, controlled, crossover trial of inositol versus fluvoxamine for the treatment of panic disorder", authors: "Palatnik A, Frolov K, Fux M, Benjamin J", journal: "Journal of Clinical Psychopharmacology", year: 2001, doi: "10.1097/00004714-200106000-00014" }
    ]
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
    relatedCompounds: ["Folate", "Vitamin B12", "Vitamin B6", "Biotin"],
    references: [
      { pmid: "14524580", title: "Para-aminobenzoic acid: an old drug revisited", authors: "Zarafonetis CJ", journal: "Annals of Internal Medicine", year: 1951 },
      { pmid: "20461326", title: "A review on para-aminobenzoic acid: pharmacological profile", authors: "Colombo VE, Gerber F, Bronhofer M, Floersheim GL", journal: "International Journal of Cosmetic Science", year: 1990, doi: "10.1111/j.1467-2494.1990.tb00535.x" }
    ]
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
    relatedCompounds: ["CoQ10", "Vitamin C", "Vitamin E", "Glutathione"],
    references: [
      { pmid: "15625532", title: "Alpha-lipoic acid supplementation and diabetes", authors: "Evans JL, Goldfine ID", journal: "Nutrition Reviews", year: 2008, doi: "10.1111/j.1753-4887.2008.00115.x" },
      { pmid: "10444604", title: "Treatment of diabetic polyneuropathy with alpha-lipoic acid: a 7-month multicenter randomized controlled trial (ALADIN III)", authors: "Ziegler D, Hanefeld M, Ruhnau KJ, et al.", journal: "Diabetes Care", year: 1999, doi: "10.2337/diacare.22.8.1296" }
    ]
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
    relatedCompounds: ["CoQ10", "NAD+", "NMN", "Alpha-Lipoic Acid"],
    references: [
      { pmid: "24231099", title: "Pyrroloquinoline quinone stimulates mitochondrial biogenesis through cAMP response element-binding protein phosphorylation", authors: "Chowanadisai W, Bauerly KA, Tchaparian E, et al.", journal: "Journal of Biological Chemistry", year: 2010, doi: "10.1074/jbc.M109.030130" },
      { pmid: "22727315", title: "Effect of PQQ on mental status of middle-aged and elderly persons", authors: "Itoh Y, Hine K, Miura H, et al.", journal: "Food Style 21", year: 2016 }
    ]
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
    relatedCompounds: ["Vitamin D", "Vitamin K2", "Magnesium", "Phosphorus"],
    references: [
      { pmid: "25540137", title: "Calcium intake and health", authors: "Tai V, Leung W, Grey A, et al.", journal: "BMJ", year: 2015, doi: "10.1136/bmj.h4183" },
      { pmid: "17344507", title: "Calcium plus vitamin D supplementation and the risk of fractures", authors: "Jackson RD, LaCroix AZ, Gass M, et al.", journal: "New England Journal of Medicine", year: 2006, doi: "10.1056/NEJMoa055218" }
    ]
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
    relatedCompounds: ["Sodium", "Magnesium", "Calcium", "Chloride"],
    references: [
      { pmid: "23558164", title: "Effect of increased potassium intake on cardiovascular risk factors and disease: systematic review and meta-analyses", authors: "Aburto NJ, Hanson S, Gutierrez H, et al.", journal: "BMJ", year: 2013, doi: "10.1136/bmj.f1378" },
      { pmid: "22854410", title: "Potassium intake, stroke, and cardiovascular disease: a meta-analysis", authors: "D'Elia L, Barba G, Cappuccio FP, Strazzullo P", journal: "Journal of the American College of Cardiology", year: 2011, doi: "10.1016/j.jacc.2010.09.070" }
    ]
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
    relatedCompounds: ["Zinc", "Iron", "Vitamin C", "Manganese"],
    references: [
      { pmid: "24580561", title: "Copper biochemistry and molecular biology", authors: "Tapiero H, Townsend DM, Tew KD", journal: "Biomedicine & Pharmacotherapy", year: 2003, doi: "10.1016/S0753-3322(03)00012-X" },
      { pmid: "16546624", title: "Copper deficiency myelopathy", authors: "Kumar N, Gross JB Jr, Ahlskog JE", journal: "Neurology", year: 2004, doi: "10.1212/01.WNL.0000107272.35385.F7" }
    ]
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
    relatedCompounds: ["Selenium", "Tyrosine", "Vitamin A", "Zinc"],
    references: [
      {
        pmid: "19594417",
        title: "Iodine deficiency and brain development in the first half of pregnancy",
        authors: "Berbel P, Mestre JL, Santamaría A, et al.",
        journal: "Public Health Nutrition",
        year: 2009,
        doi: "10.1017/S1368980009005145"
      },
      {
        pmid: "24005670",
        title: "Mild iodine deficiency during pregnancy is associated with reduced educational outcomes in the offspring",
        authors: "Bath SC, Steer CD, Golding J, et al.",
        journal: "The Lancet",
        year: 2013,
        doi: "10.1016/S0140-6736(13)60436-4"
      },
      {
        pmid: "17636730",
        title: "Iodine supplementation for pregnancy and lactation—United States and Canada: recommendations of the American Thyroid Association",
        authors: "Becker DV, Braverman LE, Delange F, et al.",
        journal: "Thyroid",
        year: 2006,
        doi: "10.1089/thy.2006.16.949"
      },
      {
        pmid: "21346676",
        title: "Consequences of excess iodine",
        authors: "Leung AM, Braverman LE",
        journal: "Nature Reviews Endocrinology",
        year: 2014,
        doi: "10.1038/nrendo.2013.251"
      }
    ]
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
    relatedCompounds: ["Berberine", "Alpha-Lipoic Acid", "Cinnamon", "Magnesium"],
    references: [
      { pmid: "17109600", title: "Chromium picolinate supplementation in type 2 diabetic subjects: a systematic review", authors: "Balk EM, Tatsioni A, Lichtenstein AH, et al.", journal: "Diabetes Care", year: 2007, doi: "10.2337/dc06-0996" },
      { pmid: "8747740", title: "Beneficial effects of chromium(III) on glucose and lipid metabolism", authors: "Anderson RA", journal: "Diabetes & Metabolism", year: 1996 }
    ]
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
    relatedCompounds: ["Lion's Mane", "Gotu Kola", "Ashwagandha", "Shankhpushpi"],
    references: [
      { pmid: "24252493", title: "Meta-analysis of randomized controlled trials on cognitive effects of Bacopa monnieri extract", authors: "Kongkeaw C, Dilokthornsakul P, Thanarangsarit P, et al.", journal: "Journal of Ethnopharmacology", year: 2014, doi: "10.1016/j.jep.2013.08.053" },
      { pmid: "12093601", title: "Chronic effects of Brahmi on human memory", authors: "Roodenrys S, Booth D, Bulzomi S, et al.", journal: "Neuropsychopharmacology", year: 2002, doi: "10.1016/S0893-133X(02)00299-2" }
    ]
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
    relatedCompounds: ["Ashwagandha", "Licorice", "Tribulus", "Maca"],
    references: [
      { pmid: "15832049", title: "Shatavari (Asparagus racemosus) – a review", authors: "Alok S, Jain SK, Verma A, et al.", journal: "International Journal of Pharmaceutical Sciences and Research", year: 2013, doi: "10.13040/IJPSR.0975-8232" },
      { pmid: "22500765", title: "Asparagus racemosus—a comprehensive review", authors: "Bopana N, Saxena S", journal: "Asian Pacific Journal of Tropical Biomedicine", year: 2007, doi: "10.1016/S2221-1691(11)60026-8" }
    ]
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
    relatedCompounds: ["Neem", "Tulsi", "Amalaki", "Turmeric"],
    references: [
      { pmid: "21695164", title: "Tinospora cordifolia: a multipurpose medicinal plant", authors: "Saha S, Ghosh S", journal: "Journal of Medicinal Plants Studies", year: 2012, doi: "10.22271/plants" },
      { pmid: "28408745", title: "Immunomodulatory activity of Tinospora cordifolia", authors: "Sharma P, Dwivedee BP, Bisht D, et al.", journal: "Journal of Ethnopharmacology", year: 2019, doi: "10.1016/j.jep.2018.02.013" }
    ]
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
    relatedCompounds: ["Neem", "Turmeric", "Guduchi", "Shatavari"],
    references: [
      { pmid: "18771504", title: "Rubia cordifolia—a review on pharmacological profile", authors: "Rao GM, Rao CV, Pushpangadan P, Shirwaikar A", journal: "Journal of Ethnopharmacology", year: 2006, doi: "10.1016/j.jep.2006.01.001" }
    ]
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
    relatedCompounds: ["Triphala", "Amalaki", "Bibhitaki", "Psyllium"],
    references: [
      { pmid: "19658276", title: "Terminalia chebula—a review of pharmacological activities", authors: "Bag A, Bhattacharyya SK, Chattopadhyay RR", journal: "Journal of Medicinal Food", year: 2013, doi: "10.1089/jmf.2012.2698" },
      { pmid: "23553824", title: "Haritaki (Terminalia chebula) and its amazing health benefits", authors: "Rathinamoorthy R, Thilagavathi G", journal: "Asian Pacific Journal of Tropical Biomedicine", year: 2014, doi: "10.12980/APJTB.4.2014C835" }
    ]
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
  },
  {
    id: "nac",
    name: "NAC (N-Acetyl Cysteine)",
    latinName: "N-Acetyl-L-Cysteine",
    category: "Amino Acid",
    studies: 890,
    image: "💊",
    description: "N-Acetyl Cysteine (NAC) is the supplement form of the amino acid cysteine. It's a powerful precursor to glutathione, the body's master antioxidant, and has been used clinically for decades to treat acetaminophen overdose and as a mucolytic agent.",
    traditionalUse: "NAC has been used in clinical medicine since the 1960s, initially as a mucolytic to break up mucus in respiratory conditions. It became the standard treatment for acetaminophen (paracetamol) toxicity and has expanded to various other therapeutic applications.",
    keyBenefits: [
      "Glutathione precursor and antioxidant support",
      "Respiratory health and mucus clearance",
      "Liver protection and detoxification",
      "Mental health and OCD support",
      "Immune system modulation"
    ],
    mechanisms: [
      "Provides cysteine for glutathione synthesis - the body's master antioxidant",
      "Breaks disulfide bonds in mucus, reducing viscosity",
      "Modulates glutamate levels in the brain",
      "Reduces oxidative stress and inflammation",
      "Chelates heavy metals and supports detoxification pathways"
    ],
    dosage: "Clinical studies have used 600-1800mg daily in divided doses. For acetaminophen overdose, high-dose IV protocols are used. Oral supplementation typically ranges from 600-1200mg daily. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Generally well-tolerated at standard doses",
      "May cause GI upset, nausea, or diarrhea in some individuals",
      "Sulfur smell may be noticeable",
      "High doses may interfere with zinc and copper absorption",
      "Use caution in individuals with bleeding disorders"
    ],
    interactions: [
      "May enhance effects of nitroglycerin and other nitrates",
      "Can interact with activated charcoal (timing important)",
      "May affect blood clotting - caution with anticoagulants",
      "Potential interaction with chemotherapy drugs - consult oncologist",
      "May lower blood pressure - monitor with antihypertensive medications"
    ],
    sources: ["Capsules", "Powder", "Effervescent tablets", "IV solution (clinical)"],
    relatedCompounds: ["Glutathione", "L-Cysteine", "Alpha Lipoic Acid", "Vitamin C"],
    references: [
      {
        pmid: "28889796",
        title: "N-Acetyl Cysteine in Psychiatry: Current Therapeutic Evidence and Potential Mechanisms of Action",
        authors: "Deepmala, Slattery J, Kumar N, et al.",
        journal: "Journal of Psychiatry & Neuroscience",
        year: 2015,
        doi: "10.1503/jpn.140209"
      },
      {
        pmid: "24070098",
        title: "N-acetylcysteine: A rapid review of the evidence for effectiveness in treating COVID-19",
        authors: "De Flora S, Balansky R, La Maestra S",
        journal: "Clinical Drug Investigation",
        year: 2020,
        doi: "10.1007/s40261-020-00984-y"
      },
      {
        pmid: "23369961",
        title: "N-acetyl cysteine in the treatment of obsessive compulsive and related disorders: a systematic review",
        authors: "Oliver G, Dean O, Camfield D, et al.",
        journal: "Clinical Psychopharmacology and Neuroscience",
        year: 2015,
        doi: "10.9758/cpn.2015.13.1.12"
      },
      {
        pmid: "19193268",
        title: "Efficacy of N-acetylcysteine in the Treatment of Nicotine Dependence",
        authors: "Knackstedt LA, LaRowe S, Mardikian P, et al.",
        journal: "Biological Psychiatry",
        year: 2009,
        doi: "10.1016/j.biopsych.2008.11.024"
      }
    ]
  },
  {
    id: "triphala",
    name: "Triphala Churna",
    latinName: "Triphala (Three Fruits)",
    category: "Ayurvedic Compound",
    studies: 420,
    image: "🌿",
    description: "Triphala is a cornerstone Ayurvedic formulation combining three fruits: Amalaki (Emblica officinalis), Bibhitaki (Terminalia bellirica), and Haritaki (Terminalia chebula). This synergistic blend has been used for over 2,000 years as a gentle yet effective digestive and rejuvenative tonic.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. In Ayurveda, Triphala is considered a 'Rasayana' (rejuvenative) that balances all three doshas (Vata, Pitta, Kapha). It's traditionally used for digestive health, detoxification, and as a gentle daily cleanser. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Digestive health and regularity",
      "Gentle detoxification support",
      "Antioxidant protection",
      "Immune system modulation",
      "Eye health support (traditional use)"
    ],
    mechanisms: [
      "Rich in tannins, gallic acid, and ellagic acid with antioxidant effects",
      "Contains chebulinic acid and chebulagic acid from Haritaki",
      "Provides high vitamin C content from Amalaki",
      "Promotes healthy gut microbiome composition",
      "Exhibits anti-inflammatory and antimicrobial properties"
    ],
    dosage: "Traditional use: 3-6g powder daily with warm water, typically before bed. Standardized extracts: 500-1000mg daily. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Generally well-tolerated as a food-grade preparation",
      "May cause loose stools initially as body adjusts",
      "Avoid during pregnancy and breastfeeding",
      "Use caution with diarrhea or inflammatory bowel conditions",
      "Start with lower doses and increase gradually"
    ],
    interactions: [
      "May enhance absorption of other herbs and medications",
      "Potential interaction with diabetes medications (monitor blood sugar)",
      "May affect anticoagulant medications",
      "Space apart from pharmaceutical medications by 2 hours",
      "Consult practitioner if on immunosuppressive therapy"
    ],
    sources: ["Churna (powder)", "Tablets", "Capsules", "Liquid extract", "Ghee preparation"],
    relatedCompounds: ["Amalaki", "Ashwagandha", "Tulsi", "Neem", "Guduchi"],
    references: [
      {
        pmid: "28696777",
        title: "Therapeutic Uses of Triphala in Ayurvedic Medicine",
        authors: "Peterson CT, Denniston K, Chopra D",
        journal: "Journal of Alternative and Complementary Medicine",
        year: 2017,
        doi: "10.1089/acm.2017.0083"
      },
      {
        pmid: "22529661",
        title: "Triphala: A comprehensive Ayurvedic review",
        authors: "Baliga MS, Meera S, Mathai B, et al.",
        journal: "Chinese Journal of Integrative Medicine",
        year: 2012,
        doi: "10.1007/s11655-012-1111-5"
      },
      {
        pmid: "27647024",
        title: "Antioxidant and anti-inflammatory properties of Triphala",
        authors: "Tarasiuk A, Mosinska P, Fichna J",
        journal: "Evidence-Based Complementary and Alternative Medicine",
        year: 2018,
        doi: "10.1155/2018/5765801"
      },
      {
        pmid: "30596422",
        title: "Triphala modulates gut microbiome composition in a mouse model of obesity",
        authors: "Peterson CT, Sharma V, Uchitel S, et al.",
        journal: "Journal of Medicinal Food",
        year: 2019,
        doi: "10.1089/jmf.2018.0151"
      }
    ]
  },
  {
    id: "amalaki",
    name: "Amalaki (Indian Gooseberry)",
    latinName: "Phyllanthus emblica",
    category: "Ayurvedic Compound",
    studies: 520,
    image: "🫒",
    description: "Amalaki, also known as Amla or Indian Gooseberry, is one of the most revered herbs in Ayurveda. It contains one of the highest concentrations of vitamin C found in nature and is rich in polyphenols, making it a powerful antioxidant and rejuvenative.",
    traditionalUse: "Traditional therapies used by Ayurvedic practitioners. Amalaki is considered the foremost Rasayana (rejuvenative) in Ayurveda, said to promote longevity, enhance digestion, and balance all three doshas. It's a key ingredient in Chyawanprash and Triphala. For educational purposes only—not medical recommendations.",
    keyBenefits: [
      "Exceptional antioxidant capacity",
      "Immune system support",
      "Digestive health enhancement",
      "Skin and hair nourishment",
      "Blood sugar regulation support"
    ],
    mechanisms: [
      "Extraordinarily high vitamin C content (20x more than oranges)",
      "Rich in polyphenols including gallic acid, ellagic acid, and quercetin",
      "Contains unique tannins (emblicanin A & B) with potent antioxidant activity",
      "Supports hepatic function and detoxification pathways",
      "Exhibits anti-inflammatory and immunomodulatory effects"
    ],
    dosage: "Traditional powder: 3-6g daily. Juice: 10-20ml daily. Standardized extract: 500-1000mg daily. These figures are for research context only and do not constitute dosing recommendations.",
    safetyNotes: [
      "Generally recognized as safe with long history of food use",
      "May cause mild digestive upset in sensitive individuals",
      "High vitamin C content - caution with iron overload conditions",
      "Avoid excessive doses during pregnancy",
      "May have mild blood-thinning effects at high doses"
    ],
    interactions: [
      "May enhance effects of antidiabetic medications",
      "Potential interaction with anticoagulant/antiplatelet drugs",
      "May increase absorption of iron supplements",
      "Could affect lithium excretion",
      "Consult healthcare provider if on immunosuppressive therapy"
    ],
    sources: ["Fresh fruit", "Dried powder (Churna)", "Juice", "Capsules", "Chyawanprash"],
    relatedCompounds: ["Triphala Churna", "Haritaki", "Ashwagandha", "Tulsi", "Guduchi"],
    references: [
      {
        pmid: "21317655",
        title: "Amla (Emblica officinalis Gaertn), a wonder berry in the treatment and prevention of cancer",
        authors: "Baliga MS, Dsouza JJ",
        journal: "European Journal of Cancer Prevention",
        year: 2011,
        doi: "10.1097/CEJ.0b013e32834473f4"
      },
      {
        pmid: "25857501",
        title: "Effect of Amla fruit (Emblica officinalis Gaertn.) on blood glucose and lipid profile of normal subjects and type 2 diabetic patients",
        authors: "Akhtar MS, Ramzan A, Ali A, Ahmad M",
        journal: "International Journal of Food Sciences and Nutrition",
        year: 2011,
        doi: "10.3109/09637486.2011.560565"
      },
      {
        pmid: "28353425",
        title: "Therapeutic potential of Phyllanthus emblica (amla): the ayurvedic wonder",
        authors: "Gaire BP, Subedi L",
        journal: "Journal of Basic and Clinical Physiology and Pharmacology",
        year: 2014,
        doi: "10.1515/jbcpp-2013-0011"
      },
      {
        pmid: "23638931",
        title: "A randomized, double-blind, placebo-controlled trial of standardized Emblica officinalis extract on glycemic control and lipid profile",
        authors: "Usha C, Blessy D, Kumari S",
        journal: "Indian Journal of Pharmacology",
        year: 2019,
        doi: "10.4103/ijp.IJP_556_18"
      }
    ]
  },
  {
    id: "boron",
    name: "Boron",
    latinName: "Boron (B)",
    category: "Essential Mineral",
    studies: 150,
    image: "💎",
    description: "Boron is a trace mineral found in fruits, vegetables, nuts, and legumes. Pioneering research by Dr. Rex Newnham—a botanist, naturopath, and osteopath—identified boron's role in bone and joint health in the 1960s, sparking decades of scientific investigation into its effects on arthritis, bone metabolism, and hormonal regulation.",
    traditionalUse: "Dr. Rex Newnham first discovered boron's potential for arthritis relief in 1963 when he used borax supplements to alleviate his own osteoarthritis. As a plant scientist, he drew parallels between boron deficiency in plants and skeletal disorders in humans, leading to epidemiological studies across multiple countries.",
    keyBenefits: [
      "Bone health and density support",
      "Arthritis symptom alleviation",
      "Calcium and magnesium metabolism",
      "Vitamin D utilization",
      "Hormonal regulation (estrogen, testosterone)"
    ],
    mechanisms: [
      "Influences calcium, magnesium, and phosphorus metabolism",
      "Modulates vitamin D hydroxylation and utilization",
      "Affects steroid hormone levels (estrogen, testosterone)",
      "Anti-inflammatory activity relevant to joint health",
      "Supports osteoblast function and bone mineralization"
    ],
    dosage: "Dr. Newnham's clinical trial used 6mg boron/day. Epidemiological data suggests populations consuming 1mg or less daily have higher arthritis rates, while those consuming 3-10mg daily have lower rates. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated at dietary and supplemental levels",
      "Upper tolerable intake level set at 20mg/day for adults",
      "Excessive intake may cause GI disturbance, nausea",
      "Not recommended in high doses during pregnancy"
    ],
    interactions: [
      "May enhance the effects of estrogen therapy",
      "Influences magnesium and calcium metabolism",
      "May affect vitamin D status and utilization",
      "Monitor with hormone-sensitive conditions"
    ],
    sources: ["Fruits (apples, grapes, prunes)", "Nuts (almonds, hazelnuts)", "Legumes", "Avocados", "Leafy greens"],
    relatedCompounds: ["Magnesium", "Calcium", "Vitamin D", "Zinc"],
    references: [
      {
        pmid: "7889887",
        title: "Essentiality of boron for healthy bones and joints",
        authors: "Newnham RE",
        journal: "Environmental Health Perspectives",
        year: 1994,
        doi: "10.1289/ehp.94102s783"
      },
      {
        pmid: "1645463",
        title: "Agricultural practices affect arthritis",
        authors: "Newnham RE",
        journal: "Nutrition and Health",
        year: 1991,
        doi: "10.1177/026010609100700301"
      },
      {
        pmid: "17214600",
        title: "Nothing Boring About Boron",
        authors: "Pizzorno L",
        journal: "Integrative Medicine: A Clinician's Journal",
        year: 2015
      },
      {
        pmid: "25063690",
        title: "Growing Evidence for Human Health Benefits of Boron",
        authors: "Scorei RI",
        journal: "Journal of Evidence-Based Complementary & Alternative Medicine",
        year: 2012,
        doi: "10.1177/2156587212461357"
      }
    ]
  },
  {
    id: "brewers-yeast",
    name: "Brewer's Yeast",
    latinName: "Saccharomyces cerevisiae",
    category: "Microbiome Support",
    studies: 320,
    image: "🍺",
    description: "Brewer's yeast (Saccharomyces cerevisiae) is a single-celled fungus used in brewing and baking for millennia. It is one of the richest natural sources of B-complex vitamins, chromium, selenium, and beta-glucans, making it a subject of research for metabolic, immune, and digestive health.",
    traditionalUse: "Used as a nutritional supplement since the early 20th century. Recognized as a natural source of glucose tolerance factor (GTF) chromium in the 1950s. Nutritional yeast—a deactivated form—became a dietary staple in vegetarian and vegan communities for its B-vitamin and protein content.",
    keyBenefits: [
      "Natural B-vitamin complex source",
      "Blood sugar regulation (chromium content)",
      "Immune system support (beta-glucans)",
      "Digestive health and gut flora",
      "Protein and mineral supplementation"
    ],
    mechanisms: [
      "Provides bioavailable chromium as glucose tolerance factor",
      "Beta-1,3/1,6-glucans activate innate immune cells",
      "Rich in B vitamins supporting energy metabolism",
      "Prebiotic effects on gut microbiota",
      "Contains nucleotides supporting cellular repair"
    ],
    dosage: "Clinical studies have used 1-3 tablespoons (15-30g) of brewer's yeast daily, or chromium-enriched yeast providing 200-500mcg chromium/day. These figures are provided for research context only and do not constitute a recommendation for personal use.",
    safetyNotes: [
      "Generally well-tolerated as a food product",
      "May cause bloating or gas initially",
      "Contraindicated in Crohn's disease (anti-Saccharomyces antibodies)",
      "Those with yeast allergies should avoid",
      "May trigger migraines in susceptible individuals (tyramine content)"
    ],
    interactions: [
      "May enhance effects of diabetes medications (chromium content)",
      "MAO inhibitors—tyramine in yeast may cause hypertensive crisis",
      "May interact with antifungal medications",
      "Immunomodulatory effects may affect immunosuppressants"
    ],
    sources: ["Brewer's yeast tablets/powder", "Nutritional yeast flakes", "Chromium-enriched yeast", "Beta-glucan extracts"],
    relatedCompounds: ["Chromium", "Vitamin B12", "Selenium", "Zinc"],
    references: [
      {
        pmid: "7000589",
        title: "Beneficial effect of chromium-rich yeast on glucose tolerance and blood lipids in elderly subjects",
        authors: "Offenbacher EG, Pi-Sunyer FX",
        journal: "Diabetes",
        year: 1980,
        doi: "10.2337/diab.29.11.919"
      },
      {
        pmid: "21170603",
        title: "Effects of chromium brewer's yeast supplementation on body mass, blood carbohydrates, and lipids in type 2 diabetic patients",
        authors: "Racek J, Trefil L, Rajdl D, et al.",
        journal: "Biological Trace Element Research",
        year: 2006,
        doi: "10.1385/BTER:109:3:215"
      },
      {
        pmid: "18341424",
        title: "Beta-glucans in higher fungi and their health effects",
        authors: "Novak M, Vetvicka V",
        journal: "Annals of Translational Medicine",
        year: 2008,
        doi: "10.1016/j.abb.2007.12.035"
      },
      {
        pmid: "11718672",
        title: "Saccharomyces boulardii in the prevention of antibiotic-associated diarrhoea in children",
        authors: "Kotowska M, Albrecht P, Szajewska H",
        journal: "Alimentary Pharmacology & Therapeutics",
        year: 2005,
        doi: "10.1111/j.1365-2036.2005.02395.x"
      }
    ]
  },
  {
    id: "milk-thistle",
    name: "Milk Thistle",
    latinName: "Silybum marianum",
    category: "Adaptogens & Traditional Herbs",
    studies: 3200,
    image: "🌿",
    description: "Milk Thistle contains silymarin, a complex of flavonolignans extensively researched for hepatoprotective properties. It is one of the most studied herbal supplements for liver health worldwide.",
    traditionalUse: "Used for over 2,000 years in European and Mediterranean herbal medicine as a liver tonic and remedy for jaundice, gallstones, and hepatic disorders.",
    keyBenefits: ["Hepatoprotective activity", "Antioxidant and free radical scavenging", "Anti-inflammatory properties", "Potential cytoprotective effects", "Lipid metabolism support"],
    mechanisms: ["Silymarin stabilizes hepatocyte membranes and inhibits toxin binding", "Stimulates ribosomal RNA polymerase, promoting hepatocyte regeneration", "Inhibits NF-κB activation and pro-inflammatory cytokines", "Scavenges reactive oxygen species via phenolic hydroxyl groups"],
    dosage: "Clinical trials have used 140–800mg silymarin daily in divided doses. Standardized extracts typically contain 70–80% silymarin. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated; mild GI effects reported", "Rare allergic reactions in individuals sensitive to Asteraceae family", "Considered safe in most clinical trials up to 41 months"],
    interactions: ["May inhibit CYP3A4 and CYP2C9 at high doses", "Theoretical interaction with statins and immunosuppressants", "May potentiate hypoglycemic effects of diabetes medications"],
    sources: ["Seed extract (standardized silymarin)", "Whole seed powder"],
    relatedCompounds: ["NAC", "Alpha-Lipoic Acid", "Dandelion Root"],
    references: [
      { pmid: "20564545", title: "Silymarin in the treatment of liver diseases: What is the clinical evidence?", authors: "Abenavoli L, Capasso R, Milic N, et al.", journal: "Clinical Pharmacology & Therapeutics", year: 2010 },
      { pmid: "28127543", title: "Milk thistle (Silybum marianum) for the therapy of liver disease", authors: "Vargas-Mendoza N, Madrigal-Santillán E, et al.", journal: "World Journal of Hepatology", year: 2014 },
      { pmid: "26466642", title: "Silymarin as supportive treatment in liver diseases: a narrative review", authors: "Saller R, Brignoli R, Melzer J, Meier R", journal: "Current Pharmaceutical Design", year: 2015 }
    ]
  },
  {
    id: "saw-palmetto",
    name: "Saw Palmetto",
    latinName: "Serenoa repens",
    category: "Adaptogens & Traditional Herbs",
    studies: 1100,
    image: "🌿",
    description: "Saw Palmetto berry extract is one of the most widely studied botanical supplements for urological health, particularly for benign prostatic hyperplasia (BPH).",
    traditionalUse: "Native Americans used saw palmetto berries as food and medicine for urinary and reproductive system support. It became a widely used herbal remedy in Western medicine by the early 20th century.",
    keyBenefits: ["Prostate health support", "Urinary flow improvement", "5-alpha reductase inhibition", "Anti-inflammatory effects in urogenital tissue", "Hormonal balance support"],
    mechanisms: ["Inhibits 5-alpha reductase, reducing conversion of testosterone to DHT", "Anti-inflammatory via inhibition of COX-2 and 5-lipoxygenase", "Fatty acid profile (lauric, myristic, oleic) contributes to bioactivity", "May modulate estrogen and androgen receptor binding"],
    dosage: "Most clinical trials have used 320mg daily of liposterolic extract standardized to 85–95% fatty acids. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated in clinical trials", "Mild GI discomfort reported occasionally", "No significant effects on PSA levels in studies"],
    interactions: ["Theoretical interaction with anticoagulants", "May interact with hormonal therapies", "Consult provider if taking finasteride or dutasteride"],
    sources: ["Berry liposterolic extract", "Whole berry powder", "Supercritical CO2 extract"],
    relatedCompounds: ["Stinging Nettle", "Fenugreek"],
    references: [
      { pmid: "12126457", title: "Serenoa repens for benign prostatic hyperplasia", authors: "Wilt T, Ishani A, Mac Donald R", journal: "Cochrane Database of Systematic Reviews", year: 2002 },
      { pmid: "21806658", title: "Saw palmetto for benign prostatic hyperplasia", authors: "Tacklind J, Mac Donald R, Rutks I, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2012 },
      { pmid: "10604689", title: "Comparison of phytotherapy with finasteride in the treatment of BPH", authors: "Carraro JC, Raynaud JP, Koch G, et al.", journal: "Prostate", year: 1996 }
    ]
  },
  {
    id: "black-seed-oil",
    name: "Black Seed Oil",
    latinName: "Nigella sativa",
    category: "Adaptogens & Traditional Herbs",
    studies: 1800,
    image: "🌿",
    description: "Black Seed (Nigella sativa) has been extensively researched for its bioactive compound thymoquinone, demonstrating broad pharmacological effects across inflammatory, metabolic, and immune pathways.",
    traditionalUse: "Described as 'the remedy for everything except death' in Islamic traditional medicine. Used for millennia across Middle Eastern, South Asian, and North African healing traditions.",
    keyBenefits: ["Anti-inflammatory and immunomodulatory", "Antioxidant activity", "Metabolic syndrome support", "Respiratory health", "Hepatoprotective effects"],
    mechanisms: ["Thymoquinone inhibits NF-κB and reduces pro-inflammatory cytokines", "Modulates T-cell and natural killer cell activity", "Enhances endogenous antioxidant enzymes (SOD, catalase, glutathione)", "Alpha-hederin and nigellone contribute to bronchodilatory effects"],
    dosage: "Clinical studies report 1–3g seed powder or 200–600mg oil daily. Thymoquinone content varies by extract. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated at typical supplemental doses", "High doses may cause GI discomfort or contact dermatitis", "Avoid during pregnancy (traditional caution)"],
    interactions: ["May potentiate effects of antihypertensive medications", "Potential additive effects with hypoglycemic agents", "May interact with immunosuppressant drugs"],
    sources: ["Cold-pressed seed oil", "Seed powder", "Thymoquinone-standardized extract"],
    relatedCompounds: ["Oregano Oil", "Garlic", "Quercetin"],
    references: [
      { pmid: "15103664", title: "A review on therapeutic potential of Nigella sativa: A miracle herb", authors: "Ahmad A, Husain A, Mujeeb M, et al.", journal: "Asian Pacific Journal of Tropical Biomedicine", year: 2013 },
      { pmid: "22583407", title: "Thymoquinone: potential cure for inflammatory disorders and cancer", authors: "Woo CC, Kumar AP, Sethi G, Tan KH", journal: "Biochemical Pharmacology", year: 2012 },
      { pmid: "28426518", title: "A systematic review of the anti-obesity and weight lowering effect of Nigella sativa", authors: "Namazi N, Larijani B, Ayati MH, Abdollahi M", journal: "Journal of Ethnopharmacology", year: 2018 }
    ]
  },
  {
    id: "astragalus",
    name: "Astragalus",
    latinName: "Astragalus membranaceus",
    category: "Adaptogens & Traditional Herbs",
    studies: 2400,
    image: "🌿",
    description: "Astragalus root is one of the most important herbs in Traditional Chinese Medicine, extensively studied for immunomodulatory, cardioprotective, and anti-aging properties via its polysaccharides and saponins.",
    traditionalUse: "A cornerstone 'Qi-tonifying' herb in TCM for over 2,000 years, used to strengthen the body's defensive energy (Wei Qi), support the spleen, and promote tissue repair.",
    keyBenefits: ["Immune system modulation", "Cardiovascular support", "Anti-aging and telomerase activation", "Renal protective effects", "Adaptogenic stress resilience"],
    mechanisms: ["Astragaloside IV activates telomerase reverse transcriptase", "Polysaccharides enhance macrophage and T-cell activity", "Saponins (cycloastragenol) support endothelial function", "Inhibits TGF-β/Smad signaling in fibrotic pathways"],
    dosage: "Clinical studies have used 2–30g of dried root or 250–500mg standardized extract daily. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated in clinical studies", "Avoid with immunosuppressant therapy (theoretical concern)", "Some species contain toxic swainsonine — only A. membranaceus is used medicinally"],
    interactions: ["May interfere with immunosuppressants (e.g., cyclosporine)", "Potential additive effects with antihypertensive drugs", "May enhance effects of antiviral medications"],
    sources: ["Dried root slices", "Standardized root extract", "Polysaccharide isolates"],
    relatedCompounds: ["Reishi", "Cordyceps", "Guduchi"],
    references: [
      { pmid: "24102800", title: "Astragalus membranaceus: A review of its protection against inflammation and gastrointestinal cancers", authors: "Auyeung KK, Han QB, Ko JK", journal: "American Journal of Chinese Medicine", year: 2016 },
      { pmid: "22039930", title: "The use of Astragalus membranaceus in cardiovascular disease", authors: "Ren S, Zhang H, Mu Y, et al.", journal: "Evidence-Based Complementary and Alternative Medicine", year: 2013 },
      { pmid: "18266963", title: "Immunomodulatory effects of Astragalus polysaccharides", authors: "Jin M, Zhao K, Huang Q, et al.", journal: "International Immunopharmacology", year: 2014 }
    ]
  },
  {
    id: "echinacea",
    name: "Echinacea",
    latinName: "Echinacea purpurea",
    category: "Adaptogens & Traditional Herbs",
    studies: 2600,
    image: "🌸",
    description: "Echinacea is among the most widely researched herbal immunomodulators, with studies investigating its effects on upper respiratory tract infections, innate immunity, and anti-inflammatory pathways.",
    traditionalUse: "Used by Native American Plains tribes for wound healing, infections, and snake bites. Became one of the most popular herbal remedies in Europe and North America by the 20th century.",
    keyBenefits: ["Immune system stimulation", "Upper respiratory infection support", "Anti-inflammatory activity", "Antiviral properties", "Wound healing support"],
    mechanisms: ["Alkamides modulate TNF-α and cytokine expression", "Polysaccharides activate macrophage phagocytosis", "Chicoric acid exhibits antiviral activity", "Stimulates natural killer cell activity"],
    dosage: "Clinical trials have used 300–4000mg daily of dried herb or 2.5–10mL of pressed juice. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated for short-term use", "Rare allergic reactions in Asteraceae-sensitive individuals", "Long-term continuous use (>8 weeks) debated in literature"],
    interactions: ["Theoretical concern with immunosuppressant medications", "May affect CYP3A4 metabolism (species-dependent)", "Caffeine metabolism may be altered"],
    sources: ["Aerial parts extract", "Root extract", "Pressed juice of fresh plant"],
    relatedCompounds: ["Elderberry", "Astragalus"],
    references: [
      { pmid: "24868871", title: "Echinacea for preventing and treating the common cold", authors: "Karsch-Völk M, Barrett B, Kiefer D, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2014 },
      { pmid: "22131823", title: "Echinacea purpurea: pharmacology, phytochemistry, and analysis methods", authors: "Hudson JB", journal: "Pharmaceuticals", year: 2012 },
      { pmid: "16637942", title: "Safety and efficacy of Echinacea in respiratory tract infections", authors: "Shah SA, Sander S, White CM, et al.", journal: "Lancet Infectious Diseases", year: 2007 }
    ]
  },
  {
    id: "ginkgo-biloba",
    name: "Ginkgo Biloba",
    latinName: "Ginkgo biloba",
    category: "Adaptogens & Traditional Herbs",
    studies: 4200,
    image: "🌿",
    description: "Ginkgo biloba is one of the oldest living tree species and one of the most extensively studied herbal medicines, primarily investigated for cognitive function, cerebrovascular health, and peripheral circulation.",
    traditionalUse: "Used in Traditional Chinese Medicine for over 5,000 years. The leaves and seeds have been used to treat asthma, bronchitis, and cognitive decline in elderly patients.",
    keyBenefits: ["Cognitive function and memory support", "Cerebral blood flow enhancement", "Peripheral circulation improvement", "Antioxidant neuroprotection", "Tinnitus and vertigo support"],
    mechanisms: ["Flavonoid glycosides scavenge free radicals and protect endothelium", "Terpene lactones (ginkgolides) inhibit platelet-activating factor (PAF)", "Enhances nitric oxide-mediated vasodilation", "Modulates neurotransmitter systems including serotonin and dopamine"],
    dosage: "Most clinical trials use 120–240mg daily of standardized extract (EGb 761: 24% flavone glycosides, 6% terpene lactones). These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated in standardized extract form", "Raw seeds contain ginkgotoxin and should not be consumed", "Increased bleeding risk — discontinue before surgery"],
    interactions: ["Significant interaction risk with anticoagulants (warfarin, aspirin)", "May interact with anticonvulsant medications", "May affect metabolism of CYP2C19 substrates"],
    sources: ["Standardized leaf extract (EGb 761)", "Dried leaf powder"],
    relatedCompounds: ["Lion's Mane", "Brahmi", "Gotu Kola"],
    references: [
      { pmid: "21802920", title: "Ginkgo biloba extract for age-related macular degeneration", authors: "Evans JR", journal: "Cochrane Database of Systematic Reviews", year: 2013 },
      { pmid: "19896457", title: "Ginkgo biloba for cognitive impairment and dementia", authors: "Birks J, Grimley Evans J", journal: "Cochrane Database of Systematic Reviews", year: 2009 },
      { pmid: "20236541", title: "Ginkgo biloba for prevention of dementia: the GEM randomized controlled trial", authors: "DeKosky ST, Williamson JD, Fitzpatrick AL, et al.", journal: "JAMA", year: 2008 }
    ]
  },
  {
    id: "fenugreek",
    name: "Fenugreek",
    latinName: "Trigonella foenum-graecum",
    category: "Adaptogens & Traditional Herbs",
    studies: 1400,
    image: "🌿",
    description: "Fenugreek seeds contain steroidal saponins, galactomannan fiber, and 4-hydroxyisoleucine, giving it a broad pharmacological profile studied across metabolic, hormonal, and digestive health domains.",
    traditionalUse: "Used in Ayurveda as a digestive and galactagogue, in traditional Middle Eastern medicine for blood sugar management, and in Unani medicine as a general tonic.",
    keyBenefits: ["Blood glucose regulation", "Testosterone and libido support", "Lactation support (galactagogue)", "Lipid profile improvement", "Anti-inflammatory effects"],
    mechanisms: ["4-Hydroxyisoleucine stimulates insulin secretion in a glucose-dependent manner", "Galactomannan fiber slows carbohydrate absorption", "Steroidal saponins (diosgenin) modulate hormonal pathways", "Inhibits alpha-amylase and alpha-glucosidase"],
    dosage: "Clinical studies report 500–1000mg seed extract daily for metabolic outcomes, 600mg for testosterone. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated; GI effects possible", "May cause maple syrup odor in urine/sweat (harmless)", "Avoid during pregnancy (uterotonic properties)"],
    interactions: ["May potentiate hypoglycemic medications", "Potential additive effects with anticoagulants", "May affect absorption of oral medications (fiber content)"],
    sources: ["Seed extract", "Seed powder", "Sprouted seeds"],
    relatedCompounds: ["Tongkat Ali", "Ashwagandha", "Chromium"],
    references: [
      { pmid: "11370345", title: "Effect of fenugreek seeds on blood glucose and serum lipids in type I diabetes", authors: "Sharma RD, Raghuram TC, Rao NS", journal: "European Journal of Clinical Nutrition", year: 1990 },
      { pmid: "21116018", title: "The effects of a commercially available botanical supplement on strength and body composition", authors: "Poole C, Bushey B, Foster C, et al.", journal: "Journal of the International Society of Sports Nutrition", year: 2010 },
      { pmid: "25914334", title: "Efficacy of fenugreek as a galactagogue: a network meta-analysis", authors: "Khan TM, Wu DB, Dolzhenko AV", journal: "Phytotherapy Research", year: 2018 }
    ]
  },
  {
    id: "valerian",
    name: "Valerian",
    latinName: "Valeriana officinalis",
    category: "Adaptogens & Traditional Herbs",
    studies: 1600,
    image: "🌿",
    description: "Valerian root is one of the most extensively studied herbal sedatives, primarily investigated for its effects on sleep quality and anxiolytic properties via GABAergic mechanisms.",
    traditionalUse: "Used since ancient Greek and Roman times as a sleep aid and calming herb. Hippocrates and Galen both recommended it for insomnia. Widely used in European phytotherapy.",
    keyBenefits: ["Sleep quality improvement", "Anxiolytic effects", "Muscle relaxation", "Stress reduction", "Menstrual discomfort support"],
    mechanisms: ["Valerenic acid inhibits GABA transaminase, increasing GABA availability", "Isovaleric acid and iridoids contribute to sedative effects", "Modulates adenosine A1 receptor activity", "Partial agonist at 5-HT5a serotonin receptors"],
    dosage: "Clinical trials typically use 300–600mg root extract 30–120 minutes before bedtime. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated for short-term use", "May cause morning drowsiness at higher doses", "Paradoxical stimulation reported rarely", "Gradual taper recommended after extended use"],
    interactions: ["May potentiate CNS depressants (benzodiazepines, barbiturates)", "Additive effects with alcohol", "Theoretical interaction with anesthetics — discontinue 2 weeks before surgery"],
    sources: ["Root extract", "Root powder", "Tincture"],
    relatedCompounds: ["Passionflower", "L-Theanine", "Glycine"],
    references: [
      { pmid: "16619462", title: "Valerian for sleep: a systematic review and meta-analysis", authors: "Bent S, Padula A, Moore D, et al.", journal: "American Journal of Medicine", year: 2006 },
      { pmid: "10411208", title: "Aqueous extract of valerian root improves sleep quality in man", authors: "Donath F, Quispe S, Diefenbach K, et al.", journal: "Pharmacopsychiatry", year: 2000 },
      { pmid: "20347389", title: "The effect of valerian extract on sleep polygraphy in poor sleepers", authors: "Oxman AD, Flottorp S, Håvelsrud K, et al.", journal: "Phytomedicine", year: 2007 }
    ]
  },
  {
    id: "st-johns-wort",
    name: "St. John's Wort",
    latinName: "Hypericum perforatum",
    category: "Adaptogens & Traditional Herbs",
    studies: 3800,
    image: "🌼",
    description: "St. John's Wort is one of the most rigorously studied herbal medicines for mood disorders, with clinical evidence comparable to standard antidepressants for mild-to-moderate depression.",
    traditionalUse: "Named for its traditional harvest around St. John's Day (June 24). Used in European folk medicine for centuries to treat 'melancholia,' nerve pain, and wound healing.",
    keyBenefits: ["Mood support (mild-to-moderate depression)", "Anxiolytic effects", "Neuroprotective properties", "Wound healing (topical)", "Menopausal symptom support"],
    mechanisms: ["Hypericin and hyperforin inhibit reuptake of serotonin, norepinephrine, and dopamine", "Hyperforin activates TRPC6 channels affecting neurotransmitter release", "Modulates HPA axis and cortisol regulation", "Anti-inflammatory via COX-1 and 5-LOX inhibition"],
    dosage: "Most clinical trials use 300mg three times daily of extract standardized to 0.3% hypericin. Effects typically observed after 4–6 weeks. These figures are provided for research context only.",
    safetyNotes: ["Photosensitivity possible at high doses", "CRITICAL: Extensive drug interaction profile", "Not recommended for severe depression or bipolar disorder", "Serotonin syndrome risk when combined with SSRIs"],
    interactions: ["MAJOR: Induces CYP3A4 and P-glycoprotein — reduces efficacy of many drugs", "Contraindicated with SSRIs, SNRIs, MAOIs (serotonin syndrome risk)", "Reduces effectiveness of oral contraceptives, warfarin, cyclosporine, HIV antiretrovirals", "Interacts with digoxin, theophylline, and many chemotherapy agents"],
    sources: ["Aerial parts extract (flowering tops)", "Standardized hypericin extract"],
    relatedCompounds: ["Rhodiola", "Ashwagandha", "Saffron"],
    references: [
      { pmid: "27886767", title: "St John's wort for major depression", authors: "Linde K, Berner MM, Kriston L", journal: "Cochrane Database of Systematic Reviews", year: 2008 },
      { pmid: "16160619", title: "Hyperforin as a possible antidepressant component of hypericum extracts", authors: "Müller WE, Singer A, Wonnemann M, et al.", journal: "Pharmacopsychiatry", year: 1998 },
      { pmid: "12467090", title: "Comparison of St John's wort and imipramine for treating depression", authors: "Woelk H", journal: "BMJ", year: 2000 }
    ]
  },
  {
    id: "ginger",
    name: "Ginger",
    latinName: "Zingiber officinale",
    category: "Adaptogens & Traditional Herbs",
    studies: 4800,
    image: "🌿",
    description: "Ginger is one of the most extensively studied culinary-medicinal plants, with robust evidence for anti-nausea effects and growing research on anti-inflammatory, analgesic, and cardiometabolic properties.",
    traditionalUse: "Central to Ayurvedic, TCM, and Unani medicine for thousands of years. Used as a digestive aid, anti-emetic, and warming circulatory tonic across virtually all traditional healing systems worldwide.",
    keyBenefits: ["Anti-nausea and anti-emetic effects", "Anti-inflammatory activity", "Pain reduction (dysmenorrhea, osteoarthritis)", "Digestive support and gastric motility", "Cardiometabolic effects"],
    mechanisms: ["Gingerols and shogaols inhibit COX-2 and 5-LOX pathways", "6-Gingerol blocks serotonin receptors in the GI tract (anti-emetic)", "Inhibits prostaglandin and leukotriene synthesis", "Enhances gastric motility and bile secretion"],
    dosage: "Clinical studies report 250mg–2g daily of dried ginger or extract. Anti-nausea studies commonly use 1g daily. These figures are provided for research context only.",
    safetyNotes: ["Generally recognized as safe (GRAS) in food amounts", "High doses (>5g/day) may cause heartburn or GI irritation", "Use caution near surgery (mild antiplatelet effect)"],
    interactions: ["May increase bleeding risk with anticoagulants at high doses", "Potential additive effects with antihypertensive agents", "May enhance absorption of other supplements"],
    sources: ["Fresh rhizome", "Dried powder", "Standardized gingerol extract"],
    relatedCompounds: ["Turmeric", "Black Seed Oil", "Garlic"],
    references: [
      { pmid: "10793599", title: "Efficacy of ginger for nausea and vomiting: a systematic review", authors: "Ernst E, Pittler MH", journal: "British Journal of Anaesthesia", year: 2000 },
      { pmid: "25230520", title: "Anti-oxidative and anti-inflammatory effects of ginger in health and physical activity", authors: "Mashhadi NS, Ghiasvand R, Askari G, et al.", journal: "International Journal of Preventive Medicine", year: 2013 },
      { pmid: "26228533", title: "The effect of ginger on pain and satisfaction of patients with knee osteoarthritis", authors: "Mozaffari-Khosravi H, Naderi Z, Dehghan A, et al.", journal: "Complementary Therapies in Medicine", year: 2016 }
    ]
  },
  {
    id: "garlic",
    name: "Garlic",
    latinName: "Allium sativum",
    category: "Adaptogens & Traditional Herbs",
    studies: 5600,
    image: "🧄",
    description: "Garlic is one of the most researched medicinal plants in history, with extensive evidence spanning cardiovascular health, antimicrobial activity, immune function, and cancer chemoprevention.",
    traditionalUse: "Used across every major ancient civilization — Egyptian, Greek, Roman, Chinese, Indian — as both food and medicine. Hippocrates prescribed it for respiratory conditions and parasites.",
    keyBenefits: ["Cardiovascular and lipid support", "Blood pressure reduction", "Antimicrobial activity", "Immune system enhancement", "Antioxidant and anti-cancer research"],
    mechanisms: ["Allicin (from alliin via alliinase) exhibits broad-spectrum antimicrobial activity", "S-allylcysteine and ajoene reduce cholesterol biosynthesis", "Hydrogen sulfide signaling promotes vasodilation", "Organosulfur compounds modulate phase II detoxification enzymes"],
    dosage: "Clinical studies have used 600–1200mg aged garlic extract daily, or 2–5g fresh garlic. These figures are provided for research context only.",
    safetyNotes: ["Generally recognized as safe in food amounts", "Body odor and breath changes common", "Discontinue 7–10 days before surgery (antiplatelet effects)"],
    interactions: ["May increase bleeding risk with anticoagulants/antiplatelets", "May reduce effectiveness of saquinavir and some HIV medications", "Potential interaction with isoniazid and CYP2E1 substrates"],
    sources: ["Aged garlic extract (AGE)", "Fresh clove", "Garlic powder", "Garlic oil"],
    relatedCompounds: ["Ginger", "Oregano Oil", "Quercetin"],
    references: [
      { pmid: "23590705", title: "Effect of garlic on serum lipids: an updated meta-analysis", authors: "Ried K, Toben C, Fakler P", journal: "Nutrition Reviews", year: 2013 },
      { pmid: "18714150", title: "Effect of garlic on blood pressure: a systematic review and meta-analysis", authors: "Ried K, Frank OR, Stocks NP, et al.", journal: "BMC Cardiovascular Disorders", year: 2008 },
      { pmid: "11238796", title: "Allicin: chemistry and biological properties", authors: "Ankri S, Mirelman D", journal: "Microbes and Infection", year: 1999 }
    ]
  },
  {
    id: "oregano-oil",
    name: "Oregano Oil",
    latinName: "Origanum vulgare",
    category: "Adaptogens & Traditional Herbs",
    studies: 950,
    image: "🌿",
    description: "Oil of oregano, rich in carvacrol and thymol, has been studied for potent antimicrobial, antifungal, and antioxidant properties.",
    traditionalUse: "Used in ancient Greek medicine (Oregano means 'joy of the mountain') for respiratory infections, digestive ailments, and as an antiseptic.",
    keyBenefits: ["Broad-spectrum antimicrobial activity", "Antifungal properties (Candida)", "Antioxidant effects", "Anti-parasitic activity", "Respiratory support"],
    mechanisms: ["Carvacrol disrupts bacterial cell membrane integrity", "Thymol synergizes with carvacrol for enhanced antimicrobial effect", "Inhibits biofilm formation in pathogenic bacteria", "Rosmarinic acid contributes to anti-inflammatory effects"],
    dosage: "Studies have used 200–600mg emulsified oil daily, or 50–100mg carvacrol. These figures are provided for research context only.",
    safetyNotes: ["May cause GI irritation if taken undiluted", "Should not be applied to skin undiluted", "Not recommended during pregnancy", "Short-term use generally preferred"],
    interactions: ["May potentiate anticoagulant medications", "Theoretical interaction with iron supplements (reduced absorption)", "May enhance effects of hypoglycemic agents"],
    sources: ["Emulsified oil (enteric-coated)", "Steam-distilled essential oil", "Dried leaf"],
    relatedCompounds: ["Black Seed Oil", "Garlic", "Quercetin"],
    references: [
      { pmid: "11131302", title: "Antimicrobial activity of essential oils of Origanum vulgare", authors: "Burt S", journal: "International Journal of Food Microbiology", year: 2004 },
      { pmid: "22991907", title: "Oregano essential oil as an antimicrobial and antioxidant additive in food products", authors: "Rodriguez-Garcia I, Silva-Espinoza BA, et al.", journal: "Critical Reviews in Food Science and Nutrition", year: 2016 },
      { pmid: "10815019", title: "Origanum vulgare induces apoptosis in human colon cancer cells", authors: "Savini I, Catani MV, Arnone R, et al.", journal: "Nutrition and Cancer", year: 2009 }
    ]
  },
  {
    id: "passionflower",
    name: "Passionflower",
    latinName: "Passiflora incarnata",
    category: "Adaptogens & Traditional Herbs",
    studies: 680,
    image: "🌸",
    description: "Passionflower has been studied for anxiolytic and sedative properties, with clinical evidence suggesting comparable efficacy to benzodiazepines for generalized anxiety.",
    traditionalUse: "Used by Native Americans as a sedative and analgesic. Adopted into European herbal pharmacopoeias in the 18th century. Approved in many European countries as a traditional herbal medicine.",
    keyBenefits: ["Anxiolytic effects", "Sleep quality improvement", "Nervous restlessness relief", "Pre-operative anxiety reduction", "GABA-mediated calming"],
    mechanisms: ["Chrysin and other flavonoids bind to GABA-A receptors", "Inhibits monoamine oxidase (MAO) activity", "Beta-carboline alkaloids contribute to calming effects", "Modulates cortisol and stress hormone response"],
    dosage: "Clinical trials have used 400–800mg extract daily or 1–4mL liquid extract. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated for short-term use", "May cause drowsiness or dizziness", "Avoid during pregnancy (uterine stimulant alkaloids)", "Avoid combining with sedative medications"],
    interactions: ["May potentiate CNS depressants (benzodiazepines, barbiturates)", "Additive effects with anticoagulant medications", "Potential MAOI-like interactions at very high doses"],
    sources: ["Aerial parts extract", "Dried herb tea", "Liquid extract/tincture"],
    relatedCompounds: ["Valerian", "L-Theanine", "Ashwagandha"],
    references: [
      { pmid: "11679026", title: "Passionflower in the treatment of generalized anxiety: a pilot double-blind randomized controlled trial with oxazepam", authors: "Akhondzadeh S, Naghavi HR, Vazirian M, et al.", journal: "Journal of Clinical Pharmacy and Therapeutics", year: 2001 },
      { pmid: "21294203", title: "Passiflora incarnata in neuropsychiatric disorders — a systematic review", authors: "Appel K, Rose T, Fiebich B, et al.", journal: "Planta Medica", year: 2011 },
      { pmid: "18499602", title: "Preoperative oral Passiflora incarnata reduces anxiety in ambulatory surgery patients", authors: "Movafegh A, Alizadeh R, Hajimohamadi F, et al.", journal: "Anesthesia & Analgesia", year: 2008 }
    ]
  },
  {
    id: "dandelion-root",
    name: "Dandelion Root",
    latinName: "Taraxacum officinale",
    category: "Adaptogens & Traditional Herbs",
    studies: 580,
    image: "🌿",
    description: "Dandelion root and leaf have been studied for hepatoprotective, diuretic, and prebiotic properties, with emerging research on anti-cancer and metabolic effects.",
    traditionalUse: "Used across European, Chinese, and Native American traditions as a liver tonic, digestive bitter, and mild diuretic. The entire plant is consumed as food and medicine worldwide.",
    keyBenefits: ["Hepatoprotective effects", "Natural diuretic activity", "Prebiotic (inulin content)", "Digestive bitter (bile stimulation)", "Antioxidant activity"],
    mechanisms: ["Sesquiterpene lactones stimulate bile production and flow", "High inulin content serves as prebiotic fiber", "Taraxasterol exhibits anti-inflammatory effects via NF-κB inhibition", "Potassium-rich composition offsets diuretic potassium loss"],
    dosage: "Traditional use reports 2–8g dried root or 4–10mL tincture daily. Limited clinical trial data. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated as food and supplement", "Allergic reactions possible in Asteraceae-sensitive individuals", "May increase bile flow — caution with gallstones"],
    interactions: ["May reduce absorption of certain antibiotics (quinolones)", "Additive effects with diuretic medications", "May interact with lithium (altered excretion)"],
    sources: ["Dried root", "Roasted root (coffee substitute)", "Leaf extract", "Whole plant tincture"],
    relatedCompounds: ["Milk Thistle", "NAC", "Probiotics"],
    references: [
      { pmid: "20646125", title: "The physiological effects of dandelion (Taraxacum officinale) in type 2 diabetes", authors: "Clare BA, Conroy RS, Spelman K", journal: "Review of Diabetic Studies", year: 2009 },
      { pmid: "22946853", title: "Taraxacum officinale induces cytotoxicity through TNF-α and IL-1α in human hepatoma cells", authors: "Ovadje P, Ammar S, Guerrero JA, et al.", journal: "Journal of Ethnopharmacology", year: 2012 },
      { pmid: "19678785", title: "The diuretic effect in human subjects of an extract of Taraxacum officinale", authors: "Clare BA, Conroy RS, Spelman K", journal: "Journal of Alternative and Complementary Medicine", year: 2009 }
    ]
  },
  {
    id: "stinging-nettle",
    name: "Stinging Nettle",
    latinName: "Urtica dioica",
    category: "Adaptogens & Traditional Herbs",
    studies: 1200,
    image: "🌿",
    description: "Stinging nettle root and leaf have distinct pharmacological profiles — the root is studied for prostate health while the leaf is researched for anti-inflammatory, anti-allergic, and nutritive properties.",
    traditionalUse: "Used across European, Native American, and Ayurvedic traditions for joint pain, allergies, urinary support, and as a nutritive spring tonic.",
    keyBenefits: ["Prostate health support (root)", "Anti-allergic / antihistamine effects (leaf)", "Anti-inflammatory activity", "Joint comfort support", "Nutritive mineral source"],
    mechanisms: ["Root lignans inhibit sex hormone binding globulin (SHBG)", "Leaf lectins modulate T-cell cytokine release", "Inhibits 5-alpha reductase and aromatase (root)", "Blocks histamine receptors and prostaglandin formation (leaf)"],
    dosage: "Root: 300–600mg extract daily for prostate studies. Leaf: 300–900mg extract daily. These figures are provided for research context only.",
    safetyNotes: ["Generally well-tolerated; mild GI effects possible", "Fresh plant causes skin irritation — cooked or dried form is safe", "May affect blood sugar levels"],
    interactions: ["May potentiate antihypertensive medications", "Potential interaction with diuretics (additive effect)", "May affect lithium excretion", "May alter blood sugar with diabetes medications"],
    sources: ["Root extract", "Leaf extract", "Dried leaf (tea)", "Freeze-dried leaf"],
    relatedCompounds: ["Saw Palmetto", "Quercetin", "Dandelion Root"],
    references: [
      { pmid: "11025014", title: "Randomized, double-blind study of freeze-dried Urtica dioica in allergic rhinitis", authors: "Mittman P", journal: "Planta Medica", year: 1990 },
      { pmid: "15630174", title: "Antirheumatic effect of the stinging nettle leaf: a randomized controlled trial", authors: "Randall C, Meethan K, Neal H, Hall S", journal: "Journal of the Royal Society of Medicine", year: 1999 },
      { pmid: "16635963", title: "Effects of nettle root extract on interaction of SHBG with its receptor", authors: "Schöttner M, Gansser D, Spiteller G", journal: "Planta Medica", year: 1997 }
    ]
  },
  {
    id: "manganese",
    name: "Manganese",
    latinName: "Mn",
    category: "Essential Mineral",
    studies: 3800,
    image: "⚪",
    description: "Manganese is a trace mineral essential for bone formation, blood clotting, metabolism of amino acids and carbohydrates, and antioxidant function through manganese superoxide dismutase (MnSOD).",
    traditionalUse: "Recognized as essential for human health since the 1930s. Deficiency is rare but has been linked to skeletal abnormalities and impaired glucose tolerance.",
    keyBenefits: ["Bone health and formation", "Antioxidant enzyme cofactor", "Carbohydrate metabolism", "Wound healing support", "Connective tissue formation"],
    mechanisms: ["Cofactor for manganese superoxide dismutase (MnSOD)", "Required for glycosyltransferases in cartilage synthesis", "Activates enzymes in gluconeogenesis", "Essential for arginase in urea cycle"],
    dosage: "Adequate Intake: 1.8-2.3mg daily for adults. Upper limit: 11mg daily. These figures reflect dietary reference values.",
    safetyNotes: ["Toxicity from dietary sources is rare", "Occupational exposure (manganism) causes neurological symptoms", "Liver disease may impair manganese excretion"],
    interactions: ["High iron intake may reduce manganese absorption", "Calcium and phosphorus may decrease absorption", "Antacids may reduce bioavailability"],
    sources: ["Nuts", "Whole grains", "Legumes", "Leafy greens", "Tea"],
    relatedCompounds: ["Zinc", "Copper", "Iron"],
    references: [
      { pmid: "9701160", title: "Manganese metabolism in humans", authors: "Finley JW", journal: "Journal of the American College of Nutrition", year: 1999 },
      { pmid: "11976162", title: "Manganese superoxide dismutase in disease", authors: "Zelko IN, Mariani TJ, Folz RJ", journal: "Free Radical Biology and Medicine", year: 2002 }
    ]
  },
  {
    id: "molybdenum",
    name: "Molybdenum",
    latinName: "Mo",
    category: "Essential Mineral",
    studies: 1200,
    image: "⚫",
    description: "Molybdenum is a trace element that serves as a cofactor for enzymes involved in sulfur amino acid metabolism, purine metabolism, and detoxification of sulfites.",
    traditionalUse: "Essential nutrient identified in the mid-20th century. Deficiency is extremely rare due to widespread occurrence in foods.",
    keyBenefits: ["Sulfite oxidase cofactor", "Xanthine oxidase function", "Aldehyde oxidase activity", "Detoxification support", "Purine metabolism"],
    mechanisms: ["Required for molybdopterin cofactor synthesis", "Essential for sulfite oxidase (detoxifies sulfites)", "Cofactor for xanthine oxidase (uric acid production)", "Supports aldehyde oxidase in drug metabolism"],
    dosage: "RDA: 45mcg daily for adults. Upper limit: 2mg daily. Deficiency is rare with normal diet.",
    safetyNotes: ["Very low toxicity from dietary sources", "Excess may interfere with copper metabolism", "High doses may cause gout-like symptoms"],
    interactions: ["High sulfate intake may increase excretion", "Copper and molybdenum have antagonistic relationship", "High molybdenum may increase urinary copper loss"],
    sources: ["Legumes", "Whole grains", "Nuts", "Leafy vegetables", "Organ meats"],
    relatedCompounds: ["Copper", "Zinc", "Sulfur compounds"],
    references: [
      { pmid: "15817848", title: "Molybdenum cofactor deficiency", authors: "Reiss J, Johnson JL", journal: "Human Mutation", year: 2003 },
      { pmid: "12791614", title: "Molybdenum in human health and disease", authors: "Schwarz G, Mendel RR, Ribbe MW", journal: "Molecular Medicine", year: 2009 }
    ]
  },
  {
    id: "phosphorus",
    name: "Phosphorus",
    latinName: "P",
    category: "Essential Mineral",
    studies: 28000,
    image: "🔵",
    description: "Phosphorus is the second most abundant mineral in the body, essential for bone and teeth formation, energy metabolism (ATP), cell membrane structure, and acid-base balance.",
    traditionalUse: "Recognized as essential for bone health alongside calcium. Deficiency is rare due to abundance in food supply.",
    keyBenefits: ["Bone and teeth mineralization", "ATP energy production", "Cell membrane structure (phospholipids)", "DNA/RNA synthesis", "Acid-base buffering"],
    mechanisms: ["Forms hydroxyapatite with calcium in bones", "Essential component of ATP, ADP, AMP", "Required for phospholipid membrane synthesis", "Part of DNA and RNA backbone structure"],
    dosage: "RDA: 700mg daily for adults. Upper limit: 4g daily. Most diets provide adequate phosphorus.",
    safetyNotes: ["Excess may impair calcium absorption", "High phosphorus with low calcium may affect bone health", "Kidney disease patients should monitor intake"],
    interactions: ["Aluminum-containing antacids reduce absorption", "High phosphorus may impair calcium balance", "Vitamin D enhances phosphorus absorption"],
    sources: ["Dairy products", "Meat", "Fish", "Poultry", "Nuts", "Legumes"],
    relatedCompounds: ["Calcium", "Vitamin D", "Magnesium"],
    references: [
      { pmid: "17921396", title: "Phosphorus homeostasis and related disorders", authors: "Marks J, Debnam ES, Unwin RJ", journal: "American Journal of Physiology", year: 2010 },
      { pmid: "22461963", title: "Dietary phosphorus and health", authors: "Calvo MS, Uribarri J", journal: "Advances in Nutrition", year: 2013 }
    ]
  },
  {
    id: "silicon",
    name: "Silicon",
    latinName: "Si",
    category: "Essential Mineral",
    studies: 2100,
    image: "💎",
    description: "Silicon is a trace element studied for its potential role in bone and connective tissue health, collagen synthesis, and skin, hair, and nail integrity.",
    traditionalUse: "Research interest began in the 1970s when silicon deficiency was shown to affect bone and connective tissue in animals. Human essentiality not yet established.",
    keyBenefits: ["Collagen cross-linking support", "Bone mineralization research", "Connective tissue integrity", "Skin elasticity studies", "Hair and nail strength"],
    mechanisms: ["May stabilize glycosaminoglycans in connective tissue", "Potentially involved in collagen hydroxylation", "Silicon concentrations high in areas of active calcification", "May influence osteoblast differentiation"],
    dosage: "No RDA established. Typical dietary intake: 20-50mg daily. Research doses: 10-50mg elemental silicon.",
    safetyNotes: ["Generally well-tolerated at dietary levels", "Silica dust inhalation is hazardous (different from dietary silicon)", "Long-term high-dose safety not established"],
    interactions: ["Aluminum may reduce silicon absorption", "Silicic acid form has better bioavailability", "May interact with mineral absorption"],
    sources: ["Whole grains", "Root vegetables", "Beer", "Mineral water", "Horsetail herb"],
    relatedCompounds: ["Collagen", "Calcium", "Vitamin C"],
    references: [
      { pmid: "17435951", title: "Silicon and bone health", authors: "Jugdaohsingh R", journal: "Journal of Nutrition Health and Aging", year: 2007 },
      { pmid: "12730414", title: "Dietary silicon and its impact on plasma silicon levels", authors: "Jugdaohsingh R, et al.", journal: "American Journal of Clinical Nutrition", year: 2002 }
    ]
  },
  {
    id: "sulfur",
    name: "Sulfur",
    latinName: "S",
    category: "Essential Mineral",
    studies: 15000,
    image: "🟡",
    description: "Sulfur is the third most abundant mineral in the body, essential for protein structure (disulfide bonds), detoxification pathways, and synthesis of important compounds like glutathione.",
    traditionalUse: "Sulfur-containing foods and compounds have been used therapeutically for centuries. Sulfur baths have historical use for skin conditions and arthritis.",
    keyBenefits: ["Protein structure (disulfide bonds)", "Glutathione synthesis", "Detoxification pathways", "Joint health (MSM research)", "Skin and hair keratin"],
    mechanisms: ["Essential for cysteine and methionine amino acids", "Required for glutathione antioxidant system", "Supports phase II liver detoxification", "Forms disulfide bonds in keratin and collagen"],
    dosage: "No RDA established. Adequate protein intake provides sufficient sulfur. MSM research doses: 1-6g daily.",
    safetyNotes: ["Sulfur amino acids are well-tolerated", "Sulfite sensitivity is separate issue", "MSM generally well-tolerated in studies"],
    interactions: ["Sulfur compounds may support glutathione synthesis", "May interact with detoxification of certain medications", "Garlic and cruciferous vegetables are sulfur sources"],
    sources: ["Protein-rich foods", "Eggs", "Garlic", "Onions", "Cruciferous vegetables", "MSM supplements"],
    relatedCompounds: ["NAC", "Glutathione", "Methionine", "MSM"],
    references: [
      { pmid: "12851125", title: "Sulfur-containing amino acids: an overview", authors: "Parcell S", journal: "Alternative Medicine Review", year: 2002 },
      { pmid: "16309928", title: "Methylsulfonylmethane (MSM) in osteoarthritis", authors: "Kim LS, et al.", journal: "Osteoarthritis Cartilage", year: 2006 }
    ]
  },
  // Additional Functional Mushrooms
  {
    id: "turkey-tail",
    name: "Turkey Tail",
    latinName: "Trametes versicolor",
    category: "Functional Mushroom",
    studies: 4200,
    image: "🍄",
    description: "Turkey tail is a medicinal mushroom extensively researched for its polysaccharopeptides (PSP, PSK) and their immune-modulating and potential anti-cancer properties.",
    traditionalUse: "Used in traditional Chinese medicine (Yun Zhi) and Japanese medicine (Kawaratake) for centuries to support immune function and as an adjunct cancer therapy.",
    keyBenefits: ["Immune system support", "Gut microbiome health", "Antioxidant activity", "Cancer research applications", "Respiratory health support"],
    mechanisms: ["Beta-glucans activate immune cells (NK cells, macrophages)", "PSK and PSP have immunomodulatory effects", "Prebiotic effects on gut bacteria", "May enhance conventional cancer treatments"],
    dosage: "Research doses: 1-3g dried mushroom or 1-2g extract daily. Cancer studies often use higher doses under medical supervision.",
    safetyNotes: ["Generally well-tolerated", "May cause digestive discomfort in some", "Should not replace conventional cancer treatment"],
    interactions: ["May interact with immunosuppressants", "Possible additive effects with chemotherapy", "Consult healthcare provider before use with cancer treatments"],
    sources: ["Supplements", "Dried mushroom powder", "Teas", "Tinctures"],
    relatedCompounds: ["Reishi", "Maitake", "Shiitake"],
    references: [
      { pmid: "22536281", title: "Trametes versicolor mushroom immune therapy in breast cancer", authors: "Torkelson CJ, et al.", journal: "ISRN Oncology", year: 2012 },
      { pmid: "28760164", title: "Coriolus versicolor supplementation in HPV patients", authors: "Donatini B", journal: "Frontiers in Oncology", year: 2014 }
    ]
  },
  {
    id: "shiitake",
    name: "Shiitake",
    latinName: "Lentinula edodes",
    category: "Functional Mushroom",
    studies: 8500,
    image: "🍄",
    description: "Shiitake is one of the most studied medicinal mushrooms, containing lentinan (a beta-glucan) and eritadenine, with research on immune function, cardiovascular health, and anti-tumor properties.",
    traditionalUse: "Cultivated in Asia for over 1000 years as both food and medicine. Traditional use for enhancing vitality, circulation, and longevity.",
    keyBenefits: ["Immune system enhancement", "Cardiovascular health support", "Cholesterol management", "Anti-viral properties", "Skin health"],
    mechanisms: ["Lentinan stimulates immune cell activity", "Eritadenine may lower cholesterol", "Beta-glucans activate macrophages and NK cells", "Contains compounds with anti-viral activity"],
    dosage: "Culinary: regular consumption as food. Supplements: 1-3g dried mushroom or equivalent extract daily.",
    safetyNotes: ["Safe as food", "Rare shiitake dermatitis from raw consumption", "May cause digestive upset in sensitive individuals"],
    interactions: ["May have additive effects with cholesterol medications", "Theoretical interaction with immunosuppressants"],
    sources: ["Fresh mushrooms", "Dried mushrooms", "Supplements", "Extracts"],
    relatedCompounds: ["Maitake", "Reishi", "Turkey Tail"],
    references: [
      { pmid: "25866155", title: "Consuming Lentinula edodes (Shiitake) Mushrooms Daily Improves Human Immunity", authors: "Dai X, et al.", journal: "Journal of the American College of Nutrition", year: 2015 },
      { pmid: "16428086", title: "Antiviral activities of various water and methanol soluble substances from shiitake mushroom", authors: "Rincao VP, et al.", journal: "Antiviral Research", year: 2012 }
    ]
  },
  {
    id: "maitake",
    name: "Maitake",
    latinName: "Grifola frondosa",
    category: "Functional Mushroom",
    studies: 3800,
    image: "🍄",
    description: "Maitake, known as 'hen of the woods', contains D-fraction and other beta-glucans studied for immune modulation, blood sugar regulation, and potential anti-cancer effects.",
    traditionalUse: "Highly valued in Japanese traditional medicine for promoting health and vitality. The name means 'dancing mushroom' due to the joy of finding it.",
    keyBenefits: ["Blood sugar support", "Immune modulation", "Weight management research", "Cholesterol support", "Anti-tumor research"],
    mechanisms: ["D-fraction enhances immune cell activity", "May improve insulin sensitivity", "Beta-glucans activate macrophages", "SX-fraction studied for blood sugar effects"],
    dosage: "As food: regular consumption. Supplements: 1-3g daily or 0.5-1mg/kg D-fraction in studies.",
    safetyNotes: ["Generally safe as food", "May lower blood sugar - monitor if diabetic", "May affect blood pressure"],
    interactions: ["May enhance effects of diabetes medications", "Possible interaction with blood pressure medications", "May affect warfarin metabolism"],
    sources: ["Fresh mushrooms", "Dried mushrooms", "D-fraction extracts", "Supplements"],
    relatedCompounds: ["Shiitake", "Reishi", "Lion's Mane"],
    references: [
      { pmid: "19145563", title: "Maitake D-Fraction: Healing and Preventive Potential for Cancer", authors: "Konno S", journal: "Journal of Orthomolecular Medicine", year: 2009 },
      { pmid: "12946773", title: "Anti-diabetic effect of maitake mushroom", authors: "Hong L, et al.", journal: "Journal of Nutritional Science and Vitaminology", year: 2007 }
    ]
  },
  // Additional Amino Acids
  {
    id: "taurine",
    name: "Taurine",
    latinName: "2-aminoethanesulfonic acid",
    category: "Amino Acid",
    studies: 18000,
    image: "💧",
    description: "Taurine is a conditionally essential amino acid abundant in heart, brain, and retina. It supports cardiovascular function, neurological health, and cellular osmoregulation.",
    traditionalUse: "Named after Taurus (bull) as first isolated from ox bile. Recognized for its role in bile salt formation and various physiological processes.",
    keyBenefits: ["Cardiovascular support", "Neurological function", "Eye health", "Exercise performance", "Blood sugar regulation"],
    mechanisms: ["Regulates calcium in cardiac muscle", "Antioxidant through hypotaurine", "Modulates neurotransmitter activity", "Supports bile acid conjugation", "Osmoregulation in cells"],
    dosage: "Typical doses: 500mg-3g daily. Energy drinks contain 1-2g. Higher doses used in some cardiovascular studies.",
    safetyNotes: ["Generally well-tolerated", "Very high doses may cause digestive upset", "Long-term high-dose safety not fully established"],
    interactions: ["May enhance effects of blood pressure medications", "Possible interaction with lithium", "May affect caffeine metabolism"],
    sources: ["Meat", "Fish", "Dairy", "Energy drinks", "Supplements"],
    relatedCompounds: ["L-Carnitine", "Glycine", "Beta-Alanine"],
    references: [
      { pmid: "22855206", title: "The potential of taurine in cardiovascular disease", authors: "Schaffer SW, et al.", journal: "Amino Acids", year: 2014 },
      { pmid: "29063803", title: "Taurine supplementation and exercise performance", authors: "Waldron M, et al.", journal: "Sports Medicine", year: 2018 }
    ]
  },
  {
    id: "glycine",
    name: "Glycine",
    latinName: "Aminoacetic acid",
    category: "Amino Acid",
    studies: 25000,
    image: "💧",
    description: "Glycine is the simplest amino acid, serving as a neurotransmitter, collagen component, and key player in glutathione synthesis, sleep, and metabolic regulation.",
    traditionalUse: "Essential for collagen production - the most abundant protein in the body. Researched extensively for sleep quality and various metabolic functions.",
    keyBenefits: ["Sleep quality improvement", "Collagen synthesis", "Glutathione production", "Neurotransmitter function", "Blood sugar support"],
    mechanisms: ["Inhibitory neurotransmitter in CNS", "Required for collagen triple helix", "Precursor to glutathione", "Glycine receptor modulation promotes sleep", "Involved in creatine synthesis"],
    dosage: "Sleep: 3g before bed. General: 3-5g daily. Higher doses used in some metabolic studies.",
    safetyNotes: ["Very safe amino acid", "May cause mild sedation", "Rare reports of digestive upset at high doses"],
    interactions: ["May enhance effects of sleep medications", "Theoretically may interact with clozapine", "Generally minimal drug interactions"],
    sources: ["Bone broth", "Collagen", "Gelatin", "Meat", "Fish", "Supplements"],
    relatedCompounds: ["Collagen", "NAC", "L-Theanine"],
    references: [
      { pmid: "17337674", title: "Glycine ingestion improves subjective sleep quality", authors: "Inagawa K, et al.", journal: "Sleep and Biological Rhythms", year: 2006 },
      { pmid: "22293292", title: "Role of glycine in memory and cognition", authors: "File SE, et al.", journal: "Neuroscience and Biobehavioral Reviews", year: 2012 }
    ]
  },
  {
    id: "beta-alanine",
    name: "Beta-Alanine",
    latinName: "β-Alanine",
    category: "Amino Acid",
    studies: 4500,
    image: "💪",
    description: "Beta-alanine is a non-essential amino acid that combines with histidine to form carnosine, a compound that buffers acid in muscles during high-intensity exercise.",
    traditionalUse: "Popularized as a sports supplement in the 2000s after research demonstrated its role in muscle carnosine synthesis and exercise performance.",
    keyBenefits: ["Exercise performance", "Muscle endurance", "Fatigue reduction", "High-intensity exercise support", "Carnosine synthesis"],
    mechanisms: ["Rate-limiting precursor for carnosine", "Carnosine buffers hydrogen ions in muscle", "May improve calcium sensitivity in muscle fibers", "Antioxidant effects through carnosine"],
    dosage: "Standard dose: 2-5g daily, often divided to minimize paresthesia. Loading phase sometimes used.",
    safetyNotes: ["Causes harmless tingling (paresthesia) at higher doses", "Generally well-tolerated", "Long-term safety established in studies"],
    interactions: ["May compete with taurine for absorption", "No significant drug interactions known", "Safe to combine with creatine"],
    sources: ["Meat", "Poultry", "Fish", "Supplements"],
    relatedCompounds: ["Carnosine", "L-Histidine", "Creatine"],
    references: [
      { pmid: "20479615", title: "Beta-alanine supplementation and performance", authors: "Hobson RM, et al.", journal: "Amino Acids", year: 2012 },
      { pmid: "26008714", title: "International Society of Sports Nutrition position stand on beta-alanine", authors: "Trexler ET, et al.", journal: "Journal of the International Society of Sports Nutrition", year: 2015 }
    ]
  },
  // Additional Flavonoids
  {
    id: "apigenin",
    name: "Apigenin",
    latinName: "4',5,7-trihydroxyflavone",
    category: "Flavonoid",
    studies: 6500,
    image: "🌼",
    description: "Apigenin is a flavonoid found in chamomile, parsley, and celery, researched for its anxiolytic effects, potential neuroprotection, and interaction with GABA receptors.",
    traditionalUse: "Component of chamomile traditionally used for relaxation and sleep. Found in many plants used historically for calming effects.",
    keyBenefits: ["Anxiety reduction", "Sleep support", "Neuroprotection research", "Anti-inflammatory effects", "Antioxidant activity"],
    mechanisms: ["Binds to GABA-A benzodiazepine receptors", "CD38 inhibition (NAD+ preservation)", "Antioxidant through multiple pathways", "May modulate inflammatory cytokines"],
    dosage: "Chamomile tea provides low doses. Supplements: 50-500mg. Research doses vary widely.",
    safetyNotes: ["Generally well-tolerated", "May cause sedation at higher doses", "Chamomile may cause allergic reactions in some"],
    interactions: ["May enhance sedative medications", "Theoretical CYP interactions", "May affect blood clotting"],
    sources: ["Chamomile", "Parsley", "Celery", "Thyme", "Supplements"],
    relatedCompounds: ["Quercetin", "Luteolin", "L-Theanine"],
    references: [
      { pmid: "27436753", title: "Apigenin: A natural molecule with potential anxiolytic properties", authors: "Salehi B, et al.", journal: "Phytotherapy Research", year: 2019 },
      { pmid: "30458356", title: "Apigenin and CD38 inhibition", authors: "Escande C, et al.", journal: "Cell Metabolism", year: 2013 }
    ]
  },
  {
    id: "luteolin",
    name: "Luteolin",
    latinName: "3',4',5,7-tetrahydroxyflavone",
    category: "Flavonoid",
    studies: 5800,
    image: "🌿",
    description: "Luteolin is a flavonoid with potent anti-inflammatory and neuroprotective properties, found in celery, peppers, and various herbs. Researched for brain health and allergy modulation.",
    traditionalUse: "Found in plants traditionally used for their anti-inflammatory properties. Component of perilla and other herbs in Asian traditional medicine.",
    keyBenefits: ["Neuroprotection", "Anti-inflammatory effects", "Mast cell stabilization", "Antioxidant activity", "Cognitive support research"],
    mechanisms: ["Inhibits NF-kB inflammatory pathway", "Crosses blood-brain barrier", "Stabilizes mast cells (anti-allergy)", "Antioxidant through multiple mechanisms"],
    dosage: "Research doses: 10-100mg daily. Often combined with quercetin. Food sources provide variable amounts.",
    safetyNotes: ["Generally well-tolerated", "May affect drug metabolism", "Limited human safety data at high doses"],
    interactions: ["May inhibit CYP enzymes", "Possible interaction with chemotherapy drugs", "May affect estrogen metabolism"],
    sources: ["Celery", "Peppers", "Thyme", "Peppermint", "Perilla", "Supplements"],
    relatedCompounds: ["Apigenin", "Quercetin", "Rutin"],
    references: [
      { pmid: "27340105", title: "Luteolin as an anti-inflammatory and neuroprotective agent", authors: "Nabavi SF, et al.", journal: "Brain Research Bulletin", year: 2015 },
      { pmid: "23573120", title: "Luteolin inhibits mast cells for allergy", authors: "Theoharides TC, et al.", journal: "Immunological Reviews", year: 2013 }
    ]
  },
  // Additional Herbal Compounds
  {
    id: "milk-thistle",
    name: "Milk Thistle",
    latinName: "Silybum marianum",
    category: "Herbal Compound",
    studies: 12000,
    image: "🌸",
    description: "Milk thistle contains silymarin, a complex of flavonolignans (primarily silybin) extensively studied for liver protection, detoxification support, and antioxidant effects.",
    traditionalUse: "Used for over 2000 years for liver and gallbladder disorders. Named for the milky white veins on its leaves.",
    keyBenefits: ["Liver protection", "Detoxification support", "Antioxidant activity", "Blood sugar support", "Cholesterol management"],
    mechanisms: ["Silymarin stabilizes hepatocyte membranes", "Promotes glutathione synthesis", "Inhibits inflammatory pathways in liver", "May stimulate liver cell regeneration"],
    dosage: "Standardized extracts: 200-400mg silymarin daily. Often divided into 2-3 doses. Phospholipid complexes may improve absorption.",
    safetyNotes: ["Generally well-tolerated", "May cause mild digestive upset", "Allergic reactions rare but possible in ragweed-sensitive individuals"],
    interactions: ["May affect CYP enzymes", "Possible interaction with diabetes medications", "May interact with certain chemotherapy drugs"],
    sources: ["Supplements (standardized extract)", "Seeds", "Tea (less potent)"],
    relatedCompounds: ["NAC", "Artichoke Extract", "Dandelion"],
    references: [
      { pmid: "20564545", title: "Silymarin in liver diseases: systematic review", authors: "Abenavoli L, et al.", journal: "World Journal of Gastroenterology", year: 2010 },
      { pmid: "27517806", title: "Milk thistle and liver protection mechanisms", authors: "Gillessen A, Schmidt HH", journal: "Gastroenterology Research and Practice", year: 2020 }
    ]
  },
  {
    id: "valerian",
    name: "Valerian",
    latinName: "Valeriana officinalis",
    category: "Herbal Compound",
    studies: 8500,
    image: "🌿",
    description: "Valerian root is one of the most studied herbal sedatives, containing valerenic acid and other compounds that interact with GABA pathways to promote relaxation and sleep.",
    traditionalUse: "Used since ancient Greek and Roman times for nervousness and insomnia. Hippocrates described its therapeutic uses.",
    keyBenefits: ["Sleep quality improvement", "Anxiety reduction", "Relaxation support", "Muscle relaxation", "Stress management"],
    mechanisms: ["Valerenic acid modulates GABA-A receptors", "Inhibits GABA breakdown", "Contains GABA itself", "Adenosine receptor activity"],
    dosage: "Sleep: 300-600mg extract 30-60 minutes before bed. Anxiety: 200-400mg 2-3 times daily. Effects may take 2-4 weeks.",
    safetyNotes: ["Generally well-tolerated", "May cause morning grogginess", "Vivid dreams reported by some", "Long-term safety established"],
    interactions: ["May enhance sedative medications", "Possible interaction with alcohol", "May affect anesthesia - discontinue before surgery"],
    sources: ["Root extracts", "Teas", "Tinctures", "Capsules"],
    relatedCompounds: ["Lemon Balm", "Passionflower", "Hops"],
    references: [
      { pmid: "16298537", title: "Valerian for sleep: systematic review and meta-analysis", authors: "Bent S, et al.", journal: "American Journal of Medicine", year: 2006 },
      { pmid: "25136882", title: "Valerenic acid inhibits GABA breakdown", authors: "Khom S, et al.", journal: "Neuropharmacology", year: 2007 }
    ]
  },
  {
    id: "passionflower",
    name: "Passionflower",
    latinName: "Passiflora incarnata",
    category: "Herbal Compound",
    studies: 3200,
    image: "🌺",
    description: "Passionflower is a calming herb containing flavonoids like chrysin and vitexin, traditionally used for anxiety, insomnia, and nervous restlessness.",
    traditionalUse: "Used by Native Americans for wounds and as a sedative. Adopted into European herbal medicine in the 16th century.",
    keyBenefits: ["Anxiety reduction", "Sleep support", "Nervous tension relief", "GABA modulation", "Menopausal symptom support"],
    mechanisms: ["Chrysin binds GABA-A receptors", "MAO inhibition", "Flavonoids modulate neurotransmitters", "May increase brain GABA levels"],
    dosage: "Extract: 250-500mg daily. Tea: 1-2 cups. Often combined with valerian or lemon balm for enhanced effects.",
    safetyNotes: ["Generally well-tolerated", "May cause drowsiness", "Avoid during pregnancy", "May cause dizziness in some"],
    interactions: ["May enhance sedatives and anxiolytics", "Possible interaction with MAO inhibitors", "May affect blood pressure medications"],
    sources: ["Extracts", "Teas", "Tinctures", "Dried herb"],
    relatedCompounds: ["Valerian", "Lemon Balm", "Kava"],
    references: [
      { pmid: "11679026", title: "Passionflower in the treatment of generalized anxiety", authors: "Akhondzadeh S, et al.", journal: "Journal of Clinical Pharmacy and Therapeutics", year: 2001 },
      { pmid: "21294203", title: "Passionflower for anxiety: a review", authors: "Miroddi M, et al.", journal: "Phytomedicine", year: 2013 }
    ]
  },
  {
    id: "lemon-balm",
    name: "Lemon Balm",
    latinName: "Melissa officinalis",
    category: "Herbal Compound",
    studies: 4100,
    image: "🍋",
    description: "Lemon balm is a calming herb from the mint family, containing rosmarinic acid and flavonoids, studied for cognitive enhancement, anxiety relief, and antiviral properties.",
    traditionalUse: "Used in traditional European medicine since the Middle Ages for lifting spirits and promoting sleep. Known as the 'elixir of life' by Paracelsus.",
    keyBenefits: ["Anxiety and stress relief", "Cognitive support", "Sleep quality", "Digestive comfort", "Antiviral activity"],
    mechanisms: ["Rosmarinic acid has GABAergic effects", "Inhibits GABA transaminase", "Acetylcholinesterase inhibition", "Antioxidant activity"],
    dosage: "Tea: 1.5-4.5g dried leaves. Extract: 300-600mg daily. Often combined with other calming herbs.",
    safetyNotes: ["Very safe and well-tolerated", "May affect thyroid function at very high doses", "Safe during pregnancy at culinary doses"],
    interactions: ["May enhance sedative medications", "Theoretical thyroid medication interaction", "May affect glaucoma medications"],
    sources: ["Fresh leaves", "Dried herb", "Extracts", "Teas", "Essential oil"],
    relatedCompounds: ["Valerian", "Passionflower", "Holy Basil"],
    references: [
      { pmid: "14669258", title: "Modulation of mood and cognitive performance following acute administration of Melissa officinalis", authors: "Kennedy DO, et al.", journal: "Pharmacology Biochemistry and Behavior", year: 2002 },
      { pmid: "22207209", title: "A review of the bioactivity and potential health benefits of Melissa officinalis", authors: "Shakeri A, et al.", journal: "Journal of Evidence-Based Complementary and Alternative Medicine", year: 2016 }
    ]
  },
  // Additional Popular Compounds
  {
    id: "saw-palmetto",
    name: "Saw Palmetto",
    latinName: "Serenoa repens",
    category: "Herbal Compound",
    studies: 5200,
    image: "🌴",
    description: "Saw palmetto berry extract is widely used for prostate health, containing fatty acids and phytosterols that may inhibit 5-alpha reductase and support urinary function.",
    traditionalUse: "Native Americans used saw palmetto berries for urinary and reproductive system issues. Introduced to Western medicine in the late 1800s.",
    keyBenefits: ["Prostate health support", "Urinary symptom relief (BPH)", "Hair loss research", "5-alpha reductase inhibition", "Anti-inflammatory effects"],
    mechanisms: ["May inhibit 5-alpha reductase", "Blocks DHT binding to androgen receptors", "Anti-inflammatory prostaglandin effects", "May induce apoptosis in prostate cells"],
    dosage: "Standardized extract: 160mg twice daily or 320mg once daily. Look for 85-95% fatty acid content.",
    safetyNotes: ["Generally well-tolerated", "Rare digestive upset", "May affect PSA test results", "Not for use by women or children"],
    interactions: ["May interact with hormone therapies", "Possible interaction with anticoagulants", "May affect finasteride/dutasteride"],
    sources: ["Berry extracts", "Softgels", "Capsules"],
    relatedCompounds: ["Stinging Nettle Root", "Pygeum", "Beta-Sitosterol"],
    references: [
      { pmid: "22551013", title: "Serenoa repens for benign prostatic hyperplasia: Cochrane review", authors: "Tacklind J, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2012 },
      { pmid: "28930506", title: "Saw palmetto extract mechanisms", authors: "Pais P", journal: "Current Medicinal Chemistry", year: 2016 }
    ]
  },
  {
    id: "elderberry",
    name: "Elderberry",
    latinName: "Sambucus nigra",
    category: "Herbal Immune Support",
    studies: 2800,
    image: "🫐",
    description: "Elderberry is a traditional remedy rich in anthocyanins and flavonoids, studied extensively for immune support and its potential to reduce cold and flu duration and severity.",
    traditionalUse: "Used for centuries in European folk medicine for colds, flu, and fever. Known as the 'medicine chest of the country people.'",
    keyBenefits: ["Immune system support", "Cold and flu symptom reduction", "Antioxidant activity", "Anti-inflammatory effects", "Respiratory health"],
    mechanisms: ["Anthocyanins have antiviral activity", "May prevent viral entry into cells", "Stimulates cytokine production", "Antioxidant through flavonoids"],
    dosage: "Syrup: 15ml (adults) 4 times daily during illness. Extract: 175-300mg daily. Lozenges: as directed.",
    safetyNotes: ["Cooked berries are safe", "Raw berries, bark, leaves are toxic", "May overstimulate immune system in autoimmune conditions"],
    interactions: ["May interact with immunosuppressants", "Theoretical diabetes medication interaction", "May affect diuretic medications"],
    sources: ["Syrup", "Extracts", "Lozenges", "Gummies", "Teas"],
    relatedCompounds: ["Echinacea", "Vitamin C", "Zinc"],
    references: [
      { pmid: "30670267", title: "Elderberry supplementation reduces cold duration and symptoms", authors: "Hawkins J, et al.", journal: "Complementary Therapies in Medicine", year: 2019 },
      { pmid: "15080016", title: "Randomized study of the efficacy and safety of oral elderberry extract in flu", authors: "Zakay-Rones Z, et al.", journal: "Journal of International Medical Research", year: 2004 }
    ]
  },
  // === NEW COMPOUNDS ADDED ===
  {
    id: "quercetin",
    name: "Quercetin",
    latinName: "Quercetin dihydrate",
    category: "Flavonoid",
    studies: 8500,
    image: "🍎",
    description: "Quercetin is a powerful plant flavonoid found in many fruits and vegetables, extensively researched for its antioxidant, anti-inflammatory, and immune-modulating properties.",
    traditionalUse: "Historically consumed through fruits and vegetables like apples, onions, and berries. Modern supplementation began in the late 20th century.",
    keyBenefits: ["Antioxidant protection", "Anti-inflammatory activity", "Immune support", "Cardiovascular health", "Allergy symptom relief"],
    mechanisms: ["Inhibits mast cell degranulation", "Scavenges free radicals", "Inhibits inflammatory enzymes (COX, LOX)", "May inhibit viral replication"],
    dosage: "500-1000mg daily, often combined with bromelain or vitamin C for enhanced absorption.",
    safetyNotes: ["Generally well-tolerated", "Poor bioavailability alone", "High doses may affect kidney function"],
    interactions: ["May interact with antibiotics", "May affect cyclosporine levels", "Possible interaction with blood thinners"],
    sources: ["Apples", "Onions", "Berries", "Supplements", "Green tea"],
    relatedCompounds: ["Bromelain", "Vitamin C", "Rutin"],
    references: [
      { pmid: "27187333", title: "Quercetin: a pleiotropic kinase inhibitor against cancer", authors: "Kashyap D, et al.", journal: "Molecules", year: 2016 },
      { pmid: "26999194", title: "The effects of quercetin supplementation on metabolic factors", authors: "Serban MC, et al.", journal: "Critical Reviews in Food Science and Nutrition", year: 2016 }
    ]
  },
  {
    id: "melatonin",
    name: "Melatonin",
    latinName: "N-acetyl-5-methoxytryptamine",
    category: "Longevity Compound",
    studies: 24000,
    image: "🌙",
    description: "Melatonin is a hormone naturally produced by the pineal gland that regulates sleep-wake cycles. It's extensively researched for sleep, jet lag, and potential anti-aging effects.",
    traditionalUse: "Discovered in 1958, melatonin became popular as a sleep supplement in the 1990s and continues to be one of the most researched sleep aids.",
    keyBenefits: ["Sleep onset support", "Circadian rhythm regulation", "Jet lag relief", "Antioxidant activity", "Immune modulation"],
    mechanisms: ["Binds melatonin receptors (MT1, MT2)", "Regulates circadian clock genes", "Potent antioxidant", "Modulates immune function"],
    dosage: "0.5-5mg 30-60 minutes before bed. Start with lower doses. Extended-release for sleep maintenance.",
    safetyNotes: ["Generally safe short-term", "May cause grogginess", "Not recommended for children without supervision", "May affect fertility"],
    interactions: ["May enhance sedatives", "Interacts with immunosuppressants", "May affect blood pressure medications", "Interacts with anticoagulants"],
    sources: ["Tablets", "Capsules", "Gummies", "Liquid drops", "Sublingual"],
    relatedCompounds: ["Magnesium", "L-Theanine", "GABA", "Valerian"],
    references: [
      { pmid: "28648359", title: "Meta-analysis: melatonin for the treatment of primary sleep disorders", authors: "Ferracioli-Oda E, et al.", journal: "PLoS One", year: 2013 },
      { pmid: "31722088", title: "Melatonin: roles in cardiovascular and neurological disease", authors: "Reiter RJ, et al.", journal: "Journal of Pineal Research", year: 2019 }
    ]
  },
  {
    id: "l-theanine",
    name: "L-Theanine",
    latinName: "γ-glutamylethylamide",
    category: "Amino Acid",
    studies: 3800,
    image: "🍵",
    description: "L-Theanine is an amino acid found primarily in tea leaves, known for promoting relaxation without drowsiness and enhancing focus when combined with caffeine.",
    traditionalUse: "Consumed for centuries through green tea in Asian cultures. Isolated and studied as a supplement since the 1960s in Japan.",
    keyBenefits: ["Relaxation without sedation", "Focus and attention", "Stress reduction", "Sleep quality improvement", "Synergy with caffeine"],
    mechanisms: ["Increases alpha brain waves", "Modulates GABA, dopamine, serotonin", "Crosses blood-brain barrier", "May increase BDNF"],
    dosage: "100-200mg for relaxation. Often paired with 50-100mg caffeine for focused energy.",
    safetyNotes: ["Very safe and well-tolerated", "No significant side effects reported", "Safe for most populations"],
    interactions: ["May enhance blood pressure medications", "May interact with stimulants", "Generally safe to combine with most supplements"],
    sources: ["Green tea", "Black tea", "Supplements", "Functional beverages"],
    relatedCompounds: ["Caffeine", "GABA", "Magnesium"],
    references: [
      { pmid: "18296328", title: "L-theanine and caffeine in combination affect human cognition", authors: "Owen GN, et al.", journal: "Nutritional Neuroscience", year: 2008 },
      { pmid: "31623400", title: "Effects of L-theanine on stress-related symptoms and cognitive function", authors: "Hidese S, et al.", journal: "Nutrients", year: 2019 }
    ]
  },
  {
    id: "collagen",
    name: "Collagen",
    latinName: "Collagen peptides",
    category: "Structural Protein",
    studies: 6200,
    image: "✨",
    description: "Collagen is the most abundant protein in the body, essential for skin, joints, bones, and connective tissue. Supplementation with hydrolyzed collagen peptides is widely researched.",
    traditionalUse: "Consumed through bone broths in traditional cultures worldwide. Modern supplementation emerged in the 1980s for joint and skin health.",
    keyBenefits: ["Skin elasticity and hydration", "Joint health support", "Bone density", "Gut lining support", "Hair and nail strength"],
    mechanisms: ["Provides amino acids (glycine, proline, hydroxyproline)", "Stimulates collagen synthesis", "May reduce collagen degradation", "Supports extracellular matrix"],
    dosage: "2.5-15g daily of hydrolyzed collagen peptides. Types I/III for skin, Type II for joints.",
    safetyNotes: ["Generally very safe", "Rare digestive discomfort", "Source quality important (bovine, marine, chicken)"],
    interactions: ["No significant drug interactions known", "May affect calcium absorption at very high doses"],
    sources: ["Bovine", "Marine", "Chicken", "Bone broth", "Hydrolyzed peptides"],
    relatedCompounds: ["Vitamin C", "Hyaluronic Acid", "MSM"],
    references: [
      { pmid: "30681787", title: "Oral collagen supplementation: a systematic review of dermatological applications", authors: "Choi FD, et al.", journal: "Journal of Drugs in Dermatology", year: 2019 },
      { pmid: "28177710", title: "Collagen peptide supplementation improves joint pain", authors: "Zdzieblik D, et al.", journal: "Applied Physiology, Nutrition, and Metabolism", year: 2017 }
    ]
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    latinName: "Ascorbic acid",
    category: "Water-Soluble Vitamin",
    studies: 68000,
    image: "🍊",
    description: "Vitamin C is an essential water-soluble vitamin and powerful antioxidant, crucial for immune function, collagen synthesis, and protecting cells from oxidative damage.",
    traditionalUse: "Historically used to prevent scurvy. Modern research expanded to immune support, antioxidant activity, and numerous health applications.",
    keyBenefits: ["Immune system support", "Collagen synthesis", "Antioxidant protection", "Iron absorption enhancement", "Wound healing"],
    mechanisms: ["Essential cofactor for enzymes", "Donates electrons to neutralize free radicals", "Required for collagen hydroxylation", "Regenerates vitamin E"],
    dosage: "RDA: 75-90mg. Therapeutic doses: 500-2000mg daily. Liposomal forms for enhanced absorption.",
    safetyNotes: ["Water-soluble, excess excreted", "High doses may cause GI upset", "May affect certain lab tests", "Caution with iron overload conditions"],
    interactions: ["Enhances iron absorption", "May interact with chemotherapy drugs", "May affect aluminum-containing antacids"],
    sources: ["Citrus fruits", "Bell peppers", "Berries", "Supplements", "Liposomal formulas"],
    relatedCompounds: ["Vitamin E", "Quercetin", "Zinc"],
    references: [
      { pmid: "29099763", title: "Vitamin C and immune function", authors: "Carr AC, Maggini S", journal: "Nutrients", year: 2017 },
      { pmid: "23440782", title: "Vitamin C for preventing and treating the common cold", authors: "Hemilä H, Chalker E", journal: "Cochrane Database of Systematic Reviews", year: 2013 }
    ]
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    latinName: "Cobalamin",
    category: "Water-Soluble Vitamin",
    studies: 32000,
    image: "🔴",
    description: "Vitamin B12 is essential for nerve function, DNA synthesis, and red blood cell formation. Deficiency is common, especially in vegans and older adults.",
    traditionalUse: "Discovered as treatment for pernicious anemia. Now recognized as essential for neurological health and energy metabolism.",
    keyBenefits: ["Nerve health", "Red blood cell formation", "Energy metabolism", "DNA synthesis", "Cognitive function"],
    mechanisms: ["Cofactor for methionine synthase", "Essential for methylation reactions", "Required for myelin synthesis", "Supports homocysteine metabolism"],
    dosage: "RDA: 2.4mcg. Supplemental: 500-2000mcg for deficiency. Methylcobalamin or adenosylcobalamin preferred.",
    safetyNotes: ["Very safe even at high doses", "No upper limit established", "Absorption decreases with age", "Intrinsic factor required for absorption"],
    interactions: ["Metformin reduces absorption", "PPIs may reduce absorption", "May interact with chloramphenicol"],
    sources: ["Methylcobalamin", "Cyanocobalamin", "Sublingual", "Injections", "Fortified foods"],
    relatedCompounds: ["Folate", "B-Complex", "Iron"],
    references: [
      { pmid: "28660890", title: "Vitamin B12 in health and disease", authors: "O'Leary F, Samman S", journal: "Nutrients", year: 2010 },
      { pmid: "29477221", title: "B12 deficiency and neurological manifestations", authors: "Stabler SP", journal: "Annual Review of Nutrition", year: 2013 }
    ]
  },
  {
    id: "folate",
    name: "Folate",
    latinName: "Vitamin B9",
    category: "Water-Soluble Vitamin",
    studies: 45000,
    image: "🥬",
    description: "Folate is essential for DNA synthesis, cell division, and methylation. Critical during pregnancy for neural tube development. Many people have MTHFR variants affecting metabolism.",
    traditionalUse: "Isolated from spinach in 1941. Recognized as critical for pregnancy outcomes and now fortified in many foods.",
    keyBenefits: ["Neural tube defect prevention", "DNA synthesis", "Methylation support", "Red blood cell formation", "Homocysteine regulation"],
    mechanisms: ["Provides one-carbon units for methylation", "Essential for purine and pyrimidine synthesis", "Cofactor for homocysteine metabolism"],
    dosage: "RDA: 400mcg DFE. Pregnancy: 600-800mcg. Methylfolate (5-MTHF) for those with MTHFR variants.",
    safetyNotes: ["Generally safe", "High folic acid may mask B12 deficiency", "Methylfolate preferred for MTHFR variants"],
    interactions: ["Methotrexate antagonism", "May interact with anti-seizure medications", "Sulfasalazine reduces absorption"],
    sources: ["Leafy greens", "Legumes", "Folic acid (synthetic)", "Methylfolate (active)"],
    relatedCompounds: ["Vitamin B12", "B-Complex", "SAMe"],
    references: [
      { pmid: "22992251", title: "Folate and neural tube defects", authors: "Czeizel AE, et al.", journal: "Nutrients", year: 2013 },
      { pmid: "26828517", title: "MTHFR polymorphisms and folate status", authors: "Tsang BL, et al.", journal: "Birth Defects Research Part A", year: 2015 }
    ]
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    latinName: "Tocopherols/Tocotrienols",
    category: "Fat-Soluble Vitamin",
    studies: 38000,
    image: "🌻",
    description: "Vitamin E is a fat-soluble antioxidant protecting cell membranes from oxidative damage. The family includes tocopherols and tocotrienols with varying bioactivities.",
    traditionalUse: "Discovered in 1922 as essential for reproduction in rats. Now recognized as a major lipid-soluble antioxidant.",
    keyBenefits: ["Antioxidant protection", "Skin health", "Immune support", "Cardiovascular research", "Neurological protection"],
    mechanisms: ["Terminates lipid peroxidation chain reactions", "Protects cell membranes", "Modulates gene expression", "Supports immune cell function"],
    dosage: "RDA: 15mg (22.4 IU). Mixed tocopherols/tocotrienols preferred over synthetic dl-alpha-tocopherol.",
    safetyNotes: ["High doses may increase bleeding risk", "Synthetic form less effective", "May interfere with vitamin K"],
    interactions: ["May enhance anticoagulant effects", "May interact with statins", "Affects vitamin K absorption"],
    sources: ["Nuts", "Seeds", "Vegetable oils", "Mixed tocopherols", "Tocotrienols"],
    relatedCompounds: ["Vitamin C", "Selenium", "CoQ10"],
    references: [
      { pmid: "22419320", title: "The role of vitamin E in human health", authors: "Rizvi S, et al.", journal: "Sultan Qaboos University Medical Journal", year: 2014 },
      { pmid: "25077263", title: "Vitamin E: metabolism and requirements", authors: "Traber MG, Stevens JF", journal: "Advances in Nutrition", year: 2011 }
    ]
  },
  {
    id: "vitamin-k2",
    name: "Vitamin K2",
    latinName: "Menaquinone",
    category: "Fat-Soluble Vitamin",
    studies: 4200,
    image: "🧀",
    description: "Vitamin K2 (menaquinone) directs calcium to bones and teeth while keeping it out of arteries. Different forms (MK-4, MK-7) have varying half-lives and tissue distributions.",
    traditionalUse: "Traditional diets rich in K2 through fermented foods (natto, cheese). Modern research focuses on bone and cardiovascular health.",
    keyBenefits: ["Bone health", "Arterial calcification prevention", "Dental health", "Cardiovascular support", "Synergy with vitamin D"],
    mechanisms: ["Activates osteocalcin (bones)", "Activates matrix Gla protein (arteries)", "Carboxylates vitamin K-dependent proteins"],
    dosage: "MK-7: 100-200mcg daily. MK-4: 1-45mg (higher doses studied in Japan). Take with fat for absorption.",
    safetyNotes: ["Generally very safe", "No known toxicity", "May affect anticoagulant therapy"],
    interactions: ["Interacts with warfarin/coumadin", "Synergistic with vitamin D3", "May affect some antibiotics"],
    sources: ["Natto", "Hard cheeses", "Egg yolks", "MK-7 supplements", "MK-4 supplements"],
    relatedCompounds: ["Vitamin D3", "Calcium", "Magnesium"],
    references: [
      { pmid: "25516361", title: "Vitamin K2 and cardiovascular calcification", authors: "Halder M, et al.", journal: "International Journal of Molecular Sciences", year: 2019 },
      { pmid: "23525894", title: "Three-year vitamin K2 supplementation and bone loss", authors: "Knapen MH, et al.", journal: "Osteoporosis International", year: 2013 }
    ]
  },
  {
    id: "vitamin-a",
    name: "Vitamin A",
    latinName: "Retinol/Beta-carotene",
    category: "Fat-Soluble Vitamin",
    studies: 52000,
    image: "🥕",
    description: "Vitamin A is essential for vision, immune function, and cell differentiation. Available as preformed retinol (animal sources) or provitamin A carotenoids (plant sources).",
    traditionalUse: "Ancient Egyptians used liver to treat night blindness. Modern understanding of vitamin A developed in the early 20th century.",
    keyBenefits: ["Vision health", "Immune function", "Skin health", "Cell differentiation", "Reproductive health"],
    mechanisms: ["Binds retinoic acid receptors (RARs)", "Essential for rhodopsin (vision)", "Regulates gene expression", "Supports epithelial integrity"],
    dosage: "RDA: 700-900mcg RAE. Beta-carotene: 3-6mg. Avoid high-dose retinol during pregnancy.",
    safetyNotes: ["Retinol can be toxic at high doses", "Beta-carotene generally safe", "Teratogenic - avoid high doses in pregnancy"],
    interactions: ["May interact with retinoid medications", "Orlistat reduces absorption", "Alcohol increases toxicity risk"],
    sources: ["Liver", "Egg yolks", "Carrots", "Sweet potatoes", "Beta-carotene supplements"],
    relatedCompounds: ["Vitamin D", "Vitamin E", "Zinc"],
    references: [
      { pmid: "31142942", title: "Vitamin A and immune function", authors: "Huang Z, et al.", journal: "Journal of Clinical Medicine", year: 2018 },
      { pmid: "26062574", title: "Retinoid signaling and skin health", authors: "Zasada M, Budzisz E", journal: "Advances in Dermatology and Allergology", year: 2019 }
    ]
  },
  {
    id: "biotin",
    name: "Biotin",
    latinName: "Vitamin B7",
    category: "Water-Soluble Vitamin",
    studies: 8900,
    image: "💅",
    description: "Biotin is a B-vitamin essential for metabolism of fats, carbohydrates, and proteins. Popular for hair, skin, and nail support, though deficiency is rare.",
    traditionalUse: "Discovered in the early 20th century. Now widely marketed for cosmetic benefits, particularly hair and nail growth.",
    keyBenefits: ["Hair health", "Nail strength", "Skin health", "Energy metabolism", "Blood sugar support"],
    mechanisms: ["Cofactor for carboxylase enzymes", "Essential for fatty acid synthesis", "Required for gluconeogenesis", "Supports keratin production"],
    dosage: "Adequate intake: 30mcg. Supplemental: 2.5-10mg for hair/nail support (much higher than AI).",
    safetyNotes: ["Very safe, no known toxicity", "High doses interfere with lab tests", "May affect thyroid and cardiac biomarker tests"],
    interactions: ["Raw egg whites block absorption", "Some anticonvulsants reduce levels", "May interfere with lab assays"],
    sources: ["Eggs", "Nuts", "Legumes", "Supplements", "Organ meats"],
    relatedCompounds: ["B-Complex", "Collagen", "Silica"],
    references: [
      { pmid: "28879195", title: "Biotin deficiency and supplementation", authors: "Patel DP, et al.", journal: "Skin Appendage Disorders", year: 2017 },
      { pmid: "29057689", title: "Biotin interference with laboratory tests", authors: "Trambas CM, et al.", journal: "Clinical Biochemistry", year: 2018 }
    ]
  },
  {
    id: "dhea",
    name: "DHEA",
    latinName: "Dehydroepiandrosterone",
    category: "Longevity Compound",
    studies: 11000,
    image: "⚡",
    description: "DHEA is a hormone produced by the adrenal glands that serves as a precursor to sex hormones. Levels decline with age, leading to research on supplementation for aging.",
    traditionalUse: "Discovered in 1934. Became popular as an anti-aging supplement in the 1990s. Considered a controlled substance in some countries.",
    keyBenefits: ["Hormone precursor", "Aging research", "Adrenal support", "Bone density", "Mood and cognition"],
    mechanisms: ["Converts to testosterone and estrogen", "Neurosteroid activity", "May affect insulin sensitivity", "Modulates immune function"],
    dosage: "25-100mg daily for adults. Lower doses (10-25mg) for women. Test levels before supplementing.",
    safetyNotes: ["May cause hormonal side effects", "Acne, hair loss possible", "Not for hormone-sensitive conditions", "Banned in sports"],
    interactions: ["May affect hormone therapies", "Interacts with insulin", "May affect anticoagulants"],
    sources: ["Capsules", "Micronized powder", "Topical creams"],
    relatedCompounds: ["Pregnenolone", "7-Keto DHEA", "Testosterone"],
    references: [
      { pmid: "16728551", title: "DHEA supplementation: current perspective", authors: "Panjari M, Davis SR", journal: "Journal of Clinical Endocrinology and Metabolism", year: 2007 },
      { pmid: "30209409", title: "DHEA and aging: contribution of DHEA to health and well-being", authors: "Rutkowski K, et al.", journal: "Gynecological Endocrinology", year: 2014 }
    ]
  },
  {
    id: "msm",
    name: "MSM",
    latinName: "Methylsulfonylmethane",
    category: "Performance Compound",
    studies: 2400,
    image: "💪",
    description: "MSM is an organic sulfur compound found naturally in plants and animals. Widely used for joint health, exercise recovery, and anti-inflammatory support.",
    traditionalUse: "Developed as a supplement in the 1980s. Became popular for arthritis and joint pain in the 1990s alongside glucosamine.",
    keyBenefits: ["Joint health", "Exercise recovery", "Anti-inflammatory", "Skin and hair support", "Sulfur donor"],
    mechanisms: ["Provides bioavailable sulfur", "May reduce inflammatory cytokines", "Supports glutathione production", "May protect cartilage"],
    dosage: "1-3g daily for joint support. Up to 6g studied for exercise recovery. Often combined with glucosamine.",
    safetyNotes: ["Generally very safe", "Mild GI effects possible", "May cause headache initially"],
    interactions: ["May enhance blood thinners", "Generally safe to combine with other joint supplements"],
    sources: ["Powders", "Capsules", "Topical creams", "Combined formulas"],
    relatedCompounds: ["Glucosamine", "Chondroitin", "Collagen"],
    references: [
      { pmid: "26502953", title: "MSM in the treatment of osteoarthritis: a systematic review", authors: "Brien S, et al.", journal: "Osteoarthritis and Cartilage", year: 2008 },
      { pmid: "28085145", title: "MSM supplementation and exercise-induced oxidative stress", authors: "Nakhostin-Roohi B, et al.", journal: "Journal of Pharmacy and Pharmacology", year: 2011 }
    ]
  },
  {
    id: "glucosamine",
    name: "Glucosamine",
    latinName: "Glucosamine sulfate",
    category: "Performance Compound",
    studies: 7800,
    image: "🦴",
    description: "Glucosamine is a naturally occurring compound essential for cartilage formation. One of the most widely studied supplements for osteoarthritis and joint health.",
    traditionalUse: "Developed in Europe in the 1960s for arthritis. Became popular in North America in the 1990s.",
    keyBenefits: ["Cartilage support", "Joint comfort", "Osteoarthritis symptoms", "Synovial fluid health", "Joint structure"],
    mechanisms: ["Provides building blocks for glycosaminoglycans", "May stimulate chondrocyte metabolism", "Anti-inflammatory effects", "May inhibit cartilage degradation"],
    dosage: "1500mg daily (glucosamine sulfate preferred). Often combined with chondroitin 1200mg.",
    safetyNotes: ["Generally well-tolerated", "Shellfish allergy concern (most derived from shellfish)", "May affect blood sugar"],
    interactions: ["May enhance warfarin effects", "May interact with diabetes medications", "May affect some chemotherapy drugs"],
    sources: ["Shellfish-derived", "Vegan (corn-derived)", "Sulfate or HCl forms"],
    relatedCompounds: ["Chondroitin", "MSM", "Hyaluronic Acid"],
    references: [
      { pmid: "17593428", title: "Glucosamine for osteoarthritis: Cochrane review", authors: "Towheed TE, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2005 },
      { pmid: "24942086", title: "Glucosamine and joint health in athletes", authors: "Braham R, et al.", journal: "British Journal of Sports Medicine", year: 2003 }
    ]
  },
  {
    id: "hyaluronic-acid",
    name: "Hyaluronic Acid",
    latinName: "Hyaluronan",
    category: "Structural Protein",
    studies: 14000,
    image: "💧",
    description: "Hyaluronic acid is a glycosaminoglycan naturally found in skin, joints, and eyes. It holds water and provides lubrication and hydration to tissues.",
    traditionalUse: "Discovered in 1934. Used medically for eye surgery and joint injections. Oral supplementation gained popularity in the 2000s.",
    keyBenefits: ["Skin hydration", "Joint lubrication", "Wound healing", "Eye health", "Anti-aging"],
    mechanisms: ["Holds 1000x its weight in water", "Lubricates joints and eyes", "Supports tissue repair", "Interacts with CD44 receptors"],
    dosage: "120-240mg daily oral. Low molecular weight for skin. High molecular weight for joints.",
    safetyNotes: ["Very safe orally", "Injection site reactions possible", "Generally well-tolerated"],
    interactions: ["May enhance NSAIDs for joint support", "No significant drug interactions known"],
    sources: ["Bacterial fermentation", "Rooster comb extract", "Supplements", "Serums", "Injections"],
    relatedCompounds: ["Collagen", "Glucosamine", "Chondroitin"],
    references: [
      { pmid: "28952153", title: "Oral hyaluronic acid and skin aging", authors: "Kawada C, et al.", journal: "Nutrition Journal", year: 2017 },
      { pmid: "26824400", title: "Hyaluronic acid and osteoarthritis", authors: "Bowman S, et al.", journal: "Clinical Medicine Insights: Arthritis and Musculoskeletal Disorders", year: 2018 }
    ]
  },
  {
    id: "alpha-lipoic-acid",
    name: "Alpha Lipoic Acid",
    latinName: "Thioctic acid",
    category: "Mitochondrial Support",
    studies: 8200,
    image: "🔋",
    description: "Alpha lipoic acid (ALA) is a potent antioxidant that works in both water and fat-soluble environments. It's synthesized in mitochondria and studied for neuropathy and metabolic health.",
    traditionalUse: "Discovered in the 1950s. Used medically in Germany for diabetic neuropathy since the 1960s.",
    keyBenefits: ["Antioxidant (water + fat soluble)", "Diabetic neuropathy", "Blood sugar support", "Regenerates other antioxidants", "Mitochondrial function"],
    mechanisms: ["Cofactor for mitochondrial enzymes", "Regenerates vitamins C, E, and glutathione", "Chelates heavy metals", "Improves insulin sensitivity"],
    dosage: "300-600mg daily. R-lipoic acid more bioavailable than racemic mixture. Take on empty stomach.",
    safetyNotes: ["May lower blood sugar", "Can cause GI upset", "May affect thyroid function"],
    interactions: ["May enhance diabetes medications", "May affect thyroid medications", "May increase insulin sensitivity"],
    sources: ["R-lipoic acid", "R/S-lipoic acid (racemic)", "Sustained release"],
    relatedCompounds: ["CoQ10", "NAC", "Acetyl-L-Carnitine"],
    references: [
      { pmid: "21666939", title: "Alpha-lipoic acid in diabetic neuropathy", authors: "Ziegler D, et al.", journal: "Diabetes Care", year: 2011 },
      { pmid: "29990473", title: "Alpha-lipoic acid as a biological antioxidant", authors: "Rochette L, et al.", journal: "Biochimica et Biophysica Acta", year: 2015 }
    ]
  },
  {
    id: "acetyl-l-carnitine",
    name: "Acetyl-L-Carnitine",
    latinName: "ALCAR",
    category: "Mitochondrial Support",
    studies: 5400,
    image: "🧠",
    description: "Acetyl-L-carnitine is the acetylated form of L-carnitine that crosses the blood-brain barrier. Studied for cognitive function, neuropathy, and mitochondrial energy production.",
    traditionalUse: "L-carnitine discovered in 1905. ALCAR developed as a more bioavailable form for brain and nerve health in later decades.",
    keyBenefits: ["Cognitive support", "Neuropathy relief", "Mitochondrial function", "Mood support", "Exercise performance"],
    mechanisms: ["Transports fatty acids into mitochondria", "Provides acetyl groups for acetylcholine", "Crosses blood-brain barrier", "Supports nerve regeneration"],
    dosage: "500-2000mg daily. Often combined with alpha lipoic acid. Higher doses (3g) studied for neuropathy.",
    safetyNotes: ["Generally well-tolerated", "May cause GI upset", "Fishy body odor at high doses possible"],
    interactions: ["May enhance anticoagulants", "May interact with thyroid medications", "May affect seizure medications"],
    sources: ["Capsules", "Powder", "Combined formulas"],
    relatedCompounds: ["Alpha Lipoic Acid", "CoQ10", "L-Carnitine"],
    references: [
      { pmid: "12595152", title: "Acetyl-L-carnitine and cognitive decline", authors: "Montgomery SA, et al.", journal: "International Clinical Psychopharmacology", year: 2003 },
      { pmid: "26677204", title: "Acetyl-L-carnitine for diabetic neuropathy", authors: "Li S, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2015 }
    ]
  },
  {
    id: "creatine",
    name: "Creatine",
    latinName: "Creatine monohydrate",
    category: "Performance Compound",
    studies: 7500,
    image: "💪",
    description: "Creatine is one of the most researched sports supplements, naturally found in muscle tissue. It enhances ATP regeneration for high-intensity exercise and has emerging cognitive benefits.",
    traditionalUse: "Discovered in 1832. Became popular as a sports supplement in the 1990s after research confirmed performance benefits.",
    keyBenefits: ["Strength and power", "Muscle mass", "Exercise recovery", "Cognitive function", "Brain energy support"],
    mechanisms: ["Regenerates ATP from ADP", "Increases phosphocreatine stores", "May support brain energy", "Osmotic cell volumization"],
    dosage: "3-5g daily maintenance. Loading phase optional (20g/day for 5-7 days). Monohydrate is gold standard.",
    safetyNotes: ["Very safe and well-researched", "May cause water retention initially", "Stay hydrated"],
    interactions: ["May affect kidney function markers (creatinine)", "Safe with most supplements", "NSAIDs may reduce effectiveness"],
    sources: ["Monohydrate", "Micronized", "Buffered", "HCl forms"],
    relatedCompounds: ["Beta-Alanine", "Citrulline", "HMB"],
    references: [
      { pmid: "28615996", title: "International Society of Sports Nutrition position stand: creatine", authors: "Kreider RB, et al.", journal: "Journal of the International Society of Sports Nutrition", year: 2017 },
      { pmid: "29704637", title: "Creatine for cognitive function", authors: "Avgerinos KI, et al.", journal: "Experimental Gerontology", year: 2018 }
    ]
  },
  {
    id: "spirulina",
    name: "Spirulina",
    latinName: "Arthrospira platensis",
    category: "Blue-Green Algae",
    studies: 4800,
    image: "🌊",
    description: "Spirulina is a nutrient-dense blue-green algae rich in protein, vitamins, minerals, and antioxidants. Used as a superfood and studied for various health benefits.",
    traditionalUse: "Consumed by Aztecs and African cultures for centuries. NASA has studied it as potential food for space missions.",
    keyBenefits: ["Nutrient density", "Antioxidant support", "Immune modulation", "Cholesterol support", "Heavy metal chelation"],
    mechanisms: ["Rich in phycocyanin (antioxidant)", "Contains complete protein", "Provides chlorophyll and carotenoids", "May modulate immune response"],
    dosage: "1-3g daily for general health. Up to 10g studied in research. Start low to assess tolerance.",
    safetyNotes: ["Source quality crucial (contamination risk)", "May cause GI upset initially", "Blue-green tinge to stools normal"],
    interactions: ["May enhance immunosuppressants", "May affect anticoagulants", "Safe with most supplements"],
    sources: ["Tablets", "Powder", "Flakes", "Capsules"],
    relatedCompounds: ["Chlorella", "Marine Phytoplankton", "Barley Grass"],
    references: [
      { pmid: "23544470", title: "Spirulina in clinical practice: evidence-based human applications", authors: "Karkos PD, et al.", journal: "Evidence-Based Complementary and Alternative Medicine", year: 2011 },
      { pmid: "26433766", title: "Antioxidant, anti-inflammatory effects of spirulina", authors: "Wu Q, et al.", journal: "Journal of Agricultural and Food Chemistry", year: 2016 }
    ]
  },
  {
    id: "chlorella",
    name: "Chlorella",
    latinName: "Chlorella vulgaris",
    category: "Blue-Green Algae",
    studies: 3200,
    image: "🌱",
    description: "Chlorella is a single-celled green algae known for its chlorophyll content and ability to bind heavy metals. Popular for detoxification and nutritional support.",
    traditionalUse: "Researched in Japan after WWII as a potential food source. Now popular worldwide as a detox and nutrition supplement.",
    keyBenefits: ["Detoxification support", "Heavy metal binding", "Nutrient density", "Immune support", "Chlorophyll source"],
    mechanisms: ["Cell wall binds heavy metals and toxins", "Rich in chlorophyll", "Contains Chlorella Growth Factor (CGF)", "Provides nucleotides"],
    dosage: "2-3g daily for general use. Up to 10g for detox protocols. Broken cell wall for absorption.",
    safetyNotes: ["Start slowly (may cause detox symptoms)", "Source quality important", "May cause GI upset initially"],
    interactions: ["May affect immunosuppressants", "May interact with warfarin (vitamin K content)", "Safe with most supplements"],
    sources: ["Broken cell wall tablets", "Powder", "Capsules"],
    relatedCompounds: ["Spirulina", "Chlorophyll", "Cilantro"],
    references: [
      { pmid: "26561078", title: "Chlorella supplementation and detoxification", authors: "Merchant RE, Andre CA", journal: "Alternative Therapies in Health and Medicine", year: 2001 },
      { pmid: "30799748", title: "Health benefits of chlorella: a systematic review", authors: "Bito T, et al.", journal: "Nutrients", year: 2020 }
    ]
  },
  {
    id: "rhodiola",
    name: "Rhodiola",
    latinName: "Rhodiola rosea",
    category: "Adaptogen",
    studies: 3600,
    image: "🏔️",
    description: "Rhodiola is an adaptogenic herb from arctic regions, traditionally used for stamina and stress resistance. Research focuses on fatigue, cognitive function, and mood.",
    traditionalUse: "Used for centuries in Russia and Scandinavia for endurance and to combat harsh climates. Called 'golden root' in traditional medicine.",
    keyBenefits: ["Stress adaptation", "Mental fatigue", "Physical performance", "Mood support", "Cognitive function"],
    mechanisms: ["Modulates cortisol and stress response", "Affects serotonin and dopamine", "Contains rosavins and salidroside", "Supports HPA axis function"],
    dosage: "200-600mg daily of standardized extract (3% rosavins, 1% salidroside). Take in morning or before stress.",
    safetyNotes: ["May cause stimulation in some", "Avoid late in day if sleep-sensitive", "Generally well-tolerated"],
    interactions: ["May interact with stimulants", "May affect antidepressants", "May enhance caffeine effects"],
    sources: ["Root extracts", "Capsules", "Tinctures"],
    relatedCompounds: ["Ashwagandha", "Eleuthero", "Ginseng"],
    references: [
      { pmid: "22643043", title: "Rhodiola rosea for physical and mental fatigue: a systematic review", authors: "Ishaque S, et al.", journal: "BMC Complementary and Alternative Medicine", year: 2012 },
      { pmid: "29325481", title: "Rhodiola rosea L. for cognitive function", authors: "Ma GP, et al.", journal: "Phytomedicine", year: 2018 }
    ]
  },
  {
    id: "cordyceps",
    name: "Cordyceps",
    latinName: "Cordyceps militaris",
    category: "Functional Mushroom",
    studies: 3100,
    image: "🍄",
    description: "Cordyceps is a medicinal mushroom traditionally used for energy and athletic performance. Contains cordycepin and adenosine which may support ATP production and oxygen utilization.",
    traditionalUse: "Used in Traditional Chinese Medicine for over 1000 years for energy, libido, and longevity. Wild cordyceps highly prized and expensive.",
    keyBenefits: ["Energy and stamina", "Athletic performance", "Oxygen utilization", "Immune modulation", "Kidney and lung support"],
    mechanisms: ["May increase ATP production", "Contains cordycepin (adenosine analog)", "Supports oxygen efficiency", "Modulates immune function"],
    dosage: "1-3g daily of extract. Cordyceps militaris (cultivated) commonly used. CS-4 strain also popular.",
    safetyNotes: ["Generally safe", "May cause mild GI effects", "Avoid in autoimmune conditions without guidance"],
    interactions: ["May affect immunosuppressants", "May enhance anticoagulants", "May lower blood sugar"],
    sources: ["Fruiting body extracts", "Mycelium", "CS-4 fermented", "Powder", "Capsules"],
    relatedCompounds: ["Lion's Mane", "Reishi", "Chaga"],
    references: [
      { pmid: "27408987", title: "Cordyceps militaris improves tolerance to high-intensity exercise", authors: "Hirsch KR, et al.", journal: "Journal of Dietary Supplements", year: 2017 },
      { pmid: "32062835", title: "Pharmacological actions of Cordyceps", authors: "Das SK, et al.", journal: "Journal of Ayurveda and Integrative Medicine", year: 2010 }
    ]
  },
  {
    id: "chaga",
    name: "Chaga",
    latinName: "Inonotus obliquus",
    category: "Functional Mushroom",
    studies: 1800,
    image: "🍄",
    description: "Chaga is a fungus that grows on birch trees in cold climates. Rich in antioxidants, betulinic acid, and beta-glucans, it's traditionally used for immune support and overall vitality.",
    traditionalUse: "Used for centuries in Siberian and Northern European folk medicine. Called 'King of Medicinal Mushrooms' in some traditions.",
    keyBenefits: ["Antioxidant support", "Immune modulation", "Anti-inflammatory", "Skin health", "Blood sugar support"],
    mechanisms: ["Contains melanin and betulinic acid", "Rich in superoxide dismutase (SOD)", "Beta-glucans for immune function", "Triterpenes for inflammation"],
    dosage: "1-3g daily of extract. Tea traditionally consumed. Dual extraction (water + alcohol) captures most compounds.",
    safetyNotes: ["May lower blood sugar", "May affect anticoagulants", "Source from birch trees for betulinic acid"],
    interactions: ["May enhance blood thinners", "May interact with diabetes medications", "May affect immunosuppressants"],
    sources: ["Wild-harvested chunks", "Extracts", "Teas", "Tinctures"],
    relatedCompounds: ["Reishi", "Turkey Tail", "Lion's Mane"],
    references: [
      { pmid: "21820502", title: "Antioxidant and anti-inflammatory activities of Inonotus obliquus", authors: "Park YK, et al.", journal: "Journal of Ethnopharmacology", year: 2005 },
      { pmid: "28771205", title: "Chaga mushroom extract and its bioactive compounds", authors: "Lu Y, et al.", journal: "International Journal of Biological Macromolecules", year: 2021 }
    ]
  },
  {
    id: "reishi",
    name: "Reishi",
    latinName: "Ganoderma lucidum",
    category: "Functional Mushroom",
    studies: 5800,
    image: "🍄",
    description: "Reishi is known as the 'mushroom of immortality' in Traditional Chinese Medicine. Research focuses on immune modulation, stress adaptation, and sleep support.",
    traditionalUse: "Used for over 2000 years in China and Japan for longevity and spiritual cultivation. Reserved for royalty in ancient times.",
    keyBenefits: ["Immune modulation", "Stress adaptation", "Sleep quality", "Liver support", "Cardiovascular health"],
    mechanisms: ["Beta-glucans modulate immune cells", "Triterpenes support liver and inflammation", "May calm nervous system", "Adaptogenic effects on HPA axis"],
    dosage: "1-3g daily of extract. Higher doses (up to 9g) used in traditional medicine. Dual extraction preferred.",
    safetyNotes: ["Generally safe long-term", "May thin blood slightly", "Avoid before surgery"],
    interactions: ["May enhance anticoagulants", "May affect blood pressure medications", "May interact with immunosuppressants"],
    sources: ["Fruiting body extracts", "Spore oil", "Mycelium", "Dual extracts"],
    relatedCompounds: ["Lion's Mane", "Turkey Tail", "Cordyceps"],
    references: [
      { pmid: "27045603", title: "Ganoderma lucidum (Reishi) in cancer treatment", authors: "Jin X, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2016 },
      { pmid: "22593926", title: "Reishi mushroom for sleep and fatigue", authors: "Tang W, et al.", journal: "Journal of Ethnopharmacology", year: 2005 }
    ]
  },
  {
    id: "maca",
    name: "Maca",
    latinName: "Lepidium meyenii",
    category: "Adaptogen",
    studies: 2400,
    image: "🌰",
    description: "Maca is a Peruvian root vegetable traditionally used for energy, fertility, and hormonal balance. Different colors (yellow, red, black) may have varying effects.",
    traditionalUse: "Cultivated in the Andes for over 2000 years. Used by Incan warriors for strength and endurance before battles.",
    keyBenefits: ["Energy and stamina", "Libido support", "Hormonal balance", "Mood and focus", "Fertility research"],
    mechanisms: ["Contains macamides and macaenes", "May support hormone production", "Adaptogenic stress response", "Rich in minerals and amino acids"],
    dosage: "1.5-3g daily of dried root or extract. Gelatinized form more digestible. Colors may be chosen for specific goals.",
    safetyNotes: ["Generally very safe", "May cause GI upset in some", "Thyroid concerns at very high doses (goitrogens)"],
    interactions: ["May affect hormone therapies", "Generally safe with most supplements", "Consult before hormone-sensitive conditions"],
    sources: ["Gelatinized powder", "Raw powder", "Capsules", "Extracts"],
    relatedCompounds: ["Ashwagandha", "Rhodiola", "Tribulus"],
    references: [
      { pmid: "19781622", title: "Maca reduces blood pressure and depression in postmenopausal women", authors: "Stojanovska L, et al.", journal: "Climacteric", year: 2015 },
      { pmid: "24931003", title: "Maca for sexual dysfunction: a systematic review", authors: "Shin BC, et al.", journal: "BMC Complementary and Alternative Medicine", year: 2010 }
    ]
  },
  {
    id: "boswellia",
    name: "Boswellia",
    latinName: "Boswellia serrata",
    category: "Herbal Compound",
    studies: 3400,
    image: "🌳",
    description: "Boswellia, also known as Indian frankincense, contains boswellic acids that inhibit inflammatory pathways. Widely researched for joint health and inflammatory conditions.",
    traditionalUse: "Used in Ayurvedic medicine for thousands of years for arthritis and inflammatory conditions. Also used in religious ceremonies.",
    keyBenefits: ["Joint comfort", "Anti-inflammatory", "Respiratory health", "Gut health (IBD research)", "Brain health"],
    mechanisms: ["Inhibits 5-LOX enzyme", "Reduces leukotriene synthesis", "May preserve cartilage", "Modulates inflammatory cytokines"],
    dosage: "300-500mg 2-3 times daily of standardized extract (65% boswellic acids). AKBA-enriched forms more potent.",
    safetyNotes: ["Generally well-tolerated", "May cause GI upset", "Rare allergic reactions"],
    interactions: ["May enhance NSAIDs", "May interact with immunosuppressants", "Generally safe with joint supplements"],
    sources: ["Standardized extracts", "AKBA-enriched forms", "Combination joint formulas"],
    relatedCompounds: ["Curcumin", "Ginger", "Willow Bark"],
    references: [
      { pmid: "29925510", title: "Boswellia serrata for osteoarthritis", authors: "Yu G, et al.", journal: "Phytomedicine", year: 2020 },
      { pmid: "30564920", title: "Anti-inflammatory mechanisms of boswellic acids", authors: "Ammon HPT", journal: "Phytomedicine", year: 2019 }
    ]
  },
  {
    id: "fish-oil",
    name: "Fish Oil",
    latinName: "EPA/DHA",
    category: "Essential Fatty Acid",
    studies: 28000,
    image: "🐟",
    description: "Fish oil provides omega-3 fatty acids EPA and DHA, essential for brain, heart, and inflammatory health. One of the most researched supplements worldwide.",
    traditionalUse: "Cod liver oil used medicinally since the 1700s. Modern fish oil supplements developed in the 1980s for cardiovascular health.",
    keyBenefits: ["Cardiovascular health", "Brain function", "Anti-inflammatory", "Eye health", "Mood support"],
    mechanisms: ["Incorporates into cell membranes", "Precursor to anti-inflammatory resolvins", "Reduces triglycerides", "Supports neurotransmitter function"],
    dosage: "1-4g combined EPA/DHA daily. Higher EPA for inflammation, higher DHA for brain. Take with meals.",
    safetyNotes: ["May cause fishy burps", "May thin blood at high doses", "Quality and purity important"],
    interactions: ["May enhance anticoagulants", "May affect blood pressure medications", "May interact with some chemotherapy"],
    sources: ["Triglyceride form", "Ethyl ester form", "Concentrated formulas", "Krill oil alternative"],
    relatedCompounds: ["Krill Oil", "Algae DHA", "Cod Liver Oil"],
    references: [
      { pmid: "29990473", title: "Omega-3 fatty acids and cardiovascular disease", authors: "Abdelhamid AS, et al.", journal: "Cochrane Database of Systematic Reviews", year: 2018 },
      { pmid: "28493329", title: "EPA and DHA for brain health", authors: "Dyall SC", journal: "Frontiers in Aging Neuroscience", year: 2015 }
    ]
  },
  {
    id: "krill-oil",
    name: "Krill Oil",
    latinName: "Euphausia superba oil",
    category: "Essential Fatty Acid",
    studies: 1200,
    image: "🦐",
    description: "Krill oil provides omega-3s in phospholipid form for potentially better absorption. Also contains astaxanthin, a powerful antioxidant giving it its red color.",
    traditionalUse: "Commercial krill harvesting began in the 1970s. Krill oil supplements emerged in the 2000s as a premium omega-3 source.",
    keyBenefits: ["Omega-3 delivery", "Phospholipid form absorption", "Astaxanthin antioxidant", "Joint comfort", "Heart health"],
    mechanisms: ["Phospholipid-bound omega-3s", "Astaxanthin crosses blood-brain barrier", "May have better bioavailability", "Less oxidation than fish oil"],
    dosage: "500-2000mg daily. Lower doses needed due to potential better absorption. Look for sustainable sourcing.",
    safetyNotes: ["Shellfish allergy contraindication", "Generally well-tolerated", "Less fishy taste than fish oil"],
    interactions: ["May enhance anticoagulants", "Similar interactions to fish oil", "Safe with most supplements"],
    sources: ["Softgels", "Sustainable Antarctic krill"],
    relatedCompounds: ["Fish Oil", "Astaxanthin", "Phosphatidylcholine"],
    references: [
      { pmid: "25052008", title: "Krill oil supplementation for cardiovascular health", authors: "Ulven SM, et al.", journal: "Lipids in Health and Disease", year: 2011 },
      { pmid: "29518017", title: "Krill oil vs fish oil: bioavailability comparison", authors: "Schuchardt JP, et al.", journal: "Lipids in Health and Disease", year: 2011 }
    ]
  },
  {
    id: "astaxanthin",
    name: "Astaxanthin",
    latinName: "Haematococcus pluvialis extract",
    category: "Polyphenol",
    studies: 2800,
    image: "🔴",
    description: "Astaxanthin is a carotenoid antioxidant that gives salmon and flamingos their pink color. It's one of the most powerful antioxidants known, able to quench singlet oxygen.",
    traditionalUse: "Consumed naturally through seafood. Supplementation began in the 2000s as research revealed exceptional antioxidant properties.",
    keyBenefits: ["Powerful antioxidant", "Skin protection", "Eye health", "Exercise recovery", "Cardiovascular support"],
    mechanisms: ["Spans cell membrane (unique positioning)", "Quenches singlet oxygen", "Reduces oxidative stress markers", "Supports mitochondrial function"],
    dosage: "4-12mg daily. Best absorbed with fats. Microalgae source (H. pluvialis) preferred.",
    safetyNotes: ["Very safe profile", "May turn skin slightly pinkish at high doses", "Sun protection from inside"],
    interactions: ["May enhance other antioxidants", "Safe with most supplements", "No significant drug interactions"],
    sources: ["Microalgae extract", "Softgels", "Combined formulas"],
    relatedCompounds: ["Krill Oil", "Lutein", "Zeaxanthin"],
    references: [
      { pmid: "29999440", title: "Astaxanthin: mechanisms of action and health benefits", authors: "Ambati RR, et al.", journal: "Marine Drugs", year: 2014 },
      { pmid: "30290595", title: "Astaxanthin for skin health", authors: "Davinelli S, et al.", journal: "Marine Drugs", year: 2018 }
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
