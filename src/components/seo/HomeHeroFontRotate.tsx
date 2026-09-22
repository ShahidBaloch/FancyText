"use client";

import { SerpSpecimenFontRotate } from "@/components/seo/SerpSpecimenFontRotate";
import type { FontRotateShowcaseItem } from "@/lib/seo/specimens";

type HomeHeroFontRotateProps = {
  showcase: FontRotateShowcaseItem[];
};

/** Decorative rotating preview — showcase is precomputed on the server (no styles.ts here). */
export function HomeHeroFontRotate({ showcase }: HomeHeroFontRotateProps) {
  return <SerpSpecimenFontRotate showcase={showcase} variant="home" />;
}
