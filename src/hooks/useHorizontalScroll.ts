import { useRef, useState, useEffect, useCallback } from "react";

interface UseHorizontalScrollOptions {
  scrollAmount?: number;
}

export const useHorizontalScroll = (options: UseHorizontalScrollOptions = {}) => {
  const { scrollAmount = 300 } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      const timeoutId = setTimeout(checkScroll, 100);
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(scrollElement);
      return () => {
        scrollElement.removeEventListener("scroll", checkScroll);
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }
  }, [checkScroll]);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, [scrollAmount]);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, [scrollAmount]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  };
};
