"use client";

import { SerpSpecimenFontRotate } from "@/components/seo/SerpSpecimenFontRotate";
import { HOME_FONT_SHOWCASE } from "@/lib/seo/specimens";

/** Decorative rotating preview only — does not control the main tool. */
export function HomeHeroSpecimen() {
  return (
    <SerpSpecimenFontRotate showcase={HOME_FONT_SHOWCASE} variant="home" />
  );
}
