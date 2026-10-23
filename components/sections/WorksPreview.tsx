import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/works/WorkCard";
import { WorksCarousel } from "@/components/works/WorksCarousel";
import { copy } from "@/content/copy";
import { getWorks } from "@/content/works";
import { WorksInstagramCta } from "./WorksInstagramCta";

export function WorksPreview() {
  const works = getWorks();
  return (
    <section id="isler" aria-labelledby="works-title" className="section-y relative overflow-hidden">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading id="works-title" eyebrow={copy.works.eyebrow} title={copy.works.title} />
        {works.length > 0 && (
          <Link
            href="/isler"
            className="group inline-flex min-h-12 items-center gap-2 self-start text-sm font-semibold tracking-wide uppercase transition-colors hover:text-accent md:self-auto"
          >
            {copy.works.all}
            <ArrowUpRight className="arrow-nudge h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        )}
      </div>

      <div className="mt-10 md:mt-14">
        {works.length === 0 ? (
          <div className="container-x">
            <WorksInstagramCta />
          </div>
        ) : (
          <WorksCarousel total={works.length}>
            {works.map((w, i) => (
              <div key={w.slug} data-slide className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[420px]">
                <WorkCard
                  work={w}
                  fixedRatio="4 / 5"
                  priority={i < 2}
                  sizes="(min-width:1024px) 420px, (min-width:640px) 46vw, 78vw"
                />
              </div>
            ))}
          </WorksCarousel>
        )}
      </div>
    </section>
  );
}
