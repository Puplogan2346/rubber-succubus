import { useEffect, useRef } from "react";

/**
 * Soft garnet glow that trails the pointer across the whole site, echoing
 * the hero's specular shine. Desktop pointers only; skipped entirely for
 * touch devices and reduced-motion users.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.opacity = "1";
        // 200 = half the glow's 400px size, centering it on the cursor
        el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-30 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(193,0,31,0.06), rgba(193,0,31,0.025) 40%, transparent 70%)",
      }}
    />
  );
}
