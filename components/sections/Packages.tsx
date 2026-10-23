import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { packages } from "@/content/packages";
import { cn } from "@/lib/utils";
import { PackagesRail } from "./PackagesRail";

export function Packages({ headingLevel = "h2" }: { headingLevel?: "h2" }) {
  const featuredIndex = Math.max(
    0,
    packages.findIndex((p) => p.featured),
  );
  return (
    <section id="paketler" aria-labelledby="packages-title" className="section-y relative overflow-hidden">
      <div className="container-x">
        <SectionHeading
          as={headingLevel}
          id="packages-title"
          eyebrow={copy.packages.eyebrow}
          title={copy.packages.title}
          sub={copy.packages.sub}
        />
      </div>

      <div className="relative mx-auto mt-10 max-w-[1280px] md:mt-14 lg:px-12">
        {/* masaüstünde kartları bağlayan ince ark */}
        <svg
          aria-hidden
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-12 top-1/2 hidden h-72 -translate-y-1/2 lg:block"
        >
          <defs>
            <linearGradient id="pkg-arc" x1="0" x2="1">
              <stop offset="0" stopColor="#B3162B" stopOpacity="0" />
              <stop offset=".5" stopColor="#E5311B" stopOpacity=".8" />
              <stop offset="1" stopColor="#B3162B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 260 Q600 -120 1200 260" fill="none" stroke="url(#pkg-arc)" strokeWidth="1.5" />
          <path d="M0 290 Q600 -60 1200 290" fill="none" stroke="#B3162B" strokeOpacity=".25" strokeWidth="1" strokeDasharray="3 9" />
        </svg>

        <PackagesRail names={packages.map((p) => p.name)} featuredIndex={featuredIndex}>
          <ul className="pkg-list">
            {packages.map((p, i) => (
              <li key={p.slug} data-pkg data-active={i === featuredIndex} className="pkg-item relative">
                {p.featured && (
                  <span
                    aria-hidden
                    className="breathe pointer-events-none absolute inset-0 rounded-[1.25rem] shadow-[0_0_60px_-10px_rgb(229_49_27/0.55)] md:rounded-3xl lg:-inset-y-[4%]"
                  />
                )}
                <article
                  className={cn(
                    "card card-arc spot flex h-full flex-col p-6 md:p-8",
                    p.featured ? "card-gradient border-accent/70 lg:-my-[4%] lg:py-12" : "",
                  )}
                  aria-labelledby={`pkg-${p.slug}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      id={`pkg-${p.slug}`}
                      className="display inline-flex rounded-full bg-brand px-4 py-1.5 text-lg font-extrabold text-white"
                    >
                      {p.name}
                    </h3>
                    {p.featured && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/60 px-3 py-1 text-xs font-semibold tracking-wide text-fg uppercase">
                        <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                        {copy.packages.featuredBadge}
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-lg leading-snug font-bold text-fg">{p.tagline}</p>
                  <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-fg/90">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15">
                          <Check className="h-3.5 w-3.5 text-accent" aria-hidden strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <p className="text-sm text-muted">{copy.packages.priceNote}</p>
                    <Link
                      href={`/teklif-al?paket=${p.slug}`}
                      className={cn(
                        "btn mt-3 h-12 w-full justify-between pr-2 pl-5 text-sm",
                        p.featured ? "btn-primary" : "btn-secondary",
                      )}
                    >
                      {copy.packages.cta}
                      <span className={cn("round-icon h-8 w-8", p.featured ? "bg-bg/90" : "bg-white/10")}>
                        <ArrowUpRight className="arrow-nudge h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </PackagesRail>
      </div>

      <div className="container-x">
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted md:mt-14">
          {copy.packages.footnote}
        </p>
      </div>
    </section>
  );
}
