import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { labels } from "@/lib/labels";
import { SITE } from "@/lib/site-config";
import { waLinkFor } from "@/lib/whatsapp";
import { INTERNAL_PRICING } from "./internal-pricing";
import type { LeadPayload } from "./types";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const mailConfigured = () =>
  Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

let transporter: Transporter | null = null;
function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""),
    },
  });
  return transporter;
}

function secimOzeti(d: LeadPayload): { baslik: string; ic: string } {
  if (d.tur === "paket") return { baslik: labels.paket[d.paket], ic: INTERNAL_PRICING.paket[d.paket] };
  if (d.tur === "proje") return { baslik: labels.proje[d.proje], ic: INTERNAL_PRICING.proje[d.proje] };
  return {
    baslik: `Özel iş: ${d.hizmetler.map((h) => labels.hizmet[h]).join(", ")}`,
    ic: `Müşteri bütçesi: ${labels.butce[d.butce]}`,
  };
}

export async function sendLeadMail(d: LeadPayload, id?: string): Promise<{ ok: boolean }> {
  if (!mailConfigured()) {
    console.error("mail: GMAIL_USER / GMAIL_APP_PASSWORD tanımlı değil");
    return { ok: false };
  }
  const s = secimOzeti(d);
  const subject = `Yeni Talep: ${d.ad} — ${s.baslik}`.replace(/[\r\n]+/g, " ");
  // Müşteri girdisi e-posta HTML'ine ham girmez: her değer kaçışlanır (HTML enjeksiyonu önlemi)
  const row = (k: string, v?: string) =>
    v
      ? `<tr><td style="padding:8px 12px;color:#666;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 12px"><b>${esc(v).replace(/\n/g, "<br>")}</b></td></tr>`
      : "";
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
    <h2 style="margin:0 0 12px">Yeni teklif talebi</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row("Talep", s.baslik)}
      ${row("İç bilgi (sitede gösterilmez)", s.ic)}
      ${row("Aşama", labels.asama[d.asama])}
      ${row("Zamanlama", labels.zamanlama[d.zamanlama])}
      ${row("Reklam harcaması planı", d.reklamButcesi ? labels.reklamButcesi[d.reklamButcesi] : undefined)}
      ${row("Ad soyad", d.ad)}
      ${row("Firma", d.firma)}
      ${row("Telefon", d.telefon)}
      ${row("Tercih edilen kanal", labels.kanal[d.kanal])}
      ${row("E-posta", d.eposta)}
      ${row("Not", d.not)}
      ${row("Kayıt no", id)}
    </table>
    <p style="margin:20px 0">
      <a href="tel:${esc(d.telefon)}" style="background:#E5311B;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;margin-right:8px;display:inline-block">Ara</a>
      <a href="${esc(waLinkFor(d.telefon))}" style="background:#25D366;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;display:inline-block">WhatsApp'tan yaz</a>
    </p>
    <p style="color:#888;font-size:12px">Müşteriye ${esc(SITE.responseSla)} içinde dönüş sözü verildi.</p>
  </div>`;

  const text = [
    `Yeni teklif talebi`,
    `Talep: ${s.baslik}`,
    `İç bilgi: ${s.ic}`,
    `Aşama: ${labels.asama[d.asama]}`,
    `Zamanlama: ${labels.zamanlama[d.zamanlama]}`,
    d.reklamButcesi && `Reklam harcaması planı: ${labels.reklamButcesi[d.reklamButcesi]}`,
    `Ad soyad: ${d.ad}`,
    d.firma && `Firma: ${d.firma}`,
    `Telefon: ${d.telefon}`,
    `Kanal: ${labels.kanal[d.kanal]}`,
    d.eposta && `E-posta: ${d.eposta}`,
    d.not && `Not: ${d.not}`,
    id && `Kayıt no: ${id}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await getTransporter().sendMail({
      from: `"Nexva Dijital Web" <${process.env.GMAIL_USER}>`,
      to: process.env.LEAD_TO_EMAIL || process.env.GMAIL_USER,
      replyTo: d.eposta || undefined,
      subject,
      html,
      text,
    });
    return { ok: true };
  } catch (e) {
    console.error("mail", e);
    return { ok: false };
  }
}
