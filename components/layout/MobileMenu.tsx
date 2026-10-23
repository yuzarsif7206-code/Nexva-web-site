"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { DEFAULT_WA_TEXT, NAV, SITE, waLink } from "@/lib/site-config";

const LINKS = [...NAV, { href: "/teklif-al", label: "Teklif Al" }] as const;

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        el?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    // ilk odak: kapat butonu
    requestAnimationFrame(() => focusables()[1]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  // Gezinmeden sonra (Activity ile durum korunduğu için) menüyü kapat
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      if (open) onClose();
    }
  }, [pathname, open, onClose]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
      data-open={open}
      inert={!open}
      className="menu-curtain fixed inset-0 z-[80] flex flex-col bg-bg lg:hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-bg opacity-40" />
      <div className="container-x relative flex h-16 items-center justify-between">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Menüyü kapat"
          className="-mr-2 grid h-12 w-12 place-items-center rounded-full transition-[background-color,transform] duration-200 hover:bg-white/5 active:scale-95"
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <nav aria-label="Mobil menü" className="container-x relative flex flex-1 flex-col justify-center">
        <ul className="flex flex-col gap-1">
          {LINKS.map((item, i) => (
            <li key={item.href} className="menu-item" style={{ ["--i" as string]: i }}>
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={pathname === item.href ? "page" : undefined}
                className="display group flex min-h-16 items-center justify-between border-b border-white/[0.08] py-2 text-[clamp(2.5rem,12vw,3.5rem)] transition-colors duration-200 hover:text-accent aria-[current=page]:text-accent"
              >
                {item.label}
                <ArrowUpRight
                  aria-hidden
                  className="h-7 w-7 text-muted transition-transform duration-300 ease-(--ease-spring) group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="menu-item container-x relative grid grid-cols-3 gap-2 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        style={{ ["--i" as string]: LINKS.length }}
      >
        <a
          href={`tel:${SITE.phone.tel}`}
          className="glass flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold transition-transform active:scale-95"
        >
          <Phone className="h-5 w-5" aria-hidden />
          Ara
        </a>
        <a
          href={waLink(DEFAULT_WA_TEXT)}
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold transition-transform active:scale-95"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
        <a
          href={SITE.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold transition-transform active:scale-95"
        >
          <InstagramIcon className="h-5 w-5" />
          Instagram
        </a>
      </div>
    </div>
  );
}
