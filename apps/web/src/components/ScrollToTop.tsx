import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // "immediate: true" skips the smooth animation for page changes
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, lenis]);

  return null;
};

export default ScrollToTop;
