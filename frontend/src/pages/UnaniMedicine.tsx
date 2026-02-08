import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Moon,
  Droplets,
  Flame,
  Wind,
  Leaf,
  Heart,
  Brain,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Scale
} from "lucide-react";

// Four Humors (Akhlat)
const fourHumors = [
  {
    id: "dam",
    name: "Dam (Blood)",
    element: "Air",
    qualities: "Hot & Moist",
    icon: Wind,
    color: "bg-red-500",
    temperament: "Sanguine (Damvi)",
    characteristics: "Warm, cheerful, optimistic, social, energetic",
    physicalTraits: "Rosy complexion, well-developed muscles, warm body",
    imbalanceSigns: "Skin conditions, inflammatory diseases, bleeding disorders",
    balancingFoods: "Cooling foods, pomegranate, cucumber, mint, yogurt"
  },
  {
    id: "balgham",
    name: "Balgham (Phlegm)",
    element: "Water",
    qualities: "Cold & Moist",
    icon: Droplets,
    color: "bg-blue-500",
    temperament: "Phlegmatic (Balghami)",
    characteristics: "Calm, patient, reliable, slow to anger, contemplative",
    physicalTraits: "Pale complexion, soft body, cool temperature, tendency to weight gain",
    imbalanceSigns: "Respiratory congestion, lethargy, water retention, slow digestion",
    balancingFoods: "Warming spices, ginger, black pepper, honey, dry foods"
  },
  {
    id: "safra",
    name: "Safra (Yellow Bile)",
    element: "Fire",
    qualities: "Hot & Dry",
    icon: Flame,
    color: "bg-yellow-500",
    temperament: "Choleric (Safravi)",
    characteristics: "Ambitious, decisive, quick-tempered, leadership qualities",
    physicalTraits: "Yellow complexion, lean body, warm and dry skin, strong appetite",
    imbalanceSigns: "Liver problems, skin eruptions, anger, insomnia, acid reflux",
    balancingFoods: "Cooling, moist foods, watermelon, milk, barley, leafy greens"
  },
  {
    id: "sauda",
    name: "Sauda (Black Bile)",
    element: "Earth",
    qualities: "Cold & Dry",
    icon: Moon,
    color: "bg-gray-700",
    temperament: "Melancholic (Saudavi)",
    characteristics: "Analytical, detail-oriented, introspective, artistic",
    physicalTraits: "Dark complexion, thin build, prominent veins, cold and dry skin",
    imbalanceSigns: "Depression, anxiety, joint pain, constipation, skin dryness",
    balancingFoods: "Warming, moist foods, dates, figs, olive oil, warm soups"
  }
];

// Six Essential Factors (Asbab-e-Sitta Zarooriya)
const sixEssentials = [
  {
    name: "Hawa (Air/Atmosphere)",
    description: "Quality of air breathed, including temperature, humidity, and purity",
    importance: "Fresh, clean air is essential for maintaining health and vitality",
    recommendations: ["Morning walks in nature", "Proper ventilation", "Avoid polluted areas", "Seasonal adjustments"]
  },
  {
    name: "Makool wa Mashroob (Food & Drink)",
    description: "Diet and nutrition tailored to individual temperament",
    importance: "Food is considered the primary medicine in Unani system",
    recommendations: ["Eat according to temperament", "Seasonal eating", "Proper food combinations", "Moderate portions"]
  },
  {
    name: "Harkat wa Sukoon Badani (Physical Activity & Rest)",
    description: "Balance between movement and rest for physical health",
    importance: "Exercise expels waste products and strengthens organs",
    recommendations: ["Daily moderate exercise", "Walking after meals", "Adequate sleep", "Rest during illness"]
  },
  {
    name: "Harkat wa Sukoon Nafsani (Mental Activity & Rest)",
    description: "Emotional and psychological balance",
    importance: "Mental state directly affects physical health",
    recommendations: ["Stress management", "Meditation", "Social connections", "Creative pursuits"]
  },
  {
    name: "Naum wa Yaqza (Sleep & Wakefulness)",
    description: "Proper sleep cycles and quality rest",
    importance: "Sleep allows the body to regenerate and balance humors",
    recommendations: ["7-8 hours sleep", "Early to bed, early to rise", "Dark, quiet room", "Avoid late eating"]
  },
  {
    name: "Ihtibas wa Istifragh (Retention & Elimination)",
    description: "Proper elimination of bodily wastes",
    importance: "Accumulation of waste leads to disease",
    recommendations: ["Regular bowel movements", "Adequate hydration", "Sweating through exercise", "Proper urination"]
  }
];

// Unani Therapies (Ilaj)
const unaniTherapies = [
  {
    name: "Ilaj bil Ghiza (Dietotherapy)",
    description: "Treatment through dietary modifications based on temperament and condition",
    icon: Leaf,
    applications: ["Chronic diseases", "Digestive disorders", "Metabolic conditions", "Prevention"],
    examples: "Specific food prescriptions, elimination diets, therapeutic fasting"
  },
  {
    name: "Ilaj bil Dawa (Pharmacotherapy)",
    description: "Use of natural medicines derived from plants, minerals, and animals",
    icon: Sparkles,
    applications: ["Acute conditions", "Infections", "Organ-specific disorders", "Strengthening"],
    examples: "Single herbs, compound formulations, majoons (electuaries), kushtas (calcined metals)"
  },
  {
    name: "Ilaj bil Tadbeer (Regimental Therapy)",
    description: "Physical therapeutic procedures to eliminate morbid matter",
    icon: Shield,
    applications: ["Detoxification", "Pain relief", "Circulation improvement", "Chronic conditions"],
    examples: "Hijama (cupping), Fasd (venesection), Hammam (bath therapy), Dalak (massage)"
  },
  {
    name: "Ilaj bil Yad (Surgery)",
    description: "Surgical interventions when other methods are insufficient",
    icon: Heart,
    applications: ["Tumors", "Abscesses", "Fractures", "Emergencies"],
    examples: "Minor surgical procedures, wound care, bone setting"
  }
];

// Famous Unani Medicines
const famousMedicines = [
  { name: "Majoon Dabeed-ul-Ward", uses: "Heart tonic, strengthens cardiac muscles", ingredients: "Rose petals, pearls, saffron" },
  { name: "Khamira Gawzaban", uses: "Brain tonic, memory enhancement", ingredients: "Borage, gold leaf, saffron" },
  { name: "Jawarish Kamuni", uses: "Digestive disorders, flatulence", ingredients: "Cumin, caraway, fennel" },
  { name: "Habbe Suranjan", uses: "Joint pain, arthritis, gout", ingredients: "Colchicum, turpeth, ginger" },
  { name: "Arq Gulab", uses: "Eye wash, cooling agent, perfume", ingredients: "Distilled rose water" },
  { name: "Roghan Badam", uses: "Brain tonic, skin nourishment", ingredients: "Sweet almond oil" },
  { name: "Majoon Ushba", uses: "Blood purification, skin diseases", ingredients: "Sarsaparilla, fumitory, neem" },
  { name: "Qurs Kushta Qalai", uses: "Urinary disorders, general tonic", ingredients: "Calcined tin, herbs" }
];

// Historical Scholars
const scholars = [
  { name: "Hippocrates (460-370 BCE)", title: "Father of Medicine", contribution: "Established the humoral theory foundation" },
  { name: "Galen (129-216 CE)", title: "Greek Physician", contribution: "Systematized humoral medicine, wrote extensively" },
  { name: "Al-Razi/Rhazes (865-925 CE)", title: "Persian Polymath", contribution: "Clinical observations, smallpox/measles differentiation" },
  { name: "Ibn Sina/Avicenna (980-1037 CE)", title: "Prince of Physicians", contribution: "Canon of Medicine - medical encyclopedia" },
  { name: "Ibn al-Nafis (1213-1288 CE)", title: "Arab Physician", contribution: "Discovered pulmonary circulation" },
  { name: "Hakim Ajmal Khan (1868-1927)", title: "Modern Unani Pioneer", contribution: "Established Unani institutions in India" }
];

const UnaniMedicine = () => {
  const [selectedHumor, setSelectedHumor] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Unani Medicine - Greco-Arabic Traditional Healing | EvidenceMed</title>
        <meta name="description" content="Explore Unani Medicine, the ancient Greco-Arabic healing tradition based on the four humors theory. Learn about temperaments, therapies, and traditional remedies." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-teal-500/10 text-teal-700 border-teal-500/20">
                  Greco-Arabic Medical Tradition
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Unani Medicine
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  A comprehensive system of medicine originating from Greek philosophy, enriched by 
                  Arab and Persian physicians, and practiced for over 2,500 years across the Islamic world.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Four Humors</Badge>
                  <Badge variant="outline">Temperament Theory</Badge>
                  <Badge variant="outline">Natural Healing</Badge>
                  <Badge variant="outline">Holistic Approach</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* What is Unani Section */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl p-6 md:p-8 border border-teal-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Scale className="w-6 h-6 text-teal-600" />
                    What is Unani Medicine?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Unani medicine</strong> (also called Unani-Tibb or Greco-Arabic medicine) 
                      is a traditional system based on the teachings of Greek physicians Hippocrates and Galen, later developed 
                      and enriched by Arab and Persian scholars. The word "Unani" derives from "Ionian" (Greek).
                    </p>
                    <p>
                      The system is founded on the concept that the human body contains four fundamental fluids called 
                      <strong className="text-foreground"> Akhlat (humors)</strong>: Dam (blood), Balgham (phlegm), 
                      Safra (yellow bile), and Sauda (black bile). Health exists when these humors are in proper 
                      proportion; disease occurs when they become imbalanced.
                    </p>
                    <p>
                      Unani medicine recognizes seven natural components (Umoor-e-Tabiya): Elements, Temperament, 
                      Humors, Organs, Vital Spirit, Faculties, and Functions. Treatment aims to restore balance 
                      through diet, lifestyle modifications, and natural medicines.
                    </p>
                  </div>
                </div>
              </section>

              {/* Four Humors Section */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-teal-600" />
                  The Four Humors (Akhlat)
                </h2>
                <p className="text-muted-foreground mb-6">
                  The cornerstone of Unani medicine is the theory of four humors, each associated with 
                  specific elements, qualities, and temperaments. Understanding your dominant humor helps 
                  determine appropriate diet, lifestyle, and treatment.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {fourHumors.map((humor) => {
                    const Icon = humor.icon;
                    return (
                      <div
                        key={humor.id}
                        className={`bg-card border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                          selectedHumor === humor.id 
                            ? 'border-teal-500 shadow-lg' 
                            : 'border-border hover:border-teal-500/50 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedHumor(selectedHumor === humor.id ? null : humor.id)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg ${humor.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{humor.name}</h3>
                            <p className="text-xs text-muted-foreground">{humor.element} • {humor.qualities}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium text-foreground">Temperament:</span> {humor.temperament}</p>
                          <p className="text-muted-foreground">{humor.characteristics}</p>
                        </div>

                        {selectedHumor === humor.id && (
                          <div className="mt-4 pt-4 border-t border-border space-y-3 text-sm">
                            <div>
                              <p className="font-medium text-foreground mb-1">Physical Traits:</p>
                              <p className="text-muted-foreground">{humor.physicalTraits}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 text-amber-500" /> Imbalance Signs:
                              </p>
                              <p className="text-muted-foreground">{humor.imbalanceSigns}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" /> Balancing Foods:
                              </p>
                              <p className="text-muted-foreground">{humor.balancingFoods}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Six Essential Factors */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-teal-600" />
                  Six Essential Factors (Asbab-e-Sitta Zarooriya)
                </h2>
                <p className="text-muted-foreground mb-6">
                  Unani medicine identifies six essential factors that must be properly regulated to 
                  maintain health and prevent disease. These form the foundation of preventive care.
                </p>

                <div className="grid gap-4">
                  {sixEssentials.map((factor, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-2">{factor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                      <p className="text-sm text-teal-600 mb-3 italic">{factor.importance}</p>
                      <div className="flex flex-wrap gap-2">
                        {factor.recommendations.map((rec, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{rec}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Treatment Methods */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                  Treatment Methods (Ilaj)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {unaniTherapies.map((therapy, index) => {
                    const Icon = therapy.icon;
                    return (
                      <div key={index} className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-teal-600" />
                          </div>
                          <h3 className="font-semibold text-foreground">{therapy.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{therapy.description}</p>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-foreground">Applications:</p>
                          <div className="flex flex-wrap gap-1">
                            {therapy.applications.map((app, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{app}</Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground italic mt-2">{therapy.examples}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Famous Medicines */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-teal-600" />
                  Classical Unani Formulations
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {famousMedicines.map((medicine, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-1">{medicine.name}</h3>
                      <p className="text-sm text-teal-600 mb-2">{medicine.uses}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Key Ingredients:</span> {medicine.ingredients}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Historical Scholars */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                  Historical Pioneers
                </h2>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scholars.map((scholar, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground text-sm">{scholar.name}</h3>
                      <p className="text-xs text-teal-600 mb-2">{scholar.title}</p>
                      <p className="text-xs text-muted-foreground">{scholar.contribution}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Modern Practice */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl p-6 md:p-8 border border-teal-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Unani Medicine Today
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Today, Unani medicine is officially recognized and practiced in several countries including 
                      India, Pakistan, Bangladesh, Sri Lanka, and various Middle Eastern nations. India has 
                      numerous Unani medical colleges, hospitals, and research institutions.
                    </p>
                    <p>
                      Modern research is validating many traditional Unani treatments, particularly in areas 
                      of herbal medicine, dietary therapy, and lifestyle interventions. The system's emphasis 
                      on individualized treatment based on temperament aligns well with contemporary 
                      personalized medicine approaches.
                    </p>
                    <p>
                      The Central Council for Research in Unani Medicine (CCRUM) in India conducts systematic 
                      research on Unani drugs and therapies, while universities worldwide study the historical 
                      contributions of Unani physicians to medical science.
                    </p>
                  </div>
                </div>
              </section>

              {/* Navigation Links */}
              <section className="mb-8">
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to="/therapies"
                    className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
                  </Link>
                  <Link 
                    to="/ayurveda"
                    className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Explore Ayurveda <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/tcm"
                    className="inline-flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Explore TCM <ArrowRight className="w-4 h-4" />
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

export default UnaniMedicine;
