import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Brain,
  Heart,
  Wind,
  Eye,
  Music,
  Pencil,
  Users,
  Timer,
  Sparkles,
  Activity,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle,
  BookOpen
} from "lucide-react";

// Mind-Body Practices
const practices = [
  {
    id: "meditation",
    name: "Meditation",
    icon: Brain,
    color: "bg-indigo-500",
    description: "A practice of focused attention and awareness to achieve mental clarity, emotional calm, and spiritual insight.",
    types: [
      { name: "Mindfulness Meditation", description: "Non-judgmental awareness of present moment experience", origin: "Buddhist/Secular" },
      { name: "Transcendental Meditation", description: "Mantra-based technique for deep rest", origin: "Vedic tradition" },
      { name: "Loving-Kindness (Metta)", description: "Cultivating compassion for self and others", origin: "Buddhist" },
      { name: "Zen Meditation (Zazen)", description: "Seated meditation focusing on posture and breath", origin: "Japanese Buddhism" },
      { name: "Vipassana", description: "Insight meditation observing body sensations", origin: "Theravada Buddhism" },
      { name: "Guided Visualization", description: "Using mental imagery for relaxation or goals", origin: "Modern/Various" }
    ],
    benefits: ["Stress reduction", "Improved focus", "Emotional regulation", "Lower blood pressure", "Better sleep"],
    research: "Over 3,000 studies. Strong evidence for anxiety, depression, chronic pain, and blood pressure."
  },
  {
    id: "breathwork",
    name: "Breathwork",
    icon: Wind,
    color: "bg-cyan-500",
    description: "Conscious breathing techniques to influence physical, mental, and emotional states.",
    types: [
      { name: "Pranayama", description: "Yogic breathing with various patterns and holds", origin: "India/Yoga" },
      { name: "Holotropic Breathwork", description: "Accelerated breathing for altered states", origin: "Stanislav Grof" },
      { name: "Wim Hof Method", description: "Controlled hyperventilation with cold exposure", origin: "Netherlands" },
      { name: "Box Breathing", description: "Equal inhale-hold-exhale-hold pattern", origin: "Military/Modern" },
      { name: "Coherent Breathing", description: "5 breaths per minute for HRV optimization", origin: "Modern" },
      { name: "4-7-8 Breathing", description: "Relaxation technique by Dr. Andrew Weil", origin: "Modern/Yoga" }
    ],
    benefits: ["Stress relief", "Improved HRV", "Enhanced focus", "Emotional release", "Better oxygenation"],
    research: "Growing evidence for anxiety, PTSD, blood pressure regulation, and autonomic function."
  },
  {
    id: "yoga",
    name: "Yoga",
    icon: Activity,
    color: "bg-purple-500",
    description: "Ancient practice combining physical postures, breathing, and meditation for holistic health.",
    types: [
      { name: "Hatha Yoga", description: "Foundation practice emphasizing postures and breath", origin: "India" },
      { name: "Vinyasa/Flow", description: "Dynamic sequences linked with breath", origin: "Modern/India" },
      { name: "Iyengar Yoga", description: "Precise alignment using props", origin: "B.K.S. Iyengar" },
      { name: "Kundalini Yoga", description: "Focus on energy, breathwork, and mantras", origin: "Sikh/Tantric" },
      { name: "Restorative Yoga", description: "Passive poses held with props for deep rest", origin: "Modern" },
      { name: "Yin Yoga", description: "Long-held poses targeting connective tissue", origin: "Modern/Taoist" }
    ],
    benefits: ["Flexibility", "Strength", "Stress reduction", "Pain relief", "Mind-body awareness"],
    research: "Extensive evidence for back pain, anxiety, depression, cardiovascular health, and quality of life."
  },
  {
    id: "tai-chi",
    name: "Tai Chi",
    icon: Moon,
    color: "bg-slate-600",
    description: "Chinese martial art practiced for health benefits through slow, flowing movements and deep breathing.",
    types: [
      { name: "Yang Style", description: "Most popular, characterized by large, graceful movements", origin: "Yang Lu-ch'an" },
      { name: "Chen Style", description: "Original style with explosive movements", origin: "Chen Wangting" },
      { name: "Wu Style", description: "Compact movements, emphasis on internal work", origin: "Wu Quanyou" },
      { name: "Sun Style", description: "Combines Tai Chi with Xingyi and Bagua", origin: "Sun Lutang" },
      { name: "Tai Chi for Health", description: "Simplified forms for therapeutic use", origin: "Modern/Medical" }
    ],
    benefits: ["Balance", "Fall prevention", "Cardiovascular health", "Stress reduction", "Cognitive function"],
    research: "Strong evidence for fall prevention in elderly, arthritis, and cardiovascular health."
  },
  {
    id: "biofeedback",
    name: "Biofeedback",
    icon: Activity,
    color: "bg-green-500",
    description: "Using electronic monitoring to train conscious control of physiological functions.",
    types: [
      { name: "HRV Biofeedback", description: "Training heart rate variability patterns", origin: "Modern" },
      { name: "Neurofeedback (EEG)", description: "Training brainwave patterns", origin: "Modern" },
      { name: "EMG Biofeedback", description: "Muscle tension awareness and control", origin: "Modern" },
      { name: "Thermal Biofeedback", description: "Controlling skin temperature", origin: "Modern" },
      { name: "GSR Biofeedback", description: "Galvanic skin response training", origin: "Modern" }
    ],
    benefits: ["Stress management", "Pain control", "ADHD improvement", "Anxiety reduction", "Performance enhancement"],
    research: "FDA-approved for various conditions. Strong evidence for headaches, incontinence, and hypertension."
  },
  {
    id: "hypnotherapy",
    name: "Hypnotherapy",
    icon: Eye,
    color: "bg-violet-500",
    description: "Using hypnosis to access the subconscious mind for therapeutic change.",
    types: [
      { name: "Clinical Hypnotherapy", description: "Medical applications for symptoms and conditions", origin: "Modern/Medical" },
      { name: "Ericksonian Hypnosis", description: "Indirect, conversational approach", origin: "Milton Erickson" },
      { name: "Cognitive Hypnotherapy", description: "Integration with CBT principles", origin: "Modern" },
      { name: "Regression Therapy", description: "Exploring past experiences and memories", origin: "Various" },
      { name: "Self-Hypnosis", description: "Self-induced trance for personal goals", origin: "Various" }
    ],
    benefits: ["Pain management", "Habit change", "Anxiety relief", "Phobia treatment", "Performance enhancement"],
    research: "Evidence for IBS, chronic pain, anxiety, and smoking cessation. AMA recognized since 1958."
  }
];

// Psychoneuroimmunology Section
const pniConcepts = [
  {
    title: "Stress Response",
    description: "Chronic stress activates the HPA axis, releasing cortisol that suppresses immune function and promotes inflammation.",
    implications: "Mind-body practices can reduce cortisol and restore immune balance."
  },
  {
    title: "Gut-Brain Axis",
    description: "Bidirectional communication between gut microbiome and brain affects mood, immunity, and overall health.",
    implications: "Stress reduction improves gut health; relaxation techniques benefit digestion."
  },
  {
    title: "Neuroplasticity",
    description: "The brain can reorganize and form new neural connections throughout life, influenced by thoughts and practices.",
    implications: "Meditation and mindfulness can literally change brain structure and function."
  },
  {
    title: "Heart-Brain Connection",
    description: "The heart sends more signals to the brain than vice versa, influencing emotional processing and cognitive function.",
    implications: "Heart coherence practices improve emotional regulation and mental clarity."
  }
];

// Expressive Therapies
const expressiveTherapies = [
  { name: "Art Therapy", icon: Pencil, description: "Using creative processes for emotional expression and healing", applications: "Trauma, PTSD, depression, anxiety, developmental disorders" },
  { name: "Music Therapy", icon: Music, description: "Using music interventions for physical and emotional objectives", applications: "Dementia, autism, pain management, rehabilitation" },
  { name: "Dance/Movement Therapy", icon: Activity, description: "Using movement to support emotional, cognitive, physical integration", applications: "Trauma, eating disorders, depression, chronic pain" },
  { name: "Drama Therapy", icon: Users, description: "Using theatrical processes for therapeutic goals", applications: "Social skills, trauma, self-expression, confidence" },
  { name: "Writing/Poetry Therapy", icon: BookOpen, description: "Using written expression for insight and emotional processing", applications: "Grief, trauma, self-discovery, mental health" }
];

const MindBodyMedicine = () => {
  const [selectedPractice, setSelectedPractice] = useState<string>("meditation");
  const activePractice = practices.find(p => p.id === selectedPractice);

  return (
    <>
      <Helmet>
        <title>Mind-Body Medicine - Meditation, Yoga, Breathwork | EvidenceMed</title>
        <meta name="description" content="Comprehensive guide to mind-body medicine including meditation, yoga, breathwork, tai chi, biofeedback, and hypnotherapy. Evidence-based approaches to holistic health." />
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
                  Integrative Approaches
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Mind-Body Medicine
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Explore evidence-based practices that harness the connection between mental processes and 
                  physical health. From ancient traditions to modern neuroscience, discover how thoughts, 
                  emotions, and behaviors influence healing.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Psychoneuroimmunology</Badge>
                  <Badge variant="outline">Stress Reduction</Badge>
                  <Badge variant="outline">Self-Regulation</Badge>
                  <Badge variant="outline">Neuroplasticity</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl p-6 md:p-8 border border-teal-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-teal-600" />
                    The Science of Mind-Body Connection
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Mind-body medicine</strong> is built on the scientific 
                      understanding that our thoughts, feelings, and beliefs can directly affect our physical health, 
                      and that physical health can influence mental state.
                    </p>
                    <p>
                      The field of <strong className="text-foreground">psychoneuroimmunology (PNI)</strong> has 
                      demonstrated concrete pathways linking psychological states to immune function, hormonal 
                      balance, and inflammatory responses. Chronic stress, for example, measurably impairs immunity 
                      and accelerates aging.
                    </p>
                    <p>
                      Mind-body practices offer tools to consciously influence these systems, promoting 
                      relaxation responses, improving physiological markers, and enhancing quality of life 
                      across numerous health conditions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Main Practices Section */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                  Core Mind-Body Practices
                </h2>

                {/* Practice Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {practices.map((practice) => {
                    const Icon = practice.icon;
                    return (
                      <button
                        key={practice.id}
                        onClick={() => setSelectedPractice(practice.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedPractice === practice.id
                            ? `${practice.color} text-white shadow-lg`
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {practice.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Practice Detail */}
                {activePractice && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl ${activePractice.color} flex items-center justify-center shrink-0`}>
                        {(() => {
                          const Icon = activePractice.icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground">{activePractice.name}</h3>
                        <p className="text-sm text-muted-foreground">{activePractice.description}</p>
                      </div>
                    </div>

                    {/* Types */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Types & Traditions</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activePractice.types.map((type, i) => (
                          <div key={i} className="bg-secondary/30 rounded-lg p-3">
                            <p className="font-medium text-foreground text-sm">{type.name}</p>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                            <p className="text-xs text-teal-600 mt-1">Origin: {type.origin}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {activePractice.benefits.map((benefit, i) => (
                          <Badge key={i} className="bg-teal-500/10 text-teal-700 border-teal-500/20">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Research */}
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Research Summary</h4>
                      <p className="text-sm text-muted-foreground">{activePractice.research}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* PNI Section */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-teal-600" />
                  Psychoneuroimmunology: Key Concepts
                </h2>
                <p className="text-muted-foreground mb-6">
                  Understanding how the mind influences the body through measurable biological pathways.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {pniConcepts.map((concept, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <h3 className="font-semibold text-foreground mb-2">{concept.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{concept.description}</p>
                      <p className="text-sm text-teal-600 italic">{concept.implications}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Expressive Therapies */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Music className="w-6 h-6 text-teal-600" />
                  Expressive & Creative Therapies
                </h2>
                <p className="text-muted-foreground mb-6">
                  Creative expression as a pathway to healing, self-discovery, and emotional processing.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expressiveTherapies.map((therapy, index) => {
                    const Icon = therapy.icon;
                    return (
                      <div key={index} className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-teal-600" />
                          </div>
                          <h3 className="font-semibold text-foreground text-sm">{therapy.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{therapy.description}</p>
                        <p className="text-xs text-teal-600">{therapy.applications}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Getting Started */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl p-6 md:p-8 border border-teal-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Getting Started with Mind-Body Practice
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">For Beginners</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Start with 5-10 minutes of simple breathing exercises
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Try guided meditation apps (Headspace, Calm, Insight Timer)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Attend a beginner yoga or tai chi class
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Practice consistency over duration
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Key Principles</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Regular practice is more important than perfect practice
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Find what resonates with you personally
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Complement, don't replace, conventional care
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Be patient—benefits often build over time
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
                    className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
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

export default MindBodyMedicine;
