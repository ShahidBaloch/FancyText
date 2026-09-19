import Script from "next/script";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-C2GKTBXQ4D";

/** Loads GA4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (e.g. on Vercel). */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
          window.__fancifyGtag = gtag;
        `}
      </Script>
    </>
  );
}

/** Fire a GA4 custom event when analytics is configured. */
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
  ).__fancifyGtag || (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params ?? {});
}
