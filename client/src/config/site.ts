/**
 * Central site configuration — the single file to edit for content changes.
 *
 * Everything the site displays lives here: brand identity, services and
 * pricing, FAQ, events, gallery placeholders, social links, and third-party
 * integration endpoints. Pages import from this file; they contain layout
 * only.
 *
 * The raw content (all the text, prices, links, toggles) lives in
 * ./site-content.json so it can also be edited from the iPhone app's admin
 * screen; this file re-exports it with types and re-attaches things JSON
 * can't hold (Lucide icon components). Edit either file — the JSON for
 * content, this file for icons/types/helpers.
 *
 * Integration values that still look like placeholders ("YOUR_...") keep the
 * site in fallback mode: forms degrade to mailto: links and the calendar
 * shows a "coming soon" card. Paste real IDs/URLs into site-content.json to
 * go live.
 */

import { Camera, Film, Heart, Mail, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import content from "./site-content.json";

/** Repo path of the JSON content file — used by the in-app admin editor. */
export const CONTENT_PATH = "client/src/config/site-content.json";

// ─── BRAND ────────────────────────────────────────────────────────────────────

export const brand = content.brand;

// ─── COMMISSIONS STATUS ───────────────────────────────────────────────────────
// Shown as a live-status chip in the navigation and adapts the Services CTAs.
// "open" → green dot + "Commissions open"; "waitlist" → amber; "closed" → red.

export type CommissionsStatus = "open" | "waitlist" | "closed";

export const commissions: { status: CommissionsStatus; note?: string } = {
  status: content.commissions.status as CommissionsStatus,
};

// ─── EDITORIAL TICKER ─────────────────────────────────────────────────────────
// Words for the slow-scrolling marquee strip on the Home page.

export const tickerWords: string[] = content.tickerWords;

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

/** Icons are React components, so they stay here rather than in the JSON. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  photography: Camera,
  videography: Film,
  "social-content": Smartphone,
  "custom-order": Sparkles,
};

export const services: Service[] = content.services.map((s) => ({
  ...s,
  icon: SERVICE_ICONS[s.id] ?? Sparkles,
}));

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

export const faqItems: FaqItem[] = content.faqItems;

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

export const upcomingEvents: EventItem[] = content.upcomingEvents;

// ─── GALLERY ──────────────────────────────────────────────────────────────────
// To show real work: drop an image into client/public/gallery/ and set `src`
// on an entry (e.g. src: "/gallery/my-shot.webp") plus a short `alt`
// description. Entries without `src` render as placeholder tiles. For video
// items, `src` is a poster/thumbnail image and `href` links out to wherever
// the clip is hosted.

export interface GalleryItem {
  id: number;
  type: "photo" | "video";
  /** Tailwind aspect-ratio class controlling the masonry tile shape */
  aspect: string;
  /** Image path under client/public, e.g. "/gallery/shot-01.webp" */
  src?: string;
  /** Short description of the image for screen readers */
  alt?: string;
  /** Optional caption shown in the hover overlay */
  caption?: string;
  /** Video items only: external link to watch the clip */
  href?: string;
}

export const galleryItems: GalleryItem[] = content.galleryItems.map((g) => ({
  ...g,
  type: g.type as GalleryItem["type"],
}));

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

/** Icons for the nav/footer icon row, keyed by social name. */
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  "Twitter / X": Heart,
};

export const socialLinks: SocialLink[] = content.socialLinks.map((s) => ({
  ...s,
  icon: SOCIAL_ICONS[s.name],
}));

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

// ─── ANNOUNCEMENT BANNER ──────────────────────────────────────────────────────
// Set `message` to show a slim banner under the navigation on every page —
// e.g. a content drop, live session, or event. Leave it "" to hide the banner.
// Add `targetDate` (ISO string, e.g. "2026-08-01T20:00:00-07:00") for a live
// countdown next to the message; it disappears once the date passes.

export interface Announcement {
  message: string;
  targetDate?: string;
  linkText?: string;
  /** Internal route ("/connect") or external URL */
  linkHref?: string;
}

export const announcement: Announcement = content.announcement;

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
// Anonymous fan/client reviews shown on the Home page. The section stays
// hidden until at least one entry exists.
// Example: { quote: "Worth every penny — the attention to detail is unreal.", attribution: "Custom order client" }

export interface Testimonial {
  quote: string;
  attribution: string;
}

export const testimonials: Testimonial[] = content.testimonials;

// ─── THE VAULT (exclusive content teaser) ─────────────────────────────────────
// Set `url` to your paid-content page (OnlyFans etc.) to show a teaser section
// of blurred locked tiles on the Home page. Leave "" to hide it entirely.

export const vault: { url: string; label: string } = content.vault;

// ─── THEMED DAYS ──────────────────────────────────────────────────────────────
// Weekly content themes shown as chips on the Events page, e.g.
// { day: "Friday", theme: "Rubber Friday" }. Empty array hides the strip.

export interface ThemedDay {
  day: string;
  theme: string;
}

export const themedDays: ThemedDay[] = content.themedDays;

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────────
// Replace the "YOUR_..." placeholders in site-content.json with real values to
// activate each integration. Until then the site falls back to mailto: links /
// placeholder cards. Setup instructions live in the README.

export const integrations: {
  /** formspree.io form ID, e.g. "xabcdefg" */
  formspreeFormId: string;
  /** Mailchimp embedded-form action URL */
  mailchimpActionUrl: string;
  /** Stripe payment links, one per service id */
  stripePaymentLinks: Record<string, string>;
  /** Google Calendar embed src URL (Settings → Integrate calendar) */
  googleCalendarEmbedSrc: string;
} = content.integrations;

/** True once a placeholder value has been replaced with a real one. */
export function isConfigured(value: string | undefined): boolean {
  return !!value && !value.startsWith("YOUR_");
}
