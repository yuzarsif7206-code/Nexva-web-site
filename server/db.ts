import "server-only";
import type { LeadPayload } from "./types";

/** Supabase REST (SDK yok). Ortam değişkenleri yoksa kayıt adımı atlanır (e-posta yine gönderilir). */
export const dbConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

const base = () => `${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/leads`;
const headers = () => ({
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
  "Content-Type": "application/json",
});

const UUID_RE = /^[0-9a-f-]{36}$/i;
const HEX_RE = /^[0-9a-f]{64}$/i;

export async function saveLead(payload: LeadPayload, ipHash: string): Promise<{ id: string }> {
  if (!dbConfigured()) throw new Error("supabase not configured");
  const res = await fetch(base(), {
    method: "POST",
    headers: { ...headers(), Prefer: "return=representation" },
    body: JSON.stringify({ tur: payload.tur, payload, ip_hash: ipHash }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase insert ${res.status}`);
  const [row] = (await res.json()) as { id: string }[];
  return { id: row.id };
}

export async function markNotified(id: string) {
  if (!dbConfigured() || !UUID_RE.test(id)) return;
  await fetch(`${base()}?id=eq.${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ notified: true, notified_at: new Date().toISOString() }),
    cache: "no-store",
  });
}

export async function countRecent(ipHash: string, minutes: number): Promise<number> {
  if (!dbConfigured() || !HEX_RE.test(ipHash)) return 0;
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const res = await fetch(
    `${base()}?select=id&ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(since)}`,
    {
      headers: { ...headers(), Prefer: "count=exact", Range: "0-0" },
      cache: "no-store",
    },
  );
  const range = res.headers.get("content-range"); // "0-0/12"
  return range ? Number(range.split("/")[1]) || 0 : 0;
}

export type PendingLead = { id: string; payload: LeadPayload; attempts: number };

export async function listPending(limit = 20): Promise<PendingLead[]> {
  if (!dbConfigured()) return [];
  const res = await fetch(
    `${base()}?select=id,payload,attempts&notified=eq.false&attempts=lt.5&order=created_at.asc&limit=${limit}`,
    { headers: headers(), cache: "no-store" },
  );
  return res.ok ? ((await res.json()) as PendingLead[]) : [];
}

export async function bumpAttempts(id: string, attempts: number) {
  if (!dbConfigured() || !UUID_RE.test(id)) return;
  await fetch(`${base()}?id=eq.${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ attempts: attempts + 1 }),
    cache: "no-store",
  });
}
