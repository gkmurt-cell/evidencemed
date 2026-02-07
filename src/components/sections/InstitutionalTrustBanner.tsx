import { Shield, BookOpen, GraduationCap, Building2, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstitutionalTrustBannerProps {
  className?: string;
}

const trustSignals = [
  { icon: BookOpen, label: "PubMed Sourced", detail: "All references linked to PubMed" },
  { icon: GraduationCap, label: "University-Grade", detail: "Designed for academic use" },
  { icon: Shield, label: "Peer-Reviewed Only", detail: "No anecdotal claims" },
  { icon: Building2, label: "Institutional Ready", detail: "Used by clinics & schools" },
  { icon: Stethoscope, label: "Practitioner Trusted", detail: "Built for clinical reference" },
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
            <div key={signal.label} className="flex items-center gap-2.5 text-muted-foreground">
              <signal.icon className="w-5 h-5 text-primary/70" />
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">{signal.label}</p>
                <p className="text-xs text-muted-foreground">{signal.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionalTrustBanner;
