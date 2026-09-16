import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pageMetadata } from "@/lib/seo/metadata";
import { CONTACT_EMAIL, SITE_SAME_AS } from "@/data/contact";
import { SITE_NAME, SITE_URL, getPageByUrl } from "@/data/pages/registry";

const page = getPageByUrl("/about/")!;
const absoluteUrl = new URL("/about/", SITE_URL).toString();

export const metadata: Metadata = pageMetadata(page);

export default function AboutPage() {
  return (
    <div className="site-shell">
      <JsonLd
        data={{
          ...organizationJsonLd({
            name: SITE_NAME,
            url: SITE_URL,
            description: page.description,
            email: CONTACT_EMAIL,
            sameAs: SITE_SAME_AS,
          }),
          foundingDate: "2026",
          knowsAbout: [
            "Unicode fancy text",
            "copy and paste fonts",
            "Discord colored text",
            "kaomoji",
          ],
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          name: "About FancifyText",
          description: page.description,
          url: absoluteUrl,
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
          { name: "About", url: absoluteUrl },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "About" },
        ]}
      />
      <PageHero
        h1="About FancifyText"
        lead="A small Unicode toolkit for bios, nicknames, and captions. Free, runs in the browser, and tries to stay honest about what will not paste."
      />

      <div className="seo-section seo-prose">
        <h2>Who runs this site</h2>
        <p>
          {SITE_NAME} is an independent utility site operated as a focused
          FancyText product. There is no parent media company and no paid “font
          pack.” The generators run in your browser: we convert letters to
          Unicode look-alikes so you can copy and paste them into Instagram,
          Discord, TikTok, WhatsApp, and other apps that accept special
          characters.
        </p>

        <h2>How the tools work</h2>
        <p>
          Fancy “fonts” on social apps are usually not installed typefaces. They
          are characters from Unicode blocks such as Mathematical Alphanumeric
          Symbols. {SITE_NAME} maps A–Z and 0–9 onto those characters and shows
          you a live preview. Nothing you type is stored on a server as part of
          the core product.
        </p>

        <h2>What we maintain</h2>
        <ul>
          <li>Style-specific generators (bold, cursive, bubble, small text, big ASCII letters, old English, binary, and more)</li>
          <li>Platform notes for Discord (including ANSI color), Instagram, TikTok, WhatsApp, Facebook, X, Snapchat, and Roblox</li>
          <li>A cool-symbols list and a text decorator that wraps names instead of cloning decorative “wrapper fonts”</li>
          <li>Kaomoji lists with meanings, not just a dump of faces</li>
          <li>Cursive letter pages for people who need a single glyph</li>
          <li>Guides that explain failures (boxes, ANSI not working, platform filters)</li>
        </ul>

        <h2>Maintenance cadence</h2>
        <p>
          We update style maps, compatibility notes, and guides when platforms
          change filters or when users report broken glyphs. Content freshness
          is reflected in sitemap lastmod dates. Bug reports go to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>How we write these pages</h2>
        <p>
          Copy here is meant to explain Unicode behavior, compatibility limits,
          and when a style is a bad idea (for example glitch text in a public
          bio). We do not sell generated characters, and we are not affiliated
          with Instagram, Discord, TikTok, or other apps named for descriptive
          purposes.
        </p>

        <h2>Privacy and contact</h2>
        <p>
          See the <Link href="/privacy/">Privacy Policy</Link>,{" "}
          <Link href="/terms/">Terms of Use</Link>, and{" "}
          <Link href="/contact/">Contact</Link> (
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          ). We do not take font-file orders or recover social accounts.
        </p>

        <p>
          <Link href="/">Open the fancy text generator</Link>
          {" · "}
          <Link href="/search/">Search all tools</Link>
        </p>
      </div>
    </div>
  );
}
