import { Suspense } from "react";
import { CtaBand } from "@/components/sections/CtaBand";
import { WorksInstagramCta } from "@/components/sections/WorksInstagramCta";
import { WorkGallery } from "@/components/works/WorkGallery";
import { getWorks } from "@/content/works";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "İşlerimiz",
  description:
    "Nexva Digital'in ürettiği reklam filmleri, dron çekimleri, kampanyalar ve tasarımlar Instagram hesabımızda. Batman ve çevresindeki markalar için.",
  path: "/isler",
});

export default function WorksPage() {
  const works = getWorks();
  return (
    <>
      <h1 className="sr-only">İşlerimiz</h1>
      <section aria-label="İşlerimiz" className="relative isolate pt-28 pb-16 md:pt-36 md:pb-24">
        <div aria-hidden className="hero-bg absolute inset-x-0 top-0 -z-10 h-80 opacity-50" />
        <div aria-hidden className="absolute inset-x-0 top-40 -z-10 h-40 bg-gradient-to-b from-transparent to-bg" />
        <div className="container-x">
          {works.length === 0 ? (
            <WorksInstagramCta headingLevel="h2" id="ig-isler" />
          ) : (
            // Gerçek iş eklendiğinde (content/works.ts) galeri görünür
            <Suspense fallback={<WorkGallery works={works} fallback />}>
              <WorkGallery works={works} />
            </Suspense>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
