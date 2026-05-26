import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NavEditorial } from "@/components/layout/NavEditorial";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";

export function EditorialHero() {
  return (
    <header className="relative min-h-screen overflow-hidden bg-background">
      <NavEditorial />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
            {site.parent}
          </p>
          <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.1] tracking-tight text-foreground md:text-7xl">
            {site.headlines.editorial}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
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
        </div>
        <div className="relative flex items-center justify-center lg:col-span-2">
          <div className="relative aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-3xl border border-border bg-secondary/40" />
            <div className="absolute inset-8 flex items-center justify-center rounded-2xl border border-primary/20 bg-card p-6">
              <Logo variant="full" href="/" className="max-h-full max-w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border py-4">
        <div className="flex animate-marquee gap-8 whitespace-nowrap">
          {[...site.focus, ...site.focus].map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="font-serif text-lg text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
