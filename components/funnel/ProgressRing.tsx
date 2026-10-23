"use client";

import { m } from "framer-motion";

const R = 26;
const C = 2 * Math.PI * R;

/** Logodaki yaya benzeyen dairesel ilerleme, ortada "2/5". */
export function ProgressRing({ current, total }: { current: number; total: number }) {
  const p = Math.min(1, current / total);
  return (
    <div
      className="relative h-16 w-16 shrink-0"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Adım ${current} / ${total}`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={R} fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="4" />
        <m.circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="#E5311B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={false}
          animate={{ strokeDashoffset: C * (1 - p) }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-bold tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}
