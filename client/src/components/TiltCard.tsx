import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a div (default) or an interactive element */
  as?: "div" | "button" | "a";
  /** Max rotation in degrees at the card edges */
  maxTilt?: number;
  type?: "button" | "submit";
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Card that tilts toward the cursor with a specular highlight tracking the
 * pointer — light rolling over latex. Pairs with the `.tilt-card` /
 * `.tilt-shine` styles in index.css. No-op for touch-only devices and
 * reduced-motion users (handlers bail before touching styles).
 */
export default function TiltCard({
  as = "div",
  maxTilt = 5,
  className,
  children,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const raf = useRef(0);

  const interactive = () =>
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !interactive()) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      el.style.transform = `perspective(800px) rotateX(${((0.5 - py) * maxTilt).toFixed(2)}deg) rotateY(${((px - 0.5) * maxTilt).toFixed(2)}deg)`;
      el.style.setProperty("--shine-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--shine-y", `${(py * 100).toFixed(1)}%`);
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const Comp = as as React.ElementType;
  return (
    <Comp
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("tilt-card tilt-shine relative", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
