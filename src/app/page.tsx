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
import { StyleGalleryFallback } from "@/components/tool/StyleGalleryFallback";
import { ToolStagePlaceholder } from "@/components/tool/ToolStagePlaceholder";
import { CONTACT_EMAIL, SITE_SAME_AS } from "@/data/contact";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/")!;

const HomePlayground = dynamic(
  () =>
    import("@/components/tool/HomePlayground").then((m) => ({
      default: m.HomePlayground,
    })),
  {
    loading: () => (
      <>
        <ToolStagePlaceholder />
        <section className="seo-section" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading">Popular Unicode styles</h2>
          <StyleGalleryFallback />
        </section>
      </>
    ),
  },
);

export const metadata = pageMetadata(page);

const faqItems = [
  {
    question: "What is a fancy text generator?",
    answer:
      "A fancy text generator swaps each letter for a Unicode look-alike (bold, cursive, bubble, and so on). The result is still text. Instagram, Discord, and TikTok do not install a font from this page.",
  },
  {
    question: "Is this the same page as copy and paste fonts?",
    answer:
      "No. This homepage is the full fancy text generator: type once, search every Unicode style, and copy. Copy and paste fonts is a catalog hub—filtered collections for aesthetic, cute, cool, cursive, platform, and big ASCII when you already know the vibe.",
  },
  {
    question: "Why do some styles become empty boxes?",
    answer:
      "The phone or app is missing that glyph. Bold, sans bold, and bubble usually survive. Fullwidth, Fraktur, and glitch miss more often. Switch styles rather than downloading a TTF—the destination app still draws its own font.",
  },
  {
    question: "Can I put this in an Instagram name or bio?",
    answer:
      "Bios and many display names, yes. The @username field, no—keep that plain so people can find you. The bio is 150 characters; fancy letters still count.",
  },
  {
    question: "Where are the Japanese / Cherokee “cool” letters?",
    answer:
      "Those lookalikes live on the cool text generator. They are a different trick from bold or cursive, and most @handles reject them.",
  },
  {
    question: "Should I style a whole paragraph?",
    answer:
      "Skip it. Long styled prose is hard to read, awkward for screen readers, and burns character limits. Use this for names, one bio line, or a short caption.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. It runs in the browser. Copy as many rows as you want.",
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
          sameAs: SITE_SAME_AS,
        })}
      />
      <JsonLd
        data={webSiteJsonLd({
          name: SITE_NAME,
          url: SITE_URL,
          description: page.description,
          searchUrlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
        })}
      />
      <PageJsonLd
        page={page}
        faq={faqItems}
        crumbs={[]}
        howTo={{
          name: "How to use the fancy text generator",
          steps: [
            "Type a name, bio line, or short caption in the box at the top.",
            "Tap a style chip (cursive, bold, bubble, and more). The gallery below loads every Unicode lookalike—use search or category filters to narrow the list.",
            "Tap Copy on any row, then paste into Instagram, Discord, TikTok, or WhatsApp. Want a curated catalog instead? Open copy and paste fonts.",
          ],
        }}
      />
      <HomeHero />
      <HomePlayground />

      <section className="seo-section" aria-labelledby="how-heading">
        <h2 id="how-heading">How to use the fancy text generator</h2>
        <ol className="how-steps">
          <li>
            <span className="how-num" aria-hidden>
              1
            </span>
            <div>
              <strong>Type in the box</strong>
              <p>A name, one bio line, or a short caption works best.</p>
            </div>
          </li>
          <li>
            <span className="how-num" aria-hidden>
              2
            </span>
            <div>
              <strong>Pick a style or browse the gallery</strong>
              <p>
                Style chips above show popular looks instantly. The gallery
                loads every Unicode style (search and filters included)—or open{" "}
                <Link href="/copy-paste-fonts/">copy and paste fonts</Link> for
                curated collections when you know the vibe.
              </p>
            </div>
          </li>
          <li>
            <span className="how-num" aria-hidden>
              3
            </span>
            <div>
              <strong>Copy, then paste</strong>
              <p>
                The look travels with the characters. Nothing installs on your
                phone.
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
            <div className="use-card use-card--static">
              <span className="use-name">Discord</span>
              <span className="use-desc">
                <Link href="/discord-font-generator/">Nicknames</Link>
                {" · "}
                <Link href="/discord-color-text/">ANSI color</Link>
              </span>
            </div>
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
          Each style maps A–Z onto another Unicode block (often Mathematical
          Alphanumeric Symbols). You copy characters, not a TTF. That is why a
          bio can look “bold” even though Instagram has no font picker.{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            How fancy fonts work
          </Link>
          .
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="compat-heading">
        <h2 id="compat-heading">Safer styles vs fragile ones</h2>
        <p>
          Bold and sans bold are the least likely to box out. Script and bubble
          look good on current phones. Glitch and stacked combining marks can
          wreck a layout—keep those tiny. Always check the device you care about,
          not only this preview.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="scope-heading">
        <h2 id="scope-heading">Homepage vs copy and paste fonts</h2>
        <p>
          This URL is the <strong>fancy text generator</strong>—type once, search
          every Unicode style, and copy from one live grid.{" "}
          <Link href="/copy-paste-fonts/">Copy and paste fonts</Link> is the
          catalog hub: jump to aesthetic, cute, cool, cursive, platform, or big
          ASCII collections when you already know the job. Single-style tools
          below stay focused on one modifier.
        </p>
        <ul>
          <li>
            <Link href="/bold-text-generator/">Bold text generator</Link> — bold
            Unicode only, not glitch or the full homepage gallery.
          </li>
          <li>
            <Link href="/stylish-text-generator/">Stylish text generator</Link> —
            graphic / glitch / strikethrough set, not soft aesthetic or cute
            bubble.
          </li>
          <li>
            <Link href="/copy-paste-fonts/">Copy and paste fonts</Link> — catalog
            of collections, not the live all-styles converter on this page.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="practices-heading">
        <h2 id="practices-heading">A few honest limits</h2>
        <ul>
          <li>Style a name or one bio line, not an article.</li>
          <li>
            Keep the words people search for (and screen readers speak) in plain
            letters.
          </li>
          <li>
            Test usernames. Login handles often reject symbols that a bio accepts.
          </li>
          <li>
            Public profiles read better in bold or cursive than in extreme glitch.
          </li>
        </ul>
      </section>

      <section className="seo-section" aria-labelledby="popular-heading">
        <h2 id="popular-heading">If you already know the style</h2>
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
            <Link href="/cool-text-generator/">Cool text generator</Link>
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
            <Link href="/emoji-combos/">Emoji combos</Link>
          </li>
          <li>
            <Link href="/text-art/">Text art</Link>
          </li>
          <li>
            <Link href="/cute-symbols/">Cute symbols</Link>
          </li>
          <li>
            <Link href="/heart-emoji/">Heart emoji</Link>
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
          <li>
            <Link href="/guides/facebook-name-fonts/">
              How to change Facebook name fonts
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
