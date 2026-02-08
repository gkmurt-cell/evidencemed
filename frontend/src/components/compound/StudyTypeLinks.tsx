import { ExternalLink, FlaskConical, TestTube, Users, Microscope, Info } from "lucide-react";

interface StudyTypeLinksProps {
  compoundName: string;
  latinName?: string;
}

// PubMed study type filters using article type tags
const studyTypes = [
  {
    label: "Clinical Trials",
    icon: Users,
    // PubMed filter for clinical trials
    filter: "Clinical Trial[pt]",
    description: "Human clinical studies",
  },
  {
    label: "Reviews",
    icon: FlaskConical,
    // PubMed filter for reviews and meta-analyses
    filter: "(Review[pt] OR Meta-Analysis[pt] OR Systematic Review[pt])",
    description: "Systematic reviews & meta-analyses",
  },
  {
    label: "In Vitro",
    icon: TestTube,
    // Cell culture and in vitro studies
    filter: "(in vitro[tiab] OR cell culture[tiab] OR cell line[tiab])",
    description: "Cell culture studies",
  },
  {
    label: "Animal Studies",
    icon: Microscope,
    // Animal model studies
    filter: "(animal[tiab] OR mice[tiab] OR rat[tiab] OR mouse[tiab] OR rats[tiab] OR rodent[tiab] OR in vivo[tiab])",
    description: "Preclinical animal research",
  },
];

const buildPubMedUrl = (compoundName: string, latinName: string | undefined, studyFilter: string) => {
  // Build search query with compound name and optional Latin name
  let searchTerms = `"${compoundName}"`;
  if (latinName && latinName !== compoundName) {
    searchTerms = `("${compoundName}" OR "${latinName}")`;
  }
  
  const query = `${searchTerms} AND ${studyFilter}`;
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
};

const StudyTypeLinks = ({ compoundName, latinName }: StudyTypeLinksProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs text-muted-foreground">
          Explore research by study type on PubMed:
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {studyTypes.map((studyType) => {
          const Icon = studyType.icon;
          const url = buildPubMedUrl(compoundName, latinName, studyType.filter);
          
          return (
            <a
              key={studyType.label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all group"
              title={`Search PubMed for ${compoundName} ${studyType.label}`}
            >
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {studyType.label}
                </p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-opacity" />
            </a>
          );
        })}
      </div>
      <div className="flex items-start gap-1.5 mt-3 p-2 bg-muted/30 rounded text-[10px] text-muted-foreground">
        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
        <span>
          Links open filtered searches on PubMed.gov. Results depend on available published research for each study type.
        </span>
      </div>
    </div>
  );
};

export default StudyTypeLinks;
