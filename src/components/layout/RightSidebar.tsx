import { BookOpen, ExternalLink, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  }
];

export function RightSidebar({ variant = "split", relatedCategory }: RightSidebarProps) {
  const displayBooks = relatedCategory 
    ? popularBooks.filter(book => book.category === relatedCategory || book.category === "General Health")
    : popularBooks;

  return (
    <aside className="w-80 xl:w-96 bg-card border-l border-border h-full overflow-y-auto sticky top-0">
      {variant === "split" ? (
        <>
          {/* Research Updates Section */}
          <div className="border-b border-border">
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-heading font-semibold">Latest Research</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Peer-reviewed updates</p>
            </div>
            
            <div className="divide-y divide-border">
              {researchUpdates.map((update) => (
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
            
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary-foreground hover:bg-primary">
                View All Updates
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Books Section */}
          <div>
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                <h3 className="font-heading font-semibold">Recommended Books</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Popular health & wellness reads</p>
            </div>
            
            <div className="p-4 space-y-4">
              {displayBooks.slice(0, 3).map((book) => (
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
            
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary-foreground hover:bg-primary">
                Browse All Books
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Affiliate Disclosure */}
            <div className="p-4 bg-muted/20 border-t border-border">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                <strong>Affiliate Disclosure:</strong> Links may be affiliate links. We earn a small commission at no extra cost to you. Books shown are not necessarily peer-reviewed.
              </p>
            </div>
          </div>
        </>
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
