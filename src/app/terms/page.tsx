import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/seo/PageHero";
import { SITE_NAME, SITE_URL } from "@/data/pages/registry";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${SITE_NAME}, a free Unicode fancy text generator.`,
  alternates: { canonical: new URL("/terms/", SITE_URL).toString() },
};

export default function TermsPage() {
  return (
    <div className="site-shell">
      <PageHero
        h1="Terms of Use"
        lead={`Simple rules for using ${SITE_NAME}. By using the site, you agree to these terms.`}
      />

      <div className="seo-section seo-prose legal-prose">
        <p>
          <strong>Last updated:</strong> September 14, 2026
        </p>

        <h2>The service</h2>
        <p>
          {SITE_NAME} provides free, browser-based tools that convert normal
          text into Unicode “fancy” styles and related utilities (for example
          cursive letters, platform helpers, and kaomoji lists). The service is
          provided as-is for personal and commercial creative use of the
          generated text, subject to the limits below.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Do not abuse, scrape, or overload the site in a harmful way.</li>
          <li>
            Do not use generated text to impersonate others, commit fraud, or
            violate applicable laws.
          </li>
          <li>
            Do not attempt to break into, reverse engineer, or disrupt hosting
            infrastructure beyond normal use of the public website.
          </li>
        </ul>

        <h2>No warranties</h2>
        <p>
          Tools are provided “as is” without warranties of any kind. Unicode
          rendering varies by device, app, and font support. Some platforms may
          reject or display boxes for certain characters. We do not guarantee
          rankings, social-media acceptance, or uninterrupted availability.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} and its operators
          are not liable for indirect, incidental, or consequential damages
          arising from use of the site or generated text.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Site branding, layout, and original copy belong to {SITE_NAME}.
          Unicode characters themselves are not owned by us. You are responsible
          for how you use pasted text in third-party apps.
        </p>

        <h2>Third-party platforms</h2>
        <p>
          Instagram, Discord, TikTok, WhatsApp, and other platforms have their
          own rules. Mentions of those brands are for descriptive purposes only
          and do not imply endorsement or affiliation.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms. Continued use of the site after changes
          means you accept the updated terms.
        </p>

        <p>
          <Link href="/">Back to FancyText</Link>
          {" · "}
          <Link href="/privacy/">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
