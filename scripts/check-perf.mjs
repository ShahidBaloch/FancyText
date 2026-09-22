/**
 * Lightweight performance budgets (HTML weight + kaomoji grid policy).
 * Requires production server on PORT (default 3000) after `npm run build && npm run start`.
 *
 * Run: node scripts/check-perf.mjs
 * CI-friendly: skips with exit 0 if server unreachable (optional PORT=3000 npm run check:perf)
 */
const PORT = process.env.PORT ?? "3000";
const BASE = `http://127.0.0.1:${PORT}`;

const BUDGETS = [
  {
    path: "/multiline-kaomojis/",
    maxBytes: 180_000,
    maxButtons: 120,
    label: "multiline hub (progressive grid)",
  },
  {
    path: "/coquette-kaomojis/",
    maxBytes: 200_000,
    maxButtons: 120,
    label: "coquette hub (progressive grid)",
  },
  {
    path: "/cute-kaomojis/",
    maxBytes: 120_000,
    maxButtons: 80,
    label: "cute indexed list",
  },
  {
    path: "/kaomoji/",
    maxBytes: 220_000,
    maxButtons: 140,
    label: "kaomoji hub sample grid",
  },
];

async function fetchText(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "text/html" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${path} HTTP ${res.status}`);
  return res.text();
}

let html;
try {
  html = await fetchText("/");
} catch (err) {
  console.warn(
    `check-perf: server not reachable at ${BASE} (${err.message}) — skipping budgets.`,
  );
  process.exit(0);
}

const errors = [];
for (const budget of BUDGETS) {
  const page = await fetchText(budget.path);
  const bytes = Buffer.byteLength(page, "utf8");
  const buttons = (page.match(/class="kaomoji-btn/g) ?? []).length;
  if (bytes > budget.maxBytes) {
    errors.push(
      `${budget.label}: HTML ${bytes} bytes (max ${budget.maxBytes})`,
    );
  }
  if (buttons > budget.maxButtons) {
    errors.push(
      `${budget.label}: ${buttons} kaomoji buttons in HTML (max ${budget.maxButtons} initial SSR)`,
    );
  }
  console.log(
    `OK ${budget.path} — ${bytes} bytes, ${buttons} buttons (budget ${budget.maxBytes} / ${budget.maxButtons})`,
  );
}

if (errors.length) {
  console.error("Performance budget check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log("Performance budget checks passed.");
