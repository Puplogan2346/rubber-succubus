import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-cream relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center px-6 max-w-md"
      >
        <div className="mb-6">
          <span className="text-7xl md:text-8xl font-serif italic text-red-400/80">404</span>
        </div>

        <h1 className="text-2xl font-serif italic mb-3">Page Not Found</h1>

        <p className="text-cream/50 text-sm mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => navigate("/")}
            className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold flex items-center gap-2 mx-auto"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
