import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavMinimal } from "@/components/layout/NavMinimal";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LinearHero() {
  return (
    <header className="relative min-h-screen overflow-hidden bg-background">
      <div className="bg-grid-subtle absolute inset-0 opacity-60" />
      <NavMinimal />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="animate-fade-up font-mono text-sm text-muted-foreground">
            {site.parent} · {site.tagline}
          </p>
          <h1 className="animate-fade-up-delay-1 mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {site.headlines.linear.split(" ").map((word, i) =>
              i === 1 ? (
                <span key={word} className="underline decoration-primary decoration-2 underline-offset-8">
                  {word}{" "}
                </span>
              ) : (
                <span key={word}>{word} </span>
              ),
            )}
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {site.description}
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={site.ctas.primary.href} className={buttonVariants({ size: "lg" })}>
              {site.ctas.primary.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={site.ctas.secondary.href}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {site.ctas.secondary.label}
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <span className="text-primary">01</span> Launch
            <span className="mx-3 text-border">·</span>
            <span className="text-primary">02</span> Invest
            <span className="mx-3 text-border">·</span>
            <span className="text-primary">03</span> Build
          </p>
        </div>
        <div className="animate-fade-up-delay-3 mx-auto mt-16 w-full max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-amber-400/80" />
              <span className="size-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">gaialabs — product</span>
            </div>
            <div className="space-y-3 p-6">
              <div className="h-3 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="mt-4 h-24 rounded-lg bg-secondary/60" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
