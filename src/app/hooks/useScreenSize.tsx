"use client";
import { useEffect, useState } from "react";

type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";
const breakpoints: Record<BreakpointKey, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1200,
  "2xl": 1440,
};

function useScreenSize(breakpoint: BreakpointKey): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${breakpoints[breakpoint]}px)`
    );

    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, [breakpoint]);

  return matches;
}

export default useScreenSize;
