/**
 * Route-chunk prefetching. The import() calls here resolve to the same
 * modules App.tsx lazy-loads, so Vite emits a single shared chunk per page —
 * warming one on hover means the later navigation hits the module cache and
 * renders instantly.
 */

const routeImports: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/Home"),
  "/services": () => import("@/pages/Services"),
  "/gallery": () => import("@/pages/Gallery"),
  "/faq": () => import("@/pages/FAQ"),
  "/connect": () => import("@/pages/Connect"),
  "/custom-order": () => import("@/pages/CustomOrder"),
  "/events": () => import("@/pages/Events"),
};

const prefetched = new Set<string>();

/** Warm the code chunk for a route path; safe to call repeatedly. */
export function prefetchRoute(path: string) {
  const load = routeImports[path];
  if (!load || prefetched.has(path)) return;
  prefetched.add(path);
  load().catch(() => {
    // Fetch failed (offline, etc.) — allow a retry on the next hover.
    prefetched.delete(path);
  });
}
