import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Pill, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const vitamins = [
  {
    id: "vitamin-a",
    name: "Vitamin A",
    altName: "Retinol / Beta-Carotene",
    category: "Fat-Soluble",
    icon: "🥕",
    studies: 2800,
    keyBenefit: "Vision & Immunity",
    description: "Essential for vision, immune function, and cellular communication."
  },
  {
    id: "vitamin-b1",
    name: "Vitamin B1",
    altName: "Thiamine",
    category: "Water-Soluble",
    icon: "🌾",
    studies: 1200,
    keyBenefit: "Energy & Nerves",
    description: "Essential for carbohydrate metabolism and nervous system function."
  },
  {
    id: "vitamin-b2",
    name: "Vitamin B2",
    altName: "Riboflavin",
    category: "Water-Soluble",
    icon: "💛",
    studies: 980,
    keyBenefit: "Energy & Migraines",
    description: "Essential for energy production. High-dose studied for migraine prevention."
  },
  {
    id: "vitamin-b3",
    name: "Vitamin B3",
    altName: "Niacin",
    category: "Water-Soluble",
    icon: "🔥",
    studies: 1500,
    keyBenefit: "NAD+ & Cholesterol",
    description: "Precursor to NAD+, essential for cellular energy and longevity pathways."
  },
  {
    id: "vitamin-b5",
    name: "Vitamin B5",
    altName: "Pantothenic Acid",
    category: "Water-Soluble",
    icon: "🥑",
    studies: 680,
    keyBenefit: "Hormones & Skin",
    description: "Essential for coenzyme A synthesis and hormone production."
  },
  {
    id: "vitamin-b6",
    name: "Vitamin B6",
    altName: "Pyridoxine / P5P",
    category: "Water-Soluble",
    icon: "🧠",
    studies: 1800,
    keyBenefit: "Neurotransmitters",
    description: "Critical for serotonin, dopamine, and GABA synthesis."
  },
  {
    id: "vitamin-b7",
    name: "Vitamin B7",
    altName: "Biotin",
    category: "Water-Soluble",
    icon: "💅",
    studies: 890,
    keyBenefit: "Hair, Skin & Nails",
    description: "Popular for hair and nail support, essential for fatty acid synthesis."
  },
  {
    id: "vitamin-b9",
    name: "Vitamin B9",
    altName: "Folate / Methylfolate",
    category: "Water-Soluble",
    icon: "🥬",
    studies: 2200,
    keyBenefit: "DNA & Pregnancy",
    description: "Crucial for DNA synthesis and neural tube development."
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    altName: "Cobalamin",
    category: "Water-Soluble",
    icon: "❤️",
    studies: 2400,
    keyBenefit: "Nerves & Energy",
    description: "Essential for nerve function and red blood cell formation."
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    altName: "Ascorbic Acid",
    category: "Water-Soluble",
    icon: "🍊",
    studies: 4500,
    keyBenefit: "Immunity & Collagen",
    description: "Powerful antioxidant essential for immune function and collagen synthesis."
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    altName: "Cholecalciferol",
    category: "Fat-Soluble",
    icon: "☀️",
    studies: 3200,
    keyBenefit: "Bones & Immunity",
    description: "Functions as a hormone, regulates calcium and immune function."
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    altName: "Tocopherols",
    category: "Fat-Soluble",
    icon: "🌻",
    studies: 2100,
    keyBenefit: "Antioxidant",
    description: "Primary fat-soluble antioxidant protecting cell membranes."
  },
  {
    id: "vitamin-k",
    name: "Vitamin K",
    altName: "K1 & K2",
    category: "Fat-Soluble",
    icon: "🥦",
    studies: 1600,
    keyBenefit: "Bones & Heart",
    description: "K2 directs calcium to bones and away from arteries."
  },
  // Vitamin-like compounds
  {
    id: "choline",
    name: "Choline",
    altName: "Essential Nutrient",
    category: "Water-Soluble",
    icon: "🥚",
    studies: 1600,
    keyBenefit: "Brain & Liver",
    description: "Essential for acetylcholine, cell membranes, and liver function."
  },
  {
    id: "inositol",
    name: "Inositol",
    altName: "Myo-inositol (B8)",
    category: "Water-Soluble",
    icon: "🍈",
    studies: 1100,
    keyBenefit: "Mood & PCOS",
    description: "Supports insulin signaling, anxiety reduction, and fertility."
  },
  {
    id: "paba",
    name: "PABA",
    altName: "Para-Aminobenzoic Acid",
    category: "Water-Soluble",
    icon: "☀️",
    studies: 420,
    keyBenefit: "Skin & Folate",
    description: "Component of folic acid, studied for skin and hair health."
  },
  {
    id: "alpha-lipoic-acid",
    name: "Alpha-Lipoic Acid",
    altName: "Universal Antioxidant",
    category: "Water-Soluble",
    icon: "⚡",
    studies: 1800,
    keyBenefit: "Antioxidant & Nerves",
    description: "Regenerates other antioxidants, studied for neuropathy."
  },
  {
    id: "pqq",
    name: "PQQ",
    altName: "Pyrroloquinoline Quinone",
    category: "Water-Soluble",
    icon: "🔋",
    studies: 320,
    keyBenefit: "Mitochondria & Energy",
    description: "Promotes creation of new mitochondria for cellular energy."
  }
];

const VitaminsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      // Check after a brief delay to ensure content has rendered
      const timeoutId = setTimeout(checkScroll, 100);
      // Also use ResizeObserver to detect when content size changes
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(scrollElement);
      return () => {
        scrollElement.removeEventListener("scroll", checkScroll);
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Pill className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Essential Vitamins
              </h3>
              <p className="text-sm text-muted-foreground">
                Research profiles for all essential vitamins
              </p>
            </div>
          </div>
          <Link
            to="/compounds?category=Vitamins"
            className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all vitamins
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Scrollable Vitamin Cards */}
        <div className="relative">
          <div 
            ref={scrollRef} 
            className="flex space-x-4 p-1 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex w-max space-x-4">
            {vitamins.map((vitamin) => (
              <Link
                key={vitamin.id}
                to={`/compound/${vitamin.id}`}
                className="group"
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="w-[280px] h-[200px] bg-card hover:bg-accent/50 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-5 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{vitamin.icon}</div>
                      <Badge 
                        variant="secondary" 
                        className={vitamin.category === "Fat-Soluble" 
                          ? "bg-secondary text-secondary-foreground" 
                          : "bg-primary/10 text-primary"
                        }
                      >
                        {vitamin.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {vitamin.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {vitamin.altName}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 whitespace-normal">
                      {vitamin.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">
                          {vitamin.studies.toLocaleString()} studies
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {vitamin.keyBenefit}
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
          
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollLeft(); }}
              className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent flex items-center justify-start pl-2 cursor-pointer hover:from-background/90 transition-all animate-fade-in z-10"
              aria-label="Scroll left"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-4 h-4 text-primary" />
              </div>
            </button>
          )}

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollRight(); }}
              className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pr-2 cursor-pointer hover:from-background/90 transition-all z-10"
              aria-label="Scroll right"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </button>
          )}
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden mt-4 text-center">
          <Link
            to="/compounds?category=Vitamins"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all vitamins
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VitaminsSection;
