import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { DEFAULT_WA_TEXT, SITE, waLink } from "@/lib/site-config";

/** Yalnızca mobil (<1024). /teklif-al rota grubunda render edilmez. */
export function MobileBottomBar() {
  const item =
    "flex h-full flex-col items-center justify-center gap-1 text-[0.8125rem] font-semibold transition-[background-color,transform] duration-150 active:scale-[0.97]";
  return (
    <>
      {/* Instagram: alt çubuğun üstünde yüzen küçük buton */}
      <a
        href={SITE.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram'da takip edin: ${SITE.social.instagramHandle}`}
        className="fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,#B3162B,#E5311B_55%,#F58529)] text-white shadow-[0_10px_24px_-8px_rgb(229_49_27/0.7)] transition-transform active:scale-95 lg:hidden"
      >
        <InstagramIcon className="h-6 w-6" />
      </a>
      {/* alt çubuk payı: içerik çubuğun arkasında kalmasın */}
      <div aria-hidden className="h-[calc(4rem+env(safe-area-inset-bottom))] lg:hidden" />
      <nav
        aria-label="Hızlı iletişim"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-surface/95 pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <div className="grid h-16 grid-cols-3">
          <a href={`tel:${SITE.phone.tel}`} className={`${item} hover:bg-white/5`}>
            <Phone className="h-5 w-5" aria-hidden />
            Ara
          </a>
          <a
            href={waLink(DEFAULT_WA_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} border-x border-white/10 hover:bg-white/5`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
          <Link href="/teklif-al" className={`${item} bg-accent-strong text-white`}>
            <ArrowUpRight className="h-5 w-5" aria-hidden />
            Teklif Al
          </Link>
        </div>
      </nav>
    </>
  );
}
