import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { BioBuilder } from "@/components/tool/BioBuilder";
import { DiscordColorTool } from "@/components/tool/DiscordColorTool";
import { HtmlRichTool } from "@/components/tool/HtmlRichTool";
import { StyleGallery } from "@/components/tool/StyleGallery";
import { FIELD_UNICODE_LABELS, type PlatformConfig } from "@/data/platforms";
import { SITE_NAME, getPageByUrl, getTopicalRelated } from "@/data/pages/registry";
import { DISCORD_COLOR_CODES } from "@/lib/discord/ansi";

type PlatformViewProps = {
  config: PlatformConfig;
};

function capitalizeKeyword(kw: string): string {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

export function PlatformView({ config }: PlatformViewProps) {
  const page = getPageByUrl(`/${config.slug}/`);
  const url = `/${config.slug}/`;
  const related = getTopicalRelated(url, 6);
  const h1 = page?.primaryKeyword
    ? capitalizeKeyword(page.primaryKeyword)
    : capitalizeKeyword(config.slug.replace(/-/g, " "));

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={page}
          faq={config.faq}
          crumbName={h1}
          howTo={{
            name: config.howToHeading ?? `How to use ${h1.toLowerCase()}`,
            steps: config.howToSteps,
          }}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: h1 },
        ]}
      />

      <PageHero
        h1={h1}
        lead={page?.description ?? "Platform-specific fancy text tools."}
      />

      <div className="tool-stage" id="tool">
        {config.toolType === "discord-color" ? (
          <DiscordColorTool initialText={config.initialText} />
        ) : config.toolType === "html-rich" ? (
          <HtmlRichTool initialText={config.initialText} />
        ) : config.toolType === "bio-builder" ? (
          <BioBuilder initialText={config.initialText} />
        ) : (
          <StyleGallery
            initialText={config.initialText}
            styleIds={config.styleIds}
            presets={config.presets}
            inputLabel={`Preview ${h1.toLowerCase()}`}
          />
        )}
      </div>

      {config.fields?.length ? (
        <section className="seo-section" aria-labelledby="fields-heading">
          <h2 id="fields-heading">Which {h1.split(" ")[0]} fields accept fancy fonts</h2>
          <p className="seo-lead">
            Styled text is Unicode characters, not a font setting, so whether it
            works depends entirely on which characters the field allows. Handles
            are the ones that never accept it.
          </p>
          <div className="codes-table-wrap">
            <table className="codes-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Fancy fonts</th>
                  <th>Limit</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {config.fields.map((field) => (
                  <tr key={field.name}>
                    <td>{field.name}</td>
                    <td>
                      <span
                        className="gallery-support"
                        data-field-unicode={field.unicode}
                      >
                        {FIELD_UNICODE_LABELS[field.unicode]}
                      </span>
                    </td>
                    <td>{field.limit ? `${field.limit} chars` : "Varies"}</td>
                    <td>{field.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {config.colorCodes ? (
        <section className="seo-section" aria-labelledby="codes-heading">
          <h2 id="codes-heading">Discord color codes (ANSI)</h2>
          <div className="codes-table-wrap">
            <table className="codes-table">
              <thead>
                <tr>
                  <th>Color</th>
                  <th>ANSI code</th>
                </tr>
              </thead>
              <tbody>
                {DISCORD_COLOR_CODES.map((row) => (
                  <tr key={row.code}>
                    <td>{row.name}</td>
                    <td>
                      <code>{row.code}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">{config.howToHeading ?? "How to use"}</h2>
        <ol>
          {config.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where to use this</h2>
        <ul>
          {config.uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </section>

      {page ? (
        <FellowKeywords keywords={page.fellowKeywords} currentUrl={url} />
      ) : null}

      <BackToTool />
      <FaqSection items={config.faq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
