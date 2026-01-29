import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InlinePromoCardProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: LucideIcon;
  variant?: "primary" | "accent" | "muted";
  className?: string;
}

export function InlinePromoCard({
  title,
  description,
  ctaText,
  ctaLink,
  icon: Icon,
  variant = "primary",
  className,
}: InlinePromoCardProps) {
  const variantStyles = {
    primary: "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-primary/20",
    accent: "bg-gradient-to-r from-accent/20 via-accent/15 to-accent/10 border-accent/30",
    muted: "bg-muted/50 border-border",
  };

  const iconStyles = {
    primary: "bg-primary/20 text-primary",
    accent: "bg-accent/30 text-accent-foreground",
    muted: "bg-secondary text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "lg:hidden mx-4 my-6 p-4 rounded-xl border",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-2.5 rounded-lg shrink-0", iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          <Link to={ctaLink}>
            <Button
              size="sm"
              variant={variant === "primary" ? "default" : "secondary"}
              className="h-8 text-xs"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
