import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { LetterGrid } from "@/components/seo/LetterGrid";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { SampleCopyList } from "@/components/tool/SampleCopyList";
import { TextTool } from "@/components/tool/TextTool";
import { getPageByUrl, getTopicalRelated, SITE_NAME } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/cursive-text-generator/")!;

export const metadata = pageMetadata(page);

const samples = ["fancy text", "Your Name", "Instagram Bio", "Cursive Fonts"];

const faqItems = [
  {
    question: "What is a cursive text generator?",
    answer:
      "A cursive text generator converts normal letters into Unicode script (cursive) characters you can copy and paste into social apps, chats, and documents—no font download required.",
  },
  {
    question: "Are these elegant cursive fonts copy and paste ready?",
    answer:
      "Yes. Every style on this page is Unicode text. Copy once and paste into Instagram, Discord, TikTok, WhatsApp, and more.",
  },
  {
    question: "How do I get a single cursive letter like cursive S?",
    answer:
      "Use the A–Z grids below (capital and small). Each letter has its own page with a large copyable glyph, worksheet tips, and FAQs.",
  },
  {
    question: "Do cursive copy and paste fonts work on mobile?",
    answer:
      "Usually yes. If a device shows empty boxes, try another script variant or a more compatible style from the main fancy text generator.",
  },
];

export default function CursiveHubPage() {
  const related = getTopicalRelated("/cursive-text-generator/", 6);

  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={faqItems}
        crumbName="Cursive text generator"
        howTo={{
          name: "How to make cursive text",
          steps: [
            "Enter your name or phrase in the box above.",
            "Choose Cursive / Script (or Bold Cursive).",
            "Copy the result and paste it into your bio, chat, or worksheet.",
          ],
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
        lead="Type any word and copy elegant cursive / script Unicode fonts. Browse capital and small cursive letters A–Z when you only need one glyph."
      />

      <div className="tool-stage" id="tool">
        <TextTool defaultStyleId="cursive" placeholder="Type cursive text…" />
      </div>

      <section className="seo-section" aria-labelledby="samples-heading">
        <h2 id="samples-heading">Examples</h2>
        <SampleCopyList samples={samples} styleId="cursive" />
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to make cursive text</h2>
        <ol>
          <li>Enter your name or phrase in the box above.</li>
          <li>Choose Cursive / Script (or Bold Cursive).</li>
          <li>Copy the result and paste it into your bio, chat, or worksheet.</li>
        </ol>
      </section>

      <LetterGrid />
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
