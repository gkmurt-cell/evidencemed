import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PubMed E-utilities base URLs
const ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
const EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";

// Cache duration in hours
const CACHE_HOURS = 24;

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
  page?: number;
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
    // Major categories
    cancer: "(neoplasms[MeSH] OR cancer[tiab]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH] OR phytotherapy[MeSH])",
    neurological: "(neurodegenerative diseases[MeSH] OR dementia[MeSH] OR alzheimer[tiab] OR parkinson[tiab]) AND (neuroprotection[tiab] OR natural products[MeSH])",
    cardiovascular: "(cardiovascular diseases[MeSH] OR heart diseases[MeSH]) AND (dietary supplements[MeSH] OR phytotherapy[MeSH])",
    metabolic: "(metabolic diseases[MeSH] OR diabetes mellitus[MeSH] OR obesity[MeSH]) AND (herbal medicine[MeSH] OR dietary supplements[MeSH])",
    autoimmune: "(autoimmune diseases[MeSH] OR rheumatoid arthritis[MeSH]) AND (anti-inflammatory agents[MeSH] OR immunomodulation[tiab])",
    infectious: "(communicable diseases[MeSH] OR COVID-19[MeSH] OR viral infections) AND (antiviral agents[MeSH] OR immunomodulation[tiab])",
    musculoskeletal: "(musculoskeletal diseases[MeSH] OR osteoarthritis[MeSH]) AND (dietary supplements[MeSH] OR glucosamine[tiab])",
    
    // Skin conditions
    psoriasis: "(psoriasis[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH] OR dietary supplements[MeSH])",
    eczema: "(dermatitis, atopic[MeSH] OR eczema[tiab]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    acne: "(acne vulgaris[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    rosacea: "(rosacea[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    vitiligo: "(vitiligo[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    dermatitis: "(dermatitis, contact[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    
    // Autoimmune specific
    lupus: "(lupus erythematosus, systemic[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "rheumatoid-arthritis": "(arthritis, rheumatoid[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "multiple-sclerosis": "(multiple sclerosis[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    hashimotos: "(hashimoto disease[MeSH] OR thyroiditis, autoimmune[MeSH]) AND (complementary therapies[MeSH])",
    "graves-disease": "(graves disease[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    celiac: "(celiac disease[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    sjogrens: "(sjogren's syndrome[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "ankylosing-spondylitis": "(spondylitis, ankylosing[MeSH]) AND (complementary therapies[MeSH])",
    scleroderma: "(scleroderma, systemic[MeSH]) AND (complementary therapies[MeSH])",
    "myasthenia-gravis": "(myasthenia gravis[MeSH]) AND (complementary therapies[MeSH])",
    
    // Digestive
    ibs: "(irritable bowel syndrome[MeSH]) AND (complementary therapies[MeSH] OR probiotics[MeSH] OR herbal medicine[MeSH])",
    ibd: "(inflammatory bowel diseases[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    crohns: "(crohn disease[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "ulcerative-colitis": "(colitis, ulcerative[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    gerd: "(gastroesophageal reflux[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    gastritis: "(gastritis[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "peptic-ulcer": "(peptic ulcer[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    sibo: "(bacterial overgrowth[tiab] OR SIBO[tiab]) AND (treatment OR herbal)",
    "leaky-gut": "(intestinal permeability[tiab]) AND (dietary supplements[MeSH] OR probiotics[MeSH])",
    "fatty-liver": "(non-alcoholic fatty liver disease[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    gallbladder: "(gallbladder diseases[MeSH] OR cholelithiasis[MeSH]) AND (complementary therapies[MeSH])",
    pancreatitis: "(pancreatitis[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    
    // Mental health
    anxiety: "(anxiety disorders[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH] OR dietary supplements[MeSH])",
    depression: "(depressive disorder[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH] OR dietary supplements[MeSH])",
    ptsd: "(stress disorders, post-traumatic[MeSH]) AND (complementary therapies[MeSH])",
    ocd: "(obsessive-compulsive disorder[MeSH]) AND (complementary therapies[MeSH])",
    bipolar: "(bipolar disorder[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    adhd: "(attention deficit disorder with hyperactivity[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    autism: "(autism spectrum disorder[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    insomnia: "(sleep initiation and maintenance disorders[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    schizophrenia: "(schizophrenia[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    "eating-disorders": "(eating disorders[MeSH]) AND (complementary therapies[MeSH])",
    
    // Respiratory
    asthma: "(asthma[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    copd: "(pulmonary disease, chronic obstructive[MeSH]) AND (complementary therapies[MeSH])",
    allergies: "(rhinitis, allergic[MeSH] OR hypersensitivity[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    sinusitis: "(sinusitis[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    bronchitis: "(bronchitis[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "sleep-apnea": "(sleep apnea syndromes[MeSH]) AND (complementary therapies[MeSH])",
    "pulmonary-fibrosis": "(pulmonary fibrosis[MeSH]) AND (complementary therapies[MeSH])",
    
    // Hormonal
    "diabetes-type2": "(diabetes mellitus, type 2[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "diabetes-type1": "(diabetes mellitus, type 1[MeSH]) AND (complementary therapies[MeSH])",
    pcos: "(polycystic ovary syndrome[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    endometriosis: "(endometriosis[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    menopause: "(menopause[MeSH]) AND (complementary therapies[MeSH] OR phytoestrogens[MeSH])",
    hypothyroidism: "(hypothyroidism[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    hyperthyroidism: "(hyperthyroidism[MeSH]) AND (complementary therapies[MeSH])",
    "adrenal-fatigue": "(adrenal insufficiency[MeSH] OR cortisol[tiab]) AND (complementary therapies[MeSH] OR adaptogen[tiab])",
    testosterone: "(testosterone[MeSH] AND deficiency) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "erectile-dysfunction": "(erectile dysfunction[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    infertility: "(infertility[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    
    // Pain conditions
    fibromyalgia: "(fibromyalgia[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    "chronic-fatigue": "(fatigue syndrome, chronic[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    migraine: "(migraine disorders[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    "tension-headache": "(tension-type headache[MeSH]) AND (complementary therapies[MeSH])",
    "back-pain": "(low back pain[MeSH]) AND (complementary therapies[MeSH])",
    neuropathy: "(peripheral nervous system diseases[MeSH] OR diabetic neuropathies[MeSH]) AND (complementary therapies[MeSH])",
    "carpal-tunnel": "(carpal tunnel syndrome[MeSH]) AND (complementary therapies[MeSH])",
    tmj: "(temporomandibular joint disorders[MeSH]) AND (complementary therapies[MeSH])",
    
    // Kidney & urinary
    "kidney-disease": "(renal insufficiency, chronic[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "kidney-stones": "(kidney calculi[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    uti: "(urinary tract infections[MeSH]) AND (complementary therapies[MeSH] OR cranberry[tiab])",
    "interstitial-cystitis": "(cystitis, interstitial[MeSH]) AND (complementary therapies[MeSH])",
    prostate: "(prostatic hyperplasia[MeSH] OR prostatitis[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    
    // Eye conditions
    "macular-degeneration": "(macular degeneration[MeSH]) AND (dietary supplements[MeSH] OR antioxidants[MeSH])",
    glaucoma: "(glaucoma[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    cataracts: "(cataract[MeSH]) AND (dietary supplements[MeSH] OR antioxidants[MeSH])",
    "dry-eye": "(dry eye syndromes[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    
    // Oral health
    periodontal: "(periodontal diseases[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "oral-candida": "(candidiasis, oral[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    
    // Infections
    lyme: "(lyme disease[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "epstein-barr": "(epstein-barr virus infections[MeSH]) AND (complementary therapies[MeSH])",
    herpes: "(herpes simplex[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    hpv: "(papillomavirus infections[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    candida: "(candidiasis[MeSH]) AND (complementary therapies[MeSH] OR probiotics[MeSH])",
    parasites: "(parasitic diseases[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "mold-illness": "(mycotoxins[MeSH] OR mold[tiab]) AND (treatment OR detoxification)",
    
    // Cancer types
    "breast-cancer": "(breast neoplasms[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "prostate-cancer": "(prostatic neoplasms[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "lung-cancer": "(lung neoplasms[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "colorectal-cancer": "(colorectal neoplasms[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "skin-cancer": "(skin neoplasms[MeSH] OR melanoma[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    leukemia: "(leukemia[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    lymphoma: "(lymphoma[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "pancreatic-cancer": "(pancreatic neoplasms[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "ovarian-cancer": "(ovarian neoplasms[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "brain-cancer": "(brain neoplasms[MeSH] OR glioblastoma[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    
    // Other conditions
    osteoporosis: "(osteoporosis[MeSH]) AND (dietary supplements[MeSH] OR calcium[MeSH] OR vitamin D[MeSH])",
    osteoarthritis: "(osteoarthritis[MeSH]) AND (complementary therapies[MeSH] OR glucosamine[MeSH])",
    gout: "(gout[MeSH]) AND (complementary therapies[MeSH] OR dietary approaches)",
    anemia: "(anemia[MeSH]) AND (dietary supplements[MeSH] OR iron[MeSH])",
    "high-cholesterol": "(hypercholesterolemia[MeSH] OR dyslipidemias[MeSH]) AND (dietary supplements[MeSH] OR natural products[MeSH])",
    hypertension: "(hypertension[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    stroke: "(stroke[MeSH]) AND (complementary therapies[MeSH] OR rehabilitation)",
    parkinsons: "(parkinson disease[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    alzheimers: "(alzheimer disease[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    als: "(amyotrophic lateral sclerosis[MeSH]) AND (complementary therapies[MeSH])",
    epilepsy: "(epilepsy[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    tinnitus: "(tinnitus[MeSH]) AND (complementary therapies[MeSH])",
    vertigo: "(vertigo[MeSH] OR dizziness[MeSH]) AND (complementary therapies[MeSH])",
    raynauds: "(raynaud disease[MeSH]) AND (complementary therapies[MeSH])",
    "varicose-veins": "(varicose veins[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    hemorrhoids: "(hemorrhoids[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "hair-loss": "(alopecia[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "weight-loss": "(obesity[MeSH] OR weight loss[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    aging: "(aging[MeSH]) AND (dietary supplements[MeSH] OR antioxidants[MeSH] OR longevity)",
    "immune-support": "(immune system[MeSH]) AND (dietary supplements[MeSH] OR immunomodulation)",
    detoxification: "(detoxification, metabolic[MeSH] OR liver[MeSH]) AND (dietary supplements[MeSH] OR herbal medicine[MeSH])",
    
    // Additional Women's Health
    "premenstrual-syndrome": "(premenstrual syndrome[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    perimenopause: "(perimenopause[MeSH]) AND (complementary therapies[MeSH] OR hormone[tiab])",
    postpartum: "(postpartum period[MeSH] OR postpartum depression[MeSH]) AND (complementary therapies[MeSH])",
    "uterine-fibroids": "(leiomyoma[MeSH] OR uterine neoplasms[MeSH]) AND (complementary therapies[MeSH])",
    amenorrhea: "(amenorrhea[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "heavy-periods": "(menorrhagia[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "breast-health": "(fibrocystic breast disease[MeSH]) AND (complementary therapies[MeSH])",
    "vaginal-health": "(vaginal diseases[MeSH] OR atrophic vaginitis[MeSH]) AND (complementary therapies[MeSH])",
    "libido-women": "(sexual dysfunction, physiological[MeSH] AND female) AND (complementary therapies[MeSH])",
    "pregnancy-support": "(pregnancy[MeSH]) AND (dietary supplements[MeSH] OR prenatal care[MeSH])",
    
    // Additional Men's Health
    "male-infertility": "(infertility, male[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    "premature-ejaculation": "(premature ejaculation[MeSH]) AND (complementary therapies[MeSH])",
    "male-pattern-baldness": "(alopecia, androgenetic[MeSH] AND male) AND (complementary therapies[MeSH])",
    gynecomastia: "(gynecomastia[MeSH]) AND (complementary therapies[MeSH])",
    
    // Additional Infections
    "covid-long": "(post-acute COVID-19 syndrome[MeSH] OR long COVID[tiab]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    shingles: "(herpes zoster[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    hepatitis: "(hepatitis B[MeSH] OR hepatitis C[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "hiv-support": "(HIV infections[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    tuberculosis: "(tuberculosis[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "h-pylori": "(helicobacter pylori[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "staph-infection": "(staphylococcal infections[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    "strep-infection": "(streptococcal infections[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    "fungal-nail": "(onychomycosis[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "athletes-foot": "(tinea pedis[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    ringworm: "(tinea[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    "bacterial-vaginosis": "(vaginosis, bacterial[MeSH]) AND (complementary therapies[MeSH] OR probiotics[MeSH])",
    "yeast-infection": "(candidiasis, vulvovaginal[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    
    // Aging & Longevity
    "cognitive-decline": "(cognitive dysfunction[MeSH]) AND (dietary supplements[MeSH] OR neuroprotection[tiab])",
    sarcopenia: "(sarcopenia[MeSH]) AND (dietary supplements[MeSH] OR exercise[MeSH])",
    frailty: "(frailty[MeSH] OR frail elderly[MeSH]) AND (dietary supplements[MeSH])",
    "skin-aging": "(skin aging[MeSH]) AND (dietary supplements[MeSH] OR antioxidants[MeSH])",
    "hearing-loss": "(hearing loss[MeSH] OR presbycusis[MeSH]) AND (dietary supplements[MeSH])",
    "bone-health": "(bone density[MeSH]) AND (dietary supplements[MeSH] OR calcium[MeSH])",
    "telomere-health": "(telomere[MeSH]) AND (dietary supplements[MeSH] OR aging[MeSH])",
    "mitochondrial-health": "(mitochondria[MeSH]) AND (dietary supplements[MeSH] OR aging[MeSH])",
    "oxidative-stress": "(oxidative stress[MeSH]) AND (antioxidants[MeSH] OR dietary supplements[MeSH])",
    "inflammation-chronic": "(inflammation[MeSH] AND chronic) AND (dietary supplements[MeSH] OR anti-inflammatory agents[MeSH])",
    
    // Additional Neurological
    "brain-fog": "(cognitive dysfunction[MeSH] OR mental fatigue[tiab]) AND (complementary therapies[MeSH])",
    "memory-loss": "(memory disorders[MeSH]) AND (dietary supplements[MeSH] OR neuroprotection[tiab])",
    "peripheral-neuropathy": "(peripheral nervous system diseases[MeSH]) AND (complementary therapies[MeSH])",
    "restless-legs": "(restless legs syndrome[MeSH]) AND (complementary therapies[MeSH])",
    tremors: "(essential tremor[MeSH]) AND (complementary therapies[MeSH])",
    "bells-palsy": "(Bell palsy[MeSH]) AND (complementary therapies[MeSH])",
    "trigeminal-neuralgia": "(trigeminal neuralgia[MeSH]) AND (complementary therapies[MeSH])",
    concussion: "(brain concussion[MeSH] OR brain injuries, traumatic[MeSH]) AND (complementary therapies[MeSH])",
    
    // Cardiovascular Extended
    "heart-failure": "(heart failure[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    arrhythmia: "(arrhythmias, cardiac[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    atherosclerosis: "(atherosclerosis[MeSH]) AND (dietary supplements[MeSH] OR natural products[MeSH])",
    "peripheral-artery": "(peripheral arterial disease[MeSH]) AND (complementary therapies[MeSH])",
    "blood-clots": "(venous thrombosis[MeSH] OR thromboembolism[MeSH]) AND (complementary therapies[MeSH])",
    aneurysm: "(aneurysm[MeSH]) AND (complementary therapies[MeSH])",
    
    // Metabolic Extended
    "insulin-resistance": "(insulin resistance[MeSH]) AND (dietary supplements[MeSH] OR herbal medicine[MeSH])",
    "metabolic-syndrome": "(metabolic syndrome[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    hypoglycemia: "(hypoglycemia[MeSH]) AND (dietary management[tiab] OR dietary supplements[MeSH])",
    hyperglycemia: "(hyperglycemia[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "gestational-diabetes": "(diabetes, gestational[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    "diabetic-neuropathy": "(diabetic neuropathies[MeSH]) AND (complementary therapies[MeSH])",
    "diabetic-retinopathy": "(diabetic retinopathy[MeSH]) AND (dietary supplements[MeSH] OR antioxidants[MeSH])",
    
    // Digestive Extended
    constipation: "(constipation[MeSH]) AND (complementary therapies[MeSH] OR dietary supplements[MeSH])",
    diarrhea: "(diarrhea[MeSH]) AND (complementary therapies[MeSH] OR probiotics[MeSH])",
    diverticulitis: "(diverticulitis[MeSH]) AND (complementary therapies[MeSH] OR dietary management[tiab])",
    bloating: "(flatulence[MeSH] OR abdominal distension[tiab]) AND (complementary therapies[MeSH])",
    dyspepsia: "(dyspepsia[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "liver-cirrhosis": "(liver cirrhosis[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "hepatic-encephalopathy": "(hepatic encephalopathy[MeSH]) AND (dietary supplements[MeSH])",
    
    // Additional Respiratory
    pneumonia: "(pneumonia[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "cough-chronic": "(cough[MeSH] AND chronic) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "post-nasal-drip": "(postnasal drip[tiab] OR rhinorrhea[MeSH]) AND (complementary therapies[MeSH])",
    "nasal-polyps": "(nasal polyps[MeSH]) AND (complementary therapies[MeSH])",
    sarcoidosis: "(sarcoidosis[MeSH]) AND (complementary therapies[MeSH])",
    
    // Additional Skin
    hives: "(urticaria[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "keratosis-pilaris": "(keratosis pilaris[tiab] OR keratosis follicularis[MeSH]) AND (treatment)",
    hyperpigmentation: "(hyperpigmentation[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    melasma: "(melanosis[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    "seborrheic-dermatitis": "(dermatitis, seborrheic[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    hidradenitis: "(hidradenitis suppurativa[MeSH]) AND (complementary therapies[MeSH])",
    "lichen-planus": "(lichen planus[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "wound-healing": "(wound healing[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    scars: "(cicatrix[MeSH] OR keloid[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    burns: "(burns[MeSH]) AND (natural products[MeSH] OR herbal medicine[MeSH])",
    
    // Additional Autoimmune
    dermatomyositis: "(dermatomyositis[MeSH]) AND (complementary therapies[MeSH])",
    polymyositis: "(polymyositis[MeSH]) AND (complementary therapies[MeSH])",
    vasculitis: "(vasculitis[MeSH]) AND (complementary therapies[MeSH])",
    "psoriatic-arthritis": "(arthritis, psoriatic[MeSH]) AND (complementary therapies[MeSH])",
    antiphospholipid: "(antiphospholipid syndrome[MeSH]) AND (complementary therapies[MeSH])",
    
    // Mental Health Extended
    "social-anxiety": "(phobia, social[MeSH]) AND (complementary therapies[MeSH])",
    "panic-disorder": "(panic disorder[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    phobias: "(phobic disorders[MeSH]) AND (complementary therapies[MeSH])",
    "seasonal-affective": "(seasonal affective disorder[MeSH]) AND (complementary therapies[MeSH] OR light therapy[MeSH])",
    grief: "(grief[MeSH] OR bereavement[MeSH]) AND (complementary therapies[MeSH])",
    addiction: "(substance-related disorders[MeSH]) AND (complementary therapies[MeSH])",
    "alcohol-use": "(alcoholism[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "smoking-cessation": "(smoking cessation[MeSH]) AND (complementary therapies[MeSH] OR herbal medicine[MeSH])",
    "stress-management": "(stress, psychological[MeSH]) AND (complementary therapies[MeSH] OR adaptogen[tiab])",
    burnout: "(burnout, professional[MeSH] OR burnout, psychological[MeSH]) AND (complementary therapies[MeSH])",
    
    // Sports & Performance
    "sports-injury": "(athletic injuries[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "muscle-recovery": "(muscle, skeletal[MeSH] AND recovery) AND (dietary supplements[MeSH])",
    "athletic-performance": "(athletic performance[MeSH]) AND (dietary supplements[MeSH] OR ergogenic aids[tiab])",
    tendonitis: "(tendinopathy[MeSH]) AND (complementary therapies[MeSH] OR natural products[MeSH])",
    "plantar-fasciitis": "(fasciitis, plantar[MeSH]) AND (complementary therapies[MeSH])",
  };
  
  return conditionMap[condition.toLowerCase()] || `(${condition}[tiab]) AND (complementary therapies[MeSH] OR natural products[MeSH])`;
}

// Generate cache key from search parameters
function generateCacheKey(query: string, condition: string | undefined, maxResults: number, page: number): string {
  const normalized = `${query.toLowerCase().trim()}|${condition || ""}|${maxResults}|${page}`;
  return normalized;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, maxResults = 20, condition, page = 1 } = await req.json() as SearchParams;
    
    if (!query && !condition) {
      return new Response(
        JSON.stringify({ error: "Query or condition is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role for cache operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Build search query
    let searchQuery = query || "";
    if (condition) {
      searchQuery = getConditionSearchTerms(condition);
    }
    
    // Calculate offset for pagination
    const retstart = (page - 1) * maxResults;
    
    const cacheKey = generateCacheKey(searchQuery, condition, maxResults, page);
    
    // Check cache first
    const { data: cachedResult } = await supabase
      .from("pubmed_cache")
      .select("*")
      .eq("cache_key", cacheKey)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();
    
    if (cachedResult) {
      console.log("Cache hit for:", cacheKey);
      return new Response(
        JSON.stringify({ 
          articles: cachedResult.articles, 
          totalCount: cachedResult.total_count, 
          query: searchQuery,
          source: "PubMed/NCBI",
          cached: true,
          page,
          pageSize: maxResults,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log("Cache miss, fetching from PubMed:", cacheKey);
    
    // Add filters for quality: human studies, English, recent
    const fullQuery = `${searchQuery} AND (humans[MeSH] OR clinical trial[pt] OR review[pt]) AND english[la]`;
    
    console.log("PubMed search query:", fullQuery);

    // Step 1: Search for PMIDs
    const searchParams = new URLSearchParams({
      db: "pubmed",
      term: fullQuery,
      retmax: String(maxResults),
      retstart: String(retstart),
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

    // Store in cache (upsert to handle concurrent requests)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + CACHE_HOURS);
    
    await supabase
      .from("pubmed_cache")
      .upsert({
        cache_key: cacheKey,
        query: searchQuery,
        condition: condition || null,
        articles: articles,
        total_count: totalCount,
        expires_at: expiresAt.toISOString()
      }, { onConflict: "cache_key" });
    
    console.log("Cached results for:", cacheKey);

    return new Response(
      JSON.stringify({ 
        articles, 
        totalCount, 
        query: searchQuery,
        source: "PubMed/NCBI",
        cached: false,
        page,
        pageSize: maxResults,
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
