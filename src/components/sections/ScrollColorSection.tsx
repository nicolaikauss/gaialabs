"use client";

import { motion } from "motion/react";
import { site } from "@/lib/site";
import { TextScrambleInView } from "@/components/ui/text-scramble";

const cards = [
  { label: "Stage", value: "Seed & Series A" },
  { label: "Focus", value: "Deep Tech · Fintech" },
  { label: "Mission", value: "Sustainable Innovation" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
} as const;

export function ScrollColorSection() {
  return (
    <section className="w-full bg-black px-6 py-28 lg:px-8">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-emerald-400" />
          <p className="font-mono text-[11px] tracking-[0.25em] text-emerald-400/70 uppercase">
            Who we are
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20 items-start">
          {/* Left: headline */}
          <motion.h2
            variants={fadeUp}
            className="text-[2.4rem] font-semibold leading-[1.1] tracking-tight text-white md:text-5xl"
          >
            <TextScrambleInView as="span" duration={1} speed={0.03}>
              Capital with
            </TextScrambleInView>
            {" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              <TextScrambleInView as="span" duration={0.8} speed={0.025}>
                conviction.
              </TextScrambleInView>
            </span>
          </motion.h2>

          {/* Right: description + stat cards */}
          <div className="flex flex-col gap-8">
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-white/70 md:text-lg"
            >
              {site.description}
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
              {cards.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.15] bg-white/[0.08] p-4 ring-1 ring-inset ring-white/[0.08]"
                >
                  <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-white/50">
                    {label}
                  </span>
                  <span className="text-[11px] font-semibold leading-tight text-white/90">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
