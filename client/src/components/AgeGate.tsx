import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { brand } from "@/config/site";

const STORAGE_KEY = "rs-age-verified";

// localStorage can throw in private browsing modes; treat that as unverified.
function readVerified(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * App-level 18+ gate. Wraps the router so every route — including deep
 * links — requires confirmation before any content renders. The choice
 * persists across sessions via localStorage.
 */
export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(readVerified);

  const handleEnter = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Private mode: proceed for this session only.
    }
    setVerified(true);
  };

  if (verified) return <>{children}</>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Shiny textured background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/3 via-black to-black" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent" />
      </div>

      {/* Radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-md"
      >
        {/* Logo emblem */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-950 rounded-full flex items-center justify-center border border-red-700/60 shadow-lg shadow-red-900/30">
            <span className="text-4xl font-serif italic text-red-200">R</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl md:text-6xl font-serif italic text-cream mb-3 tracking-tight"
        >
          {brand.name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-red-700 to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-red-400 mb-8"
        >
          18+ Only &bull; Adults Only
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-cream/70 text-sm leading-relaxed mb-10"
        >
          This website contains adult content intended for mature audiences only.
          By entering, you confirm you are 18 years of age or older.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <Button
            onClick={handleEnter}
            className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 text-sm uppercase tracking-wider font-semibold shadow-lg shadow-red-900/40 transition-all hover:shadow-red-800/50"
          >
            I Am 18+ &bull; Enter
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "https://www.google.com")}
            className="border-cream/30 text-cream/50 hover:border-cream/60 hover:text-cream/80 px-8 py-3 text-sm uppercase tracking-wider transition-all"
          >
            Exit
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
