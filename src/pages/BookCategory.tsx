import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, ExternalLink, BookOpen, ArrowLeft, GraduationCap, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  allBooks,
  bookCategories,
  getBooksByCategory,
  getCategoryLabel,
  getCategoryDescription,
  type BookEntry,
  type BookSource,
} from "@/data/bookData";

function SourceBadge({ source }: { source: BookSource }) {
  const styles: Record<string, string> = {
    retailer: "bg-primary/10 text-primary hover:bg-primary/20",
    publisher: "bg-accent/50 text-accent-foreground hover:bg-accent/70",
    academic: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20",
  };

  const icons: Record<string, React.ReactNode> = {
    retailer: <ShoppingCart className="h-3 w-3" />,
    publisher: <BookOpen className="h-3 w-3" />,
    academic: <GraduationCap className="h-3 w-3" />,
  };

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${styles[source.type]}`}
    >
      {icons[source.type]}
      {source.name}
      <ExternalLink className="h-2.5 w-2.5" />
    </a>
  );
}

function DetailedBookCard({ book }: { book: BookEntry }) {
  return (
    <article className="group bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all">
      <div className="flex gap-5">
        <div className="w-20 h-28 bg-muted/50 rounded-lg flex-shrink-0 overflow-hidden">
          <img src={book.image} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-semibold text-foreground text-base leading-tight mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">{book.author}</p>
          <div className="flex items-center gap-2 mb-2">
            {book.year && <span className="text-xs text-muted-foreground">{book.year}</span>}
            {book.isbn && <span className="text-xs text-muted-foreground">ISBN: {book.isbn}</span>}
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{book.description}</p>
          {book.researchReference && (
            <p className="text-xs text-primary/80 mb-3 italic">{book.researchReference}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {book.sources.map((source) => (
              <SourceBadge key={source.name} source={source} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BookCategory() {
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState("");

  const categoryBooks = useMemo(() => {
    if (!category) return allBooks;
    return getBooksByCategory(category);
  }, [category]);

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return categoryBooks;
    const q = search.toLowerCase();
    return categoryBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }, [categoryBooks, search]);

  const label = category ? getCategoryLabel(category) : "All Categories";
  const description = category ? getCategoryDescription(category) : "Browse all medical reference books and health guides across every category.";

  return (
    <>
      <Helmet>
        <title>{label} Books | Reference Library | EvidenceMed</title>
        <meta name="description" content={`Browse ${label.toLowerCase()} books and medical references. ${description}`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">
          {/* Header */}
          <section className="py-10 border-b border-border bg-muted/20">
            <div className="container mx-auto px-4">
              <Link to="/merch" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Reference Library
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">{label}</h1>
              </div>
              <p className="text-muted-foreground max-w-2xl">{description}</p>

              {/* Category navigation */}
              <div className="flex flex-wrap gap-2 mt-6">
                {bookCategories.map((cat) => (
                  <Link key={cat.id} to={`/library/${cat.id}`}>
                    <Badge
                      variant={cat.id === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                    >
                      {cat.label}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Search + Results */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="relative max-w-md mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or topic…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {filteredBooks.length} {filteredBooks.length === 1 ? "reference" : "references"} found
              </p>

              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredBooks.map((book) => (
                    <DetailedBookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <p className="text-muted-foreground">No books match your search.</p>
                </div>
              )}
            </div>
          </section>

          {/* Source disclaimer */}
          <section className="py-6 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
                Links lead to publisher sites, Amazon, Smashwords, and academic databases (PubMed, Cochrane, WHO, NIH, EMA, MSKCC, Mayo Clinic). 
                Some links are affiliate links. All resources are listed for educational purposes only.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
