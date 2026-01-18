import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Info } from "lucide-react";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";

const compounds = [
  {
    name: "Lion's Mane",
    latinName: "Hericium erinaceus",
    category: "Functional Mushroom",
    studies: 340,
    image: "🍄",
    highlights: ["Neuroprotection studies", "Cognitive research", "NGF pathway research"],
  },
  {
    name: "Turkey Tail",
    latinName: "Trametes versicolor",
    category: "Functional Mushroom",
    studies: 280,
    image: "🍄",
    highlights: ["Immune response studies", "PSK research", "Gut microbiome studies"],
  },
  {
    name: "Curcumin",
    latinName: "Curcuma longa",
    category: "Herbal Compound",
    studies: 890,
    image: "🌿",
    highlights: ["Inflammatory marker studies", "Antioxidant research", "Bioavailability research"],
  },
  {
    name: "Berberine",
    latinName: "Berberis vulgaris",
    category: "Alkaloid",
    studies: 420,
    image: "🌱",
    highlights: ["Metabolic pathway research", "AMPK studies", "Microbiome research"],
  },
  {
    name: "Ashwagandha",
    latinName: "Withania somnifera",
    category: "Adaptogen",
    studies: 510,
    image: "🌿",
    highlights: ["Stress marker studies", "Cortisol research", "Sleep quality research"],
  },
  {
    name: "Green Papaya Leaf",
    latinName: "Carica papaya",
    category: "Herbal",
    studies: 180,
    image: "🍃",
    highlights: ["Platelet studies", "Dengue research", "Enzyme analysis"],
  },
  {
    name: "Nitric Oxide",
    latinName: "NO (Endogenous)",
    category: "Signaling Molecule",
    studies: 1250,
    image: "💨",
    highlights: ["Vasodilation research", "Cardiovascular studies", "Exercise physiology"],
  },
  {
    name: "Methylene Blue",
    latinName: "Methylthioninium chloride",
    category: "Investigational Compound",
    studies: 620,
    image: "🔵",
    highlights: ["Mitochondrial research", "Cognitive studies", "Neuroprotection research"],
  },
  {
    name: "Carbon 60",
    latinName: "Buckminsterfullerene (C60)",
    category: "Experimental Compound",
    studies: 145,
    image: "⚫",
    highlights: ["Antioxidant studies", "Longevity research", "Cellular research"],
  },
];

const CompoundsSection = () => {
  return (
    <section id="compounds" className="py-10 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            <Leaf className="w-4 h-4 inline mr-1" />
            Natural Compounds
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Herbal & Functional
            <br />
            <span className="text-muted-foreground">Medicine Library</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Comprehensive research profiles for herbs, nutraceuticals, and functional mushrooms. 
            Each entry includes traditional use context, mechanistic research summaries, and published 
            safety considerations.
          </p>
          <EducationalDisclaimer />
        </div>

        {/* Compounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {compounds.map((compound, index) => (
            <div
              key={compound.name}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                {compound.image}
              </div>

              <div className="relative">
                <span className="inline-block px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground mb-3">
                  {compound.category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {compound.name}
                </h3>
                <p className="text-sm text-muted-foreground italic mb-4">
                  {compound.latinName}
                </p>

                {/* Research Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {compound.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">
                    {compound.studies} studies
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="max-w-3xl mx-auto p-6 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                Educational Content Only
              </h4>
              <p className="text-sm text-muted-foreground">
                All compound profiles are based on published research and do not constitute 
                dosing recommendations or treatment protocols. Safety information is sourced 
                directly from peer-reviewed studies.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button size="lg">
            Browse All Compounds
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompoundsSection;
