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
  Droplets, 
  Sun,
  Apple,
  Heart,
  Brain,
  Activity,
  Zap,
  Shield,
  Wind,
  Flame,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TreePine,
  CircleDot
} from "lucide-react";

// Six Principles of Naturopathic Medicine
const sixPrinciples = [
  {
    id: "vis",
    latin: "Vis Medicatrix Naturae",
    name: "The Healing Power of Nature",
    icon: TreePine,
    color: "bg-emerald-500",
    description: "The body has an inherent ability to establish, maintain, and restore health. The physician's role is to facilitate and augment this process.",
    application: "Support the body's self-healing mechanisms rather than suppress symptoms."
  },
  {
    id: "primum",
    latin: "Primum Non Nocere",
    name: "First Do No Harm",
    icon: Shield,
    color: "bg-blue-500",
    description: "Utilize methods and substances that minimize risk of harmful side effects. Avoid suppression of symptoms when possible.",
    application: "Use the least force necessary to diagnose and treat; prefer gentler interventions first."
  },
  {
    id: "tolle",
    latin: "Tolle Causam",
    name: "Identify and Treat the Cause",
    icon: CircleDot,
    color: "bg-violet-500",
    description: "Seek to identify and remove the underlying causes of disease rather than merely eliminating or suppressing symptoms.",
    application: "Look beyond symptoms to address root causes - physical, mental, emotional, or spiritual."
  },
  {
    id: "docere",
    latin: "Docere",
    name: "Doctor as Teacher",
    icon: BookOpen,
    color: "bg-amber-500",
    description: "Educate patients and encourage self-responsibility for health. The physician-patient relationship is essential to healing.",
    application: "Empower patients with knowledge to take control of their own health journey."
  },
  {
    id: "tolle-totum",
    latin: "Tolle Totum",
    name: "Treat the Whole Person",
    icon: Heart,
    color: "bg-rose-500",
    description: "Health and disease result from a complex interaction of physical, mental, emotional, genetic, environmental, and social factors.",
    application: "Address all aspects of the person - body, mind, and spirit - in treatment plans."
  },
  {
    id: "prevention",
    latin: "Praevenire",
    name: "Prevention",
    icon: Activity,
    color: "bg-teal-500",
    description: "Emphasize prevention of disease through assessing risk factors and hereditary susceptibility, and making appropriate interventions.",
    application: "Focus on building health and preventing disease rather than just treating illness."
  }
];

// Therapeutic Modalities
const therapeuticModalities = [
  {
    name: "Clinical Nutrition",
    icon: Apple,
    description: "Using food as medicine - dietary interventions, therapeutic diets, and nutritional supplementation based on individual needs.",
    examples: ["Elimination diets", "Anti-inflammatory protocols", "Nutrient therapy", "Functional foods"]
  },
  {
    name: "Botanical Medicine",
    icon: Leaf,
    description: "Plant-based medicines including teas, tinctures, capsules, and topical preparations using whole plant or standardized extracts.",
    examples: ["Western herbalism", "Eclectic tradition", "Standardized extracts", "Traditional formulas"]
  },
  {
    name: "Hydrotherapy",
    icon: Droplets,
    description: "Therapeutic use of water in various forms and temperatures to stimulate circulation, immunity, and healing.",
    examples: ["Constitutional hydrotherapy", "Contrast showers", "Sitz baths", "Wet sheet wraps"]
  },
  {
    name: "Physical Medicine",
    icon: Activity,
    description: "Hands-on therapies including massage, manipulation, and other bodywork techniques to address structural issues.",
    examples: ["Naturopathic manipulation", "Soft tissue work", "Craniosacral therapy", "Exercise prescription"]
  },
  {
    name: "Homeopathy",
    icon: Sparkles,
    description: "Use of highly diluted substances based on the principle of 'like cures like' to stimulate the body's vital force.",
    examples: ["Constitutional prescribing", "Acute remedies", "Combination remedies", "Cell salts"],
    link: "/homeopathy"
  },
  {
    name: "Counseling & Mind-Body",
    icon: Brain,
    description: "Addressing mental and emotional aspects of health through counseling, stress management, and mind-body techniques.",
    examples: ["Health coaching", "Stress reduction", "Meditation guidance", "Lifestyle counseling"]
  }
];

// Therapeutic Order (Hierarchy)
const therapeuticOrder = [
  { level: 1, name: "Establish the Conditions for Health", description: "Remove obstacles to cure, address lifestyle factors" },
  { level: 2, name: "Stimulate the Self-Healing Mechanisms", description: "Hydrotherapy, homeopathy, acupuncture" },
  { level: 3, name: "Support Weakened Systems", description: "Botanical medicine, nutritional supplementation" },
  { level: 4, name: "Correct Structural Integrity", description: "Physical medicine, manipulation" },
  { level: 5, name: "Address Pathology", description: "Specific natural substances for disease processes" },
  { level: 6, name: "Suppress Pathology", description: "Pharmaceutical drugs, surgery - when necessary" },
];

// Key Naturopathic Herbs
const keyHerbs = [
  { name: "Echinacea", use: "Immune support", link: "/compound/echinacea" },
  { name: "St. John's Wort", use: "Mood support", link: "/compound/st-johns-wort" },
  { name: "Milk Thistle", use: "Liver support", link: "/compound/milk-thistle" },
  { name: "Valerian", use: "Sleep & relaxation", link: "/compound/valerian" },
  { name: "Ginkgo Biloba", use: "Cognitive support", link: "/compound/ginkgo-biloba" },
  { name: "Saw Palmetto", use: "Prostate health", link: "/compound/saw-palmetto" },
  { name: "Black Cohosh", use: "Women's health", link: "/compound/black-cohosh" },
  { name: "Hawthorn", use: "Heart health", link: "/compound/hawthorn" },
];

// Vitality Assessment
const vitalityQuestions = [
  {
    id: 1,
    question: "How would you rate your overall energy levels?",
    options: [
      { value: "low", label: "Often fatigued, need stimulants to function" },
      { value: "moderate", label: "Variable energy, afternoon slumps common" },
      { value: "high", label: "Generally good, sustained throughout day" }
    ]
  },
  {
    id: 2,
    question: "How is your digestive function?",
    options: [
      { value: "poor", label: "Frequent bloating, irregularity, discomfort" },
      { value: "moderate", label: "Occasional issues, sensitive to some foods" },
      { value: "good", label: "Regular, comfortable, minimal issues" }
    ]
  },
  {
    id: 3,
    question: "How do you handle stress?",
    options: [
      { value: "poor", label: "Easily overwhelmed, physical symptoms from stress" },
      { value: "moderate", label: "Manage okay but notice impacts on health" },
      { value: "good", label: "Resilient, recover quickly, good coping strategies" }
    ]
  },
  {
    id: 4,
    question: "How is your sleep quality?",
    options: [
      { value: "poor", label: "Difficulty sleeping, unrefreshed upon waking" },
      { value: "moderate", label: "Generally okay but room for improvement" },
      { value: "good", label: "Fall asleep easily, wake refreshed" }
    ]
  },
  {
    id: 5,
    question: "How often do you get sick?",
    options: [
      { value: "often", label: "Multiple times per year, slow recovery" },
      { value: "sometimes", label: "A few times yearly, average recovery" },
      { value: "rarely", label: "Seldom ill, quick recovery when sick" }
    ]
  }
];

const Naturopathy = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleQuizAnswer = (questionId: number, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateVitality = () => {
    const scores: Record<string, number> = { low: 0, moderate: 1, high: 2, poor: 0, good: 2, often: 0, sometimes: 1, rarely: 2 };
    let total = 0;
    Object.values(quizAnswers).forEach(answer => {
      total += scores[answer] || 1;
    });
    const avg = total / Object.keys(quizAnswers).length;
    if (avg < 0.8) return "low";
    if (avg < 1.5) return "moderate";
    return "high";
  };

  const getVitalityInfo = (level: string) => {
    const info: Record<string, { title: string; description: string; focus: string[] }> = {
      low: {
        title: "Building Vitality Priority",
        description: "Your vitality may benefit from foundational support. Focus on establishing conditions for health first.",
        focus: ["Address sleep quality", "Optimize digestion", "Stress management techniques", "Gentle movement", "Nutrient-dense whole foods"]
      },
      moderate: {
        title: "Strengthening Vitality",
        description: "You have a foundation to build upon. Focus on strengthening weak areas while maintaining what's working.",
        focus: ["Targeted botanical support", "Constitutional hydrotherapy", "Stress resilience building", "Exercise progression", "Preventive strategies"]
      },
      high: {
        title: "Maintaining Vitality",
        description: "Your vitality is strong. Focus on prevention, optimization, and maintaining your health gains.",
        focus: ["Prevention protocols", "Performance optimization", "Longevity strategies", "Continued healthy habits", "Periodic detoxification"]
      }
    };
    return info[level] || info.moderate;
  };

  return (
    <>
      <Helmet>
        <title>Naturopathic Medicine | Six Principles & Natural Healing | EvidenceMed</title>
        <meta 
          name="description" 
          content="Explore Naturopathic Medicine: the six healing principles, therapeutic order, botanical medicine, clinical nutrition, and hydrotherapy. Evidence-based natural medicine education." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-emerald-500/5 via-teal-500/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                  Licensed Profession Since 1900s
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Naturopathic Medicine
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  A distinct system of primary care emphasizing prevention, treatment, and optimal health through 
                  the use of therapeutic methods and substances that encourage the body's inherent self-healing process.
                </p>
                <EducationalDisclaimer />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                
                {/* Six Principles */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <TreePine className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Six Principles of Naturopathic Medicine</h2>
                      <p className="text-sm text-muted-foreground">The philosophical foundation</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {sixPrinciples.map((principle) => {
                      const IconComponent = principle.icon;
                      return (
                        <button
                          key={principle.id}
                          onClick={() => setSelectedPrinciple(selectedPrinciple === principle.id ? null : principle.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                            selectedPrinciple === principle.id 
                              ? 'bg-emerald-500/10 border-emerald-500/30 shadow-md' 
                              : 'bg-secondary/30 border-border hover:border-emerald-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-lg ${principle.color}/10 flex items-center justify-center`}>
                              <IconComponent className={`w-4 h-4 ${principle.color.replace('bg-', 'text-')}`} />
                            </div>
                            <p className="text-xs font-medium text-muted-foreground italic">{principle.latin}</p>
                          </div>
                          <p className="font-medium text-foreground text-sm">{principle.name}</p>
                        </button>
                      );
                    })}
                  </div>

                  {selectedPrinciple && (
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      {(() => {
                        const principle = sixPrinciples.find(p => p.id === selectedPrinciple);
                        if (!principle) return null;
                        return (
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{principle.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{principle.description}</p>
                            <p className="text-sm"><strong className="text-foreground">In Practice:</strong> <span className="text-muted-foreground">{principle.application}</span></p>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </section>

                {/* Therapeutic Order */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">The Therapeutic Order</h2>
                      <p className="text-sm text-muted-foreground">Hierarchy of healing interventions</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Naturopathic physicians follow a therapeutic order, using the least invasive interventions first before progressing to more forceful treatments when necessary.
                  </p>
                  <div className="space-y-3">
                    {therapeuticOrder.map((item) => (
                      <div key={item.level} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/20">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary">{item.level}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Therapeutic Modalities */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Therapeutic Modalities</h2>
                      <p className="text-sm text-muted-foreground">Tools of the naturopathic physician</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {therapeuticModalities.map((modality) => {
                      const IconComponent = modality.icon;
                      return (
                        <div key={modality.name} className="p-4 rounded-lg bg-secondary/20 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">{modality.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{modality.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {modality.examples.map((ex, i) => (
                              <Badge key={i} variant="outline" className="text-[10px]">{ex}</Badge>
                            ))}
                          </div>
                          {modality.link && (
                            <Link to={modality.link} className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1">
                              Learn more <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Vitality Assessment */}
                <section className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Vitality Assessment</h2>
                      <p className="text-sm text-muted-foreground">Evaluate your vital force</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-amber-700">Note:</strong> This is a simplified educational tool. 
                      A naturopathic physician conducts comprehensive assessments including health history, physical exam, and lab work.
                    </p>
                  </div>

                  {!showQuizResult ? (
                    <div className="space-y-6">
                      {vitalityQuestions.map((q) => (
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
                        disabled={Object.keys(quizAnswers).length < vitalityQuestions.length}
                        className="w-full"
                      >
                        Assess My Vitality <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-card rounded-lg p-6 border border-primary/20">
                      {(() => {
                        const result = calculateVitality();
                        const info = getVitalityInfo(result);
                        return (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <CheckCircle className="w-8 h-8 text-primary" />
                              <h3 className="font-serif text-xl font-semibold text-foreground">{info.title}</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">{info.description}</p>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Recommended Focus Areas:</h4>
                              <ul className="space-y-1">
                                {info.focus.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }}
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

                {/* Key Herbs */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Key Naturopathic Herbs</h2>
                      <p className="text-sm text-muted-foreground">Commonly used botanical medicines</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {keyHerbs.map((herb) => (
                      <Link
                        key={herb.name}
                        to={herb.link}
                        className="p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all group"
                      >
                        <p className="font-medium text-foreground text-sm group-hover:text-primary">{herb.name}</p>
                        <p className="text-xs text-muted-foreground">{herb.use}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link to="/compounds" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                      View All Compounds <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </section>

              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <RightSidebar variant="split" relatedCategory="naturopathy" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Naturopathy;
