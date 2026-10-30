import type { Hizmet } from "@/lib/validation";

export type Group = "uretim" | "performans" | "marka" | "sosyal" | "web";

// anchor: /hizmetler sayfasındaki bölüm bağlantısı (#...)
export const groups: Record<Group, { title: string; blurb: string; anchor: string }> = {
  uretim: { title: "Prodüksiyon", blurb: "Markanızı görüntüyle anlatan profesyonel üretim.", anchor: "uretim" },
  performans: {
    title: "Reklam Yönetimi",
    blurb: "Doğru kitleye ulaşan, ölçülen reklamlar.",
    anchor: "reklam-yonetimi",
  },
  marka: { title: "Marka ve Tasarım", blurb: "Her yerde aynı güçle görünen marka dili.", anchor: "marka" },
  sosyal: {
    title: "Sosyal Medya Yönetimi",
    blurb: "Sürekli görünür, düzenli ve tutarlı bir sosyal medya varlığı.",
    anchor: "sosyal-medya-yonetimi",
  },
  web: {
    title: "Web Sitesi Tasarımı",
    blurb: "Her cihazda hızlı açılan, aramalarda bulunan bir web sitesi.",
    anchor: "web-sitesi-tasarimi",
  },
};

export const groupOrder: Group[] = ["uretim", "performans", "marka", "sosyal", "web"];

/**
 * /hizmetler üstündeki hızlı geçiş kutucukları: her grup + "Baskı ve Promosyon"
 * (Baskı ve Promosyon, Marka ve Tasarım bölümündeki promosyon kartına gider).
 */
export const PRINT_ANCHOR = "baski-ve-promosyon";
export const quickLinks: { label: string; anchor: string }[] = [
  ...groupOrder.map((g) => ({ label: groups[g].title, anchor: groups[g].anchor })),
  { label: "Baskı ve Promosyon", anchor: PRINT_ANCHOR },
];

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
    desc: "Promosyon ürünlerinde tasarımdan baskıya tek noktadan çözüm.",
  },
  {
    slug: "sosyal-medya",
    group: "sosyal",
    icon: "Share2",
    title: "Sosyal Medya Yönetimi ve İçerik Üretimi",
    desc: "İçerik planı, çekim, kurgu ve paylaşım: hesaplarınızı düzenli, tutarlı ve markanıza yakışır şekilde yönetiyoruz.",
  },
  {
    slug: "web-tasarim",
    group: "web",
    icon: "Globe",
    title: "Web Sitesi Tasarımı",
    desc: "Mobilde hızlı açılan, aramalarda bulunmaya uygun, markanızı doğru anlatan kurumsal web siteleri.",
  },
];
