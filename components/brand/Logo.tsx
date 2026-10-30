import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Resmi Nexva logosu: verilen görsel, yalnızca arka planı şeffaflaştırılıp boyutlandırıldı
 * (tasarım, renk ve oran değişmedi). Kaynak oran 224×256.
 */
export function LogoImage({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/nexva-logo.webp"
      alt=""
      width={224}
      height={256}
      // 256 px kaynak doğrudan sunulur: 60 px yükseklikte 4× ekranlarda bile keskin (≈22 KB)
      unoptimized
      priority={priority}
      // className verilirse varsayılan yüksekliğin yerine geçer (çakışan sınıf olmasın)
      className={cn("w-auto shrink-0", className ?? "h-[54px] lg:h-[76px]")}
    />
  );
}

/** Logo + "NEXVA DIGITAL" yazısı tek birim (kilit) olarak, sola hizalı. */
export function Logo({
  className,
  onClick,
  size = "nav",
}: {
  className?: string;
  onClick?: () => void;
  size?: "nav" | "footer";
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Nexva Digital ana sayfa"
      className={cn("group inline-flex min-h-12 items-center gap-2.5 rounded-lg pr-1 text-fg lg:gap-3", className)}
    >
      <LogoImage priority={size === "nav"} className={size === "footer" ? "h-[64px] lg:h-[72px]" : undefined} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.625rem] font-extrabold italic tracking-[-0.01em] lg:text-[2rem]">NEXVA</span>
        {/* lang="en": Türkçe büyük harf kuralı "I"yı "İ" yapmasın */}
        <span lang="en" className="mt-1 text-[0.6875rem] font-semibold tracking-[0.32em] text-muted lg:text-[0.75rem]">
          DIGITAL
        </span>
      </span>
    </Link>
  );
}
