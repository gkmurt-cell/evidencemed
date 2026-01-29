import { useState, useEffect } from "react";
import { ShoppingBag, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileStickyBottomBar() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMobile || !isVisible || !hasScrolled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-lg animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        {/* Trial CTA */}
        <Link to="/pricing" className="flex-1">
          <Button 
            size="sm" 
            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">7-Day Free Trial</span>
          </Button>
        </Link>

        {/* Shop Link */}
        <Link to="/merch">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 border-primary/30 hover:bg-primary/10"
          >
            <ShoppingBag className="h-4 w-4 text-primary" />
            <span className="hidden xs:inline">Shop</span>
          </Button>
        </Link>

        {/* Dismiss */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
