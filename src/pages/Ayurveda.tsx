import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Leaf, 
  Sun, 
  Moon, 
  Wind, 
  Droplets, 
  Flame,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

// Dosha quiz questions
const doshaQuestions = [
  {
    id: 1,
    question: "What is your body frame?",
    options: [
      { value: "vata", label: "Thin, light, hard to gain weight" },
      { value: "pitta", label: "Medium, athletic, proportionate" },
      { value: "kapha", label: "Larger, solid, easy to gain weight" }
    ]
  },
  {
    id: 2,
    question: "How is your skin typically?",
    options: [
      { value: "vata", label: "Dry, rough, cool" },
      { value: "pitta", label: "Warm, oily, prone to redness" },
      { value: "kapha", label: "Thick, smooth, cool" }
    ]
  },
  {
    id: 3,
    question: "How do you handle stress?",
    options: [
      { value: "vata", label: "Become anxious and worried" },
      { value: "pitta", label: "Become irritable or angry" },
      { value: "kapha", label: "Withdraw and become quiet" }
    ]
  },
  {
    id: 4,
    question: "What is your sleep pattern?",
    options: [
      { value: "vata", label: "Light sleeper, tend to wake up" },
      { value: "pitta", label: "Moderate, sleep well when relaxed" },
      { value: "kapha", label: "Deep, heavy sleeper" }
    ]
  },
  {
    id: 5,
    question: "How is your digestion?",
    options: [
      { value: "vata", label: "Irregular, variable appetite" },
      { value: "pitta", label: "Strong, can get irritable if hungry" },
      { value: "kapha", label: "Slow but steady, can skip meals" }
    ]
  },
  {
    id: 6,
    question: "What is your energy pattern?",
    options: [
      { value: "vata", label: "Quick bursts, tire easily" },
      { value: "pitta", label: "Moderate, good stamina" },
      { value: "kapha", label: "Slow to start, great endurance" }
    ]
  }
];

// Dosha information
const doshaInfo = {
  vata: {
    name: "Vata",
    elements: "Air & Space",
    icon: Wind,
    color: "bg-sky-500",
    qualities: ["Light", "Dry", "Cold", "Mobile", "Subtle"],
    description: "Vata governs movement and communication in the body. When balanced, Vata types are creative, enthusiastic, and quick-thinking.",
    balancingTips: [
      "Follow a regular daily routine",
      "Favor warm, cooked, nourishing foods",
      "Stay warm and avoid cold, windy weather",
      "Practice calming activities like yoga and meditation",
      "Use warming oils like sesame for self-massage"
    ],
    herbs: ["Ashwagandha", "Brahmi", "Triphala", "Ginger", "Licorice"]
  },
  pitta: {
    name: "Pitta",
    elements: "Fire & Water",
    icon: Flame,
    color: "bg-orange-500",
    qualities: ["Hot", "Sharp", "Light", "Oily", "Spreading"],
    description: "Pitta governs digestion and transformation. When balanced, Pitta types are intelligent, focused, and natural leaders.",
    balancingTips: [
      "Avoid excessive heat and direct sunlight",
      "Favor cooling, sweet, bitter foods",
      "Practice moderation in all activities",
      "Engage in calming, non-competitive exercise",
      "Use cooling oils like coconut for massage"
    ],
    herbs: ["Amalaki", "Shatavari", "Neem", "Turmeric", "Coriander"]
  },
  kapha: {
    name: "Kapha",
    elements: "Earth & Water",
    icon: Droplets,
    color: "bg-emerald-500",
    qualities: ["Heavy", "Slow", "Cold", "Oily", "Stable"],
    description: "Kapha governs structure and lubrication. When balanced, Kapha types are calm, loyal, and supportive.",
    balancingTips: [
      "Stay active with regular vigorous exercise",
      "Favor light, warm, spicy foods",
      "Seek variety and new experiences",
      "Wake early and avoid daytime napping",
      "Use stimulating oils like mustard for massage"
    ],
    herbs: ["Trikatu", "Guggulu", "Punarnava", "Bibhitaki", "Tulsi"]
  }
};

// Ayurvedic principles
const principles = [
  {
    title: "The Five Elements",
    icon: Sparkles,
    description: "Ayurveda recognizes five fundamental elements (Pancha Mahabhutas): Earth, Water, Fire, Air, and Space. These combine to form the three doshas."
  },
  {
    title: "Prakriti (Constitution)",
    icon: Sun,
    description: "Your unique combination of doshas determined at conception. Understanding your prakriti helps customize diet, lifestyle, and treatments."
  },
  {
    title: "Vikriti (Imbalance)",
    icon: Moon,
    description: "Current state of dosha imbalance. Ayurvedic treatment aims to restore balance between vikriti and prakriti."
  },
  {
    title: "Agni (Digestive Fire)",
    icon: Flame,
    description: "The metabolic fire responsible for digestion and transformation. Strong agni is essential for health; weak agni leads to toxin accumulation."
  }
];

// Treatment modalities
const treatments = [
  {
    name: "Panchakarma",
    description: "Five purification therapies to eliminate toxins: Vamana (emesis), Virechana (purgation), Basti (enema), Nasya (nasal), Raktamokshana (bloodletting).",
    duration: "7-21 days"
  },
  {
    name: "Abhyanga",
    description: "Traditional warm oil massage using dosha-specific herbal oils to nourish tissues, calm the nervous system, and promote circulation.",
    duration: "45-60 minutes"
  },
  {
    name: "Shirodhara",
    description: "Continuous stream of warm oil poured on the forehead. Deeply relaxing, beneficial for stress, anxiety, and sleep disorders.",
    duration: "30-45 minutes"
  },
  {
    name: "Nasya",
    description: "Administration of herbal oils through the nasal passages. Clears sinuses, enhances mental clarity, and balances Vata.",
    duration: "15-20 minutes"
  },
  {
    name: "Swedana",
    description: "Herbal steam therapy to open channels, promote sweating, and eliminate toxins through the skin.",
    duration: "15-30 minutes"
  }
];

const Ayurveda = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < doshaQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });
    const dominant = Object.entries(counts).reduce((a, b) => b[1] > a[1] ? b : a);
    setResult(dominant[0]);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const resultDosha = result ? doshaInfo[result as keyof typeof doshaInfo] : null;

  return (
    <>
      <Helmet>
        <title>Ayurveda | Alternative Medicine & Ancient Healing Wisdom | EvidenceMed</title>
        <meta 
          name="description" 
          content="Explore Ayurvedic alternative medicine - discover your dosha, learn about traditional alternative therapy treatments, herbs, and lifestyle practices. A cornerstone of complementary and alternative medicine for holistic health." 
        />
        <meta name="keywords" content="Ayurveda, alternative medicine, alternative therapy, complementary and alternative medicine, dosha, Vata, Pitta, Kapha, Panchakarma, Ayurvedic herbs, holistic health" />
        <link rel="canonical" href="https://evidencemed.com/ayurveda" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-amber-500/10 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
                  5,000 Years of Wisdom
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Ayurveda: The Science of Life
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ancient Indian alternative medicine system focusing on balance, prevention, and individualized 
                  alternative therapy based on your unique constitution. A foundational practice in complementary and alternative medicine.
                </p>
              </div>
            </div>
          </section>

          {/* Content with Sidebar */}
          <div className="flex">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Core Principles */}
              <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8">
                      Core Principles of Ayurveda
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {principles.map((principle) => (
                        <div
                          key={principle.title}
                          className="p-6 rounded-xl bg-card border border-border hover:border-amber-500/30 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                            <principle.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                            {principle.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {principle.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* The Three Doshas */}
              <section className="py-12 lg:py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                      The Three Doshas
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Doshas are the three fundamental energies that govern all biological processes. 
                      Everyone has a unique combination, though one or two usually predominate.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(doshaInfo).map(([key, dosha]) => (
                        <div
                          key={key}
                          className="p-6 rounded-xl bg-card border border-border hover:shadow-medium transition-all"
                        >
                          <div className={`w-14 h-14 rounded-full ${dosha.color} flex items-center justify-center mb-4`}>
                            <dosha.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                            {dosha.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">{dosha.elements}</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {dosha.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {dosha.qualities.slice(0, 3).map((quality) => (
                              <Badge key={quality} variant="secondary" className="text-xs">
                                {quality}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Dosha Quiz */}
              <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        Discover Your Dosha
                      </h2>
                      <p className="text-muted-foreground">
                        Take this quick quiz to understand your dominant dosha and receive personalized recommendations.
                      </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-card border border-border">
                      {!quizStarted && !result && (
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                            <Leaf className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                            Dosha Assessment Quiz
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Answer 6 simple questions to discover your Ayurvedic constitution.
                          </p>
                          <Button onClick={() => setQuizStarted(true)} size="lg">
                            Start Quiz
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}

                      {quizStarted && !result && (
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-sm text-muted-foreground">
                              Question {currentQuestion + 1} of {doshaQuestions.length}
                            </span>
                            <div className="flex gap-1">
                              {doshaQuestions.map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i <= currentQuestion ? "bg-primary" : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                            {doshaQuestions[currentQuestion].question}
                          </h3>

                          <RadioGroup
                            value={answers[currentQuestion] || ""}
                            onValueChange={handleAnswer}
                            className="space-y-3"
                          >
                            {doshaQuestions[currentQuestion].options.map((option) => (
                              <div
                                key={option.value}
                                className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                                  answers[currentQuestion] === option.value
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>

                          <Button
                            onClick={nextQuestion}
                            disabled={!answers[currentQuestion]}
                            className="w-full mt-6"
                          >
                            {currentQuestion < doshaQuestions.length - 1 ? "Next Question" : "See Results"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}

                      {result && resultDosha && (
                        <div>
                          <div className="text-center mb-6">
                            <div className={`w-20 h-20 rounded-full ${resultDosha.color} flex items-center justify-center mx-auto mb-4`}>
                              <resultDosha.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">
                              Your Dominant Dosha: {resultDosha.name}
                            </h3>
                            <p className="text-muted-foreground">{resultDosha.elements}</p>
                          </div>

                          <p className="text-muted-foreground mb-6 text-center">
                            {resultDosha.description}
                          </p>

                          <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-primary" />
                              Balancing Tips for {resultDosha.name}
                            </h4>
                            <ul className="space-y-2">
                              {resultDosha.balancingTips.map((tip, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-foreground mb-3">Recommended Herbs</h4>
                            <div className="flex flex-wrap gap-2">
                              {resultDosha.herbs.map((herb) => (
                                <Badge key={herb} variant="outline">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  {herb}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button onClick={resetQuiz} variant="outline" className="w-full">
                            Retake Quiz
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Treatments */}
              <section className="py-12 lg:py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8">
                      Ayurvedic Treatments
                    </h2>
                    <div className="space-y-4">
                      {treatments.map((treatment) => (
                        <div
                          key={treatment.name}
                          className="p-6 rounded-xl bg-card border border-border hover:border-amber-500/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                                {treatment.name}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {treatment.description}
                              </p>
                            </div>
                            <Badge variant="secondary" className="shrink-0">
                              {treatment.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <Footer />
            </main>
            
            {/* Right Sidebar */}
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
              <RightSidebar variant="split" relatedCategory="ayurveda" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ayurveda;
