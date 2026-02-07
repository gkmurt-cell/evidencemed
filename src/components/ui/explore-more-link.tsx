import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreMoreLinkProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "subtle" | "accent";
  className?: string;
}

export const ExploreMoreLink = ({
  to,
  label,
  icon: Icon,
  variant = "default",
  className,
}: ExploreMoreLinkProps) => {
  const baseStyles = "inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group";
  
  const variantStyles = {
    default: "text-primary hover:text-primary/80",
    subtle: "text-muted-foreground hover:text-foreground",
    accent: "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300",
  };

  return (
    <Link to={to} className={cn(baseStyles, variantStyles[variant], className)}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
};

interface RelatedLinksProps {
  title?: string;
  links: Array<{
    to: string;
    label: string;
    icon?: LucideIcon;
  }>;
  className?: string;
}

export const RelatedLinks = ({ title, links, className }: RelatedLinksProps) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {title && (
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {title}
        </span>
      )}
      {links.map((link, index) => (
        <ExploreMoreLink
          key={index}
          to={link.to}
          label={link.label}
          icon={link.icon}
          variant="subtle"
        />
      ))}
    </div>
  );
};

export default ExploreMoreLink;
