import type {
  Asama,
  Butce,
  Hizmet,
  Kanal,
  Paket,
  Proje,
  ReklamButcesi,
  Zamanlama,
} from "./validation";

// Türkçe etiketler. Funnel arayüzünde ve e-posta özetinde kullanılır. İçine fiyat GİRİLMEZ.
export const labels = {
  paket: {
    baslangic: "Başlangıç Paket",
    standart: "Standart Paket",
    premium: "Premium Paket",
  } satisfies Record<Paket, string>,
  proje: {
    web: "Web Sitesi Kurulumu",
    logo: "Logo + Kurumsal Kimlik",
    meta: "Meta Reklam Yönetimi",
    video: "Video Prodüksiyon",
  } satisfies Record<Proje, string>,
  hizmet: {
    "reklam-filmi": "Reklam Filmi ve Prodüksiyon",
    "dron-cekimi": "Dron Çekimi",
    "urun-fotografciligi": "Ürün Fotoğrafçılığı",
    "meta-google-reklam": "Meta ve Google Reklam Yönetimi",
    "marka-kimligi": "Marka Kimliği",
    "grafik-tasarim": "Grafik Tasarım",
    "promosyon-baski": "Promosyon Baskı Hizmetleri",
    "sosyal-medya": "Sosyal Medya Yönetimi ve İçerik Üretimi",
    "web-tasarim": "Web Sitesi Tasarımı",
  } satisfies Record<Hizmet, string>,
  asama: {
    yeni: "Yeni kuruluyorum",
    buyutme: "Mevcut markamı büyütmek istiyorum",
    kampanya: "Bir kampanya veya lansmanım var",
    "tek-sefer": "Tek seferlik bir işe ihtiyacım var",
  } satisfies Record<Asama, string>,
  butce: {
    "10-25": "10.000 – 25.000 ₺",
    "25-50": "25.000 – 50.000 ₺",
    "50-75": "50.000 – 75.000 ₺",
    "75-100": "75.000 – 100.000 ₺",
    "100+": "100.000 ₺ üzeri",
    belirsiz: "Henüz bilmiyorum",
  } satisfies Record<Butce, string>,
  reklamButcesi: {
    "0-10": "10.000 ₺ altı",
    "10-30": "10.000 – 30.000 ₺",
    "30-100": "30.000 – 100.000 ₺",
    "100+": "100.000 ₺ üzeri",
    belirsiz: "Henüz bilmiyorum",
  } satisfies Record<ReklamButcesi, string>,
  zamanlama: {
    acil: "Acil (1–2 hafta)",
    "bu-ay": "Bu ay içinde",
    "2-3-ay": "2–3 ay içinde",
    esnek: "Esnek",
  } satisfies Record<Zamanlama, string>,
  kanal: {
    whatsapp: "WhatsApp",
    telefon: "Telefon",
    eposta: "E-posta",
  } satisfies Record<Kanal, string>,
};
