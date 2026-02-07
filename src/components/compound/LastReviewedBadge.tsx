import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LastReviewedBadgeProps {
  lastReviewed: string; // ISO date
  nextReviewDue?: string; // ISO date
  className?: string;
}

const LastReviewedBadge = ({ lastReviewed, nextReviewDue, className }: LastReviewedBadgeProps) => {
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", className)}>
      <span className="inline-flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        Last reviewed: <strong className="text-foreground font-medium">{formatDate(lastReviewed)}</strong>
      </span>
      {nextReviewDue && (
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Next review: {formatDate(nextReviewDue)}
        </span>
      )}
    </div>
  );
};

export default LastReviewedBadge;
