import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell configuration for the private iPhone app.
 *
 * The app is a WKWebView that loads the LIVE production site (server.url),
 * so every deploy — including edits made from the in-app admin screen —
 * shows up in the app without rebuilding it in Xcode.
 *
 * The URL points at the Netlify host because it deploys reliably from
 * main. Once rubbersuccubus.com is confirmed serving the site (GitHub
 * Pages deploys were failing — Pages must be enabled with "GitHub
 * Actions" as the source in repo Settings → Pages), you can switch `url`
 * to "https://rubbersuccubus.com", run `pnpm ios:sync`, and rebuild in
 * Xcode. See IPHONE_APP.md.
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
    url: "https://rubbbersuccubus.netlify.app",
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
