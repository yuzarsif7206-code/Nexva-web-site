import type { ArtName } from "@/components/art/TileArt";

// `src` varsa fotoğraf (kare, marka paletine tonlanmış), yoksa vektör illüstrasyon (art) gösterilir.
export const heroTiles: { src?: string; art?: ArtName; alt: string }[] = [
  { art: "camera", alt: "Reklam çekimi: sinema kamerası lensi" },
  { src: "/hero/laptop.webp", alt: "Karanlıkta kırmızı ışıkla parlayan dizüstü bilgisayar" },
  { art: "screen", alt: "Dijital tasarım: ekran ve tasarım araçları" },
];
