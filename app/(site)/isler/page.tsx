import { Suspense } from "react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageIntro } from "@/components/sections/PageIntro";
import { WorksInstagramCta } from "@/components/sections/WorksInstagramCta";
import { WorkGallery } from "@/components/works/WorkGallery";
import { WorksShowcase } from "@/components/works/WorksShowcase";
import { copy } from "@/content/copy";
import { getWorks } from "@/content/works";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "İşlerimiz",
  description:
    "Nexva Dijital'in ürettiği reklam filmleri, dron çekimleri, kampanyalar ve tasarımlar. Batman ve çevresindeki markalar için.",
  path: "/isler",
});

export default function WorksPage() {
  const works = getWorks();
  return (
    <>
      <PageIntro eyebrow="SEÇİLİ İŞLER" title={copy.pages.works.title} sub={copy.pages.works.sub} />
      {works.length === 0 && <WorksShowcase />}
      <section aria-label="İş listesi" className="pb-16 md:pb-24">
        <div className="container-x">
          {works.length === 0 ? (
            <WorksInstagramCta headingLevel="h2" id="ig-isler" />
          ) : (
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
