import { Shield, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type EvidenceGrade = "high" | "moderate" | "low" | "very-low";

interface EvidenceGradeBadgeProps {
  grade: EvidenceGrade;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const gradeConfig: Record<EvidenceGrade, {
  label: string;
  description: string;
  icon: typeof ShieldCheck;
  className: string;
  bgClassName: string;
}> = {
  high: {
    label: "High Quality",
    description: "Multiple large RCTs, systematic reviews, or meta-analyses with consistent results. Low risk of bias.",
    icon: ShieldCheck,
    className: "text-emerald-700 dark:text-emerald-400",
    bgClassName: "bg-emerald-500/10 border-emerald-500/30",
  },
  moderate: {
    label: "Moderate Quality",
    description: "Some RCTs or well-designed observational studies. Moderate confidence; further research may change estimates.",
    icon: Shield,
    className: "text-amber-700 dark:text-amber-400",
    bgClassName: "bg-amber-500/10 border-amber-500/30",
  },
  low: {
    label: "Low Quality",
    description: "Primarily observational studies, small trials, or animal/in vitro research. Substantial uncertainty remains.",
    icon: ShieldAlert,
    className: "text-orange-700 dark:text-orange-400",
    bgClassName: "bg-orange-500/10 border-orange-500/30",
  },
  "very-low": {
    label: "Very Low Quality",
    description: "Limited to case reports, expert opinion, or very early preclinical data. Effect estimates are highly uncertain.",
    icon: ShieldQuestion,
    className: "text-slate-600 dark:text-slate-400",
    bgClassName: "bg-slate-500/10 border-slate-500/30",
  },
};

/**
 * Derives a GRADE-style evidence quality level from study count and category.
 * This is an approximation based on available metadata, not a formal GRADE assessment.
 */
export function deriveEvidenceGrade(studies: number, category: string): EvidenceGrade {
  // Categories with generally stronger clinical evidence bases
  const strongCategories = ["Essential Mineral", "Fat-Soluble Vitamin", "Water-Soluble Vitamin", "Performance Compound", "Structural Protein", "Amino Acid"];
  const isStrong = strongCategories.includes(category);

  if (studies >= 500 && isStrong) return "high";
  if (studies >= 400) return "moderate";
  if (studies >= 150) return "low";
  return "very-low";
}

const EvidenceGradeBadge = ({ grade, showLabel = true, size = "md", className }: EvidenceGradeBadgeProps) => {
  const config = gradeConfig[grade];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  const iconSizes = { sm: "w-3 h-3", md: "w-3.5 h-3.5", lg: "w-4 h-4" };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center rounded-full border font-medium cursor-help",
            config.bgClassName,
            config.className,
            sizeClasses[size],
            className
          )}
        >
          <Icon className={iconSizes[size]} />
          {showLabel && <span>{config.label}</span>}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        <p className="font-semibold mb-1">GRADE: {config.label}</p>
        <p>{config.description}</p>
        <p className="mt-1 text-muted-foreground italic">Based on adapted GRADE framework assessment.</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EvidenceGradeBadge;
