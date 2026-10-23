import type { Paket } from "@/lib/validation";

// FİYAT ALANI YOK. Fiyatlar yalnızca server/internal-pricing.ts içindedir.
export type Package = {
  slug: Paket;
  name: string;
  featured: boolean;
  tagline: string;
  items: string[];
};

export const packages: Package[] = [
  {
    slug: "baslangic",
    name: "BAŞLANGIÇ PAKET",
    featured: false,
    tagline: "Yerel marka bilinirliği isteyenler",
    items: [
      "4 profesyonel kurumsal tanıtım video içeriği",
      "İçerik planlanması ve kurgu - edit",
      "Dron çekimi",
    ],
  },
  {
    slug: "standart",
    name: "STANDART PAKET",
    featured: true,
    tagline: "Daha fazla içerik, daha güçlü marka görünürlüğü",
    items: [
      "Aylık 6 profesyonel video içerik",
      "6 adet profesyonel post tasarımı",
      "İçerik planlanması ve kurgu - edit",
      "Dron çekimi",
    ],
  },
  {
    slug: "premium",
    name: "PREMİUM PAKET",
    featured: false,
    tagline: "Bölgesel lider olmak isteyen markalar",
    items: [
      "Instagram yönetimi: içerik planlanması, kurgu - edit",
      "Meta reklam panel kurulumu ve yönetimi",
      "Aylık 8 profesyonel video içerik (kamera ve dron)",
      "İçerik planlanması ve kurgu - edit",
      "6 adet profesyonel post tasarımı",
      "Aylık detaylı performans raporu",
    ],
  },
];
