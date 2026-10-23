import { cn } from "@/lib/utils";
import { PauseOffscreen } from "@/components/motion/PauseOffscreen";

/**
 * Logodaki kırmızı yaydan türeyen lens/diyafram dekoru. Yalnızca transform animasyonu.
 * Ekran dışında duraklar.
 */
export function ArcBackdrop({
  className,
  intensity = 1,
  id = "arc",
}: {
  className?: string;
  intensity?: number;
  /** Sayfada birden fazla kullanılırsa benzersiz verin (SVG gradient id). */
  id?: string;
}) {
  return (
    <PauseOffscreen className={cn("pointer-events-none absolute", className)}>
      <svg viewBox="0 0 400 400" className="h-full w-full" style={{ opacity: intensity }}>
        <defs>
          <linearGradient id={`${id}-g1`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E5311B" />
            <stop offset="1" stopColor="#5C0A15" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-g2`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B3162B" />
            <stop offset="1" stopColor="#B3162B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="arc-spin">
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke={`url(#${id}-g1)`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="520 611"
          />
        </g>
        <g className="arc-spin-rev">
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke={`url(#${id}-g2)`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="300 580"
            opacity=".55"
          />
        </g>
        <g className="arc-spin">
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="#B3162B"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity=".5"
          />
        </g>
      </svg>
    </PauseOffscreen>
  );
}
