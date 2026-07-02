import { useEffect } from "react";
import { useLocation } from "wouter";

/** Resets scroll position on every route change. */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
