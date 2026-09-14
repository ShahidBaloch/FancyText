import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import {
  JsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { StyleGallery } from "@/components/tool/StyleGallery";
import { TextTool } from "@/components/tool/TextTool";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/")!;

export const metadata = pageMetadata(page);

const faqItems = [
  {
    question: "What is a fancy text generator?",
    answer:
      "A fancy text generator converts normal letters into Unicode “fonts” (bold, cursive, bubble, aesthetic, and more) that you can copy and paste into Instagram, Discord, TikTok, WhatsApp, and other apps that support Unicode.",
  },
  {
    question: "Is the fancy text generator free?",
    answer:
      "Yes. FancyText runs entirely in your browser—no account, no download, and no watermark. Generate and copy as many styles as you want.",
  },
  {
    question: "Is this a cool font maker or a real font download?",
    answer:
      "It is a cool font maker that uses Unicode characters—not downloadable TTF/OTF files. The stylish look travels with the text when you paste it.",
  },
  {
    question: "Will fancy text work in all apps?",
    answer:
      "Most modern apps support common Unicode styles. If a character shows as a box, try bold, sans bold, or bubble—those usually render more reliably.",
  },
  {
    question: "Why do some styles show as boxes?",
    answer:
      "Your device font may not include every Unicode symbol. Shorten the text or switch styles. Compatibility notes on each tool page list safer options.",
  },
  {
    question: "Can I use fancy text in my Instagram name or bio?",
    answer:
      "Yes for bios and many display names. Instagram does not offer a native font picker, so Unicode copy-paste is the standard workaround.",
  },
  {
    question: "Is this the same as installing a font?",
    answer:
      "No. Installed fonts change how an app draws letters. FancyText swaps characters for Unicode look-alikes, so no install is required.",
  },
  {
    question: "Can I make a long paragraph in fancy text?",
    answer:
      "You can, but very long fancy paragraphs can be hard to read and may hit character limits. Use fancy styles for names, bios, and short captions.",
  },
  {
    question: "How do I copy and paste on mobile?",
    answer:
      "Type in the box, tap Copy on a style, then paste into the app. Everything works in Safari, Chrome, and in-app browsers.",
  },
  {
    question: "Which styles are the most compatible?",
    answer:
      "Bold, sans bold, italic, cursive, and bubble tend to work across Discord, Instagram, TikTok, and WhatsApp. Fullwidth and glitch styles vary more by device.",
  },
];

export default function HomePage() {
  const related = getTopicalRelated("/", 6);

  return (
    <div className="site-shell">
      <JsonLd
        data={organizationJsonLd({
          name: SITE_NAME,
          url: SITE_URL,
          description: page.description,
        })}
      />
      <JsonLd
        data={webSiteJsonLd({
          name: SITE_NAME,
          url: SITE_URL,
          description: page.description,
        })}
      />
      <PageJsonLd page={page} faq={faqItems} crumbName="Fancy text generator" />
      <PageHero
        h1="Fancy text generator"
        lead="Type once, then copy bold, cursive, bubble, aesthetic, and other cool fonts for social bios, chats, and usernames."
      />

      <div className="tool-stage" id="tool">
        <TextTool />
      </div>

      <section className="seo-section" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">Cool fonts, pretty fonts & stylish text</h2>
        <p className="seo-lead">
          Browse every style as a live word font generator and cool font maker.
          Update the gallery input and copy any row—great when you want a stylish
          text generator or special text generator without hopping between pages.
        </p>
        <StyleGallery
          initialText="FancyText"
          presets={["FancyText", "cool bio", "username", "aesthetic"]}
        />
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to use</h2>
        <ol>
          <li>Type or paste your words into the box above.</li>
          <li>Pick a style chip (cursive, bold, bubble, and more).</li>
          <li>
            Tap Copy, then paste into Instagram, Discord, TikTok, WhatsApp, or
            anywhere Unicode works.
          </li>
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where can you use fancy text?</h2>
        <ul>
          <li>
            <strong>Instagram</strong> — bios, captions, and display names (
            <Link href="/instagram-font-generator/">Instagram font generator</Link>
            )
          </li>
          <li>
            <strong>Discord</strong> — nicknames, topics, and colored ANSI text (
            <Link href="/discord-color-text/">Discord color text</Link>)
          </li>
          <li>
            <strong>TikTok</strong> — profile bios and captions (
            <Link href="/tiktok-font-generator/">TikTok fonts</Link>)
          </li>
          <li>
            <strong>WhatsApp</strong> — status lines and chat flair (
            <Link href="/whatsapp-fonts/">WhatsApp fonts</Link>)
          </li>
          <li>Game usernames, Snapchat, and other Unicode-friendly fields</li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="unicode-heading">
        <h2 id="unicode-heading">How Unicode fancy fonts work</h2>
        <p>
          FancyText maps each letter to a look-alike character from Unicode blocks
          such as Mathematical Alphanumeric Symbols. The result is still text—so
          you can select, copy, and paste it. That is why a font generators search
          and a fancy text maker search lead to the same kind of tool.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="compat-heading">
        <h2 id="compat-heading">Platform compatibility</h2>
        <p>
          Bold and sans bold are usually safest. Script/cursive and bubble look
          great on modern phones. Glitch and dense combining marks can break layout
          in some apps—keep those short. Always preview on the device you care about.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="practices-heading">
        <h2 id="practices-heading">Best practices & accessibility</h2>
        <ul>
          <li>Use fancy text for names and short bios—not entire articles.</li>
          <li>Keep important keywords in plain text for search and screen readers.</li>
          <li>Test usernames: some platforms reject certain symbols.</li>
          <li>
            Prefer readable styles (bold, cursive) over extreme glitch for public
            profiles.
          </li>
        </ul>
      </section>

      <section className="seo-section" aria-labelledby="popular-heading">
        <h2 id="popular-heading">Popular style tools</h2>
        <ul className="taxonomy-links">
          <li>
            <Link href="/bold-text-generator/">Bold text generator</Link>
          </li>
          <li>
            <Link href="/cursive-text-generator/">Cursive text generator</Link>
          </li>
          <li>
            <Link href="/copy-paste-fonts/">Copy and paste fonts</Link>
          </li>
          <li>
            <Link href="/aesthetic-fonts/">Aesthetic fonts</Link>
          </li>
          <li>
            <Link href="/cute-fonts/">Cute fonts</Link>
          </li>
          <li>
            <Link href="/kaomoji/">Kaomoji</Link>
          </li>
          <li>
            <Link href="/social-media-bio-generator/">
              Social media bio generator
            </Link>
          </li>
          <li>
            <Link href="/whatsapp-fonts/">WhatsApp fonts</Link>
          </li>
        </ul>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl="/" />
      <BackToTool />
      <FaqSection items={faqItems} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
