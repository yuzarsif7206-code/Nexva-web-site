import type { Metadata } from "next";
import Link from "next/link";
import { PixelDissolve } from "@/components/brand/PixelDissolve";
import { Logo } from "@/components/brand/Logo";
import { PillCta } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: { absolute: "Sayfa bulunamadı | Nexva Digital" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="icerik" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden className="hero-bg absolute inset-0 -z-10 opacity-80" />
      <PixelDissolve className="-z-10" />
      <div className="container-x flex h-16 items-center lg:h-20">
        <Logo />
      </div>
      <div className="container-x flex flex-1 flex-col items-center justify-center py-16 text-center">
        <span
          aria-hidden
          data-text="404"
          className="ghost-text display block text-[clamp(6rem,30vw,14rem)] leading-none text-white/10"
        />
        <h1 className="display h2-section -mt-4 text-balance md:-mt-8">
          Bu sayfa <span className="text-accent">dağıldı.</span>
        </h1>
        <p className="mt-4 max-w-md text-fg/80">
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfaya dönebilir ya da doğrudan teklif
          alabilirsiniz.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <PillCta href="/teklif-al">Teklif Al</PillCta>
          <Link href="/" className="btn btn-secondary h-14">
            Ana sayfa
          </Link>
        </div>
      </div>
    </main>
  );
}
