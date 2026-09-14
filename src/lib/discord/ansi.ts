/** Discord ANSI foreground colors (standard 30–37). */
export const DISCORD_COLORS = [
  { id: "red", label: "Red", code: "31", hex: "#f04747" },
  { id: "green", label: "Green", code: "32", hex: "#43b581" },
  { id: "yellow", label: "Yellow", code: "33", hex: "#faa61a" },
  { id: "blue", label: "Blue", code: "34", hex: "#5865f2" },
  { id: "magenta", label: "Magenta", code: "35", hex: "#eb459e" },
  { id: "cyan", label: "Cyan", code: "36", hex: "#00b0f4" },
  { id: "white", label: "Light gray", code: "37", hex: "#dcddde" },
] as const;

export type DiscordColorId = (typeof DISCORD_COLORS)[number]["id"];

export function discordAnsi(text: string, colorCode: string, bold = false): string {
  const prefix = bold ? `0;1;${colorCode}` : `0;${colorCode}`;
  return `\u001b[${prefix}m${text}\u001b[0m`;
}

/** Full Discord code block ready to paste. */
export function discordColorBlock(
  text: string,
  colorCode: string,
  bold = false,
): string {
  return "```ansi\n" + discordAnsi(text, colorCode, bold) + "\n```";
}

export const DISCORD_COLOR_CODES = [
  { name: "Red", code: "31" },
  { name: "Green", code: "32" },
  { name: "Yellow", code: "33" },
  { name: "Blue", code: "34" },
  { name: "Magenta", code: "35" },
  { name: "Cyan", code: "36" },
  { name: "Gray", code: "37" },
];
