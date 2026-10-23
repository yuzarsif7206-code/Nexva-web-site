"use client";

import { useEffect } from "react";

/**
 * Sitenin tüm "iyileştirme" katmanı tek küçük istemci bileşeninde:
 * - Scroll reveal: [data-reveal] öğeleri, ekranın altındaysa gizlenip görünür alana girince belirir.
 *   JS yoksa veya reduced-motion açıksa hiçbir şey gizlenmez.
 * - Spotlight: .spot kartlarında imleç konumu (--mx/--my), yalnızca ince imleçte.
 * - Masaüstü (≥1024, pointer:fine): Lenis ve özel imleç boşta kalma anında dinamik yüklenir.
 */
export function Enhancements() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // ---------- Reveal ----------
    if (!reduced && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      const scan = () => {
        const vh = window.innerHeight;
        document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-bound])").forEach((el) => {
          el.setAttribute("data-reveal-bound", "");
          const r = el.getBoundingClientRect();
          // ilk ekrandaki öğeler hemen görünür kalır (CLS/LCP ve "boş sayfa" riski yok)
          if (r.top < vh * 0.92 && r.bottom > 0) return;
          const d = el.dataset.reveal;
          if (d) el.style.setProperty("--rd", d);
          el.classList.add("reveal-armed");
          io.observe(el);
        });
      };
      scan();
      let raf = 0;
      const mo = new MutationObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(scan);
      });
      mo.observe(document.body, { childList: true, subtree: true });
      cleanups.push(() => {
        io.disconnect();
        mo.disconnect();
        cancelAnimationFrame(raf);
      });
    }

    // ---------- Spotlight ----------
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      let raf = 0;
      let last: PointerEvent | null = null;
      const onMove = (e: PointerEvent) => {
        last = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (!last) return;
          const t = (last.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
          if (!t) return;
          const r = t.getBoundingClientRect();
          t.style.setProperty("--mx", `${last.clientX - r.left}px`);
          t.style.setProperty("--my", `${last.clientY - r.top}px`);
        });
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
      });
    }

    // ---------- Masaüstü: Lenis + imleç ----------
    const desktop = matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (desktop && !reduced) {
      let cancelled = false;
      const destroyers: (() => void)[] = [];
      const boot = async () => {
        const [{ initSmoothScroll }, { initCursor }] = await Promise.all([
          import("./smooth-scroll"),
          import("./cursor"),
        ]);
        if (cancelled) return;
        destroyers.push(await initSmoothScroll(), initCursor());
      };
      const w = window as Window & typeof globalThis;
      const hasIdle = typeof w.requestIdleCallback === "function";
      const idle = hasIdle
        ? w.requestIdleCallback(() => void boot(), { timeout: 2500 })
        : w.setTimeout(() => void boot(), 1200);
      cleanups.push(() => {
        cancelled = true;
        if (hasIdle) w.cancelIdleCallback(idle);
        else w.clearTimeout(idle);
        destroyers.forEach((d) => d());
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
