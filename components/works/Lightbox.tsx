"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { WorkImage } from "@/content/works";

/** Tam genişlik galeri; dokununca native <dialog> lightbox (odak tuzağı ve Esc tarayıcıdan). */
export function Lightbox({ images }: { images: WorkImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback(
    (d: number) => setIndex((i) => (i + d + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  if (!images.length) return null;
  const current = images[index];

  return (
    <>
      <ul className="grid gap-4 md:gap-6">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => open(i)}
              data-cursor="view"
              className="block w-full overflow-hidden rounded-[1.25rem] md:rounded-3xl"
              aria-label={`Görseli büyüt: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width:1280px) 1184px, 100vw"
                placeholder={img.blurDataURL ? "blur" : "empty"}
                blurDataURL={img.blurDataURL}
                className="h-auto w-full"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Görsel önizleme"
        className="m-0 h-full max-h-none w-full max-w-none bg-bg/95 p-0 text-fg backdrop:bg-black/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-3">
            <p className="px-2 text-sm text-muted tabular-nums">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-white/10"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {images.length > 1 && (
            <div className="flex justify-center gap-3 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Önceki görsel"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Sonraki görsel"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
