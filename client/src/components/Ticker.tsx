import { tickerWords } from "@/config/site";

/**
 * Slow editorial marquee strip. Content is duplicated so the CSS loop
 * (`animate-ticker`, defined in index.css) can translate by exactly half its
 * width for a seamless repeat. Paused for prefers-reduced-motion users.
 */
export default function Ticker() {
  const sequence = [...tickerWords, ...tickerWords, ...tickerWords];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-red-900/20 bg-black/60 py-3 select-none"
    >
      <div className="flex w-max animate-ticker">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {sequence.map((word, i) => (
              <span
                key={`${half}-${i}`}
                className="font-accent text-sm tracking-[0.35em] uppercase text-cream/25 px-6 flex items-center gap-6"
              >
                {word}
                <span className="w-1 h-1 bg-red-700/60 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
