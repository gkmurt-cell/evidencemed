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

export default ExploreMoreLink;
