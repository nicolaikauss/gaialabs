"use client";

import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { TextScrambleInView } from "@/components/ui/text-scramble";

const glassPill =
  "rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md shadow-[0_2px_12px_-4px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/10 transition-all duration-200 hover:bg-white/[0.1] hover:text-white hover:border-white/25";

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
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/70 uppercase">
            What we invest in
          </p>
          <h2
            className={cn(
              "mt-4 text-[2rem] font-semibold tracking-tight leading-tight md:text-4xl",
              isDark && "text-white",
            )}
          >
            <TextScrambleInView as="span" duration={0.9} speed={0.03}>
              Focus areas
            </TextScrambleInView>
          </h2>
          <p className={cn("mt-4 text-base leading-relaxed", isDark ? "text-white/50" : "text-muted-foreground")}>
            {site.tagline}
          </p>
        </div>

        {/* Floating glass pills */}
        <ul className="mt-14 flex flex-wrap justify-center gap-3">
          {site.focus.map((tag) => (
            <li key={tag} className={glassPill}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
