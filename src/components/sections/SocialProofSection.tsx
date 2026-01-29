import { useState } from "react";
import { ExternalLink, Play, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";

interface SocialReel {
  id: string;
  title: string;
  brand: string;
  claim: string;
  platform: "instagram" | "tiktok" | "youtube" | "facebook";
  researchVerdict: "supported" | "mixed" | "unverified";
  researchSummary: string;
  url: string;
}

const socialReels: SocialReel[] = [
  {
    id: "1",
    title: "NMN and Aging Research",
    brand: "ProHealth Longevity",
    claim: "NMN increases NAD+ levels and reverses aging markers",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Multiple human trials indicate NMN supplementation is associated with increased NAD+ levels. A 2022 Cell study observed associations with muscle function measures in older adults.",
    url: "#"
  },
  {
    id: "2",
    title: "Lion's Mane Cognitive Research",
    brand: "Real Mushrooms",
    claim: "Improves memory and cognitive function",
    platform: "instagram",
    researchVerdict: "supported",
    researchSummary: "A 2020 study in Frontiers in Aging Neuroscience observed associations between supplementation and cognitive assessment scores in adults with mild cognitive changes after 12 weeks.",
    url: "#"
  },
  {
    id: "3",
    title: "Berberine Metabolic Claims",
    brand: "Various Creators",
    claim: "Works as well as prescription diabetes medications",
    platform: "tiktok",
    researchVerdict: "mixed",
    researchSummary: "While studies suggest berberine may influence glucose metabolism, comparisons to prescription medications are not supported by current evidence. Different mechanisms are involved.",
    url: "#"
  },
  {
    id: "4",
    title: "Ashwagandha Stress Studies",
    brand: "NOW Foods",
    claim: "Reduces cortisol and improves sleep quality",
    platform: "instagram",
    researchVerdict: "supported",
    researchSummary: "A 2019 randomized controlled trial observed associations between 600mg daily supplementation and cortisol levels, as well as self-reported sleep quality measures.",
    url: "#"
  },
  {
    id: "5",
    title: "Methylene Blue Research",
    brand: "Biohacker Community",
    claim: "Enhances mitochondrial function and focus",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "Preclinical research suggests mitochondrial pathway involvement at low doses. Human data on cognitive applications and long-term safety remains limited.",
    url: "#"
  },
  {
    id: "6",
    title: "Carbon 60 Claims Review",
    brand: "C60 Purple Power",
    claim: "Extends lifespan and neutralizes free radicals",
    platform: "instagram",
    researchVerdict: "unverified",
    researchSummary: "The 2012 rodent study had methodological limitations. Human evidence is lacking. Antioxidant properties have been observed in vitro, but lifespan claims lack human data.",
    url: "#"
  },
];

const additionalReels: SocialReel[] = [
  {
    id: "7",
    title: "Shilajit Energy Claims",
    brand: "PurBlack",
    claim: "Boosts testosterone and increases energy naturally",
    platform: "youtube",
    researchVerdict: "mixed",
    researchSummary: "A small 2016 study showed modest testosterone increases in healthy men. Energy claims are largely based on traditional use. More rigorous human trials are needed.",
    url: "#"
  },
  {
    id: "8",
    title: "Sea Moss Thyroid Support",
    brand: "Transformation Factory",
    claim: "92 minerals that heal thyroid issues",
    platform: "tiktok",
    researchVerdict: "unverified",
    researchSummary: "Sea moss contains iodine which affects thyroid function, but the '92 minerals' claim is unsubstantiated. Excessive iodine can worsen thyroid conditions.",
    url: "#"
  },
  {
    id: "9",
    title: "Turkesterone Muscle Claims",
    brand: "Gorilla Mind",
    claim: "Natural anabolic that builds muscle like steroids",
    platform: "instagram",
    researchVerdict: "unverified",
    researchSummary: "Limited human research exists. A 2022 study found no significant muscle-building effects. Claims are largely extrapolated from in-vitro and insect studies.",
    url: "#"
  },
  {
    id: "10",
    title: "Apigenin Sleep Benefits",
    brand: "Huberman Lab Followers",
    claim: "Improves sleep quality and reduces anxiety",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Apigenin binds to GABA receptors with anxiolytic properties. A 2016 RCT showed reduced anxiety in postmenopausal women. Sleep-specific human data is emerging.",
    url: "#"
  },
  {
    id: "11",
    title: "Castor Oil Pack Detox",
    brand: "Wellness Influencers",
    claim: "Detoxifies liver and reduces inflammation",
    platform: "tiktok",
    researchVerdict: "mixed",
    researchSummary: "Ricinoleic acid shows anti-inflammatory properties in lab studies. 'Detox' claims lack scientific basis. Some evidence for constipation relief when taken orally.",
    url: "#"
  },
  {
    id: "12",
    title: "Magnesium Threonate Brain",
    brand: "Life Extension",
    claim: "Only form that crosses blood-brain barrier",
    platform: "instagram",
    researchVerdict: "mixed",
    researchSummary: "Animal studies show brain magnesium elevation. A 2016 human trial showed cognitive improvements in older adults. 'Only form' claim is misleading—other forms also affect brain.",
    url: "#"
  },
  {
    id: "13",
    title: "Beef Organs Superfood",
    brand: "Ancestral Supplements",
    claim: "Like nature's multivitamin—cures deficiencies",
    platform: "youtube",
    researchVerdict: "supported",
    researchSummary: "Organ meats are nutrient-dense with bioavailable vitamins A, B12, iron, and CoQ10. Health claims are generally supported, though 'cures' language overstates evidence.",
    url: "#"
  },
  {
    id: "14",
    title: "Tongkat Ali Testosterone",
    brand: "Nootropics Depot",
    claim: "Doubles free testosterone naturally",
    platform: "instagram",
    researchVerdict: "mixed",
    researchSummary: "Several studies show modest testosterone increases (15-30%) in stressed or aging men. 'Doubles' claim is exaggerated. Quality and dosing vary significantly.",
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
    default:
      return "bg-muted";
  }
};

const SocialProofSection = () => {
  const [showMore, setShowMore] = useState(false);

  const displayedReels = showMore ? [...socialReels, ...additionalReels] : socialReels;

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
          <p className="text-lg text-muted-foreground mb-6">
            Popular health product claims from social media, cross-referenced with peer-reviewed research. 
            Promoting informed decision-making through transparency.
          </p>
          <EducationalDisclaimer />
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
