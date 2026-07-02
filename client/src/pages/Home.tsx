import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Camera, Film, HelpCircle, Calendar, Link2, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { brand, testimonials } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta();
  const [, navigate] = useLocation();

  const exploreItems = [
    { title: "Services", desc: "Photography, video, custom orders", icon: Camera, path: "/services" },
    { title: "Gallery", desc: "Portfolio showcase", icon: Film, path: "/gallery" },
    { title: "FAQ", desc: "Questions answered", icon: HelpCircle, path: "/faq" },
    { title: "Events", desc: "Shoots, collabs, appearances", icon: Calendar, path: "/events" },
    { title: "Connect", desc: "All my socials and contact", icon: Link2, path: "/connect" },
  ];

  return (
    <div className="min-h-screen bg-black text-cream relative">
      {/* Shiny textured background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle radial gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/3 via-black to-black" />
        {/* Fine grain texture */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }} />
        {/* Subtle shine/gloss effect from top-left */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section with Background Image */}
        <section className="relative h-screen md:h-[600px] overflow-hidden -mx-6 md:mx-0 mt-16">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/bg.webp')",
              backgroundAttachment: 'fixed'
            }}
          />
          
          {/* Overlay gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-950 rounded-full flex items-center justify-center border border-red-700/60 mx-auto shadow-2xl shadow-red-900/40">
                  <span className="text-4xl font-serif italic text-red-200">R</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-4 tracking-tight leading-[1.1] text-cream drop-shadow-lg"
              >
                {brand.name}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent max-w-xs mx-auto mb-6"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs uppercase tracking-[0.3em] text-red-300 mb-6 drop-shadow"
              >
                Ginger Nut-Hunter
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-cream/90 mb-10 leading-relaxed font-light drop-shadow-lg"
              >
                Just a ginger with an eye for a good nut. Mixing kinky secrets with sweet, spicy chaos.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center sm:items-stretch"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    onClick={() => navigate("/services")}
                    className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold shadow-lg shadow-red-900/60 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Explore Services
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    onClick={() => navigate("/connect")}
                    variant="outline"
                    className="border-cream/40 text-cream hover:bg-red-950/40 hover:border-cream/60 px-8 py-3 uppercase tracking-wider transition-all w-full sm:w-auto"
                  >
                    Get Connected
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Explore Section */}
        <section className="py-20 px-6 border-y border-red-900/15 bg-gradient-to-b from-black to-red-950/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-4">Explore</h2>
              <div className="garnet-rule max-w-[60px] mx-auto mb-14" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
              {exploreItems.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4, borderColor: "rgba(185, 28, 28, 0.6)" }}
                  onClick={() => navigate(item.path)}
                  className="relative p-5 md:p-6 border border-red-900/30 bg-black/40 hover:bg-red-950/15 transition-all text-left group rounded-sm overflow-hidden"
                >
                  {/* Gloss effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                  <item.icon className="w-6 h-6 text-red-400/70 mb-3 group-hover:text-red-400 transition-colors" />
                  <h3 className="font-serif italic text-base md:text-lg mb-1 group-hover:text-red-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cream/45 leading-relaxed">{item.desc}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif italic mb-3">The Man Behind the Mask</h2>
              <div className="garnet-rule max-w-[40px] mb-8" />

              <div className="space-y-5 text-cream/70 leading-relaxed text-base md:text-lg font-light">
                <p>
                  Based in San Francisco, I create content that celebrates rubber, latex, and gimp aesthetics.
                  Every piece is crafted with intention, blending sensuality, artistry, and unapologetic kink culture.
                </p>
                <p>
                  Whether you're looking for custom content, photography sessions, or just want to connect
                  with someone who gets it, I'm here to make it happen.
                </p>
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-10 pl-6 border-l border-red-700/40"
              >
                <p className="text-lg text-cream/60 italic font-light">
                  "Every frame tells a story. Mine just happens to be deliciously kinky."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section — hidden until entries exist in site.ts */}
        {testimonials.length > 0 && (
          <section className="py-20 px-6 border-t border-red-900/15 bg-gradient-to-b from-black to-red-950/3">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-4">Kind Words</h2>
                <div className="garnet-rule max-w-[60px] mx-auto mb-14" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((testimonial, i) => (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative p-6 border border-red-900/25 bg-black/30 rounded-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                    <blockquote className="text-cream/75 italic font-light leading-relaxed mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <figcaption className="text-[10px] uppercase tracking-widest text-red-400/70">
                      — {testimonial.attribution}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="py-20 px-6 border-t border-red-900/15 bg-gradient-to-b from-black to-red-950/3">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-serif italic mb-3">Stay Updated</h2>
              <div className="garnet-rule max-w-[60px] mx-auto mb-6" />
              <p className="text-cream/60 mb-8 font-light">
                Get notified when new content drops and exclusive announcements.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => navigate("/connect")}
                  className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold"
                >
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
