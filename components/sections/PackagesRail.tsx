"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Mobil/tablet: yatay scroll-snap şeridi. Başlangıçta öne çıkan paket ortalanır,
 * ortadaki kart scale(1), yanlar scale(.96). Altta nokta göstergesi.
 * Masaüstünde (≥1024) yalnızca grid; bu kabuk hiçbir şey yapmaz.
 */
export function PackagesRail({
  names,
  featuredIndex,
  children,
}: {
  names: string[];
  featuredIndex: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(featuredIndex);

  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;
    const items = Array.from(strip.querySelectorAll<HTMLElement>("[data-pkg]"));
    const mq = matchMedia("(max-width: 1023px)");

    const center = (i: number, smooth: boolean) => {
      const el = items[i];
      if (!el) return;
      const left = el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2;
      strip.scrollTo({ left, behavior: smooth ? "smooth" : "instant" });
    };
    if (mq.matches) center(featuredIndex, false);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const on = e.intersectionRatio >= 0.6;
          el.dataset.active = String(on);
          if (on) setActive(items.indexOf(el));
        }
      },
      { root: strip, threshold: [0.6] },
    );
    items.forEach((el) => io.observe(el));

    const onGo = (e: Event) => center((e as CustomEvent<number>).detail, true);
    strip.addEventListener("pkg:go", onGo);
    return () => {
      io.disconnect();
      strip.removeEventListener("pkg:go", onGo);
    };
  }, [featuredIndex]);

  return (
    <>
      <div ref={ref} className="pkg-strip no-scrollbar">
        {children}
      </div>
      <div className="mt-6 flex justify-center lg:hidden" role="group" aria-label="Paket göstergesi">
        {names.map((n, i) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} paketine git`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => ref.current?.dispatchEvent(new CustomEvent("pkg:go", { detail: i }))}
            className="grid h-12 w-12 place-items-center"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-[width,background-color] duration-300",
                active === i ? "w-6 bg-accent" : "w-2 bg-white/25",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
