import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { DEFAULT_WA_TEXT, SITE, waLink } from "@/lib/site-config";

const FAB =
  "group relative grid h-14 w-14 place-items-center rounded-full text-white transition-transform duration-300 ease-(--ease-spring) hover:scale-105 active:scale-95";
const TIP =
  "pointer-events-none absolute right-[calc(100%+12px)] rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";

/** Yalnızca masaüstü: sağ altta yüzen Instagram (üstte) ve WhatsApp butonları. */
export function WhatsAppFab() {
  return (
    <div className="fixed right-6 bottom-6 z-40 hidden flex-col gap-3 lg:flex">
      <a
        href={SITE.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram'da takip edin: ${SITE.social.instagramHandle}`}
        className={`${FAB} bg-[linear-gradient(135deg,#B3162B,#E5311B_55%,#F58529)] shadow-[0_12px_32px_-10px_rgb(229_49_27/0.7)]`}
      >
        <InstagramIcon className="h-7 w-7" />
        <span className={TIP}>Instagram&apos;da takip edin</span>
      </a>
      <a
        href={waLink(DEFAULT_WA_TEXT)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan yazın"
        className={`${FAB} bg-[#1f9d55] shadow-[0_12px_32px_-10px_rgb(31_157_85/0.7)]`}
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className={TIP}>WhatsApp&apos;tan yazın</span>
      </a>
    </div>
  );
}
