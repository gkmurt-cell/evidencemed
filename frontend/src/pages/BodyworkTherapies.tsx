import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Hand,
  Activity,
  Bone,
  Heart,
  Brain,
  Zap,
  Waves,
  CircleDot,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield
} from "lucide-react";

// Bodywork Categories
const bodyworkCategories = [
  {
    id: "massage",
    name: "Massage Therapy",
    icon: Hand,
    color: "bg-amber-500",
    description: "Manual manipulation of soft tissues for therapeutic benefit",
    modalities: [
      { name: "Swedish Massage", description: "Long strokes, kneading, circular movements", benefits: "Relaxation, circulation, stress relief", pressure: "Light to medium" },
      { name: "Deep Tissue Massage", description: "Focused pressure on deeper muscle layers", benefits: "Chronic pain, muscle tension, adhesions", pressure: "Firm to deep" },
      { name: "Sports Massage", description: "Targeted for athletes and active individuals", benefits: "Performance, recovery, injury prevention", pressure: "Variable" },
      { name: "Trigger Point Therapy", description: "Releasing hyperirritable spots in muscles", benefits: "Referred pain, muscle knots, mobility", pressure: "Focused pressure" },
      { name: "Myofascial Release", description: "Gentle sustained pressure on connective tissue", benefits: "Fascial restrictions, posture, flexibility", pressure: "Light sustained" },
      { name: "Thai Massage", description: "Yoga-like stretching and compressions", benefits: "Flexibility, energy flow, relaxation", pressure: "Variable" },
      { name: "Shiatsu", description: "Japanese finger pressure along meridians", benefits: "Energy balance, stress, pain relief", pressure: "Rhythmic pressure" },
      { name: "Lymphatic Drainage", description: "Light rhythmic movements for lymph flow", benefits: "Edema, detoxification, immune support", pressure: "Very light" }
    ]
  },
  {
    id: "chiropractic",
    name: "Chiropractic Care",
    icon: Bone,
    color: "bg-blue-500",
    description: "Spinal adjustments and musculoskeletal manipulation",
    modalities: [
      { name: "Diversified Technique", description: "High-velocity, low-amplitude adjustments", benefits: "Joint dysfunction, alignment, mobility", pressure: "Quick thrust" },
      { name: "Activator Method", description: "Instrument-assisted adjustments", benefits: "Gentle correction, seniors, sensitive patients", pressure: "Instrument" },
      { name: "Gonstead Technique", description: "Specific analysis and precise adjustments", benefits: "Targeted correction, biomechanical issues", pressure: "Specific thrust" },
      { name: "Thompson Drop", description: "Segmented table drops during adjustment", benefits: "Gentle, effective, less force needed", pressure: "Table-assisted" },
      { name: "Flexion-Distraction", description: "Gentle stretching of the spine", benefits: "Disc issues, stenosis, decompression", pressure: "Traction" },
      { name: "SOT (Sacro-Occipital)", description: "Blocks under pelvis for alignment", benefits: "Cranial-sacral balance, whole body", pressure: "Positioning" }
    ]
  },
  {
    id: "osteopathy",
    name: "Osteopathic Medicine",
    icon: Activity,
    color: "bg-emerald-500",
    description: "Holistic approach emphasizing body's self-healing capacity",
    modalities: [
      { name: "OMT (Osteopathic Manipulation)", description: "Hands-on diagnosis and treatment", benefits: "Structural issues, pain, function", pressure: "Variable" },
      { name: "Cranial Osteopathy", description: "Subtle work on skull and sacrum", benefits: "Headaches, TMJ, nervous system", pressure: "Very gentle" },
      { name: "Visceral Manipulation", description: "Gentle mobilization of internal organs", benefits: "Organ function, adhesions, digestion", pressure: "Light" },
      { name: "Muscle Energy Technique", description: "Patient-assisted stretching", benefits: "Mobility, muscle length, alignment", pressure: "Patient effort" },
      { name: "Counterstrain", description: "Positioning for tender point release", benefits: "Acute pain, tender points, spasm", pressure: "Positioning" },
      { name: "HVLA", description: "High velocity, low amplitude thrusts", benefits: "Joint restrictions, quick release", pressure: "Quick thrust" }
    ]
  },
  {
    id: "structural",
    name: "Structural Integration",
    icon: Zap,
    color: "bg-rose-500",
    description: "Reorganizing fascia for better alignment and movement",
    modalities: [
      { name: "Rolfing", description: "10-session series reorganizing fascia", benefits: "Posture, chronic pain, body awareness", pressure: "Deep, sustained" },
      { name: "Hellerwork", description: "Rolfing with movement education and dialogue", benefits: "Emotional patterns, posture, awareness", pressure: "Deep" },
      { name: "KMI (Kinesis Myofascial)", description: "Anatomy Trains-based structural work", benefits: "Fascial lines, movement patterns", pressure: "Variable" },
      { name: "ATSI", description: "Anatomy Trains Structural Integration", benefits: "Whole-body integration, posture", pressure: "Progressive depth" },
      { name: "Soma Neuromuscular", description: "Three-stage body organization", benefits: "Core alignment, breathing, awareness", pressure: "Medium to deep" }
    ]
  },
  {
    id: "movement",
    name: "Movement Therapies",
    icon: Waves,
    color: "bg-violet-500",
    description: "Re-education of movement patterns for optimal function",
    modalities: [
      { name: "Alexander Technique", description: "Releasing habitual tension patterns", benefits: "Posture, performance, pain prevention", pressure: "Light guidance" },
      { name: "Feldenkrais Method", description: "Awareness through movement", benefits: "Neurological function, mobility, learning", pressure: "Gentle movement" },
      { name: "Trager Approach", description: "Gentle rocking and stretching", benefits: "Deep relaxation, pain relief, mobility", pressure: "Rhythmic, light" },
      { name: "Continuum Movement", description: "Fluid movement and sound", benefits: "Embodiment, creativity, healing", pressure: "Self-guided" },
      { name: "Somatic Experiencing", description: "Body-based trauma resolution", benefits: "Trauma, stress, nervous system regulation", pressure: "Awareness" },
      { name: "Pilates", description: "Core-focused movement training", benefits: "Core strength, flexibility, alignment", pressure: "Active exercise" }
    ]
  },
  {
    id: "energy-bodywork",
    name: "Energy-Based Bodywork",
    icon: CircleDot,
    color: "bg-cyan-500",
    description: "Working with body's energy systems through touch",
    modalities: [
      { name: "Craniosacral Therapy", description: "Light touch on cranial bones and sacrum", benefits: "CNS function, pain, stress, headaches", pressure: "5 grams" },
      { name: "Polarity Therapy", description: "Balancing energy flow in body", benefits: "Energy balance, stress, emotional issues", pressure: "Light touch" },
      { name: "Zero Balancing", description: "Working with body's energy at bone level", benefits: "Deep relaxation, clarity, alignment", pressure: "Interface touch" },
      { name: "Jin Shin Jyutsu", description: "Japanese energy harmonizing art", benefits: "Energy flow, organ function, emotions", pressure: "Light holds" },
      { name: "Bowen Technique", description: "Gentle rolling moves over muscles", benefits: "Pain, mobility, relaxation, stress", pressure: "Light rolling" },
      { name: "CranioSacral Unwinding", description: "Following body's inherent motion", benefits: "Trauma release, flexibility, integration", pressure: "Following" }
    ]
  }
];

// Conditions and Evidence
const conditionsEvidence = [
  { condition: "Low Back Pain", evidence: "Strong", modalities: "Massage, Chiropractic, Osteopathy", notes: "Multiple RCTs support effectiveness" },
  { condition: "Neck Pain", evidence: "Moderate-Strong", modalities: "Massage, Chiropractic, Manual therapy", notes: "Beneficial especially combined with exercise" },
  { condition: "Tension Headaches", evidence: "Moderate", modalities: "Massage, Craniosacral, Chiropractic", notes: "May reduce frequency and intensity" },
  { condition: "Fibromyalgia", evidence: "Moderate", modalities: "Massage, Myofascial release", notes: "Helpful for symptom management" },
  { condition: "Osteoarthritis", evidence: "Moderate", modalities: "Massage, Manual therapy", notes: "Pain reduction and function improvement" },
  { condition: "Sports Injuries", evidence: "Strong", modalities: "Sports massage, Physical therapy", notes: "Standard of care for recovery" },
  { condition: "Anxiety/Stress", evidence: "Moderate-Strong", modalities: "Massage, Craniosacral", notes: "Consistent relaxation response" },
  { condition: "TMJ Disorders", evidence: "Moderate", modalities: "Craniosacral, Myofascial, Massage", notes: "Beneficial as part of treatment" }
];

// Safety Considerations
const safetyInfo = [
  { category: "General Contraindications", items: ["Open wounds or burns", "Acute fractures", "Deep vein thrombosis", "Skin infections", "Uncontrolled hypertension"] },
  { category: "Relative Contraindications", items: ["Pregnancy (first trimester)", "Osteoporosis", "Recent surgery", "Cancer (requires clearance)", "Blood clotting disorders"] },
  { category: "When to Seek Medical Advice", items: ["Numbness or tingling after treatment", "Severe pain", "New neurological symptoms", "Dizziness", "Persistent discomfort"] }
];

const BodyworkTherapies = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("massage");
  const activeCategory = bodyworkCategories.find(c => c.id === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Bodywork & Manual Therapies - Massage, Chiropractic, Osteopathy | EvidenceMed</title>
        <meta name="description" content="Comprehensive guide to bodywork and manual therapies including massage, chiropractic care, osteopathy, structural integration, and movement therapies." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-amber-500/10 text-amber-700 border-amber-500/20">
                  Hands-On Healing
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Bodywork & Manual Therapies
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Discover the healing power of touch through evidence-based manual therapies. From massage 
                  to chiropractic care, these hands-on approaches address pain, improve function, and promote 
                  overall well-being.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Manual Therapy</Badge>
                  <Badge variant="outline">Soft Tissue</Badge>
                  <Badge variant="outline">Joint Mobilization</Badge>
                  <Badge variant="outline">Fascial Release</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 md:p-8 border border-amber-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Hand className="w-6 h-6 text-amber-600" />
                    The Science of Touch Therapy
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Manual therapies</strong> have been practiced across 
                      cultures for thousands of years. Modern research confirms their effectiveness for various 
                      musculoskeletal conditions, with measurable effects on pain, circulation, muscle tension, 
                      and nervous system function.
                    </p>
                    <p>
                      These therapies work through multiple mechanisms: mechanical effects on tissue, 
                      neurological effects on pain signaling, hormonal changes (increased oxytocin, decreased 
                      cortisol), and psychological benefits of therapeutic touch.
                    </p>
                    <p>
                      Whether addressing acute injury, chronic pain, or seeking preventive care, bodywork 
                      offers a spectrum of approaches from gentle relaxation to deep structural work.
                    </p>
                  </div>
                </div>
              </section>

              {/* Category Selector */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-amber-600" />
                  Bodywork Modalities
                </h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {bodyworkCategories.map((category) => {
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

                    <div className="grid gap-3">
                      {activeCategory.modalities.map((modality, i) => (
                        <div key={i} className="bg-secondary/30 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{modality.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{modality.description}</p>
                            </div>
                            <Badge variant="outline" className="shrink-0 text-xs">{modality.pressure}</Badge>
                          </div>
                          <p className="text-sm text-amber-600 mt-2">
                            <span className="font-medium">Benefits:</span> {modality.benefits}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Evidence Table */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-amber-600" />
                  Conditions & Evidence
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Condition</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Evidence</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Best Modalities</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden md:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conditionsEvidence.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 text-sm text-foreground">{row.condition}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                row.evidence.includes('Strong') 
                                  ? 'bg-green-500/10 text-green-700' 
                                  : 'bg-amber-500/10 text-amber-700'
                              }`}
                            >
                              {row.evidence}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{row.modalities}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Safety Section */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-amber-600" />
                  Safety Considerations
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  {safetyInfo.map((info, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        {index === 0 && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {index === 1 && <AlertCircle className="w-4 h-4 text-amber-500" />}
                        {index === 2 && <AlertCircle className="w-4 h-4 text-blue-500" />}
                        {info.category}
                      </h3>
                      <ul className="space-y-1">
                        {info.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-xs mt-1">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Choosing a Practitioner */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 md:p-8 border border-amber-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Finding the Right Practitioner
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Credentials to Look For</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          State licensure (LMT, DC, DO)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Board certification in specialty
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Continuing education in specific techniques
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Professional association membership
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Questions to Ask</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Experience with your specific condition?
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          What techniques will be used?
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Expected number of sessions?
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          How will progress be measured?
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
                    className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
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

export default BodyworkTherapies;
