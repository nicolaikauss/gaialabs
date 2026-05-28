"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavGlass } from "@/components/layout/NavGlass";
import { site } from "@/lib/site";
import { BeamsStaticFallback } from "@/components/ui/beams-background";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const BeamsBackground = dynamic(
  () =>
    import("@/components/ui/beams-background").then((m) => m.BeamsBackground),
  {
    ssr: false,
    loading: () => <BeamsStaticFallback className="absolute inset-0" />,
  },
);

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const stagger: Variants = {
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Liquid Glass badge — small frosted pill with luminous edge */
function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl ring-1 ring-inset ring-white/20"
    >
      {children}
    </span>
  );
}

/** Liquid Glass primary CTA — solid white with soft emerald tint on hover */
function GlassPrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98]",
        "bg-white text-black shadow-[0_2px_24px_-4px_rgba(52,211,153,0.25)]",
        "hover:text-black hover:shadow-[0_4px_40px_-4px_rgba(52,211,153,0.5)]",
      )}
    >
      {/* Gradient fill that slides in on hover */}
      <span
        className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0"
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Liquid Glass secondary CTA — translucent with depth */
function GlassSecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white",
        "bg-white/[0.06] backdrop-blur-xl ring-1 ring-inset ring-white/10",
        "transition-all duration-300 hover:border-emerald-400/40 hover:text-black active:scale-[0.98]",
      )}
    >
      {/* Gradient fill slides in on hover */}
      <span
        className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

export function BeamsHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Layer 0: animated beams canvas */}
      <div className="absolute inset-0 z-0">
        {reducedMotion ? (
          <BeamsStaticFallback className="h-full w-full" />
        ) : (
          <BeamsBackground
            className="h-full w-full"
            lightColor="#34d399"
            beamWidth={2.5}
            beamHeight={18}
            beamNumber={15}
            speed={2.5}
            noiseIntensity={2}
            scale={0.15}
            rotation={43}
          />
        )}
      </div>

      {/* Layer 1: depth gradient wash — soft vignette for readability */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* Layer 2: content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <NavGlass />

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-10 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <motion.div
              className="flex flex-col items-center text-center"
              variants={stagger}
              initial={reducedMotion ? "show" : "hidden"}
              animate="show"
            >
              {/* Floating glass badge */}
              <motion.div variants={fadeUp} className="mb-10">
                <GlassBadge>{site.parent}</GlassBadge>
              </motion.div>

              {/* Headline — large, confident, calm */}
              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {site.headlines.beams.split(" ").map((word, i) =>
                  i >= 3 ? (
                    <span
                      key={`${word}-${i}`}
                      className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-500 bg-clip-text text-transparent"
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={`${word}-${i}`}>{word} </span>
                  ),
                )}
              </motion.h1>

              {/* Glass CTA row */}
              <motion.div
                variants={fadeUp}
                className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
              >
                <GlassPrimaryButton href={site.ctas.primary.href}>
                  {site.ctas.primary.label}
                </GlassPrimaryButton>
                <GlassSecondaryButton href={site.ctas.secondary.href}>
                  {site.ctas.secondary.label}
                </GlassSecondaryButton>
              </motion.div>

              {/* Floating credibility strip — translucent pills */}
              <motion.div
                variants={fadeUp}
                className="mt-20 flex flex-wrap items-center justify-center gap-3"
              >
                {["Deep Tech", "Fintech", "Sustainable Innovation", "Seed & Series A"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/[0.09] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md ring-1 ring-inset ring-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

