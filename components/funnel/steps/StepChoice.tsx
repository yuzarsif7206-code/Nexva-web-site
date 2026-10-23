"use client";

import { OptionCard } from "../OptionCard";
import { StepShell } from "../StepShell";

/** Tek seçimli adım: seçince otomatik ilerler (üst bileşen 250 ms sonra geçer). */
export function StepChoice<T extends string>({
  title,
  note,
  options,
  value,
  onPick,
}: {
  title: string;
  note?: React.ReactNode;
  options: { value: T; label: string }[];
  value?: T;
  onPick: (v: T) => void;
}) {
  return (
    <StepShell title={title} note={note}>
      <div className="grid gap-2.5" role="group" aria-label={title}>
        {options.map((o) => (
          <OptionCard key={o.value} title={o.label} selected={value === o.value} onClick={() => onPick(o.value)} />
        ))}
      </div>
    </StepShell>
  );
}
