import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Resmi Nexva logosu (görsel olduğu gibi kullanılır, yalnızca boyutlandırılır) + yazı logosu. */
export function LogoImage({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/nexva-logo-256.webp"
      alt=""
      width={256}
      height={256}
      sizes="48px"
      priority={priority}
      className={cn("h-10 w-10 shrink-0 lg:h-11 lg:w-11", className)}
    />
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Nexva Digital ana sayfa"
      className={cn("group inline-flex min-h-12 items-center gap-2.5 rounded-lg pr-1 text-fg", className)}
    >
      <LogoImage />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] font-extrabold italic tracking-[-0.01em]">NEXVA</span>
        {/* lang="en": Türkçe büyük harf kuralı "I"yı "İ" yapmasın */}
        <span lang="en" className="mt-0.5 text-[0.5625rem] font-semibold tracking-[0.32em] text-muted">
          DIGITAL
        </span>
      </span>
    </Link>
  );
}
