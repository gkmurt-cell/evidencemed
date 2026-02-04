import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { ScrollArrows } from "@/components/ui/scroll-arrows";

const ayurvedicHerbs = [
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    altName: "Withania somnifera",
    icon: "🌿",
    studies: 510,
    keyBenefit: "Stress & Energy",
    description: "Premier adaptogen for stress resilience and vitality."
  },
  {
    id: "triphala",
    name: "Triphala",
    altName: "Three Fruits",
    icon: "🍇",
    studies: 320,
    keyBenefit: "Digestion & Detox",
    description: "Cornerstone formula for digestive health and gentle cleansing."
  },
  {
    id: "brahmi",
    name: "Brahmi",
    altName: "Bacopa monnieri",
    icon: "🧠",
    studies: 280,
    keyBenefit: "Memory & Focus",
    description: "Legendary herb for cognitive enhancement and learning."
  },
  {
    id: "tulsi",
    name: "Tulsi",
    altName: "Holy Basil",
    icon: "🪴",
    studies: 340,
    keyBenefit: "Immunity & Calm",
    description: "Sacred adaptogen for stress resilience and respiratory health."
  },
  {
    id: "shatavari",
    name: "Shatavari",
    altName: "Asparagus racemosus",
    icon: "🌸",
    studies: 185,
    keyBenefit: "Hormones & Vitality",
    description: "Premier herb for female reproductive health."
  },
  {
    id: "guduchi",
    name: "Guduchi",
    altName: "Giloy / Tinospora cordifolia",
    icon: "🌿",
    studies: 210,
    keyBenefit: "Immunity",
    description: "Powerful immunomodulator known as 'nectar of immortality'."
  },
  {
    id: "amalaki",
    name: "Amalaki",
    altName: "Indian Gooseberry",
    icon: "🫒",
    studies: 290,
    keyBenefit: "Antioxidant",
    description: "Richest natural source of vitamin C, rejuvenative fruit."
  },
  {
    id: "haritaki",
    name: "Haritaki",
    altName: "Terminalia chebula",
    icon: "🌰",
    studies: 245,
    keyBenefit: "Digestion & Detox",
    description: "King of medicines in Ayurveda, completes the Triphala trio."
  },
  {
    id: "neem",
    name: "Neem",
    altName: "Azadirachta indica",
    icon: "🌳",
    studies: 420,
    keyBenefit: "Skin & Blood",
    description: "Called 'healer of all ailments' for skin and purification."
  },
  {
    id: "gotu-kola",
    name: "Gotu Kola",
    altName: "Centella asiatica",
    icon: "🍀",
    studies: 260,
    keyBenefit: "Brain & Skin",
    description: "Longevity herb for cognition and wound healing."
  },
  {
    id: "manjistha",
    name: "Manjistha",
    altName: "Rubia cordifolia",
    icon: "🔴",
    studies: 125,
    keyBenefit: "Lymph & Skin",
    description: "Premier herb for lymphatic health and blood purification."
  },
  {
    id: "ginseng",
    name: "Ginseng",
    altName: "Panax ginseng",
    icon: "🌱",
    studies: 890,
    keyBenefit: "Energy & Cognition",
    description: "Renowned adaptogen for vitality, mental clarity, and immune support."
  },
  {
    id: "rhodiola",
    name: "Rhodiola",
    altName: "Rhodiola rosea",
    icon: "🌾",
    studies: 380,
    keyBenefit: "Stress & Fatigue",
    description: "Arctic adaptogen for mental performance and stress resilience."
  },
  {
    id: "maca",
    name: "Maca",
    altName: "Lepidium meyenii",
    icon: "🥔",
    studies: 210,
    keyBenefit: "Energy & Hormones",
    description: "Andean root for endurance, libido, and hormonal balance."
  },
  {
    id: "eleuthero",
    name: "Eleuthero",
    altName: "Eleutherococcus senticosus",
    icon: "🌲",
    studies: 290,
    keyBenefit: "Endurance & Immunity",
    description: "Siberian adaptogen for physical stamina and immune support."
  },
  {
    id: "schisandra",
    name: "Schisandra",
    altName: "Schisandra chinensis",
    icon: "🍒",
    studies: 245,
    keyBenefit: "Liver & Vitality",
    description: "Five-flavor berry for liver protection and adaptogenic support."
  },
  {
    id: "cordyceps",
    name: "Cordyceps",
    altName: "Cordyceps sinensis",
    icon: "🍄",
    studies: 320,
    keyBenefit: "Energy & Lungs",
    description: "Renowned medicinal mushroom for athletic performance and respiratory health."
  },
  {
    id: "lions-mane",
    name: "Lion's Mane",
    altName: "Hericium erinaceus",
    icon: "🦁",
    studies: 275,
    keyBenefit: "Brain & Nerves",
    description: "Nootropic mushroom for cognitive function and nerve regeneration."
  },
  {
    id: "reishi",
    name: "Reishi",
    altName: "Ganoderma lucidum",
    icon: "🍄",
    studies: 410,
    keyBenefit: "Immunity & Calm",
    description: "Queen of mushrooms for immune modulation and stress relief."
  }
];

const AyurvedicHerbsSection = () => {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = 
    useHorizontalScroll({ scrollAmount: 280 });

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Adaptogens & Traditional Herbs
              </h3>
              <p className="text-sm text-muted-foreground">
                Time-tested botanicals from global healing traditions
              </p>
            </div>
          </div>
          <Link
            to="/compounds?category=Ayurvedic Compound"
            className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all adaptogens
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mb-4 italic">
          Traditional therapies from Ayurvedic, Chinese, and global healing traditions. For educational purposes only—not medical recommendations.
        </p>

        {/* Scrollable Herb Cards */}
        <div className="relative">
          <div 
            ref={scrollRef} 
            className="flex space-x-4 p-1 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex w-max space-x-4">
            {ayurvedicHerbs.map((herb) => (
              <Link
                key={herb.id}
                to={`/compound/${herb.id}`}
                className="group"
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="w-[260px] h-[180px] bg-card hover:bg-accent/50 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-5 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{herb.icon}</div>
                      <Badge variant="outline" className="text-xs">
                        Ayurveda
                      </Badge>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {herb.name}
                    </h4>
                    <p className="text-xs text-muted-foreground italic mb-1">
                      {herb.altName}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 whitespace-normal">
                      {herb.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">
                          {herb.studies} studies
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {herb.keyBenefit}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            </div>
          </div>

          <ScrollArrows
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
          />
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden mt-4 text-center">
          <Link
            to="/compounds?category=Ayurvedic Compound"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all adaptogens
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AyurvedicHerbsSection;
