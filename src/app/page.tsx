import dynamic from "next/dynamic";
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
import { HomeHero } from "@/components/seo/HomeHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { TextTool } from "@/components/tool/TextTool";
import { CONTACT_EMAIL } from "@/data/contact";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const StyleGallery = dynamic(
  () =>
    import("@/components/tool/StyleGallery").then((mod) => mod.StyleGallery),
  {
    loading: () => (
      <p className="seo-lead">Loading live style previews…</p>
    ),
  },
);

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
      "Yes. FancifyText runs entirely in your browser—no account, no download, and no watermark. Generate and copy as many styles as you want.",
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
      "No. Installed fonts change how an app draws letters. FancifyText swaps characters for Unicode look-alikes, so no install is required.",
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
          email: CONTACT_EMAIL,
        })}
      />
      <JsonLd
        data={webSiteJsonLd({
          name: SITE_NAME,
          url: SITE_URL,
          description: page.description,
        })}
      />
      <PageJsonLd
        page={page}
        faq={faqItems}
        crumbName="Fancy text generator"
        howTo={{
          name: "How to use the fancy text generator",
          steps: [
            "Type or paste your words into the box above.",
            "Pick a style chip (cursive, bold, bubble, and more).",
            "Tap Copy, then paste into Instagram, Discord, TikTok, WhatsApp, or anywhere Unicode works.",
          ],
        }}
      />
      <HomeHero />

      <div className="tool-stage" id="tool">
        <TextTool
          styleIds={[
            "cursive",
            "bold",
            "sans-bold",
            "italic",
            "bubble",
            "tiny",
            "small-caps",
            "fullwidth",
            "fraktur",
            "mirror",
          ]}
        />
      </div>

      <section className="seo-section" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">All Unicode styles in one gallery</h2>
        <p className="seo-lead">
          Preview every FancifyText style as a live word converter. Use this
          gallery when you want the full set; open a collection when you only
          want aesthetic, cute, or graphic looks.
        </p>
        <StyleGallery
          initialText="fancy text"
          presets={["fancy text", "cool bio", "username", "aesthetic"]}
        />
      </section>

      <section className="seo-section" aria-labelledby="how-heading">
        <h2 id="how-heading">How to use</h2>
        <ol className="how-steps">
          <li>
            <span className="how-num" aria-hidden>
              1
            </span>
            <div>
              <strong>Type your words</strong>
              <p>Paste into the box above — names, bios, or a short caption.</p>
            </div>
          </li>
          <li>
            <span className="how-num" aria-hidden>
              2
            </span>
            <div>
              <strong>Pick a style</strong>
              <p>Cursive, bold, bubble, and more — tap a chip to preview.</p>
            </div>
          </li>
          <li>
            <span className="how-num" aria-hidden>
              3
            </span>
            <div>
              <strong>Copy and paste</strong>
              <p>
                Works in Instagram, Discord, TikTok, WhatsApp, and other Unicode
                apps.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="seo-section" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where can you use fancy text?</h2>
        <ul className="use-grid">
          <li>
            <Link href="/instagram-font-generator/" className="use-card">
              <span className="use-name">Instagram</span>
              <span className="use-desc">Bios, captions, display names</span>
            </Link>
          </li>
          <li>
            <Link href="/discord-color-text/" className="use-card">
              <span className="use-name">Discord</span>
              <span className="use-desc">Nicknames, topics, ANSI color</span>
            </Link>
          </li>
          <li>
            <Link href="/tiktok-font-generator/" className="use-card">
              <span className="use-name">TikTok</span>
              <span className="use-desc">Profile bios and captions</span>
            </Link>
          </li>
          <li>
            <Link href="/facebook-font-generator/" className="use-card">
              <span className="use-name">Facebook</span>
              <span className="use-desc">Display names — keep @username plain</span>
            </Link>
          </li>
          <li>
            <Link href="/whatsapp-fonts/" className="use-card">
              <span className="use-name">WhatsApp</span>
              <span className="use-desc">Status lines and chat flair</span>
            </Link>
          </li>
          <li>
            <div className="use-card use-card--static">
              <span className="use-name">Games &amp; more</span>
              <span className="use-desc">
                <Link href="/snapchat-font-generator/">Snapchat</Link>
                {" · "}
                <Link href="/twitter-font-generator/">X / Twitter</Link>
                {" · "}
                <Link href="/roblox-font-generator/">Roblox</Link>
              </span>
            </div>
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="unicode-heading">
        <h2 id="unicode-heading">How Unicode fancy fonts work</h2>
        <p>
          FancifyText maps each letter to a look-alike character from Unicode blocks
          such as Mathematical Alphanumeric Symbols. The result is still text—so
          you can select, copy, and paste it. That is why a font generators search
          and a fancy text maker search lead to the same kind of tool.{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            Read how fancy fonts work
          </Link>
          .
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
            <Link href="/small-text-generator/">Small text generator</Link>
          </li>
          <li>
            <Link href="/cool-symbols/">Cool symbols</Link>
          </li>
          <li>
            <Link href="/text-decorator/">Text decorator</Link>
          </li>
          <li>
            <Link href="/facebook-font-generator/">Facebook font generator</Link>
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
            <Link href="/guides/instagram-bio-fonts/">
              How to change Instagram bio fonts
            </Link>
          </li>
          <li>
            <Link href="/guides/discord-colored-text-not-working/">
              Discord colored text not working
            </Link>
          </li>
          <li>
            <Link href="/guides/how-unicode-fancy-fonts-work/">
              How Unicode fancy fonts work
            </Link>
          </li>
          <li>
            <Link href="/guides/whatsapp-stylish-text/">
              WhatsApp stylish text
            </Link>
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
