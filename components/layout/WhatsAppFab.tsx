import { WhatsAppIcon } from "@/components/ui/icons";
import { DEFAULT_WA_TEXT, waLink } from "@/lib/site-config";

/** Yalnızca masaüstü: sağ altta yüzen WhatsApp butonu. */
export function WhatsAppFab() {
  return (
    <a
      href={waLink(DEFAULT_WA_TEXT)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan yazın"
      className="group fixed right-6 bottom-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_12px_32px_-10px_rgb(31_157_85/0.7)] transition-transform duration-300 ease-(--ease-spring) hover:scale-105 active:scale-95 lg:grid"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-[calc(100%+12px)] rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-fg opacity-0 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        WhatsApp&apos;tan yazın
      </span>
    </a>
  );
}
