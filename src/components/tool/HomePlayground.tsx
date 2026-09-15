"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
  const [showGallery, setShowGallery] = useState(false);
  const galleryRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowGallery(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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

      <section
        ref={galleryRef}
        className="seo-section"
        aria-labelledby="gallery-heading"
      >
        <h2 id="gallery-heading">All Unicode styles in one gallery</h2>
        <p className="seo-lead">
          Preview every FancifyText style as a live word converter. Use this
          gallery when you want the full set; open a collection when you only
          want aesthetic, cute, or graphic looks.
        </p>
        {showGallery ? (
          <StyleGallery
            initialText={INITIAL_TEXT}
            text={text}
            onTextChange={setText}
            showInput={false}
            enableFavorites
            enableCategoryFilter
            presets={["fancy text", "cool bio", "username", "aesthetic"]}
          />
        ) : (
          <p className="seo-lead">Scroll to load the full style gallery…</p>
        )}
      </section>
    </>
  );
}
