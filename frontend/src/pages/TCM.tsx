import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Leaf, 
  Flame,
  Droplets, 
  Wind,
  Mountain,
  CircleDot,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Brain,
  Activity,
  Zap,
  Target,
  ExternalLink,
  Moon
} from "lucide-react";

// Five Elements data
const fiveElements = [
  {
    id: "wood",
    name: "Wood (木 Mù)",
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    icon: Leaf,
    organ: "Liver & Gallbladder",
    emotion: "Anger",
    season: "Spring",
    taste: "Sour",
    description: "Wood represents growth, flexibility, and upward movement. Associated with planning, decision-making, and the smooth flow of Qi.",
    imbalanceSigns: ["Irritability", "Headaches", "Eye problems", "Tendon issues", "Frustration"]
  },
  {
    id: "fire",
    name: "Fire (火 Huǒ)",
    color: "bg-red-500",
    textColor: "text-red-600",
    bgColor: "bg-red-500/10",
    icon: Flame,
    organ: "Heart & Small Intestine",
    emotion: "Joy",
    season: "Summer",
    taste: "Bitter",
    description: "Fire represents warmth, transformation, and consciousness. Associated with the spirit (Shen), circulation, and mental clarity.",
    imbalanceSigns: ["Anxiety", "Insomnia", "Heart palpitations", "Excessive sweating", "Mania or depression"]
  },
  {
    id: "earth",
    name: "Earth (土 Tǔ)",
    color: "bg-amber-500",
    textColor: "text-amber-600",
    bgColor: "bg-amber-500/10",
    icon: Mountain,
    organ: "Spleen & Stomach",
    emotion: "Worry/Pensiveness",
    season: "Late Summer",
    taste: "Sweet",
    description: "Earth represents stability, nourishment, and transformation of food into energy. The center around which other elements revolve.",
    imbalanceSigns: ["Digestive issues", "Fatigue", "Overthinking", "Muscle weakness", "Bloating"]
  },
  {
    id: "metal",
    name: "Metal (金 Jīn)",
    color: "bg-slate-400",
    textColor: "text-slate-600",
    bgColor: "bg-slate-400/10",
    icon: CircleDot,
    organ: "Lung & Large Intestine",
    emotion: "Grief/Sadness",
    season: "Autumn",
    taste: "Pungent/Spicy",
    description: "Metal represents structure, boundaries, and letting go. Associated with respiration, skin, and the ability to release.",
    imbalanceSigns: ["Respiratory issues", "Skin problems", "Constipation", "Prolonged grief", "Weakened immunity"]
  },
  {
    id: "water",
    name: "Water (水 Shuǐ)",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-600/10",
    icon: Droplets,
    organ: "Kidney & Bladder",
    emotion: "Fear",
    season: "Winter",
    taste: "Salty",
    description: "Water represents wisdom, willpower, and the body's reserves. Associated with aging, reproduction, and foundational energy (Jing).",
    imbalanceSigns: ["Low back pain", "Knee weakness", "Hearing issues", "Fear/anxiety", "Premature aging"]
  }
];

// Fundamental Substances
const fundamentalSubstances = [
  {
    name: "Qi (氣)",
    description: "Vital energy or life force that flows through meridians. The foundation of all body functions.",
    functions: ["Movement", "Protection", "Transformation", "Warming", "Containing"],
    icon: Wind
  },
  {
    name: "Blood (血 Xuè)",
    description: "Nourishes and moistens tissues. Closely related to Qi - 'Qi is the commander of Blood, Blood is the mother of Qi.'",
    functions: ["Nourishment", "Moistening", "Housing the Mind (Shen)", "Supporting Qi"],
    icon: Heart
  },
  {
    name: "Jing (精)",
    description: "Essence - the fundamental substance underlying all life. Stored in Kidneys, determines constitution and longevity.",
    functions: ["Growth", "Development", "Reproduction", "Constitution", "Aging"],
    icon: Sparkles
  },
  {
    name: "Shen (神)",
    description: "Spirit or Mind - consciousness, mental faculties, and emotional wellbeing. Housed in the Heart.",
    functions: ["Consciousness", "Cognition", "Sleep", "Emotional balance", "Vitality"],
    icon: Brain
  },
  {
    name: "Body Fluids (津液)",
    description: "All fluids other than blood - sweat, tears, saliva, joint fluid. Moisten and nourish the body.",
    functions: ["Moistening", "Lubrication", "Nourishment", "Temperature regulation"],
    icon: Droplets
  }
];

// Common TCM Patterns
const commonPatterns = [
  {
    name: "Qi Deficiency",
    symptoms: ["Fatigue", "Weak voice", "Shortness of breath", "Spontaneous sweating", "Poor appetite"],
    tongue: "Pale, possibly swollen with teeth marks",
    pulse: "Weak, empty"
  },
  {
    name: "Blood Deficiency",
    symptoms: ["Pale complexion", "Dizziness", "Dry skin/hair", "Poor memory", "Numbness/tingling"],
    tongue: "Pale, thin",
    pulse: "Thin, choppy"
  },
  {
    name: "Yin Deficiency",
    symptoms: ["Night sweats", "Hot flashes", "Dry mouth/throat", "Insomnia", "Five-palm heat"],
    tongue: "Red, little or no coating, cracks",
    pulse: "Thin, rapid"
  },
  {
    name: "Yang Deficiency",
    symptoms: ["Cold limbs", "Fatigue", "Loose stools", "Frequent urination", "Low libido"],
    tongue: "Pale, swollen, wet",
    pulse: "Deep, slow, weak"
  },
  {
    name: "Qi Stagnation",
    symptoms: ["Emotional stress", "Sighing", "Chest/rib discomfort", "PMS", "Mood swings"],
    tongue: "Normal or slightly purple sides",
    pulse: "Wiry"
  },
  {
    name: "Blood Stasis",
    symptoms: ["Fixed stabbing pain", "Dark complexion", "Purple lips/nails", "Masses", "Memory issues"],
    tongue: "Purple or dark spots",
    pulse: "Choppy, wiry"
  }
];

// Major TCM Herbs
const majorHerbs = [
  { name: "Ginseng (人參)", category: "Qi Tonic", link: "/compound/ginseng" },
  { name: "Astragalus (黃芪)", category: "Qi Tonic", link: "/compound/astragalus" },
  { name: "Rehmannia (地黃)", category: "Blood Tonic", link: "/compound/rehmannia" },
  { name: "Dong Quai (當歸)", category: "Blood Tonic", link: "/compound/dong-quai" },
  { name: "Goji Berry (枸杞)", category: "Yin Tonic", link: "/compound/goji-berry" },
  { name: "Schisandra (五味子)", category: "Astringent", link: "/compound/schisandra" },
  { name: "Reishi (靈芝)", category: "Shen Tonic", link: "/compound/reishi" },
  { name: "He Shou Wu (何首烏)", category: "Jing Tonic", link: "/compound/he-shou-wu" },
];

// Constitution Quiz Questions
const constitutionQuestions = [
  {
    id: 1,
    question: "How do you typically respond to temperature?",
    options: [
      { value: "cold", label: "Often feel cold, prefer warmth" },
      { value: "hot", label: "Often feel warm, prefer cooling" },
      { value: "balanced", label: "Generally comfortable, adaptable" }
    ]
  },
  {
    id: 2,
    question: "How is your energy throughout the day?",
    options: [
      { value: "deficient", label: "Often tired, need rest frequently" },
      { value: "excess", label: "Abundant energy, sometimes restless" },
      { value: "balanced", label: "Steady energy, good recovery" }
    ]
  },
  {
    id: 3,
    question: "How would you describe your digestion?",
    options: [
      { value: "weak", label: "Slow, bloating, loose stools" },
      { value: "strong", label: "Strong appetite, quick digestion, sometimes acid" },
      { value: "balanced", label: "Regular, comfortable, efficient" }
    ]
  },
  {
    id: 4,
    question: "How do you handle emotional stress?",
    options: [
      { value: "stagnant", label: "Tension, frustration, sighing" },
      { value: "scattered", label: "Anxiety, racing thoughts, overwhelm" },
      { value: "balanced", label: "Process well, maintain equilibrium" }
    ]
  },
  {
    id: 5,
    question: "How is your sleep quality?",
    options: [
      { value: "disturbed", label: "Difficulty falling/staying asleep, vivid dreams" },
      { value: "heavy", label: "Sleep deeply but hard to wake, groggy" },
      { value: "balanced", label: "Fall asleep easily, wake refreshed" }
    ]
  }
];

const TCM = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleQuizAnswer = (questionId: number, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateConstitution = () => {
    const answers = Object.values(quizAnswers);
    const counts: Record<string, number> = {};
    answers.forEach(a => {
      counts[a] = (counts[a] || 0) + 1;
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || "balanced";
  };

  const getConstitutionInfo = (type: string) => {
    const info: Record<string, { title: string; description: string; recommendations: string[] }> = {
      cold: {
        title: "Yang Deficiency Tendency",
        description: "Your constitution tends toward coldness and may benefit from warming foods and herbs.",
        recommendations: ["Ginger tea", "Warming spices (cinnamon, cardamom)", "Cooked foods over raw", "Moxibustion", "Gentle exercise to build warmth"]
      },
      hot: {
        title: "Yin Deficiency Tendency", 
        description: "Your constitution tends toward heat and may benefit from cooling, nourishing practices.",
        recommendations: ["Cooling foods (cucumber, pear)", "Adequate rest", "Meditation", "Yin-nourishing herbs", "Avoid overstimulation"]
      },
      deficient: {
        title: "Qi/Blood Deficiency Tendency",
        description: "Your constitution may benefit from building and tonifying practices.",
        recommendations: ["Regular meals", "Adequate sleep", "Gentle qi-building exercises", "Tonifying herbs", "Avoid overexertion"]
      },
      excess: {
        title: "Excess/Stagnation Tendency",
        description: "Your constitution may benefit from movement and releasing practices.",
        recommendations: ["Regular exercise", "Stress management", "Qi-moving herbs", "Avoid rich/greasy foods", "Express emotions healthily"]
      },
      stagnant: {
        title: "Qi Stagnation Tendency",
        description: "Your constitution tends toward stagnation and may benefit from movement and emotional release.",
        recommendations: ["Regular physical activity", "Breathing exercises", "Sour foods (lemon)", "Qi-moving herbs", "Creative expression"]
      },
      scattered: {
        title: "Shen Disturbance Tendency",
        description: "Your constitution may benefit from calming and grounding practices.",
        recommendations: ["Meditation", "Regular routine", "Heart-calming herbs", "Limit stimulants", "Grounding exercises"]
      },
      weak: {
        title: "Spleen Qi Deficiency Tendency",
        description: "Your digestion may benefit from warming, easily digestible foods.",
        recommendations: ["Cooked foods", "Warm beverages", "Small frequent meals", "Avoid cold/raw foods", "Spleen-tonifying herbs"]
      },
      strong: {
        title: "Stomach Heat Tendency",
        description: "Your digestion runs hot and may benefit from cooling, lighter foods.",
        recommendations: ["Cooling foods", "Smaller portions", "Avoid spicy/greasy foods", "Bitter vegetables", "Stomach-cooling herbs"]
      },
      disturbed: {
        title: "Heart/Kidney Disharmony",
        description: "Your sleep may benefit from calming the spirit and nourishing yin.",
        recommendations: ["Evening routine", "Avoid screens before bed", "Shen-calming herbs", "Foot soaks", "Meditation before sleep"]
      },
      heavy: {
        title: "Dampness/Phlegm Tendency",
        description: "Your constitution may benefit from drying and transforming practices.",
        recommendations: ["Light exercise", "Avoid dairy/sugar", "Aromatic herbs", "Dry cooking methods", "Spleen-supporting practices"]
      },
      balanced: {
        title: "Relatively Balanced Constitution",
        description: "Your constitution shows good balance. Focus on maintenance and prevention.",
        recommendations: ["Seasonal eating", "Regular moderate exercise", "Stress management", "Adequate rest", "Preventive practices"]
      }
    };
    return info[type] || info.balanced;
  };

  return (
    <>
      <Helmet>
        <title>Traditional Chinese Medicine (TCM) | Five Elements, Qi & Meridians | EvidenceMed</title>
        <meta 
          name="description" 
          content="Explore Traditional Chinese Medicine: Five Elements theory, Qi and Blood, Yin-Yang balance, acupuncture meridians, and classical herbal formulas. Educational resource for ancient healing wisdom." 
        />
        <meta name="keywords" content="Traditional Chinese Medicine, TCM, Five Elements, Qi, acupuncture, Chinese herbs, Yin Yang, meridians, Chinese medicine theory" />
        <link rel="canonical" href="https://evidencemed.com/tcm" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-rose-500/5 via-amber-500/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-700 border-rose-500/20">
                  3,000+ Years of Medical Tradition
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Traditional Chinese Medicine
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  A comprehensive medical system developed over millennia, emphasizing the balance of 
                  Qi (vital energy), the harmony of Yin and Yang, and the interconnection of body, mind, and spirit.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto mb-6">
                  TCM includes acupuncture, herbal medicine, dietary therapy, Qi Gong, and Tui Na massage, 
                  all guided by pattern differentiation based on individual constitution.
                </p>
                <EducationalDisclaimer />
              </div>
            </div>
          </section>

          {/* Main Content with Sidebar */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-8">
                
                {/* Yin-Yang Section */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-white flex items-center justify-center border-2 border-border">
                      <span className="text-2xl">☯</span>
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Yin & Yang (陰陽)</h2>
                      <p className="text-sm text-muted-foreground">The Foundation of TCM Theory</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Yin and Yang are complementary opposites that exist in dynamic balance. Neither can exist without the other, 
                    and health depends on their harmonious interplay. Disease arises when this balance is disrupted.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-900/5 border border-slate-200">
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Moon className="w-4 h-4" /> Yin (陰)
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Cold, dark, passive, interior</li>
                        <li>• Substance, structure, blood, fluids</li>
                        <li>• Night, rest, nourishment</li>
                        <li>• Feminine principle, receptive</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-200">
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-600" /> Yang (陽)
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Warm, bright, active, exterior</li>
                        <li>• Function, energy, Qi, warmth</li>
                        <li>• Day, activity, transformation</li>
                        <li>• Masculine principle, dynamic</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Five Elements Section */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 via-red-500/20 to-blue-500/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Five Elements (五行 Wǔ Xíng)</h2>
                      <p className="text-sm text-muted-foreground">Wood, Fire, Earth, Metal, Water</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    The Five Elements describe the cyclical nature of energy transformation. Each element corresponds to 
                    organs, emotions, seasons, and qualities, existing in generating and controlling relationships.
                  </p>
                  
                  {/* Element Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {fiveElements.map((element) => {
                      const IconComponent = element.icon;
                      return (
                        <button
                          key={element.id}
                          onClick={() => setSelectedElement(selectedElement === element.id ? null : element.id)}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            selectedElement === element.id 
                              ? `${element.bgColor} border-current ${element.textColor} shadow-md` 
                              : 'bg-secondary/30 border-border hover:border-primary/30'
                          }`}
                        >
                          <IconComponent className={`w-6 h-6 mx-auto mb-2 ${selectedElement === element.id ? '' : 'text-muted-foreground'}`} />
                          <p className="text-xs font-medium text-center">{element.name.split(' ')[0]}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Element Details */}
                  {selectedElement && (
                    <div className={`p-4 rounded-lg border-l-4 ${fiveElements.find(e => e.id === selectedElement)?.bgColor} ${fiveElements.find(e => e.id === selectedElement)?.textColor.replace('text-', 'border-')}`}>
                      {(() => {
                        const element = fiveElements.find(e => e.id === selectedElement);
                        if (!element) return null;
                        return (
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{element.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{element.description}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><strong>Organ:</strong> {element.organ}</p>
                                <p><strong>Emotion:</strong> {element.emotion}</p>
                                <p><strong>Season:</strong> {element.season}</p>
                                <p><strong>Taste:</strong> {element.taste}</p>
                              </div>
                              <div>
                                <p className="font-medium mb-1">Imbalance Signs:</p>
                                <ul className="text-muted-foreground">
                                  {element.imbalanceSigns.map((sign, i) => (
                                    <li key={i}>• {sign}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </section>

                {/* Fundamental Substances */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Fundamental Substances</h2>
                      <p className="text-sm text-muted-foreground">Qi, Blood, Jing, Shen & Body Fluids</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fundamentalSubstances.map((substance) => {
                      const IconComponent = substance.icon;
                      return (
                        <div key={substance.name} className="p-4 rounded-lg bg-secondary/30 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">{substance.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{substance.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {substance.functions.slice(0, 3).map((func, i) => (
                              <Badge key={i} variant="outline" className="text-[10px]">{func}</Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Common Patterns */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Common TCM Patterns</h2>
                      <p className="text-sm text-muted-foreground">Pattern Differentiation (辨證)</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    TCM diagnoses patterns of disharmony rather than diseases. These patterns guide treatment selection.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {commonPatterns.map((pattern) => (
                      <div key={pattern.name} className="p-4 rounded-lg bg-secondary/20 border border-border">
                        <h3 className="font-semibold text-foreground mb-2">{pattern.name}</h3>
                        <div className="text-xs space-y-2">
                          <div>
                            <span className="font-medium text-muted-foreground">Symptoms: </span>
                            <span className="text-muted-foreground">{pattern.symptoms.join(", ")}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Tongue: </span>
                            <span className="text-muted-foreground">{pattern.tongue}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Pulse: </span>
                            <span className="text-muted-foreground">{pattern.pulse}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Constitution Quiz */}
                <section className="bg-gradient-to-br from-rose-500/5 to-amber-500/5 border border-rose-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Constitution Assessment</h2>
                      <p className="text-sm text-muted-foreground">Discover your TCM constitutional tendency</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-amber-700">Note:</strong> This is a simplified educational tool. 
                      Proper TCM diagnosis requires pulse reading, tongue examination, and consultation with a trained practitioner.
                    </p>
                  </div>

                  {!showQuizResult ? (
                    <div className="space-y-6">
                      {constitutionQuestions.map((q) => (
                        <div key={q.id} className="bg-card rounded-lg p-4 border border-border">
                          <p className="font-medium text-foreground mb-3">{q.id}. {q.question}</p>
                          <RadioGroup
                            value={quizAnswers[q.id] || ""}
                            onValueChange={(value) => handleQuizAnswer(q.id, value)}
                          >
                            {q.options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`q${q.id}-${option.value}`} />
                                <Label htmlFor={`q${q.id}-${option.value}`} className="text-sm text-muted-foreground cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => setShowQuizResult(true)}
                        disabled={Object.keys(quizAnswers).length < constitutionQuestions.length}
                        className="w-full"
                      >
                        View My Constitution
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-card rounded-lg p-6 border border-primary/20">
                      {(() => {
                        const result = calculateConstitution();
                        const info = getConstitutionInfo(result);
                        return (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <CheckCircle className="w-8 h-8 text-primary" />
                              <div>
                                <h3 className="font-serif text-xl font-semibold text-foreground">{info.title}</h3>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4">{info.description}</p>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Recommendations:</h4>
                              <ul className="space-y-1">
                                {info.recommendations.map((rec, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setShowQuizResult(false);
                                setQuizAnswers({});
                              }}
                              className="mt-4"
                            >
                              Retake Assessment
                            </Button>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </section>

                {/* TCM Herbs */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Major TCM Herbs</h2>
                      <p className="text-sm text-muted-foreground">Classical Chinese Materia Medica</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {majorHerbs.map((herb) => (
                      <Link
                        key={herb.name}
                        to={herb.link}
                        className="p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all group"
                      >
                        <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {herb.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{herb.category}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link 
                      to="/compounds" 
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      View All Compounds <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </section>

                {/* Treatment Modalities */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">TCM Treatment Methods</h2>
                      <p className="text-sm text-muted-foreground">The Eight Branches of Chinese Medicine</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: "Acupuncture (針灸)", desc: "Insertion of fine needles at specific points to regulate Qi flow through meridians" },
                      { name: "Herbal Medicine (中藥)", desc: "Complex formulas combining multiple herbs tailored to individual patterns" },
                      { name: "Tui Na Massage (推拿)", desc: "Therapeutic massage techniques to move Qi and Blood, relieve tension" },
                      { name: "Moxibustion (艾灸)", desc: "Burning of mugwort to warm acupoints and strengthen Yang energy" },
                      { name: "Cupping (拔罐)", desc: "Suction cups to release stagnation, improve blood flow, and expel pathogens" },
                      { name: "Dietary Therapy (食療)", desc: "Using food energetics to balance constitution and treat disharmony" },
                      { name: "Qi Gong (氣功)", desc: "Movement, breathing, and meditation practices to cultivate and balance Qi" },
                      { name: "Tai Chi (太極)", desc: "Moving meditation combining martial arts with Qi cultivation principles" },
                    ].map((method) => (
                      <div key={method.name} className="p-3 rounded-lg bg-secondary/20 border border-border">
                        <h3 className="font-medium text-foreground text-sm mb-1">{method.name}</h3>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <RightSidebar variant="split" relatedCategory="tcm" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TCM;
