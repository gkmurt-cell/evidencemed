import { Link } from "react-router-dom";
import { ArrowRight, Gem, ExternalLink } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const minerals = [
  {
    id: "magnesium",
    name: "Magnesium",
    altName: "Mg",
    icon: "💎",
    studies: 1800,
    keyBenefit: "Sleep & Muscles",
    description: "Essential mineral involved in 300+ enzymatic reactions."
  },
  {
    id: "zinc",
    name: "Zinc",
    altName: "Zn",
    icon: "🛡️",
    studies: 2100,
    keyBenefit: "Immunity & Skin",
    description: "Critical for immune function, wound healing, and DNA synthesis."
  },
  {
    id: "selenium",
    name: "Selenium",
    altName: "Se",
    icon: "🌰",
    studies: 1400,
    keyBenefit: "Thyroid & Antioxidant",
    description: "Essential for thyroid function and glutathione production."
  },
  {
    id: "iron",
    name: "Iron",
    altName: "Fe",
    icon: "🩸",
    studies: 3500,
    keyBenefit: "Energy & Oxygen",
    description: "Essential for oxygen transport in hemoglobin and myoglobin."
  },
  {
    id: "calcium",
    name: "Calcium",
    altName: "Ca",
    icon: "🦴",
    studies: 4200,
    keyBenefit: "Bones & Muscles",
    description: "Most abundant mineral in the body, 99% stored in bones."
  },
  {
    id: "potassium",
    name: "Potassium",
    altName: "K",
    icon: "🍌",
    studies: 2800,
    keyBenefit: "Blood Pressure",
    description: "Primary intracellular cation, essential for fluid balance."
  },
  {
    id: "copper",
    name: "Copper",
    altName: "Cu",
    icon: "🔶",
    studies: 980,
    keyBenefit: "Iron & Collagen",
    description: "Essential for iron metabolism and connective tissue."
  },
  {
    id: "iodine",
    name: "Iodine",
    altName: "I",
    icon: "🌊",
    studies: 1200,
    keyBenefit: "Thyroid Hormones",
    description: "Essential for thyroid hormone production and metabolism."
  },
  {
    id: "chromium",
    name: "Chromium",
    altName: "Cr",
    icon: "⚙️",
    studies: 720,
    keyBenefit: "Blood Sugar",
    description: "Trace mineral that enhances insulin action."
  }
];

const MineralsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gem className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Essential Minerals
              </h3>
              <p className="text-sm text-muted-foreground">
                Research profiles for essential minerals & trace elements
              </p>
            </div>
          </div>
          <Link
            to="/compounds?category=Essential Mineral"
            className="hidden sm:flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all minerals
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Scrollable Mineral Cards */}
        <div className="relative">
          <ScrollArea className="w-full whitespace-nowrap rounded-xl">
            <div className="flex w-max space-x-4 p-1 pb-4">
              {minerals.map((mineral) => (
              <Link
                key={mineral.id}
                to={`/compound/${mineral.id}`}
                className="group"
              >
                <Card className="w-[260px] h-[180px] bg-card hover:bg-accent/50 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-5 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{mineral.icon}</div>
                      <Badge variant="secondary">
                        {mineral.altName}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {mineral.name}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 whitespace-normal mt-1">
                      {mineral.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">
                          {mineral.studies.toLocaleString()} studies
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {mineral.keyBenefit}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          {/* Right scroll indicator */}
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none flex items-center justify-end pr-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden mt-4 text-center">
          <Link
            to="/compounds?category=Essential Mineral"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all minerals
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MineralsSection;
