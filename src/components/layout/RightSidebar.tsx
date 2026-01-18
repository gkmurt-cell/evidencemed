import { useState } from "react";
import { TrendingUp, Calendar, ChevronDown, Video, Play, ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PractitionerFinder } from "@/components/PractitionerFinder";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResearchUpdate {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
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

// Quick navigation links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Integrative Therapies", href: "/integrative-therapies" },
];

type SectionType = "research" | "videos" | null;

export function RightSidebar({ variant = "split", relatedCategory }: RightSidebarProps) {
  const [openSection, setOpenSection] = useState<SectionType>(null);
  const location = useLocation();
  
  // Show practitioner finder on integrative therapies page
  const showPractitionerFinder = location.pathname === "/integrative-therapies";

  const handleSectionToggle = (section: SectionType) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  // Filter content based on relatedCategory
  const displayResearch = relatedCategory
    ? researchUpdates.filter(update => update.category === relatedCategory || update.category === "General Health")
    : researchUpdates;

  const displayVideos = relatedCategory
    ? videoResources.filter(video => video.categories?.includes(relatedCategory) || video.categories?.includes("General Health"))
    : videoResources;

  // Get the first relevant item for each section (for preview)
  const previewResearch = displayResearch[0] || researchUpdates[0];
  const previewVideo = displayVideos[0] || videoResources[0];

  return (
    <aside className="w-80 xl:w-96 bg-card border-l border-border h-full overflow-y-auto sticky top-0">
      {/* Quick Navigation - Always at top */}
      <div className="p-4 border-b border-border bg-muted/50">
        <h3 className="font-heading font-semibold text-base text-foreground mb-3">Quick Navigation</h3>
        <nav className="flex flex-wrap gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Practitioner Finder - Only on Integrative Therapies page */}
      {showPractitionerFinder && <PractitionerFinder />}

      <div className="divide-y divide-border">
        {/* 1. Research Updates Section - Primary, non-commercial */}
        <Collapsible open={openSection === "research"} onOpenChange={() => handleSectionToggle("research")}>
          <CollapsibleTrigger className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-heading font-semibold text-base">Latest Research</h3>
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
              <span className="inline-block text-xs font-medium text-primary-foreground bg-primary/80 px-2 py-0.5 rounded mb-2">
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
                  <span className="inline-block text-xs font-medium text-primary-foreground bg-primary/80 px-2 py-0.5 rounded mb-2">
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

        {/* 2. Expert Videos Section - Educational content */}
        <Collapsible open={openSection === "videos"} onOpenChange={() => handleSectionToggle("videos")}>
          <CollapsibleTrigger className="w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Video className="h-5 w-5" />
                <h3 className="font-heading font-semibold text-base">Expert Talks</h3>
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
                  <span className="inline-block text-xs font-medium text-primary-foreground bg-primary/80 px-2 py-0.5 rounded mt-2">
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
                      <span className="inline-block text-xs font-medium text-primary-foreground bg-primary/80 px-2 py-0.5 rounded mt-2">
                        {video.topic}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Shop Link - Simple CTA to Shop page */}
        <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShoppingBag className="h-5 w-5" />
            <h3 className="font-heading font-semibold text-base">Shop & Resources</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Books, supplements, videos & educational materials
          </p>
          <Link to="/merch">
            <Button size="sm" className="w-full rounded-full">
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
