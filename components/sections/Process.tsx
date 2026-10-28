import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";
import { ProcessRing } from "./ProcessRing";

export function Process({ compact = false }: { compact?: boolean }) {
  const { process } = copy;
  const listId = compact ? "process-steps-compact" : "process-steps";
  return (
    <section aria-labelledby={`${listId}-title`} className="section-y relative">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={`${listId}-title`} eyebrow={process.eyebrow} title={process.title} compact />
          <ProcessRing targetId={listId} total={process.steps.length} />
        </div>

        <ol id={listId} className="relative flex flex-col">
          {/* mobil: soldaki ince zaman çizgisi */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-white/10 lg:hidden" />
          {process.steps.map((s, i) => (
            <li
              key={s.title}
              data-step
              data-current={i === 0}
              data-reveal={String(i * 40)}
              className={cn(
                "process-step group relative flex gap-5 pb-10 last:pb-0 lg:gap-8 lg:border-t lg:border-white/10 lg:pt-8",
                compact ? "lg:pb-10" : "lg:min-h-[38vh] lg:pb-16",
              )}
            >
              {/* ark şeklinde numara düğümü */}
              <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bg lg:h-14 lg:w-14">
                <svg viewBox="0 0 44 44" aria-hidden className="absolute inset-0 h-full w-full -rotate-45">
                  <circle cx="22" cy="22" r="20" fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="1.5" />
                  <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke="#B3162B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="70 126"
                  />
                </svg>
                <span className="display text-lg tabular-nums lg:text-xl">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <div className="pt-1.5 lg:pt-2">
                <h3 className="display h3-card process-title">{s.title}</h3>
                <p className="mt-2 max-w-md text-[1.0625rem] text-fg/75">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
