/** Yazarken 05XX XXX XX XX biçimine sokar. +90 / 90 / baştaki 0 eksik durumlarını tolere eder. */
export function formatPhoneInput(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90") && d.length > 10) d = d.slice(2);
  if (d.startsWith("5")) d = `0${d}`;
  d = d.slice(0, 11);
  const parts = [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)].filter(Boolean);
  return parts.join(" ");
}

/** Gönderimde 0 ile başlayan 11 haneye normalize eder. */
export function normalizePhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90") && d.length === 12) d = d.slice(2);
  if (/^5\d{9}$/.test(d)) d = `0${d}`;
  return d;
}
