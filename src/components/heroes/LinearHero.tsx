"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { useSyncExternalStore } from "react";

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

/** Floating orb â€” pure CSS, no canvas needed */
function Orb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ y: [0, -24, 0], scale: [1, 1.06, 1] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

export function LinearHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full isolate min-h-screen overflow-hidden bg-white">
      {/* Background: subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />

      {/* Floating orbs */}
      {!reducedMotion && (
        <>
          <Orb
            className="h-[480px] w-[480px] bg-emerald-300/25 top-[-80px] left-[8%]"
            delay={0}
          />
          <Orb
            className="h-[320px] w-[320px] bg-emerald-200/20 top-[10%] right-[12%]"
            delay={2.5}
          />
          <Orb
            className="h-[200px] w-[200px] bg-teal-200/20 bottom-[20%] left-[40%]"
            delay={1.2}
          />
        </>
      )}

      {/* Gradient wash â€” keeps text sharp */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-transparent to-white/80" />

      {/* Nav */}
      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-6 pt-5 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo variant="full" href="/" />

            <nav className="hidden md:flex items-center">
              <div className="flex items-center gap-1 rounded-full bg-black/5 px-1 py-1 ring-1 ring-black/8">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3.5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-full hover:bg-black/5"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={site.ctas.primary.href}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
                >
                  {site.ctas.primary.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 ring-1 ring-black/10"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-neutral-700" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-700" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-white p-4 ring-1 ring-black/10 shadow-lg md:hidden">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pt-32 md:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial={reducedMotion ? "show" : "hidden"}
            animate="show"
            className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-black/10 shadow-sm"
          >
            <span className="inline-flex items-center rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-white">
              {site.parent}
            </span>
            <span className="text-sm font-medium text-neutral-500">{site.tagline}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial={reducedMotion ? "show" : "hidden"}
            animate="show"
            className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
          >
            {site.headlines.linear.split(" ").map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={
                  word.toLowerCase() === "ventures"
                    ? "text-emerald-500"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial={reducedMotion ? "show" : "hidden"}
            animate="show"
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg"
          >
            {site.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial={reducedMotion ? "show" : "hidden"}
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href={site.ctas.primary.href}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-neutral-700 transition-colors"
            >
              {site.ctas.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={site.ctas.secondary.href}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-neutral-500 ring-1 ring-neutral-200 hover:ring-neutral-400 hover:text-neutral-800 transition-colors bg-white"
            >
              {site.ctas.secondary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Focus tags */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial={reducedMotion ? "show" : "hidden"}
          animate="show"
          className="mx-auto mt-20 max-w-xl"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {site.focus.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-medium text-neutral-500 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

