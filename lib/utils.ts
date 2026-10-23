import { clsx, type ClassValue } from "clsx";

/** Sınıf birleştirme (hafif, istemci paketine uygun). Çakışan Tailwind sınıfı vermeyin. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
