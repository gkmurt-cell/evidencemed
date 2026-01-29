import { Link } from "react-router-dom";
import { ArrowRight, Pill, ExternalLink } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  }
];

const VitaminsSection = () => {
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
        <ScrollArea className="w-full whitespace-nowrap rounded-xl">
          <div className="flex w-max space-x-4 p-1 pb-4">
            {vitamins.map((vitamin) => (
              <Link
                key={vitamin.id}
                to={`/compound/${vitamin.id}`}
                className="group"
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

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
