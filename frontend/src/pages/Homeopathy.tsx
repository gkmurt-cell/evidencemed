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
  Droplets, 
  Sparkles,
  Scale,
  BookOpen,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  FlaskConical,
  Heart,
  Brain,
  Moon,
  Sun,
  Flame,
  Wind,
  Mountain
} from "lucide-react";

// Homeopathic Principles
const homeopathicPrinciples = [
  {
    id: "similia",
    name: "Law of Similars (Similia Similibus Curentur)",
    description: "'Like cures like' - A substance that causes symptoms in a healthy person can cure similar symptoms in a sick person.",
    example: "Allium cepa (onion) causes watery eyes and runny nose; in homeopathic form, it treats colds with those symptoms.",
    icon: Scale
  },
  {
    id: "minimum",
    name: "Law of Minimum Dose",
    description: "The smallest possible dose should be used to stimulate healing. More diluted remedies are often considered more potent.",
    example: "Potencies range from low (6C, 30C) for acute conditions to high (200C, 1M) for deep constitutional treatment.",
    icon: Droplets
  },
  {
    id: "single",
    name: "Single Remedy",
    description: "Classical homeopathy uses one remedy at a time, carefully selected to match the totality of symptoms.",
    example: "The 'similimum' - the one remedy that best matches all physical, mental, and emotional symptoms.",
    icon: Sparkles
  },
  {
    id: "proving",
    name: "Proving (Homeopathic Pathogenetic Trial)",
    description: "Remedies are tested on healthy volunteers to determine what symptoms they produce, creating the remedy picture.",
    example: "Hahnemann conducted the first proving with Cinchona bark (Quinine), leading to his discovery of homeopathy.",
    icon: FlaskConical
  },
  {
    id: "vital",
    name: "Vital Force",
    description: "The body has an animating vital force that maintains health. Disease represents a disturbance of this force.",
    example: "Homeopathic remedies are believed to work energetically on the vital force rather than biochemically.",
    icon: Sparkles
  }
];

// Potency Scales
const potencyScales = [
  { 
    scale: "X (Decimal)", 
    dilution: "1:10", 
    description: "Lower potencies, more material doses. Often used for tissue salts and acute conditions.",
    examples: ["6X", "12X", "30X"]
  },
  { 
    scale: "C (Centesimal)", 
    dilution: "1:100", 
    description: "Most common scale. Medium potencies for acute, higher for chronic and constitutional.",
    examples: ["6C", "30C", "200C", "1M"]
  },
  { 
    scale: "LM/Q (Quinquagintamillesimal)", 
    dilution: "1:50,000", 
    description: "Gentlest potencies, developed by Hahnemann later. Used for sensitive patients.",
    examples: ["LM1", "LM6", "LM12"]
  }
];

// Constitutional Types (simplified)
const constitutionalTypes = [
  {
    remedy: "Calcarea Carbonica",
    type: "The Reliable Worker",
    physical: "Tendency to weight gain, cold hands/feet, sweating especially head at night",
    mental: "Practical, methodical, stubborn, fear of heights, worry about security",
    worse: "Cold, damp, exertion, full moon",
    better: "Dry weather, lying on painful side"
  },
  {
    remedy: "Lycopodium",
    type: "The Achiever",
    physical: "Digestive issues, bloating, right-sided symptoms, thinning hair",
    mental: "Intellectual but insecure, fear of failure, anticipatory anxiety, bossy at home",
    worse: "4-8pm, warm rooms, tight clothing",
    better: "Warm drinks, motion, cool air"
  },
  {
    remedy: "Natrum Muriaticum",
    type: "The Reserved One",
    physical: "Headaches, cold sores, craves salt, dryness of mucous membranes",
    mental: "Reserved, holds grudges, dwells on past grief, dislikes consolation",
    worse: "Sun, heat, 10am, sympathy",
    better: "Open air, cold bathing, tight clothing"
  },
  {
    remedy: "Phosphorus",
    type: "The Sensitive Soul",
    physical: "Tall/thin, bleeds easily, burning pains, thirst for cold drinks",
    mental: "Open, sympathetic, fears (thunderstorms, dark), easily exhausted by others",
    worse: "Evening, weather changes, alone",
    better: "Sleep, cold food, company"
  },
  {
    remedy: "Sulphur",
    type: "The Philosopher",
    physical: "Hot, burning sensations, skin issues, offensive discharges",
    mental: "Intellectual, philosophical, messy, selfish, critical",
    worse: "Heat, bathing, standing, 11am",
    better: "Dry warm weather, lying on right side"
  },
  {
    remedy: "Pulsatilla",
    type: "The Gentle Wind",
    physical: "Changeable symptoms, thick yellow discharges, hormonal issues",
    mental: "Weepy, clingy, desires company, mild and yielding, changeable moods",
    worse: "Heat, rich food, evening",
    better: "Open air, gentle motion, cold"
  }
];

// Common Acute Remedies
const acuteRemedies = [
  { name: "Arnica montana", use: "Trauma, bruising, shock, surgery recovery", keynote: "Says 'I'm fine' when clearly not" },
  { name: "Aconitum napellus", use: "Sudden onset after cold/fright, high fever, panic", keynote: "Fear of death, restlessness" },
  { name: "Belladonna", use: "Sudden high fever, throbbing headache, redness", keynote: "Hot, red, dry, delirious" },
  { name: "Bryonia alba", use: "Flu with body aches, dry cough, headache", keynote: "Worse from any motion" },
  { name: "Nux vomica", use: "Digestive upset, hangover, overindulgence", keynote: "Irritable, chilly, oversensitive" },
  { name: "Chamomilla", use: "Teething, colic, extreme irritability", keynote: "Nothing pleases, wants to be carried" },
  { name: "Apis mellifica", use: "Stinging pains, swelling, allergic reactions", keynote: "Better cold, worse heat" },
  { name: "Rhus toxicodendron", use: "Stiff joints, restlessness, skin rashes", keynote: "Better motion after initial stiffness" }
];

// Remedy Finder Quiz
const remedyQuestions = [
  {
    id: 1,
    question: "What is your general temperature preference?",
    options: [
      { value: "hot", label: "I run hot, seek cool air and cold drinks" },
      { value: "cold", label: "I'm often chilly, love warmth" },
      { value: "variable", label: "It changes - sometimes hot, sometimes cold" }
    ]
  },
  {
    id: 2,
    question: "How do you respond emotionally to stress?",
    options: [
      { value: "anxious", label: "Anxiety, worry, restlessness" },
      { value: "withdrawn", label: "Withdraw, want to be alone, suppress feelings" },
      { value: "emotional", label: "Become weepy, want comfort and company" }
    ]
  },
  {
    id: 3,
    question: "What is your energy pattern?",
    options: [
      { value: "morning", label: "Better in morning, fade by evening" },
      { value: "evening", label: "Slow starter, better later in day" },
      { value: "variable", label: "Energy comes and goes unpredictably" }
    ]
  },
  {
    id: 4,
    question: "How do you handle consolation when upset?",
    options: [
      { value: "wants", label: "Desire sympathy and comfort" },
      { value: "averse", label: "Dislike consolation, prefer to be left alone" },
      { value: "indifferent", label: "Don't mind either way" }
    ]
  }
];

const Homeopathy = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleQuizAnswer = (questionId: number, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Homeopathy | Law of Similars & Constitutional Medicine | EvidenceMed</title>
        <meta 
          name="description" 
          content="Explore Homeopathy: the Law of Similars, potency scales, constitutional types, and common remedies. Educational resource on this 200+ year old healing system." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-blue-500/5 via-violet-500/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-700 border-blue-500/20">
                  Founded 1796 by Samuel Hahnemann
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Homeopathy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  A system of medicine based on the principle that "like cures like" - substances that cause symptoms 
                  in healthy people can, in minute doses, treat similar symptoms in the sick.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto mb-6">
                  Homeopathy treats the whole person - physical, mental, and emotional - using highly diluted 
                  preparations called remedies to stimulate the body's vital force and self-healing ability.
                </p>
                <EducationalDisclaimer />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                
                {/* Core Principles */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Scale className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Core Principles</h2>
                      <p className="text-sm text-muted-foreground">The foundations of homeopathic theory</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {homeopathicPrinciples.map((principle) => {
                      const IconComponent = principle.icon;
                      return (
                        <button
                          key={principle.id}
                          onClick={() => setSelectedPrinciple(selectedPrinciple === principle.id ? null : principle.id)}
                          className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                            selectedPrinciple === principle.id 
                              ? 'bg-blue-500/10 border-blue-500/30 shadow-md' 
                              : 'bg-secondary/30 border-border hover:border-blue-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-blue-600 shrink-0" />
                            <p className="font-medium text-foreground">{principle.name}</p>
                          </div>
                          {selectedPrinciple === principle.id && (
                            <div className="mt-3 pl-8">
                              <p className="text-sm text-muted-foreground mb-2">{principle.description}</p>
                              <p className="text-xs text-blue-600"><strong>Example:</strong> {principle.example}</p>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Potency Scales */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Potency Scales</h2>
                      <p className="text-sm text-muted-foreground">Understanding homeopathic dilutions</p>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-amber-700">Note:</strong> Homeopathic remedies are prepared through serial dilution and succussion (vigorous shaking). 
                      Beyond Avogadro's number (approximately 12C), no molecules of the original substance remain - homeopaths believe the remedy retains an energetic imprint.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {potencyScales.map((scale) => (
                      <div key={scale.scale} className="p-4 rounded-lg bg-secondary/20 border border-border">
                        <h3 className="font-semibold text-foreground mb-1">{scale.scale}</h3>
                        <p className="text-xs text-primary mb-2">Dilution: {scale.dilution}</p>
                        <p className="text-xs text-muted-foreground mb-2">{scale.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {scale.examples.map((ex) => (
                            <Badge key={ex} variant="outline" className="text-[10px]">{ex}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Constitutional Types */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Constitutional Types</h2>
                      <p className="text-sm text-muted-foreground">Remedy pictures and archetypes</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Constitutional prescribing matches a remedy to the whole person - their physical traits, temperament, and patterns. 
                    These are simplified archetypes; real prescribing requires careful case-taking.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {constitutionalTypes.map((type) => (
                      <button
                        key={type.remedy}
                        onClick={() => setSelectedType(selectedType === type.remedy ? null : type.remedy)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedType === type.remedy 
                            ? 'bg-rose-500/10 border-rose-500/30' 
                            : 'bg-secondary/30 border-border hover:border-rose-500/30'
                        }`}
                      >
                        <p className="font-medium text-foreground text-sm">{type.remedy}</p>
                        <p className="text-xs text-muted-foreground">{type.type}</p>
                      </button>
                    ))}
                  </div>

                  {selectedType && (
                    <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
                      {(() => {
                        const type = constitutionalTypes.find(t => t.remedy === selectedType);
                        if (!type) return null;
                        return (
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">{type.remedy} - "{type.type}"</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><strong className="text-foreground">Physical:</strong> <span className="text-muted-foreground">{type.physical}</span></p>
                                <p><strong className="text-foreground">Mental/Emotional:</strong> <span className="text-muted-foreground">{type.mental}</span></p>
                              </div>
                              <div>
                                <p><strong className="text-foreground">Worse from:</strong> <span className="text-muted-foreground">{type.worse}</span></p>
                                <p><strong className="text-foreground">Better from:</strong> <span className="text-muted-foreground">{type.better}</span></p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </section>

                {/* Acute Remedies */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Common Acute Remedies</h2>
                      <p className="text-sm text-muted-foreground">First-aid homeopathy essentials</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {acuteRemedies.map((remedy) => (
                      <div key={remedy.name} className="p-3 rounded-lg bg-secondary/20 border border-border">
                        <p className="font-medium text-foreground text-sm">{remedy.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{remedy.use}</p>
                        <p className="text-xs text-amber-600"><strong>Keynote:</strong> {remedy.keynote}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Remedy Finder Quiz */}
                <section className="bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Constitutional Indicator</h2>
                      <p className="text-sm text-muted-foreground">Explore your constitutional tendencies</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-amber-700">Important:</strong> This is for educational purposes only. 
                      Homeopathic constitutional treatment requires detailed case-taking by a trained homeopath. 
                      Self-prescribing constitutional remedies is not recommended.
                    </p>
                  </div>

                  {!showQuizResult ? (
                    <div className="space-y-6">
                      {remedyQuestions.map((q) => (
                        <div key={q.id} className="bg-card rounded-lg p-4 border border-border">
                          <p className="font-medium text-foreground mb-3">{q.id}. {q.question}</p>
                          <RadioGroup
                            value={quizAnswers[q.id] || ""}
                            onValueChange={(value) => handleQuizAnswer(q.id, value)}
                          >
                            {q.options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`hq${q.id}-${option.value}`} />
                                <Label htmlFor={`hq${q.id}-${option.value}`} className="text-sm text-muted-foreground cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => setShowQuizResult(true)}
                        disabled={Object.keys(quizAnswers).length < remedyQuestions.length}
                        className="w-full"
                      >
                        See Indications <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-card rounded-lg p-6 border border-primary/20">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Possible Constitutional Directions</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Based on your responses, you may want to explore remedies associated with:
                      </p>
                      <ul className="space-y-2 mb-4">
                        {quizAnswers[1] === "hot" && (
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span><strong>Sulphur, Phosphorus, Pulsatilla</strong> - tend to be warm-blooded types</span>
                          </li>
                        )}
                        {quizAnswers[1] === "cold" && (
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span><strong>Calcarea, Arsenicum, Silica</strong> - tend to be chilly types</span>
                          </li>
                        )}
                        {quizAnswers[2] === "emotional" && (
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span><strong>Pulsatilla, Phosphorus, Ignatia</strong> - emotional, desire company</span>
                          </li>
                        )}
                        {quizAnswers[2] === "withdrawn" && (
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span><strong>Natrum mur, Sepia, Staphysagria</strong> - tend to withdraw, suppress</span>
                          </li>
                        )}
                        {quizAnswers[4] === "averse" && (
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span><strong>Natrum mur, Sepia</strong> - classically averse to consolation</span>
                          </li>
                        )}
                      </ul>
                      <p className="text-xs text-muted-foreground mb-4">
                        This is a very simplified indication. Constitutional prescribing requires much more detailed information 
                        about your symptoms, modalities, mental state, and life history.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }}
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  )}
                </section>

                {/* Disclaimer */}
                <section className="bg-muted/30 border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    Scientific Context
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Homeopathy remains controversial in mainstream medicine. While it has a 200+ year history and millions of users worldwide, 
                    its mechanisms are not explained by current scientific understanding. Most clinical trials have not found effects beyond placebo, 
                    though proponents cite positive outcomes and the need for different research methodologies. 
                    This page is for educational purposes about homeopathic theory and practice, not an endorsement of efficacy claims.
                  </p>
                </section>

              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <RightSidebar variant="split" relatedCategory="homeopathy" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Homeopathy;
