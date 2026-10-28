import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Nexva Digital — Markanızı dijitalde büyütün";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Modül düzeyinde okunur: görsel build sırasında statik üretilir.
const font = await readFile(join(process.cwd(), "assets/fonts/BarlowCondensed-ExtraBoldItalic.ttf"));
// Resmi logo (değiştirilmeden, yalnızca boyutlandırılmış kopya)
const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "assets/nexva-logo-360.png"))).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 72,
          background:
            "radial-gradient(60% 70% at 0% 0%, rgba(179,22,43,.5), transparent 70%), radial-gradient(50% 60% at 100% 100%, rgba(229,49,27,.3), transparent 70%), #0A0A0B",
          color: "#F5F5F2",
          fontFamily: "Barlow",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={360} height={360} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 44, letterSpacing: 2 }}>NEXVA DIGITAL</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.92 }}>
            <div style={{ display: "flex" }}>MARKANIZI</div>
            <div style={{ display: "flex" }}>DİJİTALDE</div>
            <div style={{ display: "flex", color: "#E5311B" }}>BÜYÜTÜN.</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#A1A1AA", letterSpacing: 2 }}>
            REKLAM ÇEKİMİ · PRODÜKSİYON · META REKLAM · WEB · BATMAN
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Barlow", data: font, style: "italic", weight: 800 }],
    },
  );
}
