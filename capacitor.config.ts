import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell configuration for the private iPhone app.
 *
 * The app is a WKWebView that loads the LIVE production site (server.url),
 * so every deploy — including edits made from the in-app admin screen —
 * shows up in the app without rebuilding it in Xcode.
 *
 * If rubbersuccubus.com isn't serving the site yet, switch `url` to
 * "https://rubbbersuccubus.netlify.app", then run `pnpm ios:sync` and
 * rebuild in Xcode. See IPHONE_APP.md.
 *
 * `allowNavigation` is deliberately limited to the site's own hosts:
 * navigation to any other host (Stripe payment links, socials, OnlyFans,
 * mailto:) opens in Safari/Mail instead of inside the app.
 */
const config: CapacitorConfig = {
  appId: "com.rubbersuccubus.app",
  appName: "Rubber Succubus",
  webDir: "dist/public",
  server: {
    url: "https://rubbersuccubus.com",
    allowNavigation: [
      "rubbersuccubus.com",
      "www.rubbersuccubus.com",
      "rubbbersuccubus.netlify.app",
    ],
  },
  ios: {
    contentInset: "never",
  },
};

export default config;
