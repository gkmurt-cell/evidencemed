import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Leaf, Brain, Sparkles, Calendar, Quote } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    year: "1973",
    age: "19",
    title: "Became Vegetarian",
    description: "Started my journey away from meat, driven by ethical and health considerations. This single decision shaped the next 52 years of my life.",
    icon: Leaf,
    modality: "Plant-Based Nutrition"
  },
  {
    year: "1980s",
    age: "20s-30s",
    title: "Exploring Eastern Medicine",
    description: "Discovered Traditional Chinese Medicine, acupuncture, and Ayurvedic principles. Began understanding the body as an interconnected system.",
    icon: Sparkles,
    modality: "TCM & Ayurveda"
  },
  {
    year: "1990s",
    age: "30s-40s",
    title: "Mind-Body Connection",
    description: "Deepened practice in meditation, yoga, and breathwork. Experienced firsthand how mental state affects physical health.",
    icon: Brain,
    modality: "Meditation & Yoga"
  },
  {
    year: "2000s",
    age: "40s-50s",
    title: "Functional Medicine Discovery",
    description: "Started following functional medicine practitioners. Learned about root cause analysis and personalized health approaches.",
    icon: Heart,
    modality: "Functional Medicine"
  },
  {
    year: "2010s",
    age: "50s-60s",
    title: "Longevity Research",
    description: "Began studying the emerging science of longevity. Discovered compounds like NMN, NAD+, and the work of researchers like David Sinclair.",
    icon: Calendar,
    modality: "Longevity Science"
  },
  {
    year: "2020s",
    age: "60s-70s",
    title: "Creating EvidenceMed",
    description: "After 50+ years of personal experimentation and research, decided to share this knowledge. Built this platform to help others navigate evidence-based natural health.",
    icon: Sparkles,
    modality: "Knowledge Sharing"
  }
];

const SOCIAL_HOOKS = [
  {
    platform: "YouTube",
    type: "Video Intro Hook",
    script: "I've been vegetarian for 52 years. I'm 71 years old. And I've tried every healing modality you can imagine. Here's what actually works according to the research...",
    duration: "15 sec"
  },
  {
    platform: "TikTok",
    type: "Pattern Interrupt",
    script: "POV: You're 71 but your doctor keeps asking what your secret is. After 52 years of plant-based eating and testing every natural remedy, I finally built the resource I wish existed...",
    duration: "10 sec"
  },
  {
    platform: "Instagram",
    type: "Carousel Hook",
    script: "5 things I learned in 52 years of being vegetarian that doctors won't tell you... (Slide 1: The supplement industry is 90% marketing. Slide 2: Most 'superfoods' have zero clinical evidence...)",
    duration: "Carousel"
  },
  {
    platform: "Pinterest",
    type: "Pin Description",
    script: "Evidence-based natural health from someone who's lived it for 52 years. No gimmicks, no pseudoscience—just research-backed compounds and therapies that actually work. Created by a 71-year-old who's been his own experiment.",
    duration: "Static"
  },
  {
    platform: "YouTube Shorts",
    type: "Credibility Hook",
    script: "I've been vegetarian longer than most of you have been alive. 52 years. Here's the ONE compound that changed everything for me at 70...",
    duration: "8 sec"
  },
  {
    platform: "TikTok",
    type: "Controversy Hook",
    script: "The supplement industry hates this website. Because I actually show you which products have REAL research behind them. 52 years of being my own guinea pig led to this...",
    duration: "12 sec"
  }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - My 52-Year Integrative Medicine Journey | EvidenceMed</title>
        <meta name="description" content="Discover the personal health journey behind IntegrativeEvidence.com. 52 years exploring integrative medicine, complementary therapies, and evidence-based natural healing." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4">My Story</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  52 Years of Being My Own Experiment
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm 71 years old and have been vegetarian since I was 19. Over five decades, 
                  I've explored every alternative medicine and alternative therapy modality imaginable—from ancient 
                  complementary and alternative medicine practices to cutting-edge longevity research. EvidenceMed 
                  is the evidence-based resource I wish existed when I started this journey.
                </p>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto flex items-start gap-4">
                <Quote className="w-10 h-10 text-primary/50 flex-shrink-0 mt-1" />
                <blockquote className="text-lg italic text-muted-foreground">
                  "After 52 years of trial and error, reading thousands of studies, and being my own 
                  guinea pig, I realized the biggest problem isn't lack of information—it's too much 
                  noise. EvidenceMed cuts through the marketing to show you what actually works."
                </blockquote>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground text-center mb-10">
                  My Health Journey Timeline
                </h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                  
                  <div className="space-y-6">
                    {TIMELINE_EVENTS.map((event, index) => (
                      <div key={index} className="relative flex gap-6">
                        {/* Timeline dot */}
                        <div className="hidden md:flex flex-shrink-0 w-16 items-start justify-center">
                          <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md z-10" />
                        </div>
                        
                        <Card className="flex-1 hover:shadow-md transition-shadow">
                          <CardContent className="p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {event.year}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Age {event.age}
                              </Badge>
                              <Badge className="text-xs bg-primary/10 text-primary border-0">
                                {event.modality}
                              </Badge>
                            </div>
                            <div className="flex items-start gap-3">
                              <event.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                              <div>
                                <h3 className="font-semibold text-foreground mb-1">
                                  {event.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why This Matters Section */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Why I Built EvidenceMed
                </h2>
                <div className="space-y-4 text-muted-foreground text-left">
                  <p>
                    After spending decades researching alternative medicine, experimenting with alternative therapy, 
                    and learning from complementary and alternative medicine practitioners around the world, I noticed 
                    something troubling: the gap between what research actually shows and what gets marketed to people is enormous.
                  </p>
                  <p>
                    Supplement companies make bold claims about alternative cancer treatments. Social media influencers 
                    push unproven remedies. And people desperate for answers waste money on products that don't work—
                    or worse, could harm them.
                  </p>
                  <p>
                    EvidenceMed is my attempt to fix this. Every alternative medicine compound, alternative therapy, 
                    and condition on this site is backed by peer-reviewed research. I rate the evidence honestly, 
                    including when it's weak or inconclusive. No affiliate deals influence our ratings.
                  </p>
                  <p className="font-medium text-foreground">
                    This is the complementary and alternative medicine resource I wish existed when I started my health journey 52 years ago.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Hooks Section */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <Badge variant="secondary" className="mb-4">Marketing Assets</Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Social Media Hooks & Scripts
                  </h2>
                  <p className="text-muted-foreground">
                    Ready-to-use scripts for promoting EvidenceMed across platforms
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {SOCIAL_HOOKS.map((hook, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge>{hook.platform}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {hook.duration}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-2">
                          {hook.type}
                        </h3>
                        <p className="text-sm text-muted-foreground italic">
                          "{hook.script}"
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;
