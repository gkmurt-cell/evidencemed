import { cn } from "@/lib/utils";

interface EvidenceTierIconProps {
  level: "high" | "moderate" | "preliminary";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

/**
 * Evidence tier icon with visual indicator
 * Based on Oxford CEBM Evidence Levels
 */
export const EvidenceTierIcon = ({ 
  level, 
  size = "md", 
  showLabel = false,
  className 
}: EvidenceTierIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const config = {
    high: {
      bars: 3,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/20",
      label: "Strong Evidence"
    },
    moderate: {
      bars: 2,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/20",
      label: "Moderate Evidence"
    },
    preliminary: {
      bars: 1,
      color: "text-slate-500 dark:text-slate-400",
      bgColor: "bg-slate-500/20",
      label: "Preliminary"
    }
  };

  const { bars, color, bgColor, label } = config[level];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative flex items-end gap-0.5 p-1 rounded", bgColor, sizeClasses[size])}>
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={cn(
              "flex-1 rounded-sm transition-all",
              bar <= bars ? color.replace("text-", "bg-") : "bg-current opacity-20",
              bar === 1 ? "h-1/3" : bar === 2 ? "h-2/3" : "h-full"
            )}
            style={{ 
              backgroundColor: bar <= bars 
                ? undefined 
                : "currentColor",
              opacity: bar <= bars ? 1 : 0.2
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium", color)}>{label}</span>
      )}
    </div>
  );
};

interface StudyTypeIconProps {
  type: "rct" | "meta-analysis" | "observational" | "in-vitro" | "animal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Study type indicator icon
 */
export const StudyTypeIcon = ({ type, size = "md", className }: StudyTypeIconProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const config = {
    rct: { 
      label: "RCT",
      bgColor: "bg-violet-500/15 text-violet-600 dark:text-violet-400"
    },
    "meta-analysis": { 
      label: "MA",
      bgColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
    },
    observational: { 
      label: "OB",
      bgColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400"
    },
    "in-vitro": { 
      label: "IV",
      bgColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400"
    },
    animal: { 
      label: "AN",
      bgColor: "bg-slate-500/15 text-slate-600 dark:text-slate-400"
    }
  };

  const { label, bgColor } = config[type];

  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded font-mono text-xs font-bold",
        bgColor,
        sizeClasses[size],
        className
      )}
    >
      {label}
    </div>
  );
};

interface StudyCountBarProps {
  data: Array<{
    label: string;
    count: number;
    type: "rct" | "meta-analysis" | "observational" | "in-vitro" | "animal";
  }>;
  className?: string;
}

/**
 * Horizontal bar chart showing study counts by type
 * Simple data visualization, no decoration
 */
export const StudyCountBar = ({ data, className }: StudyCountBarProps) => {
  const maxCount = Math.max(...data.map(d => d.count));

  const typeColors = {
    rct: "bg-violet-500",
    "meta-analysis": "bg-emerald-500",
    observational: "bg-blue-500",
    "in-vitro": "bg-amber-500",
    animal: "bg-slate-400"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {data.map((item) => (
        <div key={item.type} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-24 shrink-0 text-right">
            {item.label}
          </span>
          <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
            <div 
              className={cn("h-full rounded-sm transition-all", typeColors[item.type])}
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-foreground w-12">
            {item.count.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

interface EvidencePyramidProps {
  className?: string;
}

/**
 * Evidence pyramid visualization showing study hierarchy
 */
export const EvidencePyramid = ({ className }: EvidencePyramidProps) => {
  const levels = [
    { label: "Systematic Reviews & Meta-Analyses", tier: "high" as const, width: "40%" },
    { label: "Randomized Controlled Trials", tier: "high" as const, width: "55%" },
    { label: "Cohort & Observational Studies", tier: "moderate" as const, width: "70%" },
    { label: "Animal & In Vitro Studies", tier: "preliminary" as const, width: "85%" },
    { label: "Case Reports & Expert Opinion", tier: "preliminary" as const, width: "100%" },
  ];

  const tierColors = {
    high: "bg-emerald-500/80 border-emerald-600",
    moderate: "bg-amber-500/80 border-amber-600",
    preliminary: "bg-slate-400/80 border-slate-500"
  };

  return (
    <div className={cn("space-y-1", className)}>
      {levels.map((level, i) => (
        <div key={i} className="flex justify-center">
          <div 
            className={cn(
              "h-8 flex items-center justify-center text-xs font-medium text-white rounded border-b-2 transition-all hover:opacity-90",
              tierColors[level.tier]
            )}
            style={{ width: level.width }}
          >
            <span className="truncate px-2">{level.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

interface TimelineDotsProps {
  years: number[];
  className?: string;
}

/**
 * Publication timeline visualization
 */
export const TimelineDots = ({ years, className }: TimelineDotsProps) => {
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const range = maxYear - minYear || 1;

  // Group years and count
  const yearCounts = years.reduce((acc, year) => {
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const maxCount = Math.max(...Object.values(yearCounts));

  return (
    <div className={cn("relative h-12", className)}>
      {/* Timeline axis */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      
      {/* Year markers */}
      <div className="absolute bottom-0 left-0 text-xs text-muted-foreground">{minYear}</div>
      <div className="absolute bottom-0 right-0 text-xs text-muted-foreground">{maxYear}</div>
      
      {/* Publication dots */}
      {Object.entries(yearCounts).map(([year, count]) => {
        const position = ((parseInt(year) - minYear) / range) * 100;
        const size = Math.max(4, (count / maxCount) * 12);
        
        return (
          <div
            key={year}
            className="absolute bottom-2 -translate-x-1/2 bg-primary rounded-full transition-all hover:bg-primary/80"
            style={{ 
              left: `${position}%`,
              width: `${size}px`,
              height: `${size}px`
            }}
            title={`${year}: ${count} studies`}
          />
        );
      })}
    </div>
  );
};
