"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { TextScrambleInView } from "@/components/ui/text-scramble";

const tags = ["Deep Tech", "Fintech", "Sustainable Innovation", "Seed & Series A"];

export function Focus({ variant }: { variant: VariantSlug }) {
  const isDark = true;

  return (
    <section
      id="focus"
      className={cn(
        "scroll-mt-20 border-t border-white/[0.06] px-6 py-28 lg:px-8",
        isDark ? "bg-black" : "bg-muted/30",
      )}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/70 uppercase">
            Two ways to work with us
          </p>
          <h2
            className={cn(
              "mt-4 text-[2rem] font-semibold tracking-tight leading-tight md:text-4xl",
              isDark && "text-white",
            )}
          >
            <TextScrambleInView as="span" duration={0.9} speed={0.03}>
              How we can help
            </TextScrambleInView>
          </h2>
        </div>

        {/* Two-path cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {/* Card 1 — In-house Investment */}
          <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.06] backdrop-blur-xl ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-white/[0.10] hover:border-white/30 p-10">
            {/* Top edge highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />

            {/* Label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/70">
              In-house investment
            </span>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              We back your venture
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/60 flex-1">
              We invest at Seed and Series A in deep tech, fintech, and sustainable innovation. Beyond capital, you get operational support, network access, and hands-on strategic guidance.
            </p>

            {/* Focus tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-inset ring-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="#contact"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_2px_24px_-4px_rgba(52,211,153,0.2)] transition-all duration-300 hover:shadow-[0_4px_32px_-4px_rgba(52,211,153,0.45)] active:scale-[0.98]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover/btn:translate-y-0" aria-hidden />
                <span className="relative z-10 flex items-center gap-2">
                  Reach out
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Card 2 — Build with us */}
          <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-emerald-950/20 backdrop-blur-xl ring-1 ring-inset ring-emerald-400/10 transition-all duration-300 hover:bg-emerald-950/30 hover:border-emerald-400/35 p-10">
            {/* Top edge highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" aria-hidden />

            {/* Label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/70">
              Build with us
            </span>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              We build alongside you
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/60 flex-1">
              Have an idea worth pursuing? We go beyond funding — partnering directly with founders to co-build ventures from the ground up, bringing capital, conviction, and execution together.
            </p>

            {/* Feature list */}
            <ul className="mt-6 flex flex-col gap-2">
              {["Co-founder level involvement", "From zero to launch", "Full operational support"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/55">
                  <span className="size-1.5 shrink-0 rounded-full bg-emerald-400/60" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="#contact"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-300 backdrop-blur-sm ring-1 ring-inset ring-emerald-400/10 transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-[0.98]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover/btn:translate-y-0" aria-hidden />
                <span className="relative z-10 flex items-center gap-2">
                  Let&apos;s build
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
