import type { Proje } from "@/lib/validation";
import type { IconName } from "./services";

// FİYAT ALANI YOK.
export type OneTimeProject = {
  slug: Proje;
  icon: IconName;
  title: string;
  items: string[];
  adNote?: boolean;
};

export const projects: OneTimeProject[] = [
  {
    slug: "web",
    icon: "Globe",
    title: "Web Sitesi Kurulumu",
    items: ["Mobil uyumlu", "SEO uyumlu", "Yönetim paneli dahil"],
  },
  {
    slug: "logo",
    icon: "Palette",
    title: "Logo + Kurumsal Kimlik",
    items: ["Profesyonel logo tasarımı", "Kartvizit ve sosyal medya uyarlama"],
  },
  {
    slug: "meta",
    icon: "ChartLine",
    title: "Meta Reklam Yönetimi",
    adNote: true,
    items: [
      "Kampanya kurulumu ve yönetimi",
      "Temel hedefleme stratejisi",
      "Aylık performans raporlaması",
      "Kreatif önerileri",
      "Temel A/B testleri",
      "Meta Business Panel kurulumu",
    ],
  },
  {
    slug: "video",
    icon: "Video",
    title: "Video Prodüksiyon",
    items: [
      "1 dakika tanıtım filmi, profesyonel kamera ve dron",
      "Montaj, kurgu ve renk düzenleme dahil",
    ],
  },
];
