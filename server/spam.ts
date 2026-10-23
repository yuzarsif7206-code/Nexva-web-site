import "server-only";
import { createHash } from "node:crypto";

/** IP adresi saklanmaz; tuzlu SHA-256 özeti tutulur. */
export function hashIp(forwardedFor: string): string {
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  return createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT ?? "nexva-default-salt"))
    .digest("hex");
}

// Veritabanı yokken de çalışan, örnek başına bellek içi hız sınırı (yedek katman).
const hits = new Map<string, number[]>();

export function memoryRateLimit(ipHash: string, max = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const list = (hits.get(ipHash) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(ipHash, list);
    return true;
  }
  list.push(now);
  hits.set(ipHash, list);
  if (hits.size > 5000) hits.clear(); // bellek güvenliği
  return false;
}
