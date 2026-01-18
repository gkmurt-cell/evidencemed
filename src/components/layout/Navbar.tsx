import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, BookOpen, FlaskConical, Leaf, Search, Heart, ShoppingBag, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Conditions", href: "#conditions", icon: BookOpen },
    { name: "Research Library", href: "#research", icon: FlaskConical },
    { name: "Natural Compounds", href: "#compounds", icon: Leaf },
    { name: "Integrative Therapies", href: "/integrative-therapies", icon: Heart, isLink: true },
    { name: "Ayurveda", href: "/ayurveda", icon: Leaf, isLink: true },
    { name: "Merch", href: "/merch", icon: ShoppingBag, isLink: true },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              EvidenceMed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isLink ? (
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
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Always Visible Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search topics, conditions, therapies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 h-9 pl-10 bg-secondary/50 border-transparent focus:border-primary focus:bg-background"
              />
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
            {/* Mobile Search */}
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search conditions, research..."
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.isLink ? (
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
