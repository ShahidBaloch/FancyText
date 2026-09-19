import {
  getPageByUrl,
  SITE_NAME,
  SITE_URL,
  type PageEntry,
  type PageGroup,
} from "@/data/pages/registry";
import { getSitemapEntries } from "@/lib/seo/sitemap-xml";

type LlmsLine = { path: string; label: string; sort: string };

const LEGAL_LABELS: Record<string, string> = {
  "/privacy/": "Privacy policy",
  "/terms/": "Terms of use",
};

const SECTIONS: { heading: string; groups: PageGroup[]; extraPaths?: string[] }[] = [
  {
    heading: "Primary tools",
    groups: ["A_Hub", "C_CopyPaste", "B_Cursive", "D_Bold", "D_Style_Other"],
  },
  {
    heading: "Collections & name fonts",
    groups: ["G_Aesthetic_Cute", "G_Name"],
  },
  {
    heading: "Platform & LinkedIn tools",
    groups: ["E_Platform"],
  },
  {
    heading: "Kaomoji & emoticons",
    groups: ["F_Kaomoji"],
  },
  {
    heading: "Guides",
    groups: ["I_Guides"],
  },
  {
    heading: "Trust & search",
    groups: ["H_Trust"],
    extraPaths: ["/search/"],
  },
];

function lineLabel(page: PageEntry | undefined, path: string): string {
  if (!page) return LEGAL_LABELS[path] ?? path;
  const name = page.navLabel ?? page.primaryKeyword;
  const short = page.description.split(/[.!?\u2014—]/)[0]?.trim();
  if (short && short.length <= 120) {
    return `${name} — ${short}`;
  }
  return name;
}

function collectLines(paths: Set<string>): LlmsLine[] {
  const lines: LlmsLine[] = [];
  for (const path of paths) {
    const page = getPageByUrl(path);
    lines.push({
      path,
      label: lineLabel(page, path),
      sort: path,
    });
  }
  lines.sort((a, b) => a.sort.localeCompare(b.sort));
  return lines;
}

/** All indexable URLs from the sitemap, keyed by pathname (with trailing slash). */
export function getLlmsPaths(): string[] {
  return getSitemapEntries().map((e) => new URL(e.url).pathname);
}

export function renderLlmsTxt(): string {
  const paths = new Set(getLlmsPaths());
  const used = new Set<string>();
  const chunks: string[] = [
    `# ${SITE_NAME}`,
    "",
    "> Free Unicode fancy text generators for bios, nicknames, and captions.",
    "",
    `Site: ${SITE_URL.replace(/\/$/, "")}/`,
    "Contact: hello@fancifytext.com",
    "",
    "## What this site does",
    "",
    `${SITE_NAME} converts normal letters into Unicode look-alike “fonts” (bold, cursive, bubble, aesthetic, and more) that users copy and paste into Instagram, Discord, TikTok, WhatsApp, LinkedIn, and similar apps. It does **not** install TTF/OTF font files.`,
    "",
  ];

  for (const section of SECTIONS) {
    const sectionPaths = new Set<string>();
    for (const path of paths) {
      if (used.has(path)) continue;
      const page = getPageByUrl(path);
      if (page && section.groups.includes(page.group)) {
        sectionPaths.add(path);
      }
    }
    for (const extra of section.extraPaths ?? []) {
      if (paths.has(extra) && !used.has(extra)) sectionPaths.add(extra);
    }
    if (sectionPaths.size === 0) continue;

    chunks.push(`## ${section.heading}`, "");
    for (const line of collectLines(sectionPaths)) {
      chunks.push(`- ${line.path} — ${line.label}`);
      used.add(line.path);
    }
    chunks.push("");
  }

  const legal = ["/privacy/", "/terms/"].filter((p) => paths.has(p) && !used.has(p));
  if (legal.length) {
    chunks.push("## Policies", "");
    for (const line of collectLines(new Set(legal))) {
      chunks.push(`- ${line.path} — ${line.label}`);
      used.add(line.path);
    }
    chunks.push("");
  }

  for (const path of [...paths].sort()) {
    if (!used.has(path)) {
      chunks.push(`- ${path} — ${lineLabel(getPageByUrl(path), path)}`);
    }
  }

  return chunks.join("\n").trimEnd() + "\n";
}

export function assertLlmsInvariants(body: string, expectedPaths: string[]): void {
  const listed = [...body.matchAll(/^- (\S+)/gm)].map((m) => m[1]);
  if (listed.length !== expectedPaths.length) {
    throw new Error(
      `llms.txt lists ${listed.length} URLs but sitemap has ${expectedPaths.length}`,
    );
  }
  const expected = new Set(expectedPaths);
  for (const path of listed) {
    if (!expected.has(path)) {
      throw new Error(`llms.txt contains URL not in sitemap: ${path}`);
    }
  }
}
