import { useEffect, useMemo, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Check, ChevronDown, LogOut, Plus, RefreshCw, Trash2 } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  GitHubError,
  REPO,
  clearToken,
  fetchContent,
  getToken,
  saveContent,
  setToken,
} from "@/lib/githubContent";
import type { SiteContent } from "@/lib/githubContent";
import { notifyError, notifySuccess } from "@/lib/haptics";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFound from "./NotFound";

/** Seconds we tell the owner a deploy roughly takes (Netlify/Pages build). */
const DEPLOY_SECONDS = 90;

function errMessage(e: unknown): string {
  if (e instanceof TypeError) return "Couldn't reach GitHub — check your internet connection.";
  return e instanceof Error ? e.message : String(e);
}

const inputCls =
  "w-full bg-black/40 border border-red-900/30 rounded-sm px-3 py-2 text-sm text-cream placeholder:text-cream/25 focus:outline-none focus:border-red-700/60";
const labelCls = "block text-[11px] uppercase tracking-wider text-cream/40 mb-1";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type="text"
        className={inputCls}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        className={inputCls}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      data-haptic="selection"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
        checked
          ? "border-red-700 bg-red-900/30 text-red-300"
          : "border-cream/20 text-cream/40"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${checked ? "bg-red-400" : "bg-cream/20"}`}
      />
      {label}
    </button>
  );
}

/** Collapsible editor section, collapsed by default to keep the page scannable. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-red-900/25 rounded-sm bg-black/30">
      <button
        type="button"
        data-haptic="selection"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm uppercase tracking-widest text-red-400">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-cream/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
}

export default function Admin() {
  usePageMeta({ title: "Admin" });

  const isNative = Capacitor.isNativePlatform();
  const allowed = isNative || import.meta.env.DEV;

  const [token, setTokenState] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [tokenInput, setTokenInput] = useState("");

  const [content, setContent] = useState<SiteContent | null>(null);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deployCountdown, setDeployCountdown] = useState<number | null>(null);

  const [tab, setTab] = useState<"content" | "json">("content");
  const [jsonDraft, setJsonDraft] = useState("");

  useEffect(() => {
    if (!allowed) return;
    getToken().then((t) => {
      setTokenState(t);
      setTokenLoaded(true);
    });
  }, [allowed]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError("");
    fetchContent(token)
      .then(({ content, sha }) => {
        setContent(content);
        setSha(sha);
      })
      .catch((e) => setError(errMessage(e)))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (deployCountdown === null || deployCountdown <= 0) return;
    const id = setTimeout(() => setDeployCountdown(deployCountdown - 1), 1000);
    return () => clearTimeout(id);
  }, [deployCountdown]);

  // Keep the raw-JSON draft in sync whenever content changes outside the JSON tab.
  const jsonOfContent = useMemo(
    () => (content ? JSON.stringify(content, null, 2) : ""),
    [content]
  );
  useEffect(() => {
    if (tab !== "json") setJsonDraft(jsonOfContent);
  }, [jsonOfContent, tab]);

  if (!allowed) return <NotFound />;

  const patch = (fn: (c: SiteContent) => SiteContent) =>
    setContent((c) => (c ? fn(structuredClone(c)) : c));

  const handleSaveToken = async () => {
    const t = tokenInput.trim();
    if (!t) return;
    await setToken(t);
    setTokenState(t);
    setTokenInput("");
  };

  const handleSignOut = async () => {
    await clearToken();
    setTokenState(null);
    setContent(null);
    setSha("");
  };

  const handleReloadContent = () => {
    if (!token) return;
    setLoading(true);
    setError("");
    setDeployCountdown(null);
    fetchContent(token)
      .then(({ content, sha }) => {
        setContent(content);
        setSha(sha);
      })
      .catch((e) => setError(errMessage(e)))
      .finally(() => setLoading(false));
  };

  const handleSave = async () => {
    if (!token || !content) return;

    let toSave = content;
    if (tab === "json") {
      try {
        toSave = JSON.parse(jsonDraft);
      } catch (e) {
        notifyError();
        setError(`Invalid JSON: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
    }

    setSaving(true);
    setError("");
    try {
      const { sha: newSha } = await saveContent(token, toSave, sha);
      setSha(newSha);
      setContent(toSave);
      notifySuccess();
      setDeployCountdown(DEPLOY_SECONDS);
    } catch (e) {
      notifyError();
      if (e instanceof GitHubError && e.status === 409) {
        setError("Content changed elsewhere since you loaded it. Tap Reload, then redo your edit.");
      } else {
        setError(errMessage(e));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageWrapper>
      <div className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mt-6 mb-2">
            <h1 className="text-3xl font-serif italic text-cream">Site Admin</h1>
            {token && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cream/40 hover:text-cream/70"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            )}
          </div>
          <p className="text-sm text-cream/50 mb-8">
            Edits commit to{" "}
            <span className="text-cream/70">
              {REPO.owner}/{REPO.name}
            </span>{" "}
            and go live on the website automatically (~1–2 min).
          </p>

          {error && (
            <div className="mb-6 border border-red-700/50 bg-red-950/40 rounded-sm px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* ── Token setup ── */}
          {tokenLoaded && !token && (
            <div className="border border-red-900/25 rounded-sm bg-black/30 p-5 space-y-4">
              <h2 className="text-sm uppercase tracking-widest text-red-400">
                Connect GitHub
              </h2>
              <p className="text-sm text-cream/60 leading-relaxed">
                Paste a fine-grained personal access token with{" "}
                <span className="text-cream/80">Contents: Read &amp; Write</span> access to
                only this repository. It's stored on this device and never leaves it except
                to talk to GitHub. Setup steps are in IPHONE_APP.md.
              </p>
              <input
                type="password"
                className={inputCls}
                placeholder="github_pat_…"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <Button
                onClick={handleSaveToken}
                disabled={!tokenInput.trim()}
                className="bg-red-700 hover:bg-red-600 text-white uppercase tracking-wider"
              >
                Save token
              </Button>
            </div>
          )}

          {loading && <p className="text-sm text-cream/50">Loading content…</p>}

          {/* ── Editor ── */}
          {token && content && !loading && (
            <>
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {(["content", "json"] as const).map((t) => (
                  <button
                    key={t}
                    data-haptic="selection"
                    onClick={() => setTab(t)}
                    className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full border ${
                      tab === t
                        ? "border-red-700 bg-red-900/30 text-red-300"
                        : "border-cream/15 text-cream/40"
                    }`}
                  >
                    {t === "content" ? "Content" : "Raw JSON"}
                  </button>
                ))}
              </div>

              {tab === "json" ? (
                <div className="space-y-2">
                  <p className="text-xs text-cream/40">
                    Everything, including integrations (Formspree, Mailchimp, Stripe links,
                    calendar). Must stay valid JSON.
                  </p>
                  <textarea
                    className={`${inputCls} font-mono text-xs leading-relaxed`}
                    rows={24}
                    value={jsonDraft}
                    onChange={(e) => setJsonDraft(e.target.value)}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Commissions */}
                  <Section title="Commissions status">
                    <div className="flex gap-2 pt-2">
                      {(["open", "waitlist", "closed"] as const).map((s) => (
                        <button
                          key={s}
                          data-haptic="selection"
                          onClick={() =>
                            patch((c) => {
                              c.commissions.status = s;
                              return c;
                            })
                          }
                          className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full border ${
                            content.commissions.status === s
                              ? "border-red-700 bg-red-900/30 text-red-300"
                              : "border-cream/15 text-cream/40"
                          }`}
                        >
                          {content.commissions.status === s && (
                            <Check className="w-3 h-3 inline mr-1 -mt-0.5" />
                          )}
                          {s}
                        </button>
                      ))}
                    </div>
                  </Section>

                  {/* Announcement */}
                  <Section title="Announcement banner">
                    <Area
                      label="Message (empty hides the banner)"
                      rows={2}
                      value={content.announcement.message}
                      onChange={(v) =>
                        patch((c) => {
                          c.announcement.message = v;
                          return c;
                        })
                      }
                    />
                    <Field
                      label="Countdown date (ISO, optional)"
                      placeholder="2026-08-01T20:00:00-07:00"
                      value={content.announcement.targetDate ?? ""}
                      onChange={(v) =>
                        patch((c) => {
                          if (v) c.announcement.targetDate = v;
                          else delete c.announcement.targetDate;
                          return c;
                        })
                      }
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Link text (optional)"
                        value={content.announcement.linkText ?? ""}
                        onChange={(v) =>
                          patch((c) => {
                            if (v) c.announcement.linkText = v;
                            else delete c.announcement.linkText;
                            return c;
                          })
                        }
                      />
                      <Field
                        label="Link URL or route"
                        value={content.announcement.linkHref ?? ""}
                        onChange={(v) =>
                          patch((c) => {
                            if (v) c.announcement.linkHref = v;
                            else delete c.announcement.linkHref;
                            return c;
                          })
                        }
                      />
                    </div>
                  </Section>

                  {/* Brand */}
                  <Section title="Brand">
                    <Area
                      label="Tagline"
                      rows={2}
                      value={content.brand.tagline}
                      onChange={(v) =>
                        patch((c) => {
                          c.brand.tagline = v;
                          return c;
                        })
                      }
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Location"
                        value={content.brand.location}
                        onChange={(v) =>
                          patch((c) => {
                            c.brand.location = v;
                            return c;
                          })
                        }
                      />
                      <Field
                        label="Response time note"
                        value={content.brand.responseTime}
                        onChange={(v) =>
                          patch((c) => {
                            c.brand.responseTime = v;
                            return c;
                          })
                        }
                      />
                    </div>
                    <Field
                      label="Ticker words (comma-separated)"
                      value={content.tickerWords.join(", ")}
                      onChange={(v) =>
                        patch((c) => {
                          c.tickerWords = v
                            .split(",")
                            .map((w) => w.trim())
                            .filter(Boolean);
                          return c;
                        })
                      }
                    />
                  </Section>

                  {/* Services */}
                  <Section title="Services & pricing">
                    {content.services.map((svc, i) => (
                      <div
                        key={svc.id}
                        className="border border-red-900/20 rounded-sm p-3 space-y-3"
                      >
                        <p className="text-xs text-cream/40 uppercase tracking-wider">
                          {svc.emoji} {svc.id}
                        </p>
                        <Field
                          label="Title"
                          value={svc.title}
                          onChange={(v) =>
                            patch((c) => {
                              c.services[i].title = v;
                              return c;
                            })
                          }
                        />
                        <Area
                          label="Description"
                          value={svc.description}
                          onChange={(v) =>
                            patch((c) => {
                              c.services[i].description = v;
                              return c;
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Field
                            label="Price (services page)"
                            value={svc.price}
                            onChange={(v) =>
                              patch((c) => {
                                c.services[i].price = v;
                                return c;
                              })
                            }
                          />
                          <Field
                            label="Price (checkout)"
                            value={svc.checkoutPrice}
                            onChange={(v) =>
                              patch((c) => {
                                c.services[i].checkoutPrice = v;
                                return c;
                              })
                            }
                          />
                        </div>
                        <Area
                          label="Includes (one per line)"
                          rows={4}
                          value={svc.includes.join("\n")}
                          onChange={(v) =>
                            patch((c) => {
                              c.services[i].includes = v.split("\n");
                              return c;
                            })
                          }
                        />
                      </div>
                    ))}
                  </Section>

                  {/* FAQ */}
                  <Section title="FAQ">
                    {content.faqItems.map((item, i) => (
                      <div
                        key={i}
                        className="border border-red-900/20 rounded-sm p-3 space-y-3"
                      >
                        <Field
                          label={`Question ${i + 1}`}
                          value={item.question}
                          onChange={(v) =>
                            patch((c) => {
                              c.faqItems[i].question = v;
                              return c;
                            })
                          }
                        />
                        <Area
                          label="Answer"
                          value={item.answer}
                          onChange={(v) =>
                            patch((c) => {
                              c.faqItems[i].answer = v;
                              return c;
                            })
                          }
                        />
                        <button
                          data-haptic="medium"
                          onClick={() =>
                            patch((c) => {
                              c.faqItems.splice(i, 1);
                              return c;
                            })
                          }
                          className="flex items-center gap-1 text-xs text-cream/40 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        patch((c) => {
                          c.faqItems.push({
                            id: `faq-${c.faqItems.length + 1}`,
                            question: "",
                            answer: "",
                          });
                          return c;
                        })
                      }
                      className="flex items-center gap-1 text-xs uppercase tracking-wider text-red-400"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add question
                    </button>
                  </Section>

                  {/* Events */}
                  <Section title="Events">
                    {content.upcomingEvents.map((ev, i) => (
                      <div
                        key={i}
                        className="border border-red-900/20 rounded-sm p-3 space-y-3"
                      >
                        <Field
                          label="Title"
                          value={ev.title}
                          onChange={(v) =>
                            patch((c) => {
                              c.upcomingEvents[i].title = v;
                              return c;
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Field
                            label="Date"
                            value={ev.date}
                            onChange={(v) =>
                              patch((c) => {
                                c.upcomingEvents[i].date = v;
                                return c;
                              })
                            }
                          />
                          <Field
                            label="Time"
                            value={ev.time}
                            onChange={(v) =>
                              patch((c) => {
                                c.upcomingEvents[i].time = v;
                                return c;
                              })
                            }
                          />
                        </div>
                        <Field
                          label="Location"
                          value={ev.location}
                          onChange={(v) =>
                            patch((c) => {
                              c.upcomingEvents[i].location = v;
                              return c;
                            })
                          }
                        />
                        <Area
                          label="Description"
                          rows={2}
                          value={ev.description}
                          onChange={(v) =>
                            patch((c) => {
                              c.upcomingEvents[i].description = v;
                              return c;
                            })
                          }
                        />
                        <Field
                          label="Link"
                          value={ev.link}
                          onChange={(v) =>
                            patch((c) => {
                              c.upcomingEvents[i].link = v;
                              return c;
                            })
                          }
                        />
                        <div className="flex items-center justify-between">
                          <Toggle
                            label={ev.live ? "Live" : "Hidden / TBD"}
                            checked={ev.live}
                            onChange={(v) =>
                              patch((c) => {
                                c.upcomingEvents[i].live = v;
                                return c;
                              })
                            }
                          />
                          <button
                            data-haptic="medium"
                            onClick={() =>
                              patch((c) => {
                                c.upcomingEvents.splice(i, 1);
                                return c;
                              })
                            }
                            className="flex items-center gap-1 text-xs text-cream/40 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        patch((c) => {
                          c.upcomingEvents.push({
                            title: "",
                            date: "",
                            time: "",
                            location: "",
                            description: "",
                            link: "#",
                            live: false,
                          });
                          return c;
                        })
                      }
                      className="flex items-center gap-1 text-xs uppercase tracking-wider text-red-400"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add event
                    </button>
                  </Section>

                  {/* Testimonials */}
                  <Section title="Testimonials">
                    {content.testimonials.map((t, i) => (
                      <div
                        key={i}
                        className="border border-red-900/20 rounded-sm p-3 space-y-3"
                      >
                        <Area
                          label="Quote"
                          rows={2}
                          value={t.quote}
                          onChange={(v) =>
                            patch((c) => {
                              c.testimonials[i].quote = v;
                              return c;
                            })
                          }
                        />
                        <Field
                          label="Attribution"
                          value={t.attribution}
                          onChange={(v) =>
                            patch((c) => {
                              c.testimonials[i].attribution = v;
                              return c;
                            })
                          }
                        />
                        <button
                          data-haptic="medium"
                          onClick={() =>
                            patch((c) => {
                              c.testimonials.splice(i, 1);
                              return c;
                            })
                          }
                          className="flex items-center gap-1 text-xs text-cream/40 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        patch((c) => {
                          c.testimonials.push({ quote: "", attribution: "" });
                          return c;
                        })
                      }
                      className="flex items-center gap-1 text-xs uppercase tracking-wider text-red-400"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add testimonial
                    </button>
                  </Section>

                  {/* Vault */}
                  <Section title="Vault (paid content teaser)">
                    <Field
                      label="URL (empty hides the section)"
                      placeholder="https://onlyfans.com/…"
                      value={content.vault.url}
                      onChange={(v) =>
                        patch((c) => {
                          c.vault.url = v;
                          return c;
                        })
                      }
                    />
                    <Field
                      label="Button label"
                      value={content.vault.label}
                      onChange={(v) =>
                        patch((c) => {
                          c.vault.label = v;
                          return c;
                        })
                      }
                    />
                  </Section>

                  {/* Themed days */}
                  <Section title="Themed days">
                    {content.themedDays.map((d, i) => (
                      <div key={i} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <Field
                            label="Day"
                            value={d.day}
                            onChange={(v) =>
                              patch((c) => {
                                c.themedDays[i].day = v;
                                return c;
                              })
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <Field
                            label="Theme"
                            value={d.theme}
                            onChange={(v) =>
                              patch((c) => {
                                c.themedDays[i].theme = v;
                                return c;
                              })
                            }
                          />
                        </div>
                        <button
                          data-haptic="medium"
                          onClick={() =>
                            patch((c) => {
                              c.themedDays.splice(i, 1);
                              return c;
                            })
                          }
                          className="pb-2.5 text-cream/40 hover:text-red-400"
                          aria-label="Remove themed day"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        patch((c) => {
                          c.themedDays.push({ day: "", theme: "" });
                          return c;
                        })
                      }
                      className="flex items-center gap-1 text-xs uppercase tracking-wider text-red-400"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add themed day
                    </button>
                  </Section>

                  {/* Socials */}
                  <Section title="Social links">
                    {content.socialLinks.map((s, i) => (
                      <div
                        key={s.name}
                        className="border border-red-900/20 rounded-sm p-3 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-cream/40 uppercase tracking-wider">
                            {s.emoji} {s.name}
                          </p>
                          <Toggle
                            label={s.live ? "Live" : "Coming soon"}
                            checked={s.live}
                            onChange={(v) =>
                              patch((c) => {
                                c.socialLinks[i].live = v;
                                return c;
                              })
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field
                            label="Handle"
                            value={s.handle}
                            onChange={(v) =>
                              patch((c) => {
                                c.socialLinks[i].handle = v;
                                return c;
                              })
                            }
                          />
                          <Field
                            label="URL"
                            value={s.url}
                            onChange={(v) =>
                              patch((c) => {
                                c.socialLinks[i].url = v;
                                return c;
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </Section>
                </div>
              )}

              {/* ── Save bar ── */}
              <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-red-900/30 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                <div className="max-w-2xl mx-auto flex items-center gap-3">
                  {deployCountdown !== null ? (
                    deployCountdown > 0 ? (
                      <p className="flex-1 text-sm text-cream/60">
                        Saved ✓ — deploying to the website (~{deployCountdown}s)…
                      </p>
                    ) : (
                      <>
                        <p className="flex-1 text-sm text-green-400/90">
                          Deploy should be live.
                        </p>
                        <Button
                          onClick={() => window.location.reload()}
                          data-haptic="medium"
                          className="bg-red-700 hover:bg-red-600 text-white uppercase tracking-wider"
                        >
                          Reload app
                        </Button>
                      </>
                    )
                  ) : (
                    <>
                      <button
                        onClick={handleReloadContent}
                        className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cream/40 hover:text-cream/70"
                        disabled={saving}
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reload
                      </button>
                      <div className="flex-1" />
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        data-haptic="none"
                        className="bg-red-700 hover:bg-red-600 text-white uppercase tracking-wider px-8"
                      >
                        {saving ? "Saving…" : "Save & publish"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
