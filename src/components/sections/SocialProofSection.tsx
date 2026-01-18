import { ExternalLink, Play, CheckCircle, AlertTriangle } from "lucide-react";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";

interface SocialReel {
  id: string;
  title: string;
  brand: string;
  claim: string;
  platform: "instagram" | "tiktok" | "youtube";
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
    default:
      return "bg-muted";
  }
};

const SocialProofSection = () => {
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
          {socialReels.map((reel) => (
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
