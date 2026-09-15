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
            "linear-gradient(160deg, #ffffff 0%, #fff4ed 48%, #ff5e1f 160%)",
          color: "#262626",
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
              background: "#ff5e1f",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            F
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
            color: "#5c5c5c",
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
