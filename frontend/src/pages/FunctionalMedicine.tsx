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
  Activity,
  Network,
  Microscope,
  Brain,
  Heart,
  Flame,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Dna,
  FlaskConical,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Leaf,
  Apple
} from "lucide-react";

// Core Concepts of Functional Medicine
const coreConcepts = [
  {
    id: "systems",
    name: "Systems Biology Approach",
    icon: Network,
    description: "Views the body as an interconnected network of systems rather than separate organs. Dysfunction in one area affects others.",
    keyPoints: ["Web-like interconnections", "Upstream/downstream effects", "Multi-system assessment", "Personalized treatment"]
  },
  {
    id: "root",
    name: "Root Cause Resolution",
    icon: Target,
    description: "Seeks to identify and address the underlying causes of disease rather than simply suppressing symptoms.",
    keyPoints: ["Timeline analysis", "Triggers and mediators", "Antecedents exploration", "Functional testing"]
  },
  {
    id: "patient",
    name: "Patient-Centered Care",
    icon: Heart,
    description: "Partners with patients as active participants in their healing journey, considering their unique story and preferences.",
    keyPoints: ["Detailed health history", "Lifestyle factors", "Patient goals", "Therapeutic partnership"]
  },
  {
    id: "biochemical",
    name: "Biochemical Individuality",
    icon: Dna,
    description: "Recognizes that each person has unique genetic, biochemical, and metabolic characteristics requiring personalized approaches.",
    keyPoints: ["Genetic variations", "Nutrient requirements", "Detox capacity", "Metabolic typing"]
  }
];

// The Functional Medicine Matrix - 7 Core Systems
const functionalSystems = [
  {
    name: "Assimilation",
    description: "Digestion, absorption, microbiome, GI function",
    icon: "🍽️",
    color: "bg-amber-500",
    issues: ["Leaky gut", "Dysbiosis", "SIBO", "Food sensitivities", "Malabsorption"],
    testing: ["Comprehensive stool analysis", "Food sensitivity panels", "Breath tests", "Intestinal permeability"]
  },
  {
    name: "Defense & Repair",
    description: "Immune function, inflammation, infection",
    icon: "🛡️",
    color: "bg-red-500",
    issues: ["Chronic inflammation", "Autoimmunity", "Recurrent infections", "Allergies", "Immune dysregulation"],
    testing: ["Inflammatory markers (CRP, ESR)", "Cytokine panels", "Autoantibodies", "Immune cell function"]
  },
  {
    name: "Energy",
    description: "Mitochondrial function, energy production",
    icon: "⚡",
    color: "bg-yellow-500",
    issues: ["Fatigue", "Mitochondrial dysfunction", "Metabolic syndrome", "Oxidative stress"],
    testing: ["Organic acids", "Mitochondrial function", "CoQ10 levels", "Oxidative stress markers"]
  },
  {
    name: "Biotransformation & Elimination",
    description: "Detoxification, toxin elimination",
    icon: "🔄",
    color: "bg-green-500",
    issues: ["Toxic burden", "Phase I/II imbalance", "Heavy metals", "Chemical sensitivities"],
    testing: ["Liver detox profiles", "Heavy metal testing", "Environmental toxin panels", "Genetic SNPs"]
  },
  {
    name: "Transport",
    description: "Cardiovascular, lymphatic systems",
    icon: "❤️",
    color: "bg-rose-500",
    issues: ["Cardiovascular disease", "Lipid imbalances", "Lymphatic congestion", "Blood sugar dysregulation"],
    testing: ["Advanced lipid panels", "Cardiovascular risk markers", "Homocysteine", "Insulin/glucose"]
  },
  {
    name: "Communication",
    description: "Hormones, neurotransmitters, signaling",
    icon: "📡",
    color: "bg-purple-500",
    issues: ["Hormonal imbalances", "Thyroid dysfunction", "Adrenal fatigue", "Neurotransmitter imbalances"],
    testing: ["Complete thyroid panel", "Sex hormone panels", "Adrenal stress index", "Neurotransmitter testing"]
  },
  {
    name: "Structural Integrity",
    description: "Cellular membranes, musculoskeletal",
    icon: "🦴",
    color: "bg-blue-500",
    issues: ["Membrane dysfunction", "Chronic pain", "Structural imbalances", "Connective tissue issues"],
    testing: ["Fatty acid analysis", "Bone markers", "Mineral status", "Collagen markers"]
  }
];

// Modifiable Lifestyle Factors
const lifestyleFactors = [
  { name: "Sleep & Relaxation", icon: Clock, description: "Quality sleep, stress management, recovery" },
  { name: "Exercise & Movement", icon: Activity, description: "Appropriate physical activity for constitution" },
  { name: "Nutrition", icon: Apple, description: "Whole foods, anti-inflammatory diet, personalized nutrition" },
  { name: "Stress & Resilience", icon: Brain, description: "Mind-body practices, nervous system regulation" },
  { name: "Relationships", icon: Heart, description: "Social connections, community, support systems" },
  { name: "Environment", icon: Leaf, description: "Clean air, water, reducing toxin exposure" }
];

// Common Functional Medicine Tests
const commonTests = [
  { name: "Comprehensive Stool Analysis", purpose: "Gut microbiome, digestion, inflammation markers" },
  { name: "Organic Acids Test (OAT)", purpose: "Metabolic function, nutrient status, mitochondria" },
  { name: "Complete Thyroid Panel", purpose: "TSH, Free T3/T4, antibodies, reverse T3" },
  { name: "Advanced Lipid Panel", purpose: "Particle size, oxidized LDL, Lp(a)" },
  { name: "DUTCH Hormone Test", purpose: "Complete hormone metabolites, adrenal function" },
  { name: "Food Sensitivity Panel", purpose: "IgG/IgA reactions to common foods" },
  { name: "Heavy Metal Testing", purpose: "Toxic metal burden, provoked or unprovoked" },
  { name: "Genetic SNP Testing", purpose: "MTHFR, detox genes, nutrient metabolism" }
];

// Assessment Questions
const assessmentQuestions = [
  {
    id: 1,
    question: "Which system do you feel needs the most attention?",
    options: [
      { value: "gut", label: "Digestive issues (bloating, irregular bowel, food reactions)" },
      { value: "energy", label: "Energy and fatigue (tired, brain fog, crashes)" },
      { value: "hormones", label: "Hormonal (thyroid, adrenal, sex hormones)" },
      { value: "immune", label: "Immune (frequent illness, inflammation, autoimmune concerns)" }
    ]
  },
  {
    id: 2,
    question: "How long have your primary health concerns been present?",
    options: [
      { value: "recent", label: "Less than 6 months" },
      { value: "moderate", label: "6 months to 2 years" },
      { value: "chronic", label: "More than 2 years" }
    ]
  },
  {
    id: 3,
    question: "What lifestyle factor do you find most challenging?",
    options: [
      { value: "sleep", label: "Getting quality sleep" },
      { value: "diet", label: "Maintaining a healthy diet" },
      { value: "stress", label: "Managing stress" },
      { value: "exercise", label: "Regular exercise" }
    ]
  }
];

const FunctionalMedicine = () => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleQuizAnswer = (questionId: number, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Functional Medicine | Systems Biology & Root Cause Resolution | EvidenceMed</title>
        <meta 
          name="description" 
          content="Explore Functional Medicine: systems biology approach, the functional medicine matrix, root cause resolution, and personalized health optimization." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-violet-500/5 via-blue-500/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-700 border-violet-500/20">
                  Evidence-Based Systems Approach
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Functional Medicine
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  A personalized, systems-oriented model that empowers patients and practitioners to achieve the highest 
                  expression of health by addressing the underlying causes of disease.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto mb-6">
                  Functional medicine integrates traditional Western medical practices with integrative medicine, 
                  focusing on prevention through nutrition, diet, and exercise, plus cutting-edge lab testing and prescribed combinations of drugs, 
                  botanical medicines, supplements, therapeutic diets, and stress-management techniques.
                </p>
                <EducationalDisclaimer />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                
                {/* Core Concepts */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Microscope className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Core Concepts</h2>
                      <p className="text-sm text-muted-foreground">Foundational principles of functional medicine</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {coreConcepts.map((concept) => {
                      const IconComponent = concept.icon;
                      return (
                        <div key={concept.id} className="p-4 rounded-lg bg-secondary/20 border border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-5 h-5 text-violet-600" />
                            <h3 className="font-semibold text-foreground">{concept.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{concept.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {concept.keyPoints.map((point, i) => (
                              <Badge key={i} variant="outline" className="text-[10px]">{point}</Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* The Functional Medicine Matrix */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Network className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">The Functional Medicine Matrix</h2>
                      <p className="text-sm text-muted-foreground">Seven core physiological systems</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Functional medicine organizes clinical imbalances into seven interconnected systems. 
                    Dysfunction in any area can affect the others, requiring a comprehensive assessment.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {functionalSystems.map((system) => (
                      <button
                        key={system.name}
                        onClick={() => setSelectedSystem(selectedSystem === system.name ? null : system.name)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedSystem === system.name 
                            ? 'bg-blue-500/10 border-blue-500/30' 
                            : 'bg-secondary/30 border-border hover:border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{system.icon}</span>
                          <p className="font-medium text-foreground text-sm">{system.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{system.description}</p>
                      </button>
                    ))}
                  </div>

                  {selectedSystem && (
                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      {(() => {
                        const system = functionalSystems.find(s => s.name === selectedSystem);
                        if (!system) return null;
                        return (
                          <div>
                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <span className="text-xl">{system.icon}</span> {system.name}
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium text-foreground mb-1">Common Issues:</p>
                                <ul className="text-muted-foreground space-y-1">
                                  {system.issues.map((issue, i) => (
                                    <li key={i} className="flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-blue-500"></span> {issue}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="font-medium text-foreground mb-1">Functional Testing:</p>
                                <ul className="text-muted-foreground space-y-1">
                                  {system.testing.map((test, i) => (
                                    <li key={i} className="flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-violet-500"></span> {test}
                                    </li>
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

                {/* Lifestyle Factors */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Modifiable Lifestyle Factors</h2>
                      <p className="text-sm text-muted-foreground">The foundation of functional medicine treatment</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lifestyleFactors.map((factor) => {
                      const IconComponent = factor.icon;
                      return (
                        <div key={factor.name} className="p-3 rounded-lg bg-secondary/20 border border-border">
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-4 h-4 text-green-600" />
                            <p className="font-medium text-foreground text-sm">{factor.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{factor.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Common Tests */}
                <section className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <FlaskConical className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Common Functional Tests</h2>
                      <p className="text-sm text-muted-foreground">Advanced testing for personalized insights</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {commonTests.map((test) => (
                      <div key={test.name} className="p-3 rounded-lg bg-secondary/20 border border-border">
                        <p className="font-medium text-foreground text-sm">{test.name}</p>
                        <p className="text-xs text-muted-foreground">{test.purpose}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Assessment */}
                <section className="bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Priority Assessment</h2>
                      <p className="text-sm text-muted-foreground">Identify your focus areas</p>
                    </div>
                  </div>

                  {!showQuizResult ? (
                    <div className="space-y-6">
                      {assessmentQuestions.map((q) => (
                        <div key={q.id} className="bg-card rounded-lg p-4 border border-border">
                          <p className="font-medium text-foreground mb-3">{q.id}. {q.question}</p>
                          <RadioGroup
                            value={quizAnswers[q.id] || ""}
                            onValueChange={(value) => handleQuizAnswer(q.id, value)}
                          >
                            {q.options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`fq${q.id}-${option.value}`} />
                                <Label htmlFor={`fq${q.id}-${option.value}`} className="text-sm text-muted-foreground cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => setShowQuizResult(true)}
                        disabled={Object.keys(quizAnswers).length < assessmentQuestions.length}
                        className="w-full"
                      >
                        See Recommendations <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-card rounded-lg p-6 border border-primary/20">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">Your Functional Medicine Focus</h3>
                      </div>
                      <div className="space-y-3">
                        {quizAnswers[1] === "gut" && (
                          <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                            <p className="font-medium text-foreground text-sm">Priority: Gut Health & Assimilation</p>
                            <p className="text-xs text-muted-foreground">Consider: Comprehensive stool analysis, elimination diet, gut healing protocol (4R/5R)</p>
                          </div>
                        )}
                        {quizAnswers[1] === "energy" && (
                          <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                            <p className="font-medium text-foreground text-sm">Priority: Energy & Mitochondrial Function</p>
                            <p className="text-xs text-muted-foreground">Consider: Organic acids test, thyroid panel, mitochondrial support (CoQ10, B vitamins, magnesium)</p>
                          </div>
                        )}
                        {quizAnswers[1] === "hormones" && (
                          <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                            <p className="font-medium text-foreground text-sm">Priority: Hormonal Balance & Communication</p>
                            <p className="text-xs text-muted-foreground">Consider: DUTCH test, complete thyroid panel, adrenal assessment, hormone-supportive lifestyle</p>
                          </div>
                        )}
                        {quizAnswers[1] === "immune" && (
                          <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                            <p className="font-medium text-foreground text-sm">Priority: Immune Function & Defense</p>
                            <p className="text-xs text-muted-foreground">Consider: Inflammatory markers, autoimmune panels, gut assessment (gut-immune connection)</p>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-4">
                          This is a simplified guide. A functional medicine practitioner conducts comprehensive assessments 
                          to create personalized treatment plans addressing your unique biochemistry.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }}
                        className="mt-4"
                      >
                        Retake Assessment
                      </Button>
                    </div>
                  )}
                </section>

              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <RightSidebar variant="split" relatedCategory="functional" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FunctionalMedicine;
