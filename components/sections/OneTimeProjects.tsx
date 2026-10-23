import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { iconMap } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { projects } from "@/content/projects";

export function OneTimeProjects() {
  return (
    <section id="projeler" aria-labelledby="onetime-title" className="section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="onetime-title"
              eyebrow={copy.oneTime.eyebrow}
              title={copy.oneTime.title}
              sub={copy.oneTime.sub}
            />
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {projects.map((p, i) => {
              const Icon = iconMap[p.icon];
              return (
                <li key={p.slug} data-reveal={String((i % 2) * 70)}>
                  <article
                    aria-labelledby={`proj-${p.slug}`}
                    className="card card-arc spot flex h-full flex-col p-5 md:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 id={`proj-${p.slug}`} className="display text-[1.375rem] leading-[1.05] font-bold md:text-2xl">
                        {p.title}
                      </h3>
                    </div>
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {p.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-snug text-fg/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden strokeWidth={3} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {p.adNote && (
                      <p className="mt-4 flex gap-2 rounded-xl bg-white/[0.04] p-3 text-sm text-muted">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {copy.oneTime.adNote}
                      </p>
                    )}
                    <div className="mt-auto pt-6">
                      <Link
                        href={`/teklif-al?proje=${p.slug}`}
                        className="btn btn-secondary h-12 w-full justify-between pr-2 pl-5 text-sm"
                        aria-label={`${p.title} için teklif al`}
                      >
                        {copy.oneTime.cta}
                        <span className="round-icon h-8 w-8 bg-white/10">
                          <ArrowUpRight className="arrow-nudge h-4 w-4" aria-hidden />
                        </span>
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
