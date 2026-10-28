import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoImage } from "@/components/brand/Logo";
import { categoryLabels, type Work } from "@/content/works";
import { cn } from "@/lib/utils";

export function WorkCover({
  work,
  sizes,
  priority,
  fixedRatio,
  className,
}: {
  work: Work;
  sizes: string;
  priority?: boolean;
  fixedRatio?: string;
  className?: string;
}) {
  const { cover } = work;
  return (
    <div
      className={cn("relative overflow-hidden rounded-[1.25rem] bg-surface md:rounded-3xl", className)}
      style={{ aspectRatio: fixedRatio ?? `${cover.width} / ${cover.height}` }}
    >
      {cover.src ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          {...(priority ? { loading: "eager" as const } : {})}
          placeholder={cover.blurDataURL ? "blur" : "empty"}
          blurDataURL={cover.blurDataURL}
          className="work-zoom object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={cover.alt}
          className="work-zoom absolute inset-0 grid place-items-center"
          style={{ background: cover.gradient }}
        >
          <LogoImage className="h-16 w-16 opacity-40 lg:h-16 lg:w-16" />
        </div>
      )}
      {/* renk işlem katmanı + alttan karartma */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {work.placeholder && (
        <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-fg uppercase">
          Örnek proje
        </span>
      )}
    </div>
  );
}

export function WorkCard({
  work,
  sizes,
  priority,
  fixedRatio,
  headingLevel = "h3",
}: {
  work: Work;
  sizes: string;
  priority?: boolean;
  fixedRatio?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <Link href={`/isler/${work.slug}`} data-cursor="view" className="work-card group block">
      <div className="relative">
        <WorkCover work={work} sizes={sizes} priority={priority} fixedRatio={fixedRatio} />
        <span className="work-view absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-accent-strong px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] text-white uppercase">
          İncele <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <H className="display text-2xl leading-none transition-colors group-hover:text-accent md:text-[1.75rem]">
          {work.title}
        </H>
        <span className="mt-0.5 shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-muted">
          {categoryLabels[work.category]}
        </span>
      </div>
    </Link>
  );
}
