import { copy } from "@/content/copy";
import { PauseOffscreen } from "@/components/motion/PauseOffscreen";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {copy.ticker.map((t) => (
        <li
          key={t}
          className="inline-flex h-11 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold tracking-wide whitespace-nowrap uppercase"
        >
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** 9 hizmet etiketi. Süs amaçlı (bağlantı değil). Reduced-motion'da durur ve yatay kaydırılabilir. */
export function ServiceTicker() {
  return (
    <div className="mt-12 md:mt-16">
      <p className="sr-only">Hizmetlerimiz: {copy.ticker.join(", ")}</p>
      <div className="ticker-mask no-scrollbar overflow-hidden motion-reduce:overflow-x-auto" aria-hidden>
        <PauseOffscreen className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </PauseOffscreen>
      </div>
    </div>
  );
}
