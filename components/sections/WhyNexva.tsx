import { Clock3, FileCheck2, MapPinned, Users } from "lucide-react";
import { ArcBackdrop } from "@/components/brand/ArcBackdrop";
import { PixelDissolve } from "@/components/brand/PixelDissolve";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

const ICONS = [Users, MapPinned, Clock3, FileCheck2];
// 12 kolon bento: büyük kutu 7 kolon + 2 satır, diğerleri sağda/altta
const SPANS = [
  "lg:col-span-7 lg:row-span-2 lg:min-h-[26rem]",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-12",
];

export function WhyNexva() {
  const { why } = copy;
  return (
    <section aria-labelledby="why-title" className="section-y relative overflow-hidden">
      <div className="container-x">
        <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} />
        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
          {why.items.map((item, i) => {
            const Icon = ICONS[i];
            const big = i === 0;
            return (
              <li key={item.title} data-reveal={String(i * 60)} className={cn(SPANS[i], big && "md:col-span-2")}>
                <article
                  className={cn(
                    "card spot relative flex h-full flex-col overflow-hidden p-6 md:p-8",
                    big && "card-gradient justify-end",
                    i === 3 && "lg:flex-row lg:items-center lg:gap-10",
                  )}
                >
                  {big && (
                    <>
                      <ArcBackdrop id="why-arc" className="-top-24 -right-24 h-[26rem] w-[26rem] md:h-[30rem] md:w-[30rem]" intensity={0.9} />
                      <PixelDissolve className="opacity-70" />
                    </>
                  )}
                  <span
                    className={cn(
                      "relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1",
                      big ? "bg-accent text-white ring-accent" : "bg-white/5 text-accent ring-white/10",
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div className={cn("relative", big ? "mt-auto pt-24" : "mt-6", i === 3 && "lg:mt-0")}>
                    <h3 className={cn("display", big ? "text-[clamp(2.25rem,8vw,3.75rem)]" : "h3-card")}>
                      {item.title}
                    </h3>
                    <p className={cn("mt-3 text-pretty text-fg/80", big ? "max-w-md text-lg" : "max-w-prose")}>
                      {item.text}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
