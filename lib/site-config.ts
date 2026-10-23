const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE = {
  name: "Nexva Dijital",
  tagline: "Markanı dijitalde büyüt",
  url: rawUrl.replace(/\/$/, ""),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  phone: { display: "0506 752 75 71", tel: "+905067527571", wa: "905067527571" },
  email: "nexvadigital@gmail.com",
  address: { line: "Batman Merkez", city: "Batman", country: "TR" },
  hours: [
    { days: "Pazartesi – Cuma", time: "09:00 – 18:00" },
    { days: "Cumartesi – Pazar", time: "Kapalı" },
  ],
  social: {
    instagram: "https://www.instagram.com/nexvadigital/",
    instagramHandle: "@nexvadigital",
  },
  responseSla: "24 saat",
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.phone.wa}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const DEFAULT_WA_TEXT = "Merhaba Nexva Dijital, web sitenizden ulaşıyorum.";

export const NAV = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/isler", label: "İşlerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
] as const;
