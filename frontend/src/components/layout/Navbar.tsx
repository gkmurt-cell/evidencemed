import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, LogOut, User, ArrowRight, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { searchContent, SearchItem } from "@/data/searchData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryColors: Record<string, string> = {
  condition: "text-rose-600",
  compound: "text-emerald-600",
  therapy: "text-violet-600",
  research: "text-blue-600",
};

const categoryLabels: Record<string, string> = {
  condition: "Condition",
  compound: "Compound",
  therapy: "Therapy",
  research: "Research",
};

// Dropdown menu items for each nav section
const navDropdowns: Record<string, { name: string; href: string }[]> = {
  "Medical Conditions": [
    { name: "Cancer Research", href: "/condition/cancer" },
    { name: "Cardiovascular Health", href: "/condition/cardiovascular" },
    { name: "Neurological Conditions", href: "/condition/neurological" },
    { name: "Metabolic Disorders", href: "/condition/metabolic" },
    { name: "Autoimmune Conditions", href: "/condition/autoimmune" },
    { name: "Mental Health", href: "/condition/mental-health" },
    { name: "Digestive Health", href: "/condition/digestive" },
    { name: "View All Conditions", href: "/conditions" },
  ],
  "Research Library": [
    { name: "Search PubMed", href: "/research" },
    { name: "Browse Conditions", href: "/conditions" },
    { name: "Browse Compounds", href: "/compounds" },
    { name: "Research Alerts", href: "/research#alerts" },
    { name: "Browse Full Library", href: "/research" },
  ],
  "Natural Compounds": [
    { name: "Vitamins & Minerals", href: "/compounds?category=Essential+Mineral" },
    { name: "Herbal Extracts", href: "/compounds?category=Herbal+Compound" },
    { name: "Amino Acids", href: "/compounds?category=Amino+Acid" },
    { name: "Antioxidants", href: "/compounds?category=Polyphenol" },
    { name: "Adaptogens", href: "/compounds?category=Adaptogen" },
    { name: "Functional Mushrooms", href: "/compounds?category=Functional+Mushroom" },
    { name: "View All Compounds", href: "/compounds" },
  ],
  "Integrative Therapies": [
    { name: "Ayurveda", href: "/ayurveda" },
    { name: "Chinese Medicine (TCM)", href: "/tcm" },
    { name: "Naturopathic Medicine", href: "/naturopathy" },
    { name: "Functional Medicine", href: "/functional-medicine" },
    { name: "Homeopathy", href: "/homeopathy" },
    { name: "Aromatherapy", href: "/aromatherapy" },
    { name: "Explore All Therapies", href: "/therapies" },
  ],
};

// Hover Dropdown Component
const NavDropdown = ({ 
  name, 
  href, 
  items 
}: { 
  name: string; 
  href: string; 
  items: { name: string; href: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={href}
        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary flex items-center gap-1"
      >
        {name}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>
      
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-card border border-border rounded-xl shadow-lg py-2 min-w-[220px] animate-in fade-in-0 zoom-in-95 duration-100">
            {items.map((item, index) => (
              <Link
                key={item.href + index}
                to={item.href}
                className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted/50 ${
                  item.name.startsWith("View All") || item.name.startsWith("Browse") || item.name.startsWith("Explore")
                    ? "text-primary font-medium border-t border-border mt-1 pt-3"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = searchContent(searchQuery).slice(0, 8);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (item: SearchItem) => {
    navigate(item.link);
    setSearchQuery("");
    setShowSuggestions(false);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Main navigation - Original build headings
  const navLinks = [
    { name: "Medical Conditions", href: "/conditions" },
    { name: "Research Library", href: "/research" },
    { name: "Natural Compounds", href: "/compounds" },
    { name: "Integrative Therapies", href: "/therapies" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-shadow duration-200 group-hover:shadow-md group-hover:shadow-primary/25">
              <span className="text-primary-foreground font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
              EvidenceMed
            </span>
          </Link>

          {/* Desktop Navigation with Hover Dropdowns */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavDropdown
                key={link.name}
                name={link.name}
                href={link.href}
                items={navDropdowns[link.name] || []}
              />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Bar with Autocomplete */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search archive..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  className="w-64 h-9 pl-10 bg-secondary/50 border-transparent focus:border-primary focus:bg-background"
                />
              </form>

              {/* Autocomplete Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="py-2">
                    {suggestions.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleSuggestionClick(item)}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                          index === selectedIndex 
                            ? "bg-primary/10" 
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground truncate">
                              {item.title}
                            </span>
                            <span className={`text-xs font-medium ${categoryColors[item.category]}`}>
                              {categoryLabels[item.category]}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-border bg-muted/30">
                    <button
                      onClick={handleSearch}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" />
                      See all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            {/* Mobile Search */}
            <div className="px-4 pb-4 relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search archive..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-10 w-full"
                  />
                </div>
              </form>
              
              {showSuggestions && (
                <div className="absolute left-4 right-4 top-full mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {suggestions.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleSuggestionClick(item)}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 ${
                          index === selectedIndex ? "bg-primary/10" : ""
                        }`}
                      >
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-foreground truncate block">
                            {item.title}
                          </span>
                          <span className={`text-xs ${categoryColors[item.category]}`}>
                            {categoryLabels[item.category]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Nav with Expandable Sections */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === link.name ? null : link.name)}
                    className="w-full px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center justify-between"
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobile === link.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedMobile === link.name && (
                    <div className="pl-4 pb-2 animate-in slide-in-from-top-2 duration-200">
                      {navDropdowns[link.name]?.map((item, index) => (
                        <Link
                          key={item.href + index}
                          to={item.href}
                          className={`block px-4 py-2.5 text-sm transition-colors rounded-lg ${
                            item.name.startsWith("View All") || item.name.startsWith("Browse") || item.name.startsWith("Explore")
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                {user ? (
                  <>
                    <p className="px-4 text-sm text-muted-foreground">{user.email}</p>
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Button variant="outline" className="mx-4" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="mx-4" asChild>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
