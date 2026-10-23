import { Eyebrow } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { AboutRevealArm } from "./AboutRevealArm";
import { ServiceTicker } from "./ServiceTicker";

/** Kelimeleri soluk halden netleşen paragraf + kayan hizmet etiketi şeridi. */
export function AboutReveal() {
  const words = copy.about.text.split(" ");
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden py-16 md:py-24">
      <div className="container-x">
        <h2 id="about-title" className="sr-only">
          Hakkımızda
        </h2>
        <Eyebrow>{copy.about.eyebrow}</Eyebrow>
        <AboutRevealArm>
          <p className="mt-6 max-w-4xl text-[clamp(1.5rem,6vw,2.75rem)] leading-[1.15] font-semibold tracking-tight md:text-[clamp(2.25rem,3.6vw,3.5rem)]">
            {words.map((w, i) => (
              <span key={i}>
                <span className="w" style={{ ["--w" as string]: i }}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </p>
        </AboutRevealArm>
      </div>
      <ServiceTicker />
    </section>
  );
}
