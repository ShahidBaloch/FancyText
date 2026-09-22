import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs, HOME_CRUMB } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageHero } from "@/components/seo/PageHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { UnformatTool } from "@/components/text/UnformatTool";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

const URL = "/unformat-text/";
const page = getPageByUrl(URL)!;
const related = getTopicalRelated(URL, 6);

const FAQ = [
  {
    question: "How do I convert fancy text back to normal?",
    answer:
      "Paste it into the box above. Each styled character is matched against the Unicode block it came from and swapped back for its plain twin, so 𝗛𝗲𝗹𝗹𝗼 becomes Hello. It works on bold, italic, script, Fraktur, double-struck, monospace, fullwidth, bubble, squared, small caps, superscript, and subscript.",
  },
  {
    question: "Will this damage text in other languages?",
    answer:
      "Not with the default settings. Real Cyrillic, Greek, Arabic, Hebrew, and CJK text passes through untouched, and accented Latin such as café and naïve is preserved. The one setting that can affect real writing is lookalike decoding, which is off by default and labelled as such.",
  },
  {
    question: "What is lookalike decoding and when should I use it?",
    answer:
      "Some styles fake a Latin alphabet using letters borrowed from a living script — faux Cyrillic writes “Nova” as Иоѵа, and Cherokee, Bopomofo, and CJK styles do the same thing. Those characters are indistinguishable from genuine text in that language, so decoding them can only ever be a guess. Turn it on for a styled username; leave it off for anything that might contain a real name.",
  },
  {
    question: "Can it remove Zalgo and strikethrough marks?",
    answer:
      "Yes. Those effects work by stacking combining marks on ordinary letters, and the marks are stripped out. The distinction that matters is between decoration and real accents: a base letter carrying several marks is a Zalgo stack and all of them go, while a single ordinary accent is left alone so é stays é.",
  },
  {
    question: "Why would I want to undo fancy text?",
    answer:
      "Most often to get something into a field that will not take it — a job application form, a CRM, a LinkedIn headline, a spreadsheet. It is also how you recover a username someone sent you in styled characters so you can actually search for it, and how you make copy accessible again before publishing it.",
  },
  {
    question: "How is this different from a case converter?",
    answer:
      "A case converter changes capitalisation of ordinary letters. This changes the characters themselves, replacing look-alikes from other Unicode blocks with the standard letters they imitate. If your text is already plain and you only need capitalisation fixed, use the case converter.",
  },
  {
    question: "Why is some text not fully restored?",
    answer:
      "A few styles lose information that cannot be recovered. Upside-down and mirror text are written back to front; several lookalike alphabets reuse one glyph for two letters, so l and 7 or r and j become ambiguous; and capitalisation is a guess whenever a style maps upper and lower case to the same character. Everything from the mathematical alphabet round-trips exactly.",
  },
  {
    question: "Does anything get uploaded?",
    answer:
      "No. The character maps ship with the page and run in your browser, so pasted text never leaves your device. That matters here more than on most pages, because people paste things like draft applications into this box.",
  },
];

export function UnformatView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={FAQ}
        crumbName="Convert fancy text to normal"
        howTo={{
          name: "How to convert fancy text back to normal text",
          steps: [
            "Paste the styled text into the top box.",
            "Check the readout — it names the styles it found and what it removed.",
            "If Latin-looking letters remain, turn on lookalike decoding.",
            "Press Copy plain text.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          HOME_CRUMB,
          { name: "Convert fancy text to normal" },
        ]}
      />
      <PageHero h1="Convert fancy text to normal" lead={page.description} />

      <div className="tool-stage" id="tool">
        <UnformatTool />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">Why this can be done at all</h2>
        <p>
          Styled text is not a font. Each character is a separate code point that
          was added to Unicode for its own reasons — the bold alphabet exists so
          mathematicians can write bold variables, and the fullwidth forms exist
          for mixing Latin into Japanese and Chinese typesetting.
        </p>
        <p>
          Because those characters were unified with the letters they resemble,
          most of them carry a formal link back to a plain twin: U+1D41A
          MATHEMATICAL BOLD SMALL A records a decomposition to an ordinary
          &ldquo;a&rdquo;. That mapping is what makes reversal reliable rather
          than a lookup table someone typed by hand.
        </p>
        <p>
          It is also the reason the reverse maps here are generated from the same
          character maps the{" "}
          <Link href="/">fancy text generator</Link> uses to produce styled text
          in the first place. They cannot fall out of step, because there is only
          one source for both directions.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="limits-heading">
        <h2 id="limits-heading">What comes back perfectly, and what does not</h2>
        <ul>
          <li>
            <strong>Exact.</strong> Bold, italic, bold italic, script, Fraktur,
            double-struck, sans, monospace, fullwidth, bubble, squared,
            parenthesized, small caps, superscript, and subscript.
          </li>
          <li>
            <strong>Text preserved, marks removed.</strong> Strikethrough,
            underline, slash, dot and wave overlays, and Zalgo. The letters
            underneath are untouched.
          </li>
          <li>
            <strong>Ambiguous.</strong> Lookalike alphabets that reuse a glyph for
            two different letters — Bopomofo, CJK strokes, and the phonetic sets.
            Expect a character or two to need fixing by hand.
          </li>
          <li>
            <strong>Order lost.</strong> Upside-down text is reversed as well as
            flipped. It is detected and un-mirrored, but mirror text with no
            glyph changes is indistinguishable from ordinary text written
            backwards.
          </li>
          <li>
            <strong>Not recoverable.</strong> Binary, Morse, and big ASCII letter
            art are encodings rather than substitutions. Nothing here will decode
            them.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="ai-heading">
        <h2 id="ai-heading">Cleaning up AI-generated text</h2>
        <p>
          Text pasted out of a chat assistant usually has a different problem:
          Markdown markers, em dashes, curly quotes, and the occasional
          zero-width space. This page removes invisible characters and normalises
          odd spaces, but it will not touch <code>**asterisks**</code> or{" "}
          <code>## headings</code>.
        </p>
        <p>
          For that, use the{" "}
          <Link href="/chatgpt-to-linkedin/">ChatGPT to LinkedIn formatter</Link>{" "}
          — its strip mode turns Markdown into clean plain text, and it reports
          each punctuation substitution it makes.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl={URL} />
      <BackToTool />
      <FaqSection items={FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
