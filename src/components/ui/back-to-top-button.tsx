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
    <div className="flex justify-center pt-8 pb-4">
      <Button
        onClick={scrollToTop}
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <ArrowUp className="w-5 h-5" />
        {label}
      </Button>
    </div>
  );
};

export default BackToTopButton;
