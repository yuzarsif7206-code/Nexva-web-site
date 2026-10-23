import { Gauge, MessagesSquare, Repeat2, Timer } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageIntro } from "@/components/sections/PageIntro";
import { Process } from "@/components/sections/Process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { pageMetadata } from "@/lib/seo";
import { pad2 } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Hakkımızda",
  description:
    "Nexva Dijital, Batman merkezli bir reklam, prodüksiyon ve dijital medya ajansıdır. Çekim, tasarım, reklam ve web tek çatı altında.",
  path: "/hakkimizda",
});

const ICONS = [MessagesSquare, Timer, Gauge, Repeat2];

export default function AboutPage() {
  const { about } = copy.pages;
  return (
    <>
      <PageIntro eyebrow="HAKKIMIZDA" title={about.title} />

      <section aria-label="Hikâyemiz" className="pb-16 md:pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <p className="eyebrow pt-2 text-muted" aria-hidden>
            Nexva Dijital · Batman
          </p>
          <p
            data-reveal
            className="text-pretty text-[clamp(1.375rem,5vw,2.25rem)] leading-[1.3] font-semibold tracking-tight text-fg"
          >
            {about.story}
          </p>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-y border-t border-white/[0.06]">
        <div className="container-x">
          <SectionHeading id="principles-title" eyebrow={about.principlesEyebrow} title={about.principlesTitle} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-5">
            {about.principles.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <li key={p.title} data-reveal={String(i * 60)}>
                  <article className="card card-arc spot flex h-full flex-col p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent ring-1 ring-accent/25">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="display text-3xl text-white/15 tabular-nums" aria-hidden>
                        {pad2(i + 1)}
                      </span>
                    </div>
                    <h3 className="display h3-card mt-8">{p.title}</h3>
                    <p className="mt-2 text-fg/75">{p.text}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Process compact />
      <CtaBand />
    </>
  );
}
