import { cacheLife } from "next/cache";

/** Yıl önbellekli sunucu bileşeninde hesaplanır (Cache Components'ta senkron Date prerender'da yasak). */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
