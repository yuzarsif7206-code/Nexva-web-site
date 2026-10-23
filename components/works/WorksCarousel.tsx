"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pad2 } from "@/lib/utils";

/** WebGL'siz CSS scroll-snap carousel. Sayaç IntersectionObserver ile, DOM doğrudan güncellenir. */
export function WorksCarousel({ total, children }: { total: number; children: React.ReactNode }) {
  const strip = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && counter.current) {
            counter.current.textContent = pad2(items.indexOf(e.target as HTMLElement) + 1);
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const go = (dir: 1 | -1) => {
    const el = strip.current;
    const first = el?.querySelector<HTMLElement>("[data-slide]");
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + 16), behavior: "smooth" });
  };

  const multi = total > 1;
  return (
    <div>
      {multi && (
        <div className="container-x mb-6 flex items-center justify-between">
          <p className="display text-2xl tabular-nums" aria-live="polite">
            <span ref={counter}>01</span>
            <span className="text-muted"> / {pad2(total)}</span>
          </p>
          <div className="hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Önceki iş"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-[background-color,transform] hover:bg-surface-2 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sonraki iş"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-[background-color,transform] hover:bg-surface-2 active:scale-95"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      )}
      <div
        ref={strip}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 md:scroll-px-8 md:px-8 lg:scroll-px-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]"
      >
        {children}
      </div>
    </div>
  );
}
