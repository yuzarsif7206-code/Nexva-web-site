import type { Hizmet } from "@/lib/validation";

export type Group = "uretim" | "performans" | "marka" | "sosyal-web";

// anchor: /hizmetler sayfasındaki bölüm bağlantısı (#...)
export const groups: Record<Group, { title: string; blurb: string; anchor: string }> = {
  uretim: { title: "Prodüksiyon", blurb: "Markanızı görüntüyle anlatan profesyonel üretim.", anchor: "uretim" },
  performans: {
    title: "Reklam Yönetimi",
    blurb: "Doğru kitleye ulaşan, ölçülen reklamlar.",
    anchor: "reklam-yonetimi",
  },
  marka: { title: "Marka ve Tasarım", blurb: "Her yerde aynı güçle görünen marka dili.", anchor: "marka" },
  "sosyal-web": {
    title: "Sosyal Medya Yönetimi ve Web Sitesi Tasarımı",
    blurb: "Sürekli görünür, her cihazda hızlı bir dijital varlık.",
    anchor: "sosyal-medya-ve-web-sitesi",
  },
};

export const groupOrder: Group[] = ["uretim", "performans", "marka", "sosyal-web"];

export type IconName =
  | "Clapperboard"
  | "Plane"
  | "Camera"
  | "Megaphone"
  | "Palette"
  | "PenTool"
  | "Printer"
  | "Share2"
  | "Globe"
  | "ChartLine"
  | "Video";

export type Service = {
  slug: Hizmet;
  group: Group;
  icon: IconName;
  title: string;
  desc: string;
};

export const services: Service[] = [
  {
    slug: "reklam-filmi",
    group: "uretim",
    icon: "Clapperboard",
    title: "Reklam Filmi ve Prodüksiyon",
    desc: "Fikirden senaryoya, çekimden kurguya: markanızı anlatan reklam ve tanıtım filmlerini profesyonel ekipmanla üretiyoruz.",
  },
  {
    slug: "dron-cekimi",
    group: "uretim",
    icon: "Plane",
    title: "Dron Çekimi",
    desc: "Mekânınızı, projenizi ve ürününüzü havadan göstererek etkileyici planlar ve farklı bir bakış açısı kazandırıyoruz.",
  },
  {
    slug: "urun-fotografciligi",
    group: "uretim",
    icon: "Camera",
    title: "Ürün Fotoğrafçılığı",
    desc: "Ürünlerinizi katalogda, e-ticarette ve sosyal medyada öne çıkaran temiz, ışığı doğru kurulmuş fotoğraflar.",
  },
  {
    slug: "meta-google-reklam",
    group: "performans",
    icon: "Megaphone",
    title: "Meta ve Google Reklam Yönetimi",
    desc: "Doğru kitleye doğru mesajı ulaştıran Meta ve Google kampanyalarını kuruyor, yönetiyor ve raporluyoruz.",
  },
  {
    slug: "marka-kimligi",
    group: "marka",
    icon: "Palette",
    title: "Marka Kimliği",
    desc: "Logo, renk ve yazı dilinden kartvizite uzanan, markanızı her yerde aynı güçle temsil eden bir kimlik sistemi.",
  },
  {
    slug: "grafik-tasarim",
    group: "marka",
    icon: "PenTool",
    title: "Grafik Tasarım",
    desc: "Afiş, katalog, broşür ve sosyal medya görselleri; markanıza uygun, okunaklı ve dikkat çeken tasarımlar.",
  },
  {
    slug: "promosyon-baski",
    group: "marka",
    icon: "Printer",
    title: "Promosyon Baskı Hizmetleri",
    desc: "Kartvizit, broşür ve promosyon ürünlerinde tasarımdan baskıya tek noktadan çözüm.",
  },
  {
    slug: "sosyal-medya",
    group: "sosyal-web",
    icon: "Share2",
    title: "Sosyal Medya Yönetimi ve İçerik Üretimi",
    desc: "İçerik planı, çekim, kurgu ve paylaşım: hesaplarınızı düzenli, tutarlı ve markanıza yakışır şekilde yönetiyoruz.",
  },
  {
    slug: "web-tasarim",
    group: "sosyal-web",
    icon: "Globe",
    title: "Web Sitesi Tasarımı",
    desc: "Mobilde hızlı açılan, aramalarda bulunmaya uygun, markanızı doğru anlatan kurumsal web siteleri.",
  },
];
