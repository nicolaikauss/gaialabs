import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RaycastHero() {
  return (
    <header className="dark relative min-h-screen overflow-hidden bg-background">
      <div className="hero-glow absolute inset-0" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
            <Logo variant="full" href="/" light className="max-h-8 rounded-md" />
            <div className="hidden gap-6 md:flex">
              {site.nav.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={site.ctas.primary.href}
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full shadow-lg shadow-primary/25",
              )}
            >
              {site.ctas.primary.label}
            </Link>
          </div>
        </div>
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {site.headlines.raycast}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Launching SaaS and fintech products under {site.parent}.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={site.ctas.primary.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full shadow-xl shadow-primary/30",
                )}
              >
                {site.ctas.primary.label}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={site.ctas.secondary.href}
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                {site.ctas.secondary.label}
              </Link>
            </div>
          </div>
          <div
            className="mx-auto mt-16 w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            aria-hidden
          >
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white/40">
              <Search className="size-4 shrink-0" />
              <span className="text-sm">What we build…</span>
            </div>
            <ul className="mt-2 space-y-1 text-left text-sm text-white/60">
              {site.focus.map((item) => (
                <li key={item} className="rounded-md px-3 py-2 hover:bg-white/5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
