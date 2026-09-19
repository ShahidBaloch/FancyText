import { transform } from "@/lib/fonts/styles";

/**
 * Markdown to LinkedIn-ready plain text.
 *
 * This exists because of one very specific, very common workflow: someone asks
 * an AI assistant to draft a post, gets Markdown back, pastes it into LinkedIn,
 * and watches every `**` and `##` appear literally in the feed. LinkedIn's
 * composer has no rich text and no Markdown, so the only thing that survives is
 * characters — which is exactly what the Unicode style maps produce.
 *
 * The conversion is lossy in ways worth naming rather than hiding, so every pass
 * that throws information away records a warning the UI can show.
 */

export type MarkdownMode = "convert" | "strip";
export type HeadingTreatment = "bold" | "bold-caps" | "plain";
export type LinkTreatment = "inline" | "text-only";

export type MarkdownOptions = {
  /** `convert` swaps Markdown for Unicode styling; `strip` just removes syntax. */
  mode?: MarkdownMode;
  boldStyleId?: string;
  italicStyleId?: string;
  boldItalicStyleId?: string;
  monoStyleId?: string;
  heading?: HeadingTreatment;
  bullet?: string;
  subBullet?: string;
  linkTreatment?: LinkTreatment;
  /** Convert `~~text~~` using combining strikethrough marks. */
  allowStrikethrough?: boolean;
  /** Replace `---` rules with a visible divider instead of dropping them. */
  dividerLine?: string;
};

export type MarkdownWarning = {
  label: string;
  detail: string;
};

export type MarkdownResult = {
  text: string;
  warnings: MarkdownWarning[];
  /** Counts used to decide which warnings are worth showing. */
  stats: {
    headings: number;
    bullets: number;
    numbered: number;
    tables: number;
    codeBlocks: number;
    links: number;
    inlineStyles: number;
  };
};

type Ctx = Required<
  Pick<
    MarkdownOptions,
    | "mode"
    | "boldStyleId"
    | "italicStyleId"
    | "boldItalicStyleId"
    | "monoStyleId"
    | "heading"
    | "bullet"
    | "subBullet"
    | "linkTreatment"
    | "allowStrikethrough"
    | "dividerLine"
  >
> & { stats: MarkdownResult["stats"] };

const TABLE_CELL_SEPARATOR = " · ";

/**
 * Inline syntax, longest delimiter first so `***x***` is not eaten by `**x**`.
 *
 * The `_` forms are deliberately fenced with boundary assertions: without them
 * `snake_case_names` and `__init__` get mangled, which is a very visible way to
 * lose someone's trust on the first paste.
 */
const INLINE_PATTERN = new RegExp(
  [
    "(?<codeTicks>`+)(?<code>[^`]+?)\\k<codeTicks>",
    "\\[(?<linkText>[^\\]]*)\\]\\((?<linkUrl>[^)\\s]+)(?:\\s+\"[^\"]*\")?\\)",
    "(?<!\\*)\\*\\*\\*(?<bi>[^*]+?)\\*\\*\\*(?!\\*)",
    "(?<!\\*)\\*\\*(?<b>[^*]+?)\\*\\*(?!\\*)",
    "(?<!\\*)\\*(?<i>[^*\\s][^*]*?)\\*(?!\\*)",
    "(?<!\\w)___(?<bi2>[^_]+?)___(?!\\w)",
    "(?<!\\w)__(?<b2>[^_]+?)__(?!\\w)",
    "(?<!\\w)_(?<i2>[^_\\s][^_]*?)_(?!\\w)",
    "~~(?<s>[^~]+?)~~",
  ].join("|"),
  "gu",
);

function styled(ctx: Ctx, text: string, styleId: string): string {
  if (ctx.mode === "strip") return text;
  ctx.stats.inlineStyles += 1;
  return transform(text, styleId);
}

/** Apply inline Markdown, recursing one level so `**bold with _italic_**` works. */
function renderInline(ctx: Ctx, input: string, depth = 0): string {
  // A fresh matcher per call: `renderInline` recurses, and a shared global
  // regex would have its `lastIndex` reset by the inner call and loop forever.
  const pattern = new RegExp(INLINE_PATTERN.source, INLINE_PATTERN.flags);
  let out = "";
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    const g = match.groups!;
    out += unescapeMarkdown(input.slice(last, match.index));
    last = match.index + match[0].length;

    const inner = (value: string) =>
      depth < 2 ? renderInline(ctx, value, depth + 1) : unescapeMarkdown(value);

    if (g.code !== undefined) {
      out += styled(ctx, g.code, ctx.monoStyleId);
    } else if (g.linkText !== undefined) {
      ctx.stats.links += 1;
      const label = inner(g.linkText).trim();
      const url = g.linkUrl!;
      if (ctx.linkTreatment === "text-only" || !label) {
        out += label || url;
      } else if (label === url) {
        out += url;
      } else {
        out += `${label} (${url})`;
      }
    } else if (g.bi !== undefined || g.bi2 !== undefined) {
      out += styled(ctx, inner(g.bi ?? g.bi2!), ctx.boldItalicStyleId);
    } else if (g.b !== undefined || g.b2 !== undefined) {
      out += styled(ctx, inner(g.b ?? g.b2!), ctx.boldStyleId);
    } else if (g.i !== undefined || g.i2 !== undefined) {
      out += styled(ctx, inner(g.i ?? g.i2!), ctx.italicStyleId);
    } else if (g.s !== undefined) {
      const text = inner(g.s);
      out += ctx.allowStrikethrough && ctx.mode === "convert"
        ? styled(ctx, text, "strikethrough")
        : text;
    }
  }

  out += unescapeMarkdown(input.slice(last));
  return out;
}

/** Drop the backslashes Markdown uses to escape its own punctuation. */
function unescapeMarkdown(value: string): string {
  return value.replace(/\\([\\`*_{}[\]()#+\-.!>~|])/g, "$1");
}

function renderHeading(ctx: Ctx, text: string): string {
  const rendered = renderInline(ctx, text);
  if (ctx.mode === "strip" || ctx.heading === "plain") return rendered;
  if (ctx.heading === "bold-caps") {
    return transform(rendered.toUpperCase(), ctx.boldStyleId);
  }
  return transform(rendered, ctx.boldStyleId);
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);
}

function isTableRow(line: string): boolean {
  return /^\s*\|.*\|\s*$/.test(line.trim());
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

/**
 * Convert Markdown into text LinkedIn will render as intended.
 *
 * Block structure is handled line by line — there is no need for a full parser
 * here, and a line-based pass keeps the user's own line breaks exactly where
 * they put them, which matters more on LinkedIn than correct nesting.
 */
export function markdownToLinkedIn(
  input: string,
  options: MarkdownOptions = {},
): MarkdownResult {
  const stats: MarkdownResult["stats"] = {
    headings: 0,
    bullets: 0,
    numbered: 0,
    tables: 0,
    codeBlocks: 0,
    links: 0,
    inlineStyles: 0,
  };

  const ctx: Ctx = {
    mode: options.mode ?? "convert",
    boldStyleId: options.boldStyleId ?? "sans-bold",
    italicStyleId: options.italicStyleId ?? "sans-italic",
    boldItalicStyleId: options.boldItalicStyleId ?? "sans-bold-italic",
    monoStyleId: options.monoStyleId ?? "monospace",
    heading: options.heading ?? "bold",
    bullet: options.bullet ?? "•",
    subBullet: options.subBullet ?? "◦",
    linkTreatment: options.linkTreatment ?? "inline",
    allowStrikethrough: options.allowStrikethrough ?? true,
    dividerLine: options.dividerLine ?? "• • •",
    stats,
  };

  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let inFence = false;
  let deepNesting = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    const fence = /^\s*(?:```|~~~)/.exec(line);
    if (fence) {
      if (!inFence) stats.codeBlocks += 1;
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      // Inside a fence every line is literal, so style it whole and keep it.
      out.push(
        ctx.mode === "convert" && line.trim()
          ? transform(line, ctx.monoStyleId)
          : line,
      );
      continue;
    }

    if (!line.trim()) {
      out.push("");
      continue;
    }

    // Tables: consume the whole block so the separator row never leaks through.
    if (isTableRow(line) && isTableSeparator(lines[i + 1] ?? "")) {
      stats.tables += 1;
      const header = splitTableRow(line);
      out.push(renderHeading(ctx, header.join(TABLE_CELL_SEPARATOR)));
      i += 1;
      while (i + 1 < lines.length && isTableRow(lines[i + 1]!)) {
        i += 1;
        out.push(
          renderInline(ctx, splitTableRow(lines[i]!).join(TABLE_CELL_SEPARATOR)),
        );
      }
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      stats.headings += 1;
      out.push(renderHeading(ctx, heading[2]!.replace(/\s+#+\s*$/, "")));
      continue;
    }

    if (/^\s*(?:[-*_]\s*){3,}$/.test(line)) {
      out.push(ctx.mode === "convert" ? ctx.dividerLine : "");
      continue;
    }

    const quote = /^\s*>\s?(.*)$/.exec(line);
    if (quote) {
      out.push(`“${renderInline(ctx, quote[1]!)}”`);
      continue;
    }

    const task = /^(\s*)[-*+]\s+\[([ xX])\]\s+(.*)$/.exec(line);
    if (task) {
      stats.bullets += 1;
      const mark = task[2]!.toLowerCase() === "x" ? "☑" : "☐";
      out.push(`${indentFor(task[1]!)}${mark} ${renderInline(ctx, task[3]!)}`);
      continue;
    }

    const bullet = /^(\s*)[-*+]\s+(.*)$/.exec(line);
    if (bullet) {
      stats.bullets += 1;
      const level = levelFor(bullet[1]!);
      if (level > 1) deepNesting = true;
      const marker = level === 0 ? ctx.bullet : ctx.subBullet;
      out.push(`${indentFor(bullet[1]!)}${marker} ${renderInline(ctx, bullet[2]!)}`);
      continue;
    }

    const numbered = /^(\s*)(\d+)[.)]\s+(.*)$/.exec(line);
    if (numbered) {
      stats.numbered += 1;
      const level = levelFor(numbered[1]!);
      if (level > 1) deepNesting = true;
      out.push(
        `${indentFor(numbered[1]!)}${numbered[2]}. ${renderInline(ctx, numbered[3]!)}`,
      );
      continue;
    }

    out.push(renderInline(ctx, line));
  }

  const warnings: MarkdownWarning[] = [];

  if (stats.tables > 0) {
    warnings.push({
      label: `${stats.tables} table${stats.tables > 1 ? "s" : ""} flattened`,
      detail:
        "LinkedIn has no tables. Each row is now one line with cells separated by a middle dot. Anything wider than three columns is usually better as a screenshot or a carousel.",
    });
  }
  if (stats.codeBlocks > 0 && ctx.mode === "convert") {
    warnings.push({
      label: `${stats.codeBlocks} code block${stats.codeBlocks > 1 ? "s" : ""} converted to monospace`,
      detail:
        "These are monospace Unicode letters, not a real code block. They keep the shape but lose syntax highlighting, and they are not searchable or copy-pasteable as working code.",
    });
  }
  if (stats.headings > 0 && ctx.heading !== "plain" && ctx.mode === "convert") {
    warnings.push({
      label: `${stats.headings} heading${stats.headings > 1 ? "s" : ""} became bold lines`,
      detail:
        "LinkedIn has no heading levels, so an H2 and an H4 both come out as one bold line. If the structure mattered, use blank lines and shorter sections instead of nesting.",
    });
  }
  if (stats.links > 0) {
    warnings.push({
      label: `${stats.links} link${stats.links > 1 ? "s" : ""} rewritten`,
      detail:
        "Markdown link syntax does not work on LinkedIn, so the URL now sits in the text. LinkedIn auto-links bare URLs, but a link in the body can suppress reach — many creators put it in the first comment instead.",
    });
  }
  if (deepNesting) {
    warnings.push({
      label: "Nested lists flattened",
      detail:
        "LinkedIn does not indent reliably across desktop and mobile, so anything deeper than one sub-level was brought up to the second level.",
    });
  }

  return { text: out.join("\n"), warnings, stats };
}

/** Two spaces per Markdown level, capped so mobile does not wrap oddly. */
function levelFor(indent: string): number {
  return Math.floor(indent.replace(/\t/g, "  ").length / 2);
}

function indentFor(indent: string): string {
  return levelFor(indent) > 0 ? "   " : "";
}

/** Rough check for "did this come out of an AI chat window as Markdown?" */
export function looksLikeMarkdown(input: string): boolean {
  return (
    /(^|\n)\s{0,3}#{1,6}\s/.test(input) ||
    /\*\*[^*\n]+\*\*/.test(input) ||
    /(^|\n)\s*[-*+]\s+\S/.test(input) ||
    /(^|\n)\s*\d+[.)]\s+\S/.test(input) ||
    /(^|\n)\s*\|.*\|\s*(\n|$)/.test(input) ||
    /```/.test(input)
  );
}
