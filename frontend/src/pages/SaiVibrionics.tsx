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
  Heart,
  Globe,
  Sparkles,
  Shield,
  Users,
  Zap,
  Brain,
  ArrowRight,
  CheckCircle,
  Circle,
  Activity
} from "lucide-react";

// Core Principles
const corePrinciples = [
  {
    title: "Vibrational Healing",
    description: "Uses subtle electromagnetic vibrations to restore balance at the cellular level, working on the principle that every cell has a natural frequency.",
    icon: Waves
  },
  {
    title: "Like Cures Like",
    description: "Similar to homeopathy, specific healing vibrations are matched to counteract disease frequencies, restoring harmony to the body's energy field.",
    icon: Zap
  },
  {
    title: "Subtle Body Focus",
    description: "Addresses imbalances in chakras, meridians, and the energy body, which are believed to manifest as physical symptoms when disrupted.",
    icon: Sparkles
  },
  {
    title: "Mind-Body Connection",
    description: "Recognizes that negative thoughts and emotional imbalances can create disease frequencies; healing addresses root causes at mental and spiritual levels.",
    icon: Brain
  },
  {
    title: "Non-Physical Medicine",
    description: "No chemical or physical substances are used. Healing vibrations are imprinted onto neutral carriers like water or sugar globules.",
    icon: Shield
  },
  {
    title: "Holistic & Preventive",
    description: "Treats the whole person—physical, mental, emotional, and spiritual—with emphasis on prevention and maintaining overall wellness.",
    icon: Heart
  }
];

// How It Works
const howItWorks = [
  {
    step: 1,
    title: "Consultation",
    description: "Practitioner takes detailed history of physical symptoms, emotional state, and lifestyle factors to understand the complete picture."
  },
  {
    step: 2,
    title: "Vibration Selection",
    description: "Using the Sai Ram Healing Vibration Potentiser device, specific healing vibrations (remedies) are selected based on the condition."
  },
  {
    step: 3,
    title: "Remedy Preparation",
    description: "Healing vibrations are imprinted onto a neutral medium—typically purified water or small sugar pills (globules)."
  },
  {
    step: 4,
    title: "Administration",
    description: "Patient takes the prepared remedy orally. The vibrations work on the subtle energy body to restore balance and promote healing."
  },
  {
    step: 5,
    title: "Follow-Up",
    description: "Regular follow-ups assess progress, and remedies are adjusted as the condition improves or changes."
  }
];

// Remedy Categories
const remedyCategories = [
  {
    name: "Nosodes (NM)",
    description: "Disease-specific vibrations",
    examples: "NM1 Amoeba, NM6 Calici virus, NM36 War, NM113 Inflammation"
  },
  {
    name: "Sarcodes (SM)",
    description: "Organ and tissue support vibrations",
    examples: "SM2 Divine Protection, SM26 Immunity, SM40 Thyroid"
  },
  {
    name: "Combos (CC)",
    description: "Pre-formulated combinations for common conditions",
    examples: "CC4.1 Digestion, CC9.2 Infections, CC15.1 Mental & Emotional"
  },
  {
    name: "Special Remedies (SR)",
    description: "Specific therapeutic vibrations",
    examples: "SR252 Tuberculinum, SR318 Thuja, SR544 Syphilinum"
  }
];

// Global Presence
const globalStats = [
  { stat: "82+", label: "Countries with practitioners" },
  { stat: "Millions", label: "Patients treated globally" },
  { stat: "Free", label: "All services provided at no cost" },
  { stat: "1994", label: "Year system was established" }
];

// Conditions Addressed
const conditionsAddressed = [
  "Acute infections & fevers",
  "Chronic pain conditions",
  "Digestive disorders",
  "Skin conditions",
  "Respiratory issues",
  "Stress & anxiety",
  "Sleep disorders",
  "Allergies",
  "Hormonal imbalances",
  "Post-surgical recovery",
  "Children's health",
  "Preventive wellness"
];

const SaiVibrionics = () => {
  return (
    <>
      <Helmet>
        <title>Sai Vibrionics - Vibrational Energy Healing | EvidenceMed</title>
        <meta name="description" content="Learn about Sai Vibrionics, a drugless healing system using subtle vibrations to balance the body's energy centers. Free worldwide service addressing physical, mental, and spiritual health." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indigo-500/10 text-indigo-700 border-indigo-500/20">
                  Vibrational Medicine
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Sai Vibrionics
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  A drugless alternative healing system that uses subtle electromagnetic vibrations 
                  to balance the body's energy centers, chakras, and meridians—offered free worldwide 
                  by trained volunteer practitioners.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Vibrational Healing</Badge>
                  <Badge variant="outline">Energy Medicine</Badge>
                  <Badge variant="outline">Drugless</Badge>
                  <Badge variant="outline">Free Service</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* What is Sai Vibrionics */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl p-6 md:p-8 border border-indigo-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Waves className="w-6 h-6 text-indigo-600" />
                    What is Sai Vibrionics?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Sai Vibrionics</strong> (also known as Vibrionics or 
                      Sai Ram Healing Vibrations) is a complementary healing system established in 1994 that 
                      works on the principle that disease arises from imbalances in the body's subtle energy field.
                    </p>
                    <p>
                      Unlike conventional medicine that uses chemical substances, Vibrionics uses only 
                      <strong className="text-foreground"> high-frequency electromagnetic vibrations</strong> 
                      imprinted onto neutral carriers (water or sugar globules). These vibrations are believed 
                      to restore balance to the chakras, meridians, and energy centers, promoting healing at 
                      the cellular level.
                    </p>
                    <p>
                      The system is offered <strong className="text-foreground">completely free of charge</strong> 
                      by volunteer practitioners in over 82 countries, making it accessible to millions worldwide. 
                      It is designed to complement, not replace, conventional medical treatment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Global Stats */}
              <section className="mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {globalStats.map((item, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-indigo-600">{item.stat}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Principles */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                  Core Principles
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {corePrinciples.map((principle, index) => {
                    const Icon = principle.icon;
                    return (
                      <div key={index} className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <h3 className="font-semibold text-foreground">{principle.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{principle.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* How It Works */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-indigo-600" />
                  How Treatment Works
                </h2>

                <div className="space-y-4">
                  {howItWorks.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold text-sm">{step.step}</span>
                      </div>
                      <div className="flex-1 bg-card border border-border rounded-xl p-4">
                        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Remedy Categories */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  Remedy Categories
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {remedyCategories.map((category, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                      <p className="text-sm text-indigo-600 mb-2">{category.description}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Examples:</span> {category.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Conditions Addressed */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-indigo-600" />
                  Conditions Commonly Addressed
                </h2>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="grid sm:grid-cols-3 gap-3">
                    {conditionsAddressed.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm text-muted-foreground">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Compatibility */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl p-6 md:p-8 border border-indigo-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Compatibility with Other Treatments
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Compatible With
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Allopathic/conventional medicine</li>
                        <li>• Surgical treatments</li>
                        <li>• Physical therapy</li>
                        <li>• Dietary interventions</li>
                        <li>• Most energy healing modalities</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Circle className="w-4 h-4 text-amber-500" /> Use Caution With
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Homeopathic remedies (may interfere)</li>
                        <li>• Some Ayurvedic preparations</li>
                        <li>• Other vibrational remedies</li>
                        <li className="text-xs italic mt-2">Consult practitioner for guidance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Finding a Practitioner */}
              <section className="mb-12">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    Finding a Practitioner
                  </h2>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      Sai Vibrionics practitioners are volunteers who have completed training and 
                      provide services free of charge. The global network operates in 82+ countries.
                    </p>
                    <p>
                      <strong className="text-foreground">Official resources:</strong>
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <a href="https://vibrionics.org" target="_blank" rel="noopener noreferrer" 
                           className="text-indigo-600 hover:underline">
                          vibrionics.org - Official website
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <a href="https://news.vibrionics.org" target="_blank" rel="noopener noreferrer"
                           className="text-indigo-600 hover:underline">
                          news.vibrionics.org - Newsletter & updates
                        </a>
                      </li>
                    </ul>
                    <p className="text-xs text-amber-600 mt-4">
                      Note: Always continue any prescribed conventional medical treatment. Vibrionics 
                      is intended as a complementary approach, not a replacement for medical care.
                    </p>
                  </div>
                </div>
              </section>

              {/* Navigation Links */}
              <section className="mb-8">
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to="/therapies"
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
                  </Link>
                  <Link 
                    to="/homeopathy"
                    className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Explore Homeopathy <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/energy-healing"
                    className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Explore Energy Healing <ArrowRight className="w-4 h-4" />
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

export default SaiVibrionics;
