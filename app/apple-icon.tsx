import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 6a26 26 0 1 0 26 26" fill="none" stroke="#B3162B" stroke-width="5" stroke-linecap="round"/><path d="M20 46V18h6l12 18V18h6v28h-6L26 28v18z" fill="#F5F5F2"/><rect x="20" y="50" width="4" height="4" fill="#B3162B"/><rect x="27" y="53" width="3" height="3" fill="#B3162B" opacity=".7"/><rect x="22" y="57" width="2.5" height="2.5" fill="#B3162B" opacity=".45"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`} width={124} height={124} alt="" />
      </div>
    ),
    size,
  );
}
