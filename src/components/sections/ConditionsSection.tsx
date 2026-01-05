import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Activity, Pill, Dna, Shield, Zap, Bone } from "lucide-react";

const conditions = [
  {
    name: "Cancer Research",
    description: "Complementary therapy studies including herbal compounds and adjunct treatments",
    studies: "2,400+",
    icon: Dna,
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    name: "Neurological",
    description: "Dementia, Parkinson's, Alzheimer's and cognitive health research",
    studies: "1,800+",
    icon: Brain,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    name: "Cardiovascular",
    description: "Heart disease, hypertension, and circulatory system studies",
    studies: "1,500+",
    icon: Heart,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "Metabolic",
    description: "Diabetes, obesity, and metabolic syndrome research",
    studies: "1,200+",
    icon: Activity,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "Autoimmune",
    description: "Lupus, rheumatoid arthritis, and immune system disorders",
    studies: "900+",
    icon: Shield,
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    name: "Infectious Disease",
    description: "Long-COVID, viral infections, and emerging health conditions",
    studies: "750+",
    icon: Zap,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Musculoskeletal",
    description: "Arthritis, osteoporosis, and joint health research",
    studies: "650+",
    icon: Bone,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "Drug Research",
    description: "Investigational and repurposed drug studies (non-prescriptive)",
    studies: "500+",
    icon: Pill,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

const ConditionsSection = () => {
  return (
    <section id="conditions" className="py-10 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Conditions Database
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            100+ Health Conditions
            <br />
            <span className="text-muted-foreground">Research Coverage</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Each condition includes peer-reviewed research on complementary therapies, 
            natural compounds, and investigational treatments—all sourced and linked 
            to original publications.
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conditions.map((condition, index) => (
            <div
              key={condition.name}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg ${condition.color} flex items-center justify-center mb-4`}>
                <condition.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {condition.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {condition.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {condition.studies} studies
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg">
            Browse All Conditions
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;
