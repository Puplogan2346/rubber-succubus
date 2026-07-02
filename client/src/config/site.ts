/**
 * Central site configuration — the single file to edit for content changes.
 *
 * Everything the site displays lives here: brand identity, services and
 * pricing, FAQ, events, gallery placeholders, social links, and third-party
 * integration endpoints. Pages import from this file; they contain layout
 * only.
 *
 * Integration values that still look like placeholders ("YOUR_...") keep the
 * site in fallback mode: forms degrade to mailto: links and the calendar
 * shows a "coming soon" card. Paste real IDs/URLs below to go live.
 */

import { Camera, Film, Heart, Mail, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── BRAND ────────────────────────────────────────────────────────────────────

export const brand = {
  name: "Rubber Succubus",
  handle: "@Rubber_Succubus",
  email: "rubbersuccubusbiz@gmail.com",
  location: "San Francisco",
  url: "https://rubbersuccubus.com",
  tagline: "Rubber, latex, and gimp aesthetics crafted with intention. Based in San Francisco.",
  description:
    "Rubber Succubus — Custom content creation. Photography, videography, and bespoke content. 18+ only.",
  twitterUrl: "https://x.com/rubber_succubus",
} as const;

// ─── SERVICES ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  /** Card title on the Services page */
  title: string;
  /** Summary title on the Checkout page */
  checkoutTitle: string;
  /** Longer copy for the Services page card */
  description: string;
  /** Short copy for the Checkout summary */
  checkoutDescription: string;
  /** Price shown on the Services page */
  price: string;
  /** Price shown on the Checkout summary */
  checkoutPrice: string;
  icon: LucideIcon;
  emoji: string;
  includes: string[];
}

export const services: Service[] = [
  {
    id: "photography",
    title: "Photography",
    checkoutTitle: "Photography Session",
    description:
      "Custom photo shoots featuring rubber, latex, and gimp aesthetics. Every shot crafted to capture your vision.",
    checkoutDescription: "Custom photo shoot with rubber/latex/gimp aesthetic",
    price: "[Add your pricing]",
    checkoutPrice: "[Add your price]",
    icon: Camera,
    emoji: "📸",
    includes: [
      "Number of edited photos",
      "Session duration",
      "Location/studio setup",
      "Professional retouching",
    ],
  },
  {
    id: "videography",
    title: "Videography",
    checkoutTitle: "Videography Package",
    description:
      "Professional video content creation tailored to your vision. From concept to final cut.",
    checkoutDescription: "Professional video content creation",
    price: "[Add your pricing]",
    checkoutPrice: "[Add your price]",
    icon: Film,
    emoji: "🎬",
    includes: [
      "Video length & format",
      "Editing & color grading",
      "Multiple angles",
      "Delivery in your format",
    ],
  },
  {
    id: "social-content",
    title: "Social Media Content",
    checkoutTitle: "Social Media Content",
    description:
      "Curated content for Instagram, TikTok, Twitter, and more. Grow your presence with quality.",
    checkoutDescription: "Curated content for your favorite platforms",
    price: "[Add your pricing]",
    checkoutPrice: "[Add your price]",
    icon: Smartphone,
    emoji: "📱",
    includes: [
      "Number of posts/reels",
      "Content themes & style",
      "Posting schedule",
      "Captions & hashtags",
    ],
  },
  {
    id: "custom-order",
    title: "Custom Orders",
    checkoutTitle: "Custom Order",
    description:
      "Bespoke content creation. If you can imagine it, let's bring it to life together.",
    checkoutDescription: "Bespoke content creation tailored to your vision",
    price: "[Contact for quote]",
    checkoutPrice: "Quote on request",
    icon: Sparkles,
    emoji: "✨",
    includes: [
      "Your boundaries & limits",
      "Turnaround time",
      "Payment terms",
      "Revisions included",
    ],
  },
];

/** Look up a service by id, falling back to the custom order. */
export function getService(id: string | undefined): Service {
  return services.find((s) => s.id === id) ?? services.find((s) => s.id === "custom-order")!;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "pricing",
    question: "How much do your services cost?",
    answer:
      "Photography starts at a per-hour rate, videography packages range depending on scope, and custom orders are quoted individually. Reach out for a detailed quote tailored to your vision.",
  },
  {
    id: "turnaround",
    question: "What's your turnaround time?",
    answer:
      "Standard turnaround is 2-3 weeks for editing and delivery. Rush orders are available for an additional fee. I'll always give you a clear timeline before we start.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "I accept payments through Stripe (cards), PayPal, and bank transfer. A 50% deposit is required to book your session, with the balance due before final delivery.",
  },
  {
    id: "boundaries",
    question: "Do you have any content boundaries?",
    answer:
      "I work within the rubber, latex, and gimp aesthetic. Specific limits and hard boundaries can be discussed during our initial consultation. Communication and consent are always the priority.",
  },
  {
    id: "custom",
    question: "Can you do custom requests?",
    answer:
      "Absolutely. Custom orders are my specialty. Let's chat about your vision and I'll put together a quote that works for both of us. The weirder, the better.",
  },
  {
    id: "revisions",
    question: "What's your revision policy?",
    answer:
      "Up to 2 rounds of revisions are included with every order. Additional revisions are available at a per-round fee. I want you to be thrilled with the final result.",
  },
  {
    id: "privacy",
    question: "Will my order remain private?",
    answer:
      "100% confidential. I never share client content without explicit written permission. Your privacy and discretion are non-negotiable.",
  },
];

// ─── EVENTS ───────────────────────────────────────────────────────────────────

export interface EventItem {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  link: string;
  live: boolean;
}

export const upcomingEvents: EventItem[] = [
  {
    title: "[Event Name]",
    date: "[Date TBD]",
    time: "[Time TBD]",
    location: "San Francisco, CA",
    description: "Details coming soon. Follow socials for announcements.",
    link: "#",
    live: false,
  },
  {
    title: "[Shoot / Collab]",
    date: "[Date TBD]",
    time: "[Time TBD]",
    location: "San Francisco, CA",
    description: "Collaborative session details to be announced.",
    link: "#",
    live: false,
  },
  {
    title: "[Pop-up / Appearance]",
    date: "[Date TBD]",
    time: "[Time TBD]",
    location: "[Venue TBD]",
    description: "Venue and appearance details coming soon.",
    link: "#",
    live: false,
  },
];

// ─── GALLERY ──────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: number;
  type: "photo" | "video";
  /** Tailwind aspect-ratio class controlling the masonry tile shape */
  aspect: string;
}

export const galleryItems: GalleryItem[] = [
  { id: 1, type: "photo", aspect: "aspect-[3/4]" },
  { id: 2, type: "photo", aspect: "aspect-square" },
  { id: 3, type: "video", aspect: "aspect-[4/3]" },
  { id: 4, type: "photo", aspect: "aspect-[3/4]" },
  { id: 5, type: "photo", aspect: "aspect-square" },
  { id: 6, type: "video", aspect: "aspect-[3/4]" },
  { id: 7, type: "photo", aspect: "aspect-square" },
  { id: 8, type: "photo", aspect: "aspect-[4/3]" },
  { id: 9, type: "photo", aspect: "aspect-square" },
];

// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────────

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  /** Emoji shown on the Connect page grid */
  emoji: string;
  /** False renders the entry as a disabled "coming soon" tile */
  live: boolean;
  /** Lucide icon for entries surfaced in the nav/footer icon row */
  icon?: LucideIcon;
  /** True surfaces the entry in the navigation bar icon row */
  primary?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Twitter / X",
    handle: "@Rubber_Succubus",
    url: "https://x.com/rubber_succubus",
    emoji: "𝕏",
    live: true,
    icon: Heart,
    primary: true,
  },
  { name: "Telegram", handle: "@Rubber_Succubus", url: "https://t.me/rubber_succubus", emoji: "✈️", live: true },
  { name: "Linktree", handle: "Rubber_Succubus", url: "https://linktr.ee/Rubber_Succubus", emoji: "🔗", live: true },
  { name: "Instagram", handle: "[Coming soon]", url: "#", emoji: "📷", live: false },
  { name: "FetLife", handle: "[Coming soon]", url: "#", emoji: "🖤", live: false },
  { name: "OnlyFans", handle: "[Coming soon]", url: "#", emoji: "🔞", live: false },
  { name: "Throne Wishlist", handle: "[Coming soon]", url: "#", emoji: "👑", live: false },
  { name: "Reddit", handle: "[Coming soon]", url: "#", emoji: "🤖", live: false },
  { name: "Bluesky", handle: "[Coming soon]", url: "#", emoji: "🦋", live: false },
];

/** Links shown as icons in the navigation bar and mobile menu. */
export const primarySocials: SocialLink[] = [
  ...socialLinks.filter((s) => s.primary),
  {
    name: "Email",
    handle: brand.email,
    url: `mailto:${brand.email}`,
    emoji: "✉️",
    live: true,
    icon: Mail,
  },
];

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────────
// Replace the "YOUR_..." placeholders with real values to activate each
// integration. Until then the site falls back to mailto: links / placeholder
// cards. Setup instructions live in the README.

export const integrations = {
  /** formspree.io form ID, e.g. "xabcdefg" */
  formspreeFormId: "YOUR_FORMSPREE_FORM_ID",
  /** Mailchimp embedded-form action URL */
  mailchimpActionUrl: "YOUR_MAILCHIMP_ACTION_URL",
  /** Stripe payment links, one per service id */
  stripePaymentLinks: {
    photography: "YOUR_STRIPE_PAYMENT_LINK_PHOTOGRAPHY",
    videography: "YOUR_STRIPE_PAYMENT_LINK_VIDEOGRAPHY",
    "social-content": "YOUR_STRIPE_PAYMENT_LINK_SOCIAL",
    "custom-order": "YOUR_STRIPE_PAYMENT_LINK_CUSTOM",
  } as Record<string, string>,
  /** Google Calendar embed src URL (Settings → Integrate calendar) */
  googleCalendarEmbedSrc: "YOUR_GOOGLE_CALENDAR_EMBED_SRC",
};

/** True once a placeholder value has been replaced with a real one. */
export function isConfigured(value: string | undefined): boolean {
  return !!value && !value.startsWith("YOUR_");
}
