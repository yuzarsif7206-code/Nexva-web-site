"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { ArrowLeft, ArrowRight, LoaderCircle, Phone, Send } from "lucide-react";
import { useSessionDraft } from "@/hooks/useSessionDraft";
import { labels } from "@/lib/labels";
import { contactSchema, type Hizmet } from "@/lib/validation";
import { buildLeadMessage, waHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { FORM_MODE, SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { FailureFallback } from "./FailureFallback";
import { StepWhatsApp } from "./steps/StepWhatsApp";
import {
  buildPayload,
  computeSteps,
  draftFromParams,
  emptyDraft,
  needsAdBudget,
  nextStep,
  prevStep,
  selectionLabel,
  type Draft,
  type StepKey,
} from "./funnel-logic";
import { ProgressRing } from "./ProgressRing";
import { StepAdBudget, StepBudget, StepStage, StepTiming } from "./steps";
import { StepContact, type ContactErrors, type ContactField } from "./steps/StepContact";
import { StepNeed } from "./steps/StepNeed";
import { StepFocusContext } from "./StepShell";
import { SuccessScreen } from "./SuccessScreen";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);
const now = () => performance.now();

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; notified: boolean }
  | { kind: "failure"; rateLimited?: boolean };

/** URL ön seçimi değişince funnel'ı sıfırdan kur (Activity durum korumasına karşı key). */
export default function LeadFunnelRoot() {
  const params = useSearchParams();
  const src = params.toString();
  return <LeadFunnel key={src} src={src} />;
}

function LeadFunnel({ src }: { src: string }) {
  const [draft, setDraft, clearDraft] = useSessionDraft<Draft & { src: string }>(
    "nexva-teklif-taslak",
    () => ({ ...(draftFromParams(new URLSearchParams(src)) ?? emptyDraft()), src }),
    (stored) => stored?.src === src && Array.isArray(stored.hizmetler),
  );
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [needError, setNeedError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const opened = useRef(0);
  const hpRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    opened.current = now();
    return () => window.clearTimeout(timer.current);
  }, []);

  const steps = computeSteps(draft);
  const index = Math.max(0, steps.indexOf(draft.step));
  const current: StepKey = steps[index];
  // ilk görünen adımda odak taşınmaz (sayfa açılışında halka/kaydırma olmasın)
  const [firstStep] = useState(current);
  const focusStep = current !== firstStep;

  const go = (step: StepKey) => setDraft((d) => ({ ...d, step }));
  const advanceLater = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDraft((d) => ({ ...d, step: nextStep(d) })), 250);
  }, [setDraft]);

  const pick = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    advanceLater();
  };

  // ---------- İletişim doğrulama ----------
  const validateContact = (d: Draft, only?: ContactField): ContactErrors => {
    const r = contactSchema.safeParse({
      ad: d.ad,
      firma: d.firma || undefined,
      telefon: d.telefon,
      kanal: d.kanal,
      eposta: d.kanal === "eposta" ? d.eposta : undefined,
      not: d.not || undefined,
      kvkk: d.kvkk,
    });
    const out: ContactErrors = {};
    if (!r.success) {
      for (const issue of r.error.issues) {
        const k = issue.path[0] as ContactField;
        if (!out[k]) out[k] = issue.message;
      }
    }
    if (d.kanal === "eposta" && !d.eposta.trim()) out.eposta = "E-posta adresinizi yazın";
    if (only) return { ...errors, [only]: out[only] };
    return out;
  };

  const onContactChange = <K extends ContactField>(k: K, v: Draft[K]) => {
    const nd = { ...draft, [k]: v };
    setDraft(nd);
    // ilk gönderim denemesinden sonra (ya da alan zaten hatalıysa) anlık doğrulama
    if (submitted || errors[k]) setErrors(validateContact(nd, submitted ? undefined : k));
  };
  const onContactBlur = (k: ContactField) => {
    const value = draft[k];
    if (value === "" || value === false) return; // boş alana dokunup geçince hemen hata gösterme
    setErrors(validateContact(draft, k));
  };

  // ---------- Gönderim ----------
  const adNeeded = needsAdBudget(draft);
  const summary = [
    { label: "İstenen", value: selectionLabel(draft) },
    draft.asama && { label: "Aşama", value: labels.asama[draft.asama] },
    draft.tur === "ozel" && draft.butce && { label: "Hizmet bütçesi", value: labels.butce[draft.butce] },
    adNeeded && draft.reklamButcesi && { label: "Aylık reklam harcaması", value: labels.reklamButcesi[draft.reklamButcesi] },
    draft.zamanlama && { label: "Zamanlama", value: labels.zamanlama[draft.zamanlama] },
  ].filter(Boolean) as { label: string; value: string }[];

  const whatsappText = () =>
    buildLeadMessage({
      secim: selectionLabel(draft),
      asama: draft.asama && labels.asama[draft.asama],
      butce: draft.tur === "ozel" && draft.butce ? labels.butce[draft.butce] : undefined,
      reklamButcesi: adNeeded && draft.reklamButcesi ? labels.reklamButcesi[draft.reklamButcesi] : undefined,
      zamanlama: draft.zamanlama && labels.zamanlama[draft.zamanlama],
      ad: draft.ad.trim() || undefined,
      firma: draft.firma.trim() || undefined,
      not: draft.not.trim() || undefined,
    });

  const submit = async () => {
    if (status.kind === "sending") return;
    setSubmitted(true);
    const errs = validateContact(draft);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      const first = (Object.keys(errs) as ContactField[]).find((k) => errs[k]);
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          buildPayload(draft, now() - opened.current, hpRef.current?.value ?? ""),
        ),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; notified?: boolean };
      if (res.ok && data.ok) {
        setStatus({ kind: "success", notified: data.notified !== false });
        clearDraft();
        window.scrollTo({ top: 0 });
        return;
      }
      setStatus({ kind: "failure", rateLimited: res.status === 429 });
    } catch {
      setStatus({ kind: "failure" });
    }
    window.scrollTo({ top: 0 });
  };

  const stepHasValue = (s: StepKey): boolean => {
    switch (s) {
      case "need":
        return draft.tur === "ozel" || Boolean(draft.paket || draft.proje);
      case "stage":
        return Boolean(draft.asama);
      case "budget":
        return Boolean(draft.butce);
      case "adBudget":
        return Boolean(draft.reklamButcesi);
      case "timing":
        return Boolean(draft.zamanlama);
      case "contact":
        return true;
    }
  };

  const onContinue = () => {
    window.clearTimeout(timer.current);
    if (current === "contact") {
      // WhatsApp modunda sunucuya gönderim yok; gönderim WhatsApp butonuyla yapılır
      if (FORM_MODE === "email") void submit();
      return;
    }
    if (current === "need" && draft.tur === "ozel" && draft.hizmetler.length === 0) {
      setNeedError("En az bir hizmet seçin");
      return;
    }
    if (!stepHasValue(current)) return;
    setNeedError(undefined);
    go(nextStep(draft));
  };

  const back = () => {
    window.clearTimeout(timer.current);
    const p = prevStep(draft);
    if (p) go(p);
  };

  // ---------- Sonuç ekranları ----------
  if (status.kind === "success" || status.kind === "failure") {
    const href = waHref(whatsappText());
    return (
      <Frame>
        {status.kind === "success" ? (
          <SuccessScreen waHref={href} notified={status.notified} />
        ) : (
          <FailureFallback
            waHref={href}
            rateLimited={status.rateLimited}
            onRetry={() => setStatus({ kind: "idle" })}
          />
        )}
      </Frame>
    );
  }

  // WhatsApp modunda son adımın kendi butonları var; alt çubukta yalnızca "Geri" kalır
  const waFinal = current === "contact" && FORM_MODE === "whatsapp";
  const showContinue = stepHasValue(current) && !waFinal;
  const chip = draft.skipNeed ? selectionLabel(draft) : "";

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Frame
          top={
            <div className="flex items-center gap-4">
              <ProgressRing current={index + 1} total={steps.length} />
              <div className="min-w-0">
                <p className="eyebrow">Teklif al</p>
                {chip ? (
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-fg/85">
                    <span className="truncate font-semibold">{chip}</span>
                    <button
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, skipNeed: false, step: "need" }))}
                      className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
                    >
                      Değiştir
                    </button>
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-muted">Yaklaşık 60 saniye sürer.</p>
                )}
              </div>
            </div>
          }
          bottom={
            <div className="flex items-center gap-2 sm:gap-3">
              {index > 0 && (
                <button
                  type="button"
                  onClick={back}
                  aria-label="Geri"
                  className={cn("btn btn-secondary h-12", waFinal ? "w-12 shrink-0 px-0 sm:w-auto sm:px-5" : "px-5")}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  <span className={waFinal ? "hidden sm:inline" : ""}>Geri</span>
                </button>
              )}
              {waFinal && (
                <>
                  <a
                    href={waHref(whatsappText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ml-auto h-12 flex-1 gap-2 bg-[#1f9d55] px-3 text-sm tracking-normal text-white normal-case sm:flex-none sm:px-6 sm:text-base"
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />
                    <span className="whitespace-nowrap min-[440px]:hidden">WhatsApp</span>
                    <span className="hidden whitespace-nowrap min-[440px]:inline">WhatsApp&apos;tan Gönder</span>
                  </a>
                  <a
                    href={`tel:${SITE.phone.tel}`}
                    className="btn btn-secondary h-12 shrink-0 gap-2 px-4 text-sm tracking-normal normal-case sm:px-6 sm:text-base"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    <span className="whitespace-nowrap">Bizi Ara</span>
                  </a>
                </>
              )}
              {showContinue && (
                <button
                  type="button"
                  onClick={onContinue}
                  disabled={status.kind === "sending"}
                  className={cn(
                    "btn btn-primary ml-auto h-12 flex-1 sm:flex-none",
                    status.kind === "sending" && "cursor-wait opacity-80",
                  )}
                >
                  {current === "contact" ? (
                    status.kind === "sending" ? (
                      <>
                        <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />
                        Gönderiliyor…
                      </>
                    ) : (
                      <>
                        Gönder
                        <Send className="h-4 w-4" aria-hidden />
                      </>
                    )
                  ) : (
                    <>
                      Devam
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </button>
              )}
            </div>
          }
        >
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              onContinue();
            }}
          >
            <StepFocusContext value={focusStep}>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current}
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {current === "need" && (
                  <StepNeed
                    draft={draft}
                    error={needError}
                    onPick={(v) => {
                      setNeedError(undefined);
                      if (v.tur === "ozel") {
                        setDraft((d) => ({ ...d, tur: "ozel" }));
                        return;
                      }
                      setDraft((d) => ({ ...d, ...v }));
                      advanceLater();
                    }}
                    onToggleService={(h: Hizmet) => {
                      setNeedError(undefined);
                      setDraft((d) => ({
                        ...d,
                        hizmetler: d.hizmetler.includes(h)
                          ? d.hizmetler.filter((x) => x !== h)
                          : [...d.hizmetler, h],
                      }));
                    }}
                  />
                )}
                {current === "stage" && <StepStage value={draft.asama} onPick={(v) => pick("asama", v)} />}
                {current === "budget" && <StepBudget value={draft.butce} onPick={(v) => pick("butce", v)} />}
                {current === "adBudget" && (
                  <StepAdBudget value={draft.reklamButcesi} onPick={(v) => pick("reklamButcesi", v)} />
                )}
                {current === "timing" && (
                  <StepTiming value={draft.zamanlama} onPick={(v) => pick("zamanlama", v)} />
                )}
                {current === "contact" && FORM_MODE === "whatsapp" && (
                  <StepWhatsApp
                    draft={draft}
                    summary={summary}
                    onChange={(k, v) => setDraft((d) => ({ ...d, [k]: v }))}
                  />
                )}
                {current === "contact" && FORM_MODE === "email" && (
                  <StepContact
                    draft={draft}
                    errors={errors}
                    onChange={onContactChange}
                    onBlur={onContactBlur}
                    hpRef={hpRef}
                  />
                )}
              </m.div>
            </AnimatePresence>
            </StepFocusContext>
            {/* Enter ile gönderim için görünmez submit */}
            <button type="submit" className="sr-only" tabIndex={-1} aria-hidden>
              Gönder
            </button>
          </form>
        </Frame>
      </MotionConfig>
    </LazyMotion>
  );
}

function Frame({
  top,
  bottom,
  children,
}: {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col lg:min-h-[calc(100svh-5rem)]">
      <div className="container-x w-full max-w-3xl flex-1 pt-6 pb-10 md:pt-10">
        {top && <div className="mb-8 md:mb-12">{top}</div>}
        {children}
      </div>
      {bottom && (
        <div className="sticky bottom-0 z-20 border-t border-white/10 bg-bg/90 pb-[env(safe-area-inset-bottom)] supports-[backdrop-filter]:bg-bg/75 supports-[backdrop-filter]:backdrop-blur-md">
          <div className="container-x max-w-3xl py-3">{bottom}</div>
        </div>
      )}
    </div>
  );
}
