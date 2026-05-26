"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { LaserFlowWebGLFallback } from "@/components/ui/laser-flow-webgl";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const LaserFlowWebGL = dynamic(
  () => import("@/components/ui/laser-flow-webgl").then((m) => m.LaserFlowWebGL),
  {
    ssr: false,
    loading: () => <LaserFlowWebGLFallback className="absolute inset-0" />,
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

const stagger: Variants = {
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

export function CinematicBannerHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="dark relative min-h-screen overflow-hidden bg-black">
      {/* WebGL beam â€” shifted lower via verticalBeamOffset */}
      <div className="absolute inset-0 z-0">
        {reducedMotion ? (
          <LaserFlowWebGLFallback className="absolute inset-0" />
        ) : (
          <LaserFlowWebGL
            color="#34d399"
            horizontalBeamOffset={0.22}
            verticalBeamOffset={0.18}
            verticalSizing={4.2}
            horizontalSizing={0.38}
            fogIntensity={0.38}
            fogScale={0.28}
            wispSpeed={9.0}
            wispIntensity={3.5}
            flowStrength={0.22}
            decay={1.1}
            falloffStart={1.6}
            fogFallSpeed={0.45}
            wispDensity={0.9}
            mouseTiltStrength={0.008}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Left-side vignette so text stays legible */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Nav */}
      <nav className="relative z-20 px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo variant="full" href="/" />
          <div className="hidden items-center gap-10 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={site.ctas.primary.href}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full border border-white/15 bg-white/8 text-white backdrop-blur-sm hover:bg-white/15",
            )}
          >
            {site.ctas.primary.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-7xl flex-col justify-center px-6 pb-28 pt-4 lg:px-10"
        variants={stagger}
        initial={reducedMotion ? "show" : "hidden"}
        animate="show"
      >
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="mb-7 font-mono text-[10px] tracking-[0.35em] text-emerald-400/60 uppercase"
          >
            {site.parent}&nbsp;&nbsp;Â·&nbsp;&nbsp;{site.tagline}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3rem,6.5vw,6rem)] font-extrabold leading-[1.0] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {site.headlines.editorial}
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-white/45"
          >
            {site.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={site.ctas.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-emerald-400 font-semibold text-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-300",
              )}
            >
              {site.ctas.primary.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={site.ctas.secondary.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/15 bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              {site.ctas.secondary.label}
            </Link>
          </motion.div>

          {/* Approach strip */}
          <motion.div
            variants={fadeUp}
            className="mt-20 flex items-center gap-10 border-t border-white/10 pt-7"
          >
            {site.approach.map((item) => (
              <div key={item.title} className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase">
                  {item.title}
                </span>
                <span className="text-xs text-white/40">
                  {item.description.split("â€”")[0].trim().split(".")[0]}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}

