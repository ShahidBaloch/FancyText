import { KAOMOJI_UNIQUE_COPY } from "@/data/kaomoji-copy";
import {
  getKaomojiList,
  publicFaceCountClaim,
  type KaomojiList,
} from "@/data/kaomoji";
import { renderKaomojiAgentGuideForLlms } from "@/data/kaomoji-agent-guide";
import {
  CONTENT_UPDATED_AT,
  getPageByUrl,
  SITE_NAME,
  SITE_URL,
} from "@/data/pages/registry";
import { renderLlmsTxt } from "@/lib/seo/llms-txt";

const FULL_CATALOG_SLUGS = [
  "multiline-kaomojis",
  "coquette-kaomojis",
] as const;

const INDEXED_MOOD_SLUGS = [
  "cute-kaomojis",
  "cry-kaomojis",
  "heart-kaomojis",
  "hand-kaomojis",
  "kaomoji-dot-art",
  "carrd-kaomojis",
  "star-kaomojis",
] as const;

function sampleFaceLines(list: KaomojiList, limit = 6): string[] {
  const out: string[] = [];
  for (const face of list.faces) {
    if (out.length >= limit) break;
    if (face.includes("\n")) {
      const head =
        face
          .split("\n")
          .map((l) => l.trim())
          .find(Boolean) ?? "multiline block";
      out.push(`  - (multiline) ${head.slice(0, 72)}${head.length > 72 ? "…" : ""}`);
    } else {
      out.push(`  - ${face.slice(0, 80)}${face.length > 80 ? "…" : ""}`);
    }
  }
  return out;
}

function renderPageExcerpt(slug: string): string[] {
  const list = getKaomojiList(slug);
  if (!list) return [];
  const copy = KAOMOJI_UNIQUE_COPY[slug];
  const claim = publicFaceCountClaim(list.faces.length);
  const chunks: string[] = [
    `### ${list.h1} (\`${list.slug}\`)`,
    "",
    `URL: ${SITE_URL.replace(/\/$/, "")}/${slug}/`,
    `Records: ${list.faces.length} (${claim} public claim)`,
    "",
    `Description: ${list.description}`,
  ];
  if (copy?.canonicalLead) {
    chunks.push("", `Lead: ${copy.canonicalLead}`);
  }
  if (copy?.catalogNote) {
    chunks.push("", `Catalog scope: ${copy.catalogNote}`);
  }
  if (copy?.meanings) {
    chunks.push("", `When to use: ${copy.meanings.slice(0, 480)}${copy.meanings.length > 480 ? "…" : ""}`);
  }
  const faq = copy?.faq ?? list.faq ?? [];
  if (faq.length) {
    chunks.push("", "FAQ excerpts:");
    for (const item of faq.slice(0, 4)) {
      chunks.push(`  Q: ${item.question}`, `  A: ${item.answer.slice(0, 320)}${item.answer.length > 320 ? "…" : ""}`, "");
    }
  }
  chunks.push("Sample rows (not the full grid):");
  chunks.push(...sampleFaceLines(list, 6));
  chunks.push("");
  return chunks;
}

/** Long-form agent digest — extends llms.txt with cite-ready prose + samples. */
export function renderLlmsFullTxt(): string {
  const hub = getPageByUrl("/kaomoji/");
  const chunks: string[] = [
    `# ${SITE_NAME} — llms-full.txt`,
    "",
    "> Extended excerpts for answer engines and autonomous browsers. Compact URL index: /llms.txt",
    "",
    `Site: ${SITE_URL.replace(/\/$/, "")}/`,
    `Content updated: ${CONTENT_UPDATED_AT}`,
    "",
    "## Kaomoji routing (summary)",
    "",
    ...renderKaomojiAgentGuideForLlms(),
    "## Full catalog hubs",
    "",
  ];

  for (const slug of FULL_CATALOG_SLUGS) {
    chunks.push(...renderPageExcerpt(slug));
  }

  chunks.push("## Other indexed kaomoji spokes", "");
  for (const slug of INDEXED_MOOD_SLUGS) {
    chunks.push(...renderPageExcerpt(slug));
  }

  if (hub) {
    chunks.push(
      "### Kaomoji hub",
      "",
      `URL: ${SITE_URL.replace(/\/$/, "")}/kaomoji/`,
      `Description: ${hub.description}`,
      "",
      "Use the hub keyword filter (#hub-jump-heading) when intent is unclear.",
      "",
    );
  }

  chunks.push(
    "## Compact URL index (same as llms.txt)",
    "",
    "The block below duplicates /llms.txt for one-file offline ingestion.",
    "",
    renderLlmsTxt().trimEnd(),
    "",
  );

  return chunks.join("\n").trimEnd() + "\n";
}

export function assertLlmsFullInvariants(body: string): void {
  for (const slug of FULL_CATALOG_SLUGS) {
    if (!body.includes(`/${slug}/`)) {
      throw new Error(`llms-full.txt missing catalog hub /${slug}/`);
    }
  }
  if (!body.includes("FAQ excerpts:")) {
    throw new Error("llms-full.txt missing FAQ excerpts");
  }
  if (!body.includes("llms.txt")) {
    throw new Error("llms-full.txt should reference llms.txt");
  }
}
