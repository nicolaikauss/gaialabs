import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
  href?: string;
  light?: boolean;
};

export function Logo({ variant = "mark", className, href = "/", light = false }: LogoProps) {
  const src = light ? "/logo-full-light.svg" : variant === "full" ? "/logo-full.svg" : "/logo-mark.svg";

  const content = (
    <img
      src={src}
      alt={site.name}
      className={cn(
        "h-auto w-auto bg-transparent object-contain object-left",
        variant === "full" ? "max-h-10 max-w-[160px]" : "max-h-9 max-w-[120px]",
        className,
      )}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {content}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{content}</span>;
}
