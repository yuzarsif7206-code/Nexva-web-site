import { ArcBackdrop } from "@/components/brand/ArcBackdrop";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Alt sayfaların giriş bandı: tek h1, sabit header kadar üst boşluk. */
export function PageIntro({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20 lg:pt-44">
      <div aria-hidden className="hero-bg absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-bg" />
      <ArcBackdrop id="intro-arc" className="-top-40 -right-40 -z-10 h-[32rem] w-[32rem] md:-top-56 md:-right-32 md:h-[44rem] md:w-[44rem]" intensity={0.6} />
      <div className="container-x">
        <Eyebrow className="hero-in">{eyebrow}</Eyebrow>
        <h1
          id="page-title"
          className="display h1-hero hero-in mt-5 max-w-5xl text-balance"
          style={{ ["--i" as string]: 1 }}
        >
          {title}
        </h1>
        {sub && (
          <p
            className="hero-in mt-6 max-w-2xl text-pretty text-[1.0625rem] text-fg/80 md:text-xl"
            style={{ ["--i" as string]: 2 }}
          >
            {sub}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
