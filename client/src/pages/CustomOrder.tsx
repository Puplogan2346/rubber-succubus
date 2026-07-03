import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Camera,
  Film,
  Smartphone,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { brand, integrations, isConfigured } from "@/config/site";
import { emailError, requiredText } from "@/lib/validation";
import { notifySuccess } from "@/lib/haptics";
import { usePageMeta } from "@/hooks/usePageMeta";

const FORMATS = [
  { id: "photo", label: "Photo Set", icon: Camera, blurb: "Stills, edited and delivered" },
  { id: "video", label: "Video", icon: Film, blurb: "A clip made to your brief" },
  { id: "social", label: "Social Content", icon: Smartphone, blurb: "Made for your feed" },
  { id: "other", label: "Something Else", icon: Sparkles, blurb: "Surprise me — I love weird" },
] as const;

const VIBES = ["Shiny", "Dark", "Playful", "Sensual", "Dominant", "Soft", "Chaotic", "Elegant"];

const BUDGETS = ["Under $100", "$100–$250", "$250–$500", "$500+", "Let's talk"];

const TIMELINES = ["No rush", "Within a month", "Within 2 weeks", "ASAP (rush fee ok)"];

interface Errors {
  format?: string;
  brief?: string;
  name?: string;
  email?: string;
}

export default function CustomOrder() {
  usePageMeta({
    title: "Custom Order",
    description: "Build your custom content brief — format, vibe, budget, and timeline.",
  });
  const [, navigate] = useLocation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [format, setFormat] = useState<string | null>(null);
  const [vibes, setVibes] = useState<string[]>([]);
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState(BUDGETS[BUDGETS.length - 1]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const formatLabel = FORMATS.find((f) => f.id === format)?.label ?? "";

  const toggleVibe = (vibe: string) =>
    setVibes((v) => (v.includes(vibe) ? v.filter((x) => x !== vibe) : [...v, vibe]));

  const nextFromStep1 = () => {
    if (!format) {
      setErrors({ format: "Pick a format to continue" });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const nextFromStep2 = () => {
    const briefErr = requiredText(brief, "Your brief", 10);
    if (briefErr) {
      setErrors({ brief: briefErr });
      return;
    }
    setErrors({});
    setStep(3);
  };

  const composeBody = () =>
    [
      `Format: ${formatLabel}`,
      `Vibe: ${vibes.length ? vibes.join(", ") : "(open to your take)"}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      "",
      "The brief:",
      brief,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
    ].join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {
      name: requiredText(name, "Name", 2),
      email: emailError(email),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email) return;

    if (!isConfigured(integrations.formspreeFormId)) {
      const subject = encodeURIComponent(`Custom Order Brief: ${formatLabel}`);
      notifySuccess();
      window.location.href = `mailto:${brand.email}?subject=${subject}&body=${encodeURIComponent(composeBody())}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${integrations.formspreeFormId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: `Custom Order Brief: ${formatLabel}`,
          message: composeBody(),
        }),
      });
      if (res.ok) notifySuccess();
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const stepDot = (n: 1 | 2 | 3, label: string) => (
    <div
      className={`flex items-center gap-2 text-xs uppercase tracking-wider ${step >= n ? "text-red-400" : "text-cream/30"}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border ${
          step > n
            ? "bg-red-700 border-red-700 text-white"
            : step === n
              ? "border-red-700 text-red-400"
              : "border-cream/20 text-cream/30"
        }`}
      >
        {step > n ? <Check className="w-3 h-3" /> : n}
      </div>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-2xl mx-auto mt-8 md:mt-12">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Build Your Custom Order</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 font-light">
              Three quick steps. The more you tell me, the better it gets.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {stepDot(1, "Format")}
            <div className={`flex-1 h-px ${step > 1 ? "bg-red-700" : "bg-red-900/30"}`} />
            {stepDot(2, "The Brief")}
            <div className={`flex-1 h-px ${step > 2 ? "bg-red-700" : "bg-red-900/30"}`} />
            {stepDot(3, "Contact")}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-red-900/25 bg-black/30 p-6 md:p-8 rounded-sm"
              >
                <h3 className="font-serif italic text-xl mb-1">What are we making?</h3>
                <p className="text-cream/40 text-xs mb-6">Pick a format, then set the mood.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {FORMATS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setFormat(f.id);
                        setErrors({});
                      }}
                      aria-pressed={format === f.id}
                      className={`p-4 border rounded-sm text-left transition-all group ${
                        format === f.id
                          ? "border-red-600 bg-red-950/25"
                          : "border-red-900/30 bg-black/40 hover:border-red-700/60"
                      }`}
                    >
                      <f.icon
                        className={`w-5 h-5 mb-2 transition-colors ${format === f.id ? "text-red-400" : "text-red-400/60"}`}
                      />
                      <p className="font-serif italic">{f.label}</p>
                      <p className="text-xs text-cream/45 mt-0.5">{f.blurb}</p>
                    </button>
                  ))}
                </div>

                <p className="label-text mb-3">The vibe (pick any)</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {VIBES.map((vibe) => (
                    <button
                      key={vibe}
                      type="button"
                      onClick={() => toggleVibe(vibe)}
                      aria-pressed={vibes.includes(vibe)}
                      className={`px-4 py-1.5 text-xs uppercase tracking-wider border rounded-full transition-all ${
                        vibes.includes(vibe)
                          ? "border-red-600 bg-red-950/40 text-red-300"
                          : "border-red-900/30 text-cream/50 hover:border-red-700/60 hover:text-cream/80"
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>

                {errors.format && (
                  <p className="text-xs text-red-400 mb-4 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.format}
                  </p>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={nextFromStep1}
                    className="w-full btn-sheen bg-red-700 hover:bg-red-600 text-white py-3 uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                  >
                    Next: The Brief
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-red-900/25 bg-black/30 p-6 md:p-8 rounded-sm"
              >
                <h3 className="font-serif italic text-xl mb-1">Tell me your vision</h3>
                <p className="text-cream/40 text-xs mb-6">
                  Outfit, scenario, references, boundaries — anything that helps.
                </p>

                <label
                  htmlFor="order-brief"
                  className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2"
                >
                  The brief <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="order-brief"
                  rows={6}
                  value={brief}
                  onChange={(e) => {
                    setBrief(e.target.value);
                    if (errors.brief) setErrors({});
                  }}
                  placeholder="Black latex catsuit, moody studio lighting, slow reveal..."
                  className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm resize-none mb-1 ${
                    errors.brief ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                  }`}
                />
                {errors.brief && (
                  <p className="text-xs text-red-400 mb-4 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.brief}
                  </p>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mt-5 mb-8">
                  <div>
                    <label
                      htmlFor="order-budget"
                      className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2"
                    >
                      Budget
                    </label>
                    <select
                      id="order-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-black/50 border border-red-900/30 px-4 py-3 text-sm text-cream focus:outline-none focus:border-red-600 rounded-sm"
                    >
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-black">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="order-timeline"
                      className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2"
                    >
                      Timeline
                    </label>
                    <select
                      id="order-timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-black/50 border border-red-900/30 px-4 py-3 text-sm text-cream focus:outline-none focus:border-red-600 rounded-sm"
                    >
                      {TIMELINES.map((t) => (
                        <option key={t} value={t} className="bg-black">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-cream/30 text-cream/60 hover:border-cream/60 hover:text-cream px-6 uppercase tracking-wider text-xs"
                  >
                    Back
                  </Button>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={nextFromStep2}
                      className="w-full btn-sheen bg-red-700 hover:bg-red-600 text-white py-3 uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                    >
                      Next: Contact
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="border border-red-900/25 bg-black/30 p-6 md:p-8 rounded-sm"
              >
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 text-green-400 p-5 border border-green-900/40 bg-green-950/15 rounded-sm"
                  >
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">
                      Brief received! I'll reply within 48 hours with a quote.
                    </span>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="font-serif italic text-xl mb-1">Almost there</h3>
                    <p className="text-cream/40 text-xs mb-6">Where do I send your quote?</p>

                    {/* Summary */}
                    <div className="space-y-2 mb-6 p-4 bg-black/40 border border-red-900/15 rounded-sm text-sm">
                      <div className="flex justify-between">
                        <span className="text-cream/45">Format</span>
                        <span className="text-cream/90">{formatLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream/45">Vibe</span>
                        <span className="text-cream/90 text-right">
                          {vibes.length ? vibes.join(", ") : "Your call"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream/45">Budget</span>
                        <span className="text-cream/90">{budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream/45">Timeline</span>
                        <span className="text-cream/90">{timeline}</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="order-name"
                          className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2"
                        >
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="order-name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          placeholder="How should I address you?"
                          className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                            errors.name ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="order-email"
                          className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2"
                        >
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="order-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="your@email.com"
                          className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                            errors.email ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-3 text-red-400 text-sm p-3 border border-red-900/30 bg-red-950/10 rounded-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Something went wrong. Please email me directly.</span>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="border-cream/30 text-cream/60 hover:border-cream/60 hover:text-cream px-6 uppercase tracking-wider text-xs"
                        >
                          Back
                        </Button>
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full btn-sheen bg-red-700 hover:bg-red-600 disabled:bg-red-900 text-white py-3 uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            {status === "sending" ? "Sending..." : "Send My Brief"}
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
