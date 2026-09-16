"use client";

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
          browser. Open a collection when you only want aesthetic, cute, cool
          lookalike, or graphic looks.
        </p>
        <StyleGallery
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
          showInput={false}
          enableFavorites
          enableCategoryFilter
          enableSearch
          presets={["fancy text", "cool bio", "username", "aesthetic"]}
        />
      </section>
    </>
  );
}
