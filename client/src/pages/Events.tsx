import { useLocation } from "wouter";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { brand, integrations, isConfigured, upcomingEvents } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const isCalendarConfigured = isConfigured(integrations.googleCalendarEmbedSrc);

export default function Events() {
  usePageMeta({ title: "Events", description: "Shoots, collabs, and appearances — where to find Rubber Succubus next." });
  const [, navigate] = useLocation();

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Events</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
              Shoots, collabs, appearances, and everything in between.
              Stay in the loop on where I'll be and what's coming next.
            </p>
          </motion.div>

          {/* Google Calendar Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-red-950/40 border border-red-900/40 rounded-sm flex items-center justify-center">
                <Calendar className="w-4 h-4 text-red-400" />
              </div>
              <h2 className="font-serif italic text-xl">Live Calendar</h2>
            </div>

            {isCalendarConfigured ? (
              <div className="border border-red-900/30 overflow-hidden rounded-sm">
                <iframe
                  src={integrations.googleCalendarEmbedSrc}
                  style={{ border: 0 }}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  scrolling="no"
                  title="Rubber Succubus Events Calendar"
                  className="block"
                />
              </div>
            ) : (
              <div className="border border-dashed border-red-900/30 bg-red-950/5 p-12 text-center rounded-sm">
                <Calendar className="w-10 h-10 text-red-400/30 mx-auto mb-4" />
                <h4 className="font-serif italic text-xl mb-2 text-cream/70">Calendar Coming Soon</h4>
                <p className="text-cream/40 text-sm max-w-md mx-auto">
                  The live calendar will appear here once configured.
                  Follow me on socials for the latest updates in the meantime.
                </p>
              </div>
            )}
          </motion.div>

          {/* Upcoming Events List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="font-serif italic text-2xl md:text-3xl mb-8">On the Radar</h2>

            <div className="space-y-4">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  whileHover={{ x: 4, borderColor: "rgba(185, 28, 28, 0.5)" }}
                  className="border border-red-900/25 bg-black/30 p-6 transition-all rounded-sm group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-serif italic text-lg mb-2 group-hover:text-red-300 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-cream/50 text-sm mb-4 font-light">{event.description}</p>

                      <div className="flex flex-wrap gap-4 text-xs text-cream/45">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-red-400/70" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-red-400/70" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-red-400/70" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {event.live && event.link !== "#" && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition border border-red-900/40 hover:border-red-700 px-4 py-2 whitespace-nowrap rounded-sm"
                      >
                        Details <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stay Updated CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-10 border border-red-900/30 bg-gradient-to-br from-red-950/10 to-black/40 rounded-sm text-center"
          >
            <h3 className="font-serif italic text-2xl md:text-3xl mb-4">Never Miss a Drop</h3>
            <p className="text-cream/50 mb-8 max-w-md mx-auto font-light">
              Follow me on Twitter/X for real-time updates on events, shoots, and exclusive content.
            </p>
            <motion.a
              href={brand.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold transition-all rounded-sm"
            >
              Follow {brand.handle}
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
