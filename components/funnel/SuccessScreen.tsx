"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";

// 18 küçük kırmızı kare: tek seferlik piksel çözülmesi (CSS, 1.2 s)
const PIX = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 23) % 40,
  s: 4 + (i % 3) * 2,
  d: (i % 6) * 90,
}));

export function SuccessScreen({ waHref, notified }: { waHref: string; notified: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);
  const { funnelSuccess } = copy;
  return (
    <div className="relative py-6">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-48 overflow-hidden">
        {PIX.map((p, i) => (
          <span
            key={i}
            className="success-pixel absolute bg-accent"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}ms`,
            }}
          />
        ))}
      </div>
      <h2 ref={ref} tabIndex={-1} className="display h2-section relative outline-none">
        <span className="mask-line">
          <span>{funnelSuccess.title}</span>
        </span>
      </h2>
      <p className="relative mt-5 max-w-lg text-[1.0625rem] text-fg/85" role="status">
        {funnelSuccess.body}
      </p>
      {!notified && (
        <p className="mt-3 max-w-lg text-sm text-muted">
          Talebiniz kaydedildi. Daha hızlı dönüş için aşağıdaki butonla WhatsApp&apos;tan da yazabilirsiniz.
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn h-14 bg-[#1f9d55] px-6 text-white hover:shadow-[0_0_40px_-8px_rgb(31_157_85/0.6)]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {funnelSuccess.wa}
        </a>
        <Link href="/" className="btn btn-secondary h-14">
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
