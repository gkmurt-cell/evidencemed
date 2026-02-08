import { Info } from "lucide-react";

interface EducationalDisclaimerProps {
  variant?: "inline" | "banner";
  compact?: boolean;
  className?: string;
}

const EducationalDisclaimer = ({ variant = "banner", compact = false, className = "" }: EducationalDisclaimerProps) => {
  if (variant === "inline") {
    return (
      <p className={`text-xs text-muted-foreground italic ${className}`}>
        This content is for educational and research purposes only. It does not constitute medical advice, 
        diagnosis, treatment recommendations, or prescriptive guidance. Do not use this information to 
        self-treat any health condition.
      </p>
    );
  }

  if (compact) {
    return (
      <div className={`mt-3 p-2.5 rounded-lg bg-muted/40 border border-border/50 ${className}`}>
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Educational & Research Information Only</span> — 
            Not medical advice. Consult a healthcare provider before making health decisions.
          </p>
        </div>
      </div>
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
            Educational & Research Information Only
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The information presented here summarizes published research and does not constitute medical advice, 
            diagnosis, treatment recommendations, or prescriptive guidance. Any dosages, protocols, or treatment 
            information mentioned reflect research study parameters only and are NOT recommendations for personal use. 
            Always consult a qualified healthcare provider before making health decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalDisclaimer;
