import { NextResponse } from "next/server";
import { retryPending } from "@/server/retry";

/** Vercel Cron (günde bir kez): bildirimi başarısız talepleri yeniden dener. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const result = await retryPending();
  return NextResponse.json({ ok: true, ...result });
}
