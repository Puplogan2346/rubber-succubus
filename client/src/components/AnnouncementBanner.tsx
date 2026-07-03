import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { announcement } from "@/config/site";

const DISMISS_KEY = "rs-announcement-dismissed";

function remainingParts(target: Date): string | null {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  return `${hours}h ${minutes}m ${seconds}s`;
}

/**
 * Slim site-wide banner for drops, live sessions, or events, rendered below
 * the nav bar. Hidden unless `announcement.message` is set in site.ts; shows
 * a live countdown while `announcement.targetDate` is in the future.
 * Dismissal persists for the browser session.
 */
export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      return false;
    }
  });

  const target = announcement.targetDate ? new Date(announcement.targetDate) : null;
  const [countdown, setCountdown] = useState(() => (target ? remainingParts(target) : null));

  useEffect(() => {
    if (!target || !announcement.message || dismissed) return;
    const timer = setInterval(() => {
      const parts = remainingParts(target);
      setCountdown(parts);
      // Countdown expired — nothing left to tick.
      if (parts === null) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [announcement.targetDate, dismissed]);

  if (!announcement.message || dismissed) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Private mode: dismiss for this render only.
    }
    setDismissed(true);
  };

  const isExternal = announcement.linkHref?.startsWith("http");

  return (
    <div className="bg-red-950/80 backdrop-blur-sm border-b border-red-900/40 text-cream">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-center gap-3 text-[11px] uppercase tracking-wider">
        <span className="text-cream/90">{announcement.message}</span>
        {countdown && (
          <span className="text-red-300 font-semibold tabular-nums">{countdown}</span>
        )}
        {announcement.linkHref && announcement.linkText && (
          <a
            href={announcement.linkHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex items-center gap-1 text-red-300 hover:text-red-200 underline underline-offset-2 transition-colors"
          >
            {announcement.linkText}
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="ml-2 p-1 text-cream/50 hover:text-cream transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
