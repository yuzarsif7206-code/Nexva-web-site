import type { Hizmet } from "@/lib/validation";
import type { Group } from "./services";
import { placeholderWorks } from "./works.placeholder";

export type WorkImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
};

export type Work = {
  slug: string; // /isler/[slug]
  title: string;
  category: Group;
  services: Hizmet[];
  year: number;
  client?: string; // müşteri izin verdiyse; yoksa gösterilmez
  summary: string; // 1-2 cümle
  cover: WorkImage & { gradient?: string };
  gallery: WorkImage[];
  placeholder?: boolean;
};

/**
 * Gerçek işler gelince buraya eklenir. Görseller public/works/<slug>/ altına (AVIF/WebP, en geniş kenar 1600 px).
 * Örnek kayıt README.md içinde.
 */
export const works: Work[] = [];

export const categoryLabels: Record<Group, string> = {
  uretim: "Prodüksiyon",
  performans: "Performans",
  marka: "Marka ve Tasarım",
  "sosyal-web": "Sosyal ve Web",
};

export const PLACEHOLDER_MODE = process.env.NEXT_PUBLIC_USE_PLACEHOLDER_WORKS === "true";

/** Üretimde yalnızca gerçek işler. Tasarım incelemesi için env ile yer tutucular açılabilir. */
export function getWorks(): Work[] {
  if (works.length > 0) return works;
  return PLACEHOLDER_MODE ? placeholderWorks : [];
}

export function getWork(slug: string): Work | undefined {
  return getWorks().find((w) => w.slug === slug);
}
