const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE = {
  name: "Nexva Digital",
  tagline: "Markanızı dijitalde büyütün",
  url: rawUrl.replace(/\/$/, ""),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  phone: { display: "0506 752 75 71", tel: "+905067527571", wa: "905067527571" },
  email: "nexvadigital@gmail.com",
  address: {
    // Görünen tam adres (satır satır)
    lines: [
      "Cumhuriyet Mahallesi, Ahmet Arif Bulvarı",
      "Gazioğulları Plaza, Kat: 3 Daire: 17",
      "Merkez / Batman",
    ],
    street: "Cumhuriyet Mahallesi, Ahmet Arif Bulvarı, Gazioğulları Plaza, Kat: 3 Daire: 17",
    district: "Merkez",
    city: "Batman",
    country: "TR",
  },
  hours: [
    { days: "Pazartesi – Cumartesi", time: "09:00 – 22:00" },
    { days: "Pazar", time: "Kapalı" },
  ],
  social: {
    instagram: "https://www.instagram.com/nexvadigital/",
    instagramHandle: "@nexvadigital",
  },
  responseSla: "24 saat",
} as const;

export const fullAddress = `${SITE.address.street}, ${SITE.address.district} / ${SITE.address.city}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Gazioğulları Plaza, Ahmet Arif Bulvarı, Cumhuriyet Mahallesi, Batman",
)}`;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.phone.wa}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const DEFAULT_WA_TEXT = "Merhaba Nexva Digital, web sitenizden ulaşıyorum.";

/**
 * Teklif formunun gönderim yolu.
 * "whatsapp" (varsayılan): son adımda hazır mesajlı WhatsApp ve "Bizi Ara" butonları görünür, sunucuya gönderim yok.
 * "email": form /api/lead'e gönderilir (Gmail Uygulama Şifresi gerekir). Vercel'de NEXT_PUBLIC_FORM_MODE=email.
 */
export const FORM_MODE: "whatsapp" | "email" =
  process.env.NEXT_PUBLIC_FORM_MODE === "email" ? "email" : "whatsapp";

export const NAV = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/isler", label: "İşlerimiz" },
] as const;
