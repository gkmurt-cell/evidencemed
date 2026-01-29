import { ArrowUp } from "lucide-react";
import { Button } from "./button";

interface BackToTopButtonProps {
  targetId?: string;
  label?: string;
}

const BackToTopButton = ({ targetId = "top", label = "Back to Categories" }: BackToTopButtonProps) => {
  const scrollToTop = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center pt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={scrollToTop}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowUp className="w-4 h-4" />
        {label}
      </Button>
    </div>
  );
};

export default BackToTopButton;
