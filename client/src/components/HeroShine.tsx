import { useEffect, useRef } from "react";

/**
 * Specular highlight that follows the cursor across the hero, like light
 * moving over latex. Mounts as an overlay inside a `relative` container and
 * listens on that parent. Skipped for reduced-motion and touch-only devices.
 */
export default function HeroShine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = parent.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.background = `radial-gradient(560px circle at ${x}% ${y}%, rgba(255,236,220,0.08), rgba(193,0,31,0.05) 40%, transparent 70%)`;
      });
    };
    const onLeave = () => {
      el.style.background = "transparent";
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1]" />;
}
