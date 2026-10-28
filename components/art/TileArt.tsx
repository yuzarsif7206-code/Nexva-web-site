/**
 * Nexva illüstrasyon seti: el çizimi SVG, marka paleti (bg #0A0A0B, burgundy #5C0A15,
 * brand #B3162B, accent #E5311B, parlama #FFE8E2). Tümü 320×320 viewBox, kare veya
 * kırpılmış (slice) kaplarda kullanılır. Hareket yalnızca transform/opacity (CSS).
 */

export type ArtName = "camera" | "drone" | "screen" | "social";

/** SVG koordinatlarını 2 ondalığa yuvarlar (HTML'i şişirmesin). */
const r2d = (n: number) => Math.round(n * 100) / 100;

const FONT = { fontFamily: "var(--font-inter), system-ui, sans-serif" } as const;
const DISPLAY = { fontFamily: "var(--font-barlow), 'Arial Narrow', sans-serif", fontStyle: "italic" } as const;

function Backdrop({ id, glowX = 230, glowY = 60 }: { id: string; glowX?: number; glowY?: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx={glowX} cy={glowY} r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5C0A15" />
          <stop offset=".55" stopColor="#1A0A0D" />
          <stop offset="1" stopColor="#0A0A0B" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#F5F5F2" strokeOpacity=".05" strokeWidth="1" />
        </pattern>
      </defs>
      {/* zemin, geniş kaplarda (wide) kenarlara taşabilsin diye büyük çizilir */}
      <rect x="-200" y="-200" width="720" height="720" fill={`url(#${id}-bg)`} />
      <rect x="-200" y="-200" width="720" height="720" fill={`url(#${id}-grid)`} />
    </>
  );
}

function Corners({ inset = 18, len = 18, opacity = 0.55 }: { inset?: number; len?: number; opacity?: number }) {
  const a = inset;
  const b = 320 - inset;
  return (
    <g fill="none" stroke="#F5F5F2" strokeOpacity={opacity} strokeWidth="2.5" strokeLinecap="round">
      <path d={`M${a} ${a + len}V${a}H${a + len}`} />
      <path d={`M${b - len} ${a}H${b}V${a + len}`} />
      <path d={`M${a} ${b - len}V${b}H${a + len}`} />
      <path d={`M${b - len} ${b}H${b}V${b - len}`} />
    </g>
  );
}

/* ---------------- Prodüksiyon: sinema lensi + diyafram ---------------- */
function Camera({ id }: { id: string }) {
  const blades = Array.from({ length: 7 }, (_, i) => i * (360 / 7));
  return (
    <>
      <Backdrop id={id} glowX={250} glowY={40} />
      <defs>
        <radialGradient id={`${id}-glass`} cx="140" cy="125" r="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E5311B" stopOpacity=".9" />
          <stop offset=".35" stopColor="#5C0A15" />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
        <linearGradient id={`${id}-barrel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A3A40" />
          <stop offset=".5" stopColor="#141416" />
          <stop offset="1" stopColor="#26262B" />
        </linearGradient>
      </defs>

      {/* gövde ve odak halkası */}
      <circle cx="160" cy="150" r="118" fill="#0A0A0B" />
      <circle cx="160" cy="150" r="112" fill={`url(#${id}-barrel)`} />
      <circle cx="160" cy="150" r="104" fill="none" stroke="#4A4A50" strokeWidth="8" strokeDasharray="2 5" />
      <circle cx="160" cy="150" r="92" fill="#0E0E10" stroke="#2C2C31" strokeWidth="2" />
      {/* ölçek işaretleri */}
      <g stroke="#A1A1AA" strokeOpacity=".6" strokeWidth="1.5">
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const r1 = 84;
          const r2 = i % 3 === 0 ? 76 : 80;
          return (
            <line
              key={i}
              x1={r2d(160 + r1 * Math.cos(a))}
              y1={r2d(150 + r1 * Math.sin(a))}
              x2={r2d(160 + r2 * Math.cos(a))}
              y2={r2d(150 + r2 * Math.sin(a))}
            />
          );
        })}
      </g>
      {/* cam */}
      <circle cx="160" cy="150" r="70" fill={`url(#${id}-glass)`} />
      {/* diyafram yaprakları */}
      <g transform="translate(160 150)" opacity=".85">
        {blades.map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0 -66 C 22 -52 30 -30 26 -12 L 6 -22 Z"
            fill="#0A0A0B"
            fillOpacity=".55"
            stroke="#B3162B"
            strokeOpacity=".35"
          />
        ))}
        <circle r="18" fill="#050506" />
        <circle r="18" fill="none" stroke="#E5311B" strokeOpacity=".6" strokeWidth="1.5" />
      </g>
      {/* yansımalar */}
      <path d="M112 112 A 62 62 0 0 1 168 90" fill="none" stroke="#FFE8E2" strokeWidth="4" strokeLinecap="round" opacity=".85" />
      <path d="M118 128 A 46 46 0 0 1 140 108" fill="none" stroke="#FFE8E2" strokeWidth="2" strokeLinecap="round" opacity=".5" />
      <path d="M205 178 A 58 58 0 0 1 182 203" fill="none" stroke="#E5311B" strokeWidth="3" strokeLinecap="round" opacity=".9" />
      <circle cx="150" cy="140" r="5" fill="#FFE8E2" opacity=".7" />

      <Corners />
      {/* REC + zaman kodu */}
      <g style={FONT}>
        <circle className="art-blink" cx="38" cy="40" r="6" fill="#E5311B" />
        <text x="50" y="46" fill="#F5F5F2" fontSize="17" fontWeight="700" letterSpacing="1.5">
          REC
        </text>
        <text x="300" y="46" textAnchor="end" fill="#F5F5F2" fillOpacity=".7" fontSize="14" fontWeight="600" letterSpacing="1">
          00:24:12
        </text>
      </g>
    </>
  );
}

/* ---------------- Dron: kuşbakışı + harita ızgarası ---------------- */
function Drone({ id }: { id: string }) {
  const rotors: [number, number][] = [
    [-66, -66],
    [66, -66],
    [-66, 66],
    [66, 66],
  ];
  return (
    <>
      <Backdrop id={id} glowX={70} glowY={40} />
      {/* topografik eğriler */}
      <g fill="none" stroke="#B3162B" strokeOpacity=".35" strokeWidth="1.5">
        <path d="M-10 250 C 60 210 110 260 170 225 S 280 180 330 205" />
        <path d="M-10 280 C 70 240 120 290 185 255 S 290 215 330 235" />
        <path d="M-10 60 C 40 90 90 40 150 70 S 260 40 330 80" strokeOpacity=".2" />
      </g>
      {/* hedef halkası */}
      <g fill="none" stroke="#E5311B" strokeOpacity=".45">
        <circle cx="160" cy="146" r="122" strokeDasharray="3 9" />
        <path d="M160 14v18M160 260v18M28 146h18M274 146h18" strokeWidth="2" />
      </g>

      <g transform="translate(160 146)">
        {/* kollar */}
        <g stroke="#2E2E33" strokeWidth="13" strokeLinecap="round">
          <line x1="-66" y1="-66" x2="66" y2="66" />
          <line x1="66" y1="-66" x2="-66" y2="66" />
        </g>
        <g stroke="#4A4A50" strokeWidth="3" strokeLinecap="round">
          <line x1="-60" y1="-62" x2="-20" y2="-22" />
          <line x1="60" y1="-62" x2="20" y2="-22" />
        </g>
        {/* rotorlar */}
        {rotors.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="38" fill="#F5F5F2" fillOpacity=".04" stroke="#B3162B" strokeOpacity=".55" strokeWidth="1.5" />
            <circle r="30" fill="none" stroke="#F5F5F2" strokeOpacity=".08" strokeWidth="6" />
            <g className={i % 2 ? "art-spin-rev" : "art-spin"}>
              <path d="M-34 -3 Q 0 -9 34 -3 Q 0 3 -34 3Z" fill="#F5F5F2" fillOpacity=".55" />
              <path d="M-3 -34 Q 3 0 -3 34 Q -9 0 -3 -34Z" fill="#F5F5F2" fillOpacity=".2" />
            </g>
            <circle r="8" fill="#1A1A1D" stroke="#5A5A60" strokeWidth="2" />
            <circle r="3" fill={i < 2 ? "#E5311B" : "#F5F5F2"} />
          </g>
        ))}
        {/* gövde */}
        <rect x="-30" y="-36" width="60" height="72" rx="20" fill="#16161A" stroke="#3E3E44" strokeWidth="2" />
        <rect x="-20" y="-26" width="40" height="30" rx="10" fill="#0B0B0D" />
        <path d="M-14 -20 h18" stroke="#FFE8E2" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="18" r="10" fill="#050506" stroke="#E5311B" strokeWidth="2.5" />
        <circle cx="-3" cy="15" r="2.5" fill="#FFE8E2" />
      </g>

      {/* HUD */}
      <g style={FONT} fontWeight="700" letterSpacing="1">
        <text x="22" y="36" fill="#F5F5F2" fontSize="14">
          ALT <tspan fill="#E5311B">120 m</tspan>
        </text>
        <g transform="translate(286 32)">
          <circle r="14" fill="none" stroke="#F5F5F2" strokeOpacity=".5" strokeWidth="1.5" />
          <path d="M0 -10 L5 4 L0 1 L-5 4Z" fill="#E5311B" />
          <text y="-18" textAnchor="middle" fill="#F5F5F2" fillOpacity=".7" fontSize="10">
            N
          </text>
        </g>
      </g>
    </>
  );
}

/* ---------------- Dijital tasarım ekranı ---------------- */
function Screen({ id }: { id: string }) {
  return (
    <>
      <Backdrop id={id} glowX={260} glowY={260} />
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E5311B" stopOpacity=".55" />
          <stop offset="1" stopColor="#E5311B" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* monitör */}
      <rect x="26" y="34" width="268" height="178" rx="14" fill="#121214" stroke="#3A3A40" strokeWidth="2" />
      <rect x="26" y="34" width="268" height="24" rx="12" fill="#1A1A1D" />
      <g>
        <circle cx="42" cy="46" r="4" fill="#E5311B" />
        <circle cx="56" cy="46" r="4" fill="#5A5A60" />
        <circle cx="70" cy="46" r="4" fill="#5A5A60" />
      </g>
      {/* kenar çubuğu */}
      <g fill="#F5F5F2" fillOpacity=".12">
        <rect x="38" y="72" width="44" height="8" rx="4" />
        <rect x="38" y="88" width="34" height="8" rx="4" />
        <rect x="38" y="104" width="40" height="8" rx="4" />
        <rect x="38" y="120" width="28" height="8" rx="4" />
      </g>
      <rect x="38" y="72" width="44" height="8" rx="4" fill="#E5311B" fillOpacity=".8" />
      {/* grafik */}
      <rect x="96" y="70" width="184" height="96" rx="10" fill="#0B0B0D" stroke="#2A2A2F" />
      <path d="M106 150 L134 136 L158 142 L184 116 L210 122 L236 96 L268 84 L268 160 L106 160Z" fill={`url(#${id}-area)`} />
      <path
        d="M106 150 L134 136 L158 142 L184 116 L210 122 L236 96 L268 84"
        fill="none"
        stroke="#E5311B"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="268" cy="84" r="5" fill="#FFE8E2" />
      <circle className="art-pulse" cx="268" cy="84" r="11" fill="none" stroke="#E5311B" strokeWidth="2" />
      {/* renk örnekleri */}
      <g>
        <rect x="96" y="176" width="22" height="22" rx="6" fill="#B3162B" />
        <rect x="124" y="176" width="22" height="22" rx="6" fill="#E5311B" />
        <rect x="152" y="176" width="22" height="22" rx="6" fill="#5C0A15" />
        <rect x="180" y="176" width="22" height="22" rx="6" fill="#F5F5F2" />
      </g>
      {/* kalem aracı: bezier ve tutamaçlar */}
      <g>
        <path d="M44 262 C 92 196 150 300 214 236" fill="none" stroke="#F5F5F2" strokeWidth="3" />
        <path d="M44 262 L 92 220 M214 236 L 170 270" stroke="#A1A1AA" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="38" y="256" width="12" height="12" fill="#0A0A0B" stroke="#E5311B" strokeWidth="2.5" />
        <rect x="208" y="230" width="12" height="12" fill="#0A0A0B" stroke="#E5311B" strokeWidth="2.5" />
        <circle cx="92" cy="220" r="5" fill="#E5311B" />
        <circle cx="170" cy="270" r="5" fill="#E5311B" />
      </g>
      {/* imleç */}
      <path d="M232 168 L232 200 L240 192 L246 206 L252 203 L246 190 L257 190Z" fill="#F5F5F2" stroke="#0A0A0B" strokeWidth="2" strokeLinejoin="round" />
      <text x="292" y="300" textAnchor="end" fill="#F5F5F2" fontSize="54" style={DISPLAY} fontWeight="800" opacity=".1">
        Aa
      </text>
    </>
  );
}

/* ---------------- Sosyal medya + web ---------------- */
function Social({ id }: { id: string }) {
  return (
    <>
      <Backdrop id={id} glowX={250} glowY={250} />
      <defs>
        <linearGradient id={`${id}-post`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E5311B" />
          <stop offset="1" stopColor="#5C0A15" />
        </linearGradient>
      </defs>
      {/* tarayıcı penceresi */}
      <rect x="20" y="40" width="200" height="150" rx="12" fill="#121214" stroke="#2C2C31" strokeWidth="2" />
      <rect x="20" y="40" width="200" height="22" rx="11" fill="#1A1A1D" />
      <rect x="62" y="47" width="120" height="8" rx="4" fill="#F5F5F2" fillOpacity=".12" />
      <rect x="34" y="76" width="96" height="14" rx="4" fill="#F5F5F2" fillOpacity=".75" />
      <rect x="34" y="96" width="70" height="14" rx="4" fill="#E5311B" />
      <rect x="34" y="120" width="120" height="6" rx="3" fill="#F5F5F2" fillOpacity=".2" />
      <rect x="34" y="132" width="100" height="6" rx="3" fill="#F5F5F2" fillOpacity=".2" />
      <rect x="34" y="152" width="58" height="20" rx="10" fill="#B3162B" />
      {/* telefon */}
      <g transform="translate(176 70)">
        <rect width="124" height="236" rx="22" fill="#0B0B0D" stroke="#3E3E44" strokeWidth="3" />
        <rect x="46" y="10" width="32" height="7" rx="3.5" fill="#26262B" />
        {/* profil */}
        <circle cx="24" cy="38" r="10" fill="none" stroke="#E5311B" strokeWidth="2.5" />
        <rect x="40" y="33" width="50" height="6" rx="3" fill="#F5F5F2" fillOpacity=".6" />
        <rect x="40" y="43" width="32" height="5" rx="2.5" fill="#F5F5F2" fillOpacity=".25" />
        {/* gönderi */}
        <rect x="12" y="58" width="100" height="100" rx="10" fill={`url(#${id}-post)`} />
        <circle cx="62" cy="108" r="18" fill="#0A0A0B" fillOpacity=".45" />
        <path d="M56 98 L72 108 L56 118Z" fill="#F5F5F2" />
        {/* etkileşim */}
        <path
          className="art-beat"
          d="M24 178 c-6 -6 -14 -2 -12 5 c1 4 7 8 12 12 c5 -4 11 -8 12 -12 c2 -7 -6 -11 -12 -5z"
          fill="#E5311B"
        />
        <circle cx="54" cy="182" r="7" fill="none" stroke="#F5F5F2" strokeOpacity=".6" strokeWidth="2.2" />
        <path d="M76 176 l12 6 -12 6z" fill="none" stroke="#F5F5F2" strokeOpacity=".6" strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="12" y="200" width="84" height="6" rx="3" fill="#F5F5F2" fillOpacity=".3" />
        <rect x="12" y="212" width="60" height="6" rx="3" fill="#F5F5F2" fillOpacity=".18" />
      </g>
      {/* bildirim balonu */}
      <g transform="translate(118 222)">
        <rect width="72" height="36" rx="18" fill="#E5311B" />
        <path d="M18 18 c-3 -3 -8 -1 -7 3 c1 2 4 4 7 6 c3 -2 6 -4 7 -6 c1 -4 -4 -6 -7 -3z" fill="#fff" />
        <rect x="32" y="15" width="28" height="6" rx="3" fill="#fff" fillOpacity=".85" />
      </g>
    </>
  );
}

const ARTS: Record<ArtName, (p: { id: string }) => React.JSX.Element> = {
  camera: Camera,
  drone: Drone,
  screen: Screen,
  social: Social,
};

export function TileArt({
  name,
  id,
  wide,
  className = "absolute inset-0 h-full w-full",
}: {
  name: ArtName;
  /** Sayfada benzersiz olmalı (SVG gradient id'leri). */
  id: string;
  /** 4:3 kaplar için: kırpmak yerine zemini yanlara genişletir, çizimin tamamı görünür. */
  wide?: boolean;
  className?: string;
}) {
  const Art = ARTS[name];
  return (
    <svg
      viewBox={wide ? "-54 0 428 320" : "0 0 320 320"}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <Art id={id} />
    </svg>
  );
}
