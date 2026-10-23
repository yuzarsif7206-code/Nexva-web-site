import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { iconMap } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { groups, services } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServiceCards() {
  return (
    <section id="hizmetler" aria-labelledby="services-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          sub={copy.services.sub}
        />
        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            const last = i === services.length - 1;
            return (
              <li
                key={s.slug}
                data-reveal={String((i % 2) * 60)}
                className={cn(last && "md:col-span-2")}
              >
                <Link
                  href={`/teklif-al?hizmet=${s.slug}`}
                  className="service-card relative flex h-full min-h-[168px] justify-between gap-4 overflow-hidden rounded-[18px] bg-brand p-5 text-white md:p-7 lg:min-h-[192px]"
                >
                  {/* dekor: sağ altta bordo ark */}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute -right-16 -bottom-20 h-64 w-64 opacity-50"
                  >
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#5C0A15" strokeWidth="26" strokeDasharray="250 600" strokeLinecap="round" />
                  </svg>
                  <div className="relative flex flex-col">
                    <span className="text-[11px] tracking-[0.2em] text-white/80 uppercase">
                      {groups[s.group].title}
                    </span>
                    <h3 className="display h3-card mt-2 max-w-[18ch] text-white">{s.title}</h3>
                    <p
                      className={cn(
                        "mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.5] text-white/90",
                        last && "md:max-w-[52ch]",
                      )}
                    >
                      {s.desc}
                    </p>
                  </div>
                  <div className="relative flex shrink-0 flex-col items-end justify-between gap-6">
                    <span className="round-icon h-9 w-9 bg-white/15">
                      <ArrowUpRight className="arrow-nudge h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="sticker grid h-16 w-16 place-items-center rounded-2xl bg-white/15 shadow-[0_8px_20px_-8px_rgb(0_0_0/0.45)] lg:h-20 lg:w-20">
                      <Icon className="h-8 w-8" aria-hidden strokeWidth={1.75} />
                    </span>
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
