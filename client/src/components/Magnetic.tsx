import { useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1) */
  strength?: number;
  /** Hover scale, on top of the magnetic pull */
  scale?: number;
}

/**
 * Wrapper that makes its child gently pull toward the cursor while hovered,
 * springing back on leave. Replaces the plain hover-scale wrappers around
 * CTA buttons. Touch devices and reduced-motion users get scale/tap only.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.18,
  scale = 1.03,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      whileHover={{ scale }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </m.div>
  );
}
