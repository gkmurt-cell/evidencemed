import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Zap,
  Waves,
  Hand,
  Sun,
  Moon,
  Heart,
  Brain,
  Shield,
  Sparkles,
  Eye,
  Activity,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Circle
} from "lucide-react";

// Energy Healing Modalities
const energyModalities = [
  {
    id: "reiki",
    name: "Reiki",
    origin: "Japan, 1922",
    founder: "Mikao Usui",
    icon: Hand,
    color: "bg-purple-500",
    description: "A Japanese technique for stress reduction and relaxation that also promotes healing. Based on the idea that an unseen 'life force energy' flows through us.",
    principles: [
      "Just for today, I will not be angry",
      "Just for today, I will not worry",
      "Just for today, I will be grateful",
      "Just for today, I will do my work honestly",
      "Just for today, I will be kind to every living thing"
    ],
    techniques: ["Hand positions", "Distance healing", "Symbols", "Attunements"],
    levels: ["Reiki I (Self-healing)", "Reiki II (Practitioner)", "Reiki III (Master/Teacher)"],
    conditions: ["Stress", "Anxiety", "Pain management", "Emotional healing", "Spiritual growth"]
  },
  {
    id: "qigong",
    name: "Qigong (Chi Kung)",
    origin: "China, 4000+ years",
    founder: "Various traditions",
    icon: Activity,
    color: "bg-emerald-500",
    description: "An ancient Chinese practice combining slow movements, breathing techniques, and meditation to cultivate and balance life energy (Qi).",
    principles: [
      "Regulate the body (Tiao Shen)",
      "Regulate the breath (Tiao Xi)",
      "Regulate the mind (Tiao Xin)"
    ],
    techniques: ["Standing meditation", "Moving forms", "Breathing exercises", "Visualization", "Sound healing"],
    types: ["Medical Qigong", "Martial Qigong", "Spiritual Qigong"],
    conditions: ["Chronic pain", "Hypertension", "Cancer support", "Immune function", "Mental clarity"]
  },
  {
    id: "pranic",
    name: "Pranic Healing",
    origin: "Philippines, 1987",
    founder: "Master Choa Kok Sui",
    icon: Sparkles,
    color: "bg-cyan-500",
    description: "A no-touch energy healing system that works on the principle that the body has the ability to heal itself by utilizing prana (life force).",
    principles: [
      "The body is a self-repairing living entity",
      "Healing requires life force (prana)",
      "The rate of healing is accelerated by increasing prana"
    ],
    techniques: ["Scanning", "Sweeping (cleansing)", "Energizing", "Stabilizing"],
    levels: ["Basic Pranic Healing", "Advanced Pranic Healing", "Pranic Psychotherapy", "Pranic Crystal Healing"],
    conditions: ["Physical ailments", "Psychological conditions", "Relationship issues", "Financial problems"]
  },
  {
    id: "therapeutic-touch",
    name: "Therapeutic Touch",
    origin: "USA, 1972",
    founder: "Dolores Krieger & Dora Kunz",
    icon: Waves,
    color: "bg-blue-500",
    description: "A contemporary healing practice based on ancient laying-on of hands traditions. Developed by a nurse and used in healthcare settings worldwide.",
    principles: [
      "Centering consciousness",
      "Assessing the energy field",
      "Clearing congestion",
      "Directing energy for balance"
    ],
    techniques: ["Centering", "Assessment", "Unruffling", "Modulation of energy"],
    settings: ["Hospitals", "Hospices", "Private practice", "Self-care"],
    conditions: ["Pain reduction", "Anxiety", "Wound healing", "End-of-life care"]
  },
  {
    id: "healing-touch",
    name: "Healing Touch",
    origin: "USA, 1989",
    founder: "Janet Mentgen",
    icon: Heart,
    color: "bg-rose-500",
    description: "A relaxing, nurturing energy therapy using gentle touch to assist in balancing physical, mental, emotional, and spiritual well-being.",
    principles: [
      "Energy follows intention",
      "The body has innate healing ability",
      "Clearing and balancing promotes healing"
    ],
    techniques: ["Magnetic clearing", "Chakra connection", "Mind clearing", "Spiral meditation"],
    levels: ["Level 1-5 certification", "Instructor certification"],
    conditions: ["Stress", "Depression", "Chronic illness", "Pre/post surgery", "Cancer support"]
  },
  {
    id: "polarity",
    name: "Polarity Therapy",
    origin: "USA, 1940s",
    founder: "Dr. Randolph Stone",
    icon: Zap,
    color: "bg-amber-500",
    description: "A comprehensive health system involving energy-based bodywork, diet, exercise, and self-awareness based on the concept of energy flow.",
    principles: [
      "Energy flows between positive and negative poles",
      "Blocked energy causes disease",
      "Balance restores health"
    ],
    techniques: ["Bodywork contacts", "Polarity yoga", "Cleansing diet", "Counseling"],
    elements: ["Ether", "Air", "Fire", "Water", "Earth"],
    conditions: ["Stress-related illness", "Digestive issues", "Musculoskeletal problems", "Emotional imbalances"]
  }
];

// Chakra System
const chakras = [
  { name: "Root (Muladhara)", location: "Base of spine", color: "bg-red-500", element: "Earth", governs: "Survival, grounding, security", imbalance: "Fear, anxiety, instability" },
  { name: "Sacral (Svadhisthana)", location: "Lower abdomen", color: "bg-orange-500", element: "Water", governs: "Creativity, sexuality, emotions", imbalance: "Guilt, addiction, emotional volatility" },
  { name: "Solar Plexus (Manipura)", location: "Upper abdomen", color: "bg-yellow-500", element: "Fire", governs: "Personal power, confidence, will", imbalance: "Shame, low self-esteem, control issues" },
  { name: "Heart (Anahata)", location: "Center of chest", color: "bg-green-500", element: "Air", governs: "Love, compassion, connection", imbalance: "Grief, jealousy, isolation" },
  { name: "Throat (Vishuddha)", location: "Throat", color: "bg-blue-500", element: "Ether", governs: "Communication, truth, expression", imbalance: "Lies, inability to express, fear of speaking" },
  { name: "Third Eye (Ajna)", location: "Forehead", color: "bg-indigo-500", element: "Light", governs: "Intuition, insight, imagination", imbalance: "Illusion, lack of clarity, nightmares" },
  { name: "Crown (Sahasrara)", location: "Top of head", color: "bg-purple-500", element: "Thought", governs: "Spirituality, consciousness, enlightenment", imbalance: "Disconnection, cynicism, spiritual crisis" }
];

// Research Evidence
const researchAreas = [
  {
    area: "Pain Management",
    findings: "Multiple studies show energy healing reduces pain perception and analgesic use",
    studies: "Jain & Mills (2010) systematic review of biofield therapies"
  },
  {
    area: "Anxiety & Stress",
    findings: "Consistent evidence for reduced anxiety and cortisol levels post-treatment",
    studies: "Wardell & Engebretson (2001) Reiki study"
  },
  {
    area: "Cancer Care",
    findings: "Improved quality of life, reduced fatigue and anxiety in cancer patients",
    studies: "Tsang et al. (2007) systematic review"
  },
  {
    area: "Wound Healing",
    findings: "Some evidence for accelerated wound healing with TT/HT",
    studies: "Wirth (1990) controlled study on wound healing"
  },
  {
    area: "Heart Rate Variability",
    findings: "Changes in HRV suggesting shift to parasympathetic dominance",
    studies: "Baldwin et al. (2010) physiological measurements"
  }
];

const EnergyHealing = () => {
  const [selectedModality, setSelectedModality] = useState<string | null>("reiki");
  const [selectedChakra, setSelectedChakra] = useState<number | null>(null);

  const activeModality = energyModalities.find(m => m.id === selectedModality);

  return (
    <>
      <Helmet>
        <title>Energy Healing Modalities - Reiki, Qigong, Pranic Healing | EvidenceMed</title>
        <meta name="description" content="Comprehensive guide to energy healing modalities including Reiki, Qigong, Pranic Healing, Therapeutic Touch, and more. Understand the chakra system and biofield therapies." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-violet-500/10 text-violet-700 border-violet-500/20">
                  Biofield Therapies
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Energy Healing
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Explore the world of subtle energy medicine, where practitioners work with the human 
                  biofield to promote healing, balance, and well-being through various ancient and modern techniques.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Biofield</Badge>
                  <Badge variant="outline">Chakras</Badge>
                  <Badge variant="outline">Life Force</Badge>
                  <Badge variant="outline">Subtle Energy</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* What is Energy Healing */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-violet-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-violet-600" />
                    What is Energy Healing?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Energy healing</strong> encompasses a broad range of therapeutic 
                      practices based on the concept that humans possess a subtle energy field (biofield) that can be 
                      influenced to promote physical, emotional, and spiritual healing.
                    </p>
                    <p>
                      Known by many names across cultures—<em>Qi</em> in Chinese medicine, <em>Prana</em> in Indian 
                      traditions, <em>Ki</em> in Japanese healing arts—this life force energy is believed to flow 
                      through and around the body, and disruptions in this flow can lead to illness.
                    </p>
                    <p>
                      Modern research in biofield science uses sophisticated instruments to measure electromagnetic 
                      fields around the body, heart coherence patterns, and biophoton emissions, providing scientific 
                      frameworks for understanding these ancient practices.
                    </p>
                  </div>
                </div>
              </section>

              {/* Modalities Selector */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-violet-600" />
                  Energy Healing Modalities
                </h2>
                
                {/* Modality Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {energyModalities.map((modality) => {
                    const Icon = modality.icon;
                    return (
                      <button
                        key={modality.id}
                        onClick={() => setSelectedModality(modality.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedModality === modality.id
                            ? `${modality.color} text-white shadow-lg`
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {modality.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Modality Detail */}
                {activeModality && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${activeModality.color} flex items-center justify-center shrink-0`}>
                        {(() => {
                          const Icon = activeModality.icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">{activeModality.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeModality.origin} • Founded by {activeModality.founder}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{activeModality.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Core Principles</h4>
                        <ul className="space-y-2">
                          {activeModality.principles.map((principle, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              {principle}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Techniques</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeModality.techniques.map((technique, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{technique}</Badge>
                          ))}
                        </div>

                        <h4 className="font-semibold text-foreground mb-3 mt-4">
                          {activeModality.levels ? "Training Levels" : activeModality.types ? "Types" : activeModality.settings ? "Settings" : "Elements"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(activeModality.levels || activeModality.types || activeModality.settings || activeModality.elements)?.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-3">Common Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeModality.conditions.map((condition, i) => (
                          <Badge key={i} className="bg-violet-500/10 text-violet-700 border-violet-500/20">{condition}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Chakra System */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Circle className="w-6 h-6 text-violet-600" />
                  The Chakra System
                </h2>
                <p className="text-muted-foreground mb-6">
                  Many energy healing traditions work with chakras—energy centers in the body that regulate 
                  physical, emotional, and spiritual functions. Understanding the chakra system is fundamental 
                  to most energy healing practices.
                </p>

                <div className="space-y-3">
                  {chakras.map((chakra, index) => (
                    <div
                      key={index}
                      className={`bg-card border rounded-xl p-4 cursor-pointer transition-all ${
                        selectedChakra === index 
                          ? 'border-violet-500 shadow-lg' 
                          : 'border-border hover:border-violet-500/50'
                      }`}
                      onClick={() => setSelectedChakra(selectedChakra === index ? null : index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full ${chakra.color}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">{chakra.name}</h3>
                            <Badge variant="outline" className="text-xs">{chakra.element}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{chakra.location}</p>
                        </div>
                      </div>

                      {selectedChakra === index && (
                        <div className="mt-4 pt-4 border-t border-border grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Governs:</p>
                            <p className="text-sm text-muted-foreground">{chakra.governs}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Signs of Imbalance:</p>
                            <p className="text-sm text-muted-foreground">{chakra.imbalance}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Research Evidence */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-violet-600" />
                  Research & Evidence
                </h2>
                <p className="text-muted-foreground mb-6">
                  While energy healing remains an area of ongoing scientific investigation, several studies 
                  have explored its effects on various health outcomes.
                </p>

                <div className="space-y-4">
                  {researchAreas.map((research, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-2">{research.area}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{research.findings}</p>
                      <p className="text-xs text-violet-600 italic">{research.studies}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> While promising, energy healing research often faces methodological 
                    challenges including blinding difficulties and placebo effects. More rigorous studies are 
                    needed to establish efficacy for specific conditions.
                  </p>
                </div>
              </section>

              {/* How to Choose */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-violet-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Choosing an Energy Healing Modality
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Consider Your Goals</h3>
                      <ul className="space-y-1">
                        <li>• Physical healing: Therapeutic Touch, Healing Touch</li>
                        <li>• Spiritual growth: Reiki, Pranic Healing</li>
                        <li>• Self-practice: Qigong, Polarity Yoga</li>
                        <li>• Stress relief: Any modality can help</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Finding a Practitioner</h3>
                      <ul className="space-y-1">
                        <li>• Look for certified practitioners</li>
                        <li>• Ask about training and experience</li>
                        <li>• Trust your intuition and comfort level</li>
                        <li>• Consider complementing conventional care</li>
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
                    className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
                  </Link>
                  <Link 
                    to="/mind-body"
                    className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Explore Mind-Body Medicine <ArrowRight className="w-4 h-4" />
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

export default EnergyHealing;
