import { useState } from "react";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Reference } from "@/components/compound/ReferencesSection";
import { toast } from "sonner";

interface CitationExportProps {
  references: Reference[];
  compoundName: string;
}

function toBibTeX(refs: Reference[], compoundName: string): string {
  return refs.map((ref, i) => {
    const key = `${compoundName.replace(/\s+/g, "")}_${ref.year}_${i + 1}`;
    return `@article{${key},
  title = {${ref.title}},
  author = {${ref.authors}},
  journal = {${ref.journal}},
  year = {${ref.year}},
  pmid = {${ref.pmid}}${ref.doi ? `,\n  doi = {${ref.doi}}` : ""}
}`;
  }).join("\n\n");
}

function toRIS(refs: Reference[]): string {
  return refs.map((ref) => {
    const lines = [
      "TY  - JOUR",
      `TI  - ${ref.title}`,
      `AU  - ${ref.authors}`,
      `JO  - ${ref.journal}`,
      `PY  - ${ref.year}`,
      `AN  - PMID:${ref.pmid}`,
    ];
    if (ref.doi) lines.push(`DO  - ${ref.doi}`);
    lines.push("ER  -");
    return lines.join("\n");
  }).join("\n\n");
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const CitationExport = ({ references, compoundName }: CitationExportProps) => {
  const [copied, setCopied] = useState(false);

  const handleBibTeX = () => {
    const content = toBibTeX(references, compoundName);
    downloadFile(content, `${compoundName.toLowerCase().replace(/\s+/g, "-")}-references.bib`, "application/x-bibtex");
    toast.success("BibTeX file downloaded");
  };

  const handleRIS = () => {
    const content = toRIS(references);
    downloadFile(content, `${compoundName.toLowerCase().replace(/\s+/g, "-")}-references.ris`, "application/x-research-info-systems");
    toast.success("RIS file downloaded");
  };

  const handleCopyAPA = async () => {
    const apa = references.map((ref) =>
      `${ref.authors} (${ref.year}). ${ref.title}. ${ref.journal}. PMID: ${ref.pmid}${ref.doi ? `. https://doi.org/${ref.doi}` : ""}`
    ).join("\n\n");
    await navigator.clipboard.writeText(apa);
    setCopied(true);
    toast.success("APA citations copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!references || references.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
          <Download className="w-3 h-3" />
          Export Citations
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleBibTeX}>
          <Download className="w-3.5 h-3.5 mr-2" />
          Download BibTeX (.bib)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRIS}>
          <Download className="w-3.5 h-3.5 mr-2" />
          Download RIS (.ris)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyAPA}>
          {copied ? <Check className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
          Copy APA Format
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CitationExport;
