import { SITE } from "./site-config";

export function buildLeadMessage(parts: {
  secim: string;
  asama?: string;
  butce?: string;
  reklamButcesi?: string;
  zamanlama?: string;
  ad?: string;
  firma?: string;
  not?: string;
}) {
  return [
    "Merhaba Nexva Dijital, web sitenizden teklif talebi bırakıyorum.",
    `İstenen: ${parts.secim}`,
    parts.asama && `Aşama: ${parts.asama}`,
    parts.butce && `Hizmet bütçesi: ${parts.butce}`,
    parts.reklamButcesi && `Aylık reklam harcaması: ${parts.reklamButcesi}`,
    parts.zamanlama && `Zamanlama: ${parts.zamanlama}`,
    parts.ad && `Ad: ${parts.ad}`,
    parts.firma && `Firma: ${parts.firma}`,
    parts.not && `Not: ${parts.not}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const waHref = (text: string) =>
  `https://wa.me/${SITE.phone.wa}?text=${encodeURIComponent(text)}`;

// Müşteri numarasına yazmak için (ajansa giden e-postadaki buton): 05XXXXXXXXX -> https://wa.me/905XXXXXXXXX
export const waLinkFor = (phone05: string) => `https://wa.me/9${phone05.replace(/\D/g, "")}`;
