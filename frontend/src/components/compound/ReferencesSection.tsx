import { ExternalLink, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Reference {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
}

interface ReferencesSectionProps {
  references: Reference[];
  compoundName: string;
}

const ReferencesSection = ({ references, compoundName }: ReferencesSectionProps) => {
  if (!references || references.length === 0) return null;

  const getPubMedUrl = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
  const getDoiUrl = (doi: string) => `https://doi.org/${doi}`;

  return (
    <section className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-serif text-xl font-semibold">Scientific References</h2>
        </div>
        <Badge variant="secondary">{references.length} citations</Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Key peer-reviewed studies supporting the research claims for {compoundName}. 
        All references link directly to PubMed for verification.
      </p>

      <div className="space-y-4">
        {references.map((ref, index) => (
          <div
            key={ref.pmid}
            className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
                [{index + 1}]
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1 text-sm leading-snug">
                  {ref.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {ref.authors}
                </p>
                <p className="text-xs text-primary font-medium mb-3">
                  {ref.journal} ({ref.year})
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild className="h-7 text-xs">
                    <a 
                      href={getPubMedUrl(ref.pmid)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      PMID: {ref.pmid}
                    </a>
                  </Button>
                  {ref.doi && (
                    <Button size="sm" variant="outline" asChild className="h-7 text-xs">
                      <a 
                        href={getDoiUrl(ref.doi)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        DOI
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Verification:</strong> Click any PMID or DOI link 
          to view the full study on PubMed or the publisher's site. We encourage independent 
          verification of all research claims.
        </p>
      </div>
    </section>
  );
};

export default ReferencesSection;
