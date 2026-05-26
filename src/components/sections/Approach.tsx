import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

const glassCard =
  "rounded-[2rem] border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-white/[0.09] hover:border-white/25";

export function Approach({ variant }: { variant: VariantSlug }) {
  const isDark = true;

  return (
    <section
      id="approach"
      className={cn(
        "scroll-mt-20 px-6 py-28 lg:px-8",
        isDark ? "bg-black" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header — calm, spacious */}
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/70 uppercase">
            How we work
          </p>
          <h2
            className={cn(
              "mt-4 text-[2rem] font-semibold tracking-tight leading-tight md:text-4xl",
              isDark && "text-white",
            )}
          >
            Our approach
          </h2>
          <p className={cn("mt-4 text-base leading-relaxed", isDark ? "text-white/50" : "text-muted-foreground")}>
            {site.description}
          </p>
        </div>

        {/* Floating glass feature modules */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {site.approach.map((item, i) => (
            <article
              key={item.title}
              className={cn(glassCard, "group relative overflow-hidden p-8")}
            >
              {/* Subtle top glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                aria-hidden
              />

              {/* Step number — faint, architectural */}
              <span className="font-mono text-4xl font-light leading-none text-white/10">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className={cn(
                  "mt-6 text-lg font-semibold tracking-tight",
                  isDark && "text-white",
                )}
              >
                {item.title}
              </h3>
              <p className={cn("mt-2 text-sm leading-relaxed", isDark ? "text-white/50" : "text-muted-foreground")}>
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Decorative circuit — whisper-quiet divider */}
        <div className="pointer-events-none mt-24 flex justify-center opacity-[0.08]" aria-hidden>
          <CpuArchitecture
            text="Gaia"
            className={isDark ? "text-white/50" : "text-foreground/50"}
            width="480px"
            height="100px"
          />
        </div>
      </div>
    </section>
  );
}
