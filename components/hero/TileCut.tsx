const CUTS = [
  "M0 100 L0 58 L62 100 Z", // sol altta üçgen
  "M100 100 L100 62 L38 100 Z", // sağ altta üçgen
  "M0 100 L0 70 L100 38 L100 100 Z", // alt şerit
];
const PIXELS: [number, number, number][][] = [
  [
    [28, 70, 5],
    [42, 80, 4],
    [52, 88, 3],
  ],
  [
    [72, 73, 5],
    [58, 83, 4],
    [48, 91, 3],
  ],
  [
    [20, 57, 4],
    [50, 45, 5],
    [80, 37, 3],
  ],
];

/** Kutu kesikleri: logodaki piksel çözülmesini taşır. Tek SVG, ≈0.5 KB. */
export function TileCut({ i }: { i: 0 | 1 | 2 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute inset-0 h-full w-full"
    >
      <path d={CUTS[i]} fill="#0A0A0B" />
      <g fill="#B3162B">
        {PIXELS[i].map(([x, y, s]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={s} height={s} />
        ))}
      </g>
    </svg>
  );
}
