import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { SITE_NAME, SITE_URL } from "@/data/pages/registry";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
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
    "Free fancy text generator and cool fonts to copy and paste for Instagram, Discord, TikTok, and more.",
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <GoogleAnalytics />
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
