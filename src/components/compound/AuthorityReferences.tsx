import { ExternalLink, BookOpen } from "lucide-react";

interface AuthorityReferencesProps {
  compoundName: string;
  latinName: string;
  category: string;
}

interface AuthoritySource {
  name: string;
  shortName: string;
  getUrl: (name: string, latin: string) => string;
  description: string;
}

const authoritySources: AuthoritySource[] = [
  {
    name: "PubMed / NCBI",
    shortName: "PubMed",
    getUrl: (name) =>
      `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(name)}`,
    description: "Peer-reviewed biomedical literature",
  },
  {
    name: "Cochrane Library",
    shortName: "Cochrane",
    getUrl: (name) =>
      `https://www.cochranelibrary.com/search?q=${encodeURIComponent(name)}`,
    description: "Systematic reviews & meta-analyses",
  },
  {
    name: "ClinicalTrials.gov",
    shortName: "ClinicalTrials",
    getUrl: (name) =>
      `https://clinicaltrials.gov/search?term=${encodeURIComponent(name)}`,
    description: "Active & completed clinical trials",
  },
  {
    name: "WHO Monographs",
    shortName: "WHO",
    getUrl: (_name, latin) =>
      `https://apps.who.int/iris/discover?query=${encodeURIComponent(latin || _name)}`,
    description: "Medicinal plant monographs",
  },
  {
    name: "NIH Office of Dietary Supplements",
    shortName: "NIH ODS",
    getUrl: (name) =>
      `https://ods.od.nih.gov/factsheets/list-all/?query=${encodeURIComponent(name)}`,
    description: "Nutrient & supplement fact sheets",
  },
  {
    name: "European Medicines Agency",
    shortName: "EMA",
    getUrl: (name) =>
      `https://www.ema.europa.eu/en/search?search_api_fulltext=${encodeURIComponent(name)}&f%5B0%5D=ema_search_categories%3AHerbal%20medicines`,
    description: "EU herbal monographs & assessments",
  },
  {
    name: "Memorial Sloan Kettering",
    shortName: "MSKCC",
    getUrl: (name) =>
      `https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs/search?keys=${encodeURIComponent(name)}`,
    description: "Integrative medicine database",
  },
  {
    name: "Mayo Clinic",
    shortName: "Mayo Clinic",
    getUrl: (name) =>
      `https://www.mayoclinic.org/search/search-results?q=${encodeURIComponent(name)}`,
    description: "Evidence-based health information",
  },
  {
    name: "Natural Medicines Database",
    shortName: "Natural Medicines",
    getUrl: (name) =>
      `https://naturalmedicines.therapeuticresearch.com/databases/search?q=${encodeURIComponent(name)}`,
    description: "Comprehensive efficacy & safety data",
  },
];

const AuthorityReferences = ({ compoundName, latinName, category }: AuthorityReferencesProps) => {
  return (
    <section className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 text-primary mb-3">
        <BookOpen className="w-5 h-5" />
        <h2 className="font-serif text-lg font-semibold">Institutional References</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Cross-reference {compoundName} across peer-reviewed databases and institutional resources.
      </p>
      <ul className="space-y-1.5">
        {authoritySources.map((source) => (
          <li key={source.shortName}>
            <a
              href={source.getUrl(compoundName, latinName)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/70 transition-colors group"
            >
              <div className="min-w-0">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {source.shortName}
                </span>
                <span className="hidden sm:inline text-muted-foreground ml-1.5 text-xs">
                  — {source.description}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AuthorityReferences;
