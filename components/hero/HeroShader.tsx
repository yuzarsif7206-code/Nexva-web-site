"use client";

import { useEffect, useRef, useState } from "react";

/**
 * İstemci kabuğu: ana pakete yalnızca bu girer. Motor + GLSL, `load` olayından sonra
 * boşta kalma anında ayrı chunk olarak indirilir. Kapılardan biri kapalıysa hiç indirilmez.
 */
export default function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroy: (() => void) | undefined;
    let cancelled = false;

    const boot = async () => {
      const canvas = ref.current;
      if (cancelled || !canvas) return;
      // Kapıların ucuz olanları önce: shader dosyası gereksiz yere indirilmesin
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
        deviceMemory?: number;
      };
      if (
        nav.connection?.saveData ||
        ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "") ||
        (nav.deviceMemory ?? 4) <= 2 ||
        (navigator.hardwareConcurrency ?? 4) <= 2 ||
        typeof WebGL2RenderingContext === "undefined"
      )
        return; // Seviye 0'da kal
      try {
        const { getShaderMode, startShader } = await import("./shader-engine"); // ayrı chunk
        const mode = getShaderMode();
        if (mode === "off" || cancelled) return;
        destroy = startShader(
          canvas,
          mode,
          () => setReady(true),
          () => setReady(false),
        );
      } catch {
        // sessiz yedek: CSS degradesi görünür kalır
      }
    };
    const kick = () => {
      if (typeof window.requestIdleCallback === "function")
        window.requestIdleCallback(() => void boot(), { timeout: 2000 });
      else setTimeout(() => void boot(), 1200); // Safari
    };

    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", kick);
      destroy?.();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
