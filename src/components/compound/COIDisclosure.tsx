import { Scale, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface COIDisclosureProps {
  compoundName: string;
}

const COIDisclosure = ({ compoundName }: COIDisclosureProps) => {
  return (
    <section className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Scale className="w-4 h-4" />
        <h3 className="font-medium text-sm">Transparency & Disclosure</h3>
      </div>
      <ul className="space-y-2 text-xs text-muted-foreground">
        <li className="flex items-start gap-2">
          <FileCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
          <span>
            This {compoundName} profile is based exclusively on peer-reviewed research. No funding was received from supplement manufacturers.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <FileCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
          <span>
            Editorial content is independent of commercial partnerships. Affiliate links, if present, are confined to the{" "}
            <Link to="/merch" className="text-primary hover:underline">Reference Library</Link>.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <FileCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
          <span>
            See our full{" "}
            <Link to="/editorial-methodology" className="text-primary hover:underline">Editorial Methodology</Link>{" "}
            and{" "}
            <Link to="/terms-of-service#affiliate" className="text-primary hover:underline">Affiliate Disclosure</Link>.
          </span>
        </li>
      </ul>
    </section>
  );
};

export default COIDisclosure;
