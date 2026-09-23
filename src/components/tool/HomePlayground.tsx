"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
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

/** Fast first paint in the hero + gallery; full set loads after idle. */
const HOME_PRIORITY_STYLE_IDS = [
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

function useExpandHomeGallery(): boolean {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const expand = () => setExpanded(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(expand, { timeout: 2800 });
      return () => cancelIdleCallback(id);
    }
    const timer = window.setTimeout(expand, 600);
    return () => window.clearTimeout(timer);
  }, []);

  return expanded;
}

/** Owns the shared draft text so the focused preview and the gallery stay in sync. */
export function HomePlayground() {
  const [text, setText] = useState(INITIAL_TEXT);
  const showAllStyles = useExpandHomeGallery();
  const galleryStyleIds = showAllStyles
    ? undefined
    : ([...HOME_PRIORITY_STYLE_IDS] as string[]);

  return (
    <>
      <div className="tool-stage" id="tool">
        {/* AdSense: never insert units between this textarea and the first Copy. */}
        <TextTool
          styleIds={[...HOME_PRIORITY_STYLE_IDS]}
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
        />
      </div>

      <section className="seo-section seo-section--below-fold" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">All Unicode styles</h2>
        <p className="seo-lead">
          {showAllStyles ? (
            <>
              Search, filter, star favorites, and copy from every Unicode
              lookalike. Prefer a curated catalog? Browse{" "}
              <Link href="/copy-paste-fonts/">copy and paste fonts</Link>.
            </>
          ) : (
            <>
              Twelve popular styles load first; the full grid follows in a moment.
              For filtered collections, open{" "}
              <Link href="/copy-paste-fonts/">copy and paste fonts</Link>.
            </>
          )}
        </p>
        <StyleGallery
          initialText={INITIAL_TEXT}
          text={text}
          onTextChange={setText}
          showInput={false}
          styleIds={galleryStyleIds}
          enableFavorites
          enableCategoryFilter
          enableSearch
          presets={["fancy text", "discord bio", "username", "aesthetic"]}
        />
      </section>
    </>
  );
}
