/**
 * GitHub Contents API client for the in-app admin editor.
 *
 * The editor (pages/Admin.tsx) reads site-content.json straight from the
 * repo, lets the owner edit it on their phone, and commits the change back.
 * A push to main kicks off the existing Netlify / GitHub Pages deploys, so
 * the live site — and therefore the app, which loads the live site —
 * updates a minute or two later.
 *
 * Auth is a fine-grained personal access token (Contents: Read & Write on
 * this repo only), stored on-device via Capacitor Preferences (native
 * UserDefaults in the app, localStorage on web/dev).
 */
import { Preferences } from "@capacitor/preferences";
import { CONTENT_PATH } from "@/config/site";

export const REPO = {
  owner: "puplogan2346",
  name: "rubber-succubus",
  branch: "main",
  path: CONTENT_PATH,
} as const;

const API_URL = `https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/${REPO.path}`;
const TOKEN_KEY = "rs-gh-pat";

// ─── Token storage ────────────────────────────────────────────────────────────

export async function getToken(): Promise<string | null> {
  const { value } = await Preferences.get({ key: TOKEN_KEY });
  return value;
}

export async function setToken(token: string): Promise<void> {
  await Preferences.set({ key: TOKEN_KEY, value: token });
}

export async function clearToken(): Promise<void> {
  await Preferences.remove({ key: TOKEN_KEY });
}

// ─── Content types (mirrors site-content.json) ────────────────────────────────

export interface SiteContent {
  brand: {
    name: string;
    handle: string;
    email: string;
    location: string;
    url: string;
    tagline: string;
    description: string;
    twitterUrl: string;
    responseTime: string;
  };
  commissions: { status: string; note?: string };
  tickerWords: string[];
  services: {
    id: string;
    title: string;
    checkoutTitle: string;
    description: string;
    checkoutDescription: string;
    price: string;
    checkoutPrice: string;
    emoji: string;
    includes: string[];
  }[];
  faqItems: { id: string; question: string; answer: string }[];
  upcomingEvents: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    link: string;
    live: boolean;
  }[];
  galleryItems: {
    id: number;
    type: string;
    aspect: string;
    src?: string;
    alt?: string;
    caption?: string;
    href?: string;
  }[];
  socialLinks: {
    name: string;
    handle: string;
    url: string;
    emoji: string;
    live: boolean;
    primary?: boolean;
  }[];
  announcement: { message: string; targetDate?: string; linkText?: string; linkHref?: string };
  testimonials: { quote: string; attribution: string }[];
  vault: { url: string; label: string };
  themedDays: { day: string; theme: string }[];
  integrations: {
    formspreeFormId: string;
    mailchimpActionUrl: string;
    stripePaymentLinks: Record<string, string>;
    googleCalendarEmbedSrc: string;
  };
}

// ─── UTF-8-safe base64 (content contains emoji) ───────────────────────────────

function decodeBase64(b64: string): string {
  const bin = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}

// ─── Contents API ─────────────────────────────────────────────────────────────

function headers(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export class GitHubError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

async function fail(res: Response): Promise<never> {
  let detail = "";
  try {
    detail = (await res.json()).message ?? "";
  } catch {
    // Non-JSON error body; the status code is enough.
  }
  const hint =
    res.status === 401
      ? "Token rejected — check it hasn't expired."
      : res.status === 403
        ? "Token lacks access — it needs Contents: Read & Write on this repo."
        : res.status === 404
          ? "File or repo not found — check the token's repository access."
          : res.status === 409
            ? "The file changed since it was loaded — reload and try again."
            : "";
  throw new GitHubError([detail, hint].filter(Boolean).join(" "), res.status);
}

/** Fetch the current content + blob sha (needed to commit an update). */
export async function fetchContent(
  token: string
): Promise<{ content: SiteContent; sha: string }> {
  const res = await fetch(`${API_URL}?ref=${REPO.branch}`, { headers: headers(token) });
  if (!res.ok) await fail(res);
  const body = await res.json();
  return { content: JSON.parse(decodeBase64(body.content)), sha: body.sha };
}

/** Commit updated content to main; returns the new blob sha. */
export async function saveContent(
  token: string,
  content: SiteContent,
  sha: string
): Promise<{ sha: string }> {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Update site content from iPhone app",
      content: encodeBase64(JSON.stringify(content, null, 2) + "\n"),
      sha,
      branch: REPO.branch,
    }),
  });
  if (!res.ok) await fail(res);
  const body = await res.json();
  return { sha: body.content.sha };
}
