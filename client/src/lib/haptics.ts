/**
 * Haptic feedback for the iPhone app.
 *
 * The site doubles as the web layer of a Capacitor iOS shell (see
 * capacitor.config.ts). Inside the app, the Capacitor bridge is injected
 * into this page and these helpers fire real UIKit haptics; in a normal
 * browser `Capacitor.isNativePlatform()` is false and every call is a
 * silent no-op, so the public website is unaffected.
 */
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

const native = Capacitor.isNativePlatform();

/** Light tap — default feedback for buttons and links. */
export function tapLight() {
  if (native) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
}

/** Medium thump — deliberate actions like the book bar or checkout hand-off. */
export function tapMedium() {
  if (native) Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
}

/** Subtle selection tick — accordions, toggles, pickers. */
export function selectTick() {
  if (!native) return;
  Haptics.selectionStart()
    .then(() => Haptics.selectionChanged())
    .then(() => Haptics.selectionEnd())
    .catch(() => {});
}

/** Success buzz — age gate passed, form submitted, content saved. */
export function notifySuccess() {
  if (native) Haptics.notification({ type: NotificationType.Success }).catch(() => {});
}

/** Error buzz — failed saves/submits. */
export function notifyError() {
  if (native) Haptics.notification({ type: NotificationType.Error }).catch(() => {});
}

/**
 * One delegated capture-phase listener instead of wiring every component:
 * any click that lands on (or inside) a button, link, or role="button"
 * fires a light tap. Elements can opt out or upgrade via data-haptic:
 *
 *   data-haptic="none"      → no feedback (e.g. handler fires its own)
 *   data-haptic="selection" → selection tick (accordions, toggles)
 *   data-haptic="medium"    → medium impact (primary CTAs)
 */
export function installGlobalHaptics() {
  if (!native) return;
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.('button, a, [role="button"]');
      if (!el || (el as HTMLButtonElement).disabled) return;
      switch (el.getAttribute("data-haptic")) {
        case "none":
          return;
        case "selection":
          selectTick();
          return;
        case "medium":
          tapMedium();
          return;
        default:
          tapLight();
      }
    },
    { capture: true, passive: true }
  );
}
