import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, ShoppingBag, Leaf, BookOpen, Video, Play, Package, AlertTriangle, Pill, Filter } from "lucide-react";
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
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] bg-muted/30 relative overflow-hidden">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-amber-500/90 hover:bg-amber-500">
          {book.category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {book.description}
        </p>
        {book.researchReference && (
          <p className="text-xs text-primary/80 bg-primary/5 px-2 py-1 rounded mb-3">
            📚 {book.researchReference}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{book.price}</span>
          <a
            href={book.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <span>View on Amazon</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function SupplementCard({ supplement }: { supplement: Supplement }) {
  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30 p-6 relative overflow-hidden flex items-center justify-center">
        <Leaf className="h-16 w-16 text-green-500/50" />
        <Badge className="absolute top-3 left-3 bg-emerald-500/90 hover:bg-emerald-500">
          {supplement.type}
        </Badge>
        <Badge variant="outline" className="absolute top-3 right-3">
          {supplement.category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {supplement.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {supplement.description}
        </p>
        {supplement.researchReference && (
          <p className="text-xs text-primary/80 bg-primary/5 px-2 py-1 rounded mb-3">
            🔬 {supplement.researchReference}
          </p>
        )}
        <a
          href={supplement.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <span>Shop Options</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function VideoCard({ video }: { video: VideoContent }) {
  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/30 dark:to-rose-900/30 relative overflow-hidden flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="h-8 w-8 text-red-500" />
        </div>
        <Badge className={`absolute top-3 left-3 ${video.type === 'paid' ? 'bg-purple-500/90 hover:bg-purple-500' : 'bg-green-500/90 hover:bg-green-500'}`}>
          {video.type === 'paid' ? 'Premium' : 'Free'}
        </Badge>
        {video.duration && (
          <Badge variant="outline" className="absolute top-3 right-3 bg-background/80">
            {video.duration}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{video.category}</p>
        <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{video.speaker}</p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <span>{video.type === 'paid' ? 'Get Access' : 'Watch Now'}</span>
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

  return (
    <>
      <Helmet>
        <title>Shop & Resources | EvidenceMed</title>
        <meta name="description" content="Educational books, supplements, and expert video content. Research-focused resources with full affiliate disclosure. Educational purposes only - not medical advice." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <Pill className="h-8 w-8 text-primary" />
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Shop & Resources
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated educational resources including research-focused books, quality supplements, 
                and expert content. Clearly separated from our research content.
              </p>
            </div>
          </section>

          {/* Affiliate Disclosure Banner */}
          <section className="py-6 bg-card/50 border-b border-border">
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
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen className="h-6 w-6 text-amber-500" />
                      <h2 className="font-heading text-2xl font-bold text-foreground">Books</h2>
                      <Badge variant="outline" className="ml-2">Research-Focused</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  </div>

                  {/* Supplements Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Leaf className="h-6 w-6 text-emerald-500" />
                      <h2 className="font-heading text-2xl font-bold text-foreground">Supplements & Botanicals</h2>
                      <Badge variant="outline" className="ml-2">Functional Mushrooms & Herbs</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {supplements.map((supplement) => (
                        <SupplementCard key={supplement.id} supplement={supplement} />
                      ))}
                    </div>
                  </div>

                  {/* Videos Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Video className="h-6 w-6 text-red-500" />
                      <h2 className="font-heading text-2xl font-bold text-foreground">Videos & Expert Content</h2>
                      <Badge variant="outline" className="ml-2">Webinars & Talks</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videoContent.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Books Tab */}
                <TabsContent value="books">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="h-6 w-6 text-amber-500" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">Books</h2>
                    <Badge variant="outline" className="ml-2">Research-Focused Titles</Badge>
                  </div>
                  {books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState category="books" />
                  )}
                </TabsContent>

                {/* Supplements Tab */}
                <TabsContent value="supplements">
                  <div className="flex items-center gap-2 mb-6">
                    <Leaf className="h-6 w-6 text-emerald-500" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">Supplements & Botanicals</h2>
                    <Badge variant="outline" className="ml-2">Functional Mushrooms, Herbs & Nutraceuticals</Badge>
                  </div>
                  {supplements.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {supplements.map((supplement) => (
                        <SupplementCard key={supplement.id} supplement={supplement} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState category="supplements" />
                  )}
                </TabsContent>

                {/* Videos Tab */}
                <TabsContent value="videos">
                  <div className="flex items-center gap-2 mb-6">
                    <Video className="h-6 w-6 text-red-500" />
                    <h2 className="font-heading text-2xl font-bold text-foreground">Videos & Expert Content</h2>
                    <Badge variant="outline" className="ml-2">Webinars & Partner Content</Badge>
                  </div>
                  {videoContent.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videoContent.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState category="videos" />
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
