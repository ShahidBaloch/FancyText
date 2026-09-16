"use client";

import Link from "next/link";
import { useState } from "react";
import { StyleGallery } from "@/components/tool/StyleGallery";
import { TextTool } from "@/components/tool/TextTool";

const INITIAL_TEXT = "fancy text";

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
];

/** Owns the shared draft text so the focused preview and the full gallery stay in sync. */
export function HomePlayground() {
  const [text, setText] = useState(INITIAL_TEXT);

  return (
    <>
      <div className="tool-stage" id="tool">
        {/* AdSense: never insert units between this textarea and the first Copy. */}
        <TextTool
          styleIds={HOME_STYLE_IDS}
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
        />
      </div>

      <section className="seo-section" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">All Unicode styles in one gallery</h2>
        <p className="seo-lead">
          Preview every FancifyText style as a live word converter. Search by
          name or star a style to pin it at the top — favorites stay in this
          browser. For Cherokee, Japanese, fat, and other lookalikes, use the{" "}
          <Link href="/cool-text-generator/">cool text generator</Link>
          — that page owns “cool text” education. Browse{" "}
          <Link href="/copy-paste-fonts/">copy and paste font collections</Link>
          {" "}when you want a catalog instead of this converter, or open{" "}
          <Link href="/aesthetic-fonts/">aesthetic</Link>,{" "}
          <Link href="/cute-fonts/">cute</Link>, or{" "}
          <Link href="/cursive-text-generator/">cursive</Link> for a filtered set.
        </p>
        <StyleGallery
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
          showInput={false}
          enableFavorites
          enableCategoryFilter
          enableSearch
          presets={["fancy text", "discord bio", "username", "aesthetic"]}
        />
      </section>
    </>
  );
}
