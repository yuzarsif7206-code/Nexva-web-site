"use client";

import { useEffect, useState } from "react";

/**
 * sessionStorage'da saklanan taslak. Her erişim try/catch içinde (gizli sekme, Instagram tarayıcısı).
 * Yalnızca istemcide render edilen bileşenlerde kullanılır (lazy init SSR'da çalışmaz).
 */
export function useSessionDraft<T>(key: string, init: () => T, accept: (stored: T) => boolean) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        if (accept(parsed)) return parsed;
      }
    } catch {
      /* depolama yok: varsayılanla devam */
    }
    return init();
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* yok say */
    }
  }, [key, value]);

  const clear = () => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* yok say */
    }
  };

  return [value, setValue, clear] as const;
}
