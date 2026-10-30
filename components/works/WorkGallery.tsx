"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categoryLabels, type Work } from "@/content/works";
import type { Group } from "@/content/services";
import { cn } from "@/lib/utils";
import { WorkCard } from "./WorkCard";

const FILTERS: { key: "tumu" | Group; label: string }[] = [
  { key: "tumu", label: "Tümü" },
  { key: "uretim", label: categoryLabels.uretim },
  { key: "performans", label: categoryLabels.performans },
  { key: "marka", label: categoryLabels.marka },
  { key: "sosyal", label: categoryLabels.sosyal },
  { key: "web", label: categoryLabels.web },
];

function Gallery({ works, active }: { works: Work[]; active: string }) {
  const list = active === "tumu" ? works : works.filter((w) => w.category === active);
  return (
    <>
      <nav aria-label="Kategori filtresi" className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <ul className="flex w-max gap-2">
          {FILTERS.map((f) => {
            const on = active === f.key;
            return (
              <li key={f.key}>
                <Link
                  href={f.key === "tumu" ? "/isler" : `/isler?kategori=${f.key}`}
                  scroll={false}
                  replace
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                    on
                      ? "border-accent-strong bg-accent-strong text-white"
                      : "border-white/15 bg-white/5 text-fg/85 hover:border-white/30",
                  )}
                >
                  {f.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="sr-only" aria-live="polite">
        {list.length} iş gösteriliyor
      </p>

      {list.length === 0 ? (
        <p className="mt-10 text-muted">Bu kategoride henüz yayınlanmış bir iş yok.</p>
      ) : (
        <ul className="mt-8 columns-2 gap-3 md:gap-5 lg:columns-3">
          {list.map((w, i) => (
            <li key={w.slug} className="mb-6 break-inside-avoid md:mb-8">
              <WorkCard
                work={w}
                headingLevel="h2"
                priority={i < 2}
                sizes="(min-width:1024px) 400px, 50vw"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function GalleryWithParams({ works }: { works: Work[] }) {
  const params = useSearchParams();
  const k = params.get("kategori") ?? "tumu";
  const active = FILTERS.some((f) => f.key === k) ? k : "tumu";
  return <Gallery works={works} active={active} />;
}

/** Filtreleme istemcide, URL'de ?kategori=. Suspense fallback'i: filtresiz liste. */
export function WorkGallery({ works, fallback }: { works: Work[]; fallback?: boolean }) {
  return fallback ? <Gallery works={works} active="tumu" /> : <GalleryWithParams works={works} />;
}
