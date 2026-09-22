import Link from "next/link";
import { Breadcrumbs, HOME_CRUMB } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageHero } from "@/components/seo/PageHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { CaseConverterTool } from "@/components/tool/CaseConverterTool";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

const page = getPageByUrl("/case-converter/")!;
const related = getTopicalRelated("/case-converter/", 6);

const FAQ = [
  {
    question: "What is the difference between title case and capitalized case?",
    answer:
      "Capitalized case raises the first letter of every word without exception. Title case follows writing conventions: short articles, conjunctions, and prepositions such as a, of, and to stay lowercase unless they are the first or last word. Title case is what you want for a headline; capitalized case is what you want for a name.",
  },
  {
    question: "How do I fix text I typed with caps lock on?",
    answer:
      "If the whole line is capitals, use sentence case. If the capitals are inverted — lowercase where capitals should be and the reverse — you had caps lock and shift fighting each other, so use inverse case, which flips every letter back.",
  },
  {
    question: "Does converting case change the characters?",
    answer:
      "No. The output is ordinary text, so it stays fully searchable and screen readers read it normally. That is the difference between this tool and the Unicode style generators on the rest of the site, which swap letters for look-alike characters.",
  },
  {
    question: "Why is my sentence case not capitalising every sentence?",
    answer:
      "Sentence case starts a new sentence after a full stop, question mark, or exclamation mark followed by a space, and after a line break. Sentences separated by a semicolon or a comma are treated as one, because grammatically they are.",
  },
  {
    question: "What is alternating case used for?",
    answer:
      "It is the mocking-tone meme, where alternating capitals imply a sarcastic repetition of something someone said. It has no other practical use, and it is hard to read, so keep it to short phrases.",
  },
  {
    question: "Is there a limit on how much text I can convert?",
    answer:
      "No. Everything runs in your browser, so nothing is uploaded and there is no length cap beyond what your device can handle comfortably.",
  },
];

export function CaseConverterView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={FAQ}
        crumbName="Case converter"
        howTo={{
          name: "How to change text case",
          steps: [
            "Paste your text into the box. Every conversion updates as you type.",
            "Find the row you need — sentence case for caps-lock text, title case for headings.",
            "Press Copy on that row.",
          ],
        }}
      />
      <Breadcrumbs
        items={[HOME_CRUMB, { name: "Case converter" }]}
      />
      <PageHero h1="Case converter" lead={page.description} />

      <div className="tool-stage" id="tool">
        <CaseConverterTool />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="which-heading">
        <h2 id="which-heading">Which case should you use?</h2>
        <p>
          Most people arrive here with one of three problems: a line typed with
          caps lock on, a heading that needs to look like a heading, or a name
          that came out of a spreadsheet in the wrong shape.
        </p>
        <ul>
          <li>
            <strong>Whole line in capitals</strong> — use sentence case. It
            lowercases everything and then raises the first letter of each
            sentence.
          </li>
          <li>
            <strong>Capitals in the wrong places</strong> — use inverse case.
            This is what caps lock plus shift produces, and flipping every letter
            restores it exactly.
          </li>
          <li>
            <strong>Headline or article title</strong> — use title case, which
            keeps short linking words lowercase the way published writing does.
          </li>
          <li>
            <strong>Names, labels, menu items</strong> — use capitalized case, so
            no word is left lowercase.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="plain-heading">
        <h2 id="plain-heading">This tool keeps your text searchable</h2>
        <p>
          Changing case produces ordinary letters. That matters, because the
          Unicode font generators elsewhere on this site do something
          fundamentally different: they replace each letter with a look-alike
          character from another Unicode block, which is why styled text is not
          matched by search and is read incorrectly by screen readers.
        </p>
        <p>
          If you want text that looks styled, use the{" "}
          <Link href="/">fancy text generator</Link> and read{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            how Unicode fancy fonts work
          </Link>{" "}
          first. If you want text that stays readable and findable, case
          conversion is the safe choice.
        </p>
      </section>

      <FellowKeywords
        keywords={page.fellowKeywords}
        currentUrl="/case-converter/"
      />
      <FaqSection items={FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
