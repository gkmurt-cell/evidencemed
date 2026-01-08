import { useState } from "react";
import { BookOpen, ExternalLink, TrendingUp, Calendar, ChevronDown, ShoppingBag, Youtube, Play, Shirt } from "lucide-react";
import herbNerdTshirt from "@/assets/herb-nerd-tshirt.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface ResearchUpdate {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  affiliateUrl: string;
  category?: string;
}

interface Resource {
  id: string;
  name: string;
  type: string;
  description: string;
  url: string;
  categories?: string[];
}

interface VideoResource {
  id: string;
  title: string;
  speaker: string;
  topic: string;
  url: string;
  thumbnail?: string;
  categories?: string[];
}

interface RightSidebarProps {
  variant?: "split" | "books-only";
  relatedCategory?: string;
}

const researchUpdates: ResearchUpdate[] = [
  {
    id: "1",
    title: "New meta-analysis on Lion's Mane and cognitive function",
    source: "Nature Neuroscience",
    date: "Dec 28, 2025",
    category: "Cognitive Health"
  },
  {
    id: "2",
    title: "Turkey Tail mushroom shows promise in gut microbiome studies",
    source: "PubMed",
    date: "Dec 26, 2025",
    category: "Immune Support"
  },
  {
    id: "3",
    title: "Curcumin bioavailability breakthrough in clinical trials",
    source: "The Lancet",
    date: "Dec 24, 2025",
    category: "Inflammation"
  },
  {
    id: "4",
    title: "Ashwagandha stress reduction mechanisms explored",
    source: "Journal of Ethnopharmacology",
    date: "Dec 22, 2025",
    category: "Stress & Anxiety"
  },
  {
    id: "5",
    title: "NMN supplementation shows anti-aging benefits in human trial",
    source: "Cell Metabolism",
    date: "Dec 20, 2025",
    category: "Longevity"
  },
  {
    id: "6",
    title: "Vitamin D deficiency linked to autoimmune disorders",
    source: "JAMA Internal Medicine",
    date: "Dec 18, 2025",
    category: "Autoimmune"
  },
  {
    id: "7",
    title: "Berberine compared to metformin in glucose regulation",
    source: "Diabetes Care",
    date: "Dec 15, 2025",
    category: "Metabolic Health"
  }
];

const popularBooks: Book[] = [
  {
    id: "1",
    title: "How Not to Die",
    author: "Dr. Michael Greger",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "General Health"
  },
  {
    id: "2",
    title: "The Immune System Recovery Plan",
    author: "Susan Blum, MD",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "Autoimmune"
  },
  {
    id: "3",
    title: "Radical Remission",
    author: "Kelly A. Turner, PhD",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "Cancer"
  },
  {
    id: "4",
    title: "The End of Alzheimer's",
    author: "Dale Bredesen, MD",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "Cognitive Health"
  },
  {
    id: "5",
    title: "Grain Brain",
    author: "David Perlmutter, MD",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "Neurological"
  },
  {
    id: "6",
    title: "Medical Medium",
    author: "Anthony William",
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "General Health"
  },
  {
    id: "7",
    title: "Lifespan",
    author: "David Sinclair, PhD",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "Longevity"
  },
  {
    id: "8",
    title: "Energy Medicine",
    author: "Donna Eden",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "energetic"
  },
  {
    id: "9",
    title: "The Body Electric",
    author: "Robert Becker",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "energetic"
  },
  {
    id: "10",
    title: "Vibrational Medicine",
    author: "Richard Gerber",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "energetic"
  },
  {
    id: "11",
    title: "The Rife Handbook",
    author: "Nenah Sylver",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "energetic"
  },
  {
    id: "12",
    title: "Wheels of Light",
    author: "Rosalyn Bruyere",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "energetic"
  },
  {
    id: "13",
    title: "The Complete Book of Ayurvedic Home Remedies",
    author: "Vasant Lad",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "ayurveda"
  },
  {
    id: "14",
    title: "Prakriti: Your Ayurvedic Constitution",
    author: "Robert Svoboda",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "ayurveda"
  },
  {
    id: "15",
    title: "Ayurveda: The Science of Self-Healing",
    author: "Vasant Lad",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "ayurveda"
  },
  {
    id: "16",
    title: "The Yoga of Herbs",
    author: "Vasant Lad & David Frawley",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "ayurveda"
  },
  {
    id: "17",
    title: "Ayurvedic Cooking for Self-Healing",
    author: "Usha Lad & Vasant Lad",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=120&h=180&fit=crop",
    affiliateUrl: "#",
    category: "ayurveda"
  }
];

const resources: Resource[] = [
  {
    id: "1",
    name: "NMN (Nicotinamide Mononucleotide)",
    type: "Longevity",
    description: "NAD+ precursor for cellular energy",
    url: "#",
    categories: ["Longevity", "General Health", "Cognitive Health"]
  },
  {
    id: "2",
    name: "NAD+ Supplements",
    type: "Longevity",
    description: "Direct NAD+ supplementation",
    url: "#",
    categories: ["Longevity", "General Health"]
  },
  {
    id: "3",
    name: "Lion's Mane Mushroom",
    type: "Cognitive",
    description: "Nootropic mushroom extract",
    url: "#",
    categories: ["Cognitive Health", "Neurological", "General Health"]
  },
  {
    id: "4",
    name: "Vitamin D3 + K2",
    type: "Essential",
    description: "Bone & immune support",
    url: "#",
    categories: ["Immune Support", "Autoimmune", "General Health"]
  },
  {
    id: "5",
    name: "Ashwagandha Extract",
    type: "Adaptogen",
    description: "Stress & anxiety support",
    url: "#",
    categories: ["Stress & Anxiety", "General Health"]
  },
  {
    id: "6",
    name: "Curcumin (Turmeric)",
    type: "Anti-inflammatory",
    description: "Bioavailable turmeric extract",
    url: "#",
    categories: ["Inflammation", "Autoimmune", "Cancer", "General Health"]
  },
  {
    id: "7",
    name: "Berberine",
    type: "Metabolic",
    description: "Blood sugar support",
    url: "#",
    categories: ["Metabolic Health", "General Health"]
  }
];

const videoResources: VideoResource[] = [
  {
    id: "1",
    title: "Repurposing Existing Medications",
    speaker: "Dr. John Campbell",
    topic: "Drug Repurposing",
    url: "https://www.youtube.com/@DrJohnCampbell",
    categories: ["General Health", "Immune Support"]
  },
  {
    id: "2",
    title: "New Findings in Cancer Treatment",
    speaker: "Dr. Paul Marik",
    topic: "Integrative Oncology",
    url: "#",
    categories: ["Cancer", "General Health"]
  },
  {
    id: "3",
    title: "Metabolic Health Breakthroughs",
    speaker: "Dr. Peter Attia",
    topic: "Longevity Medicine",
    url: "#",
    categories: ["Metabolic Health", "Longevity", "General Health"]
  },
  {
    id: "4",
    title: "Autoimmune Protocol Updates",
    speaker: "Dr. Terry Wahls",
    topic: "Autoimmune Research",
    url: "#",
    categories: ["Autoimmune", "Inflammation", "General Health"]
  },
  {
    id: "5",
    title: "NAD+ and Aging Research",
    speaker: "Dr. David Sinclair",
    topic: "Longevity Science",
    url: "#",
    categories: ["Longevity", "Cognitive Health", "General Health"]
  },
  {
    id: "6",
    title: "Gut Microbiome Insights",
    speaker: "Dr. Will Bulsiewicz",
    topic: "Gut Health",
    url: "#",
    categories: ["Immune Support", "Inflammation", "General Health"]
  },
  {
    id: "7",
    title: "Fasting and Cellular Repair",
    speaker: "Dr. Jason Fung",
    topic: "Metabolic Health",
    url: "#",
    categories: ["Metabolic Health", "Longevity", "General Health"]
  }
];

type SectionType = "research" | "books" | "resources" | "videos" | null;

export function RightSidebar({ variant = "split", relatedCategory }: RightSidebarProps) {
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const handleSectionToggle = (section: SectionType) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  // Filter content based on relatedCategory
  const displayBooks = relatedCategory 
    ? popularBooks.filter(book => book.category === relatedCategory || book.category === "General Health")
    : popularBooks;

  const displayResearch = relatedCategory
    ? researchUpdates.filter(update => update.category === relatedCategory || update.category === "General Health")
    : researchUpdates;

  const displayResources = relatedCategory
    ? resources.filter(resource => resource.categories?.includes(relatedCategory) || resource.categories?.includes("General Health"))
    : resources;

  const displayVideos = relatedCategory
    ? videoResources.filter(video => video.categories?.includes(relatedCategory) || video.categories?.includes("General Health"))
    : videoResources;

  // Get the first relevant item for each section (for preview)
  const previewBook = displayBooks[0] || popularBooks[0];
  const previewResearch = displayResearch[0] || researchUpdates[0];
  const previewResource = displayResources[0] || resources[0];
  const previewVideo = displayVideos[0] || videoResources[0];

  return (
    <aside className="w-80 xl:w-96 bg-card border-l border-border h-full overflow-y-auto sticky top-0">
      {variant === "split" ? (
        <div className="divide-y divide-border">
          {/* Research Updates Section */}
          <Collapsible open={openSection === "research"} onOpenChange={() => handleSectionToggle("research")}>
            <CollapsibleTrigger className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="font-heading font-semibold">Latest Research</h3>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openSection === "research" && "rotate-180"
                )} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-left">Peer-reviewed updates</p>
            </CollapsibleTrigger>
            
            {/* Preview item when collapsed */}
            {openSection !== "research" && (
              <article className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group border-b border-border/50">
                <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded mb-2">
                  {previewResearch.category}
                </span>
                <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {previewResearch.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">{previewResearch.source}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {previewResearch.date}
                  </div>
                </div>
              </article>
            )}
            
            <CollapsibleContent>
              <div className="divide-y divide-border/50">
                {displayResearch.map((update) => (
                  <article key={update.id} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded mb-2">
                      {update.category}
                    </span>
                    <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {update.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-medium">{update.source}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {update.date}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Books Section */}
          <Collapsible open={openSection === "books"} onOpenChange={() => handleSectionToggle("books")}>
            <CollapsibleTrigger className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="font-heading font-semibold">Recommended Books</h3>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openSection === "books" && "rotate-180"
                )} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-left">Popular health & wellness reads</p>
            </CollapsibleTrigger>
            
            {/* Preview item when collapsed */}
            {openSection !== "books" && (
              <a 
                href={previewBook.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 p-4 hover:bg-muted/50 transition-colors group border-b border-border/50"
              >
                <img 
                  src={previewBook.cover} 
                  alt={previewBook.title}
                  className="w-14 h-20 object-cover rounded shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {previewBook.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{previewBook.author}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                    <ExternalLink className="h-3 w-3" />
                    <span>View on Amazon</span>
                  </div>
                </div>
              </a>
            )}
            
            <CollapsibleContent>
              <div className="p-4 space-y-4">
                {displayBooks.map((book) => (
                  <a 
                    key={book.id} 
                    href={book.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                        <ExternalLink className="h-3 w-3" />
                        <span>View on Amazon</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Resources Section */}
          <Collapsible open={openSection === "resources"} onOpenChange={() => handleSectionToggle("resources")}>
            <CollapsibleTrigger className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <ShoppingBag className="h-5 w-5" />
                  <h3 className="font-heading font-semibold">Resources</h3>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openSection === "resources" && "rotate-180"
                )} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-left">Vitamins, herbs & supplements</p>
            </CollapsibleTrigger>
            
            {/* Preview item when collapsed */}
            {openSection !== "resources" && (
              <a 
                href={previewResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-muted/50 transition-colors group border-b border-border/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded mb-2">
                      {previewResource.type}
                    </span>
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {previewResource.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{previewResource.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </a>
            )}
            
            <CollapsibleContent>
              <div className="divide-y divide-border/50">
                {displayResources.map((resource) => (
                  <a 
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded mb-2">
                          {resource.type}
                        </span>
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {resource.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* YouTube Videos Section */}
          <Collapsible open={openSection === "videos"} onOpenChange={() => handleSectionToggle("videos")}>
            <CollapsibleTrigger className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Youtube className="h-5 w-5" />
                  <h3 className="font-heading font-semibold">Expert Talks</h3>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openSection === "videos" && "rotate-180"
                )} />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-left">Practitioner insights & research</p>
            </CollapsibleTrigger>
            
            {/* Preview item when collapsed */}
            {openSection !== "videos" && (
              <a 
                href={previewVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-muted/50 transition-colors group border-b border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Play className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {previewVideo.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{previewVideo.speaker}</p>
                    <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded mt-2">
                      {previewVideo.topic}
                    </span>
                  </div>
                </div>
              </a>
            )}
            
            <CollapsibleContent>
              <div className="divide-y divide-border/50">
                {displayVideos.map((video) => (
                  <a 
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Play className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{video.speaker}</p>
                        <span className="inline-block text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded mt-2">
                          {video.topic}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Affiliate Disclosure */}
          <div className="p-4 bg-muted/20">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong>Affiliate Disclosure:</strong> Links may be affiliate links. We earn a small commission at no extra cost to you. Content is for educational purposes only.
            </p>
          </div>
        </div>
      ) : (
        /* Full Books Sidebar for condition pages */
        <div>
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-heading font-semibold">
                {relatedCategory ? `${relatedCategory} Books` : "Recommended Reading"}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {relatedCategory ? "Related to this condition" : "Popular health & wellness reads"}
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            {displayBooks.map((book) => (
              <a 
                key={book.id} 
                href={book.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 p-3 -mx-1 rounded-lg hover:bg-muted/50 transition-colors group border border-transparent hover:border-border"
              >
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded shadow-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-medium text-accent-foreground bg-accent/20 px-1.5 py-0.5 rounded mb-1">
                    {book.category}
                  </span>
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary font-medium">
                    <ExternalLink className="h-3 w-3" />
                    <span>View on Amazon</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Merch Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Shirt className="h-5 w-5" />
              <h3 className="font-heading font-semibold text-sm">Herb Lover Merch</h3>
            </div>
            <a 
              href="https://printify.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative rounded-lg overflow-hidden bg-muted/30 p-3 hover:bg-muted/50 transition-colors">
                <img 
                  src={herbNerdTshirt} 
                  alt="I identify as a herb loving nerd t-shirt"
                  className="w-full h-auto rounded-md shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-foreground">"I identify as a herb loving nerd"</p>
                  <p className="text-xs text-muted-foreground mt-1">Available on Printify</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-primary font-medium">
                    <ExternalLink className="h-3 w-3" />
                    <span>Shop Now</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Affiliate Disclosure */}
          <div className="p-4 bg-muted/20 border-t border-border mt-auto">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong>Affiliate Disclosure:</strong> Links may be affiliate links. We earn a small commission at no extra cost to you. Books shown are not necessarily peer-reviewed.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
