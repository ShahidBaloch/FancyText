import { getLivePages, type PageEntry } from "@/data/pages/registry";
import { kaomojiPathIsIndexable } from "@/data/kaomoji-index";

/**
 * Semantic query families — broader than exact primaryKeyword.
 * Pages in the same family compete in Search; at most one indexable URL
 * should be `owner`, others must be `supporting` (or noindex).
 */
const PRIMARY_KEYWORD_CLUSTER: Record<string, string> = {
  "fancy text generator": "fancy-text-core",
  "stylish text generator": "fancy-text-core",
  "cool text generator": "fancy-text-core",
  "copy and paste fonts": "copy-paste-fonts",
  "aesthetic fonts": "aesthetic-fonts",
  "cute fonts copy and paste": "cute-fonts",
  "name fonts": "name-fonts",
  "small text generator": "small-text",
  "big text generator": "big-text",
  "discord font generator": "discord-fonts",
  "tiktok font generator": "tiktok-fonts",
  "instagram font generator": "instagram-fonts",
  "facebook font generator": "facebook-fonts",
  "snapchat font generator": "snapchat-fonts",
  "twitter font generator": "twitter-fonts",
  "roblox font generator": "roblox-fonts",
  "whatsapp fonts": "whatsapp-fonts",
  "kamoji": "kaomoji-hub",
  "kaomojis": "kaomoji-hub",
  "kaomoji": "kaomoji-hub",
};

export type IntentClusterRole = "owner" | "supporting";

export function resolveIntentCluster(page: PageEntry): string {
  if (page.intentCluster?.trim()) {
    return page.intentCluster.trim().toLowerCase();
  }
  const kw = page.primaryKeyword.trim().toLowerCase();
  return PRIMARY_KEYWORD_CLUSTER[kw] ?? `kw:${kw}`;
}

function isIndexableRegistryPage(page: PageEntry): boolean {
  if (page.index === false) return false;
  return kaomojiPathIsIndexable(page.url);
}

/** Canonical indexable URL for a query family (intentClusterRole === owner). */
export function getIntentClusterOwner(
  cluster: string,
): PageEntry | undefined {
  const id = cluster.trim().toLowerCase();
  return getLivePages().find(
    (page) =>
      isIndexableRegistryPage(page) &&
      page.intentClusterRole === "owner" &&
      resolveIntentCluster(page) === id,
  );
}

/** Supporting pages should point users (and internal equity) at the cluster owner. */
export function getIntentOwnerCallout(
  page: PageEntry,
): { owner: PageEntry; cluster: string } | null {
  if (page.intentClusterRole !== "supporting") return null;
  const cluster = resolveIntentCluster(page);
  const owner = getIntentClusterOwner(cluster);
  if (!owner || owner.url === page.url) return null;
  return { owner, cluster };
}
