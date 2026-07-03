import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Mail, ExternalLink, Send, CheckCircle, AlertCircle, Loader, Gift } from "lucide-react";
import { m } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { brand, integrations, isConfigured, orderedSocialLinks, welcomeGift } from "@/config/site";
import { emailError, requiredText } from "@/lib/validation";
import { notifySuccess } from "@/lib/haptics";
import { usePageMeta } from "@/hooks/usePageMeta";

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface NewsletterErrors {
  email?: string;
}

export default function Connect() {
  usePageMeta({ title: "Connect", description: "All socials, contact form, and newsletter signup." });
  const [, navigate] = useLocation();

  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});
  
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [newsletterErrors, setNewsletterErrors] = useState<NewsletterErrors>({});

  // Validate contact form
  const validateContactForm = (): boolean => {
    const newErrors: ContactFormErrors = {
      name: requiredText(contactForm.name, "Name", 2),
      email: emailError(contactForm.email),
      subject: requiredText(contactForm.subject, "Subject", 3),
      message: requiredText(contactForm.message, "Message", 10),
    };

    setContactErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // Validate newsletter email
  const validateNewsletterEmail = (): boolean => {
    const newErrors: NewsletterErrors = { email: emailError(newsletterEmail) };

    setNewsletterErrors(newErrors);
    return !newErrors.email;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) {
      return;
    }

    if (!isConfigured(integrations.formspreeFormId)) {
      const subject = encodeURIComponent(contactForm.subject || `Inquiry from ${brand.name} site`);
      const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`);
      notifySuccess();
      window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
      return;
    }

    setContactStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${integrations.formspreeFormId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        notifySuccess();
        setContactStatus("success");
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setContactErrors({});
        setTimeout(() => setContactStatus("idle"), 5000);
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateNewsletterEmail()) {
      return;
    }

    if (!isConfigured(integrations.mailchimpActionUrl)) {
      notifySuccess();
      window.location.href = `mailto:${brand.email}?subject=Newsletter%20Signup&body=Please%20add%20me%20to%20your%20newsletter%3A%20${encodeURIComponent(newsletterEmail)}`;
      return;
    }

    setNewsletterStatus("sending");
    try {
      const formData = new FormData();
      formData.append("EMAIL", newsletterEmail);
      await fetch(integrations.mailchimpActionUrl, { method: "POST", body: formData, mode: "no-cors" });
      notifySuccess();
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setNewsletterErrors({});
      setTimeout(() => setNewsletterStatus("idle"), 5000);
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <PageWrapper>
      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 mb-16"
          >
            <h1 className="heading-shine text-4xl md:text-5xl font-serif italic mb-4">Let's Connect</h1>
            <div className="garnet-rule max-w-[50px] mb-6" />
            <p className="text-cream/60 max-w-2xl text-base md:text-lg font-light leading-relaxed">
              Follow me across all platforms to stay updated on new content, behind-the-scenes moments, and exclusive drops.
            </p>
          </m.div>

          {/* Social Links Grid */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {orderedSocialLinks.map((social, i) => (
                <m.a
                  key={i}
                  href={social.live ? social.url : undefined}
                  target={social.live ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-disabled={social.live ? undefined : true}
                  tabIndex={social.live ? undefined : -1}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                  whileHover={social.live ? { y: -3, borderColor: "rgba(185, 28, 28, 0.5)" } : {}}
                  className={`p-5 border bg-black/30 transition-all block rounded-sm ${
                    social.live
                      ? "border-red-900/30 hover:bg-red-950/15 cursor-pointer"
                      : "border-red-900/15 opacity-40 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  <div className="text-3xl mb-2">{social.emoji}</div>
                  <h3 className="font-serif italic text-sm md:text-base mb-0.5">{social.name}</h3>
                  <p className="text-xs text-cream/45">{social.handle}</p>
                  {social.live && (
                    <div className="flex items-center gap-1 text-[10px] text-red-400/70 mt-2 uppercase tracking-wider">
                      Visit <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  )}
                </m.a>
              ))}
            </div>
          </m.div>

          {/* Email Contact */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 md:p-8 border border-red-900/30 bg-red-950/8 rounded-sm mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-950/40 border border-red-900/40 rounded-sm flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-serif italic text-lg mb-1">Email</h3>
                <p className="text-cream/50 text-sm mb-3 font-light">For custom orders, inquiries, or just to chat:</p>
                <a href={`mailto:${brand.email}`} className="text-red-400 hover:text-red-300 transition-colors text-sm underline underline-offset-2">
                  {brand.email}
                </a>
                <p className="text-[11px] uppercase tracking-widest text-cream/35 mt-3">{brand.responseTime}</p>
              </div>
            </div>
          </m.div>

          {/* Contact Form */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-6 md:p-8 border border-red-900/25 bg-black/30 rounded-sm mb-8"
          >
            <h3 className="font-serif italic text-2xl mb-2">Send a Message</h3>
            <p className="text-cream/45 text-sm mb-6 font-light">
              Fill out the form below and your message will be sent directly to my inbox.
            </p>

            {contactStatus === "success" ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 text-green-400 p-5 border border-green-900/40 bg-green-950/15 rounded-sm"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Message sent! I'll get back to you soon.</span>
              </m.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, name: e.target.value });
                          if (contactErrors.name) setContactErrors({ ...contactErrors, name: undefined });
                        }}
                        placeholder="Your name"
                        className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                          contactErrors.name ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                        }`}
                      />
                      {contactErrors.name && (
                        <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {contactErrors.name && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {contactErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, email: e.target.value });
                          if (contactErrors.email) setContactErrors({ ...contactErrors, email: undefined });
                        }}
                        placeholder="your@email.com"
                        className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                          contactErrors.email ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                        }`}
                      />
                      {contactErrors.email && (
                        <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {contactErrors.email && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {contactErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="contact-subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, subject: e.target.value });
                        if (contactErrors.subject) setContactErrors({ ...contactErrors, subject: undefined });
                      }}
                      placeholder="Custom order, collaboration, general inquiry..."
                      className={`w-full bg-black/50 border px-4 py-4 text-base sm:text-sm text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm ${
                        contactErrors.subject ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                      }`}
                    />
                    {contactErrors.subject && (
                      <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                    )}
                  </div>
                  {contactErrors.subject && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {contactErrors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-widest text-cream/40 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, message: e.target.value });
                        if (contactErrors.message) setContactErrors({ ...contactErrors, message: undefined });
                      }}
                      placeholder="Tell me what you're looking for..."
                      className={`w-full bg-black/50 border px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm resize-none text-sm ${
                        contactErrors.message ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                      }`}
                    />
                    {contactErrors.message && (
                      <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                    )}
                  </div>
                  {contactErrors.message && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {contactErrors.message}
                    </p>
                  )}
                </div>
                {contactStatus === "error" && (
                  <div className="flex items-center gap-3 text-red-400 text-sm p-3 border border-red-900/30 bg-red-950/10 rounded-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Something went wrong. Please email me directly.</span>
                  </div>
                )}
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="btn-sheen bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:cursor-not-allowed text-white px-8 py-3 uppercase tracking-wider font-semibold flex items-center gap-2 text-sm transition-all"
                  >
                    {contactStatus === "sending" ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </m.div>
              </form>
            )}
          </m.div>

          {/* Newsletter Signup */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-6 md:p-8 border border-red-900/25 bg-black/30 rounded-sm"
          >
            <h3 className="font-serif italic text-2xl mb-2">Stay in the Loop</h3>
            <p className="text-cream/50 text-sm mb-6 font-light">
              Get notified when new content drops, special offers, and exclusive announcements.
            </p>
            {newsletterStatus === "success" ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 border border-green-900/40 bg-green-950/15 rounded-sm"
              >
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">You're subscribed! Welcome to the inner circle.</span>
                </div>
                {/* Welcome gift unlock — shown once welcomeGift.url is set in site.ts */}
                {welcomeGift.url && (
                  <a
                    href={welcomeGift.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-red-300 hover:text-red-200 underline underline-offset-2 transition-colors"
                  >
                    <Gift className="w-4 h-4" />
                    Your welcome gift: {welcomeGift.label}
                  </a>
                )}
              </m.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    aria-label="Email address for newsletter"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterErrors.email) setNewsletterErrors({ email: undefined });
                    }}
                    placeholder="your@email.com"
                    className={`w-full bg-black/50 border px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:bg-black/70 transition-all rounded-sm text-sm ${
                      newsletterErrors.email ? "border-red-500 focus:border-red-500" : "border-red-900/30 focus:border-red-600"
                    }`}
                  />
                  {newsletterErrors.email && (
                    <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-red-400" />
                  )}
                </div>
                {newsletterErrors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {newsletterErrors.email}
                  </p>
                )}
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={newsletterStatus === "sending"}
                    className="btn-sheen bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:cursor-not-allowed text-white px-6 py-3 uppercase tracking-wider font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {newsletterStatus === "sending" ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </m.div>
              </form>
            )}
          </m.div>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
