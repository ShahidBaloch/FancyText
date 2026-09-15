"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { HomeHero } from "@/components/seo/HomeHero";
import { TextTool } from "@/components/tool/TextTool";

const StyleGallery = dynamic(
  () =>
    import("@/components/tool/StyleGallery").then((mod) => mod.StyleGallery),
  {
    loading: () => (
      <p className="seo-lead">Loading live style previews…</p>
    ),
  },
);

const INITIAL_TEXT = "fancy text";

const HOME_STYLE_IDS = [
  "cursive",
  "bold",
  "sans-bold",
  "italic",
  "bubble",
  "tiny",
  "small-caps",
  "fullwidth",
  "fraktur",
  "mirror",
];

export function HomePlayground() {
  const [text, setText] = useState(INITIAL_TEXT);

  return (
    <>
      <HomeHero text={text} />

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
          Preview every FancifyText style as a live word converter. Use this
          gallery when you want the full set; open a collection when you only
          want aesthetic, cute, or graphic looks.
        </p>
        <StyleGallery
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
          presets={["fancy text", "cool bio", "username", "aesthetic"]}
        />
      </section>
    </>
  );
}
