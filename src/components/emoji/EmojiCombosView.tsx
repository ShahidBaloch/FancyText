import Link from "next/link";
import { Breadcrumbs, HOME_CRUMB } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import {
  EMOJI_COMBO_CATEGORIES,
  EMOJI_COMBO_FAQ,
  EMOJI_COMBO_PROSE,
  EMOJI_COMBO_SINGLES,
} from "@/data/emoji-combos";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

const page = getPageByUrl("/emoji-combos/")!;
const related = getTopicalRelated("/emoji-combos/", 6);

export function EmojiCombosView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={EMOJI_COMBO_FAQ}
        crumbName="Emoji combos"
        howTo={{
          name: "How to copy emoji combos",
          steps: [
            "Pick a category (cute, aesthetic, love, funny).",
            "Tap a combo row—it copies the full emoji string.",
            "Paste into Discord, Instagram, TikTok, or your bio.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          HOME_CRUMB,
          { name: "Emoji combos" },
        ]}
      />
      <PageHero
        h1="Emoji combos copy and paste"
        lead={page.description}
        specimenPath="/emoji-combos/"
      />

      <div className="tool-stage" id="tool">
        <p className="field-label">Tap any combo to copy · picture emoji, not fonts</p>
        {EMOJI_COMBO_CATEGORIES.map((cat) => (
          <section
            key={cat.id}
            className="seo-section seo-section--tight"
            aria-labelledby={`combo-${cat.id}`}
          >
            <h2 id={`combo-${cat.id}`}>{cat.heading}</h2>
            <p className="seo-lead">{cat.blurb}</p>
            <KaomojiGrid
              faces={cat.combos}
              idPrefix={`combo-${cat.id}`}
              variant="emoji"
            />
          </section>
        ))}
      </div>

      <section className="seo-section" aria-labelledby="combo-singles">
        <h2 id="combo-singles">Single emoji (quick copy)</h2>
        <p className="seo-lead">
          One character for star, cat, heart, and fire searches. For symbol
          marks like ☆ and ♡, see{" "}
          <Link href="/cute-symbols/">cute symbols</Link>.
        </p>
        <KaomojiGrid
          faces={EMOJI_COMBO_SINGLES}
          idPrefix="emoji-single"
          variant="emoji"
        />
      </section>

      <section
        className="seo-section seo-prose"
        aria-labelledby={EMOJI_COMBO_PROSE.id}
      >
        <h2 id={EMOJI_COMBO_PROSE.id}>{EMOJI_COMBO_PROSE.heading}</h2>
        {EMOJI_COMBO_PROSE.paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        {EMOJI_COMBO_PROSE.bullets ? (
          <ul>
            {EMOJI_COMBO_PROSE.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl="/emoji-combos/" />
      <FaqSection items={EMOJI_COMBO_FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
