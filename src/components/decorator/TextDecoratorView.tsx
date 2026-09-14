import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { TextDecorator } from "@/components/tool/TextDecorator";
import { DECORATOR_FAQ } from "@/data/decorators";
import {
  SITE_NAME,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

const page = getPageByUrl("/text-decorator/")!;
const related = getTopicalRelated("/text-decorator/", 6);

export function TextDecoratorView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={DECORATOR_FAQ}
        crumbName="Text decorator"
        howTo={{
          name: "How to decorate text",
          steps: [
            "Type a short name or word in the box.",
            "Copy a wrap (hearts, stars, brackets).",
            "Paste into a bio. Combine with a font generator if you also want styled letters inside the frame.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Text decorator" },
        ]}
      />
      <PageHero h1="Text decorator" lead={page.description} />

      <div className="tool-stage">
        <TextDecorator />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="decorator-how">
        <h2 id="decorator-how">How wrapping works</h2>
        <p>
          Each row adds symbols before and after your text. Your letters stay
          normal, so the wrap is more compatible than blackletter or glitch
          fonts. Character limits still count the extra marks.
        </p>
        <p>
          Want the letters themselves restyled? Generate a word on the{" "}
          <Link href="/name-font-generator/">name font generator</Link>, paste it
          back into this box, then wrap it. For a stack of bio lines with a live
          counter, use the{" "}
          <Link href="/social-media-bio-generator/">social media bio generator</Link>.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="decorator-uses">
        <h2 id="decorator-uses">Where decorated names work</h2>
        <ul>
          <li>Instagram and TikTok bios (keep the wrap short)</li>
          <li>Discord nicknames and channel topics</li>
          <li>WhatsApp status and group titles</li>
          <li>Cute captions next to a plain-text keyword</li>
        </ul>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl="/text-decorator/" />
      <FaqSection items={DECORATOR_FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
