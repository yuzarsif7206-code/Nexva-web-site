"use client";

import { useEffect, useRef } from "react";

const R = 52;
const C = 2 * Math.PI * R;

/**
 * Masaüstü süreç halkası: adımlar listesinin kaydırma ilerlemesi halka dolulğunu sürer.
 * React state yok; DOM doğrudan güncellenir (rAF ile, yalnızca değişince).
 */
export function ProcessRing({ targetId, total }: { targetId: string; total: number }) {
  const arc = useRef<SVGCircleElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = document.getElementById(targetId);
    if (!list || !matchMedia("(min-width: 1024px)").matches) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    let raf = 0;
    let lastP = -1;
    let lastI = -1;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / r.height));
      if (Math.abs(p - lastP) > 0.002 && arc.current) {
        arc.current.style.strokeDashoffset = String(C * (1 - p));
        lastP = p;
      }
      let idx = 0;
      steps.forEach((s, i) => {
        if (s.getBoundingClientRect().top < vh * 0.6) idx = i;
      });
      if (idx !== lastI) {
        lastI = idx;
        steps.forEach((s, i) => (s.dataset.current = String(i === idx)));
        if (num.current) num.current.textContent = String(idx + 1).padStart(2, "0");
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div className="relative hidden h-40 w-40 lg:block" aria-hidden>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="4" />
        <circle
          ref={arc}
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="#E5311B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <p className="display text-5xl tabular-nums">
          <span ref={num}>01</span>
          <span className="text-2xl text-muted">/{String(total).padStart(2, "0")}</span>
        </p>
      </div>
    </div>
  );
}
