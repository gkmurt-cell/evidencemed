import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Apple,
  Leaf,
  Wheat,
  Fish,
  Droplets,
  Flame,
  Brain,
  Heart,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Scale,
  Clock
} from "lucide-react";

// Therapeutic Diets
const therapeuticDiets = [
  {
    id: "mediterranean",
    name: "Mediterranean Diet",
    icon: Fish,
    color: "bg-blue-500",
    description: "Traditional eating pattern of Mediterranean countries emphasizing whole foods, healthy fats, and moderate wine consumption.",
    keyFeatures: ["Olive oil as primary fat", "Abundant vegetables and fruits", "Whole grains", "Fish 2-3x weekly", "Limited red meat", "Moderate red wine (optional)"],
    evidence: "Strong evidence for cardiovascular health, cognitive function, longevity, and reduced cancer risk. Multiple large studies including PREDIMED.",
    conditions: ["Heart disease", "Type 2 diabetes", "Cognitive decline", "Metabolic syndrome"],
    pyramid: ["Base: Daily activity, social meals", "Daily: Vegetables, fruits, whole grains, olive oil, nuts", "Weekly: Fish, poultry, eggs, cheese, yogurt", "Monthly: Red meat, sweets"]
  },
  {
    id: "anti-inflammatory",
    name: "Anti-Inflammatory Diet",
    icon: Shield,
    color: "bg-orange-500",
    description: "Eating pattern designed to reduce chronic inflammation, a root cause of many diseases.",
    keyFeatures: ["Omega-3 rich foods", "Colorful vegetables", "Turmeric and ginger", "Berries", "Green tea", "Avoid processed foods"],
    evidence: "Moderate evidence for reducing inflammatory markers (CRP, IL-6). Beneficial for autoimmune conditions and chronic pain.",
    conditions: ["Rheumatoid arthritis", "IBD", "Chronic pain", "Autoimmune diseases"],
    foods: {
      include: ["Fatty fish", "Leafy greens", "Berries", "Turmeric", "Olive oil", "Nuts", "Green tea"],
      avoid: ["Refined sugar", "Trans fats", "Processed meats", "Refined carbs", "Excessive alcohol"]
    }
  },
  {
    id: "elimination",
    name: "Elimination Diet",
    icon: AlertCircle,
    color: "bg-amber-500",
    description: "Systematic removal and reintroduction of foods to identify triggers for symptoms.",
    keyFeatures: ["Remove common allergens", "2-4 week elimination phase", "Systematic reintroduction", "Symptom tracking", "Practitioner guidance recommended"],
    evidence: "Well-established diagnostic tool. Gold standard for identifying food sensitivities when IgE testing is negative.",
    conditions: ["IBS", "Migraines", "Eczema", "Unknown food reactions", "Chronic fatigue"],
    phases: ["Elimination (2-4 weeks)", "Reintroduction (1 food every 3 days)", "Personalization (long-term plan)"]
  },
  {
    id: "fodmap",
    name: "Low FODMAP Diet",
    icon: Droplets,
    color: "bg-teal-500",
    description: "Restricts fermentable carbohydrates that can cause digestive symptoms in sensitive individuals.",
    keyFeatures: ["Developed at Monash University", "Three-phase approach", "Temporary restriction", "Personalized tolerance testing"],
    evidence: "Strong evidence for IBS symptom reduction. 70-80% of IBS patients respond. Registered dietitian guidance recommended.",
    conditions: ["IBS", "SIBO", "Functional bloating", "IBD (adjunct)"],
    phases: ["Low FODMAP (2-6 weeks)", "Reintroduction (8-12 weeks)", "Personalization (ongoing)"]
  },
  {
    id: "ketogenic",
    name: "Ketogenic Diet",
    icon: Flame,
    color: "bg-purple-500",
    description: "Very low carbohydrate, high fat diet that shifts metabolism to ketone burning.",
    keyFeatures: ["<50g carbs daily", "70-80% fat calories", "Moderate protein", "Ketosis state", "Medical supervision for therapeutic use"],
    evidence: "Strong for epilepsy (FDA recognized). Emerging evidence for type 2 diabetes, obesity, and neurological conditions.",
    conditions: ["Drug-resistant epilepsy", "Type 2 diabetes", "Obesity", "PCOS", "Neurological conditions (research)"],
    macros: { carbs: "5-10%", protein: "15-20%", fat: "70-80%" }
  },
  {
    id: "plant-based",
    name: "Whole Food Plant-Based",
    icon: Leaf,
    color: "bg-green-500",
    description: "Emphasizes whole, unprocessed plant foods while minimizing or eliminating animal products.",
    keyFeatures: ["Vegetables, fruits, legumes, whole grains", "Nuts and seeds", "No/minimal animal products", "Avoid processed foods", "Focus on whole foods"],
    evidence: "Strong evidence for cardiovascular disease, type 2 diabetes reversal, weight management, and cancer prevention.",
    conditions: ["Heart disease", "Type 2 diabetes", "Hypertension", "Obesity", "Certain cancers"],
    spectrum: ["Flexitarian", "Pescatarian", "Vegetarian", "Vegan", "Whole food vegan"]
  }
];

// Key Nutrients
const keyNutrients = [
  {
    category: "Essential Fatty Acids",
    nutrients: [
      { name: "Omega-3 (EPA/DHA)", sources: "Fatty fish, algae, flax, chia, walnuts", functions: "Brain, heart, anti-inflammatory", deficiency: "Depression, cognitive issues, inflammation" },
      { name: "Omega-6 (LA)", sources: "Vegetable oils, nuts, seeds", functions: "Cell membranes, hormone synthesis", deficiency: "Rare; excess more common issue" }
    ]
  },
  {
    category: "Fat-Soluble Vitamins",
    nutrients: [
      { name: "Vitamin D", sources: "Sunlight, fatty fish, fortified foods", functions: "Bone health, immunity, mood", deficiency: "Bone loss, depression, frequent illness" },
      { name: "Vitamin K2", sources: "Fermented foods, animal products", functions: "Calcium metabolism, bone and heart health", deficiency: "Arterial calcification, bone weakness" },
      { name: "Vitamin A", sources: "Liver, orange vegetables, eggs", functions: "Vision, immunity, skin health", deficiency: "Night blindness, immune dysfunction" },
      { name: "Vitamin E", sources: "Nuts, seeds, olive oil", functions: "Antioxidant, skin health", deficiency: "Nerve damage, muscle weakness" }
    ]
  },
  {
    category: "Minerals",
    nutrients: [
      { name: "Magnesium", sources: "Nuts, seeds, dark chocolate, leafy greens", functions: "300+ enzyme reactions, muscle/nerve", deficiency: "Cramps, anxiety, fatigue, arrhythmias" },
      { name: "Zinc", sources: "Oysters, meat, pumpkin seeds, legumes", functions: "Immunity, wound healing, taste", deficiency: "Frequent infections, slow healing, hair loss" },
      { name: "Iron", sources: "Red meat, spinach, legumes, fortified cereals", functions: "Oxygen transport, energy", deficiency: "Anemia, fatigue, cognitive impairment" },
      { name: "Selenium", sources: "Brazil nuts, fish, meat, eggs", functions: "Thyroid, antioxidant, immunity", deficiency: "Thyroid issues, weakened immunity" }
    ]
  },
  {
    category: "B Vitamins",
    nutrients: [
      { name: "B12", sources: "Animal products, fortified foods", functions: "Nerve function, DNA synthesis, energy", deficiency: "Anemia, neuropathy, fatigue, cognitive issues" },
      { name: "Folate (B9)", sources: "Leafy greens, legumes, fortified grains", functions: "DNA synthesis, fetal development", deficiency: "Anemia, birth defects, depression" },
      { name: "B6", sources: "Poultry, fish, potatoes, bananas", functions: "Neurotransmitter synthesis, immunity", deficiency: "Depression, confusion, weakened immunity" }
    ]
  }
];

// Functional Testing
const functionalTests = [
  { name: "Comprehensive Stool Analysis", purpose: "Gut microbiome, digestion, inflammation markers", when: "GI symptoms, autoimmune, skin issues" },
  { name: "Food Sensitivity Panel", purpose: "IgG reactions to foods (controversial)", when: "Suspected food reactions, chronic symptoms" },
  { name: "Organic Acids Test (OAT)", purpose: "Metabolic markers, nutrient status, dysbiosis", when: "Fatigue, cognitive issues, mood disorders" },
  { name: "Nutrient Testing", purpose: "Vitamin/mineral levels, RBC nutrients", when: "Suspected deficiencies, malabsorption" },
  { name: "Hormone Panel", purpose: "Thyroid, cortisol, sex hormones", when: "Fatigue, weight issues, mood changes" },
  { name: "Genetic Testing (SNPs)", purpose: "Methylation, detox, nutrient metabolism genes", when: "Personalized nutrition planning" }
];

// Practitioners
const practitioners = [
  { title: "Registered Dietitian (RD/RDN)", training: "Bachelor's + supervised practice + exam", scope: "Medical nutrition therapy, all populations", regulation: "Licensed in most states" },
  { title: "Certified Nutrition Specialist (CNS)", training: "Master's/PhD + 1000 hours experience + exam", scope: "Personalized nutrition, functional approach", regulation: "Board certified" },
  { title: "Functional Medicine Practitioner", training: "MD/DO/ND + functional medicine training", scope: "Root cause approach, systems biology", regulation: "Varies by base credential" },
  { title: "Integrative Dietitian", training: "RD + integrative/functional training", scope: "Combines conventional and functional", regulation: "Licensed RD + certifications" }
];

const NutritionalTherapy = () => {
  const [selectedDiet, setSelectedDiet] = useState<string>("mediterranean");
  const activeDiet = therapeuticDiets.find(d => d.id === selectedDiet);

  return (
    <>
      <Helmet>
        <title>Nutritional Therapy - Therapeutic Diets & Functional Nutrition | EvidenceMed</title>
        <meta name="description" content="Comprehensive guide to nutritional therapy including therapeutic diets, functional nutrition, key nutrients, and evidence-based dietary approaches for health conditions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-700 border-green-500/20">
                  Food as Medicine
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Nutritional Therapy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Explore evidence-based dietary approaches for preventing and treating disease. From 
                  therapeutic diets to functional nutrition, discover how food choices profoundly impact health.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Therapeutic Diets</Badge>
                  <Badge variant="outline">Functional Nutrition</Badge>
                  <Badge variant="outline">Nutrient Therapy</Badge>
                  <Badge variant="outline">Personalized Nutrition</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 border border-green-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Apple className="w-6 h-6 text-green-600" />
                    The Science of Nutritional Medicine
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Nutritional therapy</strong> uses food and nutrients 
                      as primary tools for preventing and treating disease. This approach recognizes that diet 
                      directly influences every biological process—from gene expression to immune function.
                    </p>
                    <p>
                      Modern nutritional science has moved beyond simple calorie counting to understand how 
                      specific foods interact with our unique genetics, microbiome, and metabolic pathways. 
                      This has led to increasingly personalized dietary recommendations.
                    </p>
                    <p>
                      Whether managing a chronic condition, optimizing performance, or preventing disease, 
                      evidence-based nutritional approaches offer powerful, often underutilized therapeutic tools.
                    </p>
                  </div>
                </div>
              </section>

              {/* Therapeutic Diets */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-green-600" />
                  Therapeutic Diets
                </h2>

                {/* Diet Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {therapeuticDiets.map((diet) => {
                    const Icon = diet.icon;
                    return (
                      <button
                        key={diet.id}
                        onClick={() => setSelectedDiet(diet.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedDiet === diet.id
                            ? `${diet.color} text-white shadow-lg`
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {diet.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Diet Detail */}
                {activeDiet && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${activeDiet.color} flex items-center justify-center shrink-0`}>
                        {(() => {
                          const Icon = activeDiet.icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">{activeDiet.name}</h3>
                        <p className="text-sm text-muted-foreground">{activeDiet.description}</p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeDiet.keyFeatures.map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{feature}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Evidence */}
                    <div className="mb-6 bg-secondary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Research Evidence</h4>
                      <p className="text-sm text-muted-foreground">{activeDiet.evidence}</p>
                    </div>

                    {/* Conditions */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Therapeutic Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeDiet.conditions.map((condition, i) => (
                          <Badge key={i} className="bg-green-500/10 text-green-700 border-green-500/20">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Key Nutrients */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  Essential Nutrients for Health
                </h2>

                <div className="space-y-6">
                  {keyNutrients.map((category, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-4">{category.category}</h3>
                      <div className="space-y-4">
                        {category.nutrients.map((nutrient, i) => (
                          <div key={i} className="bg-secondary/30 rounded-lg p-4">
                            <h4 className="font-medium text-foreground">{nutrient.name}</h4>
                            <div className="grid md:grid-cols-3 gap-2 mt-2 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Sources</p>
                                <p className="text-muted-foreground">{nutrient.sources}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Functions</p>
                                <p className="text-muted-foreground">{nutrient.functions}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Deficiency Signs</p>
                                <p className="text-muted-foreground">{nutrient.deficiency}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Functional Testing */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-green-600" />
                  Functional Nutrition Testing
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {functionalTests.map((test, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-4">
                      <h3 className="font-semibold text-foreground mb-1">{test.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{test.purpose}</p>
                      <p className="text-xs text-green-600">
                        <span className="font-medium">When to consider:</span> {test.when}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Functional testing should be interpreted by qualified practitioners. 
                    Some tests have limited evidence or clinical utility. Insurance coverage varies.
                  </p>
                </div>
              </section>

              {/* Practitioners */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-green-600" />
                  Finding Nutrition Professionals
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {practitioners.map((prac, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-2">{prac.title}</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium text-foreground">Training:</span> <span className="text-muted-foreground">{prac.training}</span></p>
                        <p><span className="font-medium text-foreground">Scope:</span> <span className="text-muted-foreground">{prac.scope}</span></p>
                        <p><span className="font-medium text-foreground">Regulation:</span> <span className="text-muted-foreground">{prac.regulation}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Getting Started */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 border border-green-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Starting Your Nutritional Therapy Journey
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Basic Steps</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Keep a detailed food and symptom diary
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Focus on whole, unprocessed foods first
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Consider working with a qualified practitioner
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Make gradual, sustainable changes
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Important Considerations</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          Dietary changes can interact with medications
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          Some conditions require professional guidance
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          "Optimal" nutrition is highly individual
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          Beware of extreme or unsustainable approaches
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Navigation Links */}
              <section className="mb-8">
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to="/therapies"
                    className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
                  </Link>
                  <Link 
                    to="/compounds"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Explore Supplements <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <RightSidebar />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NutritionalTherapy;
