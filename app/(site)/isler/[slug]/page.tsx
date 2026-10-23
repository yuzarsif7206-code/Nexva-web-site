import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PillCta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/works/Lightbox";
import { WorkCover } from "@/components/works/WorkCard";
import { labels } from "@/lib/labels";
import { pageMetadata } from "@/lib/seo";
import { categoryLabels, getWork, getWorks } from "@/content/works";
import { placeholderWorks } from "@/content/works.placeholder";

export function generateStaticParams() {
  const list = getWorks();
  // Cache Components: en az bir parametre gerekli. Gerçek iş yoksa tek bir yer tutucu yol
  // üretilir; getWork bulamadığı için 404 döner (sayfa yayında görünmez).
  return (list.length ? list : placeholderWorks.slice(0, 1)).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/isler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Bulunamadı", robots: { index: false, follow: false } };
  return pageMetadata({
    title: work.title,
    description: work.summary,
    path: `/isler/${work.slug}`,
    noindex: work.placeholder,
    images: work.cover.src
      ? [{ url: work.cover.src, width: work.cover.width, height: work.cover.height, alt: work.cover.alt }]
      : undefined,
  });
}

export default async function WorkDetailPage({ params }: PageProps<"/isler/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const all = getWorks();
  const idx = all.findIndex((w) => w.slug === work.slug);
  const prev = all.length > 1 ? all[(idx - 1 + all.length) % all.length] : undefined;
  const next = all.length > 1 ? all[(idx + 1) % all.length] : undefined;

  return (
    <article className="pt-28 md:pt-36">
      <header className="container-x">
        <Link
          href="/isler"
          className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Tüm işler
        </Link>
        <Eyebrow className="mt-6">{categoryLabels[work.category]}</Eyebrow>
        <h1 className="display h1-hero mt-4 max-w-5xl text-balance">{work.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-white/15 px-3 py-1 tabular-nums">{work.year}</span>
          {work.client && <span className="rounded-full border border-white/15 px-3 py-1">{work.client}</span>}
          {work.services.map((s) => (
            <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-muted">
              {labels.hizmet[s]}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-fg/85">{work.summary}</p>
      </header>

      <div className="container-x mt-10 md:mt-14">
        <WorkCover work={work} priority sizes="(min-width:1280px) 1184px, 100vw" />
      </div>

      {work.gallery.length > 0 && (
        <section aria-label="Galeri" className="container-x mt-4 md:mt-6">
          <Lightbox images={work.gallery} />
        </section>
      )}

      <section aria-labelledby="work-cta" className="container-x mt-16 md:mt-24">
        <div className="card card-gradient flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <h2 id="work-cta" className="display text-[clamp(2rem,6vw,3.25rem)] text-balance">
            Benzer bir iş mi istiyorsunuz?
          </h2>
          <PillCta href="/teklif-al">Teklif Al</PillCta>
        </div>
      </section>

      {prev && next && (
        <nav aria-label="Diğer projeler" className="container-x mt-10 grid grid-cols-2 gap-4 pb-16 md:pb-24">
          <Link
            href={`/isler/${prev.slug}`}
            className="card group flex min-h-24 flex-col justify-center gap-1 p-5 transition-colors hover:border-white/25"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Önceki
            </span>
            <span className="display text-xl group-hover:text-accent md:text-2xl">{prev.title}</span>
          </Link>
          <Link
            href={`/isler/${next.slug}`}
            className="card group flex min-h-24 flex-col items-end justify-center gap-1 p-5 text-right transition-colors hover:border-white/25"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              Sonraki <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="display text-xl group-hover:text-accent md:text-2xl">{next.title}</span>
          </Link>
        </nav>
      )}
      {!(prev && next) && <div className="pb-16 md:pb-24" />}
    </article>
  );
}
