import { useState } from "react";
import { BookOpen, Video, ShoppingBag, ExternalLink, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  affiliateUrl: string;
}

interface VideoResource {
  id: string;
  title: string;
  speaker: string;
  topic: string;
  url: string;
}

const featuredBooks: Book[] = [
  {
    id: "1",
    title: "How Not to Die",
    author: "Dr. Michael Greger",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=80&h=120&fit=crop",
    affiliateUrl: "#",
  },
  {
    id: "2",
    title: "The Immune System Recovery Plan",
    author: "Susan Blum, MD",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=80&h=120&fit=crop",
    affiliateUrl: "#",
  },
  {
    id: "3",
    title: "Radical Remission",
    author: "Kelly A. Turner, PhD",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=80&h=120&fit=crop",
    affiliateUrl: "#",
  },
];

const featuredVideos: VideoResource[] = [
  {
    id: "1",
    title: "Repurposing Existing Medications",
    speaker: "Dr. John Campbell",
    topic: "Drug Repurposing",
    url: "#",
  },
  {
    id: "2",
    title: "New Findings in Cancer Treatment",
    speaker: "Dr. Paul Marik",
    topic: "Integrative Oncology",
    url: "#",
  },
  {
    id: "3",
    title: "Metabolic Health Breakthroughs",
    speaker: "Dr. Peter Attia",
    topic: "Longevity Medicine",
    url: "#",
  },
];

export function MobileResourceDrawer() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 h-12 w-8 rounded-l-lg rounded-r-none bg-primary/90 hover:bg-primary shadow-lg"
          aria-label="Open resources"
        >
          <ChevronRight className="h-4 w-4 rotate-180 text-primary-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Resources & Shop
          </DrawerTitle>
          <DrawerDescription>
            Books, videos, and curated health resources
          </DrawerDescription>
        </DrawerHeader>

        <Tabs defaultValue="books" className="px-4 pb-4">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="books" className="flex-1 gap-2">
              <BookOpen className="h-4 w-4" />
              Books
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1 gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="mt-0 space-y-3">
            {featuredBooks.map((book) => (
              <a
                key={book.id}
                href={book.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-12 h-18 object-cover rounded shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-primary shrink-0" />
              </a>
            ))}
            <Link to="/merch" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full mt-2">
                Browse All Books
              </Button>
            </Link>
          </TabsContent>

          <TabsContent value="videos" className="mt-0 space-y-3">
            {featuredVideos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <Play className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground line-clamp-1">
                    {video.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{video.speaker}</p>
                </div>
                <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded shrink-0">
                  {video.topic}
                </span>
              </a>
            ))}
            <Link to="/merch" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full mt-2">
                Browse All Videos
              </Button>
            </Link>
          </TabsContent>
        </Tabs>

        {/* Affiliate Disclosure */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-muted-foreground text-center">
            <strong>Affiliate Disclosure:</strong> Links may be affiliate links. We earn a small commission at no extra cost to you.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
