import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Nexva Dijital — Markanı dijitalde büyüt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 6a26 26 0 1 0 26 26" fill="none" stroke="#B3162B" stroke-width="5" stroke-linecap="round"/><path d="M20 46V18h6l12 18V18h6v28h-6L26 28v18z" fill="#F5F5F2"/><rect x="20" y="50" width="4" height="4" fill="#B3162B"/><rect x="27" y="53" width="3" height="3" fill="#B3162B" opacity=".7"/><rect x="22" y="57" width="2.5" height="2.5" fill="#B3162B" opacity=".45"/></svg>`;

const ARCS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="180" fill="none" stroke="#E5311B" stroke-width="2" stroke-dasharray="520 611" stroke-linecap="round"/><circle cx="200" cy="200" r="140" fill="none" stroke="#B3162B" stroke-width="12" stroke-dasharray="300 580" stroke-linecap="round" opacity=".6" transform="rotate(140 200 200)"/><circle cx="200" cy="200" r="100" fill="none" stroke="#B3162B" stroke-width="1" stroke-dasharray="2 8" opacity=".6"/></svg>`;

const svgSrc = (s: string) => `data:image/svg+xml;base64,${Buffer.from(s).toString("base64")}`;

// Modül düzeyinde okunur: görsel build sırasında statik üretilir.
const font = await readFile(join(process.cwd(), "assets/fonts/BarlowCondensed-ExtraBoldItalic.ttf"));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(60% 70% at 0% 0%, rgba(179,22,43,.55), transparent 70%), radial-gradient(50% 60% at 100% 100%, rgba(229,49,27,.35), transparent 70%), #0A0A0B",
          color: "#F5F5F2",
          fontFamily: "Barlow",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={svgSrc(ARCS)}
          width={620}
          height={620}
          alt=""
          style={{ position: "absolute", right: -140, top: -110, opacity: 0.9 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgSrc(MARK)} width={88} height={88} alt="" />
          <div style={{ display: "flex", fontSize: 56, letterSpacing: -0.5 }}>NEXVA DİJİTAL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 0.92 }}>
          <div style={{ display: "flex" }}>MARKANI DİJİTALDE</div>
          <div style={{ display: "flex", color: "#E5311B" }}>BÜYÜT.</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#A1A1AA", letterSpacing: 2 }}>
          REKLAM FİLMİ · DRON ÇEKİMİ · SOSYAL MEDYA · META & GOOGLE REKLAM · BATMAN
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Barlow", data: font, style: "italic", weight: 800 }],
    },
  );
}
