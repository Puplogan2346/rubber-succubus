import { useEffect } from "react";
import { brand } from "@/config/site";

interface PageMeta {
  title?: string;
  description?: string;
}

/**
 * Sets the document title ("Page — Rubber Succubus") and meta description
 * for the current page. This is a client-rendered SPA, so crawlers that
 * don't run JS see the static tags in index.html; this hook covers browser
 * tabs, history, and share sheets.
 */
export function usePageMeta({ title, description }: PageMeta = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${brand.name}` : brand.name;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      const previous = meta?.getAttribute("content") ?? null;
      meta?.setAttribute("content", description);
      return () => {
        document.title = brand.name;
        if (previous !== null) meta?.setAttribute("content", previous);
      };
    }

    return () => {
      document.title = brand.name;
    };
  }, [title, description]);
}
