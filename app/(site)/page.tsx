import { JsonLd } from "@/components/seo/JsonLd";
import { AboutReveal } from "@/components/sections/AboutReveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { OneTimeProjects } from "@/components/sections/OneTimeProjects";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WorksPreview } from "@/components/sections/WorksPreview";
import { SITE } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: SITE.name,
          url: SITE.url,
          image: `${SITE.url}/opengraph-image`,
          logo: `${SITE.url}/brand/nexva-logo.png`,
          telephone: SITE.phone.tel,
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.address.street,
            addressLocality: SITE.address.city,
            addressRegion: SITE.address.city,
            addressCountry: SITE.address.country,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "22:00",
            },
          ],
          sameAs: [SITE.social.instagram, SITE.social.linkedin],
          areaServed: "Batman",
        }}
      />
      <Hero />
      {/* Sıra: Hizmetler → Hakkımızda → İşlerimiz → İletişim */}
      <ServiceCards />
      <Packages />
      <OneTimeProjects />
      <AboutReveal />
      <Process />
      <WorksPreview />
      <CtaBand />
    </>
  );
}
