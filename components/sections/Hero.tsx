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

      {/* Sol dikey etiketler (≥1024 px) */}
      <ul
        aria-hidden
        className="absolute top-1/2 left-12 hidden -translate-y-1/2 flex-col gap-5 text-[11px] tracking-[0.2em] text-muted uppercase lg:flex"
      >
        {hero.sideLabels.map((l, i) => (
          <li key={l} className="hero-in flex items-center gap-3" style={{ ["--i" as string]: i + 3 }}>
            <span className="h-1.5 w-1.5 bg-brand" />
            {l}
          </li>
        ))}
        <li className="ml-[3px] h-16 w-px bg-gradient-to-b from-white/25 to-transparent" />
      </ul>

      <div className="container-x flex flex-col items-center text-center">
        <HeroTiles />

        <h1
          id="hero-title"
          className="display h1-hero hero-in-lcp mt-8 text-balance lg:mt-10"
          style={{ ["--i" as string]: 3 }}
        >
          <span className="block lg:inline">{hero.h1[0]}</span>{" "}
          <span className="block text-accent lg:inline">
            {hero.h1[1]}.
          </span>
        </h1>

        <p
          className="hero-in mt-5 max-w-[34rem] text-pretty text-[1.0625rem] leading-[1.55] text-fg/85 lg:mt-6 lg:text-xl"
          style={{ ["--i" as string]: 4 }}
        >
          {hero.sub}
        </p>

        <div className="hero-in mt-8 flex flex-col items-center gap-5" style={{ ["--i" as string]: 5 }}>
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
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
            {hero.trust.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />}
                {t}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
