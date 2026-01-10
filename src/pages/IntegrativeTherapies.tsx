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
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Tree visualization categories
const therapyCategories = [
  { id: "energetic", name: "Energetic", icon: Zap, color: "bg-violet-500", description: "Energy-based healing modalities" },
  { id: "herbal", name: "Herbal", icon: Leaf, color: "bg-emerald-500", description: "Plant-based remedies" },
  { id: "bodywork", name: "Bodywork", icon: Hand, color: "bg-amber-500", description: "Physical manipulation therapies" },
  { id: "vitamins", name: "Vitamins", icon: Pill, color: "bg-blue-500", description: "Nutritional supplementation" },
  { id: "repurposed", name: "Repurposed Drugs", icon: Heart, color: "bg-rose-500", description: "Off-label pharmaceutical uses" },
  { id: "psychotherapy", name: "Psychotherapy", icon: Brain, color: "bg-teal-500", description: "Mind-body approaches" },
];

// Modalities list with detailed descriptions
const modalities = [
  {
    name: "Accelerated Resolution Therapy (ART)",
    description: "An evidence-based psychotherapy developed in 2008 that combines rapid eye movements with image rescripting to help clients process trauma in 1-5 sessions. Uses voluntary image replacement (VIR) to help clients replace distressing traumatic images with positive ones while retaining factual memory.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/art-accelerated-resolution-therapy"
  },
  {
    name: "Acupuncture",
    description: "A 3,500 year old healing art from China using ultra-fine, sterile needles to unblock areas where Qi (energy) has become blocked. It boosts the body's Qi and bodily fluids when depleted, and re-establishes their smooth and healthy flow through specific acupuncture points on energy channels.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/acupuncture"
  },
  {
    name: "Akashic Records",
    description: "A fifth dimensional information mega-library that catalogs every choice our souls have ever made. The wisdom contained in this cosmic database can help understand how to change circumstances and create the lives we truly want to live, understanding patterns of choice we've been engaging.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/akashic-records"
  },
  {
    name: "Alexander Technique",
    description: "A process of self-discovery that allows coordination of mind and body to re-learn movement. Classes teach students to become aware of their own movement tendencies, how to release unnecessary tension, and how to consciously make new choices to create more flow and ease of movement.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/alexander-technique"
  },
  {
    name: "Art Therapy",
    description: "Assists individuals in creating art as a visualization and meditation tool — to direct and focus thoughts, goals and feelings into the desired direction. No prior artistic skills needed. Uses flowing artistic colors, mixed media, and eclectic materials to create meaningful items aligned with personal goals.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/art-therapy"
  },
  {
    name: "Auricular Acupuncture",
    description: "Also known as Ear Acupuncture, an ancient treatment with extensive research supporting its effect. A deeply relaxing and safe treatment applied to specific points on the ear. Highly effective for stress, anxiety, and feelings of well-being by stimulating the body's natural endorphins.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/auricular-acupuncture"
  },
  {
    name: "Ayurveda Wellness Consultations",
    description: "The science of life and the language of alignment. This holistic framework brings true health and wellness through simple changes in daily living practices including herbs, healing food, harmony of seasons, minerals, oil, detoxification, yoga, meditation and daily regimen.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/ayurvedic-medicine"
  },
  {
    name: "Biophoton Therapy (Biontology)",
    description: "Uses the Chiren® instrument developed by Johan Boswinkel to measure where biophotons are emitting chaotic light. The instrument inverts your biophotons to neutralize any disturbing signals, allowing the body to restore its own self-healing system.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/biophoton-therapy-biontology"
  },
  {
    name: "Brennan Healing Science",
    description: "An enlightening system combining hands-on healing techniques with spiritual and psychological processes. Developed by Dr. Barbara Brennan, former NASA physicist, this four-year trained practice touches every aspect of life and works with the human energy field for transformation.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/brennan-healing-science"
  },
  {
    name: "Chiropractic",
    description: "A healthcare discipline emphasizing the body's instinctive power to heal itself without drugs or surgery. Focuses on diagnosis, treatment, and prevention of mechanical disorders of the musculoskeletal system and their effects on the nervous system through manual treatments including spinal adjustment.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/chiropractic"
  },
  {
    name: "Colon Hydrotherapy",
    description: "A therapeutic procedure involving flushing the colon with warm, purified water to remove waste and toxins. Promotes digestive health, improves bowel functions, and enhances overall well-being. Assists with conditions like constipation, bloating, and fatigue.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/colon-hydrotherapy"
  },
  {
    name: "Craniosacral Therapy",
    description: "Gently works with the spine, skull, cranial sutures, diaphragms, and fascia to ease restrictions of nerve passages and harmonize cerebrospinal fluid movement. Helps realign musculoskeletal structures and alleviates headaches, TMJ, fibromyalgia, and mental stress.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/craniosacral-therapy"
  },
  {
    name: "Energetic Chiropractic",
    description: "Addresses the accumulated stress factors that limit our ability to adapt successfully. Works with muscle contraction, holds, imbalance and other compromises to well-being caused by excessive stress through energetic approaches to spinal care.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/energetic-chiropractic"
  },
  {
    name: "Feldenkrais",
    description: "Named after Dr. Moshe Feldenkrais, a physicist and judo expert who developed therapeutic movement after a knee injury. Uses somatic education with movement and real-time body awareness to stimulate neuroplasticity and create new neural pathways for optimal movement patterns.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/feldenkrais"
  },
  {
    name: "Flower Essence Therapy",
    description: "Vibrational plant medicine that supports positive shifts and changes, bringing greater health, happiness and well-being. Sessions explore current challenges and growth areas, then create special flower essence formulas to support your unique healing journey.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/flower-essence-therapy"
  },
  {
    name: "Health Coaching",
    description: "Uses a combination of current health metrics, genetics, testing, detoxification, energy work, and mind-body healing to create a roadmap for health unique to each client. Specializes in chronic illness, Lyme, thyroid issues, and cancer prevention.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/health-coaching"
  },
  {
    name: "Herbal Health Consultation",
    description: "Examines how lifestyle, diet and thought patterns affect health, then discovers which plant allies can support the natural process of healing. Addresses sleep, energy, anxiety, digestion, brain function through herbal remedies and natural approaches.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/herbal-health-consultation"
  },
  {
    name: "Holistic Medicine",
    description: "A form of healing that considers the whole person — body, mind, spirit, and emotions — in the quest for optimal health and wellness. May use all forms of health care, from conventional medication to alternative therapies.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/holistic-medicine"
  },
  {
    name: "Holistic Optometry",
    description: "Treats the cause of visual problems rather than just symptoms. Through exercises and activities, patients strengthen their visual system to address difficulty concentrating, headaches, double vision, and attention problems for improved visual functioning.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/holistic-optometry"
  },
  {
    name: "Homeopathic Inquiry",
    description: "Part of Integral Homeopathics in-take process focusing on particular symptoms or states of mind, following the expression from its beginning. Helps understand what symptoms are expressing on a deeper level.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/homeopathy"
  },
  {
    name: "Hypnotherapy/Past Life Regression",
    description: "Accesses deeper consciousness levels where memories are stored without time boundaries. Past life memories can affect present experiences, and this therapy helps process and integrate these influences for current healing and transformation.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/hypnotherapypast-life-regression-therapy"
  },
  {
    name: "IET: Integrated Energy Therapy",
    description: "Reconnects the mind, body, and soul to restore natural equilibrium. With the aid of healing angels, therapists channel universal divine energy to remove obstructions and repair the crucial internal life force that powers our bodies, emotions, and existence.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/iet-integrated-energy-therapy"
  },
  {
    name: "Jin Shin Jyutsu",
    description: "An ancient oriental Art of harmonizing life energy within the body, said to predate Buddha and Moses. Rediscovered in the early 1900's by Master Jiro Murai. A physio-philosophy using application of hands for gently balancing the flow of life energy.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/jin-shin-jyutsu"
  },
  {
    name: "Jyorei",
    description: "A spiritual healing practice meaning 'purification of the spirit'. Founded by Meishusama (Mokichi Okada), it focuses spiritual light on impurities or clouds within the spiritual world, dissolving them to relieve physical, emotional and personal distress.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/jyorei"
  },
  {
    name: "Lightfield",
    description: "Science-based technologies from the Lightfield Foundation that allow you to enter an effortless, instant state of quiet and meditation. Helps relax body and mind so you can start creating the life you want through remote sessions.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/lightfield"
  },
  {
    name: "Marma Therapy",
    description: "An ancient Ayurvedic practice from India working with 117 Marma points connected to different energy pathways. Similar to Acupuncture but without needles, using pressure, vibration and herbal oils to open blocked energy pathways.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/marma-therapy"
  },
  {
    name: "Massage",
    description: "A method of manipulating soft tissues for restoration of function and release of tension. Holistically affects all body systems — muscular, skeletal, digestive, elimination, respiratory, circulatory, lymphatic, endocrine, emotional, mental, and nervous systems.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/massage"
  },
  {
    name: "Matrix Energetics",
    description: "A 'Consciousness Technology' developed by Dr. Richard Bartlett, rooted in quantum physics. Helps bypass habitual limited perceptions to access the Zero Point Field — the field of pure potential and realm of all possibility at the subatomic level.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/matrix-energetics"
  },
  {
    name: "MediSounds®",
    description: "Based on the Tree of Life from the Kabbalah. The energies (Sefirot) constitute our human makeup and are a blueprint for the energies of this world. Understanding and using these powers improves physical, emotional, and spiritual circumstances.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/medisounds%C2%AE"
  },
  {
    name: "One Light Healing Touch",
    description: "A safe, non-invasive healing intervention caring for the whole person — body, mind and spirit. Induces changes in the human energy system affecting physical, emotional, mental and spiritual health and well-being.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/one-light-healing-touch"
  },
  {
    name: "Psychotherapy/Art Therapy",
    description: "Helps clients with a broad spectrum of mental and emotional difficulties. Eliminates or manages difficulties to help clients live better lives, increase well-being and healing through therapeutic conversation and creative expression.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/psychotherapy-art-therapy"
  },
  {
    name: "Reconnective Healing",
    description: "Developed by Dr. Eric Pearl, this new form of healing reconnects us to the fullness of the universe and ourselves at the highest levels. Works through a new bandwidth of light and information for deep, permanent healing and transformation.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/reconnective-healing"
  },
  {
    name: "Reflexology",
    description: "A natural healing art based on the principle that reflex points on the feet and hands correspond to every body part. Pressure application on particular areas serves to relax tension, improve circulation and promote natural function of related body areas.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/reflexology"
  },
  {
    name: "Reiki",
    description: "A Japanese form of light touch healing that moves energy blocks and nourishes the whole being. Useful for stress reduction, releasing energy stagnation, enhancing immune function, physical healing and mental clarity. Simple, gentle, and complements other modalities.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/reiki"
  },
  {
    name: "Rubenfeld Synergy®",
    description: "A holistic fusion of touch, talk, and compassionate listening fostering connection between body, mind, emotions and spirit. Based on awareness of body messages through curious inquiry, with little experiments of movement or imagery for self-discovery.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/rubenfeld-synergy%C2%AE"
  },
  {
    name: "Soma Veda Thai Yoga",
    description: "An ancient comprehensive healing art from Thailand bringing balance to body, mind and spirit. The practitioner moves the receiver into yoga-based poses while they remain relaxed, using pressure, energy, attention and breath to open energy channels.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/soma-veda-thai-yoga"
  },
  {
    name: "Spinal Balancing",
    description: "Blends Applied Kinesiology with other modalities for dynamic functional neuro-muscular examination and treatment. Uses muscle testing and balancing techniques to assess and treat musculoskeletal and visceral organ systems.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/spinal-balancing"
  },
  {
    name: "Thai Massage",
    description: "Traditional healing combining acupressure, Indian Ayurvedic principles, and assisted yoga postures. For thousands of years used to treat ailments and maintain wellness through acupressure, stretching, conscious breathing, range of motion, and energy work.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/thai-massage"
  },
  {
    name: "Thai Yoga Bodywork",
    description: "A gentle form of assisted yoga consisting of postural release, stretching, rhythmic rocking along energy lines and pressure points, focused breathing, meditation, and somatic movement re-patterning for whole body-mind healing.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/thai-yoga-bodywork"
  },
  {
    name: "Vibrational Attunement: Tuning Forks",
    description: "Like adjusting a piano, tuning forks can achieve optimal physical, emotional, mental, and spiritual balance. Biosonics tuning forks tuned to sacred proportions affect the body almost instantaneously, altering biochemistry to bring the body back to its fundamental pulse.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/vibrational-attunement-tuning-forks-for-human-tuning"
  },
  {
    name: "Yoga Therapy",
    description: "Uses yoga postures, breathing exercises, meditation, and guided imagery to improve mental and physical health. The holistic focus encourages integration of mind, body, and spirit for comprehensive wellness.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/yoga-therapy"
  },
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
  const [isModalitiesOpen, setIsModalitiesOpen] = useState(false);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);

  const handleModalityClick = (modality: string) => {
    setSelectedModality(selectedModality === modality ? null : modality);
  };

  const getModalityData = (name: string) => {
    return modalities.find(m => m.name === name);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      energetic: "border-l-violet-500",
      herbal: "border-l-emerald-500",
      bodywork: "border-l-amber-500",
      psychotherapy: "border-l-teal-500",
      vitamins: "border-l-blue-500",
      repurposed: "border-l-rose-500",
    };
    return colors[category] || "border-l-primary";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      energetic: "Energetic",
      herbal: "Herbal",
      bodywork: "Bodywork",
      psychotherapy: "Mind-Body",
      vitamins: "Vitamins",
      repurposed: "Repurposed",
    };
    return labels[category] || category;
  };

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

          {/* Modalities Collapsible Tile */}
          <section className="py-6 lg:py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  {/* Collapsible Header */}
                  <button
                    onClick={() => setIsModalitiesOpen(!isModalitiesOpen)}
                    className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                          Modalities
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {modalities.length} integrative healing practices
                        </p>
                      </div>
                    </div>
                    {isModalitiesOpen ? (
                      <ChevronUp className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  {/* Collapsible Content */}
                  {isModalitiesOpen && (
                    <div className="border-t border-border">
                      <ScrollArea className="h-96">
                        <div className="p-4 space-y-2">
                          {modalities.map((modality) => (
                            <div key={modality.name}>
                              <button
                                onClick={() => handleModalityClick(modality.name)}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                  selectedModality === modality.name
                                    ? 'bg-primary/10 border-primary/30 shadow-md'
                                    : 'bg-secondary/30 border-border hover:bg-secondary/50 hover:border-primary/20'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-foreground">{modality.name}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground`}>
                                    {getCategoryLabel(modality.category)}
                                  </span>
                                </div>
                              </button>
                              {selectedModality === modality.name && (
                                <div className={`mt-2 ml-4 p-4 bg-secondary/20 rounded-lg border-l-4 ${getCategoryColor(modality.category)}`}>
                                  <p className="text-sm text-foreground leading-relaxed mb-3">
                                    {modality.description}
                                  </p>
                                  <a 
                                    href={modality.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                                  >
                                    Learn more & find practitioners <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
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
                            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                              <FileText className="w-3 h-3" />
                              {treatment.studies} studies
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {treatment.description}
                          </p>
                          
                          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2">Implementation</h4>
                            <p className="text-sm text-muted-foreground">
                              {treatment.implementation}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {treatment.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Herbal Section Placeholder */}
              <section id="herbal" className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                          Herbal Medicine
                        </h2>
                        <p className="text-muted-foreground">Plant-based remedies and natural therapies</p>
                      </div>
                    </div>
                    <div className="p-8 rounded-xl bg-card border border-border text-center">
                      <p className="text-muted-foreground">
                        Detailed herbal medicine content coming soon. This section will cover traditional herbalism, 
                        modern phytotherapy, and evidence-based botanical treatments.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bodywork Section Placeholder */}
              <section id="bodywork" className="py-12 lg:py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                        <Hand className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                          Bodywork Therapies
                        </h2>
                        <p className="text-muted-foreground">Physical manipulation and movement therapies</p>
                      </div>
                    </div>
                    <div className="p-8 rounded-xl bg-card border border-border text-center">
                      <p className="text-muted-foreground">
                        Detailed bodywork content coming soon. This section will cover massage, chiropractic, 
                        craniosacral therapy, and other physical modalities.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Resources Section */}
              <section className="py-12 lg:py-16 bg-primary/5">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
                      Research Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <a
                        href="https://www.ncbi.nlm.nih.gov/pmc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all group"
                      >
                        <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium text-foreground mb-2">PubMed Central</h3>
                        <p className="text-sm text-muted-foreground">Free access to biomedical and life sciences research articles.</p>
                      </a>
                      <a
                        href="https://nccih.nih.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all group"
                      >
                        <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium text-foreground mb-2">NCCIH</h3>
                        <p className="text-sm text-muted-foreground">National Center for Complementary and Integrative Health research.</p>
                      </a>
                      <a
                        href="https://holistichealthcommunity.org/services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all group"
                      >
                        <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium text-foreground mb-2">Holistic Health Community</h3>
                        <p className="text-sm text-muted-foreground">Find practitioners and detailed modality information.</p>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Right Sidebar */}
            <RightSidebar />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default IntegrativeTherapies;
