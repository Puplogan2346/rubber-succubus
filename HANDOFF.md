# Handoff Guide — moving to a new account / laptop

Everything about this site lives in this Git repository. If you have this repo, you have the entire site: code, content, deploy configuration, and documentation. This guide covers moving it to a new GitHub account and continuing work on a new machine.

## What this project is

- A static React + Vite single-page site (no server, no database) for rubbersuccubus.com
- Live at https://rubbbersuccubus.netlify.app — Netlify rebuilds it automatically on every push to `main`
- All editable content lives in **one file**: `client/src/config/site.ts` (see README for the full guide)
- A GitHub Pages deploy workflow also exists (`.github/workflows/deploy.yml`) as an alternative host

## Step 1 — Move the repo to your new GitHub account

**Option A (recommended): transfer the repo** — keeps all history, PRs, and issues.
1. On the OLD account: repo → Settings → General → scroll to "Danger Zone" → **Transfer ownership** → enter the new account's username.
2. Accept the transfer from the new account (GitHub emails a link).
3. GitHub auto-redirects the old URL for a while, but update any bookmarks.

**Option B: fresh copy** — if you can't access the old account settings:
```bash
git clone https://github.com/OLD_ACCOUNT/rubber-succubus.git
cd rubber-succubus
git remote set-url origin https://github.com/NEW_ACCOUNT/rubber-succubus.git
git push -u origin main
```
(Create an empty repo named `rubber-succubus` on the new account first — no README/gitignore.)

**Option C: from the backup bundle** — if the old account is already gone and you have `rubber-succubus.bundle`:
```bash
git clone rubber-succubus.bundle rubber-succubus
cd rubber-succubus
git remote set-url origin https://github.com/NEW_ACCOUNT/rubber-succubus.git
git push -u origin --all
```

## Step 2 — Re-connect the live site (Netlify)

The Netlify site is tied to the account that created it. After moving the repo:

- **If you keep the same Netlify account**: Netlify → site → Site configuration → Build & deploy → Link repository → re-link to the repo's new location. Done.
- **If you're also switching Netlify accounts**: on the new account, "Add new project" → "Import an existing project" → pick the repo. `netlify.toml` in the repo already contains the correct build command, publish directory, and SPA redirects — no settings needed. The site gets a new `*.netlify.app` name (pick `rubbersuccubus` — the old one had a typo anyway).

Alternative: skip Netlify entirely and use GitHub Pages — new repo → Settings → Pages → Source → "GitHub Actions". The workflow and CNAME file are already in the repo.

## Step 3 — Continue development on the new laptop

```bash
git clone https://github.com/NEW_ACCOUNT/rubber-succubus.git
cd rubber-succubus
pnpm install     # needs Node 20.19+ and pnpm (npm i -g pnpm)
pnpm dev         # local dev server
```
Content edits don't need any of that — edit `client/src/config/site.ts` in the GitHub web editor and the site redeploys itself.

To keep working with Claude Code on the new machine: install it (https://claude.com/claude-code), open the cloned folder, and point it at the README + this file for context. The repo is self-documenting.

## What's already done (state as of this handoff)

- Full structural overhaul: age gate on every route, central content config, code-split routes, SEO/OG tags + share card, accessibility pass, working Netlify + GitHub Pages deploy configs
- Engagement features: custom-order wizard (`/custom-order`), commissions status chip, How-It-Works timeline, announcement/countdown banner, testimonials, gallery with real-image pipeline + lightbox, "The Vault" teaser, themed days, marquee ticker, mobile book bar
- Everything content-gated is OFF until you fill it in — see the README's config table

## What's still yours to do (unchanged)

See the README "Launch status" checklist: custom domain DNS, real prices/photos/events in `site.ts`, and the optional Stripe / Formspree / Mailchimp / Google Calendar / analytics hookups.
