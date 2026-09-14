import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

const page = getPageByUrl("/contact/")!;
const related = getTopicalRelated("/contact/", 6);

export const metadata: Metadata = pageMetadata(page);

export default function ContactPage() {
  return (
    <div className="site-shell">
      <JsonLd
        data={organizationJsonLd({
          name: SITE_NAME,
          url: SITE_URL,
          description: page.description,
        })}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Contact" },
        ]}
      />
      <PageHero
        h1="Contact FancifyText"
        lead="This is a small Unicode toolkit, not a help desk. Here is what we can and cannot do."
      />

      <div className="seo-section seo-prose">
        <h2>What we can help with</h2>
        <ul>
          <li>
            Bug reports on a generator (a style that copies the wrong character,
            a page that 404s, a broken copy button).
          </li>
          <li>
            Privacy questions about analytics or hosting. See the{" "}
            <Link href="/privacy/">Privacy Policy</Link> first.
          </li>
          <li>
            Corrections when a platform note is out of date (for example Discord
            ANSI behavior).
          </li>
        </ul>

        <h2>What we cannot do</h2>
        <ul>
          <li>
            We do not send TTF/OTF font files. Fancy text on this site is Unicode
            you copy and paste.
          </li>
          <li>
            We cannot recover Instagram, Discord, Facebook, or WhatsApp accounts.
          </li>
          <li>
            We do not take paid “font pack” orders or custom doorway pages for
            every decorative wrapper.
          </li>
        </ul>

        <h2>How to reach us</h2>
        <p>
          There is no ticket queue or public inbox on this domain yet. For
          privacy and legal notices, use the contacts listed with the live
          domain owner (WHOIS / repository) once those are published. Until then,
          start with <Link href="/about/">About</Link>, the{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            Unicode fancy fonts guide
          </Link>
          , and the tool pages linked from the home generator.
        </p>

        <h2>Fast answers</h2>
        <ul>
          <li>
            Boxes instead of letters → your device font is missing those glyphs.
            Try bold or sans bold.
          </li>
          <li>
            Discord color not painting → you need a full{" "}
            <Link href="/guides/discord-colored-text-not-working/">
              ANSI code block
            </Link>
            , not a nickname.
          </li>
          <li>
            Instagram bio fonts →{" "}
            <Link href="/guides/instagram-bio-fonts/">paste Unicode</Link>; there
            is no in-app font picker.
          </li>
        </ul>
      </div>

      <RelatedTools pages={related} />
    </div>
  );
}
