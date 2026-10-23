import { Phone } from "lucide-react";
import { ArcBackdrop } from "@/components/brand/ArcBackdrop";
import { ButtonLink, PillCta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { DEFAULT_WA_TEXT, SITE, waLink } from "@/lib/site-config";

/** "Hadi konuşalım" bandı. Satır içi form yok, form işini /teklif-al yapar. Canvas yok. */
export function CtaBand() {
  const { cta } = copy;
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden"
      style={{ background: "linear-gradient(160deg,#5C0A15,#0A0A0B 70%)" }}
    >
      <ArcBackdrop id="cta-arc" className="top-1/2 left-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 md:h-[60rem] md:w-[60rem]" intensity={0.55} />
      <div className="container-x flex flex-col items-center py-20 text-center md:py-28 lg:py-36">
        <Eyebrow>{cta.eyebrow}</Eyebrow>
        <h2 id="cta-title" className="display h2-section mt-5 max-w-4xl text-balance lg:text-[clamp(4rem,7vw,7rem)]">
          {cta.title}
        </h2>
        <p className="mt-5 max-w-lg text-pretty text-[1.0625rem] text-fg/85 md:text-lg">{cta.sub}</p>
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <PillCta href="/teklif-al" className="w-full sm:w-auto">
            {cta.primary}
          </PillCta>
          <ButtonLink
            href={waLink(DEFAULT_WA_TEXT)}
            external
            variant="secondary"
            className="h-14 w-full border-white/25 sm:w-auto"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            {cta.secondary}
          </ButtonLink>
        </div>
        <a
          href={`tel:${SITE.phone.tel}`}
          className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full px-3 text-fg transition-colors hover:text-accent"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-accent">
            <Phone className="h-4 w-4" aria-hidden />
          </span>
          <span className="display text-3xl tabular-nums md:text-4xl">{SITE.phone.display}</span>
        </a>
      </div>
    </section>
  );
}
