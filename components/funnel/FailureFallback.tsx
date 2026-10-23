"use client";

import { useEffect, useRef } from "react";
import { Phone, RotateCcw } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { SITE } from "@/lib/site-config";

/** Gönderim başarısızsa müşteri talebi kaybetmez: hazır mesajlı WhatsApp + Ara. */
export function FailureFallback({
  waHref,
  onRetry,
  rateLimited,
}: {
  waHref: string;
  onRetry: () => void;
  rateLimited?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);
  const { funnelFailure } = copy;
  return (
    <div className="py-6" role="alert">
      <h2 ref={ref} tabIndex={-1} className="display h2-section outline-none">
        {funnelFailure.title}
      </h2>
      <p className="mt-5 max-w-lg text-[1.0625rem] text-fg/85">
        {rateLimited
          ? "Kısa sürede çok sayıda talep gönderildi. Bilgileriniz aşağıdaki hazır mesajla WhatsApp'tan bize ulaşabilir. Ya da bizi arayın."
          : funnelFailure.body}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn h-14 bg-[#1f9d55] px-6 text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {funnelFailure.wa}
        </a>
        <a href={`tel:${SITE.phone.tel}`} className="btn btn-secondary h-14">
          <Phone className="h-5 w-5" aria-hidden />
          {funnelFailure.call}
        </a>
      </div>
      {!rateLimited && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Tekrar göndermeyi dene
        </button>
      )}
    </div>
  );
}
