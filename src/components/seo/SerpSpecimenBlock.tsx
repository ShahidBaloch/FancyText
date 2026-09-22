import {
  COPY_PASTE_FONT_SHOWCASE,
  HOME_FONT_SHOWCASE,
  buildFontRotateShowcase,
  getSerpSpecimen,
  normalizeSpecimenPath,
  type SerpSpecimenConfig,
} from "@/lib/seo/specimens";
import { SerpSpecimenFontRotate } from "@/components/seo/SerpSpecimenFontRotate";

type SerpSpecimenBlockProps = {
  path: string;
  /** Home hero uses dark panel styling. */
  variant?: "home" | "inline";
};

function fontShowcaseForPath(path: string, config: SerpSpecimenConfig) {
  if (path === "/") return HOME_FONT_SHOWCASE;
  if (path === "/copy-paste-fonts/") return COPY_PASTE_FONT_SHOWCASE;
  if (config.phrase && config.styleIds?.length) {
    return buildFontRotateShowcase(config.phrase, config.styleIds);
  }
  return [];
}

export function SerpSpecimenBlock({
  path,
  variant = "inline",
}: SerpSpecimenBlockProps) {
  const normalized = normalizeSpecimenPath(path);
  const config = getSerpSpecimen(normalized);
  if (!config) return null;

  if (config.kind === "font-rotate") {
    const showcase = fontShowcaseForPath(normalized, config);
    return (
      <SerpSpecimenFontRotate showcase={showcase} variant={variant} />
    );
  }

  if (!config.glyphs?.length) return null;

  return (
    <div
      className="serp-specimen serp-specimen--strip"
      aria-hidden="true"
    >
      {config.stripLabel ? (
        <p className="serp-specimen-label">{config.stripLabel}</p>
      ) : null}
      <p className="serp-specimen-glyphs">{config.glyphs.join(" ")}</p>
    </div>
  );
}
