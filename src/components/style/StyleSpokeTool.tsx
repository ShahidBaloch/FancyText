"use client";

import { useState } from "react";
import { DualStylePreview, TextTool } from "@/components/tool/TextTool";
import { StyleGallery } from "@/components/tool/StyleGallery";
import type { StyleSpokeConfig } from "@/data/style-spokes";

type StyleSpokeToolProps = {
  config: StyleSpokeConfig;
  placeholder: string;
};

/** One shared text state: hero tool + compact gallery (no second input). */
export function StyleSpokeTool({ config, placeholder }: StyleSpokeToolProps) {
  const [text, setText] = useState(config.sampleInput);
  const blurbs = Object.fromEntries(
    (config.variants ?? []).map((v) => [v.styleId, v.blurb]),
  );

  return (
    <>
      <div className="tool-stage" id="tool">
        {config.secondaryStyleId ? (
          <DualStylePreview
            primaryStyleId={config.styleId}
            secondaryStyleId={config.secondaryStyleId}
            primaryLabel="Superscript"
            secondaryLabel="Subscript"
            text={text}
            onTextChange={setText}
          />
        ) : (
          <TextTool
            defaultStyleId={config.styleId}
            styleIds={config.styleIds}
            text={text}
            onTextChange={setText}
            placeholder={placeholder}
          />
        )}
      </div>

      {config.showGallery ? (
        <section className="seo-section" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading">More looks to copy</h2>
          <p className="seo-lead">
            Same text as above — compare styles side by side and copy any row.
          </p>
          <StyleGallery
            text={text}
            showInput={false}
            styleIds={config.styleIds}
            blurbs={blurbs}
          />
        </section>
      ) : null}
    </>
  );
}
