import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Brain, Heart, Activity, Pill, Dna, Shield, Zap, Bone, Sparkles, Wind, Stethoscope, Baby, Eye, Ear, Smile, Droplets, LucideIcon, Search, X, Leaf, BookOpen } from "lucide-react";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import DemoDisclaimer from "@/components/layout/DemoDisclaimer";
import { RelatedLinks } from "@/components/ui/explore-more-link";

interface Condition {
  id: string;
  name: string;
  description: string;
  studies: string;
  icon: LucideIcon;
  color: string;
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  conditions: Condition[];
}

const categories: Category[] = [
  {
    id: "featured",
    name: "Featured",
    icon: Sparkles,
    conditions: [
      { id: "cancer", name: "Cancer Research", description: "Complementary therapy studies including herbal compounds", studies: "2,400+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "neurological", name: "Neurological", description: "Dementia, Parkinson's, Alzheimer's and cognitive health", studies: "1,800+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "cardiovascular", name: "Cardiovascular", description: "Heart disease, hypertension, and circulatory studies", studies: "1,500+", icon: Heart, color: "bg-red-500/10 text-red-600" },
      { id: "metabolic", name: "Metabolic", description: "Diabetes, obesity, and metabolic syndrome research", studies: "1,200+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
    ],
  },
  {
    id: "autoimmune",
    name: "Autoimmune",
    icon: Shield,
    conditions: [
      { id: "lupus", name: "Lupus (SLE)", description: "Systemic autoimmune disease affecting multiple organs", studies: "480+", icon: Shield, color: "bg-teal-500/10 text-teal-600" },
      { id: "rheumatoid-arthritis", name: "Rheumatoid Arthritis", description: "Chronic autoimmune joint inflammation", studies: "720+", icon: Bone, color: "bg-orange-500/10 text-orange-600" },
      { id: "multiple-sclerosis", name: "Multiple Sclerosis", description: "Autoimmune disease affecting the CNS", studies: "560+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "hashimotos", name: "Hashimoto's", description: "Autoimmune thyroid condition", studies: "280+", icon: Shield, color: "bg-teal-500/10 text-teal-600" },
      { id: "celiac", name: "Celiac Disease", description: "Autoimmune reaction to gluten", studies: "380+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "sjogrens", name: "Sjögren's Syndrome", description: "Affects moisture-producing glands", studies: "165+", icon: Droplets, color: "bg-blue-500/10 text-blue-600" },
      { id: "graves-disease", name: "Graves' Disease", description: "Autoimmune hyperthyroidism", studies: "190+", icon: Zap, color: "bg-yellow-500/10 text-yellow-600" },
      { id: "scleroderma", name: "Scleroderma", description: "Hardening of skin and connective tissue", studies: "175+", icon: Shield, color: "bg-teal-500/10 text-teal-600" },
    ],
  },
  {
    id: "skin",
    name: "Skin",
    icon: Smile,
    conditions: [
      { id: "psoriasis", name: "Psoriasis", description: "Autoimmune skin condition causing scaly patches", studies: "580+", icon: Smile, color: "bg-pink-500/10 text-pink-600" },
      { id: "eczema", name: "Eczema", description: "Chronic inflammatory skin condition", studies: "620+", icon: Smile, color: "bg-pink-500/10 text-pink-600" },
      { id: "acne", name: "Acne", description: "Clogged pores and skin inflammation", studies: "340+", icon: Smile, color: "bg-pink-500/10 text-pink-600" },
      { id: "rosacea", name: "Rosacea", description: "Chronic facial redness and irritation", studies: "180+", icon: Smile, color: "bg-pink-500/10 text-pink-600" },
      { id: "vitiligo", name: "Vitiligo", description: "Loss of skin pigmentation", studies: "145+", icon: Smile, color: "bg-pink-500/10 text-pink-600" },
      { id: "dermatitis", name: "Contact Dermatitis", description: "Skin inflammation from allergens", studies: "220+", icon: Smile, color: "bg-pink-500/10 text-pink-600" },
    ],
  },
  {
    id: "digestive",
    name: "Digestive",
    icon: Activity,
    conditions: [
      { id: "ibs", name: "IBS", description: "Irritable bowel syndrome", studies: "520+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "ibd", name: "IBD", description: "Inflammatory bowel disease", studies: "680+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "crohns", name: "Crohn's Disease", description: "Inflammatory digestive tract condition", studies: "420+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "ulcerative-colitis", name: "Ulcerative Colitis", description: "Colon and rectum inflammation", studies: "380+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "gerd", name: "GERD", description: "Acid reflux and heartburn", studies: "290+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "fatty-liver", name: "Fatty Liver", description: "Non-alcoholic fatty liver disease", studies: "420+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "sibo", name: "SIBO", description: "Small intestinal bacterial overgrowth", studies: "125+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
      { id: "leaky-gut", name: "Leaky Gut", description: "Intestinal permeability", studies: "180+", icon: Activity, color: "bg-amber-500/10 text-amber-600" },
    ],
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: Brain,
    conditions: [
      { id: "depression", name: "Depression", description: "Major depressive disorder", studies: "1,100+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "anxiety", name: "Anxiety", description: "Generalized anxiety and panic disorders", studies: "890+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "insomnia", name: "Insomnia", description: "Sleep disorders and quality issues", studies: "620+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "adhd", name: "ADHD", description: "Attention-deficit/hyperactivity disorder", studies: "560+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "autism", name: "Autism Spectrum", description: "Developmental and behavioral condition", studies: "480+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "ptsd", name: "PTSD", description: "Post-traumatic stress disorder", studies: "420+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "bipolar", name: "Bipolar Disorder", description: "Mood disorder with episodes", studies: "380+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
      { id: "ocd", name: "OCD", description: "Obsessive-compulsive disorder", studies: "280+", icon: Brain, color: "bg-violet-500/10 text-violet-600" },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory",
    icon: Wind,
    conditions: [
      { id: "asthma", name: "Asthma", description: "Chronic airway inflammation", studies: "780+", icon: Wind, color: "bg-sky-500/10 text-sky-600" },
      { id: "allergies", name: "Allergies", description: "Environmental allergies and hay fever", studies: "680+", icon: Wind, color: "bg-sky-500/10 text-sky-600" },
      { id: "copd", name: "COPD", description: "Chronic obstructive pulmonary disease", studies: "520+", icon: Wind, color: "bg-sky-500/10 text-sky-600" },
      { id: "sleep-apnea", name: "Sleep Apnea", description: "Breathing interruptions during sleep", studies: "380+", icon: Wind, color: "bg-sky-500/10 text-sky-600" },
      { id: "sinusitis", name: "Sinusitis", description: "Chronic sinus inflammation", studies: "185+", icon: Wind, color: "bg-sky-500/10 text-sky-600" },
      { id: "bronchitis", name: "Bronchitis", description: "Bronchial tube inflammation", studies: "220+", icon: Wind, color: "bg-sky-500/10 text-sky-600" },
    ],
  },
  {
    id: "cancer",
    name: "Cancer Types",
    icon: Dna,
    conditions: [
      { id: "breast-cancer", name: "Breast Cancer", description: "Breast tissue malignancy research", studies: "1,200+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "lung-cancer", name: "Lung Cancer", description: "Pulmonary malignancy studies", studies: "890+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "prostate-cancer", name: "Prostate Cancer", description: "Prostate malignancy research", studies: "780+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "colorectal-cancer", name: "Colorectal Cancer", description: "Colon and rectal cancer studies", studies: "650+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "pancreatic-cancer", name: "Pancreatic Cancer", description: "Pancreatic malignancy research", studies: "420+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "leukemia", name: "Leukemia", description: "Blood cancer research", studies: "560+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "lymphoma", name: "Lymphoma", description: "Lymphatic system cancer", studies: "480+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "skin-cancer", name: "Skin Cancer", description: "Melanoma and skin malignancies", studies: "520+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "ovarian-cancer", name: "Ovarian Cancer", description: "Ovarian malignancy research", studies: "380+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "liver-cancer", name: "Liver Cancer", description: "Hepatocellular carcinoma studies", studies: "450+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "stomach-cancer", name: "Stomach Cancer", description: "Gastric malignancy research", studies: "340+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "bladder-cancer", name: "Bladder Cancer", description: "Urothelial carcinoma studies", studies: "280+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "kidney-cancer", name: "Kidney Cancer", description: "Renal cell carcinoma research", studies: "320+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "thyroid-cancer", name: "Thyroid Cancer", description: "Thyroid malignancy studies", studies: "290+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "brain-cancer", name: "Brain Cancer", description: "Glioma and CNS tumor research", studies: "410+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "esophageal-cancer", name: "Esophageal Cancer", description: "Esophageal malignancy studies", studies: "220+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "cervical-cancer", name: "Cervical Cancer", description: "Cervical malignancy research", studies: "350+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
      { id: "multiple-myeloma", name: "Multiple Myeloma", description: "Plasma cell cancer research", studies: "310+", icon: Dna, color: "bg-rose-500/10 text-rose-600" },
    ],
  },
  {
    id: "womens-health",
    name: "Women's Health",
    icon: Heart,
    conditions: [
      { id: "pcos", name: "PCOS", description: "Polycystic ovary syndrome", studies: "480+", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
      { id: "endometriosis", name: "Endometriosis", description: "Uterine tissue growth disorder", studies: "380+", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
      { id: "menopause", name: "Menopause", description: "Hormonal transition research", studies: "520+", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
      { id: "fibroids", name: "Uterine Fibroids", description: "Non-cancerous uterine growths", studies: "245+", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
      { id: "fertility", name: "Fertility Issues", description: "Reproductive health research", studies: "380+", icon: Baby, color: "bg-pink-500/10 text-pink-600" },
      { id: "pms", name: "PMS/PMDD", description: "Premenstrual syndrome research", studies: "290+", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
    ],
  },
];

const ConditionsSection = () => {
  const [activeCategory, setActiveCategory] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conditions across all categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories.map(category => ({
      ...category,
      conditions: category.conditions.filter(condition =>
        condition.name.toLowerCase().includes(query) ||
        condition.description.toLowerCase().includes(query)
      )
    })).filter(category => category.conditions.length > 0);
  }, [searchQuery]);

  // Get all matching conditions for search display
  const allMatchingConditions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const matches: Condition[] = [];
    categories.forEach(category => {
      category.conditions.forEach(condition => {
        if (condition.name.toLowerCase().includes(query) ||
            condition.description.toLowerCase().includes(query)) {
          matches.push(condition);
        }
      });
    });
    return matches;
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section id="conditions" className="py-10 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Conditions Database
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            200+ Health Conditions
            <br />
            <span className="text-muted-foreground">Research Coverage</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Each condition includes peer-reviewed research on complementary approaches, 
            natural compounds, and investigational studies.
          </p>
          <RelatedLinks
            title="Related:"
            links={[
              { to: "/compounds", label: "Compounds Library", icon: Leaf },
              { to: "/research", label: "Research Studies", icon: BookOpen },
              { to: "/integrative-therapies", label: "Therapies", icon: Pill },
            ]}
            className="justify-center mb-6"
          />
          <DemoDisclaimer compact className="mb-4" />
          <EducationalDisclaimer />
        </div>

        {/* Search Box */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conditions (e.g., lupus, eczema, diabetes...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {isSearching && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Found {allMatchingConditions.length} matching condition{allMatchingConditions.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Search Results or Category Tabs */}
        {isSearching ? (
          // Show search results
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allMatchingConditions.map((condition, index) => (
              <Link
                key={condition.id}
                to={`/condition/${condition.id}`}
                className="group p-5 rounded-xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className={`w-10 h-10 rounded-lg ${condition.color} flex items-center justify-center mb-3`}>
                  <condition.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                  {condition.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {condition.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">
                    {condition.studies} studies
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
            {allMatchingConditions.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No conditions found matching "{searchQuery}"</p>
                <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-4">
                  Clear search
                </Button>
              </div>
            )}
          </div>
        ) : (
          // Show category tabs
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="h-auto flex-wrap gap-1 bg-muted/50 p-1.5">
                {filteredCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm data-[state=active]:bg-background"
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {filteredCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.conditions.map((condition, index) => (
                    <Link
                      key={condition.id}
                      to={`/condition/${condition.id}`}
                      className="group p-5 rounded-xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <div className={`w-10 h-10 rounded-lg ${condition.color} flex items-center justify-center mb-3`}>
                        <condition.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        {condition.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {condition.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary">
                          {condition.studies} studies
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* CTA */}
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link to="/research">
              Browse All Research
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;
