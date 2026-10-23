"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OptionCard({
  selected,
  onClick,
  title,
  description,
  multi,
  icon,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  multi?: boolean;
  icon?: React.ReactNode;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-[border-color,background-color,transform,box-shadow] duration-200 active:scale-[0.99] md:px-5",
        selected
          ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgb(229_49_27/0.18)]"
          : "border-white/10 bg-surface-2 hover:border-white/25",
      )}
    >
      {icon && (
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors",
            selected ? "bg-accent text-white" : "bg-white/5 text-accent",
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-fg">{title}</span>
          {badge && (
            <span className="rounded-full border border-accent/50 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-accent uppercase">
              {badge}
            </span>
          )}
        </span>
        {description && <span className="mt-0.5 block text-sm text-muted">{description}</span>}
      </span>
      <span
        aria-hidden
        className={cn(
          "grid h-6 w-6 shrink-0 place-items-center border-2 transition-colors",
          multi ? "rounded-md" : "rounded-full",
          selected ? "border-accent bg-accent text-white" : "border-white/25",
        )}
      >
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
      </span>
    </button>
  );
}
