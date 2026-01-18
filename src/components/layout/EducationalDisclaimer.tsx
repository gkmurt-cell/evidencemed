import { Info } from "lucide-react";

interface EducationalDisclaimerProps {
  variant?: "inline" | "banner";
  className?: string;
}

const EducationalDisclaimer = ({ variant = "banner", className = "" }: EducationalDisclaimerProps) => {
  if (variant === "inline") {
    return (
      <p className={`text-xs text-muted-foreground italic ${className}`}>
        This content is for educational purposes only and does not constitute medical advice, diagnosis, or treatment recommendations.
      </p>
    );
  }

  return (
    <div className={`p-4 rounded-xl bg-muted/50 border border-border ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-1">
            Educational Information Only
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The information presented here summarizes published research and does not constitute medical advice, 
            diagnosis, or treatment recommendations. Always consult a qualified healthcare provider before making 
            health decisions. Research findings may not apply to individual circumstances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalDisclaimer;
