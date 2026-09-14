import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage(opts: {
  title: string;
  subtitle?: string;
}) {
  const subtitle =
    opts.subtitle ??
    "Cool Unicode fonts to copy and paste for Instagram, Discord, TikTok & more";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background:
            "linear-gradient(145deg, #eef3f1 0%, #cfe8df 45%, #d5e4f2 100%)",
          color: "#14201c",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#14201c",
              color: "#f8f2e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            ℱ
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>
            FancifyText
          </div>
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {opts.title}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            color: "#4d5c57",
            maxWidth: 860,
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

export function titleFromRegistryTitle(title: string): string {
  return title.replace(/\s*\|\s*FancifyText\s*$/i, "").trim();
}
