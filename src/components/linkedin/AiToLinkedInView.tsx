import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs, HOME_CRUMB } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageHero } from "@/components/seo/PageHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { AiToLinkedIn } from "@/components/linkedin/AiToLinkedIn";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

const URL = "/chatgpt-to-linkedin/";
const page = getPageByUrl(URL)!;
const related = getTopicalRelated(URL, 6);

const FAQ = [
  {
    question: "Why does my ChatGPT text look broken when I paste it into LinkedIn?",
    answer:
      "Because the assistant replied in Markdown and LinkedIn does not read Markdown. The chat window renders **bold** as bold, so you never see the asterisks — but the text you copied still contains them, and LinkedIn shows them literally. Headings become ## in the feed, and hyphen bullets stay hyphens.",
  },
  {
    question: "Does Markdown work on LinkedIn at all?",
    answer:
      "No. Not in posts, comments, headlines, or the About section. The only place with genuine rich text is the article editor, which has its own toolbar. Everywhere else, formatting has to be characters, which is what this converter produces.",
  },
  {
    question: "What happens to tables?",
    answer:
      "Each row is flattened to a single line with cells separated by a middle dot, because LinkedIn has no table support of any kind. For anything wider than three columns that is a poor result no matter what the tool does — a screenshot or a document carousel will read better.",
  },
  {
    question: "Why does it change em dashes?",
    answer:
      "Em dashes are the most-cited giveaway that text came out of a language model, and they are the one artefact people most often want gone. You can switch the replacement to a comma or keep them. This is about tidying punctuation, not about defeating AI detectors — those do not work by counting dashes, and no tool that claims otherwise is telling you the truth.",
  },
  {
    question: "What else does it clean up?",
    answer:
      "Curly quotes and apostrophes become straight ones, the single-character ellipsis becomes three periods, en dashes become hyphens, and non-breaking and zero-width spaces are removed. Invisible characters matter more than they sound: they survive a paste and can make a line break in an unexpected place. Every change is counted in the readout so you can see what happened.",
  },
  {
    question: "Can I strip the Markdown instead of converting it?",
    answer:
      "Yes — switch to “Strip it to plain text”. You get the structure without any styled characters: clean prose, bullet characters for lists, and no Unicode substitution at all. That is the better choice for accessibility, and for anywhere the text needs to stay searchable.",
  },
  {
    question: "Are my drafts sent anywhere?",
    answer:
      "No. The conversion is JavaScript running in your browser. Nothing is uploaded, there is no account, and unposted drafts do not leave your device — which is not something you can say about extensions and scheduling tools that need a login.",
  },
  {
    question: "Should I convert the whole post to styled characters?",
    answer:
      "No. A post that is entirely styled characters is slower to read, invisible to LinkedIn search, and awkward on screen readers that do not normalise. The useful pattern is a styled first line and plain body text, which is what “Headings become bold” gives you by default.",
  },
];

export function AiToLinkedInView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={FAQ}
        crumbName="ChatGPT to LinkedIn"
        howTo={{
          name: "How to format ChatGPT output for LinkedIn",
          steps: [
            "Copy the assistant's reply and paste it into the top box.",
            "Leave the mode on Convert to turn **bold** and ## headings into LinkedIn-safe characters, or switch to Strip for clean plain text.",
            "Read the notes about what the conversion changed — tables and code blocks lose the most.",
            "Press Copy for LinkedIn and paste it into the composer.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          HOME_CRUMB,
          { name: "ChatGPT to LinkedIn" },
        ]}
      />
      <PageHero h1="ChatGPT to LinkedIn formatter" lead={page.description} />

      <div className="tool-stage" id="tool">
        <AiToLinkedIn />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="what-heading">
        <h2 id="what-heading">What gets converted</h2>
        <div className="codes-table-wrap">
          <table className="codes-table">
            <thead>
              <tr>
                <th>Markdown in</th>
                <th>LinkedIn out</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>**bold**</code>
                </td>
                <td>𝗯𝗼𝗹𝗱</td>
                <td>Sans-serif bold, the most reliable styled alphabet.</td>
              </tr>
              <tr>
                <td>
                  <code>*italic*</code>
                </td>
                <td>𝘪𝘵𝘢𝘭𝘪𝘤</td>
                <td>Sans-serif italic. Underscores work too.</td>
              </tr>
              <tr>
                <td>
                  <code>## Heading</code>
                </td>
                <td>Bold line</td>
                <td>
                  LinkedIn has no heading levels, so every depth looks the same.
                </td>
              </tr>
              <tr>
                <td>
                  <code>- item</code>
                </td>
                <td>• item</td>
                <td>A real bullet character, because Markdown lists do nothing.</td>
              </tr>
              <tr>
                <td>
                  <code>1. item</code>
                </td>
                <td>1. item</td>
                <td>Kept as digits — already the most readable option.</td>
              </tr>
              <tr>
                <td>
                  <code>[text](url)</code>
                </td>
                <td>text (url)</td>
                <td>
                  Link syntax does nothing here. LinkedIn auto-links a bare URL.
                </td>
              </tr>
              <tr>
                <td>
                  <code>&gt; quote</code>
                </td>
                <td>&ldquo;quote&rdquo;</td>
                <td>No blockquote styling exists, so quotation marks stand in.</td>
              </tr>
              <tr>
                <td>
                  <code>`code`</code>
                </td>
                <td>𝚌𝚘𝚍𝚎</td>
                <td>Monospace characters — the look, not a real code block.</td>
              </tr>
              <tr>
                <td>Tables</td>
                <td>One line per row</td>
                <td>Cells joined with a middle dot. Lossy by necessity.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="breaks-heading">
        <h2 id="breaks-heading">Line breaks are the other half of the problem</h2>
        <p>
          Formatting is not usually what ruins a pasted AI draft — spacing is.
          LinkedIn treats blank lines inconsistently: the desktop composer keeps a
          double return, the mobile app often discards extra blank lines, and
          comments do not support them at all.
        </p>
        <p>
          This converter collapses runs of three or more newlines to a single
          blank line, which is the spacing LinkedIn preserves most reliably, and
          removes the non-breaking and zero-width spaces that models sprinkle
          through prose. If your spacing still collapses after pasting, the{" "}
          <Link href="/guides/linkedin-formatting-not-working/">
            LinkedIn formatting troubleshooting guide
          </Link>{" "}
          covers the invisible-character workaround and when it is worth using.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="honest-heading">
        <h2 id="honest-heading">What this does not do</h2>
        <ul>
          <li>
            <strong>It does not write the post.</strong> There is no model here
            and no generated text — it converts what you already have.
          </li>
          <li>
            <strong>It does not make text undetectable as AI-written.</strong>{" "}
            Removing em dashes changes punctuation, not the writing underneath.
            Any tool selling detector evasion is selling a guess.
          </li>
          <li>
            <strong>It does not create real formatting.</strong> Converted bold is
            a set of substitute characters. That is the only mechanism LinkedIn
            allows, and it comes with the{" "}
            <Link href="/guides/do-fancy-fonts-break-screen-readers/">
              screen reader trade-offs
            </Link>{" "}
            attached.
          </li>
          <li>
            <strong>It does not keep a copy.</strong> Nothing is uploaded and
            nothing is stored.
          </li>
        </ul>
        <p>
          If you need to go the other way — someone sent you styled text and you
          want plain letters back — use{" "}
          <Link href="/unformat-text/">convert fancy text to normal</Link>.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl={URL} />
      <BackToTool />
      <FaqSection items={FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
