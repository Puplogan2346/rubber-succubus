import { useEffect } from "react";
import { useLocation } from "wouter";
import { integrations, isConfigured } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4, loaded only once `integrations.gaMeasurementId` is set
 * in site.ts. Tracks SPA route changes as page_view events so you can see
 * which platform/post actually drives visitors (use UTM-tagged links in
 * bios, e.g. ?utm_source=twitter). No-op while the ID is a placeholder.
 */
export default function Analytics() {
  const [location] = useLocation();
  const id = integrations.gaMeasurementId;
  const enabled = isConfigured(id);

  useEffect(() => {
    if (!enabled || window.gtag) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // GA expects the arguments object itself, not a spread array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // Manual page_view events below cover SPA navigation.
    window.gtag("config", id, { send_page_view: false });
  }, [enabled, id]);

  useEffect(() => {
    if (!enabled) return;
    window.gtag?.("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
    });
  }, [location, enabled]);

  return null;
}
