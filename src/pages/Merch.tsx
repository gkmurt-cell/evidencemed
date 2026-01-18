import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, ShoppingBag, Leaf, BookOpen, ShoppingCart, Shirt, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import herbNerdTshirt from "@/assets/herb-nerd-tshirt.png";
import herbMug from "@/assets/herb-mug.png";
import herbTote from "@/assets/herb-tote.png";
import herbStickers from "@/assets/herb-stickers.png";
import herbHoodie from "@/assets/herb-hoodie.png";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  platform: string;
  platformUrl: string;
}

interface AffiliatePartner {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  categories: string[];
}

// Only educational/non-therapeutic affiliate partners per compliance guidelines
// EXCLUDED: iHerb, Vitacost (supplements/wellness products)
const affiliatePartners: AffiliatePartner[] = [
  {
    id: "amazon",
    name: "Amazon",
    description: "Educational books on herbalism, natural medicine, and health research.",
    icon: <ShoppingCart className="h-6 w-6" />,
    url: "https://amazon.com",
    categories: ["Books", "Reference", "Education"]
  },
  {
    id: "printify",
    name: "Printify",
    description: "Branded educational merchandise designed for plant medicine enthusiasts.",
    icon: <Shirt className="h-6 w-6" />,
    url: "https://printify.com",
    categories: ["Apparel", "Accessories", "Drinkware"]
  },
  {
    id: "smashwords",
    name: "Smashwords",
    description: "Independent ebooks on herbalism, natural medicine, and research guides.",
    icon: <BookOpen className="h-6 w-6" />,
    url: "https://smashwords.com",
    categories: ["Ebooks", "Research", "Guides"]
  },
  {
    id: "bookdepository",
    name: "Book Depository",
    description: "Worldwide free delivery on herbalism and natural medicine books.",
    icon: <BookOpen className="h-6 w-6" />,
    url: "https://bookdepository.com",
    categories: ["Books", "Textbooks", "Reference"]
  }
];

// Only allowed product types: Branded educational items, Books, Non-therapeutic tools
// EXCLUDED: Supplements, "Wellness" products, anything implying treatment
const products: Product[] = [
  // Printify Products - Branded Educational Items
  {
    id: "1",
    name: "Herb Loving Nerd Tee",
    description: "Show your passion for herbal education with this comfortable, eco-friendly t-shirt.",
    price: "$24.99",
    image: herbNerdTshirt,
    category: "Apparel",
    platform: "printify",
    platformUrl: "https://printify.com"
  },
  {
    id: "2",
    name: "Plant Medicine Advocate Hoodie",
    description: "Stay cozy while advocating for natural health education. Perfect for cool evenings.",
    price: "$44.99",
    image: herbHoodie,
    category: "Apparel",
    platform: "printify",
    platformUrl: "https://printify.com"
  },
  {
    id: "3",
    name: "Powered by Plants Mug",
    description: "Start your morning right with this beautiful botanical ceramic mug.",
    price: "$16.99",
    image: herbMug,
    category: "Drinkware",
    platform: "printify",
    platformUrl: "https://printify.com"
  },
  {
    id: "4",
    name: "Botanical Herb Tote Bag",
    description: "Carry your herbs, books, or groceries in style with this canvas tote.",
    price: "$19.99",
    image: herbTote,
    category: "Accessories",
    platform: "printify",
    platformUrl: "https://printify.com"
  },
  {
    id: "5",
    name: "Herbal Sticker Pack",
    description: "Decorate your laptop, water bottle, or journal with these botanical herb stickers.",
    price: "$8.99",
    image: herbStickers,
    category: "Stickers",
    platform: "printify",
    platformUrl: "https://printify.com"
  },
  // Amazon Products - Books & Non-therapeutic Tools Only
  {
    id: "6",
    name: "The Herbal Medicine-Maker's Handbook",
    description: "A comprehensive educational guide to understanding herbal preparations by James Green.",
    price: "$18.95",
    image: "/placeholder.svg",
    category: "Books",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  {
    id: "7",
    name: "Rosemary Gladstar's Medicinal Herbs",
    description: "An educational guide to growing, harvesting, and understanding healing plants.",
    price: "$16.99",
    image: "/placeholder.svg",
    category: "Books",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  {
    id: "8",
    name: "Encyclopedia of Herbal Medicine",
    description: "Comprehensive reference guide covering 550+ herbs and their traditional uses.",
    price: "$29.99",
    image: "/placeholder.svg",
    category: "Books",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  {
    id: "9",
    name: "The Modern Herbal Dispensatory",
    description: "Evidence-based reference for understanding herbal preparations and formulations.",
    price: "$24.95",
    image: "/placeholder.svg",
    category: "Books",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  {
    id: "10",
    name: "Herb Drying Rack",
    description: "Multi-layer mesh drying rack for preserving your homegrown herbs. Non-therapeutic tool.",
    price: "$24.99",
    image: "/placeholder.svg",
    category: "Tools",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  // Smashwords Products - Educational Ebooks
  {
    id: "11",
    name: "Modern Herbalism: Evidence-Based Guide",
    description: "An ebook exploring the science behind traditional herbal knowledge.",
    price: "$9.99",
    image: "/placeholder.svg",
    category: "Ebooks",
    platform: "smashwords",
    platformUrl: "https://smashwords.com"
  },
  {
    id: "12",
    name: "Understanding Adaptogens",
    description: "Educational deep dive into adaptogenic herbs and their research history.",
    price: "$7.99",
    image: "/placeholder.svg",
    category: "Ebooks",
    platform: "smashwords",
    platformUrl: "https://smashwords.com"
  },
  // Book Depository Products - Academic Books
  {
    id: "13",
    name: "Principles of Ayurvedic Medicine",
    description: "Academic textbook covering the foundational concepts of Ayurvedic practice.",
    price: "$34.99",
    image: "/placeholder.svg",
    category: "Books",
    platform: "bookdepository",
    platformUrl: "https://bookdepository.com"
  },
  {
    id: "14",
    name: "The Complete Guide to Herbal Research",
    description: "Reference guide for understanding and evaluating herbal medicine studies.",
    price: "$27.99",
    image: "/placeholder.svg",
    category: "Books",
    platform: "bookdepository",
    platformUrl: "https://bookdepository.com"
  }
];

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "amazon": return "bg-amber-500/90";
    case "printify": return "bg-emerald-500/90";
    case "smashwords": return "bg-blue-500/90";
    case "bookdepository": return "bg-red-500/90";
    default: return "bg-primary/90";
  }
};

const getPlatformLabel = (platform: string) => {
  return affiliatePartners.find(p => p.id === platform)?.name || platform;
};

export default function Merch() {
  return (
    <>
      <Helmet>
        <title>Educational Shop | EvidenceMed</title>
        <meta name="description" content="Educational merchandise, books, and resources for plant medicine enthusiasts. Revenue supports platform maintenance and natural health education." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Educational Shop
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Educational merchandise and affiliate resources. Revenue supports platform maintenance 
                and natural health education initiatives.
              </p>
              <p className="text-sm text-muted-foreground/80 bg-muted/50 inline-block px-4 py-2 rounded-full">
                <span className="font-medium">Affiliate Disclosure:</span> Links on this page may earn us a commission at no extra cost to you.
              </p>
            </div>
          </section>

          {/* Affiliate Partners Section */}
          <section className="py-12 bg-card/50 border-b border-border">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
                Our Trusted Partners
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {affiliatePartners.map((partner) => (
                  <a
                    key={partner.id}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`p-3 rounded-full ${getPlatformColor(partner.id)} text-white mb-2 group-hover:scale-110 transition-transform`}>
                      {partner.icon}
                    </div>
                    <span className="font-medium text-foreground text-sm">{partner.name}</span>
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {partner.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Products Section with Tabs */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto bg-transparent">
                  <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    All Products
                  </TabsTrigger>
                  <TabsTrigger value="books" className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-1" /> Books
                  </TabsTrigger>
                  <TabsTrigger value="printify" className="rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                    <Shirt className="h-4 w-4 mr-1" /> Branded Merch
                  </TabsTrigger>
                  <TabsTrigger value="ebooks" className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-1" /> Ebooks
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <ProductGrid products={products} />
                </TabsContent>
                <TabsContent value="books">
                  <ProductGrid products={products.filter(p => p.category === "Books")} />
                </TabsContent>
                <TabsContent value="printify">
                  <ProductGrid products={products.filter(p => p.platform === "printify")} />
                </TabsContent>
                <TabsContent value="ebooks">
                  <ProductGrid products={products.filter(p => p.category === "Ebooks")} />
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                Custom Orders Welcome
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Want a custom design or bulk order for your educational practice? We'd love to help bring your vision to life.
              </p>
              <Button size="lg" className="rounded-full">
                Contact Us
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <p className="text-muted-foreground">No products in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <article 
          key={product.id}
          className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="aspect-square bg-muted/30 p-4 relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className={`absolute top-3 left-3 text-xs font-medium ${getPlatformColor(product.platform)} text-white px-2 py-1 rounded-full`}>
              {getPlatformLabel(product.platform)}
            </span>
            <span className="absolute top-3 right-3 text-xs font-medium bg-secondary/90 text-secondary-foreground px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {product.price}
              </span>
              <a
                href={product.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <span>Shop</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}