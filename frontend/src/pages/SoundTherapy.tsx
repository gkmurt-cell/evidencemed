import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Badge } from "@/components/ui/badge";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Music,
  Waves,
  Mic,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Circle,
  Radio
} from "lucide-react";

// Sound Healing Modalities
const soundModalities = [
  {
    id: "singing-bowls",
    name: "Singing Bowls",
    icon: Circle,
    color: "bg-amber-500",
    description: "Metal or crystal bowls that produce resonant tones when struck or rimmed with a mallet.",
    types: [
      { name: "Tibetan Singing Bowls", material: "Metal alloy (7 metals)", sound: "Rich, complex overtones", tradition: "Himalayan Buddhist" },
      { name: "Crystal Singing Bowls", material: "Quartz crystal", sound: "Pure, sustained tones", tradition: "Modern therapeutic" },
      { name: "Alchemy Crystal Bowls", material: "Crystal + gemstones/metals", sound: "Layered frequencies", tradition: "Contemporary" }
    ],
    mechanisms: ["Entrainment of brainwaves", "Vibrational massage of cells", "Relaxation response activation", "Meditative state induction"],
    applications: ["Meditation", "Stress reduction", "Pain management", "Chakra balancing", "Sound baths"]
  },
  {
    id: "tuning-forks",
    name: "Tuning Forks",
    icon: Radio,
    color: "bg-blue-500",
    description: "Precision-tuned metal forks that emit specific frequencies when struck.",
    types: [
      { name: "Weighted Tuning Forks", use: "Body application", frequencies: "Various (128Hz common)", effect: "Vibrational on tissue" },
      { name: "Unweighted Tuning Forks", use: "Energy field work", frequencies: "Various", effect: "Auditory and energetic" },
      { name: "Solfeggio Frequencies", use: "Specific healing frequencies", frequencies: "174, 285, 396, 417, 528, 639, 741, 852, 963 Hz", effect: "Various claimed benefits" },
      { name: "Planetary Frequencies", use: "Cosmic attunement", frequencies: "Based on orbital calculations", effect: "Archetypal resonance" }
    ],
    mechanisms: ["Sympathetic resonance", "Nervous system regulation", "Acupoint stimulation", "Bone conduction"],
    applications: ["Acupuncture enhancement", "Pain points", "Energy balancing", "Meditation", "Sound therapy sessions"]
  },
  {
    id: "gong",
    name: "Gong Therapy",
    icon: Circle,
    color: "bg-violet-500",
    description: "Large percussion instruments producing powerful, complex waveforms for deep transformation.",
    types: [
      { name: "Symphonic Gongs", size: "20-40+ inches", sound: "Full spectrum, building waves", use: "Sound baths, meditation" },
      { name: "Planet Gongs", size: "Various", sound: "Tuned to planetary frequencies", use: "Specific therapeutic work" },
      { name: "Wind Gongs", size: "Various", sound: "Quick attack, shimmering", use: "Accents, clearing" },
      { name: "Chau Gongs", size: "Various", sound: "Dark, powerful", use: "Deep work, ceremonies" }
    ],
    mechanisms: ["Whole-body vibration", "Altered states induction", "Emotional release", "Deep relaxation"],
    applications: ["Gong baths", "Kundalini yoga", "Trauma release", "Meditation", "Transformational work"]
  },
  {
    id: "voice",
    name: "Voice & Toning",
    icon: Mic,
    color: "bg-rose-500",
    description: "Using the human voice as a healing instrument through various techniques.",
    types: [
      { name: "Toning", description: "Sustained vowel sounds", technique: "Single notes held with intention", effect: "Self-regulation, resonance" },
      { name: "Overtone Singing", description: "Producing multiple notes simultaneously", technique: "Throat/Tuvan singing", effect: "Deep meditative states" },
      { name: "Mantras", description: "Sacred syllables or phrases", technique: "Repetitive chanting", effect: "Focus, spiritual connection" },
      { name: "Sound Codes", description: "Channeled vocal expressions", technique: "Intuitive sounding", effect: "Energy work, clearing" }
    ],
    mechanisms: ["Vagus nerve stimulation", "Breath regulation", "Vibrational self-massage", "Intention setting"],
    applications: ["Self-healing", "Group ceremonies", "Meditation", "Emotional release", "Energy clearing"]
  },
  {
    id: "binaural",
    name: "Binaural Beats & Brainwave Entrainment",
    icon: Brain,
    color: "bg-emerald-500",
    description: "Audio technology using frequency differences to influence brainwave states.",
    types: [
      { name: "Binaural Beats", description: "Two slightly different frequencies in each ear", target: "Various brainwave states", delivery: "Headphones required" },
      { name: "Isochronic Tones", description: "Evenly spaced tone pulses", target: "Brainwave entrainment", delivery: "No headphones needed" },
      { name: "Monaural Beats", description: "Pre-mixed beating tones", target: "Brainwave states", delivery: "Speakers or headphones" }
    ],
    brainwaves: [
      { name: "Delta (0.5-4 Hz)", state: "Deep sleep, healing", applications: "Sleep, recovery" },
      { name: "Theta (4-8 Hz)", state: "Deep relaxation, meditation", applications: "Creativity, hypnosis" },
      { name: "Alpha (8-14 Hz)", state: "Relaxed awareness", applications: "Calm focus, learning" },
      { name: "Beta (14-30 Hz)", state: "Active thinking", applications: "Concentration, alertness" },
      { name: "Gamma (30+ Hz)", state: "Peak performance, insight", applications: "Cognition, perception" }
    ],
    applications: ["Meditation support", "Sleep improvement", "Focus enhancement", "Stress reduction", "Altered states"]
  },
  {
    id: "music-therapy",
    name: "Clinical Music Therapy",
    icon: Music,
    color: "bg-teal-500",
    description: "Evidence-based use of music interventions by credentialed professionals to address therapeutic goals.",
    types: [
      { name: "Receptive", description: "Listening to music", techniques: "Music-assisted relaxation, song analysis", applications: "Anxiety, pain, processing" },
      { name: "Re-creative", description: "Reproducing existing music", techniques: "Singing, instrument playing", applications: "Motor skills, expression" },
      { name: "Improvisational", description: "Spontaneous music creation", techniques: "Free improvisation, structured improv", applications: "Expression, relationship" },
      { name: "Compositional", description: "Creating original music", techniques: "Songwriting, notation", applications: "Processing, legacy" }
    ],
    settings: ["Hospitals", "Mental health", "Schools", "Hospice", "Rehabilitation", "Private practice"],
    credentials: "Board Certified Music Therapist (MT-BC) - requires degree + internship + exam"
  }
];

// Research Evidence
const researchEvidence = [
  { area: "Stress & Anxiety", evidence: "Moderate-Strong", findings: "Multiple studies show reduced cortisol, heart rate, blood pressure with receptive music/sound" },
  { area: "Pain Management", evidence: "Moderate", findings: "Music therapy reduces pain perception and analgesic requirements in various settings" },
  { area: "Neurological Rehabilitation", evidence: "Strong", findings: "Neurologic Music Therapy (NMT) effective for stroke, Parkinson's, TBI recovery" },
  { area: "Mental Health", evidence: "Moderate-Strong", findings: "Music therapy beneficial for depression, anxiety, PTSD, autism, dementia" },
  { area: "Neonatal Care", evidence: "Strong", findings: "Live music therapy improves feeding, sleep, vital signs in NICU" },
  { area: "Brainwave Entrainment", evidence: "Emerging", findings: "Some studies show EEG changes with binaural beats; more research needed" },
  { area: "Singing Bowls", evidence: "Limited-Emerging", findings: "Preliminary studies show relaxation effects; mechanisms under investigation" }
];

// Frequencies Guide
const frequencyGuide = [
  { frequency: "40 Hz", name: "Gamma", associations: "Cognition, memory, Alzheimer's research", notes: "MIT research on gamma entrainment" },
  { frequency: "174 Hz", name: "Solfeggio", associations: "Pain reduction, foundation", notes: "Part of Solfeggio scale" },
  { frequency: "285 Hz", name: "Solfeggio", associations: "Tissue healing, energy", notes: "Part of Solfeggio scale" },
  { frequency: "396 Hz", name: "Solfeggio - UT", associations: "Liberation from fear/guilt", notes: "Root chakra association" },
  { frequency: "417 Hz", name: "Solfeggio - RE", associations: "Facilitating change", notes: "Sacral chakra association" },
  { frequency: "432 Hz", name: "Verdi Pitch", associations: "Natural tuning, harmony", notes: "Alternative to 440 Hz standard" },
  { frequency: "528 Hz", name: "Solfeggio - MI", associations: "DNA repair, transformation", notes: "Called 'Love frequency'" },
  { frequency: "639 Hz", name: "Solfeggio - FA", associations: "Relationships, connection", notes: "Heart chakra association" },
  { frequency: "741 Hz", name: "Solfeggio - SOL", associations: "Expression, solutions", notes: "Throat chakra association" },
  { frequency: "852 Hz", name: "Solfeggio - LA", associations: "Intuition, spiritual order", notes: "Third eye association" },
  { frequency: "963 Hz", name: "Solfeggio - SI", associations: "Divine connection, unity", notes: "Crown chakra association" }
];

const SoundTherapy = () => {
  const [selectedModality, setSelectedModality] = useState<string>("singing-bowls");
  const activeModality = soundModalities.find(m => m.id === selectedModality);

  return (
    <>
      <Helmet>
        <title>Sound & Vibrational Therapy - Singing Bowls, Music Therapy | EvidenceMed</title>
        <meta name="description" content="Comprehensive guide to sound healing including singing bowls, tuning forks, gong therapy, music therapy, and brainwave entrainment. Explore the science of vibrational medicine." />
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
                  Vibrational Medicine
                </Badge>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Sound & Vibrational Therapy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Explore the healing power of sound—from ancient instruments to modern brainwave 
                  technology. Discover how vibration, frequency, and rhythm influence body, mind, and spirit.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Frequency Healing</Badge>
                  <Badge variant="outline">Sound Baths</Badge>
                  <Badge variant="outline">Music Therapy</Badge>
                  <Badge variant="outline">Entrainment</Badge>
                </div>
              </div>

              <EducationalDisclaimer />

              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-violet-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Waves className="w-6 h-6 text-violet-600" />
                    The Science of Sound Healing
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Sound therapy</strong> uses vibration and frequency 
                      to influence physical and mental states. From the rhythmic drumming of shamanic traditions 
                      to modern neurologic music therapy, sound has been recognized across cultures as a powerful 
                      healing tool.
                    </p>
                    <p>
                      Sound affects us through multiple mechanisms: <strong className="text-foreground">entrainment</strong> (synchronization 
                      of biological rhythms to external rhythms), <strong className="text-foreground">resonance</strong> (amplification 
                      of natural frequencies), and <strong className="text-foreground">vagal stimulation</strong> (activation of the 
                      parasympathetic nervous system through auditory pathways).
                    </p>
                    <p>
                      Modern research is validating many traditional practices while developing new 
                      applications in clinical settings, from NICU to palliative care.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sound Modalities */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Music className="w-6 h-6 text-violet-600" />
                  Sound Healing Modalities
                </h2>

                {/* Modality Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {soundModalities.map((modality) => {
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
                        <p className="text-sm text-muted-foreground">{activeModality.description}</p>
                      </div>
                    </div>

                    {/* Types/Varieties */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Types & Varieties</h4>
                      <div className="grid gap-3">
                        {activeModality.types.map((type, i) => (
                          <div key={i} className="bg-secondary/30 rounded-lg p-3">
                            <p className="font-medium text-foreground">{type.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {type.description || type.material || type.use || type.size}
                              {type.sound && ` • ${type.sound}`}
                              {type.frequencies && ` • ${type.frequencies}`}
                              {type.technique && ` • ${type.technique}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mechanisms */}
                    {activeModality.mechanisms && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">How It Works</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeModality.mechanisms.map((mech, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{mech}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Brainwaves (for binaural section) */}
                    {activeModality.brainwaves && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Brainwave States</h4>
                        <div className="grid gap-2">
                          {activeModality.brainwaves.map((wave, i) => (
                            <div key={i} className="bg-secondary/30 rounded-lg p-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium text-foreground text-sm">{wave.name}</p>
                                <p className="text-xs text-muted-foreground">{wave.state}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">{wave.applications}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Applications */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeModality.applications.map((app, i) => (
                          <Badge key={i} className="bg-violet-500/10 text-violet-700 border-violet-500/20">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Credentials (for music therapy) */}
                    {activeModality.credentials && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-violet-600">
                          <span className="font-medium">Professional Credential:</span> {activeModality.credentials}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Frequency Guide */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Radio className="w-6 h-6 text-violet-600" />
                  Frequency Reference Guide
                </h2>
                <p className="text-muted-foreground mb-6">
                  Various frequencies are associated with specific effects in sound healing traditions. 
                  While scientific evidence varies, these are commonly referenced in practice.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Frequency</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Name/System</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Associations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frequencyGuide.map((freq, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 text-sm font-medium text-foreground">{freq.frequency}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{freq.name}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{freq.associations}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> The Solfeggio frequencies and many specific frequency claims 
                    lack robust scientific evidence. Effects may be due to general relaxation rather 
                    than specific frequencies. Use discernment and prioritize what feels beneficial.
                  </p>
                </div>
              </section>

              {/* Research Evidence */}
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-violet-600" />
                  Research & Evidence
                </h2>

                <div className="space-y-4">
                  {researchEvidence.map((item, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-foreground">{item.area}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`shrink-0 text-xs ${
                            item.evidence.includes('Strong') 
                              ? 'bg-green-500/10 text-green-700' 
                              : item.evidence.includes('Moderate')
                                ? 'bg-amber-500/10 text-amber-700'
                                : 'bg-gray-500/10 text-gray-700'
                          }`}
                        >
                          {item.evidence}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.findings}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Getting Started */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-violet-500/20">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Experiencing Sound Therapy
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Getting Started</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Attend a local sound bath or gong meditation
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Try binaural beats apps (Headspace, Brain.fm)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Explore singing bowl recordings on YouTube
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Practice simple toning or humming
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">For Specific Needs</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Clinical needs: Seek board-certified music therapist (MT-BC)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Neurological: Look for Neurologic Music Therapy
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Trauma: Consider Guided Imagery and Music (GIM)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          Spiritual: Explore practitioner-led sound journeys
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
                    className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Integrative Therapies
                  </Link>
                  <Link 
                    to="/energy-healing"
                    className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
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

export default SoundTherapy;
