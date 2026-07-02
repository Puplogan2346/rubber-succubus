import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, primarySocials } from "@/config/site";

const navSocials = primarySocials.filter((social) => social.icon);

const navItems = [
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "FAQ", path: "/faq" },
  { label: "Events", path: "/events" },
  { label: "Connect", path: "/connect" },
];

export default function Navigation() {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-red-800 to-red-950 rounded-full flex items-center justify-center border border-red-700/60 group-hover:border-red-500 transition-colors">
              <span className="text-lg font-serif italic text-red-200">R</span>
            </div>
            <span className="text-xl font-serif italic text-cream/90 hidden sm:block group-hover:text-cream transition-colors">
              {brand.name}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-link px-4 py-2 rounded-sm transition-all ${
                  location === item.path
                    ? "text-red-400 bg-red-950/30"
                    : "hover:bg-red-950/20"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-3">
            {navSocials.map((social) => {
              const IconComponent = social.icon!;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  title={social.name}
                  className="p-2 text-cream/60 hover:text-red-400 transition-colors duration-300 social-icon"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-red-950/30 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/98 pt-20 px-6"
          >
            <div className="flex flex-col gap-2 max-w-sm mx-auto mt-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    handleNavigation(item.path);
                    setMobileOpen(false);
                  }}
                  className={`text-left text-2xl font-serif italic py-4 px-4 border-b border-red-900/20 transition-colors ${
                    location === item.path
                      ? "text-red-400"
                      : "text-cream/80 hover:text-cream hover:bg-red-950/20"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-8 pt-6 border-t border-red-900/20"
              >
                <p className="text-xs uppercase tracking-widest text-red-400 mb-4">
                  Follow
                </p>
                <div className="flex gap-4">
                  {navSocials.map((social) => {
                    const IconComponent = social.icon!;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.name !== "Email" ? "_blank" : undefined}
                        rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                        title={social.name}
                        className="p-3 text-cream/60 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors duration-300 social-icon"
                      >
                        <IconComponent className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Mobile CTA */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
                onClick={() => {
                  handleNavigation("/");
                  setMobileOpen(false);
                }}
                className="mt-6 text-sm uppercase tracking-widest text-cream/40 hover:text-cream/60 transition-colors"
              >
                ← Back to Home
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
