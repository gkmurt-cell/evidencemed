import { ExternalLink, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PubMedArticle, 
  getDoiUrl, 
  getPubMedUrl, 
  getStudyType 
} from "@/hooks/usePubMedSearch";

interface PubMedArticleCardProps {
  article: PubMedArticle;
  showAbstract?: boolean;
}

const PubMedArticleCard = ({ article, showAbstract = true }: PubMedArticleCardProps) => {
  // Use empty array as fallback for missing fields
  const publicationType = (article as any).publicationType || [];
  const meshTerms = (article as any).meshTerms || [];
  
  const studyType = getStudyType(publicationType);
  const doiUrl = getDoiUrl(article.doi);
  const pubmedUrl = getPubMedUrl(article.pmid);

  return (
    <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="outline" className={studyType.color}>
          {studyType.type}
        </Badge>
        <span className="text-xs text-muted-foreground">{article.year}</span>
        <span className="text-xs text-muted-foreground">PMID: {article.pmid}</span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-tight">
        {article.title}
      </h3>

      {/* Authors */}
      {article.authors.length > 0 && (
        <p className="text-sm text-muted-foreground mb-2">
          <Users className="w-3 h-3 inline mr-1" />
          {article.authors.join(", ")}
          {article.authors.length >= 5 && " et al."}
        </p>
      )}

      {/* Journal */}
      <p className="text-sm text-primary font-medium mb-3">
        <FileText className="w-3 h-3 inline mr-1" />
        {article.journal}
      </p>

      {/* Abstract */}
      {showAbstract && article.abstract && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {article.abstract}
        </p>
      )}

      {/* MeSH Terms */}
      {meshTerms.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {meshTerms.slice(0, 4).map((term, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
            >
              {term}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" asChild>
          <a href={pubmedUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3 h-3 mr-1" />
            PubMed
          </a>
        </Button>
        {doiUrl && (
          <Button size="sm" variant="outline" asChild>
            <a href={doiUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-1" />
              DOI
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PubMedArticleCard;
