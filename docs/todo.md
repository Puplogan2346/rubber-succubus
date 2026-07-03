
## UX Overhaul
- [x] Add persistent navigation bar with mobile hamburger menu across all pages
- [x] Add page transition animations between routes
- [x] Add scroll-triggered fade-in animations on key sections (whileInView on Services CTA, Gallery CTA, FAQ CTA, Home explore/about/newsletter)
- [x] Improve Home hero with animated entrance and better visual hierarchy
- [x] Improve Services cards with hover effects, gloss sheen, better spacing
- [x] Improve Gallery with masonry layout, hover overlays, better empty states
- [x] Improve FAQ with proper accordion component and smooth animations
- [x] Improve Events page with better card design and visual hierarchy
- [x] Improve Connect page with better social grid and form UX
- [x] Improve Checkout with progress indicator, better validation, trust signals
- [x] Add mobile-optimized touch targets and responsive spacing
- [x] Add smooth page entrance animations via PageWrapper (motion fade-in on mount)
- [x] Add micro-interactions: button sheens, hover lifts, scale-on-tap, gloss overlays
- [x] Improve footer with more content and better layout
- [x] Add persistent nav with active-state highlighting across all subpages

## Critical Fixes (Completed)
- [x] Add form validation to Checkout page (required fields, email format)
- [x] Add form validation to Connect page (required fields)
- [x] Add error messages and visual feedback (inline error icons and messages)
- [x] Add loading states to form submission buttons (spinner + disabled state)
- [x] Add success/error toast notifications (motion-animated)
- [x] Improve checkout summary display (shows all booking details)
- [x] Add confirmation page after booking (step 2 shows summary)
- [x] Test all form flows end-to-end (production build successful)

## Funnel & Legal Round (2026-07, PR #8)
- [x] Funnel-ordered social links (priority field in site.ts; live-first then
      priority — OnlyFans jumps to the top the moment `live: true`)
- [x] Welcome-gift email funnel (components/WelcomeGift.tsx on Home + unlock in
      Connect newsletter success) — activate by setting `welcomeGift.url` in site.ts
- [x] Draft legal pages at /privacy, /terms, /2257 (content in config/legal.ts,
      linked from the footer)
- [ ] OWNER: replace [bracketed] placeholders in config/legal.ts, review the
      text (ideally with a lawyer), then set `legalReviewed = true`
- [ ] OWNER: set `welcomeGift.url` to the free teaser location to switch the
      funnel on
- [ ] OWNER: set `integrations.gaMeasurementId` for analytics; tag bio links
      with ?utm_source=twitter / telegram / linktree
- [ ] After legal pages are finalized: add /privacy and /terms to
      client/public/sitemap.xml
