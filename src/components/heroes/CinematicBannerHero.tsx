import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CinematicBannerHero() {
  return (
    <header className="dark relative min-h-screen overflow-hidden bg-black">
      {/* Layered dark background — no external URLs */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-black to-neutral-950" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 50%, rgba(120,90,40,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 85% 20%, rgba(52,211,153,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Glass pill nav */}
      <nav className="relative z-20 px-6 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo variant="full" href="/" />
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={site.ctas.primary.href}
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden rounded-full bg-white text-black hover:bg-gray-100 sm:flex",
            )}
          >
            {site.ctas.primary.label}
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6 pb-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
            {site.parent} · {site.tagline}
          </p>
          <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
            {site.headlines.editorial}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={site.ctas.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-white text-black shadow-2xl hover:bg-gray-100",
              )}
            >
              {site.ctas.primary.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={site.ctas.secondary.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10",
              )}
            >
              {site.ctas.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
