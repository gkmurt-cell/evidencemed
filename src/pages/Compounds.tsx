import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, ArrowRight, Leaf, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { compoundsData, type Compound } from "@/data/compoundData";

const categories = [
  "All Categories",
  "Functional Mushroom",
  "Herbal Compound",
  "Alkaloid",
  "Adaptogen",
  "Essential Fatty Acid",
  "Essential Mineral",
  "Fat-Soluble Vitamin",
  "Mitochondrial Support",
  "Polyphenol",
  "Microbiome Support",
  "Longevity Compound",
  "Structural Protein",
  "Marine Superfood",
  "Mineral Complex",
  "Flavonoid",
  "Amino Acid",
  "Herbal Immune Support",
  "Performance Compound",
  "Blue-Green Algae",
];

const Compounds = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredCompounds = useMemo(() => {
    let results = compoundsData;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (compound) =>
          compound.name.toLowerCase().includes(query) ||
          compound.latinName.toLowerCase().includes(query) ||
          compound.description.toLowerCase().includes(query) ||
          compound.keyBenefits.some((b) => b.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (categoryFilter !== "All Categories") {
      results = results.filter((compound) => compound.category === categoryFilter);
    }

    return results;
  }, [searchQuery, categoryFilter]);

  return (
    <>
      <Helmet>
        <title>Natural Compounds Library | EvidenceMed - Herbal Medicine Research</title>
        <meta
          name="description"
          content="Browse our comprehensive library of natural compounds, herbs, and nutraceuticals with research summaries, safety information, and study references."
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 lg:pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Leaf className="w-4 h-4 inline mr-1" />
                Natural Compounds
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Herbal & Functional Medicine Library
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Comprehensive research profiles for herbs, nutraceuticals, and functional compounds.
                Each entry includes traditional use context, mechanisms of action, research summaries, 
                and safety considerations. All information is for educational purposes only.
              </p>
              <EducationalDisclaimer />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search compounds by name, benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-56">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">{filteredCompounds.length}</span>{" "}
              compounds
            </p>
          </div>

          {/* Compounds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCompounds.map((compound) => (
              <CompoundCard key={compound.id} compound={compound} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCompounds.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No compounds found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All Categories");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

interface CompoundCardProps {
  compound: Compound;
}

const CompoundCard = ({ compound }: CompoundCardProps) => {
  return (
    <Link
      to={`/compound/${compound.id}`}
      className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
        {compound.image}
      </div>

      <div className="relative">
        <Badge variant="secondary" className="mb-3">
          {compound.category}
        </Badge>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {compound.name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-4">{compound.latinName}</p>

        {/* Key Benefits Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {compound.keyBenefits.slice(0, 3).map((benefit) => (
            <span
              key={benefit}
              className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm font-medium text-primary">{compound.studies} studies</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default Compounds;
