import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Leaf, 
  Hand, 
  Pill, 
  Brain, 
  Heart,
  Waves,
  ExternalLink,
  BookOpen,
  FileText
} from "lucide-react";

// Tree visualization categories
const therapyCategories = [
  { id: "energetic", name: "Energetic", icon: Zap, color: "bg-violet-500", description: "Energy-based healing modalities" },
  { id: "herbal", name: "Herbal", icon: Leaf, color: "bg-emerald-500", description: "Plant-based remedies" },
  { id: "bodywork", name: "Bodywork", icon: Hand, color: "bg-amber-500", description: "Physical manipulation therapies" },
  { id: "vitamins", name: "Vitamins", icon: Pill, color: "bg-blue-500", description: "Nutritional supplementation" },
  { id: "repurposed", name: "Repurposed Drugs", icon: Heart, color: "bg-rose-500", description: "Off-label pharmaceutical uses" },
  { id: "psychotherapy", name: "Psychotherapy", icon: Brain, color: "bg-teal-500", description: "Mind-body approaches" },
];

// Modalities list
const modalities = [
  "Accelerated Resolution Therapy (ART)",
  "Acupuncture",
  "Akashic Records",
  "Alexander Technique",
  "Art Therapy",
  "Auricular Acupuncture",
  "Ayurveda Wellness Consultations",
  "Biophoton Therapy (Biontology)",
  "Brennan Healing Science",
  "Chiropractic",
  "Colon Hydrotherapy",
  "Craniosacral Therapy",
  "Energetic Chiropractic",
  "Feldenkrais",
  "Flower Essence Therapy",
  "Health Coaching",
  "Herbal Health Consultation",
  "Holistic Medicine",
  "Holistic Optometry",
  "Homeopathic Inquiry",
  "Hypnotherapy/Past Life Regression",
  "IET: Integrated Energy Therapy",
  "Jin Shin Jyutsu",
  "Jyorei",
  "Lightfield",
  "Marma Therapy",
  "Massage",
  "Matrix Energetics",
  "MediSounds®",
  "One Light Healing Touch",
  "Psychotherapy/Art Therapy",
  "Reconnective Healing",
  "Reflexology",
  "Reiki",
  "Rubenfeld Synergy®",
  "Soma Veda Thai Yoga",
  "Spinal Balancing",
  "Thai Massage",
  "Thai Yoga Bodywork",
  "Vibrational Attunement: Tuning Forks",
  "Yoga Therapy",
];

// Energetic treatments list
const energeticTreatments = [
  {
    name: "Rife Therapy",
    description: "Uses specific electromagnetic frequencies to target pathogens. Developed by Royal Raymond Rife in the 1930s, modern devices emit frequencies believed to resonate with and destroy harmful microorganisms.",
    implementation: "Sessions typically last 30-60 minutes using a Rife machine that emits programmed frequencies through plasma tubes or handheld electrodes.",
    studies: 3,
    tags: ["frequency", "electromagnetic", "non-invasive"],
  },
  {
    name: "Bio-Frequency Devices",
    description: "Electronic devices that emit specific frequencies to support cellular health and balance the body's bioelectric field. Includes PEMF (Pulsed Electromagnetic Field) therapy devices.",
    implementation: "Daily sessions of 15-30 minutes using mats, pads, or localized applicators. Frequency programs vary based on condition.",
    studies: 12,
    tags: ["PEMF", "cellular", "electromagnetic"],
  },
  {
    name: "Med Beds",
    description: "Advanced healing technology combining multiple modalities including frequency therapy, plasma energy, and quantum healing principles for whole-body regeneration.",
    implementation: "Sessions in specialized facilities with trained practitioners. Duration varies from 30 minutes to several hours.",
    studies: 0,
    tags: ["emerging", "regenerative", "quantum"],
  },
  {
    name: "Reiki",
    description: "Japanese energy healing technique where practitioners channel universal life force energy through their hands to promote healing and balance in the recipient's energy field.",
    implementation: "Sessions last 45-90 minutes. Recipient lies clothed on a table while practitioner places hands on or near the body.",
    studies: 28,
    tags: ["hands-on", "japanese", "spiritual"],
  },
  {
    name: "Kinesiology",
    description: "Uses muscle testing to identify imbalances in the body's structural, chemical, and emotional systems. Applied kinesiology helps determine appropriate treatments.",
    implementation: "Practitioner tests muscle response to various stimuli to identify issues and guide treatment protocols.",
    studies: 15,
    tags: ["muscle-testing", "diagnostic", "holistic"],
  },
  {
    name: "Quantum Bio-Energetics",
    description: "Combines quantum physics principles with bioenergetic medicine to address health at the subatomic level, working with the body's quantum field.",
    implementation: "Sessions may include device-assisted scanning and treatment, meditation, and practitioner-guided protocols.",
    studies: 4,
    tags: ["quantum", "bioenergetic", "advanced"],
  },
  {
    name: "Field Work",
    description: "Works with the body's electromagnetic and morphogenetic fields to restore coherence and promote healing through various energetic techniques.",
    implementation: "Practitioner uses various techniques to assess and balance the body's energy fields, often combining multiple modalities.",
    studies: 6,
    tags: ["morphogenetic", "coherence", "holistic"],
  },
  {
    name: "TFT (Thought Field Therapy)",
    description: "Tapping therapy that targets specific meridian points while focusing on traumatic memories or negative emotions to resolve psychological disturbances.",
    implementation: "Client focuses on issue while practitioner guides them through specific tapping sequences on acupressure points.",
    studies: 18,
    tags: ["tapping", "meridian", "psychological"],
  },
  {
    name: "Matrix Energetics",
    description: "Consciousness-based healing system that uses light touch and focused intent to collapse limiting belief patterns and transform the body's energy matrix.",
    implementation: "Practitioner uses two-point technique and intention to shift client's energy state. Sessions are typically 30-60 minutes.",
    studies: 2,
    tags: ["consciousness", "transformation", "two-point"],
  },
  {
    name: "Spinal Flow",
    description: "Gentle technique working with the spine and nervous system to release stored tension and trauma, promoting natural healing responses.",
    implementation: "Light touches along the spine help identify and release blockages. Regular sessions recommended for best results.",
    studies: 5,
    tags: ["spinal", "gentle", "nervous-system"],
  },
  {
    name: "Acupuncture",
    description: "Ancient Chinese medicine practice inserting thin needles at specific points along meridians to balance qi (life force) and promote healing.",
    implementation: "Licensed practitioner inserts sterile needles at strategic points. Sessions last 30-60 minutes with needles in place for 15-30 minutes.",
    studies: 450,
    tags: ["traditional", "meridian", "needle"],
  },
];

const IntegrativeTherapies = () => {
  return (
    <>
      <Helmet>
        <title>Integrative Therapies | EvidenceMed - Research-Based Alternative Medicine</title>
        <meta 
          name="description" 
          content="Explore integrative therapies including energetic treatments, herbal medicine, bodywork, and more. Evidence-based information on Rife, Reiki, Acupuncture, and other modalities." 
        />
        <meta name="keywords" content="integrative therapies, Rife therapy, Reiki, acupuncture, energy healing, PEMF, kinesiology, quantum healing" />
        <link rel="canonical" href="https://evidencemed.com/integrative-therapies" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Integrative Medicine
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Explore Integrative Therapies
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  Discover the research behind complementary and alternative healing modalities. 
                  From ancient practices to emerging technologies.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  Stanford University maintains an integrative medicine arm within its research and development sciences, 
                  validating the growing academic interest in these emerging technologies.
                </p>
              </div>
            </div>
          </section>

          {/* Modalities Section */}
          <section className="py-8 lg:py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
                  Modalities
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Explore our comprehensive directory of integrative healing modalities. Click on any modality to learn more.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {modalities.map((modality) => (
                    <a
                      key={modality}
                      href="#energetic"
                      className="group p-4 rounded-lg bg-card border border-border shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer text-center"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {modality}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tree Visualization Section */}
          <section className="py-6 lg:py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
                  Types of Integrative Medicine
                </h2>
                
                {/* Static Tree Diagram */}
                <div className="relative">
                  {/* Central Node */}
                  <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <div className="text-center text-primary-foreground">
                        <Waves className="w-8 h-8 mx-auto mb-1" />
                        <span className="text-xs font-medium">Integrative<br/>Medicine</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting Lines SVG */}
                  <svg className="absolute top-32 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 pointer-events-none" viewBox="0 0 800 100">
                    <path d="M400 0 L100 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L233 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L366 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L433 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L566 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L700 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                  </svg>
                  
                  {/* Category Nodes */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
                    {therapyCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.id}`}
                        className="group flex flex-col items-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-medium transition-all"
                      >
                        <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <category.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-medium text-foreground text-sm text-center">{category.name}</span>
                        <span className="text-xs text-muted-foreground text-center mt-1">{category.description}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content with Sidebar */}
          <div className="flex">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Energetic Treatments Section */}
              <section id="energetic" className="py-12 lg:py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                          Energetic Treatments
                        </h2>
                        <p className="text-muted-foreground">Energy-based healing modalities</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {energeticTreatments.map((treatment) => (
                        <div
                          key={treatment.name}
                          className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {treatment.name}
                            </h3>
                            <div className="flex items-center gap-2 shrink-0">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm text-primary font-medium">
                                {treatment.studies} studies
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {treatment.description}
                          </p>
                          
                          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              How It's Implemented
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {treatment.implementation}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {treatment.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {treatment.studies > 0 && (
                            <Button variant="outline" size="sm" className="mt-4">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Research
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Coming Soon sections for other categories */}
              <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                      More Categories Coming Soon
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {therapyCategories.filter(c => c.id !== "energetic").map((category) => (
                        <div
                          key={category.id}
                          id={category.id}
                          className="p-6 rounded-xl bg-card border border-border opacity-75"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}>
                              <category.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{category.name}</h3>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <Footer />
            </main>
            
            {/* Right Sidebar with Maps placeholder */}
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
              <RightSidebar variant="split" relatedCategory="energetic" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrativeTherapies;
