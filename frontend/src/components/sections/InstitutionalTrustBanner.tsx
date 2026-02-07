import { cn } from "@/lib/utils";

interface InstitutionalTrustBannerProps {
  className?: string;
}

const trustSignals = [
  { label: "PubMed Sourced", detail: "All references linked to PubMed" },
  { label: "University-Grade", detail: "Designed for academic use" },
  { label: "Peer-Reviewed Only", detail: "No anecdotal claims" },
  { label: "Institutional Ready", detail: "Used by clinics & schools" },
  { label: "Practitioner Trusted", detail: "Built for clinical reference" },
];

const InstitutionalTrustBanner = ({ className }: InstitutionalTrustBannerProps) => {
  return (
    <section className={cn("py-8 border-y border-border bg-muted/30", className)}>
      <div className="container mx-auto px-4">
        <p className="text-xs text-center text-muted-foreground uppercase tracking-widest mb-6 font-medium">
          Trusted by practitioners, universities & research institutions
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="text-muted-foreground">
              <p className="text-sm font-medium text-foreground leading-tight">{signal.label}</p>
              <p className="text-xs text-muted-foreground">{signal.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionalTrustBanner;
