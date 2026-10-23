import { ArrowUpRight } from "lucide-react";
import { PixelDissolve } from "@/components/brand/PixelDissolve";
import { InstagramIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { SITE } from "@/lib/site-config";

/** İş verisi yokken gösterilir: sahte kart yok, Instagram'a yönlendirme. */
export function WorksInstagramCta({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="card card-gradient spot relative overflow-hidden p-6 md:p-10 lg:p-14" data-reveal>
      <PixelDissolve className="opacity-60" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <InstagramIcon className="h-7 w-7" />
          </span>
          <H className="display mt-6 text-[clamp(2rem,7vw,3.5rem)] text-balance">{copy.works.emptyTitle}</H>
          <p className="mt-4 max-w-xl text-pretty text-[1.0625rem] text-fg/80">{copy.works.emptySub}</p>
        </div>
        <a
          href={SITE.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary h-14 justify-between gap-4 self-start pr-2.5 pl-6 md:self-end"
        >
          {copy.works.emptyCta}
          <span className="round-icon h-9 w-9 bg-bg/90">
            <ArrowUpRight className="arrow-nudge h-[18px] w-[18px]" aria-hidden />
          </span>
        </a>
      </div>
    </div>
  );
}
