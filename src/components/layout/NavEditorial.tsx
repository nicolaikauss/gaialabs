import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";

export function NavEditorial() {
  return (
    <nav className="relative z-20 w-full border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo variant="full" href="/" />
        <div className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link href={site.ctas.primary.href} className={buttonVariants({ size: "sm" })}>
            {site.ctas.primary.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
