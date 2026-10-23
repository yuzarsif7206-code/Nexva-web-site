import Image from "next/image";
import { LogoMark } from "@/components/brand/LogoMark";
import { heroTiles } from "@/content/hero-tiles";
import { TileCut } from "./TileCut";

export function HeroTiles() {
  return (
    <ul className="flex items-center justify-center gap-2.5 lg:gap-3" aria-label="Çalışma alanlarımız">
      {heroTiles.map((tile, i) => (
        <li
          key={tile.alt}
          className="hero-in relative aspect-square w-[clamp(96px,30vw,127px)] overflow-hidden rounded-xl border border-white/10 shadow-[0_18px_40px_-18px_rgb(92_10_21/0.9)] lg:w-[170px] lg:rounded-2xl"
          style={{ ["--i" as string]: i }}
        >
          {tile.src ? (
            <Image
              src={tile.src}
              alt={tile.alt}
              width={320}
              height={320}
              sizes="(min-width:1024px) 170px, 30vw"
              loading="eager"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={tile.alt}
              className="grid h-full w-full place-items-center"
              style={{ background: "linear-gradient(160deg,#5C0A15,#0A0A0B)" }}
            >
              <LogoMark decorative className="h-1/2 w-1/2 opacity-25" />
            </div>
          )}
          <TileCut i={i as 0 | 1 | 2} />
          <span className="absolute top-2 left-2 rounded-full bg-bg/70 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-fg/80 uppercase lg:top-3 lg:left-3">
            0{i + 1}
          </span>
        </li>
      ))}
    </ul>
  );
}
