import Link from "next/link";
import { Breadcrumbs, HOME_CRUMB } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageHero } from "@/components/seo/PageHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { InvisibleTextTool } from "@/components/tool/InvisibleTextTool";
import {
  INVISIBLE_CHARS,
  INVISIBLE_FAQ,
  INVISIBLE_KIND_LABELS,
} from "@/data/invisible";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

const page = getPageByUrl("/invisible-character/")!;
const related = getTopicalRelated("/invisible-character/", 6);

export function InvisibleTextView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={INVISIBLE_FAQ}
        crumbName="Invisible character"
        howTo={{
          name: "How to copy an invisible character",
          steps: [
            "Pick a character — Braille Pattern Blank works in the widest range of apps.",
            "Choose how many copies you need. One is enough for a blank bio line; a name field usually needs several.",
            "Press Copy, then paste into the field. The brackets in the preview show you the width you copied.",
          ],
        }}
      />
      <Breadcrumbs
        items={[HOME_CRUMB, { name: "Invisible character" }]}
      />
      <PageHero h1="Invisible character" lead={page.description} />

      <div className="tool-stage" id="tool">
        <InvisibleTextTool />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="kinds-heading">
        <h2 id="kinds-heading">Blank is not the same as zero-width</h2>
        <p>
          Almost every problem with invisible characters comes from mixing up two
          different things. A <strong>blank glyph</strong> is an ordinary
          printable character that happens to draw nothing — it takes up width,
          and apps treat it like a letter. A{" "}
          <strong>zero-width character</strong> is a formatting control that
          occupies no space at all, and apps are free to strip it.
        </p>
        <p>
          That is why a blank glyph survives a bio field that trims whitespace,
          and a zero-width character usually does not. If something you pasted
          vanished, you almost certainly used the second kind when you wanted the
          first.
        </p>
      </section>

      <section className="seo-section" aria-labelledby="table-heading">
        <h2 id="table-heading">Every character on this page, and what it does</h2>
        <div className="codes-table-wrap">
          <table className="codes-table">
            <thead>
              <tr>
                <th>Character</th>
                <th>Code point</th>
                <th>Type</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              {INVISIBLE_CHARS.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <code>{item.codePoint}</code>
                  </td>
                  <td>{INVISIBLE_KIND_LABELS[item.kind]}</td>
                  <td>{item.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="bio-heading">
        <h2 id="bio-heading">Blank lines in an Instagram bio</h2>
        <p>
          Instagram collapses empty lines when you save, which is why pressing
          Enter twice never works. The fix is to make the line not empty: put a
          single blank character on it.
        </p>
        <ol>
          <li>Copy one Braille Pattern Blank from the tool above.</li>
          <li>
            Open your bio, put the cursor on the line where you want the gap, and
            paste.
          </li>
          <li>
            Save. If the gap disappears, edit the bio on the Instagram website
            rather than the mobile app — the web editor preserves line breaks
            more reliably.
          </li>
        </ol>
        <p>
          Blank characters still count toward the 150-character bio limit. The{" "}
          <Link href="/social-media-bio-generator/">
            social media bio generator
          </Link>{" "}
          counts them for you as you build the lines.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="names-heading">
        <h2 id="names-heading">Blank usernames and display names</h2>
        <p>
          A name field rejects input that is empty or made only of spaces, so a
          blank name needs a character that validation counts as content. Hangul
          Filler is the usual choice because it is categorised as a letter.
        </p>
        <p>
          Be realistic about this one: platforms actively patch it. A character
          that works in a game today may be rejected after the next update, and
          some services treat a deliberately unreadable name as a rules
          violation. If you want a name that is distinctive rather than absent,
          a styled one from the{" "}
          <Link href="/name-font-generator/">name font generator</Link> is far
          more durable.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="a11y-heading">
        <h2 id="a11y-heading">What this does to screen readers and search</h2>
        <p>
          Blank glyphs are generally skipped by screen readers, so using one as a
          bio spacer is harmless. Zero-width characters are the risky ones: drop
          one into the middle of a word and the word is no longer a single token,
          so a screen reader may pronounce the halves separately and find-on-page
          will not match it.
        </p>
        <p>
          The same applies to search engines. Text broken up by zero-width
          characters no longer matches the phrase a person typed, so keep them
          out of anything you want found. The same reasoning behind{" "}
          <Link href="/guides/how-unicode-fancy-fonts-work/">
            how Unicode fancy fonts work
          </Link>{" "}
          applies here.
        </p>
      </section>

      <FellowKeywords
        keywords={page.fellowKeywords}
        currentUrl="/invisible-character/"
      />
      <FaqSection items={INVISIBLE_FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
