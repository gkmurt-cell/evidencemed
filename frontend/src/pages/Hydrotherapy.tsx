import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Waves,
  Droplets,
  Thermometer,
  Snowflake,
  Flame,
  Wind,
  Heart,
  Brain,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Hydrotherapy Categories
const hydrotherapyCategories = [
  {
    id: "temperature",
    name: "Temperature Therapies",
    icon: Thermometer,
    color: "bg-blue-500",
    description: "Using hot and cold water to influence circulation, inflammation, and healing",
    modalities: [
      {
        name: "Contrast Hydrotherapy",
        description: "Alternating hot and cold water applications",
        mechanism: "Vasodilation/vasoconstriction pumping action",
        protocol: "3 min hot, 30 sec cold, repeat 3-5 times, end cold",
        benefits: "Circulation, recovery, immune stimulation",
        conditions: "Sprains, muscle soreness, chronic conditions"
      },
      {
        name: "Cold Water Immersion",
        description: "Full or partial body immersion in cold water (50-59°F/10-15°C)",
        mechanism: "Vasoconstriction, reduced inflammation, hormetic stress",
        protocol: "2-15 minutes depending on adaptation",
        benefits: "Recovery, mood, metabolism, resilience",
        conditions: "Athletic recovery, depression, metabolic health"
      },
      {
        name: "Hot Water Immersion",
        description: "Soaking in hot water (100-104°F/38-40°C)",
        mechanism: "Vasodilation, muscle relaxation, sweating",
        protocol: "15-30 minutes with adequate hydration",
        benefits: "Relaxation, pain relief, cardiovascular",
        conditions: "Arthritis, muscle tension, stress, sleep"
      },
      {
        name: "Ice Packs/Cold Compresses",
        description: "Local cold application for acute injuries",
        mechanism: "Reduces swelling, numbs pain, limits inflammation",
        protocol: "15-20 minutes, with cloth barrier",
        benefits: "Acute pain, swelling reduction",
        conditions: "Sprains, strains, bruises, headaches"
      },
      {
        name: "Hot Compresses/Packs",
        description: "Local heat application for chronic conditions",
        mechanism: "Increases blood flow, relaxes muscles",
        protocol: "15-30 minutes as needed",
        benefits: "Chronic pain, muscle spasm, stiffness",
        conditions: "Back pain, menstrual cramps, arthritis"
      }
    ]
  },
  {
    id: "bathing",
    name: "Therapeutic Bathing",
    icon: Droplets,
    color: "bg-teal-500",
    description: "Immersion therapies using water, minerals, and additives for healing",
    modalities: [
      {
        name: "Balneotherapy",
        description: "Bathing in mineral-rich thermal waters",
        mechanism: "Mineral absorption, buoyancy, temperature effects",
        locations: "Natural hot springs, spa facilities",
        minerals: "Sulfur, magnesium, calcium, silica, bicarbonate",
        conditions: "Arthritis, psoriasis, fibromyalgia, stress"
      },
      {
        name: "Epsom Salt Baths",
        description: "Magnesium sulfate dissolved in warm bath water",
        mechanism: "Transdermal magnesium absorption (debated), osmotic effects",
        protocol: "1-2 cups per bath, 15-20 minutes, 1-3x weekly",
        benefits: "Muscle relaxation, stress relief, sleep",
        conditions: "Muscle soreness, stress, magnesium support"
      },
      {
        name: "Dead Sea Salt Therapy",
        description: "Bathing with high-mineral Dead Sea salts",
        mechanism: "High magnesium, bromide content; anti-inflammatory",
        protocol: "1-2 cups per bath, 15-20 minutes",
        benefits: "Skin conditions, joint pain, relaxation",
        conditions: "Psoriasis, eczema, arthritis, fibromyalgia"
      },
      {
        name: "Mud/Clay Baths (Pelotherapy)",
        description: "Application of therapeutic muds and clays",
        mechanism: "Mineral content, heat retention, detoxification",
        types: "Volcanic mud, Dead Sea mud, kaolin, bentonite",
        benefits: "Skin health, detox, pain relief",
        conditions: "Skin conditions, rheumatic diseases, detoxification"
      },
      {
        name: "Float Therapy (Sensory Deprivation)",
        description: "Floating in highly concentrated Epsom salt solution",
        mechanism: "Zero gravity, sensory reduction, magnesium",
        protocol: "60-90 minute sessions in float tank/pod",
        benefits: "Deep relaxation, pain relief, creativity",
        conditions: "Stress, anxiety, chronic pain, PTSD"
      }
    ]
  },
  {
    id: "aquatic",
    name: "Aquatic Exercise",
    icon: Waves,
    color: "bg-cyan-500",
    description: "Exercise performed in water for rehabilitation and fitness",
    modalities: [
      {
        name: "Aquatic Physical Therapy",
        description: "Supervised rehabilitation exercises in warm pool",
        mechanism: "Buoyancy, hydrostatic pressure, resistance",
        benefits: "Joint unloading, strengthening, ROM",
        conditions: "Post-surgery, arthritis, back pain, neurological"
      },
      {
        name: "Water Aerobics",
        description: "Group fitness classes in water",
        mechanism: "Resistance, buoyancy for low-impact exercise",
        benefits: "Cardiovascular, strength, flexibility",
        suitable: "Seniors, obesity, joint problems, pregnancy"
      },
      {
        name: "Ai Chi",
        description: "Tai chi adapted for water",
        mechanism: "Slow movements, breath coordination, water resistance",
        benefits: "Balance, relaxation, mobility, strength",
        conditions: "Fall risk, arthritis, stress, rehabilitation"
      },
      {
        name: "Watsu",
        description: "Shiatsu-style bodywork performed in warm water",
        mechanism: "Passive stretching, cradling, pressure points",
        benefits: "Deep relaxation, pain relief, emotional release",
        conditions: "Stress, chronic pain, trauma, mobility issues"
      },
      {
        name: "Bad Ragaz Ring Method",
        description: "Specific aquatic therapy technique using flotation rings",
        mechanism: "Proprioceptive training, stabilization, strengthening",
        benefits: "Neuromuscular re-education, strength",
        conditions: "Neurological conditions, post-surgery, spinal issues"
      }
    ]
  },
  {
    id: "specialty",
    name: "Specialized Hydrotherapy",
    icon: Sparkles,
    color: "bg-violet-500",
    description: "Specific hydrotherapy techniques for targeted therapeutic effects",
    modalities: [
      {
        name: "Constitutional Hydrotherapy",
        description: "Naturopathic protocol alternating hot/cold towels with sine wave",
        mechanism: "Reflex effects on circulation and immunity",
        protocol: "5 min hot, 10 min cold application to torso",
        benefits: "Immune stimulation, detoxification, circulation",
        tradition: "Naturopathic medicine"
      },
      {
        name: "Kneipp Therapy",
        description: "German system using water, herbs, exercise, nutrition",
        mechanism: "Cold water treading, affusions, wraps",
        techniques: "Water treading, arm baths, wet wraps",
        benefits: "Circulation, vitality, immune function",
        tradition: "Sebastian Kneipp (19th century)"
      },
      {
        name: "Colon Hydrotherapy",
        description: "Gentle infusion of filtered water into the colon",
        mechanism: "Mechanical cleansing, hydration of colon",
        caution: "Controversial; requires trained practitioner",
        benefits: "Constipation relief (claimed detox benefits unproven)",
        conditions: "Constipation, pre-procedure prep"
      },
      {
        name: "Steam Therapy / Steam Room",
        description: "Exposure to humid heat in enclosed space",
        mechanism: "Opens airways, promotes sweating, relaxation",
        protocol: "10-20 minutes with breaks, adequate hydration",
        benefits: "Respiratory, skin, relaxation, circulation",
        conditions: "Congestion, muscle tension, stress"
      },
      {
        name: "Sauna (Dry/Infrared)",
        description: "Heat therapy in dry or infrared sauna",
        mechanism: "Hyperthermia, sweating, cardiovascular stress",
        types: "Traditional Finnish, infrared (far/near/full spectrum)",
        benefits: "Detoxification, cardiovascular, pain, mood",
        conditions: "Chronic pain, cardiovascular health, heavy metal burden"
      }
    ]
  }
];

// Evidence Table
const evidenceTable = [
  { condition: "Osteoarthritis", therapy: "Aquatic exercise, Balneotherapy", evidence: "Strong", notes: "Cochrane reviews support efficacy" },
  { condition: "Low Back Pain", therapy: "Aquatic PT, Spa therapy", evidence: "Moderate", notes: "Beneficial, especially chronic" },
  { condition: "Fibromyalgia", therapy: "Warm water therapy, Balneotherapy", evidence: "Moderate", notes: "Consistent symptom improvement" },
  { condition: "Rheumatoid Arthritis", therapy: "Hydrotherapy, Balneotherapy", evidence: "Moderate", notes: "Adjunctive benefit" },
  { condition: "Sports Recovery", therapy: "Cold water immersion, Contrast", evidence: "Moderate", notes: "Reduces DOMS, mixed long-term" },
  { condition: "Psoriasis", therapy: "Dead Sea therapy, Balneotherapy", evidence: "Moderate-Strong", notes: "Well-documented for skin" },
  { condition: "Cardiovascular Health", therapy: "Sauna, Hot water immersion", evidence: "Emerging-Strong", notes: "Finnish sauna studies promising" },
  { condition: "Depression/Anxiety", therapy: "Cold exposure, Float therapy", evidence: "Emerging", notes: "Growing research base" }
];

// Safety Guidelines
const safetyGuidelines = [
  {
    category: "General Precautions",
    items: [
      "Stay hydrated before, during, and after heat therapies",
      "Avoid alcohol before and during hydrotherapy",
      "Listen to your body—exit if feeling unwell",
      "Pregnant women should consult healthcare provider",
      "Gradual temperature changes preferred over sudden"
    ]
  },
  {
    category: "Contraindications for Heat",
    items: [
      "Acute inflammation or injury (first 48-72 hours)",
      "Fever or active infection",
      "Uncontrolled high blood pressure",
      "Severe cardiovascular disease",
      "Multiple sclerosis (heat sensitivity)"
    ]
  },
  {
    category: "Contraindications for Cold",
    items: [
      "Raynaud's phenomenon",
      "Cold urticaria (cold allergy)",
      "Severe cardiovascular disease",
      "Peripheral vascular disease",
      "Uncontrolled hypertension"
    ]
  }
];

const Hydrotherapy = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("temperature");
  const activeCategory = hydrotherapyCategories.find(c => c.id === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Hydrotherapy - Water-Based Healing Therapies | EvidenceMed</title>
        <meta name="description" content="Comprehensive guide to hydrotherapy including contrast therapy, balneotherapy, aquatic exercise, float therapy, and therapeutic bathing. Evidence-based water healing." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-cyan-500/10 text-cyan-700 border-cyan-500/20">
                  Water-Based Healing
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Hydrotherapy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Discover the therapeutic power of water—one of nature's oldest and most versatile 
                  healing agents. From ancient bath houses to modern aquatic rehabilitation, water 
                  therapy offers profound benefits for body and mind.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Balneotherapy</Badge>
                  <Badge variant="outline">Aquatic Exercise</Badge>
                  <Badge variant="outline">Contrast Therapy</Badge>
                  <Badge variant="outline">Float Therapy</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 md:p-8 border border-cyan-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-cyan-600" />
                    The Healing Power of Water
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Hydrotherapy</strong> (also called water therapy or 
                      aquatic therapy) uses water's unique properties—temperature, pressure, buoyancy, and 
                      mineral content—to promote healing and wellness.
                    </p>
                    <p>
                      Water therapy works through several mechanisms: <strong className="text-foreground">thermal 
                      effects</strong> (hot water vasodilates, cold vasoconstricts), <strong className="text-foreground">mechanical 
                      effects</strong> (buoyancy reduces joint load, pressure aids circulation), and <strong className="text-foreground">chemical 
                      effects</strong> (mineral absorption from therapeutic waters).
                    </p>
                    <p>
                      From the Roman baths to European spa traditions to modern rehabilitation, hydrotherapy 
                      has stood the test of time with growing scientific validation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Categories */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Waves className="w-6 h-6 text-cyan-600" />
                  Hydrotherapy Modalities
                </h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {hydrotherapyCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? `${category.color} text-white shadow-lg`
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Category Detail */}
                {activeCategory && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${activeCategory.color} flex items-center justify-center shrink-0`}>
                        {(() => {
                          const Icon = activeCategory.icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">{activeCategory.name}</h3>
                        <p className="text-sm text-muted-foreground">{activeCategory.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {activeCategory.modalities.map((modality, i) => (
                        <div key={i} className="bg-secondary/30 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">{modality.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{modality.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            {modality.mechanism && (
                              <div>
                                <p className="font-medium text-foreground">Mechanism:</p>
                                <p className="text-muted-foreground">{modality.mechanism}</p>
                              </div>
                            )}
                            {modality.protocol && (
                              <div>
                                <p className="font-medium text-foreground">Protocol:</p>
                                <p className="text-muted-foreground">{modality.protocol}</p>
                              </div>
                            )}
                            {modality.benefits && (
                              <div>
                                <p className="font-medium text-foreground">Benefits:</p>
                                <p className="text-muted-foreground">{modality.benefits}</p>
                              </div>
                            )}
                            {modality.conditions && (
                              <div>
                                <p className="font-medium text-foreground">Conditions:</p>
                                <p className="text-cyan-600">{modality.conditions}</p>
                              </div>
                            )}
                          </div>

                          {modality.caution && (
                            <div className="mt-3 p-2 bg-amber-500/10 rounded text-sm text-amber-800">
                              <strong>Caution:</strong> {modality.caution}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Evidence Table */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-cyan-600" />
                  Research Evidence by Condition
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Condition</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Best Therapies</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Evidence</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden md:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evidenceTable.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 text-sm text-foreground">{row.condition}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{row.therapy}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                row.evidence.includes('Strong') 
                                  ? 'bg-green-500/10 text-green-700' 
                                  : row.evidence.includes('Moderate')
                                    ? 'bg-amber-500/10 text-amber-700'
                                    : 'bg-gray-500/10 text-gray-700'
                              }`}
                            >
                              {row.evidence}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Safety */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-cyan-600" />
                  Safety Guidelines
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  {safetyGuidelines.map((section, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        {index === 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {index === 1 && <Flame className="w-4 h-4 text-red-500" />}
                        {index === 2 && <Snowflake className="w-4 h-4 text-blue-500" />}
                        {section.category}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-xs mt-1">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Getting Started */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 md:p-8 border border-cyan-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Getting Started with Hydrotherapy
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">At Home</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Start with simple Epsom salt baths
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Try ending showers with 30 seconds of cold
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Use contrast (hot/cold) for sore muscles
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Stay hydrated with all heat therapies
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Professional Options</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Find a float therapy center for stress relief
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Look for aquatic PT for joint conditions
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Visit mineral hot springs if accessible
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Consider Watsu for deep relaxation
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
                    className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
                  </Link>
                  <Link 
                    to="/bodywork"
                    className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Explore Bodywork <ArrowRight className="w-4 h-4" />
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

export default Hydrotherapy;
