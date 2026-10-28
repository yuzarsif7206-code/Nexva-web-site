import { AboutLabels, AboutParagraph } from "@/components/sections/AboutReveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Process } from "@/components/sections/Process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hakkımızda",
  description:
    "Nexva Dijital, Batman merkezli bir reklam, prodüksiyon ve dijital medya ajansıdır. Çekim, tasarım, Meta reklam yönetimi ve web sitesi tasarımı tek çatı altında.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-6 md:pt-40 md:pb-10">
        <div aria-hidden className="hero-bg absolute inset-0 -z-10 opacity-60" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg" />
        <h1 id="page-title" className="sr-only">
          Hakkımızda
        </h1>
        <div className="container-x grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <AboutLabels className="hero-in lg:pt-1.5" />
          <div className="hero-in" style={{ ["--i" as string]: 1 }}>
            <AboutParagraph />
          </div>
        </div>
      </section>

      <Process compact />
      <CtaBand />
    </>
  );
}
