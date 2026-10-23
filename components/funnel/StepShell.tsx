"use client";

import { useEffect, useRef } from "react";

/** Tek soru başlığı + içerik. Adım değişince başlığa odaklanır (klavye ve ekran okuyucu için). */
export function StepShell({
  title,
  note,
  children,
}: {
  title: string;
  note?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div>
      <h2 ref={ref} tabIndex={-1} className="display h2-section text-balance outline-none">
        {title}
      </h2>
      {note && <div className="mt-4 text-[0.9375rem] text-muted">{note}</div>}
      <div className="mt-8">{children}</div>
    </div>
  );
}
