import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";

export default function FAQ() {
  const [, navigate] = useLocation();
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = [
    {
      id: "pricing",
      q: "How much do your services cost?",
      a: "Photography starts at a per-hour rate, videography packages range depending on scope, and custom orders are quoted individually. Reach out for a detailed quote tailored to your vision.",
    },
    {
      id: "turnaround",
      q: "What's your turnaround time?",
      a: "Standard turnaround is 2-3 weeks for editing and delivery. Rush orders are available for an additional fee. I'll always give you a clear timeline before we start.",
    },
    {
      id: "payment",
      q: "What payment methods do you accept?",
      a: "I accept payments through Stripe (cards), PayPal, and bank transfer. A 50% deposit is required to book your session, with the balance due before final delivery.",
    },
    {
      id: "boundaries",
      q: "Do you have any content boundaries?",
      a: "I work within the rubber, latex, and gimp aesthetic. Specific limits and hard boundaries can be discussed during our initial consultation. Communication and consent are always the priority.",
    },
    {
      id: "custom",
      q: "Can you do custom requests?",
      a: "Absolutely. Custom orders are my specialty. Let's chat about your vision and I'll put together a quote that works for both of us. The weirder, the better.",
    },
    {
      id: "revisions",
      q: "What's your revision policy?",
      a: "Up to 2 rounds of revisions are included with every order. Additional revisions are available at a per-round fee. I want you to be thrilled with the final result.",
    },
    {
      id: "privacy",
      q: "Will my order remain private?",
      a: "100% confidential. I never share client content without explicit written permission. Your privacy and discretion are non-negotiable.",
    },
  ];

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Frequently Asked Questions</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 text-base md:text-lg font-light">
              Got questions? I've probably answered them below. If not, reach out and I'll get back to you.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className={`border rounded-sm overflow-hidden transition-colors ${
                  openId === faq.id
                    ? "border-red-700/50 bg-red-950/10"
                    : "border-red-900/25 bg-black/30 hover:border-red-900/50"
                }`}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
                >
                  <h3 className="font-serif italic text-base md:text-lg pr-4 group-hover:text-red-300 transition-colors">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-red-400/70" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-red-900/20 pt-4">
                        <p className="text-cream/65 text-sm md:text-base leading-relaxed font-light">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 md:p-10 border border-red-900/30 bg-gradient-to-br from-red-950/10 to-black/40 rounded-sm text-center"
          >
            <MessageCircle className="w-8 h-8 text-red-400/60 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-serif italic mb-4">Still Have Questions?</h3>
            <p className="text-cream/50 mb-8 max-w-md mx-auto font-light">
              Reach out directly. I'm happy to discuss your project in detail and answer anything not covered here.
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
