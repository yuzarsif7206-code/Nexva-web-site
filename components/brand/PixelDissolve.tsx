import { cn } from "@/lib/utils";
import { PauseOffscreen } from "@/components/motion/PauseOffscreen";

// Deterministik konumlar (SSR/istemci aynı). [x%, y%, boyut px, gecikme ms]
const PIXELS: [number, number, number, number][] = [
  [8, 12, 6, 0],
  [18, 30, 4, 900],
  [27, 8, 5, 1700],
  [36, 22, 3, 400],
  [47, 14, 6, 2300],
  [58, 34, 4, 1200],
  [66, 6, 5, 2900],
  [74, 26, 3, 600],
  [83, 16, 6, 2000],
  [92, 32, 4, 3400],
  [13, 46, 3, 2600],
  [41, 50, 5, 3800],
  [62, 52, 3, 1500],
  [88, 48, 5, 4200],
];

/** Logodaki N harfinin piksel çözülmesi. Mobilde 10 piksel. */
export function PixelDissolve({ className }: { className?: string }) {
  return (
    <PauseOffscreen className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {PIXELS.map(([x, y, s, d], i) => (
        <span
          key={i}
          className={cn("pixel absolute bg-brand", i >= 10 && "hidden md:block")}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            ["--d" as string]: d,
          }}
        />
      ))}
    </PauseOffscreen>
  );
}
