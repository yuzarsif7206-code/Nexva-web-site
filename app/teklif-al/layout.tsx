import Link from "next/link";
import { X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

/** Tam ekran, odaklı sayfa: yalnızca logo ve "Kapat". Alt çubuk, footer ve WhatsApp butonu yok. */
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-[100svh]">
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60svh] opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[30svh] -z-10 h-[30svh] bg-gradient-to-b from-transparent to-bg" />
      <header className="relative isolate z-10 supports-[backdrop-filter]:backdrop-blur-md">
        <div aria-hidden className="nav-scrim" />
        <div aria-hidden className="nav-line" />
        <div className="container-x relative flex h-[78px] items-center justify-between lg:h-[116px]">
          <Logo />
          <Link
            href="/"
            className="-mr-2 inline-flex min-h-12 items-center gap-2 rounded-full px-3 text-sm font-semibold text-fg/85 transition-colors hover:bg-white/5 hover:text-fg"
          >
            Kapat
            <X className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </header>
      <main id="icerik" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </div>
  );
}
