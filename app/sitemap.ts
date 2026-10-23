import type { MetadataRoute } from "next";
import { works } from "@/content/works";
import { SITE } from "@/lib/site-config";

/** Alan adı bağlanıp NEXT_PUBLIC_ALLOW_INDEXING=true yapılana kadar boş döner. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.allowIndexing) return [];
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/hizmetler", priority: 0.9, freq: "monthly" },
    { path: "/isler", priority: 0.8, freq: "weekly" },
    { path: "/hakkimizda", priority: 0.6, freq: "monthly" },
    { path: "/teklif-al", priority: 0.9, freq: "monthly" },
    { path: "/kvkk", priority: 0.2, freq: "yearly" },
  ];
  return [
    ...pages.map((p) => ({
      url: `${SITE.url}${p.path === "/" ? "" : p.path}`,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    // yalnızca gerçek (yer tutucu olmayan) işler
    ...works
      .filter((w) => !w.placeholder)
      .map((w) => ({
        url: `${SITE.url}/isler/${w.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
