import { NextResponse, after } from "next/server";
import { leadSchema } from "@/lib/validation";
import { countRecent, dbConfigured, markNotified, saveLead } from "@/server/db";
import { sendLeadMail } from "@/server/mail";
import { retryPending } from "@/server/retry";
import { hashIp, memoryRateLimit } from "@/server/spam";

// Not: Cache Components açıkken `runtime`/`dynamic` export'u kullanılamaz.
// POST işleyicileri her istekte çalışır, Node.js runtime varsayılandır.

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const { hp, t, ...payload } = parsed.data;

  // Bot kontrolleri: sessizce başarılı dön (botu bilgilendirme)
  if (hp || t < 3000) return NextResponse.json({ ok: true });

  // Hız sınırı: IP özetine göre son 10 dakikada ≥5 kayıt
  const ipHash = hashIp(req.headers.get("x-forwarded-for") ?? "");
  const limited = dbConfigured()
    ? (await countRecent(ipHash, 10).catch(() => 0)) >= 5
    : memoryRateLimit(ipHash);
  if (limited) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const saved = dbConfigured()
    ? await saveLead(payload, ipHash).catch((e) => {
        console.error("saveLead", e);
        return null;
      })
    : null;
  const mail = await sendLeadMail(payload, saved?.id).catch((e) => {
    console.error("sendLeadMail", e);
    return { ok: false as const };
  });

  if (saved && mail.ok) await markNotified(saved.id).catch(console.error);
  if (!saved && !mail.ok) {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  // Bekleyen bildirimleri yanıt gönderildikten sonra yeniden dene
  after(() => retryPending().catch(console.error));
  return NextResponse.json({ ok: true, id: saved?.id, notified: mail.ok });
}
