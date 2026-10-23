import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cnm as cn } from "@/lib/cn-merge";

type Common = {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
};

/** Hero ve CTA'daki hap buton: solda metin, sağda 36 px koyu yuvarlak içinde ok. */
export function PillCta({ href, children, className, external, ...rest }: Common & { href: string }) {
  const inner = (
    <>
      <span className="pl-2">{children}</span>
      <span className="round-icon h-9 w-9 bg-bg/90 text-fg">
        <ArrowUpRight className="arrow-nudge h-[18px] w-[18px]" aria-hidden />
      </span>
    </>
  );
  const cls = cn("btn btn-primary h-14 min-w-[240px] justify-between pr-2.5 pl-5", className);
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  external,
  icon,
  ...rest
}: Common & {
  href: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}) {
  const cls = cn("btn h-12", variant === "primary" ? "btn-primary" : "btn-secondary", className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
