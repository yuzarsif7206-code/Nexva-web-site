"use client";

import { SITE } from "@/lib/site-config";
import { StepShell } from "../StepShell";
import type { Draft } from "../funnel-logic";

/**
 * WhatsApp modu son adımı: sunucuya gönderim yok. Cevaplar hazır mesaja dönüşür,
 * müşteri WhatsApp'tan gönderir ya da arar. İsim/firma/not isteğe bağlıdır.
 */
export function StepWhatsApp({
  draft,
  onChange,
  summary,
}: {
  draft: Draft;
  onChange: (k: "ad" | "firma" | "not", v: string) => void;
  summary: { label: string; value: string }[];
}) {
  return (
    <StepShell title="Talebinizi gönderin">
      <div className="grid gap-6">
        <dl className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm md:p-5">
          {summary.map((s) => (
            <div key={s.label} className="flex flex-wrap gap-x-2">
              <dt className="text-muted">{s.label}:</dt>
              <dd className="font-semibold text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="w-ad" className="mb-2 flex justify-between text-sm font-semibold">
              Ad soyad <span className="text-xs font-normal text-muted">İsteğe bağlı</span>
            </label>
            <input
              id="w-ad"
              className="field"
              autoComplete="name"
              maxLength={80}
              value={draft.ad}
              onChange={(e) => onChange("ad", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="w-firma" className="mb-2 flex justify-between text-sm font-semibold">
              Firma <span className="text-xs font-normal text-muted">İsteğe bağlı</span>
            </label>
            <input
              id="w-firma"
              className="field"
              autoComplete="organization"
              maxLength={120}
              value={draft.firma}
              onChange={(e) => onChange("firma", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="w-not" className="mb-2 flex justify-between text-sm font-semibold">
            Not <span className="text-xs font-normal text-muted">İsteğe bağlı</span>
          </label>
          <textarea
            id="w-not"
            className="field min-h-24 resize-y"
            rows={3}
            maxLength={1000}
            placeholder="Markanız ve beklentiniz hakkında kısaca yazabilirsiniz."
            value={draft.not}
            onChange={(e) => onChange("not", e.target.value)}
          />
        </div>

        <p className="text-sm text-muted">
          Alttaki <strong className="text-fg">WhatsApp&apos;tan Gönder</strong> butonuna bastığınızda cevaplarınız hazır
          mesaj olarak açılır, yalnızca göndermeniz yeterli. İsterseniz{" "}
          <a href={`tel:${SITE.phone.tel}`} className="font-semibold text-fg underline underline-offset-4 hover:text-accent">
            {SITE.phone.display}
          </a>{" "}
          numarasından bizi arayabilirsiniz. Çalışma saatlerimiz: Pazartesi – Cumartesi 09:00 – 22:00.
        </p>
      </div>
    </StepShell>
  );
}
