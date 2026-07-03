import { m } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { legalDocs, legalReviewed, type LegalDocKey } from "@/config/legal";
import { usePageMeta } from "@/hooks/usePageMeta";

/**
 * Shared renderer for the legal pages (/privacy, /terms, /2257). Content
 * lives in config/legal.ts; while `legalReviewed` is false a draft notice
 * reminds the owner the text still needs finalizing.
 */
export default function Legal({ doc }: { doc: LegalDocKey }) {
  const page = legalDocs[doc];
  usePageMeta({ title: page.title, description: page.description });

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-12"
          >
            <h1 className="heading-shine text-4xl md:text-5xl font-serif italic mb-4">{page.title}</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-xs uppercase tracking-widest text-cream/35">
              Last updated: {page.lastUpdated}
            </p>
          </m.div>

          {!legalReviewed && (
            <div className="mb-10 p-4 border border-amber-700/40 bg-amber-950/15 rounded-sm flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/80 leading-relaxed">
                Draft template — the [bracketed] details in config/legal.ts still need your real
                information, and the text should be reviewed (ideally by a lawyer) before relying
                on it. Set <code className="text-amber-200">legalReviewed = true</code> there to
                remove this notice.
              </p>
            </div>
          )}

          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-10"
          >
            {page.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="font-serif italic text-xl md:text-2xl mb-3">{section.heading}</h2>
                )}
                <div className="space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-sm md:text-base text-cream/65 font-light leading-relaxed whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </m.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
