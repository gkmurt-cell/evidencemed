import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Info, Heart, BookOpen, Pill } from "lucide-react";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { RelatedLinks } from "@/components/ui/explore-more-link";

import MineralsSection from "./MineralsSection";
import AyurvedicHerbsSection from "./AyurvedicHerbsSection";

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
    name: "NMN",
    latinName: "Nicotinamide Mononucleotide",
    category: "Longevity Compound",
    studies: 280,
    image: "🧬",
    highlights: ["NAD+ restoration", "Cellular aging", "Metabolism studies"],
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
    name: "Collagen Peptides",
    latinName: "Hydrolyzed Collagen",
    category: "Structural Protein",
    studies: 720,
    image: "✨",
    highlights: ["Skin elasticity", "Joint health", "Hair & nail studies"],
  },
  {
    name: "Sea Moss",
    latinName: "Chondrus crispus",
    category: "Marine Superfood",
    studies: 85,
    image: "🌊",
    highlights: ["Mineral content", "Thyroid support", "Gut health research"],
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
    name: "Tongkat Ali",
    latinName: "Eurycoma longifolia",
    category: "Adaptogen",
    studies: 190,
    image: "🌴",
    highlights: ["Testosterone research", "Cortisol studies", "Performance trials"],
  },
  {
    name: "L-Theanine",
    latinName: "γ-glutamylethylamide",
    category: "Amino Acid",
    studies: 410,
    image: "🍵",
    highlights: ["Calm focus", "Anxiety studies", "Sleep research"],
  },
  {
    name: "Reishi",
    latinName: "Ganoderma lucidum",
    category: "Functional Mushroom",
    studies: 480,
    image: "🍄",
    highlights: ["Immune modulation", "Sleep support", "Longevity research"],
  },
  {
    name: "Quercetin",
    latinName: "Pentahydroxyflavone",
    category: "Flavonoid",
    studies: 580,
    image: "🧅",
    highlights: ["Immune support", "Zinc ionophore", "Anti-inflammatory"],
  },
  {
    name: "Creatine",
    latinName: "Creatine Monohydrate",
    category: "Performance Compound",
    studies: 1100,
    image: "💪",
    highlights: ["Muscle strength", "Cognitive function", "ATP production"],
  },
  {
    name: "Shilajit",
    latinName: "Asphaltum punjabianum",
    category: "Mineral Complex",
    studies: 145,
    image: "🏔️",
    highlights: ["Fulvic acid", "Energy studies", "Testosterone research"],
  },
];

const CompoundsSection = () => {
  return (
    <section id="compounds" className="pt-4 lg:pt-6 pb-8 lg:pb-12 bg-background relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1708667027894-6e9481ae1baf?w=1200&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-3">
            <Leaf className="w-4 h-4 inline mr-1" />
            Natural Compounds
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Herbal & Functional
            <br />
            <span className="text-muted-foreground">Medicine Library</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-3">
            Comprehensive research profiles for herbs, nutraceuticals, and functional mushrooms. 
            Each entry includes traditional use context, mechanistic research summaries, and published 
            safety considerations.
          </p>
          <RelatedLinks
            title="See also:"
            links={[
              { href: "/conditions", label: "Health Conditions" },
              { href: "/research", label: "Research Library" },
              { href: "/methodology", label: "Editorial Methodology" },
            ]}
          />
          <EducationalDisclaimer compact />
        </div>

        {/* Compounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {compounds.map((compound) => (
            <Link
              key={compound.name}
              to={`/compound/${compound.name.toLowerCase().replace(/['\s]/g, '-').replace(/--/g, '-')}`}
              className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-3 right-3 text-5xl opacity-10 group-hover:opacity-20 transition-opacity">
                {compound.image}
              </div>

              <div className="relative">
                <span className="inline-block px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground mb-2">
                  {compound.category}
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                  {compound.name}
                </h3>
                <p className="text-sm text-muted-foreground italic mb-3">
                  {compound.latinName}
                </p>

                {/* Research Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {compound.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <a 
                    href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(compound.name + " " + compound.latinName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {compound.studies} studies
                  </a>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
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


        {/* Minerals Section */}
        <MineralsSection />

        {/* Ayurvedic Herbs Section */}
        <AyurvedicHerbsSection />

        {/* CTA */}
        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <Link to="/compounds">
              Browse All Compounds
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompoundsSection;
