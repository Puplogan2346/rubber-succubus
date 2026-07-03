import { useEffect, useRef } from "react";

/**
 * Thin garnet line along the bottom edge of the fixed nav that fills as the
 * page scrolls — matches the garnet-rule dividers. Pages shorter than the
 * viewport keep it empty.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.30 0.14 20), oklch(0.42 0.18 20), oklch(0.55 0.20 22))",
        }}
      />
    </div>
  );
}
