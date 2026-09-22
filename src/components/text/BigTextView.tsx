import Link from "next/link";
import { Breadcrumbs, HOME_CRUMB } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageHero } from "@/components/seo/PageHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { BigTextTool } from "@/components/tool/BigTextTool";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

const page = getPageByUrl("/big-text-generator/")!;
const related = getTopicalRelated("/big-text-generator/", 6);

const FAQ = [
  {
    question: "What is a big text generator?",
    answer:
      "It turns a short phrase into large copy-paste ASCII letters built from ordinary characters like #, |, and /. The result is banner-sized text art, not a downloadable font and not a Unicode fancy style.",
  },
  {
    question: "Is ASCII big text the same as fancy Unicode fonts?",
    answer:
      "No. Fancy fonts on this site swap each letter for a look-alike Unicode character, so a bio still reads as one line. ASCII big text draws each letter out of many rows of plain characters. It needs a monospace view (a code block, a terminal, or a comment box) and will not fit an Instagram bio.",
  },
  {
    question: "Where can I paste ASCII art letters?",
    answer:
      "Discord messages and forum posts (inside a code block), Reddit comments, GitHub READMEs, email signatures that allow preformatted text, and some game chats. It is a poor fit for usernames, Instagram or TikTok bios, and any field with a tight character limit.",
  },
  {
    question: "Why does my big text look misaligned after I paste it?",
    answer:
      "Proportional fonts squeeze spaces. Copy the code-block version and paste that into Discord or Reddit so the letters stay on a grid. On mobile, preview in landscape if a long word overflows.",
  },
  {
    question: "Will this fit in an Instagram bio?",
    answer:
      "Almost never. Instagram bios are 150 characters, collapse extra spaces, and do not render as a fixed-width grid. Use the Instagram font generator for a single stylish line instead.",
  },
];

export function BigTextView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={FAQ}
        crumbName="Big text generator"
        howTo={{
          name: "How to make big ASCII text",
          steps: [
            "Type a short name or title. Keep it to a few words so the banner stays pasteable.",
            "Pick Blocky, Tall banner, or Outline.",
            "Press Copy, or Copy code block for Discord and Reddit, then paste.",
          ],
        }}
      />
      <Breadcrumbs
        items={[HOME_CRUMB, { name: "Big text generator" }]}
      />
      <PageHero h1="Big text generator" lead={page.description} />

      <div className="tool-stage" id="tool">
        <BigTextTool />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to make large copy-paste letters</h2>
        <ol>
          <li>Type a short word — a name, a server title, or a one-line shout.</li>
          <li>
            Choose a style: <strong>Blocky</strong> for dense hash letters,{" "}
            <strong>Tall banner</strong> for extra height, or{" "}
            <strong>Outline</strong> for a lighter stroke.
          </li>
          <li>
            Copy the art. In Discord, use the code-block copy so the spaces do
            not collapse.
          </li>
        </ol>
        <p>
          Everything on this page is plain ASCII. You do not install a font, and
          the letters are not the Unicode “fancy fonts” used in bios. If you want
          a single stylish line instead of a banner, start at the{" "}
          <Link href="/">fancy text generator</Link>.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="where-heading">
        <h2 id="where-heading">Where to use ASCII big text</h2>
        <ul>
          <li>
            <strong>Discord</strong> — paste inside a code block so the banner
            stays aligned. Pair with the{" "}
            <Link href="/discord-font-generator/">Discord font generator</Link>{" "}
            for nicknames (those fields cannot hold multi-line art).
          </li>
          <li>
            <strong>Comments and forums</strong> — Reddit, GitHub, and similar
            monospace or markdown views.
          </li>
          <li>
            <strong>Bios — with caveats</strong> — Instagram (150 characters),
            TikTok (80), and most username fields will reject or wreck a banner.
            A two-letter joke might survive a Discord about-me; a full name will
            not.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="compat-heading">
        <h2 id="compat-heading">ASCII banners vs Unicode fancy fonts</h2>
        <p>
          Unicode fancy fonts replace A with a look-alike character. Search,
          screen readers, and some username filters still see a different code
          point, but the text stays one line and often pastes into a bio. ASCII
          big text is the opposite: it is made of the same <code>#</code> and{" "}
          <code>|</code> characters every font already has, so it works almost
          everywhere that preserves spaces — and it is huge.
        </p>
        <p>
          Use this generator when you want a shout in a message. Use{" "}
          <Link href="/copy-paste-fonts/">copy-and-paste fonts</Link> when you
          want a stylish bio that still has to fit a character counter.
        </p>
      </section>

      <FellowKeywords
        keywords={page.fellowKeywords}
        currentUrl="/big-text-generator/"
      />
      <FaqSection items={FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
