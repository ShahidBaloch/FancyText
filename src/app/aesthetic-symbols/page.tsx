import type { Metadata } from "next";
import { SymbolCatalogView } from "@/components/symbols/SymbolCatalogView";
import {
  AESTHETIC_SYMBOLS_FAQ,
  AESTHETIC_SYMBOLS_PROSE,
  AESTHETIC_SYMBOL_CATEGORIES,
} from "@/data/aesthetic-symbols";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/aesthetic-symbols/")!;

export const metadata: Metadata = pageMetadata(page);

export default function AestheticSymbolsPage() {
  return (
    <SymbolCatalogView
      page={page}
      h1="Aesthetic symbols copy and paste"
      categories={AESTHETIC_SYMBOL_CATEGORIES}
      faq={AESTHETIC_SYMBOLS_FAQ}
      prose={AESTHETIC_SYMBOLS_PROSE}
      crumbLabel="Aesthetic symbols"
      howToSteps={[
        "Pick dividers, stars, or brackets for your bio layout.",
        "Tap a symbol to copy.",
        "Paste between plain-text lines—pair with aesthetic fonts for styled words.",
      ]}
    />
  );
}
