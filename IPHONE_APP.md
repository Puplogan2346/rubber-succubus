# Rubber Succubus — Private iPhone App

The `ios/` folder is a native iPhone app (built with [Capacitor](https://capacitorjs.com))
that wraps the **live website** in a real app with:

- **Haptic feedback** — light taps on every button/link, selection ticks on
  accordions, success buzzes on the age gate, form submits, and checkout.
- **An owner-only Admin screen** — edit the site's content (prices, FAQ,
  events, announcement, socials, …) from your phone. Saving commits to
  GitHub and the website redeploys automatically in ~1–2 minutes.
- The app always shows the **current live site** — any push to `main`
  updates the app with no rebuild.

This is a **private app**: you install it on your own iPhone from Xcode.
It is not for the App Store (adult content will not pass review).

---

## 1. Build & install (on your Mac)

Prerequisites: a Mac with [Xcode 16+](https://apps.apple.com/us/app/xcode/id497799835)
installed, plus Node and pnpm (same setup you use for the website — see README).

```bash
git clone https://github.com/puplogan2346/rubber-succubus.git
cd rubber-succubus
pnpm install
pnpm ios:sync     # builds the site and refreshes the iOS project
pnpm ios:open     # opens the project in Xcode
```

In Xcode:

1. Select the **App** target → **Signing & Capabilities** tab.
2. Under *Team*, sign in with your Apple ID and pick your **Personal Team**.
   (Xcode may ask you to change the bundle identifier slightly — that's fine.)
3. Plug in your iPhone with a cable and select it as the run destination
   (top toolbar, next to the Play button).
4. Press **Run** (▶). The first time, your iPhone will ask you to:
   - Enable **Developer Mode**: Settings → Privacy & Security → Developer Mode → on (reboots the phone).
   - **Trust** your developer certificate: Settings → General → VPN & Device Management → your Apple ID → Trust.
5. Run again — the app installs and launches.

### How long does the install last?

- **Free Apple ID (Personal Team):** the app expires after **7 days**.
  Reinstalling is just plugging in and pressing Run again — your data
  (age-gate choice, GitHub token) survives reinstalls.
- **Apple Developer Program ($99/yr):** installs last **1 year**, and you
  can use TestFlight instead of a cable.

### Simulator note

The app runs in the iOS Simulator too, but **haptics only work on a real
iPhone** — the Simulator stays silent.

## 2. Which URL the app loads

The app points at `https://rubbersuccubus.com` (see `capacitor.config.ts`).
If that domain isn't serving the site yet, switch it to the Netlify URL:

```ts
// capacitor.config.ts
server: {
  url: "https://rubbbersuccubus.netlify.app",
  ...
}
```

then rerun `pnpm ios:sync` and Run from Xcode again.

Links that leave the site (Stripe checkout, socials, the vault, email)
open in Safari/Mail automatically; only the site itself stays in-app.

## 3. Editing the website from your phone

The Admin screen lives at the **Admin** link in the app's footer (it does
not exist on the public website). First use asks for a GitHub token:

1. On any browser, go to GitHub → **Settings** → **Developer settings** →
   **Personal access tokens** → **Fine-grained tokens** → *Generate new token*.
2. Set:
   - **Repository access:** *Only select repositories* → `puplogan2346/rubber-succubus`
   - **Permissions → Repository permissions → Contents:** *Read and write*
   - Expiration: your call (you'll paste a new token when it expires).
3. Copy the token (starts with `github_pat_…`) and paste it into the app's
   Admin screen. It's stored only on your phone.

Then edit away — commissions status, prices, FAQ, events, announcement
banner, testimonials, vault link, socials. **Save & publish** commits to
`main`; the site (and app) show the change after the ~1–2 minute deploy.
The *Raw JSON* tab exposes everything else (Formspree/Mailchimp/Stripe/calendar
integration IDs).

Notes:

- The editor edits `client/src/config/site-content.json` on the `main`
  branch — the same file you'd edit on a computer. Icons and gallery
  images still need a computer (see README).
- If you edited the file elsewhere between loading and saving, the app
  detects the conflict and asks you to reload — nothing gets overwritten.

## 4. How it's wired (for future development)

| Piece | Where |
| --- | --- |
| Native app config (URL, app id) | `capacitor.config.ts` |
| Xcode project | `ios/App/App.xcodeproj` (Swift Package Manager — no CocoaPods needed) |
| Haptics | `client/src/lib/haptics.ts` (global click listener + `data-haptic` attributes) |
| Admin screen | `client/src/pages/Admin.tsx` (route `/admin`, native/dev only) |
| GitHub commit client | `client/src/lib/githubContent.ts` |
| Editable content | `client/src/config/site-content.json` (typed re-exports in `site.ts`) |
| App icon / splash sources | `resources/` (regenerate with `npx @capacitor/assets generate --ios`) |

Everything app-related is invisible on the public website: haptics no-op
outside the app, and `/admin` renders the 404 page in normal browsers.

After changing web code, redeploy the site as usual — the app picks it up
live. You only need Xcode again if you change `capacitor.config.ts`,
native settings, or icons.
