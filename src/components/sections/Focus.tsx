import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";

const pillStyles: Record<VariantSlug, string> = {
  beams: "border-white/15 bg-white/10 text-white",
  linear: "border-border bg-muted text-foreground",
  raycast: "border-primary/30 bg-primary/10 text-white",
  editorial: "border-white/15 bg-white/10 text-white font-serif",
};

export function Focus({ variant }: { variant: VariantSlug }) {
  const isDark = variant !== "linear";

  return (
    <section
      id="focus"
      className={cn(
        "scroll-mt-20 border-t px-6 py-24 lg:px-8",
        isDark ? "border-white/10 bg-black/80" : "border-border bg-muted/30",
      )}
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2
          className={cn(
            "font-sans text-3xl font-semibold tracking-tight md:text-4xl",
            isDark && "text-white",
          )}
        >
          Focus areas
        </h2>
        <p className={cn("mt-4", isDark ? "text-white/60" : "text-muted-foreground")}>
          {site.tagline}
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {site.focus.map((tag) => (
            <li
              key={tag}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium",
                pillStyles[variant],
              )}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
