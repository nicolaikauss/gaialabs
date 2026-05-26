"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { LaserFlowFallback } from "@/components/ui/laser-flow";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const LaserFlow = dynamic(
  () => import("@/components/ui/laser-flow").then((m) => m.LaserFlow),
  {
    ssr: false,
    loading: () => <LaserFlowFallback className="absolute inset-0" />,
  },
);

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function LaserHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="dark relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {reducedMotion ? (
          <LaserFlowFallback className="h-full w-full" />
        ) : (
          <LaserFlow className="h-full w-full" />
        )}
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <div className="relative z-10">
        {/* Nav */}
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
            <Logo variant="full" href="/" className="max-h-8" />
            <div className="hidden gap-6 md:flex">
              {site.nav.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={site.ctas.primary.href}
              className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
            >
              {site.ctas.primary.label}
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-xl">
              {site.parent}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {site.headlines.raycast}
            </h1>
            <p className="mt-6 text-lg text-white/70 sm:text-xl">
              {site.description}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={site.ctas.primary.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-white text-black shadow-xl shadow-emerald-500/20 hover:bg-gray-100",
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

          {/* Incubator dashboard mock */}
          <div
            className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            aria-hidden
          >
            <div className="mb-3 flex gap-2 border-b border-white/10 pb-3">
              {site.approach.map((item, i) => (
                <span
                  key={item.title}
                  className={cn(
                    "cursor-default rounded-full px-3 py-1 text-xs",
                    i === 0
                      ? "bg-white/10 text-white/90"
                      : "text-white/40",
                  )}
                >
                  {item.title}
                </span>
              ))}
            </div>
            <ul className="space-y-2 text-sm text-white/60">
              {site.focus.map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5">
                  <span className="size-1.5 rounded-full bg-emerald-400/70" />
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
