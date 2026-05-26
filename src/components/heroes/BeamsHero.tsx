"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavGlass } from "@/components/layout/NavGlass";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

export function BeamsHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="dark relative min-h-screen w-full overflow-hidden bg-black">
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
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative z-10">
        <NavGlass />
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              variants={stagger}
              initial={reducedMotion ? "show" : "hidden"}
              animate="show"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-xl">
                  {site.parent}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                {site.headlines.beams.split(" ").map((word, i) =>
                  i >= 3 ? (
                    <span
                      key={`${word}-${i}`}
                      className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 bg-clip-text text-transparent"
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={`${word}-${i}`}>{word} </span>
                  ),
                )}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl"
              >
                {site.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link
                  href={site.ctas.primary.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-white text-black shadow-2xl shadow-emerald-500/20 hover:bg-gray-100",
                  )}
                >
                  {site.ctas.primary.label}
                  <ArrowRight className="size-5" />
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

