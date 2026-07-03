import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

/**
 * Mobile-only booking bar that slides in after the visitor scrolls past the
 * hero. Mounted on browse pages (Home, Gallery) — the funnel pages already
 * have their own CTAs.
 */
export default function StickyBookCTA() {
  const [, navigate] = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-black/90 backdrop-blur-md border-t border-red-900/30"
        >
          <button
            onClick={() => navigate("/services")}
            className="w-full btn-sheen bg-red-700 hover:bg-red-600 text-white py-3 rounded-sm uppercase tracking-wider font-semibold text-sm flex items-center justify-center gap-2"
          >
            Book a Session
            <ArrowRight className="w-4 h-4" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
