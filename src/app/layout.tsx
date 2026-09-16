import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { SITE_NAME, SITE_URL } from "@/data/pages/registry";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "optional",
  preload: true,
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

const isPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || "https://fancifytext.com"),
  title: {
    default: `Fancy Text Generator — Stylize Unicode Fonts | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Type a word, copy Unicode styles, paste them into a bio or chat. No font file to install.",
  alternates: {
    languages: {
      "en": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/*
          Ads / CMP: do not load AdSense or a consent banner from this layout
          until a Google-certified CMP + IAB TCF is fully configured for
          EEA/UK/CH. See src/lib/ads/consent.ts (intentionally a no-op stub)
          and /privacy/. Never insert ad units between a textarea and the
          first Copy control.
        */}
        <GoogleAnalytics />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="site-main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
