import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, HOME_CRUMB, homeCrumbLd } from "@/components/seo/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { CONTACT_EMAIL } from "@/data/contact";
import { SITE_NAME, SITE_URL, getPageByUrl } from "@/data/pages/registry";
import { GOOGLE_ADS_PUBLISHER_ID } from "@/lib/ads/google-policy";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/privacy/")!;
const absoluteUrl = new URL("/privacy/", SITE_URL).toString();
const GOOGLE_PARTNER_SITES =
  "https://policies.google.com/technologies/partner-sites";

export const metadata: Metadata = pageMetadata(page);

export default function PrivacyPage() {
  return (
    <div className="site-shell">
      <JsonLd
        data={webPageJsonLd({
          name: "Privacy Policy",
          description: page.description,
          url: absoluteUrl,
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          homeCrumbLd(SITE_URL),
          { name: "Privacy Policy", url: absoluteUrl },
        ])}
      />
      <Breadcrumbs
        items={[
          HOME_CRUMB,
          { name: "Privacy Policy" },
        ]}
      />
      <PageHero
        h1="Privacy Policy"
        lead={`${SITE_NAME} is a free browser-based fancy text tool. This page explains what we collect, how advertising partners (including Google) may use data when ads are enabled, and what we do not do.`}
      />

      <div className="seo-section seo-prose legal-prose">
        <p>
          <strong>Last updated:</strong> September 22, 2026
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
            useful. Analytics is only loaded when a measurement ID is configured
            on the server; this policy does not invent or publish a GA4 ID.
          </li>
          <li>
            <strong>Server logs:</strong> Our hosting provider (for example
            Vercel) may automatically log IP addresses and request metadata for
            security, performance, and abuse prevention. DNS and CDN providers
            in the same stack may process similar technical data to deliver the
            site.
          </li>
          <li>
            <strong>Cookies and similar identifiers:</strong> Analytics
            providers may set cookies or similar identifiers when analytics is
            enabled. If advertising is enabled, advertising partners may also
            use cookies, device identifiers, and web beacons as described below.
            Core generators do not require cookies to work.
          </li>
          <li>
            <strong>Contact messages:</strong> If you write to us, we receive
            the details you submit (see Contact form).
          </li>
        </ul>

        <h2>Google Search Console and indexing</h2>
        <p>
          We use <strong>Google Search Console</strong> to monitor how the site
          appears in Google Search. We submit an honest <Link href="/sitemap.xml">sitemap.xml</Link>{" "}
          (indexable URLs only), use canonical URLs and <code>noindex</code> on
          duplicate or thin pages (for example spelling aliases and parameterized
          search results), and avoid cloaking or misleading redirects. Machine-readable
          site summaries for assistants live at{" "}
          <Link href="/llms.txt">llms.txt</Link> and{" "}
          <Link href="/llms-full.txt">llms-full.txt</Link>.
        </p>

        <h2>Advertising and Google partners</h2>
        <p>
          {SITE_NAME} may display advertising from third-party partners,
          including Google (for example Google AdSense or equivalent Google
          advertising services), once ads are turned on. Ads are not required
          for the generators to work. We will not place ads between a text
          input and the first Copy control on a tool page.
        </p>
        <p>
          Our <Link href="/ads.txt">ads.txt</Link> file lists authorized Google
          sellers ({GOOGLE_ADS_PUBLISHER_ID}) for programmatic ads. Ad scripts are{" "}
          <strong>not loaded</strong> on the live site until a certified consent
          platform is configured (see below).
        </p>
        <p>
          Advertising partners, including Google, may use cookies, pixels or
          web beacons, IP addresses, and similar identifiers to:
        </p>
        <ul>
          <li>
            Serve <strong>personalized ads</strong> based on your activity on
            this site and, where permitted, on other sites and apps.
          </li>
          <li>
            Serve <strong>non-personalized ads</strong> that are not based on
            your individual profile (for example contextual ads). Even
            non-personalized ads may still use cookies or identifiers for
            frequency capping, aggregated reporting, and fraud prevention.
          </li>
          <li>
            Measure ad performance, detect invalid traffic, and maintain
            security.
          </li>
        </ul>
        <p>
          Google and its partners may collect and process data as described in
          Google&apos;s partner disclosure:{" "}
          <a href={GOOGLE_PARTNER_SITES} rel="noopener noreferrer">
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>
        <p>
          You can learn more about Google advertising cookies and, where
          available, opt out of personalized ads through Google&apos;s ad
          settings. Blocking cookies may limit personalization; some ads or
          measurement may still occur using non-cookie methods where allowed by
          law.
        </p>

        <h2>Consent in the EEA, UK, and Switzerland (CMP / TCF)</h2>
        <p>
          If we serve ads to users in the European Economic Area, the United
          Kingdom, or Switzerland, Google requires a{" "}
          <strong>Google-certified Consent Management Platform (CMP)</strong>{" "}
          integrated with the IAB Transparency and Consent Framework (TCF). We
          have <strong>not</strong> installed a CMP in this release, and we
          will not serve ads in those regions until a certified CMP is fully
          configured (Google as a vendor, required purposes, and valid consent
          or legitimate-interest signals where applicable).
        </p>
        <p>
          A half-installed or broken CMP is worse than no ads. Until that
          integration ships, treat advertising in the EEA, UK, and Switzerland
          as off. This policy will be updated when a certified CMP is live.
        </p>

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
          technical data needed to deliver the website. When ads are enabled,
          Google and other advertising partners process data as described in
          Advertising and Google partners above.
        </p>

        <h2>Children</h2>
        <p>
          The site is a general-purpose utility and is not directed at children
          under 13. Do not submit personal information about children through
          this site.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy as the product, hosting stack, analytics, or
          advertising setup changes. The “Last updated” date at the top will
          change when we do.
        </p>

        <h2>Contact form</h2>
        <p>
          Messages sent through the{" "}
          <Link href="/contact/">contact form</Link> or to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> are used
          only to reply to your inquiry. We do not sell your contact details.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy for {SITE_NAME} can be sent via the{" "}
          <Link href="/contact/">Contact</Link> page or{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
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
