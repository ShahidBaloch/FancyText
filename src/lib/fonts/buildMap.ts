/** Build A–Z / a–z / 0–9 maps from Mathematical Alphanumeric base code points. */
export function buildAlphaMap(opts: {
  upper?: number;
  lower?: number;
  digits?: number;
  exceptions?: Record<string, number>;
}): Record<string, string> {
  const map: Record<string, string> = {};
  if (opts.upper != null) {
    for (let i = 0; i < 26; i++) {
      map[String.fromCharCode(65 + i)] = String.fromCodePoint(opts.upper + i);
    }
  }
  if (opts.lower != null) {
    for (let i = 0; i < 26; i++) {
      map[String.fromCharCode(97 + i)] = String.fromCodePoint(opts.lower + i);
    }
  }
  if (opts.digits != null) {
    for (let i = 0; i < 10; i++) {
      map[String(i)] = String.fromCodePoint(opts.digits + i);
    }
  }
  if (opts.exceptions) {
    for (const [ch, cp] of Object.entries(opts.exceptions)) {
      map[ch] = String.fromCodePoint(cp);
    }
  }
  return map;
}

export function applyMap(text: string, map: Record<string, string>): string {
  let out = "";
  for (const ch of text) {
    out += map[ch] ?? ch;
  }
  return out;
}

export function applyCombining(text: string, mark: string): string {
  let out = "";
  for (const ch of text) {
    if (/\s/.test(ch)) out += ch;
    else out += ch + mark;
  }
  return out;
}
