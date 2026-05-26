import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";

export function Contact({ variant }: { variant: VariantSlug }) {
  const isDark = true;

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-20 border-t border-white/[0.06] px-6 py-28 lg:px-8",
        isDark ? "bg-black" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-3xl">
        {/* Final glass CTA panel */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.05] px-8 py-16 backdrop-blur-2xl shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/10 sm:px-16 sm:py-20">
          {/* Subtle top luminance */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            aria-hidden
          />

          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/70 uppercase">
              Start a conversation
            </p>
            <h2
              className={cn(
                "mt-4 text-[2rem] font-semibold tracking-tight leading-tight md:text-4xl",
                isDark && "text-white",
              )}
            >
              Get in touch
            </h2>
            <p className={cn("mt-4 text-base leading-relaxed", isDark ? "text-white/50" : "text-muted-foreground")}>
              {site.name} operates under {site.parent}.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Primary — solid white with emerald glow */}
              <Link
                href={site.ctas.primary.href}
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black",
                  "shadow-[0_2px_24px_-4px_rgba(52,211,153,0.25)] transition-all duration-300",
                  "hover:shadow-[0_4px_32px_-4px_rgba(52,211,153,0.35)] hover:bg-emerald-50 active:scale-[0.98]",
                )}
              >
                {site.ctas.primary.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary — liquid glass */}
              <Link
                href={site.ctas.secondary.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white",
                  "bg-white/[0.06] backdrop-blur-xl ring-1 ring-inset ring-white/10",
                  "transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 active:scale-[0.98]",
                )}
              >
                {site.ctas.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
