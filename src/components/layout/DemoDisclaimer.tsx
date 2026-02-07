import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DemoDisclaimerProps {
  className?: string;
  compact?: boolean;
}

const DemoDisclaimer = ({ className = "", compact = false }: DemoDisclaimerProps) => {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-medium ${className}`}>
        <AlertTriangle className="w-3 h-3" />
        <span>Demo Data – Not for Clinical Use</span>
      </div>
    );
  }

  return (
    <Alert className={`bg-amber-500/10 border-amber-500/30 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
        <strong>Curated Research Notice:</strong> Studies with PMID links connect to real peer-reviewed 
        articles on PubMed. Summaries are editorial interpretations for educational purposes and should not 
        be used for clinical decision-making. Always consult primary sources and healthcare professionals.
      </AlertDescription>
    </Alert>
  );
};

export default DemoDisclaimer;
