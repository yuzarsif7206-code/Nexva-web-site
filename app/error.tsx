"use client";

import Link from "next/link";
import { useEffect } from "react";
import { DEFAULT_WA_TEXT, waLink } from "@/lib/site-config";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="icerik" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden className="hero-bg absolute inset-0 -z-10 opacity-70" />
      <div className="container-x flex flex-col items-center text-center">
        <h1 className="display h2-section text-balance">
          Bir şeyler <span className="text-accent">ters gitti.</span>
        </h1>
        <p className="mt-4 max-w-md text-fg/80">
          Sayfa yüklenirken beklenmedik bir sorun oluştu. Tekrar deneyebilir ya da bize WhatsApp&apos;tan
          ulaşabilirsiniz.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button type="button" onClick={() => retry()} className="btn btn-primary h-12">
            Tekrar dene
          </button>
          <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary h-12">
            WhatsApp&apos;tan yaz
          </a>
          <Link href="/" className="btn btn-secondary h-12">
            Ana sayfa
          </Link>
        </div>
      </div>
    </main>
  );
}
