"use client";

import dynamic from "next/dynamic";

/** Funnel yalnızca istemcide ve yalnızca /teklif-al rotasında yüklenir (ana sayfa paketine girmez). */
const LeadFunnel = dynamic(() => import("./LeadFunnel"), {
  ssr: false,
  loading: () => <FunnelSkeleton />,
});

export function FunnelClient() {
  return <LeadFunnel />;
}

export function FunnelSkeleton() {
  return (
    <div className="container-x max-w-3xl pt-6 md:pt-10" aria-busy="true" aria-label="Form yükleniyor">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full border-4 border-white/10" />
        <div>
          <p className="eyebrow">Teklif al</p>
          <p className="mt-1 text-sm text-muted">Yaklaşık 60 saniye sürer.</p>
        </div>
      </div>
      <p className="display h2-section mt-12 text-fg/90">Neye ihtiyacınız var?</p>
      <div className="mt-8 grid gap-2.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-16 rounded-2xl border border-white/10 bg-surface-2" />
        ))}
      </div>
    </div>
  );
}
