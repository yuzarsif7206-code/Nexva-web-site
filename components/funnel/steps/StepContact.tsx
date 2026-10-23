"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { formatPhoneInput } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { KANALLAR, type Kanal } from "@/lib/validation";
import { labels } from "@/lib/labels";
import { StepShell } from "../StepShell";
import type { Draft } from "../funnel-logic";

export type ContactField = "ad" | "firma" | "telefon" | "kanal" | "eposta" | "not" | "kvkk";
export type ContactErrors = Partial<Record<ContactField, string>>;

const KANAL_ICON: Record<Kanal, React.ReactNode> = {
  whatsapp: <WhatsAppIcon className="h-4 w-4" />,
  telefon: <Phone className="h-4 w-4" aria-hidden />,
  eposta: <Mail className="h-4 w-4" aria-hidden />,
};

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold">
        {label}
        {optional && <span className="text-xs font-normal text-muted">İsteğe bağlı</span>}
      </label>
      {children}
      <p id={`${id}-err`} aria-live="polite" className="min-h-0 text-sm font-medium text-accent empty:hidden [&:not(:empty)]:mt-1.5">
        {error ?? ""}
      </p>
    </div>
  );
}

export function StepContact({
  draft,
  errors,
  onChange,
  onBlur,
  hpRef,
}: {
  draft: Draft;
  errors: ContactErrors;
  onChange: <K extends ContactField>(k: K, v: Draft[K]) => void;
  onBlur: (k: ContactField) => void;
  hpRef: React.RefObject<HTMLInputElement | null>;
}) {
  const aria = (k: ContactField) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": `f-${k}-err`,
  });

  return (
    <StepShell title="Size nasıl ulaşalım?">
      <div className="grid gap-5">
        <Field id="f-ad" label="Ad soyad" error={errors.ad}>
          <input
            id="f-ad"
            name="name"
            className="field"
            autoComplete="name"
            enterKeyHint="next"
            maxLength={80}
            value={draft.ad}
            onChange={(e) => onChange("ad", e.target.value)}
            onBlur={() => onBlur("ad")}
            required
            {...aria("ad")}
          />
        </Field>

        <Field id="f-firma" label="Firma" optional error={errors.firma}>
          <input
            id="f-firma"
            name="organization"
            className="field"
            autoComplete="organization"
            enterKeyHint="next"
            maxLength={120}
            value={draft.firma}
            onChange={(e) => onChange("firma", e.target.value)}
            onBlur={() => onBlur("firma")}
            {...aria("firma")}
          />
        </Field>

        <Field id="f-telefon" label="Cep telefonu" error={errors.telefon}>
          <input
            id="f-telefon"
            name="tel"
            type="tel"
            inputMode="tel"
            className="field tabular-nums"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder="05XX XXX XX XX"
            value={draft.telefon}
            onChange={(e) => onChange("telefon", formatPhoneInput(e.target.value))}
            onBlur={() => onBlur("telefon")}
            required
            {...aria("telefon")}
          />
        </Field>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Size hangi kanaldan dönelim?</legend>
          <div className="grid grid-cols-3 gap-2">
            {KANALLAR.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={draft.kanal === k}
                onClick={() => onChange("kanal", k)}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-2 rounded-xl border px-2 text-sm font-semibold transition-colors",
                  draft.kanal === k
                    ? "border-accent bg-accent/10 text-fg"
                    : "border-white/10 bg-surface-2 text-fg/80 hover:border-white/25",
                )}
              >
                {KANAL_ICON[k]}
                {labels.kanal[k]}
              </button>
            ))}
          </div>
        </fieldset>

        {draft.kanal === "eposta" && (
          <Field id="f-eposta" label="E-posta" error={errors.eposta}>
            <input
              id="f-eposta"
              name="email"
              type="email"
              inputMode="email"
              className="field"
              autoComplete="email"
              enterKeyHint="next"
              maxLength={160}
              value={draft.eposta}
              onChange={(e) => onChange("eposta", e.target.value)}
              onBlur={() => onBlur("eposta")}
              required
              {...aria("eposta")}
            />
          </Field>
        )}

        <Field id="f-not" label="Not" optional error={errors.not}>
          <textarea
            id="f-not"
            name="message"
            className="field min-h-28 resize-y"
            enterKeyHint="done"
            maxLength={1000}
            rows={3}
            placeholder="Markanız ve beklentiniz hakkında kısaca yazabilirsiniz."
            value={draft.not}
            onChange={(e) => onChange("not", e.target.value)}
            onBlur={() => onBlur("not")}
            {...aria("not")}
          />
          <p className="mt-1 text-right text-xs text-muted tabular-nums">{draft.not.length}/1000</p>
        </Field>

        {/* honeypot: insanlar görmez */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="f-website">Web siteniz</label>
          <input id="f-website" ref={hpRef} name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl p-1">
            <input
              id="f-kvkk"
              type="checkbox"
              className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-[#E5311B]"
              checked={draft.kvkk}
              onChange={(e) => onChange("kvkk", e.target.checked)}
              aria-describedby="f-kvkk-err"
              aria-invalid={errors.kvkk ? true : undefined}
            />
            <span className="text-[0.9375rem] text-fg/85">
              <Link
                href="/kvkk"
                target="_blank"
                className="font-semibold text-fg underline underline-offset-4 hover:text-accent"
              >
                KVKK Aydınlatma Metni
              </Link>
              &apos;ni okudum, bilgilerimin talebimin değerlendirilmesi için işlenmesini kabul ediyorum.
            </span>
          </label>
          <p id="f-kvkk-err" aria-live="polite" className="text-sm font-medium text-accent empty:hidden [&:not(:empty)]:mt-1.5">
            {errors.kvkk ?? ""}
          </p>
        </div>
      </div>
    </StepShell>
  );
}
