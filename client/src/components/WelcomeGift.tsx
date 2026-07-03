import { useState } from "react";
import { m } from "framer-motion";
import { Gift, ExternalLink, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/Magnetic";
import { brand, integrations, isConfigured, welcomeGift } from "@/config/site";
import { emailError } from "@/lib/validation";

/**
 * Welcome-gift funnel: a free teaser unlocked by joining the mailing list —
 * captures visitors who aren't ready to subscribe to a paid platform yet.
 * Hidden until `welcomeGift.url` is set in site.ts. Signup goes through the
 * same Mailchimp integration as the newsletter (mailto fallback while
 * unconfigured), then the gift link is revealed.
 */
export default function WelcomeGift() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "sending" | "unlocked">("idle");

  if (!welcomeGift.url) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = emailError(email);
    setError(err);
    if (err) return;

    if (!isConfigured(integrations.mailchimpActionUrl)) {
      // No list configured yet: capture via email, then unlock anyway.
      window.location.href = `mailto:${brand.email}?subject=Newsletter%20Signup%20(Welcome%20Gift)&body=Please%20add%20me%20to%20your%20newsletter%3A%20${encodeURIComponent(email)}`;
      setStatus("unlocked");
      return;
    }

    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("EMAIL", email);
      await fetch(integrations.mailchimpActionUrl, { method: "POST", body: formData, mode: "no-cors" });
    } catch {
      // no-cors submissions can't be inspected anyway — still unlock.
    }
    setStatus("unlocked");
  };

  return (
    <section className="py-20 px-6 border-t border-red-900/15 bg-gradient-to-b from-black to-red-950/5">
      <div className="max-w-xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 md:p-10 border border-red-900/30 bg-black/40 rounded-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <Gift className="w-8 h-8 text-red-400/70 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif italic mb-3">{welcomeGift.label}</h2>
          <div className="garnet-rule max-w-[60px] mx-auto mb-6" />
          <p className="text-cream/60 mb-8 font-light">{welcomeGift.blurb}</p>

          {status === "unlocked" ? (
            <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <p className="text-sm text-green-400 mb-6">You're in. Enjoy the gift.</p>
              <Magnetic className="inline-block">
                <a
                  href={welcomeGift.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-sm uppercase tracking-wider font-semibold text-sm transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  Unlock {welcomeGift.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </m.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="flex-1 max-w-xs mx-auto sm:mx-0 w-full">
                <input
                  type="email"
                  aria-label="Email address for the welcome gift"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(undefined);
                  }}
                  placeholder="your@email.com"
                  className={`w-full bg-black/50 border px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm text-sm ${
                    error ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                  }`}
                />
                {error && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 text-left">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}
              </div>
              <Magnetic className="inline-block">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-sheen bg-red-700 hover:bg-red-600 disabled:bg-red-900 text-white px-6 py-3 uppercase tracking-wider font-semibold text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    "Unlock It"
                  )}
                </Button>
              </Magnetic>
            </form>
          )}

          <p className="text-[11px] text-cream/30 mt-6">
            No spam — just drops, offers, and the occasional secret. Unsubscribe anytime.
          </p>
        </m.div>
      </div>
    </section>
  );
}
