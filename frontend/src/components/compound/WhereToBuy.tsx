import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhereToBuyProps {
  compoundName: string;
  latinName?: string;
  category?: string;
}

// Generate search URLs for affiliate partners
const getAffiliateLinks = (compoundName: string, latinName?: string) => {
  const searchTerm = encodeURIComponent(compoundName);
  const latinSearch = latinName ? encodeURIComponent(latinName) : searchTerm;
  
  return [
    {
      name: "iHerb",
      url: `https://www.iherb.com/search?kw=${searchTerm}`,
      logo: "🌿",
      description: "Supplements & natural products"
    },
    {
      name: "Fullscript",
      url: `https://fullscript.com/search?q=${searchTerm}`,
      logo: "💼",
      description: "Practitioner dispensary"
    },
    {
      name: "Thorne",
      url: `https://www.thorne.com/search?q=${searchTerm}`,
      logo: "🔬",
      description: "Practitioner-grade supplements"
    },
    {
      name: "Pure Encapsulations",
      url: `https://www.pureencapsulations.com/catalogsearch/result/?q=${searchTerm}`,
      logo: "⚗️",
      description: "Hypoallergenic formulas"
    },
    {
      name: "Life Extension",
      url: `https://www.lifeextension.com/search?q=${searchTerm}`,
      logo: "🧬",
      description: "Research-backed formulas"
    },
    {
      name: "Amazon",
      url: `https://www.amazon.com/s?k=${searchTerm}+supplement`,
      logo: "📦",
      description: "Wide selection & reviews"
    },
  ];
};

// Book resources related to integrative medicine
const getBookResources = (compoundName: string) => {
  const searchTerm = encodeURIComponent(`${compoundName} supplement research`);
  
  return [
    {
      name: "Amazon Books",
      url: `https://www.amazon.com/s?k=${searchTerm}&i=stripbooks`,
      description: "Related books & research guides"
    },
    {
      name: "PubMed Books",
      url: `https://www.ncbi.nlm.nih.gov/books/?term=${encodeURIComponent(compoundName)}`,
      description: "Free scientific literature"
    },
  ];
};

const WhereToBuy = ({ compoundName, latinName, category }: WhereToBuyProps) => {
  const affiliateLinks = getAffiliateLinks(compoundName, latinName);
  const bookLinks = getBookResources(compoundName);

  return (
    <section className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 text-primary mb-3">
        <ShoppingBag className="w-4 h-4" />
        <h2 className="font-serif text-base font-semibold">Where to Find</h2>
      </div>
      
      {/* Affiliate Disclaimer */}
      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 mb-4">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          <strong className="text-amber-700 dark:text-amber-400">Affiliate Disclosure:</strong> Some links below may be affiliate links. 
          If you purchase through these links, we may earn a small commission at no extra cost to you. 
          This helps support our research archive. We only link to reputable sources.
        </p>
      </div>

      {/* Supplement Sources */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-2">Supplement Sources</h3>
        <div className="grid grid-cols-2 gap-2">
          {affiliateLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded bg-muted/50 hover:bg-muted transition-colors group border border-transparent hover:border-primary/20"
            >
              <span className="text-lg">{link.logo}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground group-hover:text-primary truncate">
                  {link.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{link.description}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Book Resources */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-2">Books & Literature</h3>
        <div className="space-y-1.5">
          {bookLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div>
                <p className="text-xs font-medium text-foreground group-hover:text-primary">
                  {link.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{link.description}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>

      {/* Additional Note */}
      <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border">
        For items not available in practitioner dispensaries, these retail sources may be helpful. 
        Always verify product quality and consult your healthcare provider.
      </p>
    </section>
  );
};

export default WhereToBuy;
