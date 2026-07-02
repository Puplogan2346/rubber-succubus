import { useLocation } from "wouter";
import { brand } from "@/config/site";

const footerLinks = [
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "FAQ", path: "/faq" },
  { label: "Events", path: "/events" },
  { label: "Connect", path: "/connect" },
];

export default function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="border-t border-red-900/20 bg-black/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-800 to-red-950 rounded-full flex items-center justify-center border border-red-700/60">
                <span className="text-sm font-serif italic text-red-200">R</span>
              </div>
              <span className="text-lg font-serif italic text-cream/90">{brand.name}</span>
            </div>
            <p className="text-sm text-cream/50 leading-relaxed">
              {brand.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-red-400 mb-4 font-sans font-medium">
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-left text-sm text-cream/50 hover:text-cream transition-colors py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-red-400 mb-4 font-sans font-medium">
              Get in Touch
            </h4>
            <a
              href={`mailto:${brand.email}`}
              className="text-sm text-cream/50 hover:text-cream transition-colors block mb-2"
            >
              {brand.email}
            </a>
            <a
              href={brand.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/50 hover:text-cream transition-colors block"
            >
              {brand.handle} on X
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-red-900/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            18+ Adult Content. By using this site, you confirm you are of legal age.
          </p>
        </div>
      </div>
    </footer>
  );
}
