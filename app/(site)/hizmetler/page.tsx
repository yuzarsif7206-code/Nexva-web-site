import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { OneTimeProjects } from "@/components/sections/OneTimeProjects";
import { Packages } from "@/components/sections/Packages";
import { PageIntro } from "@/components/sections/PageIntro";
import { iconMap } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { groupOrder, groups, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { pad2 } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Hizmetler",
  description:
    "Reklam filmi, dron çekimi, ürün fotoğrafçılığı, Meta ve Google reklam yönetimi, marka kimliği, grafik tasarım, sosyal medya ve web sitesi. Batman'da tek çatı altında.",
  path: "/hizmetler",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="HİZMETLER" title={copy.pages.services.title} sub={copy.pages.services.sub}>
        <nav aria-label="Hizmet grupları" className="hero-in mt-10 flex flex-wrap gap-2" style={{ ["--i" as string]: 3 }}>
          {groupOrder.map((g) => (
            <a
              key={g}
              href={`#${g}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {groups[g].title}
            </a>
          ))}
        </nav>
      </PageIntro>

      {groupOrder.map((g, gi) => {
        const list = services.filter((s) => s.group === g);
        return (
          <section key={g} id={g} aria-labelledby={`${g}-title`} className="border-t border-white/[0.06] py-14 md:py-20">
            <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="display text-5xl text-white/10 tabular-nums md:text-7xl" aria-hidden>
                  {pad2(gi + 1)}
                </p>
                <h2 id={`${g}-title`} className="display h2-section mt-2">
                  {groups[g].title}
                </h2>
                <p className="mt-3 max-w-sm text-[1.0625rem] text-muted">{groups[g].blurb}</p>
              </div>
              <ul className="grid gap-4">
                {list.map((s, i) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <li key={s.slug} data-reveal={String(i * 60)}>
                      <article className="card card-arc spot flex flex-col gap-5 p-6 sm:flex-row sm:items-start md:p-8">
                        <span className="grid h-14 w-14 shrink-0 -rotate-6 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-10px_rgb(179_22_43/0.8)]">
                          <Icon className="h-7 w-7" aria-hidden strokeWidth={1.75} />
                        </span>
                        <div className="flex-1">
                          <h3 className="display h3-card">{s.title}</h3>
                          <p className="mt-3 max-w-2xl text-pretty text-fg/80">{s.desc}</p>
                          <Link
                            href={`/teklif-al?hizmet=${s.slug}`}
                            className="group mt-5 inline-flex min-h-12 items-center gap-2 text-sm font-bold tracking-wide text-accent uppercase"
                          >
                            Bu hizmet için teklif al
                            <ArrowUpRight
                              aria-hidden
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </Link>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <Packages />
      <OneTimeProjects />
      <CtaBand />
    </>
  );
}
