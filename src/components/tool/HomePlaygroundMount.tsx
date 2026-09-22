"use client";

import { useEffect, useState, type ReactNode } from "react";
import { StyleGalleryFallback } from "@/components/tool/StyleGalleryFallback";
import { ToolStagePlaceholder } from "@/components/tool/ToolStagePlaceholder";

type HomePlaygroundMountProps = {
  children: ReactNode;
};

/**
 * Defers mounting the heavy tool chunk until after first paint / idle time
 * so PageSpeed LCP stays on the server-rendered hero.
 */
export function HomePlaygroundMount({ children }: HomePlaygroundMountProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(mount, { timeout: 1800 });
      return () => cancelIdleCallback(id);
    }
    const timer = window.setTimeout(mount, 1);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <>
        <ToolStagePlaceholder />
        <section
          className="seo-section seo-section--below-fold"
          aria-labelledby="gallery-heading"
        >
          <h2 id="gallery-heading">Popular Unicode styles</h2>
          <StyleGalleryFallback />
        </section>
      </>
    );
  }

  return <>{children}</>;
}
