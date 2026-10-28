import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  sub,
  align = "left",
  as: Tag = "h2",
  compact,
  className,
}: {
  /** Bir kademe küçük başlık (Hakkımızda bölümü) */
  compact?: boolean;
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn("display text-balance", Tag === "h1" ? "h1-hero" : compact ? "h2-compact" : "h2-section")}
      >
        {title}
      </Tag>
      {sub && (
        <p
          className={cn(
            "max-w-xl text-pretty text-[1.0625rem] text-muted md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
