import { useState } from "react";
import { ExternalLink, FileText, Users, Bookmark, BookmarkCheck, Share2, Copy, Check, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  PubMedArticle, 
  getDoiUrl, 
  getPubMedUrl, 
  getStudyType 
} from "@/hooks/usePubMedSearch";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

interface PubMedArticleCardProps {
  article: PubMedArticle;
  showAbstract?: boolean;
  onSave?: (article: PubMedArticle) => void;
  isSaved?: boolean;
}

// Citation formatters
const formatBibTeX = (article: PubMedArticle): string => {
  const authors = article.authors.join(" and ");
  const key = `${article.authors[0]?.split(" ")[0] || "Unknown"}${article.year}`;
  return `@article{${key},
  author = {${authors}},
  title = {${article.title}},
  journal = {${article.journal}},
  year = {${article.year}},
  pmid = {${article.pmid}},
  ${article.doi ? `doi = {${article.doi}},` : ""}
  url = {${getPubMedUrl(article.pmid)}}
}`;
};

const formatRIS = (article: PubMedArticle): string => {
  let ris = `TY  - JOUR
TI  - ${article.title}
JO  - ${article.journal}
PY  - ${article.year}
`;
  article.authors.forEach(author => {
    ris += `AU  - ${author}\n`;
  });
  ris += `UR  - ${getPubMedUrl(article.pmid)}\n`;
  ris += `AN  - PMID:${article.pmid}\n`;
  if (article.doi) {
    ris += `DO  - ${article.doi}\n`;
  }
  ris += `ER  - \n`;
  return ris;
};

const formatAPA = (article: PubMedArticle): string => {
  const authorList = article.authors.length > 7
    ? `${article.authors.slice(0, 6).join(", ")}, ... ${article.authors[article.authors.length - 1]}`
    : article.authors.join(", ");
  
  const doi = article.doi ? ` https://doi.org/${article.doi}` : ` https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`;
  
  return `${authorList} (${article.year}). ${article.title}. ${article.journal}.${doi}`;
};

const PubMedArticleCard = ({ article, showAbstract = true, onSave, isSaved = false }: PubMedArticleCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  
  // Use empty array as fallback for missing fields
  const publicationType = (article as any).publicationType || [];
  const meshTerms = (article as any).meshTerms || [];
  
  const studyType = getStudyType(publicationType);
  const doiUrl = getDoiUrl(article.doi);
  const pubmedUrl = getPubMedUrl(article.pmid);

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Citation Copied",
      description: `${format} citation copied to clipboard`,
    });
  };

  const downloadCitation = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Citation Downloaded",
      description: `${filename} has been downloaded`,
    });
  };

  const shareArticle = (platform: string) => {
    const title = encodeURIComponent(article.title);
    const url = encodeURIComponent(pubmedUrl);
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${title}&body=Check out this research: ${pubmedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(pubmedUrl);
        toast({
          title: "Link Copied",
          description: "Article link copied to clipboard",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handleSaveArticle = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save articles",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("evidencemed_token");
      if (!token) throw new Error("No token");

      if (saved) {
        // Unsave
        const response = await fetch(
          `${API_URL}/api/user/saved-articles/${article.pmid}?token=${token}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setSaved(false);
          toast({ title: "Article removed from saved" });
        }
      } else {
        // Save
        const response = await fetch(
          `${API_URL}/api/user/saved-articles?token=${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pmid: article.pmid,
              title: article.title,
              authors: article.authors,
              journal: article.journal,
              year: article.year,
            }),
          }
        );
        if (response.ok) {
          setSaved(true);
          toast({ title: "Article saved to your collection" });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

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
          {article.authors.slice(0, 5).join(", ")}
          {article.authors.length > 5 && " et al."}
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
          {meshTerms.slice(0, 4).map((term: string, i: number) => (
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

        {/* Save Button */}
        <Button 
          size="sm" 
          variant={saved ? "default" : "outline"}
          onClick={handleSaveArticle}
          disabled={saving}
        >
          {saved ? (
            <BookmarkCheck className="w-3 h-3 mr-1" />
          ) : (
            <Bookmark className="w-3 h-3 mr-1" />
          )}
          {saved ? "Saved" : "Save"}
        </Button>

        {/* Citation Export Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Download className="w-3 h-3 mr-1" />
              Cite
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => copyToClipboard(formatAPA(article), "APA")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy APA
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyToClipboard(formatBibTeX(article), "BibTeX")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy BibTeX
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyToClipboard(formatRIS(article), "RIS")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy RIS
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => downloadCitation(formatBibTeX(article), `${article.pmid}.bib`)}>
              <Download className="w-4 h-4 mr-2" />
              Download BibTeX
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadCitation(formatRIS(article), `${article.pmid}.ris`)}>
              <Download className="w-4 h-4 mr-2" />
              Download RIS
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Share Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => shareArticle("twitter")}>
              Share on Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareArticle("linkedin")}>
              Share on LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareArticle("email")}>
              Share via Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => shareArticle("copy")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PubMedArticleCard;
