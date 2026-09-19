import Link from "next/link";
import { CursiveAlphabet } from "@/components/cursive/CursiveAlphabet";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { SampleCopyList } from "@/components/tool/SampleCopyList";
import { DualStylePreview } from "@/components/tool/TextTool";
import { getPageByUrl, getTopicalRelated, SITE_NAME } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/cursive-text-generator/")!;

export const metadata = pageMetadata(page);

const samples = [
  "Your Name",
  "fancy text",
  "Instagram Bio",
  "Discord nick",
  "Cursive Fonts",
];

const howToSteps = [
  "Type a name, bio line, or phrase in the box above.",
  "Copy Cursive / Script or Bold Cursive — both are Unicode, not a font file.",
  "Paste into Instagram, Discord, TikTok, WhatsApp, docs, or a worksheet.",
];

const faqItems = [
  {
    question: "What is a cursive text generator?",
    answer:
      "A cursive text generator converts normal Latin letters into Mathematical Script Unicode (script / cursive look-alikes). You copy the result and paste it anywhere that accepts text—no font download and no app install.",
  },
  {
    question: "Is this a real cursive font or handwriting?",
    answer:
      "Neither. These characters are from Unicode’s Mathematical Alphanumeric Symbols block. They look handwritten, but they are different code points from A–Z. That is why they paste into bios and chats without installing a typeface—and why some older devices show empty boxes.",
  },
  {
    question: "How do I make a name or whole word in cursive?",
    answer:
      "Use this page. Type the name once, then copy Cursive / Script or Bold Cursive. Single-letter pages exist for old links, but this generator is the tool for words, signatures, and bios.",
  },
  {
    question: "Can I copy the whole cursive alphabet?",
    answer:
      "Yes. The cursive alphabet section on this page has capital A–Z and small a–z as copyable Unicode rows, plus links to individual glyphs if you only need one letter.",
  },
  {
    question: "Where can I paste cursive Unicode?",
    answer:
      "Instagram bios and captions, Discord nicknames and messages, TikTok bios, WhatsApp status and chats, and most docs. Username fields are stricter—prefer shorter script or a style marked safe on the name font generator.",
  },
  {
    question: "Do cursive copy and paste fonts work on mobile?",
    answer:
      "Usually yes on current iOS and Android. If you see empty boxes, the device font is missing that glyph. Switch to Bold Cursive, try a more compatible style from the fancy text generator, or read the guide on why fancy text shows as boxes.",
  },
  {
    question: "Will cursive text break screen readers or search?",
    answer:
      "It can. Screen readers and search engines may not treat script letters as normal A–Z. Keep official @usernames and anything people need to find in plain text; use cursive for display names, captions, and decoration.",
  },
];

export default function CursiveHubPage() {
  const related = getTopicalRelated("/cursive-text-generator/", 8);

  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={faqItems}
        crumbName="Cursive text generator"
        howTo={{
          name: "How to make cursive text",
          steps: howToSteps,
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Cursive text generator" },
        ]}
      />
      <PageHero
        h1="Cursive text generator"
        lead="Type a name or phrase and copy elegant Mathematical Script Unicode. This page is the canonical cursive tool for whole words—plus the full A–Z alphabet to copy without installing a font."
      />

      <div className="tool-stage" id="tool">
        <DualStylePreview
          primaryStyleId="cursive"
          secondaryStyleId="bold-cursive"
          primaryLabel="Cursive / Script"
          secondaryLabel="Bold Cursive"
          initialText="Your Name"
          placeholder="Type a name or phrase…"
        />
      </div>

      <section className="seo-section" aria-labelledby="samples-heading">
        <h2 id="samples-heading">Example names and bios</h2>
        <SampleCopyList samples={samples} styleId="cursive" />
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to make cursive text</h2>
        <ol>
          {howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p>
          Need one glyph for a worksheet? Copy it from the alphabet below. Need
          a full signature, Instagram line, or Discord nick? Stay in the
          generator—converting letter by letter is slower and easier to mix up.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="unicode-heading">
        <h2 id="unicode-heading">Unicode script, not a downloadable font</h2>
        <p>
          FancifyText maps each Latin letter to a Mathematical Script character
          (with a few historic letterlike exceptions such as ℬ, ℰ, and ℋ). The
          output is still plain text, so you can paste it into apps that have no
          font picker. It is not connected handwriting: letters will not join
          the way a calligraphy font does on paper.
        </p>
        <p>
          That distinction matters for usernames and search. A script “A” is a
          different character from A, so people cannot always @mention or find
          a fully cursive handle. Keep the unique username in normal letters and
          save cursive for display names, bios, and captions. More detail is in
          the guide on{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            how Unicode fancy fonts work
          </Link>
          .
        </p>
      </section>

      <CursiveAlphabet />

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where to use cursive text</h2>
        <ul>
          <li>
            <Link href="/instagram-font-generator/">Instagram</Link> bios,
            captions, and display names (watch the 150-character bio limit—
            script letters still count as characters).
          </li>
          <li>
            <Link href="/discord-font-generator/">Discord</Link> nicknames,
            bios, and channel topics. For colored chat, use the separate{" "}
            <Link href="/discord-color-text/">Discord color text</Link> tool
            instead of script.
          </li>
          <li>
            <Link href="/tiktok-font-generator/">TikTok</Link> profile text and
            short captions where an elegant name stands out.
          </li>
          <li>
            <Link href="/whatsapp-fonts/">WhatsApp</Link> status, group names,
            and chats. WhatsApp also has *bold* markdown—Unicode script is the
            option when you want a look markdown cannot do.
          </li>
          <li>
            <Link href="/name-font-generator/">Usernames and name fonts</Link>{" "}
            when the field allows script. Many login names reject it; display
            names are the safer slot.
          </li>
          <li>
            School worksheets, invitations, and aesthetic quotes where you need
            a cursive model without installing a typeface.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="compat-heading">
        <h2 id="compat-heading">Boxes, handles, and screen readers</h2>
        <ul>
          <li>
            Script is widely supported on current iPhone, Android, Windows, and
            macOS. Gaps still happen in older OS fonts and some game UIs.
          </li>
          <li>
            If a glyph becomes a box, try Bold Cursive on this page or a
            “works everywhere” style from the{" "}
            <Link href="/">fancy text generator</Link>.
          </li>
          <li>
            Prefer{" "}
            <Link href="/copy-paste-fonts/">copy and paste fonts</Link> when you
            want to compare cursive next to bold, bubble, and aesthetic styles
            in one gallery.
          </li>
        </ul>
      </section>

      <FellowKeywords
        keywords={page.fellowKeywords}
        currentUrl="/cursive-text-generator/"
      />
      <BackToTool />
      <FaqSection items={faqItems} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
