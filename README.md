# Rubber Succubus

The website for [rubbersuccubus.com](https://rubbersuccubus.com) — a React + Vite static single-page app with the Obsidian Silk dark-luxury design. Pages: Home, Services, Portfolio, FAQ, Events, Connect, Checkout, behind an 18+ age gate.

## Development

```bash
pnpm install   # install dependencies
pnpm dev       # dev server at http://localhost:5173
pnpm build     # production build → dist/public
pnpm preview   # serve the production build locally
```

## Editing your content

**Everything you'd want to change lives in one file: [`client/src/config/site.ts`](client/src/config/site.ts).**

| What | Where in `site.ts` |
|---|---|
| Name, tagline, email, social handle | `brand` |
| Services, descriptions, **prices** | `services` |
| FAQ questions and answers | `faqItems` |
| Upcoming events | `upcomingEvents` |
| Gallery placeholders | `galleryItems` |
| Social media links (set `live: true` + real URL to activate a tile) | `socialLinks` |
| Stripe / Formspree / Mailchimp / Google Calendar | `integrations` |

Pages contain layout only — you shouldn't need to touch them for content updates.

## Activating integrations

Each integration is off until you replace its `YOUR_...` placeholder in the `integrations` section of `site.ts`. Until then, forms fall back to opening the visitor's email app addressed to you, and the calendar shows a "coming soon" card.

- **Stripe payments** — create a [payment link](https://dashboard.stripe.com/payment-links) per service and paste each URL into `stripePaymentLinks`.
- **Contact form (Formspree)** — create a form at [formspree.io](https://formspree.io) and paste the form ID (looks like `xabcdefg`) into `formspreeFormId`.
- **Newsletter (Mailchimp)** — Audience → Signup forms → Embedded forms; copy the `action="..."` URL into `mailchimpActionUrl`.
- **Events calendar** — Google Calendar → Settings → Integrate calendar; copy the embed `src` URL into `googleCalendarEmbedSrc`.
- **Analytics** — add your provider's snippet to `client/index.html` (e.g. the [GA4 gtag snippet](https://support.google.com/analytics/answer/9304153) with your `G-...` ID) just before `</head>`.

## Deployment

### GitHub Pages (primary)

Pushes to `main` deploy automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

One-time setup: repo **Settings → Pages → Source → "GitHub Actions"**. The custom domain is set by `client/public/CNAME` (`rubbersuccubus.com`); point your registrar's DNS at GitHub Pages per the [docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

The workflow copies `index.html` to `404.html` so deep links (e.g. `/services`) load the app.

### Netlify (alternative)

`netlify.toml` is configured with the right publish directory (`dist/public`) and SPA redirects — import the repo at [netlify.com](https://netlify.com) and it works as-is.

## Notes

- This is a client-rendered SPA: per-page titles are set in the browser, but crawlers that don't run JavaScript see the static tags in `client/index.html`. If SEO becomes a priority, prerendering is the next step.
- The age-gate choice is stored in `localStorage` (`rs-age-verified`), so visitors confirm once.
- Planning and research notes live in [`docs/`](docs/).

### Ideas for later

From the research notes, in rough priority order: testimonials/fan-wall section, content-drop countdown, real gallery pipeline (drop images in `client/public/gallery/` and list them in `site.ts`), content calendar, merch teaser.
