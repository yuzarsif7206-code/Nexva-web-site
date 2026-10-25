import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TileArt, type ArtName } from "@/components/art/TileArt";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { groupOrder, groups, services, type Group } from "@/content/services";

const ART: Record<Group, ArtName> = {
  uretim: "camera",
  performans: "dashboard",
  marka: "brand",
  "sosyal-web": "social",
};

/**
 * İş (portföy) verisi gelene kadar: çalışma alanlarını illüstrasyonlarla tanıtır.
 * Uydurma proje/müşteri yoktur; kartlar hizmet alanlarını anlatır.
 */
export function WorksShowcase() {
  return (
    <section aria-labelledby="showcase-title" className="pb-16 md:pb-24">
      <div className="container-x">
        <SectionHeading
          id="showcase-title"
          eyebrow="ÇALIŞMA ALANLARIMIZ"
          title="NELER ÜRETİYORUZ"
          sub="Portföyümüzü burada yayınlayana kadar ürettiğimiz işlerin türlerine göz atın. Son işlerimiz Instagram hesabımızda."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:gap-6">
          {groupOrder.map((g, i) => {
            const list = services.filter((s) => s.group === g);
            return (
              <li key={g} data-reveal={String((i % 2) * 70)}>
                <Link href={`/hizmetler#${g}`} className="work-card group card spot block overflow-hidden p-0" data-cursor="view">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="work-zoom absolute inset-0">
                      <TileArt name={ART[g]} id={`showcase-${g}`} wide />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-bg/80 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="relative -mt-6 p-5 pt-0 md:p-7 md:pt-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display text-[2rem] leading-none md:text-[2.5rem]">{groups[g].title}</h3>
                      <span className="round-icon mt-1 h-10 w-10 bg-white/10 transition-colors group-hover:bg-accent-strong">
                        <ArrowUpRight className="arrow-nudge h-5 w-5" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-3 text-fg/80">{groups[g].blurb}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {list.map((s) => (
                        <li key={s.slug} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-fg/85">
                          {s.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
