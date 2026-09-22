"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { StyleGalleryFallback } from "@/components/tool/StyleGalleryFallback";
import { TextTool } from "@/components/tool/TextTool";

const StyleGallery = dynamic(
  () =>
    import("@/components/tool/StyleGallery").then((m) => ({
      default: m.StyleGallery,
    })),
  { loading: () => <StyleGalleryFallback /> },
);

const INITIAL_TEXT = "fancy text";

/** Curated set for fast first paint; full 67-style grid lives on copy-paste-fonts + collections. */
const HOME_STYLE_IDS = [
  "cursive",
  "bold",
  "sans-bold",
  "italic",
  "bubble",
  "japanese",
  "fat",
  "tiny",
  "small-caps",
  "fullwidth",
  "fraktur",
  "mirror",
] as const;

/** Owns the shared draft text so the focused preview and the gallery stay in sync. */
export function HomePlayground() {
  const [text, setText] = useState(INITIAL_TEXT);

  return (
    <>
      <div className="tool-stage" id="tool">
        {/* AdSense: never insert units between this textarea and the first Copy. */}
        <TextTool
          styleIds={[...HOME_STYLE_IDS]}
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
        />
      </div>

      <section className="seo-section seo-section--below-fold" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">Popular Unicode styles</h2>
        <p className="seo-lead">
          Twelve high-traffic styles below—search, filter, and star favorites on
          this device. For every lookalike (67+ styles), open{" "}
          <Link href="/copy-paste-fonts/">copy and paste fonts</Link> or the{" "}
          <Link href="/cool-text-generator/">cool text generator</Link>.
        </p>
        <StyleGallery
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
          showInput={false}
          styleIds={[...HOME_STYLE_IDS]}
          enableFavorites
          enableCategoryFilter
          enableSearch
          presets={["fancy text", "discord bio", "username", "aesthetic"]}
        />
      </section>
    </>
  );
}
