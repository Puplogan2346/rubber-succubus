import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { services } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Services() {
  usePageMeta({ title: "Services", description: "Custom photography, videography, social content, and bespoke orders. Book a session with Rubber Succubus." });
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
            <h1 className="text-4xl md:text-5xl font-serif italic mb-4">What I Offer</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
              Custom content creation tailored to your vision. Whether you need photography, videography,
              or something completely unique, let's make it happen.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="relative border border-red-900/30 bg-black/40 p-7 md:p-8 hover:border-red-700/60 transition-all group rounded-sm overflow-hidden"
              >
                {/* Gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 bg-red-950/40 border border-red-900/40 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-red-700/60 transition-colors">
                    <service.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif italic group-hover:text-red-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-cream/50 text-sm mt-1 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-6 ml-[60px]">
                  <p className="label-text mb-3">Includes:</p>
                  <ul className="space-y-2">
                    {service.includes.map((item, j) => (
                      <li key={j} className="text-sm text-cream/60 flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-400/60 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="border-t border-red-900/20 pt-5 ml-[60px] flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-cream/35 mb-1">Starting at</p>
                    <p className="text-xl font-serif italic text-cream/90">{service.price}</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => navigate(`/checkout/${service.id}`)}
                      className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-5 py-2 text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      Book Now
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Order CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 md:p-10 border border-red-900/30 bg-gradient-to-br from-red-950/10 to-black/40 rounded-sm text-center"
          >
            <h3 className="text-2xl md:text-3xl font-serif italic mb-4">Have Something Specific in Mind?</h3>
            <p className="text-cream/50 mb-8 max-w-lg mx-auto font-light">
              If none of the above fit exactly what you're looking for, reach out.
              I love custom projects and pushing creative boundaries.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => navigate("/connect")}
                className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold"
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
