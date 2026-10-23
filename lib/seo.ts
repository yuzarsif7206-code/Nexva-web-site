import type { Metadata } from "next";
import { SITE } from "./site-config";

export const DEFAULT_TITLE =
  "Nexva Dijital | Reklam Filmi, Dron Çekimi, Sosyal Medya ve Reklam Yönetimi · Batman";
export const DEFAULT_DESCRIPTION =
  "Batman merkezli Nexva Dijital: reklam filmi, dron çekimi, sosyal medya yönetimi, Meta ve Google reklamları, marka kimliği ve web sitesi. Teklif alın.";

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Nexva Dijital — Markanı dijitalde büyüt",
};

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
  // Sayfa düzeyi openGraph kökteki dosya tabanlı görseli ezdiği için varsayılan görsel açıkça verilir.
  images ??= [DEFAULT_OG_IMAGE];
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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex || !SITE.allowIndexing ? { robots: { index: false, follow: false } } : {}),
  };
}
