import { copy } from "@/content/copy";
import { AboutRevealArm } from "./AboutRevealArm";
import { ServiceTicker } from "./ServiceTicker";

/** Hakkımızda etiket listesi: solda alt alta (mobilde üstte yan yana sarar). */
export function AboutLabels({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap gap-x-4 gap-y-2 text-[0.75rem] font-semibold tracking-[0.2em] uppercase lg:flex-col lg:gap-3 ${className}`}
    >
      {copy.about.labels.map((l, i) => (
        <li key={l} className={`flex items-center gap-3 ${i === 0 ? "text-accent" : "text-fg/70"}`}>
          <span aria-hidden className={i === 0 ? "h-px w-6 bg-accent" : "h-1 w-1 rotate-45 bg-accent/70"} />
          {l}
        </li>
      ))}
    </ul>
  );
}

/** Hakkımızda paragrafı: okunur boyut (≈17–19 px, satır aralığı 1.7), max 600 px. */
export function AboutParagraph({ reveal = false }: { reveal?: boolean }) {
  const cls =
    "max-w-[600px] text-pretty text-[clamp(1.0625rem,1.3vw,1.2rem)] leading-[1.7] font-[450] text-white/85";
  if (!reveal) return <p className={cls}>{copy.about.text}</p>;
  const words = copy.about.text.split(" ");
  return (
    <AboutRevealArm>
      <p className={cls}>
        {words.map((w, i) => (
          <span key={i}>
            <span className="w" style={{ ["--w" as string]: i }}>
              {w}
            </span>{" "}
          </span>
        ))}
      </p>
    </AboutRevealArm>
  );
}

/** Ana sayfa "Hakkımızda" bölümü: etiketler + paragraf + kayan hizmet şeridi. */
export function AboutReveal() {
  return (
    <section id="hakkimizda" aria-labelledby="about-title" className="relative overflow-hidden py-16 md:py-24">
      <h2 id="about-title" className="sr-only">
        Hakkımızda
      </h2>
      <div className="container-x grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <AboutLabels className="lg:pt-1.5" />
        <AboutParagraph reveal />
      </div>
      <ServiceTicker />
    </section>
  );
}
