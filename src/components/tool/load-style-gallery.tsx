import dynamic from "next/dynamic";
import { StyleGalleryFallback } from "@/components/tool/StyleGalleryFallback";

/** Code-split the full style engine — keeps content pages’ first load smaller. */
export const StyleGalleryLazy = dynamic(
  () =>
    import("@/components/tool/StyleGallery").then((m) => ({
      default: m.StyleGallery,
    })),
  { loading: () => <StyleGalleryFallback /> },
);
