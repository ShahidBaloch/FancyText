import {
  descriptionWithSerpSpecimen,
  fitMetaDescription,
} from "@/lib/seo/specimens";

/** Plain `<meta name="description">` — no decorative Unicode prefix (Google snippet). */
export function metaDescriptionPlain(description: string): string {
  return fitMetaDescription(description);
}

/** Open Graph / Twitter — may include specimen faces for share previews. */
export function socialDescriptionForPath(path: string, description: string): string {
  return descriptionWithSerpSpecimen(path, description);
}
