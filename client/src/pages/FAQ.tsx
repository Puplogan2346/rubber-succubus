import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { MessageCircle } from "lucide-react";
import { m } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { faqItems } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function FAQ() {
  usePageMeta({ title: "FAQ", description: "Answers about pricing, turnaround, payment, boundaries, revisions, and privacy." });
  const [, navigate] = useLocation();

  // FAQPage structured data (JSON-LD) generated from the same config the
  // page renders — makes the questions eligible for rich results in search.
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-16"
          >
            <h1 className="heading-shine text-4xl md:text-5xl font-serif italic mb-4">Frequently Asked Questions</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 text-base md:text-lg font-light">
              Got questions? I've probably answered them below. If not, reach out and I'll get back to you.
            </p>
          </m.div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((faq, i) => (
              <m.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <AccordionItem
                  value={faq.id}
                  className="border last:border-b border-red-900/25 bg-black/30 hover:border-red-900/50 data-[state=open]:border-red-700/50 data-[state=open]:bg-red-950/10 rounded-sm overflow-hidden transition-colors"
                >
                  <AccordionTrigger className="group w-full p-5 md:p-6 items-center hover:no-underline rounded-none [&>svg]:size-5 [&>svg]:text-red-400/70 [&>svg]:translate-y-0">
                    <h3 className="font-serif italic text-base md:text-lg pr-4 group-hover:text-red-300 transition-colors">
                      {faq.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-6 pb-5 md:pb-6 pt-4 border-t border-red-900/20">
                    <p className="text-cream/65 text-sm md:text-base leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </m.div>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <m.div
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
            <Magnetic className="inline-block">
              <Button
                onClick={() => navigate("/connect")}
                className="btn-sheen bg-red-700 hover:bg-red-600 text-white px-8 py-3 uppercase tracking-wider font-semibold"
              >
                Get in Touch
              </Button>
            </Magnetic>
          </m.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
