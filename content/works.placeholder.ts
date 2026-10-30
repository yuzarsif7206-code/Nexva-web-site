import type { Work } from "./works";

// YALNIZCA TASARIM İNCELEMESİ İÇİN. NEXT_PUBLIC_USE_PLACEHOLDER_WORKS=true iken görünür, sayfaları noindex.
// Gerçek iş, müşteri veya rakam değildir.
const g = (a: string, b: string) => `linear-gradient(160deg, ${a} 0%, ${b} 100%)`;

const base = (i: number) => ({
  year: 2026,
  summary: "Tasarım incelemesi için yer tutucu kart. Gerçek proje eklendiğinde kaldırılır.",
  gallery: [],
  placeholder: true as const,
  cover: {
    src: "",
    width: [1600, 1080, 1200, 1600, 1080, 1200][i],
    height: [900, 1350, 1200, 900, 1920, 1200][i],
    alt: "Örnek proje yer tutucusu",
    gradient: [
      g("#5C0A15", "#0A0A0B"),
      g("#B3162B", "#121214"),
      g("#1A1A1D", "#5C0A15"),
      g("#E5311B", "#5C0A15"),
      g("#121214", "#B3162B"),
      g("#5C0A15", "#1A1A1D"),
    ][i],
  },
});

export const placeholderWorks: Work[] = [
  { slug: "ornek-proje-1", title: "Örnek Proje 1", category: "uretim", services: ["reklam-filmi"], ...base(0) },
  { slug: "ornek-proje-2", title: "Örnek Proje 2", category: "sosyal", services: ["sosyal-medya"], ...base(1) },
  { slug: "ornek-proje-3", title: "Örnek Proje 3", category: "marka", services: ["marka-kimligi"], ...base(2) },
  { slug: "ornek-proje-4", title: "Örnek Proje 4", category: "uretim", services: ["dron-cekimi"], ...base(3) },
  { slug: "ornek-proje-5", title: "Örnek Proje 5", category: "performans", services: ["meta-google-reklam"], ...base(4) },
  { slug: "ornek-proje-6", title: "Örnek Proje 6", category: "marka", services: ["grafik-tasarim"], ...base(5) },
];
