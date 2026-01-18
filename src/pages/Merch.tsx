import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, ShoppingBag, Leaf, BookOpen, Pill, ShoppingCart, Shirt, Package } from "lucide-react";
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

const affiliatePartners: AffiliatePartner[] = [
  {
    id: "amazon",
    name: "Amazon",
    description: "Books, health products, and herbal supplies from the world's largest marketplace.",
    icon: <ShoppingCart className="h-6 w-6" />,
    url: "https://amazon.com",
    categories: ["Books", "Health", "Supplies"]
  },
  {
    id: "printify",
    name: "Printify",
    description: "Custom herbal-themed apparel, mugs, and accessories designed for plant medicine enthusiasts.",
    icon: <Shirt className="h-6 w-6" />,
    url: "https://printify.com",
    categories: ["Apparel", "Accessories", "Drinkware"]
  },
  {
    id: "smashwords",
    name: "Smashwords",
    description: "Independent ebooks on herbalism, natural medicine, and integrative health practices.",
    icon: <BookOpen className="h-6 w-6" />,
    url: "https://smashwords.com",
    categories: ["Ebooks", "Research", "Guides"]
  },
  {
    id: "iherb",
    name: "iHerb",
    description: "Premium supplements, herbs, and natural health products at competitive prices.",
    icon: <Pill className="h-6 w-6" />,
    url: "https://iherb.com",
    categories: ["Supplements", "Herbs", "Wellness"]
  },
  {
    id: "vitacost",
    name: "Vitacost",
    description: "Vitamins, supplements, and natural health products for your wellness journey.",
    icon: <Leaf className="h-6 w-6" />,
    url: "https://vitacost.com",
    categories: ["Vitamins", "Supplements", "Natural"]
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

const products: Product[] = [
  // Printify Products
  {
    id: "1",
    name: "Herb Loving Nerd Tee",
    description: "Show your love for herbal medicine with this comfortable, eco-friendly t-shirt.",
    price: "$24.99",
    image: herbNerdTshirt,
    category: "Apparel",
    platform: "printify",
    platformUrl: "https://printify.com"
  },
  {
    id: "2",
    name: "Plant Medicine Advocate Hoodie",
    description: "Stay cozy while advocating for natural health solutions. Perfect for cool evenings.",
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
  // Amazon Products
  {
    id: "6",
    name: "The Herbal Medicine-Maker's Handbook",
    description: "A comprehensive guide to making herbal remedies at home by James Green.",
    price: "$18.95",
    image: "/placeholder.svg",
    category: "Books",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  {
    id: "7",
    name: "Rosemary Gladstar's Medicinal Herbs",
    description: "A beginner's guide to growing, harvesting, and using healing plants.",
    price: "$16.99",
    image: "/placeholder.svg",
    category: "Books",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  {
    id: "8",
    name: "Herb Drying Rack",
    description: "Multi-layer mesh drying rack for preserving your homegrown herbs.",
    price: "$24.99",
    image: "/placeholder.svg",
    category: "Supplies",
    platform: "amazon",
    platformUrl: "https://amazon.com"
  },
  // iHerb Products
  {
    id: "9",
    name: "Organic Ashwagandha Root",
    description: "Premium organic ashwagandha root powder for stress support.",
    price: "$12.99",
    image: "/placeholder.svg",
    category: "Supplements",
    platform: "iherb",
    platformUrl: "https://iherb.com"
  },
  {
    id: "10",
    name: "Lion's Mane Mushroom Extract",
    description: "Organic lion's mane extract for cognitive support.",
    price: "$24.99",
    image: "/placeholder.svg",
    category: "Supplements",
    platform: "iherb",
    platformUrl: "https://iherb.com"
  },
  {
    id: "11",
    name: "Turmeric Curcumin Complex",
    description: "High-potency turmeric with enhanced bioavailability.",
    price: "$19.99",
    image: "/placeholder.svg",
    category: "Supplements",
    platform: "iherb",
    platformUrl: "https://iherb.com"
  },
  // Smashwords Products
  {
    id: "12",
    name: "Modern Herbalism: Evidence-Based Guide",
    description: "An ebook exploring the science behind traditional herbal remedies.",
    price: "$9.99",
    image: "/placeholder.svg",
    category: "Ebooks",
    platform: "smashwords",
    platformUrl: "https://smashwords.com"
  },
  {
    id: "13",
    name: "Adaptogens: Nature's Stress Response",
    description: "Deep dive into adaptogenic herbs and their research-backed benefits.",
    price: "$7.99",
    image: "/placeholder.svg",
    category: "Ebooks",
    platform: "smashwords",
    platformUrl: "https://smashwords.com"
  }
];

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "amazon": return "bg-amber-500/90";
    case "printify": return "bg-emerald-500/90";
    case "iherb": return "bg-green-600/90";
    case "smashwords": return "bg-blue-500/90";
    case "vitacost": return "bg-teal-500/90";
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
        <title>Shop & Resources | Natural Health Store</title>
        <meta name="description" content="Shop herbal-themed merchandise, books, supplements, and resources from trusted partners including Amazon, iHerb, Smashwords, and Printify." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Shop & Resources
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Discover herbal-themed merchandise, evidence-based books, quality supplements, and resources 
                from our trusted affiliate partners. Every purchase supports natural health education.
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                  <TabsTrigger value="printify" className="rounded-full data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                    <Shirt className="h-4 w-4 mr-1" /> Printify
                  </TabsTrigger>
                  <TabsTrigger value="amazon" className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    <ShoppingCart className="h-4 w-4 mr-1" /> Amazon
                  </TabsTrigger>
                  <TabsTrigger value="iherb" className="rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <Pill className="h-4 w-4 mr-1" /> iHerb
                  </TabsTrigger>
                  <TabsTrigger value="smashwords" className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-1" /> Smashwords
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <ProductGrid products={products} />
                </TabsContent>
                <TabsContent value="printify">
                  <ProductGrid products={products.filter(p => p.platform === "printify")} />
                </TabsContent>
                <TabsContent value="amazon">
                  <ProductGrid products={products.filter(p => p.platform === "amazon")} />
                </TabsContent>
                <TabsContent value="iherb">
                  <ProductGrid products={products.filter(p => p.platform === "iherb")} />
                </TabsContent>
                <TabsContent value="smashwords">
                  <ProductGrid products={products.filter(p => p.platform === "smashwords")} />
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
                Want a custom design or bulk order for your wellness practice? We'd love to help bring your vision to life.
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