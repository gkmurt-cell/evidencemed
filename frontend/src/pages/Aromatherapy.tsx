import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Flower2,
  Droplets,
  Brain,
  Heart,
  Moon,
  Sun,
  Zap,
  Shield,
  Wind,
  Sparkles,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";

// Essential Oil Categories
const oilCategories = [
  {
    id: "calming",
    name: "Calming & Relaxing",
    icon: Moon,
    color: "bg-indigo-500",
    description: "Oils that promote relaxation, reduce stress, and support sleep",
    oils: [
      { name: "Lavender", latin: "Lavandula angustifolia", uses: "Stress, sleep, anxiety, burns", safety: "Generally safe, skin sensitization rare" },
      { name: "Chamomile (Roman)", latin: "Anthemis nobilis", uses: "Calming, sleep, skin irritation", safety: "Generally safe, ragweed allergy caution" },
      { name: "Bergamot", latin: "Citrus bergamia", uses: "Mood, stress, skin care", safety: "Phototoxic - avoid sun exposure" },
      { name: "Ylang Ylang", latin: "Cananga odorata", uses: "Relaxation, mood, skin/hair", safety: "May cause headache if overused" },
      { name: "Vetiver", latin: "Vetiveria zizanioides", uses: "Grounding, focus, sleep", safety: "Generally safe" },
      { name: "Clary Sage", latin: "Salvia sclarea", uses: "Women's health, mood, relaxation", safety: "Avoid in pregnancy, may enhance alcohol" }
    ]
  },
  {
    id: "uplifting",
    name: "Uplifting & Energizing",
    icon: Sun,
    color: "bg-amber-500",
    description: "Oils that elevate mood, increase energy, and promote positivity",
    oils: [
      { name: "Lemon", latin: "Citrus limon", uses: "Energy, focus, cleaning", safety: "Phototoxic - avoid sun exposure" },
      { name: "Peppermint", latin: "Mentha piperita", uses: "Energy, digestion, headaches", safety: "Avoid near face of infants, may irritate skin" },
      { name: "Orange (Sweet)", latin: "Citrus sinensis", uses: "Mood, energy, digestion", safety: "Mildly phototoxic" },
      { name: "Grapefruit", latin: "Citrus paradisi", uses: "Energy, mood, appetite", safety: "Phototoxic" },
      { name: "Rosemary", latin: "Rosmarinus officinalis", uses: "Focus, memory, hair growth", safety: "Avoid with epilepsy, pregnancy, high BP" },
      { name: "Eucalyptus", latin: "Eucalyptus globulus", uses: "Respiratory, energy, cleaning", safety: "Not for young children, avoid ingestion" }
    ]
  },
  {
    id: "respiratory",
    name: "Respiratory Support",
    icon: Wind,
    color: "bg-teal-500",
    description: "Oils that support clear breathing and respiratory health",
    oils: [
      { name: "Eucalyptus", latin: "Eucalyptus globulus/radiata", uses: "Congestion, coughs, sinus", safety: "Not for children under 10, neurotoxic if ingested" },
      { name: "Tea Tree", latin: "Melaleuca alternifolia", uses: "Immune, respiratory, skin", safety: "Not for ingestion, may irritate sensitive skin" },
      { name: "Peppermint", latin: "Mentha piperita", uses: "Sinus, breathing, cooling", safety: "Avoid near face of young children" },
      { name: "Ravintsara", latin: "Cinnamomum camphora", uses: "Respiratory infections, immune", safety: "Generally safe, gentler than eucalyptus" },
      { name: "Frankincense", latin: "Boswellia carterii", uses: "Respiratory, meditation, skin", safety: "Generally safe" },
      { name: "Thyme", latin: "Thymus vulgaris", uses: "Respiratory infections, immune", safety: "Skin irritant, use well-diluted" }
    ]
  },
  {
    id: "immune",
    name: "Immune Support",
    icon: Shield,
    color: "bg-green-500",
    description: "Oils with antimicrobial properties that support immune function",
    oils: [
      { name: "Tea Tree", latin: "Melaleuca alternifolia", uses: "Antimicrobial, wounds, acne", safety: "Topical only, may cause skin sensitization" },
      { name: "Oregano", latin: "Origanum vulgare", uses: "Potent antimicrobial, immune", safety: "Very strong - use highly diluted, avoid in pregnancy" },
      { name: "Clove", latin: "Syzygium aromaticum", uses: "Dental, antimicrobial, pain", safety: "Skin irritant, use diluted" },
      { name: "Cinnamon Bark", latin: "Cinnamomum zeylanicum", uses: "Antimicrobial, warming", safety: "Strong skin irritant, use very diluted" },
      { name: "Lemon", latin: "Citrus limon", uses: "Cleansing, immune support", safety: "Phototoxic" },
      { name: "Frankincense", latin: "Boswellia species", uses: "Immune modulation, inflammation", safety: "Generally safe" }
    ]
  },
  {
    id: "pain",
    name: "Pain & Inflammation",
    icon: Zap,
    color: "bg-red-500",
    description: "Oils used topically for muscle aches, joint pain, and inflammation",
    oils: [
      { name: "Peppermint", latin: "Mentha piperita", uses: "Headaches, muscle pain, cooling", safety: "Can irritate skin, avoid eyes/mucous membranes" },
      { name: "Wintergreen", latin: "Gaultheria procumbens", uses: "Muscle/joint pain (methyl salicylate)", safety: "Never ingest, aspirin-like - avoid with blood thinners" },
      { name: "Helichrysum", latin: "Helichrysum italicum", uses: "Bruises, scars, inflammation", safety: "Generally safe, expensive" },
      { name: "Ginger", latin: "Zingiber officinale", uses: "Muscle pain, nausea, warming", safety: "May cause skin sensitivity" },
      { name: "Black Pepper", latin: "Piper nigrum", uses: "Circulation, muscle warmth", safety: "May irritate skin" },
      { name: "Marjoram", latin: "Origanum majorana", uses: "Muscle tension, cramps", safety: "Generally safe" }
    ]
  },
  {
    id: "skin",
    name: "Skin Care",
    icon: Sparkles,
    color: "bg-pink-500",
    description: "Oils beneficial for various skin conditions and beauty applications",
    oils: [
      { name: "Lavender", latin: "Lavandula angustifolia", uses: "Burns, wounds, general skin care", safety: "One of safest oils, rarely sensitizing" },
      { name: "Tea Tree", latin: "Melaleuca alternifolia", uses: "Acne, wounds, fungal infections", safety: "May cause contact dermatitis in some" },
      { name: "Geranium", latin: "Pelargonium graveolens", uses: "Balancing, mature skin, wounds", safety: "Generally safe" },
      { name: "Carrot Seed", latin: "Daucus carota", uses: "Mature skin, scars, regeneration", safety: "Generally safe, avoid in pregnancy" },
      { name: "Helichrysum", latin: "Helichrysum italicum", uses: "Scars, bruises, anti-aging", safety: "Generally safe" },
      { name: "Rose", latin: "Rosa damascena", uses: "All skin types, anti-aging, emotional", safety: "Generally safe, very expensive" }
    ]
  }
];

// Safety Guidelines
const safetyGuidelines = [
  {
    title: "Always Dilute",
    description: "Essential oils are highly concentrated. Always dilute in a carrier oil (coconut, jojoba, almond) before applying to skin. Typical dilution: 1-2% (6-12 drops per ounce of carrier)."
  },
  {
    title: "Patch Test First",
    description: "Before using a new oil, apply a small diluted amount to inner forearm and wait 24 hours to check for reactions."
  },
  {
    title: "Avoid Ingestion",
    description: "Unless under guidance of a trained aromatherapist or healthcare provider, do not ingest essential oils. Many are toxic internally."
  },
  {
    title: "Pregnancy & Children",
    description: "Many oils are not safe during pregnancy or for young children. Research each oil and consult a professional."
  },
  {
    title: "Phototoxicity",
    description: "Citrus oils (bergamot, lemon, lime, grapefruit) can cause burns when skin is exposed to UV light. Avoid sun for 12-18 hours after application."
  },
  {
    title: "Quality Matters",
    description: "Use pure, therapeutic-grade essential oils from reputable sources. Synthetic fragrances do not have therapeutic benefits and may be harmful."
  },
  {
    title: "Medical Conditions",
    description: "Consult healthcare provider before using if pregnant, nursing, have epilepsy, high blood pressure, or are on medications."
  },
  {
    title: "Pets",
    description: "Many essential oils are toxic to cats, dogs, and birds. Research pet safety before diffusing or applying oils in homes with animals."
  }
];

// Application Methods
const applicationMethods = [
  {
    name: "Diffusion",
    icon: Wind,
    description: "Disperses oils into the air for inhalation. Use a quality diffuser, 15-30 minutes at a time.",
    benefits: ["Mood enhancement", "Air purification", "Respiratory support", "Safe for groups"]
  },
  {
    name: "Topical Application",
    icon: Droplets,
    description: "Applied to skin diluted in carrier oil. Common areas: temples, wrists, feet, affected areas.",
    benefits: ["Targeted relief", "Skin benefits", "Absorption into bloodstream", "Massage therapy"]
  },
  {
    name: "Inhalation",
    icon: Flower2,
    description: "Direct inhalation from bottle, hands, or via steam. Quick access to limbic system.",
    benefits: ["Immediate effect", "Emotional support", "Respiratory relief", "Portable"]
  },
  {
    name: "Bath",
    icon: Droplets,
    description: "Add to bath water mixed with carrier or bath salts. Never add undiluted to water.",
    benefits: ["Whole body absorption", "Relaxation", "Skin conditioning", "Aromatherapy ritual"]
  }
];

const Aromatherapy = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Aromatherapy | Essential Oils Guide & Safety | EvidenceMed</title>
        <meta 
          name="description" 
          content="Comprehensive guide to aromatherapy and essential oils: therapeutic uses, safety guidelines, application methods, and evidence-based information." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-pink-500/5 via-purple-500/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4 bg-pink-500/10 text-pink-700 border-pink-500/20">
                  Ancient Practice, Modern Applications
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Aromatherapy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  The therapeutic use of aromatic plant extracts and essential oils for physical, emotional, 
                  and spiritual wellbeing through inhalation and topical application.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto mb-6">
                  Essential oils are concentrated volatile compounds extracted from plants through distillation or cold pressing. 
                  They interact with the olfactory system and can be absorbed through the skin, affecting mood, physiology, and health.
                </p>
                <EducationalDisclaimer />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                
                {/* Application Methods */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Flower2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Application Methods</h2>
                      <p className="text-sm text-muted-foreground">How to use essential oils safely</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {applicationMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div key={method.name} className="p-4 rounded-lg bg-secondary/20 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-foreground">{method.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {method.benefits.map((benefit, i) => (
                              <Badge key={i} variant="outline" className="text-[10px]">{benefit}</Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Oil Categories */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Essential Oil Categories</h2>
                      <p className="text-sm text-muted-foreground">Organized by primary therapeutic use</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {oilCategories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedCategory === category.id 
                              ? `${category.color}/10 border-current shadow-md` 
                              : 'bg-secondary/30 border-border hover:border-pink-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className={`w-5 h-5 ${category.color.replace('bg-', 'text-')}`} />
                            <p className="font-medium text-foreground text-sm">{category.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {selectedCategory && (
                    <div className="p-4 rounded-lg bg-pink-500/5 border border-pink-500/20">
                      {(() => {
                        const category = oilCategories.find(c => c.id === selectedCategory);
                        if (!category) return null;
                        return (
                          <div>
                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              {category.name}
                            </h3>
                            <div className="space-y-3">
                              {category.oils.map((oil) => (
                                <div key={oil.name} className="p-3 rounded bg-card border border-border">
                                  <div className="flex justify-between items-start mb-1">
                                    <div>
                                      <p className="font-medium text-foreground text-sm">{oil.name}</p>
                                      <p className="text-xs text-muted-foreground italic">{oil.latin}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-1"><strong>Uses:</strong> {oil.uses}</p>
                                  <p className="text-xs text-amber-600"><strong>Safety:</strong> {oil.safety}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </section>

                {/* Safety Guidelines */}
                <section className="bg-gradient-to-br from-amber-500/5 to-red-500/5 border border-amber-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Safety Guidelines</h2>
                      <p className="text-sm text-muted-foreground">Essential safety information for using essential oils</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {safetyGuidelines.map((guideline) => (
                      <div key={guideline.title} className="p-3 rounded-lg bg-card border border-border">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground text-sm">{guideline.title}</p>
                            <p className="text-xs text-muted-foreground">{guideline.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Science Note */}
                <section className="bg-muted/30 border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    Research & Evidence
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Aromatherapy research has grown significantly. Some oils like lavender, peppermint, and tea tree have substantial evidence 
                    for specific applications. The olfactory system's direct connection to the limbic brain provides a plausible mechanism for mood effects.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    However, many claims remain under-researched. Quality control varies widely between products, and essential oils are not 
                    regulated like medicines. Consult healthcare providers for medical conditions and use aromatherapy as a complementary approach.
                  </p>
                </section>

              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <RightSidebar variant="split" relatedCategory="aromatherapy" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Aromatherapy;
