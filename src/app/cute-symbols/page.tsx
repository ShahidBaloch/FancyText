import type { Metadata } from "next";
import { SymbolCatalogView } from "@/components/symbols/SymbolCatalogView";
import {
  CUTE_SYMBOLS_FAQ,
  CUTE_SYMBOLS_PROSE,
  CUTE_SYMBOL_CATEGORIES,
} from "@/data/cute-symbols";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/cute-symbols/")!;

export const metadata: Metadata = pageMetadata(page);

export default function CuteSymbolsPage() {
  return (
    <SymbolCatalogView
      page={page}
      h1="Cute symbols copy and paste"
      categories={CUTE_SYMBOL_CATEGORIES}
      faq={CUTE_SYMBOLS_FAQ}
      prose={CUTE_SYMBOLS_PROSE}
      crumbLabel="Cute symbols"
      howToSteps={[
        "Open a category (hearts, stars, flowers, dividers).",
        "Tap a symbol to copy it.",
        "Paste into a bio or chat—use cute fonts if you need whole words styled.",
      ]}
    />
  );
}
