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
        {/* Mobilde yatay kaydırılır, geniş ekranda alt satıra sarılır */}
        <nav
          aria-label="Hizmet grupları"
          className="hero-in no-scrollbar -mx-5 mt-10 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0"
          style={{ ["--i" as string]: 3 }}
        >
          <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {groupOrder.map((g) => (
              <li key={g}>
                <a
                  href={`#${groups[g].anchor}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
                >
                  {groups[g].title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      {groupOrder.map((g, gi) => {
        const list = services.filter((s) => s.group === g);
        return (
          <section
            key={g}
            id={groups[g].anchor}
            aria-labelledby={`${groups[g].anchor}-title`}
            className="border-t border-white/[0.06] py-14 md:py-20"
          >
            <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
              <div className="lg:sticky lg:top-36 lg:self-start">
                <span
                  aria-hidden
                  data-text={pad2(gi + 1)}
                  className="ghost-text display block text-5xl leading-none text-white/10 tabular-nums md:text-7xl"
                />
                {/* tüm bölümlerde aynı boyut; uzun başlık 2-3 satıra dengeli sarılır */}
                <h2
                  id={`${groups[g].anchor}-title`}
                  className="display mt-3 text-balance text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.08]"
                >
                  {groups[g].title}
                </h2>
                <p className="mt-4 max-w-sm text-[1.0625rem] text-muted">{groups[g].blurb}</p>
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
