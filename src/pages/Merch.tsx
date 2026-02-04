import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, ShoppingBag, Leaf, BookOpen, Video, Play, Package, AlertTriangle, Pill, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import herbNerdTshirt from "@/assets/herb-nerd-tshirt.png";
import herbMug from "@/assets/herb-mug.png";
import herbTote from "@/assets/herb-tote.png";
import herbStickers from "@/assets/herb-stickers.png";
import herbHoodie from "@/assets/herb-hoodie.png";

// ============ DATA TYPES ============

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: string;
  image: string;
  affiliateUrl: string;
  researchReference?: string;
  category: string;
}

interface Supplement {
  id: string;
  name: string;
  type: string;
  description: string;
  researchReference?: string;
  affiliateUrl: string;
  image: string;
  category: string;
}

interface VideoContent {
  id: string;
  title: string;
  speaker: string;
  description: string;
  duration?: string;
  type: "free" | "paid";
  url: string;
  thumbnail?: string;
  category: string;
}

// ============ DATA ============

const books: Book[] = [
  {
    id: "1",
    title: "How Not to Die",
    author: "Dr. Michael Greger",
    description: "Evidence-based guide to preventing and reversing disease through diet and lifestyle.",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    affiliateUrl: "https://amazon.com",
    researchReference: "Cited in 500+ peer-reviewed studies",
    category: "Nutrition"
  },
  {
    id: "2",
    title: "The Immune System Recovery Plan",
    author: "Susan Blum, MD",
    description: "A doctor's 4-step program to treat autoimmune disease through functional medicine.",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    affiliateUrl: "https://amazon.com",
    researchReference: "Based on clinical research",
    category: "Autoimmune"
  },
  {
    id: "3",
    title: "Radical Remission",
    author: "Kelly A. Turner, PhD",
    description: "Research on cancer survivors who defied the odds using holistic approaches.",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    affiliateUrl: "https://amazon.com",
    researchReference: "Analyzed 1,500+ cases",
    category: "Oncology"
  },
  {
    id: "4",
    title: "The End of Alzheimer's",
    author: "Dale Bredesen, MD",
    description: "The first protocol to prevent and reverse cognitive decline.",
    price: "$17.99",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    affiliateUrl: "https://amazon.com",
    researchReference: "Published in peer-reviewed journals",
    category: "Cognitive"
  },
  {
    id: "5",
    title: "Lifespan",
    author: "David Sinclair, PhD",
    description: "Why we age and why we don't have to—insights from Harvard research.",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
    affiliateUrl: "https://amazon.com",
    researchReference: "Based on NAD+ research",
    category: "Longevity"
  },
  {
    id: "6",
    title: "The Complete Book of Ayurvedic Home Remedies",
    author: "Vasant Lad",
    description: "Comprehensive guide to Ayurvedic principles and traditional remedies.",
    price: "$18.95",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
    affiliateUrl: "https://amazon.com",
    researchReference: "Traditional knowledge compilation",
    category: "Ayurveda"
  }
];

const supplements: Supplement[] = [
  {
    id: "1",
    name: "Lion's Mane Mushroom Extract",
    type: "Functional Mushroom",
    description: "Cognitive support from Hericium erinaceus fruiting body.",
    researchReference: "Studies show NGF stimulation (Mori et al., 2009)",
    affiliateUrl: "https://amazon.com",
    image: "/placeholder.svg",
    category: "Cognitive"
  },
  {
    id: "2",
    name: "Ashwagandha KSM-66",
    type: "Adaptogen",
    description: "Clinically studied adaptogenic herb for stress support.",
    researchReference: "Randomized trials on cortisol reduction",
    affiliateUrl: "https://amazon.com",
    image: "/placeholder.svg",
    category: "Stress"
  },
  {
    id: "3",
    name: "Curcumin with BioPerine",
    type: "Anti-inflammatory",
    description: "Enhanced absorption turmeric extract with black pepper.",
    researchReference: "2000+ published studies on curcumin",
    affiliateUrl: "https://amazon.com",
    image: "/placeholder.svg",
    category: "Inflammation"
  },
  {
    id: "4",
    name: "NMN (Nicotinamide Mononucleotide)",
    type: "Longevity",
    description: "NAD+ precursor for cellular energy metabolism.",
    researchReference: "Sinclair lab research at Harvard",
    affiliateUrl: "https://amazon.com",
    image: "/placeholder.svg",
    category: "Longevity"
  },
  {
    id: "5",
    name: "Turkey Tail Mushroom",
    type: "Functional Mushroom",
    description: "Immune-supporting polysaccharides from Trametes versicolor.",
    researchReference: "NIH-funded studies on PSK/PSP",
    affiliateUrl: "https://amazon.com",
    image: "/placeholder.svg",
    category: "Immune"
  },
  {
    id: "6",
    name: "Vitamin D3 + K2",
    type: "Essential Vitamin",
    description: "Synergistic formula for bone and cardiovascular health.",
    researchReference: "Meta-analyses on vitamin D deficiency",
    affiliateUrl: "https://amazon.com",
    image: "/placeholder.svg",
    category: "Essential"
  }
];

const videoContent: VideoContent[] = [
  {
    id: "1",
    title: "Ivermectin: The Evidence",
    speaker: "Dr. John Campbell",
    description: "Comprehensive review of ivermectin research and its potential applications as a repurposed drug.",
    duration: "25 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs"
  },
  {
    id: "2",
    title: "Vitamin D and Immune Function",
    speaker: "Dr. John Campbell",
    description: "The science behind vitamin D deficiency and its critical role in immune system regulation.",
    duration: "30 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Vitamins"
  },
  {
    id: "3",
    title: "Repurposing Existing Medications",
    speaker: "Dr. John Campbell",
    description: "How existing approved drugs are being studied for new therapeutic applications.",
    duration: "28 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs"
  },
  {
    id: "4",
    title: "Fluvoxamine Research Update",
    speaker: "Dr. John Campbell",
    description: "Analysis of clinical trials examining fluvoxamine as a repurposed therapeutic agent.",
    duration: "22 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs"
  },
  {
    id: "5",
    title: "Metformin: Beyond Diabetes",
    speaker: "Dr. John Campbell",
    description: "Exploring research on metformin's potential benefits for longevity and other conditions.",
    duration: "32 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs"
  },
  {
    id: "6",
    title: "Understanding NAD+ and Cellular Aging",
    speaker: "Dr. David Sinclair",
    description: "Harvard professor explains the science of longevity and NAD+ metabolism.",
    duration: "45 min",
    type: "free",
    url: "https://youtube.com",
    category: "Longevity"
  },
  {
    id: "7",
    title: "Metabolic Health Masterclass",
    speaker: "Dr. Peter Attia",
    description: "Deep dive into metabolic health, glucose regulation, and longevity medicine.",
    duration: "2 hours",
    type: "paid",
    url: "#",
    category: "Metabolic"
  },
  {
    id: "8",
    title: "Autoimmune Protocol Explained",
    speaker: "Dr. Terry Wahls",
    description: "How to use nutrition and lifestyle to address autoimmune conditions.",
    duration: "1 hour",
    type: "free",
    url: "https://youtube.com",
    category: "Autoimmune"
  },
  {
    id: "9",
    title: "Gut Microbiome & Immunity",
    speaker: "Dr. Will Bulsiewicz",
    description: "The connection between gut health, fiber, and immune function.",
    duration: "55 min",
    type: "free",
    url: "https://youtube.com",
    category: "Gut Health"
  },
  {
    id: "10",
    title: "Integrative Oncology Webinar",
    speaker: "Dr. Paul Marik",
    description: "Evidence-based integrative approaches in cancer care.",
    duration: "90 min",
    type: "paid",
    url: "#",
    category: "Oncology"
  },
  {
    id: "11",
    title: "Fasting Science Deep Dive",
    speaker: "Dr. Jason Fung",
    description: "Understanding intermittent fasting and therapeutic fasting protocols.",
    duration: "1 hour",
    type: "free",
    url: "https://youtube.com",
    category: "Metabolic"
  },
  {
    id: "12",
    title: "Low Dose Naltrexone Research",
    speaker: "Dr. John Campbell",
    description: "Reviewing the evidence for LDN as a repurposed drug for autoimmune and chronic conditions.",
    duration: "26 min",
    type: "free",
    url: "https://www.youtube.com/@DrJohnCampbell",
    category: "Repurposed Drugs"
  }
];

// ============ COMPONENTS ============

function AffiliateDisclosureBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 md:p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
            Affiliate Disclosure
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            Some products listed here are affiliate links. EvidenceMed receives a small commission at no extra cost to you. 
            All content is educational; <strong>this is not medical advice</strong>. Always consult a qualified healthcare 
            provider before starting any supplement or treatment protocol.
          </p>
        </div>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="group bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex gap-4">
        {/* Small thumbnail - reference style */}
        <div className="w-16 h-20 bg-muted/50 rounded flex-shrink-0 overflow-hidden">
          <img 
            src={book.image} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1">{book.category}</p>
          <h3 className="font-serif font-medium text-foreground text-sm leading-tight mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
          {book.researchReference && (
            <p className="text-xs text-primary/70 mb-2">
              {book.researchReference}
            </p>
          )}
          <a
            href={book.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Publisher link</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function SupplementCard({ supplement }: { supplement: Supplement }) {
  return (
    <article className="group bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-3">
        {/* Simple icon instead of product image */}
        <div className="w-10 h-10 rounded bg-muted/50 flex items-center justify-center flex-shrink-0">
          <Leaf className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">{supplement.type}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{supplement.category}</span>
          </div>
          <h3 className="font-serif font-medium text-foreground text-sm leading-tight mb-1">
            {supplement.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {supplement.description}
          </p>
          {supplement.researchReference && (
            <p className="text-xs text-primary/70 mb-2">
              {supplement.researchReference}
            </p>
          )}
          <a
            href={supplement.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Reference sources</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function VideoCard({ video }: { video: VideoContent }) {
  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Lecture-style thumbnail: neutral academic aesthetic */}
      <div className="aspect-video bg-slate-800 relative overflow-hidden">
        {/* Podium/presentation visual */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Abstract slide/presentation element */}
          <div className="w-3/4 h-2/3 bg-slate-700/80 rounded-sm border border-slate-600 flex items-center justify-center mb-2">
            <div className="text-center px-4">
              <div className="w-12 h-0.5 bg-slate-500 mx-auto mb-2" />
              <div className="w-16 h-0.5 bg-slate-500 mx-auto mb-2" />
              <div className="w-10 h-0.5 bg-slate-500 mx-auto" />
            </div>
          </div>
          {/* Podium indicator */}
          <div className="w-8 h-1 bg-slate-600 rounded-full" />
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/20">
            <Play className="h-5 w-5 text-white ml-0.5" />
          </div>
        </div>
        {/* Badges */}
        <Badge className={`absolute top-3 left-3 ${video.type === 'paid' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-emerald-600/90 hover:bg-emerald-600'}`}>
          {video.type === 'paid' ? 'Premium' : 'Free'}
        </Badge>
        {video.duration && (
          <Badge variant="outline" className="absolute top-3 right-3 bg-slate-900/80 text-slate-200 border-slate-600">
            {video.duration}
          </Badge>
        )}
        {/* Speaker indicator - neutral talking head style */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center">
            <span className="text-xs text-slate-300 font-medium">
              {video.speaker.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[120px]">
            {video.speaker}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1 font-medium">{video.category}</p>
        <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <span>{video.type === 'paid' ? 'Get Access' : 'Watch Lecture'}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="text-center py-12">
      <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
      <p className="text-muted-foreground">No {category} available yet.</p>
    </div>
  );
}

// ============ MAIN COMPONENT ============

export default function Merch() {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleVideos, setVisibleVideos] = useState(6);
  
  const VIDEOS_PER_PAGE = 6;
  const hasMoreVideos = visibleVideos < videoContent.length;
  
  const loadMoreVideos = () => {
    setVisibleVideos(prev => Math.min(prev + VIDEOS_PER_PAGE, videoContent.length));
  };
  
  const displayedVideos = videoContent.slice(0, visibleVideos);

  return (
    <>
      <Helmet>
        <title>Reference Library | EvidenceMed</title>
        <meta name="description" content="Curated reference materials including peer-reviewed books, researched compounds, and educational lectures. Bibliography-style resources for further reading." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16 lg:pt-20">
          {/* Header - Bibliography style, not storefront */}
          <section className="py-12 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  Reference Library
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  Curated materials for further reading and research. Books, compounds, and educational 
                  lectures referenced in our content or relevant to integrative health research. 
                  Resources are listed for informational purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Affiliate Disclosure - Understated */}
          <section className="py-4 bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4">
              <AffiliateDisclosureBanner />
            </div>
          </section>

          {/* Products Section with Tabs */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent">
                    <TabsTrigger 
                      value="all" 
                      className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      All Resources
                    </TabsTrigger>
                    <TabsTrigger 
                      value="books" 
                      className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                    >
                      <BookOpen className="h-4 w-4 mr-1" /> Books
                    </TabsTrigger>
                    <TabsTrigger 
                      value="supplements" 
                      className="rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                    >
                      <Leaf className="h-4 w-4 mr-1" /> Supplements
                    </TabsTrigger>
                    <TabsTrigger 
                      value="videos" 
                      className="rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white"
                    >
                      <Video className="h-4 w-4 mr-1" /> Videos
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>Filter by category above</span>
                  </div>
                </div>

                {/* All Resources */}
                <TabsContent value="all" className="space-y-12">
                  {/* Books Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <h2 className="font-serif text-xl font-medium text-foreground">Published Works</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Books cited in our research or relevant to integrative health topics
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  </div>

                  {/* Compounds Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-5 w-5 text-muted-foreground" />
                      <h2 className="font-serif text-xl font-medium text-foreground">Researched Compounds</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Substances with documented research referenced in our database
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {supplements.map((supplement) => (
                        <SupplementCard key={supplement.id} supplement={supplement} />
                      ))}
                    </div>
                  </div>

                  {/* Lectures Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="h-5 w-5 text-muted-foreground" />
                      <h2 className="font-serif text-xl font-medium text-foreground">Educational Lectures</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Recorded presentations and talks from researchers and clinicians
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayedVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                    {hasMoreVideos && (
                      <div className="flex justify-center mt-6">
                        <Button 
                          variant="ghost" 
                          onClick={loadMoreVideos}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Show more ({videoContent.length - visibleVideos} additional)
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Books Tab */}
                <TabsContent value="books">
                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-1">Published Works</h2>
                    <p className="text-sm text-muted-foreground">Books cited in our research or relevant to integrative health topics</p>
                  </div>
                  {books.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState category="books" />
                  )}
                </TabsContent>

                {/* Compounds Tab */}
                <TabsContent value="supplements">
                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-1">Researched Compounds</h2>
                    <p className="text-sm text-muted-foreground">Substances with documented research referenced in our database</p>
                  </div>
                  {supplements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {supplements.map((supplement) => (
                        <SupplementCard key={supplement.id} supplement={supplement} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState category="compounds" />
                  )}
                </TabsContent>

                {/* Lectures Tab */}
                <TabsContent value="videos">
                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-1">Educational Lectures</h2>
                    <p className="text-sm text-muted-foreground">Recorded presentations and talks from researchers and clinicians</p>
                  </div>
                  {videoContent.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedVideos.map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                      </div>
                      {hasMoreVideos && (
                        <div className="flex justify-center mt-6">
                          <Button 
                            variant="ghost" 
                            onClick={loadMoreVideos}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Show more ({videoContent.length - visibleVideos} additional)
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <EmptyState category="lectures" />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Bottom Disclaimer */}
          <section className="py-8 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Educational Disclaimer:</strong> The products and resources on this page are provided for 
                  educational purposes only. They are not intended to diagnose, treat, cure, or prevent any disease. 
                  Always consult with a qualified healthcare professional before starting any new supplement or treatment. 
                  EvidenceMed is not responsible for any adverse effects resulting from the use of any products linked here.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
