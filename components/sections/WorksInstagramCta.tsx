import { ArrowUpRight } from "lucide-react";
import { TileArt } from "@/components/art/TileArt";
import { PixelDissolve } from "@/components/brand/PixelDissolve";
import { InstagramIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { SITE } from "@/lib/site-config";

/** İş verisi yokken gösterilir: sahte kart yok, Instagram'a yönlendirme + illüstrasyon kolajı. */
export function WorksInstagramCta({ headingLevel = "h3", id = "ig" }: { headingLevel?: "h2" | "h3"; id?: string }) {
  const H = headingLevel;
  return (
    <div className="card card-gradient spot relative overflow-hidden p-6 md:p-10 lg:p-14" data-reveal>
      <PixelDissolve className="opacity-60" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <InstagramIcon className="h-7 w-7" />
          </span>
          <H className="display mt-6 text-[clamp(2rem,7vw,3.5rem)] text-balance">{copy.works.emptyTitle}</H>
          <p className="mt-4 max-w-xl text-pretty text-[1.0625rem] text-fg/80">{copy.works.emptySub}</p>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8 h-14 justify-between gap-4 pr-2.5 pl-6 text-[0.9375rem] tracking-normal whitespace-nowrap normal-case"
          >
            {copy.works.emptyCta}
            <span className="round-icon h-9 w-9 bg-bg/90">
              <ArrowUpRight className="arrow-nudge h-[18px] w-[18px]" aria-hidden />
            </span>
          </a>
        </div>

        {/* kolaj: sosyal + dron + kamera */}
        <div aria-hidden className="relative mx-auto h-[260px] w-full max-w-[420px] sm:h-[300px]">
          <div className="absolute top-2 left-0 h-[62%] w-[52%] -rotate-6 overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.8)]">
            <TileArt name="drone" id={`${id}-c1`} />
          </div>
          <div className="absolute right-0 bottom-0 h-[62%] w-[52%] rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.8)]">
            <TileArt name="camera" id={`${id}-c2`} />
          </div>
          <div className="absolute top-1/2 left-1/2 h-[78%] w-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_30px_60px_-20px_rgb(92_10_21/0.9)]">
            <TileArt name="social" id={`${id}-c3`} />
          </div>
        </div>
      </div>
    </div>
  );
}
