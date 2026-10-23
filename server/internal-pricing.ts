import "server-only";

// İÇ KULLANIM. Sitede ASLA gösterilmez. Yalnızca server/mail.ts import eder.
// Dönem (aylık/tek sefer) ve KDV durumu sahibi tarafından netleştirilecek.
export const INTERNAL_PRICING = {
  paket: { baslangic: "25.000 ₺", standart: "37.000 ₺", premium: "60.000 ₺" },
  proje: { web: "20.000 ₺", logo: "10.000 ₺", meta: "10.000 – 15.500 ₺", video: "8.000 ₺" },
} as const;
