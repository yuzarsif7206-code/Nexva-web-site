import type { ArtName } from "@/components/art/TileArt";

// Varsayılan: marka paletinde vektör illüstrasyon (art). Gerçek fotoğraf gelince `src` doldurulur
// (AVIF 320x320, kırmızı tonlu, ≤12 KB); `src` varsa illüstrasyonun yerine fotoğraf gösterilir.
export const heroTiles: { src?: string; art: ArtName; alt: string }[] = [
  { art: "camera", alt: "Reklam filmi çekimi: sinema kamerası lensi" },
  { art: "drone", alt: "Dron çekimi: havadan görünüm" },
  { art: "screen", alt: "Dijital tasarım: ekran ve tasarım araçları" },
];
