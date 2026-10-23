import type { Metadata } from "next";
import { SITE } from "./site-config";

export const DEFAULT_TITLE =
  "Nexva Dijital | Reklam Filmi, Dron Çekimi, Sosyal Medya ve Reklam Yönetimi · Batman";
export const DEFAULT_DESCRIPTION =
  "Batman merkezli Nexva Dijital: reklam filmi, dron çekimi, sosyal medya yönetimi, Meta ve Google reklamları, marka kimliği ve web sitesi. Teklif alın.";

/** Alt sayfalar için "{Sayfa} | Nexva Dijital" kalıbı + canonical + OG. */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
  images,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
}): Metadata {
  const full = `${title} | ${SITE.name}`;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName: SITE.name,
      locale: "tr_TR",
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(noindex || !SITE.allowIndexing ? { robots: { index: false, follow: false } } : {}),
  };
}
