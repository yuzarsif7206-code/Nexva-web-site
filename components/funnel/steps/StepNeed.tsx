"use client";

import { Layers, Sparkles } from "lucide-react";
import { iconMap } from "@/components/ui/icons";
import { packages } from "@/content/packages";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { labels } from "@/lib/labels";
import type { Hizmet, Paket, Proje } from "@/lib/validation";
import { OptionCard } from "../OptionCard";
import { StepShell } from "../StepShell";
import type { Draft } from "../funnel-logic";

export function StepNeed({
  draft,
  onPick,
  onToggleService,
  error,
}: {
  draft: Draft;
  onPick: (v: { tur: "paket"; paket: Paket } | { tur: "proje"; proje: Proje } | { tur: "ozel" }) => void;
  onToggleService: (h: Hizmet) => void;
  error?: string;
}) {
  const group = "eyebrow mb-3 text-muted";
  return (
    <StepShell title="Neye ihtiyacınız var?">
      <div className="flex flex-col gap-8">
        <fieldset>
          <legend className={group}>Hizmet paketleri</legend>
          <div className="grid gap-2.5">
            {packages.map((p) => (
              <OptionCard
                key={p.slug}
                title={labels.paket[p.slug]}
                description={p.tagline}
                badge={p.featured ? "Öne çıkan" : undefined}
                selected={draft.tur === "paket" && draft.paket === p.slug}
                onClick={() => onPick({ tur: "paket", paket: p.slug })}
                icon={<Sparkles className="h-5 w-5" aria-hidden />}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={group}>Tek seferlik projeler</legend>
          <div className="grid gap-2.5 md:grid-cols-2">
            {projects.map((p) => {
              const Icon = iconMap[p.icon];
              return (
                <OptionCard
                  key={p.slug}
                  title={p.title}
                  selected={draft.tur === "proje" && draft.proje === p.slug}
                  onClick={() => onPick({ tur: "proje", proje: p.slug })}
                  icon={<Icon className="h-5 w-5" aria-hidden />}
                />
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className={group}>Diğer</legend>
          <OptionCard
            title="Özel bir iş / birden fazla hizmet"
            description="İstediğiniz hizmetleri seçin, size özel kapsam çıkaralım."
            selected={draft.tur === "ozel"}
            onClick={() => onPick({ tur: "ozel" })}
            icon={<Layers className="h-5 w-5" aria-hidden />}
          />
          {draft.tur === "ozel" && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-4">
              <p className="mb-3 px-1 text-sm font-semibold" id="hizmet-sec">
                Hangi hizmetler? <span className="font-normal text-muted">(birden fazla seçebilirsiniz)</span>
              </p>
              <div className="grid gap-2 md:grid-cols-2" role="group" aria-labelledby="hizmet-sec">
                {services.map((s) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <OptionCard
                      key={s.slug}
                      multi
                      title={s.title}
                      selected={draft.hizmetler.includes(s.slug)}
                      onClick={() => onToggleService(s.slug)}
                      icon={<Icon className="h-5 w-5" aria-hidden />}
                    />
                  );
                })}
              </div>
              {error && (
                <p role="alert" className="mt-3 px-1 text-sm font-medium text-accent">
                  {error}
                </p>
              )}
            </div>
          )}
        </fieldset>
      </div>
    </StepShell>
  );
}
