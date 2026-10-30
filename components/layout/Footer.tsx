import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { DEFAULT_WA_TEXT, NAV, SITE, mapsLink, waLink } from "@/lib/site-config";
import { CurrentYear } from "./CurrentYear";

const PAGES = [{ href: "/", label: "Ana Sayfa" }, ...NAV, { href: "/teklif-al", label: "Teklif Al" }];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-bg" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site alt bilgisi
      </h2>
      {/* üstte ince ark ayracı */}
      <svg
        aria-hidden
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-10 w-full"
      >
        <path d="M0 40 Q600 -30 1200 40" fill="none" stroke="url(#ft-arc)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="ft-arc" x1="0" x2="1">
            <stop offset="0" stopColor="#B3162B" stopOpacity="0" />
            <stop offset=".5" stopColor="#E5311B" />
            <stop offset="1" stopColor="#B3162B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-x grid gap-12 pt-16 pb-10 md:grid-cols-2 md:pt-20 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-5">
          <Logo className="self-start" size="footer" />
          <p className="future text-lg text-fg">
            MARKANIZI DİJİTALDE <span className="text-accent">BÜYÜTÜN.</span>
          </p>
          <p className="max-w-xs text-sm text-muted">{copy.footer.blurb}</p>
        </div>

        <nav aria-label="Sayfalar">
          <h3 className="eyebrow mb-5 text-muted">Sayfalar</h3>
          <ul className="flex flex-col">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-fg/85 transition-colors hover:text-accent"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-5 text-muted">İletişim</h3>
          <ul className="flex flex-col gap-1 text-[0.9375rem]">
            <li>
              <a
                href={`tel:${SITE.phone.tel}`}
                className="inline-flex min-h-11 items-center gap-3 text-fg/85 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden />
                {SITE.phone.display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-11 items-center gap-3 break-all text-fg/85 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-3 py-2 text-fg/85 transition-colors hover:text-accent"
              >
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <address className="not-italic leading-relaxed">
                  {SITE.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram: ${SITE.social.instagramHandle}`}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-[background-color,border-color,transform] duration-200 hover:border-accent hover:bg-accent active:scale-95"
            >
              <InstagramIcon />
            </a>
            <a
              href={waLink(DEFAULT_WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp'tan yazın"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-[background-color,border-color,transform] duration-200 hover:border-accent hover:bg-accent active:scale-95"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-5 text-muted">Çalışma saatleri</h3>
          <ul className="flex flex-col gap-3 text-[0.9375rem]">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>
                  <span className="block text-fg/85">{h.days}</span>
                  <span className="text-muted">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-white/[0.06] py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> Nexva Digital. Tüm hakları saklıdır.
        </p>
        <Link href="/kvkk" className="inline-flex min-h-11 items-center transition-colors hover:text-fg">
          KVKK Aydınlatma Metni
        </Link>
      </div>

      {/* dev arka plan yazısı */}
      <span
        aria-hidden
        data-text="NEXVA"
        className="ghost-text display pointer-events-none -mb-[0.18em] block text-center text-[22vw] leading-none text-white/[0.025] select-none"
      />
    </footer>
  );
}
