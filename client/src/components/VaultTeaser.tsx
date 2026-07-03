import { m } from "framer-motion";
import { Lock, ExternalLink } from "lucide-react";
import { vault } from "@/config/site";

const TEASER_TILES = [
  "from-red-950/60 via-red-900/20 to-black",
  "from-black via-red-950/50 to-red-900/20",
  "from-red-900/30 via-black to-red-950/60",
  "from-red-950/40 via-red-900/30 to-black",
];

/**
 * "The Vault" — blurred locked tiles teasing exclusive content, linking to the
 * paid platform. Hidden until `vault.url` is set in site.ts.
 */
export default function VaultTeaser() {
  if (!vault.url) return null;

  return (
    <section className="py-20 px-6 border-t border-red-900/15">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif italic mb-4">The Vault</h2>
          <div className="garnet-rule max-w-[60px] mx-auto mb-6" />
          <p className="text-cream/60 mb-12 font-light max-w-md mx-auto">
            The shiniest work doesn't live here. It's waiting behind the door.
          </p>
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {TEASER_TILES.map((gradient, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="aspect-[3/4] relative border border-red-900/30 rounded-sm overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-[2px] scale-110`} />
              <div className="absolute inset-0 backdrop-blur-[6px] bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-400/60" />
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <m.a
            href={vault.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold transition-all rounded-sm"
          >
            <Lock className="w-4 h-4" />
            {vault.label}
            <ExternalLink className="w-3.5 h-3.5" />
          </m.a>
        </m.div>
      </div>
    </section>
  );
}
