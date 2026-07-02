import { Button } from "@/components/ui/button";
import { useLocation, useRoute } from "wouter";
import { ShieldCheck, CreditCard, ExternalLink, ArrowLeft, Check, AlertCircle, Loader } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { brand, getService, integrations, isConfigured } from "@/config/site";
import { emailError, requiredText } from "@/lib/validation";

interface FormErrors {
  name?: string;
  email?: string;
  details?: string;
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/checkout/:serviceId");

  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const serviceId = params?.serviceId || "custom-order";

  const service = getService(serviceId);
  const stripeLink = integrations.stripePaymentLinks[service.id];
  const isStripeConfigured = isConfigured(stripeLink);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: requiredText(form.name, "Name", 2),
      email: emailError(form.email),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setErrors({});
      setStep(2);
    }
  };

  const handleStripePayment = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (isStripeConfigured) {
        const url = new URL(stripeLink);
        if (form.email) url.searchParams.set("prefilled_email", form.email);
        window.open(url.toString(), "_blank");
        
        // Show success message
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        // Fallback to email
        const subject = encodeURIComponent(`Booking Inquiry: ${service.checkoutTitle}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nService: ${service.checkoutTitle}\n\nProject Details:\n${form.details}`
        );
        window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
      }
    } catch (error) {
      setSubmitError("Failed to process payment. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="pb-20 px-6 flex items-start justify-center min-h-[calc(100vh-72px)]">
        <div className="max-w-lg w-full mt-8 md:mt-12">

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </motion.button>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${step >= 1 ? "text-red-400" : "text-cream/30"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border ${
                step > 1 ? "bg-red-700 border-red-700 text-white" : step === 1 ? "border-red-700 text-red-400" : "border-cream/20 text-cream/30"
              }`}>
                {step > 1 ? <Check className="w-3 h-3" /> : "1"}
              </div>
              Details
            </div>
            <div className={`flex-1 h-px ${step > 1 ? "bg-red-700" : "bg-red-900/30"}`} />
            <div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${step >= 2 ? "text-red-400" : "text-cream/30"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border ${
                step === 2 ? "border-red-700 text-red-400" : "border-cream/20 text-cream/30"
              }`}>
                2
              </div>
              Payment
            </div>
          </motion.div>

          {/* Service Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-red-900/25 bg-black/30 p-6 mb-6 rounded-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-950/40 border border-red-900/40 rounded-sm flex items-center justify-center text-2xl">
                {service.emoji}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-serif italic">{service.checkoutTitle}</h2>
                <p className="text-cream/45 text-xs mt-0.5">{service.checkoutDescription}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-cream/35">Starting at</p>
                <p className="text-lg font-serif italic text-red-400">{service.checkoutPrice}</p>
              </div>
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-red-900/25 bg-black/30 p-6 md:p-8 rounded-sm mb-6"
              >
                <h3 className="font-serif italic text-xl mb-1">Your Details</h3>
                <p className="text-cream/40 text-xs mb-6">Tell me a bit about yourself and your project.</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="checkout-name" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="checkout-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="How should I address you?"
                        className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                          errors.name ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                        }`}
                      />
                      {errors.name && (
                        <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="checkout-email" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="checkout-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="your@email.com"
                        className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                          errors.email ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                        }`}
                      />
                      {errors.email && (
                        <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="checkout-details" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">Project Vision</label>
                    <textarea
                      id="checkout-details"
                      rows={4}
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      placeholder="Tell me what you're imagining... the more detail, the better."
                      className="w-full bg-black/50 border border-red-900/30 px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:border-red-600 focus:bg-black/70 transition-all rounded-sm resize-none"
                    />
                    <p className="text-xs text-cream/30 mt-1">Optional but recommended for custom projects</p>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full btn-sheen bg-red-700 hover:bg-red-600 text-white py-4 sm:py-3 px-6 uppercase tracking-wider font-semibold text-sm sm:text-xs"
                    >
                      Continue to Payment
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="border border-red-900/25 bg-black/30 p-6 md:p-8 rounded-sm mb-6"
              >
                <h3 className="font-serif italic text-xl mb-1">Confirm & Pay</h3>
                <p className="text-cream/40 text-xs mb-6">
                  {isStripeConfigured
                    ? "Review your details and complete payment securely through Stripe."
                    : "Review your details. You'll be redirected to send a booking inquiry."}
                </p>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-green-950/30 border border-green-900/40 rounded-sm flex items-center gap-2 text-xs text-green-300"
                  >
                    <Check className="w-4 h-4" />
                    Payment initiated successfully!
                  </motion.div>
                )}

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-950/30 border border-red-900/40 rounded-sm flex items-center gap-2 text-xs text-red-300"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {submitError}
                  </motion.div>
                )}

                {/* Summary */}
                <div className="space-y-3 mb-6 p-4 bg-black/40 border border-red-900/15 rounded-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/45">Name</span>
                    <span className="text-cream/90 font-medium">{form.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/45">Email</span>
                    <span className="text-cream/90 font-medium">{form.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/45">Service</span>
                    <span className="text-cream/90 font-medium">{service.checkoutTitle}</span>
                  </div>
                  {form.details && (
                    <div className="border-t border-red-900/15 pt-3">
                      <p className="text-cream/45 text-xs mb-1">Project Vision</p>
                      <p className="text-cream/70 text-sm">{form.details}</p>
                    </div>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleStripePayment}
                    disabled={isSubmitting}
                    className="w-full btn-sheen bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:cursor-not-allowed text-white py-3 uppercase tracking-wider font-semibold flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : isStripeConfigured ? (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Pay with Stripe
                        <ExternalLink className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Send Booking Inquiry
                      </>
                    )}
                  </Button>
                </motion.div>

                <button
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="w-full text-center text-xs text-cream/35 hover:text-cream/60 mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Edit details
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-[11px] text-cream/30"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-900/70" />
            <span>Secure payments powered by Stripe. Your data is never stored on this site.</span>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
