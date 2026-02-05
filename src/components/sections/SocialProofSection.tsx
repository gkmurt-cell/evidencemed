import { useState } from "react";
import { ExternalLink, Play, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, ArrowUp, Leaf, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { RelatedLinks } from "@/components/ui/explore-more-link";

interface SocialReel {
  id: string;
  title: string;
  brand: string;
  claim: string;
  platform: "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
  researchVerdict: "supported" | "mixed" | "unverified";
  researchSummary: string;
  url: string;
}

const socialReels: SocialReel[] = [
  {
    id: "1",
    title: "High-Dose Vitamin D Studies",
    brand: "Dr. John Campbell",
    claim: "5,000-10,000 IU vitamin D daily may be beneficial for deficiency correction",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Studies on hospitalized patients using 5,000-50,000 IU daily show improved outcomes. A 2023 systematic review supports higher doses for deficiency correction under medical supervision.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "2",
    title: "Ivermectin and Cancer Research",
    brand: "Dr. John Campbell",
    claim: "Ivermectin shows anti-cancer properties in preclinical studies",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "Laboratory and animal studies show ivermectin inhibits cancer cell proliferation. Human clinical trials are limited. Not approved for cancer treatment; requires more research.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "3",
    title: "Nattokinase Cardiovascular Effects",
    brand: "Dr. John Campbell",
    claim: "Nattokinase enzyme may support cardiovascular health and fibrinolysis",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Japanese studies show nattokinase has fibrinolytic activity. A 2022 study showed blood pressure benefits. Research on clot prevention is promising but ongoing.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "4",
    title: "Vitamin D and Immune Function",
    brand: "Dr. John Campbell",
    claim: "Adequate vitamin D levels support immune system function",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Multiple meta-analyses confirm vitamin D's role in immune regulation. Deficiency is associated with increased respiratory infection risk. Supplementation shows protective effects.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "5",
    title: "Lion's Mane Cognitive Research",
    brand: "Real Mushrooms",
    claim: "Improves memory and cognitive function",
    platform: "instagram",
    researchVerdict: "supported",
    researchSummary: "A 2020 study in Frontiers in Aging Neuroscience observed associations between supplementation and cognitive assessment scores in adults with mild cognitive changes after 12 weeks.",
    url: "#"
  },
  {
    id: "6",
    title: "Berberine Metabolic Claims",
    brand: "Various Creators",
    claim: "Works as well as prescription diabetes medications",
    platform: "tiktok",
    researchVerdict: "mixed",
    researchSummary: "While studies suggest berberine may influence glucose metabolism, comparisons to prescription medications are not supported by current evidence. Different mechanisms are involved.",
    url: "#"
  },
];

const additionalReels: SocialReel[] = [
  {
    id: "7",
    title: "Fenbendazole Cancer Discussions",
    brand: "Dr. John Campbell",
    claim: "Fenbendazole shows anticancer effects in laboratory studies",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "Preclinical studies show fenbendazole inhibits cancer cell growth. Anecdotal case reports exist but controlled human trials are lacking. Not approved for cancer treatment.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "8",
    title: "Excess Mortality Data Analysis",
    brand: "Dr. John Campbell",
    claim: "Post-pandemic excess deaths warrant investigation",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Official statistics from multiple countries show elevated excess mortality. Causes are multifactorial and debated. Peer-reviewed analyses confirm the statistical trend.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "9",
    title: "Magnesium Deficiency Awareness",
    brand: "Dr. John Campbell",
    claim: "Widespread magnesium deficiency affects cardiovascular and metabolic health",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "NHANES data suggests subclinical deficiency is common. Meta-analyses link adequate magnesium to reduced cardiovascular risk. Supplementation benefits those with low intake.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "10",
    title: "Autophagy and Fasting Research",
    brand: "Dr. John Campbell",
    claim: "Intermittent fasting activates cellular autophagy mechanisms",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Nobel Prize-winning research confirms autophagy activation during fasting. Human studies show metabolic benefits. Optimal protocols vary by individual health status.",
    url: "https://www.youtube.com/@Campbellteaching"
  },
  {
    id: "11",
    title: "Sea Moss Thyroid Support",
    brand: "Transformation Factory",
    claim: "92 minerals that heal thyroid issues",
    platform: "tiktok",
    researchVerdict: "unverified",
    researchSummary: "Sea moss contains iodine which affects thyroid function, but the '92 minerals' claim is unsubstantiated. Excessive iodine can worsen thyroid conditions.",
    url: "#"
  },
  {
    id: "12",
    title: "Turkesterone Muscle Claims",
    brand: "Gorilla Mind",
    claim: "Natural anabolic that builds muscle like steroids",
    platform: "instagram",
    researchVerdict: "unverified",
    researchSummary: "Limited human research exists. A 2022 study found no significant muscle-building effects. Claims are largely extrapolated from in-vitro and insect studies.",
    url: "#"
  },
  {
    id: "13",
    title: "Apigenin Sleep Benefits",
    brand: "Huberman Lab Followers",
    claim: "Improves sleep quality and reduces anxiety",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Apigenin binds to GABA receptors with anxiolytic properties. A 2016 RCT showed reduced anxiety in postmenopausal women. Sleep-specific human data is emerging.",
    url: "#"
  },
  {
    id: "14",
    title: "Castor Oil Pack Detox",
    brand: "Wellness Influencers",
    claim: "Detoxifies liver and reduces inflammation",
    platform: "tiktok",
    researchVerdict: "mixed",
    researchSummary: "Ricinoleic acid shows anti-inflammatory properties in lab studies. 'Detox' claims lack scientific basis. Some evidence for constipation relief when taken orally.",
    url: "#"
  },
  {
    id: "15",
    title: "Ashwagandha Stress Studies",
    brand: "NOW Foods",
    claim: "Reduces cortisol and improves sleep quality",
    platform: "instagram",
    researchVerdict: "supported",
    researchSummary: "A 2019 randomized controlled trial observed associations between 600mg daily supplementation and cortisol levels, as well as self-reported sleep quality measures.",
    url: "#"
  },
  {
    id: "16",
    title: "NMN and Aging Research",
    brand: "ProHealth Longevity",
    claim: "NMN increases NAD+ levels and reverses aging markers",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Multiple human trials indicate NMN supplementation is associated with increased NAD+ levels. A 2022 Cell study observed associations with muscle function measures in older adults.",
    url: "#"
  },
  {
    id: "17",
    title: "Beef Organs Superfood",
    brand: "Ancestral Supplements",
    claim: "Like nature's multivitamin—cures deficiencies",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Organ meats are nutrient-dense with bioavailable vitamins A, B12, iron, and CoQ10. Health claims are generally supported, though 'cures' language overstates evidence.",
    url: "#"
  },
  {
    id: "18",
    title: "Tongkat Ali Testosterone",
    brand: "Nootropics Depot",
    claim: "Doubles free testosterone naturally",
    platform: "instagram",
    researchVerdict: "mixed",
    researchSummary: "Several studies show modest testosterone increases (15-30%) in stressed or aging men. 'Doubles' claim is exaggerated. Quality and dosing vary significantly.",
    url: "#"
  },
  {
    id: "19",
    title: "Integrative Oncology Protocols",
    brand: "Dr. Paul Marik",
    claim: "Repurposed drugs and supplements may enhance cancer treatment",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "Some repurposed drugs show anticancer activity in laboratory studies. Clinical evidence varies by compound. Should be used alongside, not instead of, conventional care.",
    url: "#"
  },
  {
    id: "20",
    title: "Longevity and Zone 2 Training",
    brand: "Dr. Peter Attia",
    claim: "Zone 2 cardio improves metabolic health and extends healthspan",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Research supports that aerobic exercise at moderate intensity improves mitochondrial function, insulin sensitivity, and cardiovascular health markers.",
    url: "#"
  },
  {
    id: "21",
    title: "Wahls Protocol for MS",
    brand: "Dr. Terry Wahls",
    claim: "Nutrient-dense diet can improve multiple sclerosis symptoms",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Pilot studies show the Wahls Protocol is associated with reduced fatigue and improved quality of life in MS patients. Larger controlled trials are ongoing.",
    url: "#"
  },
  {
    id: "22",
    title: "NAD+ Precursors and Aging",
    brand: "Dr. David Sinclair",
    claim: "NMN and resveratrol activate longevity pathways",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "NAD+ precursors show promise in animal studies. Human trials on NMN show safety and NAD+ elevation. Lifespan extension in humans is not yet proven.",
    url: "#"
  },
  {
    id: "23",
    title: "Fiber Diversity for Gut Health",
    brand: "Dr. Will Bulsiewicz",
    claim: "Eating 30+ plant types weekly optimizes microbiome",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "The American Gut Project found plant diversity correlates with microbiome diversity. Diverse fiber intake supports beneficial bacterial populations.",
    url: "#"
  },
  {
    id: "24",
    title: "Therapeutic Fasting Protocols",
    brand: "Dr. Jason Fung",
    claim: "Extended fasting reverses type 2 diabetes",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "Case series show fasting can reduce insulin requirements. 'Reversal' claims are strong—many patients achieve remission, but it may not work for all. Medical supervision advised.",
    url: "#"
  },
  {
    id: "25",
    title: "Nicotine and Acetylcholine Receptors",
    brand: "Dr. Bryan Ardis",
    claim: "Nicotine may block spike protein binding to nicotinic receptors",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "PubMed studies confirm SARS-CoV-2 spike targets α7 nicotinic acetylcholine receptors (PMC10101490). Nicotine's therapeutic role is theoretical; human trials are limited.",
    url: "#"
  },
  {
    id: "26",
    title: "Nicotine Patches for Long COVID",
    brand: "Dr. Bryan Ardis",
    claim: "Low-dose nicotine patches may help long COVID symptoms",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "A small case series reported symptom improvement with nicotine patches. The mechanism involves nicotinic receptor agonism. Larger controlled trials are needed to confirm efficacy.",
    url: "#"
  },
  {
    id: "15",
    title: "Chlorophyll Water Detox",
    brand: "Sakara Life",
    claim: "Detoxifies blood and clears skin",
    platform: "tiktok",
    researchVerdict: "unverified",
    researchSummary: "No human studies support 'blood detox' claims. Limited evidence for chlorophyllin reducing body odor. Skin benefits are largely anecdotal.",
    url: "#"
  },
  {
    id: "16",
    title: "Creatine for Women",
    brand: "Fitness Creators",
    claim: "Safe for women and won't cause bloating",
    platform: "instagram",
    researchVerdict: "supported",
    researchSummary: "Extensive research confirms creatine safety in women. Meta-analyses show strength and cognitive benefits. Water retention is intracellular, not subcutaneous bloating.",
    url: "#"
  },
  {
    id: "17",
    title: "Collagen Powder Benefits",
    brand: "Vital Proteins",
    claim: "Reverses wrinkles and rebuilds joint cartilage",
    platform: "facebook",
    researchVerdict: "mixed",
    researchSummary: "Some RCTs show modest skin elasticity improvements after 8-12 weeks. Joint health claims have limited evidence. 'Reverses wrinkles' overstates current findings.",
    url: "#"
  },
  {
    id: "18",
    title: "Apple Cider Vinegar Weight Loss",
    brand: "Bragg",
    claim: "Burns belly fat and balances blood sugar",
    platform: "facebook",
    researchVerdict: "mixed",
    researchSummary: "A small 2009 study showed modest weight loss. Blood sugar effects are minor and short-term. 'Burns fat' claim lacks strong mechanistic evidence.",
    url: "#"
  },
  {
    id: "19",
    title: "Elderberry Immune Support",
    brand: "Nature's Way",
    claim: "Prevents and shortens cold and flu",
    platform: "facebook",
    researchVerdict: "supported",
    researchSummary: "Multiple RCTs show elderberry extract may reduce cold duration by 1-2 days. Prevention claims are less supported. Generally considered safe for short-term use.",
    url: "#"
  },
  {
    id: "20",
    title: "Seed Oils Inflammation",
    brand: "Health Influencers",
    claim: "Seed oils cause chronic inflammation and disease",
    platform: "twitter",
    researchVerdict: "mixed",
    researchSummary: "High omega-6 intake may affect inflammation markers, but RCTs show replacing saturated fat with seed oils often improves cardiovascular outcomes. Context and overall diet matter.",
    url: "#"
  },
  {
    id: "21",
    title: "Peptides for Anti-Aging",
    brand: "Biohacking Community",
    claim: "BPC-157 heals injuries and reverses aging",
    platform: "twitter",
    researchVerdict: "unverified",
    researchSummary: "Animal studies show tissue healing properties. Human clinical trials are lacking. Safety profile in humans is not established. Regulatory status is unclear.",
    url: "#"
  },
  {
    id: "22",
    title: "Carnivore Diet Benefits",
    brand: "Meat-Based Advocates",
    claim: "Eliminates autoimmune conditions and mental health issues",
    platform: "twitter",
    researchVerdict: "unverified",
    researchSummary: "Anecdotal reports exist but no controlled human trials. Elimination of plant antigens may help some individuals. Long-term health effects are unknown.",
    url: "#"
  },
];

const getVerdictStyle = (verdict: string) => {
  switch (verdict) {
    case "supported":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "mixed":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "unverified":
      return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getVerdictIcon = (verdict: string) => {
  switch (verdict) {
    case "supported":
      return <CheckCircle className="w-4 h-4" />;
    case "mixed":
    case "unverified":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return null;
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "instagram":
      return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "tiktok":
      return "bg-black";
    case "youtube":
      return "bg-red-600";
    case "facebook":
      return "bg-blue-600";
    case "twitter":
      return "bg-black";
    default:
      return "bg-muted";
  }
};

const platforms = [
  { id: "all", label: "All" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "Twitter/X" },
] as const;

const verdicts = [
  { id: "all", label: "All Verdicts" },
  { id: "supported", label: "Supported", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" },
  { id: "mixed", label: "Mixed", color: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  { id: "unverified", label: "Unverified", color: "bg-rose-500/10 text-rose-600 border-rose-500/30" },
] as const;

type PlatformFilter = typeof platforms[number]["id"];
type VerdictFilter = typeof verdicts[number]["id"];

const SocialProofSection = () => {
  const [showMore, setShowMore] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>("all");

  const allReels = showMore ? [...socialReels, ...additionalReels] : socialReels;
  const displayedReels = allReels.filter(reel => {
    const matchesPlatform = platformFilter === "all" || reel.platform === platformFilter;
    const matchesVerdict = verdictFilter === "all" || reel.researchVerdict === verdictFilter;
    return matchesPlatform && matchesVerdict;
  });

  return (
    <section id="social-proof" className="py-10 lg:py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            <Play className="w-4 h-4 inline mr-1" />
            Claims vs. Research
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Social Media Health Claims
            <br />
            <span className="text-muted-foreground">Fact-Checked</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Popular health product claims from social media, cross-referenced with peer-reviewed research. 
            Promoting informed decision-making through transparency.
          </p>
          <RelatedLinks
            title="Deep dive:"
            links={[
              { to: "/research", label: "Full Research Library", icon: BookOpen },
              { to: "/compounds", label: "Compound Profiles", icon: Leaf },
              { to: "/conditions", label: "Health Conditions", icon: Heart },
            ]}
            className="justify-center mb-6"
          />
          <EducationalDisclaimer />
        </div>

        {/* Platform Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setPlatformFilter(platform.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                platformFilter === platform.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>

        {/* Verdict Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {verdicts.map((verdict) => (
            <button
              key={verdict.id}
              onClick={() => setVerdictFilter(verdict.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                verdictFilter === verdict.id
                  ? verdict.id === "all" 
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : `${verdict.color} shadow-md`
                  : "bg-background text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              {verdict.label}
            </button>
          ))}
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReels.map((reel) => (
            <div
              key={reel.id}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${getPlatformColor(reel.platform)} flex items-center justify-center`}>
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground capitalize">{reel.platform}</p>
                    <p className="text-sm font-medium text-foreground">{reel.brand}</p>
                  </div>
                </div>
                <a 
                  href={reel.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Title & Claim */}
              <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                {reel.title}
              </h3>
              <p className="text-sm text-muted-foreground italic mb-3">
                "{reel.claim}"
              </p>

              {/* Research Verdict */}
              <div className={`p-3 rounded-lg border ${getVerdictStyle(reel.researchVerdict)}`}>
                <div className="flex items-center gap-2 mb-1">
                  {getVerdictIcon(reel.researchVerdict)}
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {reel.researchVerdict === "supported" && "Research Supports"}
                    {reel.researchVerdict === "mixed" && "Mixed Evidence"}
                    {reel.researchVerdict === "unverified" && "Unverified Claim"}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {reel.researchSummary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More / Show Less Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {!showMore ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowMore(true)}
              className="gap-2"
            >
              Explore More Claims
              <ChevronDown className="w-4 h-4" />
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setShowMore(false);
                  document.getElementById("social-proof")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Show Less
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById("social-proof")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Back to Top
              </Button>
            </>
          )}
        </div>

        {/* Trust Statement */}
        <div className="max-w-2xl mx-auto text-center mt-10 p-6 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            Our mission is transparency. We evaluate popular health claims against peer-reviewed research 
            so you can make informed decisions. Sources linked on each product page.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
