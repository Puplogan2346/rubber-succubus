import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Image, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { galleryItems } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Gallery() {
  usePageMeta({ title: "Portfolio", description: "A showcase of photography, videography, and custom content celebrating rubber, latex, and gimp aesthetics." });
  const [, navigate] = useLocation();

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Portfolio</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
              A showcase of my best work. Photography, videography, and custom content
              celebrating rubber, latex, and gimp aesthetics.
            </p>
          </motion.div>

          {/* Gallery Grid - Masonry-style with CSS columns */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 mb-16">
            {galleryItems.map((item, i) => {
              const tile = (
                <div
                  className={`${item.aspect} relative border border-red-900/30 bg-red-950/8 overflow-hidden group cursor-pointer rounded-sm`}
                >
                  {item.src ? (
                    /* Real content */
                    <img
                      src={item.src}
                      alt={item.alt ?? ""}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    /* Placeholder content */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {item.type === "video" ? (
                          <Play className="w-8 h-8 text-red-400/30 mx-auto mb-2 group-hover:text-red-400/60 transition-colors" />
                        ) : (
                          <Image className="w-8 h-8 text-red-400/30 mx-auto mb-2 group-hover:text-red-400/60 transition-colors" />
                        )}
                        <p className="text-xs text-cream/25 group-hover:text-cream/40 transition-colors">
                          {item.type === "video" ? "Video" : "Photo"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full">
                      <p className="text-xs text-cream/60 mb-1 uppercase tracking-wider">
                        {item.type === "video" ? "Video Content" : "Photography"}
                      </p>
                      <p className="text-sm text-cream/80 font-serif italic">
                        {item.src ? item.caption ?? item.alt : "Add your content here"}
                      </p>
                    </div>
                  </div>

                  {/* Video play badge */}
                  {item.type === "video" && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-red-700/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                </div>
              );

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="break-inside-avoid mb-4"
                >
                  {item.type === "video" && item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.alt ?? "Watch video"}
                      className="block"
                    >
                      {tile}
                    </a>
                  ) : (
                    tile
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Empty state message — hidden once real content exists */}
          {!galleryItems.some((item) => item.src) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-10 border border-dashed border-red-900/30 rounded-sm mb-16"
            >
              <Image className="w-10 h-10 text-red-400/40 mx-auto mb-4" />
              <h3 className="text-xl font-serif italic mb-2 text-cream/70">Gallery Coming Soon</h3>
              <p className="text-sm text-cream/40 max-w-md mx-auto">
                Full portfolio with high-resolution photos and videos is being prepared.
                Follow my socials for the latest drops.
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-10 border border-red-900/30 bg-gradient-to-br from-red-950/10 to-black/40 rounded-sm text-center"
          >
            <h3 className="text-2xl md:text-3xl font-serif italic mb-4">Want to See More?</h3>
            <p className="text-cream/50 mb-8 max-w-lg mx-auto font-light">
              Check out my social media for the full portfolio, behind-the-scenes content, and exclusive drops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => navigate("/connect")}
                  className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  Follow My Socials
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => navigate("/services")}
                  variant="outline"
                  className="border-red-700/60 text-red-400 hover:bg-red-950/30 hover:border-red-600 px-8 py-3 uppercase tracking-wider transition-all"
                >
                  Book a Session
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
