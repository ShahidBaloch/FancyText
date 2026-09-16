export type AsciiFontId = "blocky" | "banner" | "outline";

export type AsciiFont = {
  id: AsciiFontId;
  label: string;
  blurb: string;
  height: number;
  glyphs: Record<string, string[]>;
};

/** Short titles only — banners get wide fast. */
export const MAX_BIG_TEXT_CHARS = 40;

const UNKNOWN = "?";
const GLYPH_GAP = " ";

export function defineFont(
  meta: Omit<AsciiFont, "glyphs">,
  raw: Record<string, string[]>,
): AsciiFont {
  const glyphs: Record<string, string[]> = {};
  for (const [key, rows] of Object.entries(raw)) {
    if (rows.length !== meta.height) {
      throw new Error(
        `ASCII font ${meta.id}: glyph "${key}" has ${rows.length} rows, expected ${meta.height}`,
      );
    }
    const width = Math.max(...rows.map((row) => row.length));
    glyphs[key] = rows.map((row) => row.padEnd(width, " "));
  }
  if (!glyphs[" "] || !glyphs[UNKNOWN]) {
    throw new Error(`ASCII font ${meta.id} needs space and "?" glyphs`);
  }
  return { ...meta, glyphs };
}

function clipInput(text: string): { text: string; truncated: boolean } {
  let count = 0;
  let out = "";
  for (const ch of text) {
    if (ch === "\r") continue;
    if (ch === "\n") {
      out += "\n";
      continue;
    }
    if (count >= MAX_BIG_TEXT_CHARS) {
      return { text: out, truncated: true };
    }
    out += ch;
    count += 1;
  }
  return { text: out, truncated: false };
}

function glyphFor(font: AsciiFont, ch: string): string[] {
  const upper = ch.toUpperCase();
  return font.glyphs[upper] ?? font.glyphs[UNKNOWN]!;
}

function renderLine(line: string, font: AsciiFont): string[] {
  const chars = line.length ? [...line] : [" "];
  const pieces = chars.map((ch) => glyphFor(font, ch));
  const rows: string[] = [];
  for (let y = 0; y < font.height; y += 1) {
    rows.push(pieces.map((glyph) => glyph[y]!).join(GLYPH_GAP));
  }
  return rows.map((row) => row.trimEnd());
}

export type BigTextRender = {
  art: string;
  truncated: boolean;
  columns: number;
  rows: number;
  characters: number;
};

export function renderBigText(input: string, font: AsciiFont): BigTextRender {
  const { text, truncated } = clipInput(input);
  const source = text.trim() ? text : "";
  if (!source.trim()) {
    return { art: "", truncated, columns: 0, rows: 0, characters: 0 };
  }

  const blocks = source
    .split("\n")
    .map((line) => renderLine(line, font));
  const art = blocks
    .map((block) => block.join("\n"))
    .join("\n\n");
  const columns = art
    .split("\n")
    .reduce((max, row) => Math.max(max, row.length), 0);

  return {
    art,
    truncated,
    columns,
    rows: art.split("\n").length,
    characters: art.length,
  };
}

export function wrapAsCodeBlock(art: string): string {
  return "```\n" + art + "\n```";
}
