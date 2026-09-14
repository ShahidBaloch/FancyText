import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageHero } from "@/components/seo/PageHero";
import { SITE_NAME } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const title = "Privacy Policy | FancifyText";
const description = `How ${SITE_NAME} handles privacy for this free Unicode fancy text tool.`;

export const metadata: Metadata = {
  ...pageMetadata({
    phase: 0,
    priority: "P2",
    url: "/privacy/",
    group: "H_Trust",
    primaryKeyword: "privacy policy",
    title,
    description,
    fellowKeywords: [],
  }),
};

export default function PrivacyPage() {
  return (
    <div className="site-shell">
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Privacy Policy" },
        ]}
      />
      <PageHero
        h1="Privacy Policy"
        lead={`${SITE_NAME} is a free browser-based fancy text tool. This page explains what we collect and what we do not.`}
      />

      <div className="seo-section seo-prose legal-prose">
        <p>
          <strong>Last updated:</strong> September 14, 2026
        </p>

        <h2>Overview</h2>
        <p>
          Fancy text conversion runs in your browser. We do not require an
          account, and we do not store the text you type in our generators on a
          server as part of the core product.
        </p>

        <h2>Information we may collect</h2>
        <ul>
          <li>
            <strong>Usage analytics (optional):</strong> If Google Analytics
            (GA4) is enabled on the live site, Google may collect standard web
            analytics such as pages viewed, approximate location, device/browser
            type, and referral source. This helps us understand which tools are
            useful.
          </li>
          <li>
            <strong>Server logs:</strong> Our hosting provider (for example
            Vercel) may automatically log IP addresses and request metadata for
            security, performance, and abuse prevention.
          </li>
          <li>
            <strong>Cookies:</strong> Analytics providers may set cookies or
            similar identifiers when analytics is enabled. Core generators do
            not require cookies to work.
          </li>
        </ul>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your personal information.</li>
          <li>
            We do not ask you to upload identity documents or payment details for
            the free tools.
          </li>
          <li>
            We do not claim ownership of the Unicode characters you generate or
            copy.
          </li>
        </ul>

        <h2>Third-party services</h2>
        <p>
          If enabled, Google Analytics and Google Search Console operate under
          Google&apos;s own policies. Hosting, DNS, and CDN providers process
          technical data needed to deliver the website.
        </p>

        <h2>Children</h2>
        <p>
          The site is a general-purpose utility and is not directed at children
          under 13. Do not submit personal information about children through
          this site.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy as the product or hosting stack changes. The
          “Last updated” date at the top will change when we do.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy for {SITE_NAME} can be sent via the{" "}
          <Link href="/contact/">Contact</Link> page, or through the
          project owner&apos;s public GitHub profile linked to this repository.
        </p>

        <p>
          <Link href="/privacy/">Privacy Policy</Link>
          {" · "}
          <Link href="/terms/">Terms of Use</Link>
          {" · "}
          <Link href="/about/">About</Link>
          {" · "}
          <Link href="/contact/">Contact</Link>
        </p>
      </div>
    </div>
  );
}
