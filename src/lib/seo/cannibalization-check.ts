import {
  kaomojiHubCanonicalPath,
  kaomojiPathIsIndexable,
} from "@/data/kaomoji";
import { getLivePages } from "@/data/pages/registry";

function isIndexablePage(url: string, index?: boolean): boolean {
  if (index === false) return false;
  return kaomojiPathIsIndexable(url);
}

export function runCannibalizationCheck(): void {
  const byKeyword = new Map<string, string[]>();

  for (const page of getLivePages()) {
    if (!isIndexablePage(page.url, page.index)) continue;
    const kw = page.primaryKeyword.trim().toLowerCase();
    const list = byKeyword.get(kw) ?? [];
    list.push(page.url);
    byKeyword.set(kw, list);
  }

  for (const [kw, urls] of byKeyword) {
    if (urls.length <= 1) continue;
    throw new Error(
      `Duplicate indexable primaryKeyword "${kw}": ${urls.join(", ")}`,
    );
  }

  for (const slug of ["kamoji", "kaomojis"] as const) {
    const path = kaomojiHubCanonicalPath(slug);
    if (path !== "/kaomoji/") {
      throw new Error(
        `Misspelling hub /${slug}/ should canonical to /kaomoji/, got ${path}`,
      );
    }
  }
}
