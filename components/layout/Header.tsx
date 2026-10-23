"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // Yalnızca masaüstünde: aşağı kayınca gizle, yukarı kayınca göster
      const desktop = window.innerWidth >= 1024;
      if (desktop && y > 240 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y <= 240) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        data-hidden={hidden && !open}
        className={cn(
          "header-shell fixed inset-x-0 top-0 z-50 border-b",
          scrolled
            ? "border-white/[0.06] bg-bg/85 supports-[backdrop-filter]:bg-bg/70 supports-[backdrop-filter]:backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
          <Logo onClick={close} />

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative inline-flex h-12 items-center px-4 text-[0.9375rem] font-medium text-fg/80 transition-colors duration-200 hover:text-fg aria-[current=page]:text-fg"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-2.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-(--ease-spring)",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end">
            <Link
              href="/teklif-al"
              className="group hidden h-11 items-center gap-1.5 rounded-full border border-white/30 px-5 text-sm font-semibold tracking-wide uppercase transition-[background-color,color,border-color,transform] duration-200 hover:border-fg hover:bg-fg hover:text-bg active:scale-[0.98] lg:inline-flex"
            >
              Teklif Al
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 ease-(--ease-spring) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Menüyü aç"
              className="-mr-2 grid h-12 w-12 place-items-center rounded-full text-fg transition-[background-color,transform] duration-200 hover:bg-white/5 active:scale-95 lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} pathname={pathname} />
    </>
  );
}
