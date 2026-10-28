import Image from "next/image";
import { TileArt } from "@/components/art/TileArt";
import { heroTiles } from "@/content/hero-tiles";
import { TileCut } from "./TileCut";

/** 3 eşit kare: telefonda kapsayıcı genişliğine tam sığar, masaüstünde 170 px. */
export function HeroTiles() {
  return (
    <ul
      className="grid w-full max-w-[420px] grid-cols-3 gap-2.5 sm:max-w-[460px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,170px)] lg:gap-3"
      aria-label="Çalışma alanlarımız"
    >
      {heroTiles.map((tile, i) => (
        <li
          key={tile.alt}
          className="hero-in relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-bg shadow-[0_18px_40px_-18px_rgb(92_10_21/0.9)] lg:rounded-2xl"
          style={{ ["--i" as string]: i }}
        >
          {tile.src ? (
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(min-width:1024px) 170px, 31vw"
              loading="eager"
              className="object-cover"
            />
          ) : tile.art ? (
            <div role="img" aria-label={tile.alt} className="absolute inset-0">
              <TileArt name={tile.art} id={`hero-art-${i}`} />
            </div>
          ) : null}
          <TileCut i={i as 0 | 1 | 2} />
        </li>
      ))}
    </ul>
  );
}
