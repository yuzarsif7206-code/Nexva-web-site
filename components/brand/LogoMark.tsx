export function LogoMark({
  className = "h-9 w-9",
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Nexva Dijital logosu" })}
    >
      <path d="M32 6a26 26 0 1 0 26 26" fill="none" stroke="#B3162B" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 46V18h6l12 18V18h6v28h-6L26 28v18z" fill="#F5F5F2" />
      <rect x="20" y="50" width="4" height="4" fill="#B3162B" />
      <rect x="27" y="53" width="3" height="3" fill="#B3162B" opacity=".7" />
      <rect x="22" y="57" width="2.5" height="2.5" fill="#B3162B" opacity=".45" />
    </svg>
  );
}
