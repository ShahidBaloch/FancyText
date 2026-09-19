import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageHero } from "@/components/seo/PageHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { LinkedInFormatter } from "@/components/linkedin/LinkedInFormatter";
import {
  SITE_NAME,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

const URL = "/linkedin-text-formatter/";
const page = getPageByUrl(URL)!;
const related = getTopicalRelated(URL, 6);

const FAQ = [
  {
    question: "How do I make text bold on LinkedIn?",
    answer:
      "LinkedIn has no bold button in the post composer, so there is nothing to click inside LinkedIn itself. Select the words in the box above, press Bold, and paste the result into your post. What you are pasting is not formatting — it is different characters that happen to look bold, which is why they survive the paste.",
  },
  {
    question: "Why does bold text fail in my LinkedIn headline?",
    answer:
      "LinkedIn validates the headline field and rejects styled characters with an “invalid characters” error, so a bold headline will not save. Keep the headline in ordinary letters. It is the right call anyway: the headline is what shows in search results and connection requests, and only the first 60–70 characters are visible there.",
  },
  {
    question: "Does styled text hurt my reach or searchability?",
    answer:
      "It does not match plain-text search. 𝗴𝗿𝗼𝘄𝘁𝗵 is a different string from “growth”, so a styled keyword stops matching what people type. Style the hook or one phrase for emphasis and leave your keywords, hashtags, and name in ordinary letters.",
  },
  {
    question: "What is the “see more” fold and why does this tool show it?",
    answer:
      "LinkedIn collapses long posts in the feed after roughly 210 characters on desktop and 140 on mobile, with everything past that behind a “…see more” click. The 3,000-character ceiling is almost never the constraint; the fold is. LinkedIn has never published the exact numbers and they shift with UI changes, so treat the marker as a target zone rather than a precise cut.",
  },
  {
    question: "How do I make a bulleted list on LinkedIn?",
    answer:
      "LinkedIn ignores Markdown lists, so a hyphen at the start of a line stays a hyphen. Real lists are literal bullet characters. The List button adds • to each selected line, and the symbol drawer rates each bullet by how reliably it renders — • U+2022 is the only one that is genuinely safe everywhere.",
  },
  {
    question: "Can I undo the styling if I change my mind?",
    answer:
      "Yes. Clear styling converts the characters back to plain letters, and it works on text you paste in from somewhere else too. The standalone version of that is the convert fancy text to normal tool.",
  },
  {
    question: "Is this accessible to screen reader users?",
    answer:
      "Partly, and it depends on the reader. NVDA turned Unicode normalization on by default for speech in version 2025.1, so it reads styled letters as ordinary words. JAWS, Narrator, and VoiceOver do not share that default and may spell characters out or substitute them. A styled word or two is fine; a styled paragraph is not.",
  },
  {
    question: "Do I need an account or a Chrome extension?",
    answer:
      "No. Everything runs in your browser, nothing is uploaded, and there is no signup, usage cap, or paid tier. The formatting tools bundled into LinkedIn scheduling products do the same Unicode substitution behind a login.",
  },
];

export function LinkedInFormatterView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={FAQ}
        crumbName="LinkedIn text formatter"
        howTo={{
          name: "How to format text for a LinkedIn post",
          steps: [
            "Type or paste your post into the box.",
            "Select the words you want to emphasise and press Bold or Italic. With nothing selected, the style applies to everything.",
            "Check the feed preview — anything after the “…see more” marker needs a click to read.",
            "Press Copy for LinkedIn and paste it into the composer.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "LinkedIn text formatter" },
        ]}
      />
      <PageHero h1="LinkedIn text formatter" lead={page.description} />

      <div className="tool-stage" id="tool">
        <LinkedInFormatter />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="why-heading">
        <h2 id="why-heading">Why LinkedIn has no bold button</h2>
        <p>
          The post composer accepts plain text only. There is no rich-text mode
          to enable and no setting to find, so every bold LinkedIn post you have
          seen was made the same way: by swapping letters for look-alike
          characters from Unicode&rsquo;s Mathematical Alphanumeric Symbols
          block.
        </p>
        <p>
          𝗕 is not the letter B with bold applied. It is U+1D5D5, a separate
          character that was added so mathematicians could write bold variables.
          LinkedIn has no idea it is supposed to look emphasised — it just stores
          the characters you gave it, which is exactly why the effect survives a
          copy and paste that would strip real formatting.
        </p>
        <p>
          That mechanism explains both the appeal and the cost. It works in
          fields that allow no formatting at all, and it breaks the things that
          rely on letters being letters: search, hashtags, spellcheck, and some
          screen readers. The{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            full explanation of how Unicode fancy fonts work
          </Link>{" "}
          covers the blocks involved.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="use-heading">
        <h2 id="use-heading">Where to style, and where not to</h2>
        <ul>
          <li>
            <strong>Bold the hook, not the post.</strong> One bold opening line
            earns attention. A bold paragraph is slower to read for everyone and
            reads as shouting.
          </li>
          <li>
            <strong>Leave keywords plain.</strong> Anything you want found by a
            LinkedIn search, a hashtag, or Google has to be ordinary letters.
          </li>
          <li>
            <strong>Never style the headline.</strong> LinkedIn rejects it
            outright, and the headline is the field doing the most work for you
            in search results.
          </li>
          <li>
            <strong>Skip decorative alphabets.</strong> Fraktur and
            double-struck are the usual sources of empty boxes on Android, which
            is why the toolbar above leaves them out. Browse them on the{" "}
            <Link href="/copy-paste-fonts/">copy and paste fonts</Link> pages if
            you want them for a bio elsewhere.
          </li>
          <li>
            <strong>Use blank lines.</strong> White space does more for
            readability than any character substitution, and it costs nothing in
            accessibility.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="ai-heading">
        <h2 id="ai-heading">Drafted your post with an AI assistant?</h2>
        <p>
          Then you do not want this page. ChatGPT, Claude, and Gemini reply in
          Markdown, so their <code>**bold**</code> and <code>## headings</code>{" "}
          arrive in LinkedIn as literal asterisks and hashes. The{" "}
          <Link href="/chatgpt-to-linkedin/">ChatGPT to LinkedIn formatter</Link>{" "}
          takes that Markdown and converts it in one paste — headings, lists,
          tables, and the em dashes that come with it.
        </p>
        <p>
          Use this page when you are writing in the box yourself and want to
          emphasise a phrase by hand.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl={URL} />
      <BackToTool />
      <FaqSection items={FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
