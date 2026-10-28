import { ArrowDown } from "lucide-react";
import HeroShader from "@/components/hero/HeroShader";
import { HeroTiles } from "@/components/hero/HeroTiles";
import { PillCta } from "@/components/ui/Button";
import { copy } from "@/content/copy";

export function Hero() {
  const { hero } = copy;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-24 pb-14 lg:pt-28"
    >
      {/* Arka plan: Seviye 0 CSS degradesi + (varsa) shader + okunurluk örtüsü */}
      <div aria-hidden className="hero-bg absolute inset-0 -z-10 overflow-hidden">
        <HeroShader />
        <div
          className="absolute inset-0"
          style={{
            // okunurluk: metin bloğunun arkasında koyu çekirdek + alt kenarda zemine karışma
            background:
              "radial-gradient(80% 48% at 50% 58%, rgb(10 10 11 / .78), rgb(10 10 11 / .35) 62%, transparent 85%), linear-gradient(to bottom, rgb(10 10 11 / .25), transparent 30%, transparent 70%, var(--color-bg))",
          }}
        />
      </div>

      {/* Solda alt alta hizmet etiketleri (geniş ekran): sırayla belirir */}
      <ul
        aria-label="Hizmet alanları"
        className="absolute top-1/2 left-10 hidden -translate-y-1/2 flex-col gap-4 text-[11px] font-semibold tracking-[0.2em] text-fg/70 uppercase xl:flex 2xl:left-14"
      >
        {hero.sideLabels.map((l, i) => (
          <li key={l} className="side-in flex items-center gap-3" style={{ ["--i" as string]: i }}>
            <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
            {l}
          </li>
        ))}
        <li aria-hidden className="side-in ml-[2px] h-16 w-px bg-gradient-to-b from-white/30 to-transparent" style={{ ["--i" as string]: hero.sideLabels.length }} />
      </ul>

      <div className="container-x flex flex-col items-center text-center">
        <HeroTiles />

        <h1
          id="hero-title"
          className="future h1-future hero-in-lcp mt-9 text-balance lg:mt-12"
          style={{ ["--i" as string]: 3 }}
        >
          <span className="block">{hero.h1[0]}</span>
          <span className="block text-accent">{hero.h1[1]}.</span>
        </h1>

        <div className="hero-in mt-9 flex flex-col items-center gap-4 lg:mt-10" style={{ ["--i" as string]: 4 }}>
          <PillCta href="/teklif-al">{hero.ctaPrimary}</PillCta>
          <a
            href="#hizmetler"
            className="group inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold tracking-wide text-fg/90 uppercase transition-colors hover:text-accent"
          >
            {hero.ctaSecondary}
            <ArrowDown
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 ease-(--ease-spring) group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
