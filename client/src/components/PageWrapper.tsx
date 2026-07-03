import { m } from "framer-motion";
import Navigation from "./Navigation";

interface PageWrapperProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function PageWrapper({ children, showNav = true }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-black text-cream">
      {showNav && <Navigation />}
      <m.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pt-[72px]"
      >
        {children}
      </m.main>
    </div>
  );
}
