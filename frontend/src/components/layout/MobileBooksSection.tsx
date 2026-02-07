import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  affiliateUrl: string;
  category?: string;
}

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

export function MobileBooksSection() {
  return (
    <section className="lg:hidden py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <BookOpen className="h-6 w-6" />
          <h2 className="font-heading text-2xl font-semibold">Recommended Books</h2>
        </div>
        <p className="text-muted-foreground mb-6">Popular health & wellness reads</p>
        
        {/* Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {popularBooks.map((book) => (
            <a 
              key={book.id} 
              href={book.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-36 group"
            >
              <div className="relative mb-3">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-52 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-lg transition-colors" />
              </div>
              <span className="inline-block text-[10px] font-medium text-accent-foreground bg-accent/20 px-1.5 py-0.5 rounded mb-1">
                {book.category}
              </span>
              <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-primary font-medium">
                <ExternalLink className="h-3 w-3" />
                <span>Amazon</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            Browse All Books
          </Button>
        </div>

        {/* Affiliate Disclosure */}
        <p className="text-[10px] text-muted-foreground mt-6 text-center">
          <strong>Affiliate Disclosure:</strong> Links may be affiliate links. We earn a small commission at no extra cost to you.
        </p>
      </div>
    </section>
  );
}
