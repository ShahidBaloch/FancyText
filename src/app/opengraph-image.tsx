import { ImageResponse } from "next/og";

export const alt = "FancyText — fancy text generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(145deg, #eef3f1 0%, #cfe8df 45%, #d5e4f2 100%)",
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
            FancyText
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Fancy text generator
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#4d5c57",
            maxWidth: 820,
            lineHeight: 1.35,
          }}
        >
          Cool Unicode fonts to copy and paste for Instagram, Discord, TikTok &
          more
        </div>
      </div>
    ),
    { ...size },
  );
}
