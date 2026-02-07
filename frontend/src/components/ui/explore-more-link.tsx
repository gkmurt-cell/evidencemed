import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ExploreMoreLinkProps {
  href: string;
  children: React.ReactNode;
}

const ExploreMoreLink = ({ href, children }: ExploreMoreLinkProps) => {
  return (
    <Link 
      to={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
};

interface RelatedLink {
  label: string;
  href: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

export const RelatedLinks = ({ title, links }: RelatedLinksProps) => {
  if (!links || links.length === 0) return null;
  
  return (
    <div className="mt-4 pt-4 border-t border-border">
      {title && <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>}
      <div className="flex flex-wrap gap-2">
        {links.map((link, idx) => (
          <Link 
            key={idx}
            to={link.href}
            className="text-xs text-primary hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreMoreLink;
