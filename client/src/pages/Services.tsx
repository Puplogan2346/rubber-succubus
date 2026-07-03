import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import { commissions, services } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";

const PROCESS_STEPS = [
  {
    title: "Send your brief",
    copy: "Use the custom order builder or the contact form — format, vibe, budget, timeline.",
  },
  {
    title: "We talk it through",
    copy: "I reply within 48 hours with questions, ideas, and a firm quote.",
  },
  {
    title: "50% deposit books it",
    copy: "Your slot is locked in. The balance is due before final delivery.",
  },
  {
    title: "Create & deliver",
    copy: "Standard turnaround is 2-3 weeks, with up to 2 rounds of revisions included.",
  },
];

export default function Services() {
  usePageMeta({ title: "Services", description: "Custom photography, videography, social content, and bespoke orders. Book a session with Rubber Succubus." });
  const [, navigate] = useLocation();

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-16"
          >
            <h1 className="heading-shine text-4xl md:text-5xl font-serif italic mb-4">What I Offer</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
              Custom content creation tailored to your vision. Whether you need photography, videography,
              or something completely unique, let's make it happen.
            </p>
            {commissions.status !== "open" && (
              <p className="mt-5 inline-block text-xs uppercase tracking-widest px-4 py-2 border border-red-900/40 bg-red-950/20 text-red-300/90 rounded-sm">
                {commissions.status === "waitlist"
                  ? "Currently waitlist only — new briefs join the queue"
                  : "Commissions are closed right now — follow socials for reopening"}
                {commissions.note ? ` · ${commissions.note}` : ""}
              </p>
            )}
          </m.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, i) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
              <TiltCard className="h-full border border-red-900/30 bg-black/40 p-7 md:p-8 hover:border-red-700/60 transition-colors group rounded-sm overflow-hidden">
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
                  <Magnetic scale={1.05}>
                    <Button
                      onClick={() =>
                        navigate(service.id === "custom-order" ? "/custom-order" : `/checkout/${service.id}`)
                      }
                      className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-5 py-2 text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      {service.id === "custom-order" ? "Start a Brief" : "Book Now"}
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Magnetic>
                </div>
              </TiltCard>
              </m.div>
            ))}
          </div>

          {/* How it works */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-3">How It Works</h2>
            <div className="garnet-rule max-w-[40px] mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESS_STEPS.map((processStep, i) => (
                <m.div
                  key={processStep.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative p-6 pt-10 border border-red-900/25 bg-black/30 rounded-sm overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 -right-1 font-serif italic text-[5.5rem] leading-none text-red-950/50 select-none pointer-events-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative font-serif italic text-lg mb-2">{processStep.title}</h3>
                  <p className="relative text-sm text-cream/50 font-light leading-relaxed">{processStep.copy}</p>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Custom Order CTA */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 md:p-10 border border-red-900/30 bg-gradient-to-br from-red-950/10 to-black/40 rounded-sm text-center"
          >
            <h3 className="text-2xl md:text-3xl font-serif italic mb-4">Have Something Specific in Mind?</h3>
            <p className="text-cream/50 mb-8 max-w-lg mx-auto font-light">
              If none of the above fit exactly what you're looking for, build me a brief.
              I love custom projects and pushing creative boundaries.
            </p>
            <Magnetic className="inline-block">
              <Button
                onClick={() => navigate(commissions.status === "closed" ? "/connect" : "/custom-order")}
                className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold"
              >
                {commissions.status === "closed" ? "Get in Touch" : "Build Your Custom Order"}
              </Button>
            </Magnetic>
          </m.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
