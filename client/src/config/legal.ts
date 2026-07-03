/**
 * DRAFT legal page content — templates for owner review, not legal advice.
 *
 * Every [BRACKETED] value needs replacing with your real details, and the
 * whole text deserves a read-through (ideally by a lawyer familiar with
 * adult-content businesses) before you rely on it. While `reviewed` is
 * false, each page shows a small draft notice; flip it to true once you've
 * finalized the copy.
 */

import { brand } from "./site";

/** Set to true after you've reviewed/edited the text below. */
export const legalReviewed = false;

export interface LegalSection {
  heading?: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const legalDocs: Record<"privacy" | "terms" | "compliance", LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    description: "How this site handles your information.",
    lastUpdated: "[DATE — set when finalized]",
    sections: [
      {
        body: [
          `${brand.name} ("this site") is a portfolio and booking site for custom adult content. Your privacy and discretion matter here — this policy explains what little information the site touches and where it goes.`,
        ],
      },
      {
        heading: "What this site collects",
        body: [
          "The site itself has no accounts, no databases, and stores nothing about you on any server it controls. Two things are kept in your own browser only: your 18+ confirmation and any dismissed announcement banner. Clearing your browser data removes both.",
          "Information you type into the contact, booking, or newsletter forms is sent directly to the third-party services below — it is not stored by this site.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "Form submissions are delivered through Formspree (contact and custom-order forms). Newsletter signups go to Mailchimp. Payments are handled entirely by Stripe on Stripe's own pages — this site never sees or stores card details.",
          "If analytics are enabled, Google Analytics collects standard usage data (pages visited, referring platform, approximate location). No advertising identifiers are used, and analytics data is not shared beyond that service.",
          "Each of these services has its own privacy policy that governs the data you send it.",
        ],
      },
      {
        heading: "Discretion",
        body: [
          "Outbound links are configured so your browser does not tell the destination which page you came from. Client work and correspondence are never shared without explicit written permission.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          `You can unsubscribe from the newsletter at any time via the link in any email. To ask about or request deletion of anything you've submitted through a form, email ${brand.email}.`,
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about this policy: ${brand.email}.`],
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    description: "The terms that apply to using this site and commissioning work.",
    lastUpdated: "[DATE — set when finalized]",
    sections: [
      {
        heading: "Adults only",
        body: [
          "This site contains adult material and is strictly for adults 18 years of age or older (or the age of majority where you live, if higher). By using the site you confirm you meet that requirement and that viewing adult content is legal in your jurisdiction.",
        ],
      },
      {
        heading: "Content ownership",
        body: [
          `All content on this site — photography, video, text, and branding — is the property of ${brand.name} unless stated otherwise. It may not be downloaded, reproduced, redistributed, or reposted anywhere without explicit written permission. Unauthorized redistribution of paid or private content is a violation of these terms and applicable copyright law.`,
        ],
      },
      {
        heading: "Custom orders & bookings",
        body: [
          "Custom work is commissioned as described at the time of booking: a 50% deposit reserves your slot, with the balance due before final delivery. Standard turnaround is 2–3 weeks unless agreed otherwise; up to 2 rounds of revisions are included.",
          "Deposits on commissioned work are non-refundable once production has begun. [REVIEW: confirm your actual refund/cancellation policy.]",
          "All custom work stays within the boundaries discussed during consultation. Requests may be declined at the creator's sole discretion, before or during a project, with any unearned payment returned.",
        ],
      },
      {
        heading: "Client content & privacy",
        body: [
          "Commissioned content is delivered for the personal use agreed at booking. Client identities and correspondence are kept confidential and are never shared without explicit written permission.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You agree not to use this site or its content for anything unlawful, to misrepresent your age, or to attempt to scrape, mirror, or archive the site's content.",
        ],
      },
      {
        heading: "Liability",
        body: [
          'The site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, the creator is not liable for indirect or consequential damages arising from use of the site.',
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the State of [STATE — likely California], without regard to conflict-of-law rules. [REVIEW with a lawyer.]",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about these terms: ${brand.email}.`],
      },
    ],
  },

  compliance: {
    title: "18 U.S.C. § 2257 Statement",
    description: "Age verification and records compliance statement.",
    lastUpdated: "[DATE — set when finalized]",
    sections: [
      {
        body: [
          "All models, actors, actresses, and other persons who appear in any visual depiction of actual or simulated sexually explicit conduct appearing or otherwise contained on this website were over the age of eighteen (18) years at the time the visual depiction was produced.",
          "Records required to be maintained pursuant to 18 U.S.C. § 2257 and 28 C.F.R. Part 75 are kept by the Custodian of Records:",
          "[LEGAL NAME OF CUSTODIAN]\n[STREET ADDRESS — a business address or registered agent, not necessarily your home]\n[CITY, STATE ZIP]",
          "[REVIEW: a lawyer can confirm which of your content categories require §2257 records and whether any exemption statement applies. Do not publish this page with placeholders.]",
        ],
      },
    ],
  },
};

export type LegalDocKey = keyof typeof legalDocs;
