import {
  kaomojiHubCanonicalPath,
  kaomojiPathIsIndexable,
} from "@/data/kaomoji-index";
import {
  getFooterPages,
  getLivePages,
  getNavPages,
} from "@/data/pages/registry";
import { resolveIntentCluster } from "@/lib/seo/intent-clusters";

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

  const byIntentCluster = new Map<
    string,
    { url: string; role?: "owner" | "supporting" }[]
  >();
  for (const page of getLivePages()) {
    if (!isIndexablePage(page.url, page.index)) continue;
    const cluster = resolveIntentCluster(page);
    const list = byIntentCluster.get(cluster) ?? [];
    list.push({ url: page.url, role: page.intentClusterRole });
    byIntentCluster.set(cluster, list);
  }

  for (const [cluster, entries] of byIntentCluster) {
    if (entries.length <= 1) continue;
    const owners = entries.filter((e) => e.role === "owner");
    const supporting = entries.filter((e) => e.role === "supporting");
    const undocumented = entries.filter((e) => !e.role);
    if (
      owners.length === 1 &&
      supporting.length === entries.length - 1 &&
      undocumented.length === 0
    ) {
      continue;
    }
    const urls = entries.map((e) => e.url).join(", ");
    throw new Error(
      `Intent cluster "${cluster}" has ${entries.length} indexable URLs (${urls}). Assign exactly one intentClusterRole: "owner" and the rest "supporting", or split clusters / noindex overlaps.`,
    );
  }

  for (const page of [...getFooterPages(), ...getNavPages()]) {
    if (page.intentClusterRole === "supporting") {
      throw new Error(
        `Intent supporting page ${page.url} is linked sitewide (nav/footer). Use contextual links only so the cluster owner keeps Page-1 equity.`,
      );
    }
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
