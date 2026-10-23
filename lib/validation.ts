import { z } from "zod";

export const PAKETLER = ["baslangic", "standart", "premium"] as const;
export const PROJELER = ["web", "logo", "meta", "video"] as const;
export const HIZMETLER = [
  "reklam-filmi",
  "dron-cekimi",
  "urun-fotografciligi",
  "meta-google-reklam",
  "marka-kimligi",
  "grafik-tasarim",
  "promosyon-baski",
  "sosyal-medya",
  "web-tasarim",
] as const;
export const ASAMALAR = ["yeni", "buyutme", "kampanya", "tek-sefer"] as const;
export const BUTCELER = ["10-25", "25-50", "50-75", "75-100", "100+", "belirsiz"] as const;
export const REKLAM_BUTCELERI = ["0-10", "10-30", "30-100", "100+", "belirsiz"] as const;
export const ZAMANLAMALAR = ["acil", "bu-ay", "2-3-ay", "esnek"] as const;
export const KANALLAR = ["whatsapp", "telefon", "eposta"] as const;

export type Paket = (typeof PAKETLER)[number];
export type Proje = (typeof PROJELER)[number];
export type Hizmet = (typeof HIZMETLER)[number];
export type Asama = (typeof ASAMALAR)[number];
export type Butce = (typeof BUTCELER)[number];
export type ReklamButcesi = (typeof REKLAM_BUTCELERI)[number];
export type Zamanlama = (typeof ZAMANLAMALAR)[number];
export type Kanal = (typeof KANALLAR)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const telefonSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()\-]/g, ""))
  .transform((v) => v.replace(/^\+?90/, "0"))
  .transform((v) => (/^5\d{9}$/.test(v) ? `0${v}` : v))
  .refine((v) => /^05\d{9}$/.test(v), "Geçerli bir cep telefonu girin (05XX XXX XX XX)");

export const contactSchema = z.object({
  ad: z.string().trim().min(2, "Adınızı ve soyadınızı yazın").max(80, "En fazla 80 karakter"),
  firma: z.string().trim().max(120, "En fazla 120 karakter").optional(),
  telefon: telefonSchema,
  kanal: z.enum(KANALLAR),
  eposta: z
    .string()
    .trim()
    .max(160, "En fazla 160 karakter")
    .refine((v) => v === "" || EMAIL_RE.test(v), "Geçerli bir e-posta girin")
    .optional(),
  not: z.string().trim().max(1000, "En fazla 1000 karakter").optional(),
  kvkk: z.boolean().refine((v) => v === true, "Devam etmek için onay gerekli"),
});

const base = contactSchema.extend({
  asama: z.enum(ASAMALAR, { message: "Lütfen bir seçenek belirleyin" }),
  zamanlama: z.enum(ZAMANLAMALAR, { message: "Lütfen bir seçenek belirleyin" }),
  reklamButcesi: z.enum(REKLAM_BUTCELERI).optional(),
  hp: z.string().optional(), // honeypot
  // Formun açık kaldığı süre (ms). Saat farkından etkilenmemek için istemcide performance.now() ile ölçülür.
  t: z.number().int().nonnegative(),
});

export const leadSchema = z
  .discriminatedUnion("tur", [
    base.extend({ tur: z.literal("paket"), paket: z.enum(PAKETLER) }),
    base.extend({ tur: z.literal("proje"), proje: z.enum(PROJELER) }),
    base.extend({
      tur: z.literal("ozel"),
      hizmetler: z.array(z.enum(HIZMETLER)).min(1, "En az bir hizmet seçin"),
      butce: z.enum(BUTCELER, { message: "Lütfen bir aralık seçin" }),
    }),
  ])
  .superRefine((v, ctx) => {
    if (v.kanal === "eposta" && !v.eposta) {
      ctx.addIssue({ code: "custom", path: ["eposta"], message: "E-posta adresinizi yazın" });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
