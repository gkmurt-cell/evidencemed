import { ArrowLeft, ArrowRight } from "lucide-react";

interface ScrollArrowsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const ScrollArrows = ({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}: ScrollArrowsProps) => {
  return (
    <>
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onScrollLeft(); }}
          className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent flex items-center justify-start pl-2 cursor-pointer hover:from-background/90 transition-all animate-fade-in z-10"
          aria-label="Scroll left"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </div>
        </button>
      )}

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onScrollRight(); }}
          className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pr-2 cursor-pointer hover:from-background/90 transition-all z-10"
          aria-label="Scroll right"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </button>
      )}
    </>
  );
};
