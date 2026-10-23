import "server-only";
import { bumpAttempts, listPending, markNotified } from "./db";
import { mailConfigured, sendLeadMail } from "./mail";

/** notified=false ve attempts<5 olan talepler için e-postayı yeniden dener. */
export async function retryPending(): Promise<{ tried: number; sent: number }> {
  if (!mailConfigured()) return { tried: 0, sent: 0 };
  const pending = await listPending();
  let sent = 0;
  for (const lead of pending) {
    const r = await sendLeadMail(lead.payload, lead.id);
    if (r.ok) {
      await markNotified(lead.id);
      sent++;
    } else {
      await bumpAttempts(lead.id, lead.attempts);
    }
  }
  return { tried: pending.length, sent };
}
