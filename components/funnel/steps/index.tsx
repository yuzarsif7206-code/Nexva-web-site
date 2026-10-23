"use client";

import { Info } from "lucide-react";
import { labels } from "@/lib/labels";
import {
  ASAMALAR,
  BUTCELER,
  REKLAM_BUTCELERI,
  ZAMANLAMALAR,
  type Asama,
  type Butce,
  type ReklamButcesi,
  type Zamanlama,
} from "@/lib/validation";
import { StepChoice } from "./StepChoice";

export function StepStage({ value, onPick }: { value?: Asama; onPick: (v: Asama) => void }) {
  return (
    <StepChoice
      title="Markanız hangi aşamada?"
      options={ASAMALAR.map((v) => ({ value: v, label: labels.asama[v] }))}
      value={value}
      onPick={onPick}
    />
  );
}

export function StepBudget({ value, onPick }: { value?: Butce; onPick: (v: Butce) => void }) {
  return (
    <StepChoice
      title="Düşündüğünüz hizmet bütçesi aralığı?"
      note="Aylık ya da proje bazlı, size uygun olan aralığı seçin. Kesin rakam gerekmez."
      options={BUTCELER.map((v) => ({ value: v, label: labels.butce[v] }))}
      value={value}
      onPick={onPick}
    />
  );
}

export function StepAdBudget({ value, onPick }: { value?: ReklamButcesi; onPick: (v: ReklamButcesi) => void }) {
  return (
    <StepChoice
      title="Aylık reklam harcaması planınız?"
      note={
        <p className="flex gap-2 rounded-xl bg-white/[0.04] p-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          Bu tutar Meta/Google&apos;a ödenen reklam harcamasıdır, hizmet bedelinden ayrıdır.
        </p>
      }
      options={REKLAM_BUTCELERI.map((v) => ({ value: v, label: labels.reklamButcesi[v] }))}
      value={value}
      onPick={onPick}
    />
  );
}

export function StepTiming({ value, onPick }: { value?: Zamanlama; onPick: (v: Zamanlama) => void }) {
  return (
    <StepChoice
      title="Ne zaman başlamak istersiniz?"
      options={ZAMANLAMALAR.map((v) => ({ value: v, label: labels.zamanlama[v] }))}
      value={value}
      onPick={onPick}
    />
  );
}
