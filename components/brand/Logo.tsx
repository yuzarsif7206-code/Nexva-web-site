import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Nexva Dijital ana sayfa"
      className={cn(
        "group inline-flex min-h-12 items-center gap-2.5 rounded-lg pr-1 text-fg",
        className,
      )}
    >
      <LogoMark decorative className="h-9 w-9 transition-transform duration-500 ease-(--ease-spring) group-hover:-rotate-12" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] font-extrabold italic tracking-[-0.01em]">NEXVA</span>
        <span className="mt-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.32em] text-muted">
          Dijital
        </span>
      </span>
    </Link>
  );
}
