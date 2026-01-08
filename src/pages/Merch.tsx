import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, ShoppingBag, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  printifyUrl: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Herb Loving Nerd Tee",
    description: "Show your love for herbal medicine with this comfortable, eco-friendly t-shirt.",
    price: "$24.99",
    image: herbNerdTshirt,
    category: "Apparel",
    printifyUrl: "https://printify.com"
  },
  {
    id: "2",
    name: "Plant Medicine Advocate Hoodie",
    description: "Stay cozy while advocating for natural health solutions. Perfect for cool evenings.",
    price: "$44.99",
    image: herbHoodie,
    category: "Apparel",
    printifyUrl: "https://printify.com"
  },
  {
    id: "3",
    name: "Powered by Plants Mug",
    description: "Start your morning right with this beautiful botanical ceramic mug.",
    price: "$16.99",
    image: herbMug,
    category: "Drinkware",
    printifyUrl: "https://printify.com"
  },
  {
    id: "4",
    name: "Botanical Herb Tote Bag",
    description: "Carry your herbs, books, or groceries in style with this canvas tote.",
    price: "$19.99",
    image: herbTote,
    category: "Accessories",
    printifyUrl: "https://printify.com"
  },
  {
    id: "5",
    name: "Herbal Sticker Pack",
    description: "Decorate your laptop, water bottle, or journal with these botanical herb stickers.",
    price: "$8.99",
    image: herbStickers,
    category: "Stickers",
    printifyUrl: "https://printify.com"
  }
];

const categories = ["All", "Apparel", "Drinkware", "Accessories", "Stickers"];

export default function Merch() {
  return (
    <>
      <Helmet>
        <title>Herb Lover Merch | Natural Health Store</title>
        <meta name="description" content="Shop herbal-themed merchandise including t-shirts, hoodies, mugs, tote bags, and stickers for plant medicine enthusiasts." />
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
                Herb Lover Merch
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Show your passion for plant medicine with our collection of herbal-themed merchandise. 
                Every purchase supports natural health education.
              </p>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-6 border-b border-border bg-card/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
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
                      <span className="absolute top-3 left-3 text-xs font-medium bg-primary/90 text-primary-foreground px-2 py-1 rounded-full">
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
                          href={product.printifyUrl}
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
