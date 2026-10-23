import type { LeadInput } from "@/lib/validation";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/** Veritabanında saklanan / e-postada kullanılan talep (bot alanları hariç). */
export type LeadPayload = DistributiveOmit<LeadInput, "hp" | "t">;
