/** GA4 custom events — no React; safe to dynamic-import from client copy handlers. */

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  const gtag = (
    window as unknown as {
      __fancifyGtag?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    }
  ).__fancifyGtag ||
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params ?? {});
}
