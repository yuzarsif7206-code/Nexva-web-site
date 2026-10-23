import { labels } from "@/lib/labels";
import {
  HIZMETLER,
  PAKETLER,
  PROJELER,
  type Asama,
  type Butce,
  type Hizmet,
  type Kanal,
  type Paket,
  type Proje,
  type ReklamButcesi,
  type Zamanlama,
} from "@/lib/validation";

export type StepKey = "need" | "stage" | "budget" | "adBudget" | "timing" | "contact";

export type Draft = {
  tur?: "paket" | "proje" | "ozel";
  paket?: Paket;
  proje?: Proje;
  hizmetler: Hizmet[];
  asama?: Asama;
  butce?: Butce;
  reklamButcesi?: ReklamButcesi;
  zamanlama?: Zamanlama;
  ad: string;
  firma: string;
  telefon: string;
  kanal: Kanal;
  eposta: string;
  not: string;
  kvkk: boolean;
  step: StepKey;
  /** URL ile ön seçim yapıldıysa ihtiyaç adımı atlanır ("Değiştir" ile geri açılır). */
  skipNeed: boolean;
};

export const emptyDraft = (): Draft => ({
  hizmetler: [],
  ad: "",
  firma: "",
  telefon: "",
  kanal: "whatsapp",
  eposta: "",
  not: "",
  kvkk: false,
  step: "need",
  skipNeed: false,
});

/** ?paket= / ?proje= / ?hizmet= ön seçimi. */
export function draftFromParams(params: URLSearchParams): Draft | null {
  const d = emptyDraft();
  const paket = params.get("paket");
  const proje = params.get("proje");
  const hizmet = params.get("hizmet");
  if (paket && (PAKETLER as readonly string[]).includes(paket)) {
    return { ...d, tur: "paket", paket: paket as Paket, skipNeed: true, step: "stage" };
  }
  if (proje && (PROJELER as readonly string[]).includes(proje)) {
    return { ...d, tur: "proje", proje: proje as Proje, skipNeed: true, step: "stage" };
  }
  if (hizmet && (HIZMETLER as readonly string[]).includes(hizmet)) {
    return { ...d, tur: "ozel", hizmetler: [hizmet as Hizmet], skipNeed: true, step: "stage" };
  }
  return null;
}

export function needsAdBudget(d: Draft): boolean {
  return (
    (d.tur === "paket" && d.paket === "premium") ||
    (d.tur === "proje" && d.proje === "meta") ||
    (d.tur === "ozel" && d.hizmetler.includes("meta-google-reklam"))
  );
}

export function computeSteps(d: Draft): StepKey[] {
  const s: StepKey[] = [];
  if (!d.skipNeed) s.push("need");
  s.push("stage");
  if (d.tur === "ozel") s.push("budget");
  if (needsAdBudget(d)) s.push("adBudget");
  s.push("timing", "contact");
  return s;
}

export function nextStep(d: Draft): StepKey {
  const steps = computeSteps(d);
  const i = steps.indexOf(d.step);
  return steps[Math.min(steps.length - 1, i + 1)];
}

export function prevStep(d: Draft): StepKey | null {
  const steps = computeSteps(d);
  const i = steps.indexOf(d.step);
  return i > 0 ? steps[i - 1] : null;
}

export function selectionLabel(d: Draft): string {
  if (d.tur === "paket" && d.paket) return labels.paket[d.paket];
  if (d.tur === "proje" && d.proje) return labels.proje[d.proje];
  if (d.tur === "ozel" && d.hizmetler.length)
    return `Özel iş: ${d.hizmetler.map((h) => labels.hizmet[h]).join(", ")}`;
  return "";
}

/** API'ye gönderilecek gövde. Yalnızca seçilen yola ait alanlar eklenir. */
export function buildPayload(d: Draft, elapsedMs: number, hp: string) {
  const common = {
    asama: d.asama,
    zamanlama: d.zamanlama,
    reklamButcesi: needsAdBudget(d) ? d.reklamButcesi : undefined,
    ad: d.ad,
    firma: d.firma || undefined,
    telefon: d.telefon,
    kanal: d.kanal,
    eposta: d.kanal === "eposta" ? d.eposta : undefined,
    not: d.not || undefined,
    kvkk: d.kvkk,
    hp,
    t: Math.round(elapsedMs),
  };
  if (d.tur === "paket") return { tur: "paket" as const, paket: d.paket, ...common };
  if (d.tur === "proje") return { tur: "proje" as const, proje: d.proje, ...common };
  return { tur: "ozel" as const, hizmetler: d.hizmetler, butce: d.butce, ...common };
}
