import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { variants } from "@/lib/variants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest">
              {site.name}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              Landing explorations
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="max-w-2xl text-lg text-muted-foreground">{site.description}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {variants.map((v) => (
            <article
              key={v.slug}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div
                className={cn(
                  "h-36 bg-gradient-to-br",
                  v.slug === "beams" && "from-slate-950 via-slate-900 to-emerald-900/40",
                  v.slug === "linear" && "from-sky-50 via-sky-100 to-emerald-100/50",
                  v.slug === "raycast" && "from-slate-950 via-slate-900 to-emerald-500/30",
                  v.slug === "editorial" && "from-stone-950 via-stone-900 to-amber-900/30",
                )}
              />
              <div className="p-6">
                <p className="font-mono text-xs text-muted-foreground uppercase">{v.mood}</p>
                <h2 className="mt-2 text-xl font-semibold">{v.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Default theme: {v.defaultTheme}
                </p>
                <Link
                  href={`/variants/${v.slug}`}
                  className={cn(buttonVariants({ variant: "outline" }), "mt-6 w-full justify-between")}
                >
                  Open full page
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
