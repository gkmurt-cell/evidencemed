import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, BookOpen, FlaskConical, Leaf, Search, Heart, ShoppingBag, LogOut, User, ArrowRight } from "lucide-react";
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

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update suggestions when query changes
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

  // Close suggestions when clicking outside
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

  const navLinks = [
    { name: "Medical Conditions", href: "/#conditions", icon: BookOpen, isLink: true, isHashLink: true },
    { name: "Research Library", href: "/research", icon: FlaskConical, isLink: true },
    { name: "Natural Compounds", href: "/compounds", icon: Leaf, isLink: true },
    { name: "Integrative Therapies", href: "/integrative-therapies", icon: Heart, isLink: true },
  ];

  const handleHashLinkClick = (e: React.MouseEvent, href: string) => {
    const hash = href.split('#')[1];
    if (hash) {
      // If already on home page, scroll directly
      if (window.location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home, then scroll after load
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const resourcesDropdown = [
    { name: "Reference Library & Shop", href: "/merch", icon: ShoppingBag, description: "Books, supplements & educational resources" },
    { name: "Pricing & Plans", href: "/pricing", icon: BookOpen, description: "Individual, professional & institutional plans", isLink: true },
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
              <Leaf className="w-5 h-5 text-primary-foreground transition-transform duration-200 group-hover:rotate-12" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
              EvidenceMed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isHashLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleHashLinkClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {link.name}
                </a>
              ) : link.isLink ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {link.name}
                </a>
              )
            ))}
            
            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
                Resources
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {resourcesDropdown.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                  placeholder="Search topics, conditions, therapies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  className="w-72 h-9 pl-10 bg-secondary/50 border-transparent focus:border-primary focus:bg-background"
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
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <a href="#trial-signup">Start Free Trial</a>
                </Button>
              </>
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
            {/* Mobile Search with Autocomplete */}
            <div className="px-4 pb-4 relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search conditions, research..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-10 w-full"
                  />
                </div>
              </form>
              
              {/* Mobile Autocomplete */}
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
            
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.isHashLink ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-3"
                    onClick={(e) => {
                      handleHashLinkClick(e, link.href);
                      setIsOpen(false);
                    }}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {link.name}
                  </a>
                ) : link.isLink ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {link.name}
                  </a>
                )
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                {user ? (
                  <>
                    <p className="px-4 text-sm text-muted-foreground">{user.email}</p>
                    <Button variant="outline" className="w-full" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <a href="#trial-signup" onClick={() => setIsOpen(false)}>Start Free Trial</a>
                    </Button>
                  </>
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
