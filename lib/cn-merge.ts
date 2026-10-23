import "server-only";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Çakışan Tailwind sınıflarını birleştirir (ör. h-12 + h-14). Yalnızca sunucu bileşenlerinde: istemci paketine girmez. */
export function cnm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
