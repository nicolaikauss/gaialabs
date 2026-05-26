import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";

const surfaceStyles: Record<VariantSlug, string> = {
  beams: "border-white/10 bg-white/5 backdrop-blur-xl text-white",
  linear: "border-border bg-card shadow-sm",
  raycast: "border-white/10 bg-white/5 backdrop-blur-xl text-white",
  editorial: "border-white/10 bg-white/5 backdrop-blur-xl text-white",
};

export function Approach({ variant }: { variant: VariantSlug }) {
  const isDark = variant !== "linear";

  return (
    <section
      id="approach"
      className={cn(
        "scroll-mt-20 px-6 py-24 lg:px-8",
        isDark ? "bg-black" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-7xl">
        <h2
          className={cn(
            "font-sans text-3xl font-semibold tracking-tight md:text-4xl",
            isDark && "text-white",
          )}
        >
          Our approach
        </h2>
        <p className={cn("mt-4", isDark ? "text-white/60" : "text-muted-foreground")}>
          {site.description}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.approach.map((item, i) => (
            <article
              key={item.title}
              className={cn("rounded-xl border p-6", surfaceStyles[variant])}
            >
              <span className="font-mono text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={cn(
                  "mt-3 text-xl font-semibold",
                  isDark && "text-white",
                )}
              >
                {item.title}
              </h3>
              <p className={cn("mt-2 text-sm", isDark ? "text-white/60" : "text-muted-foreground")}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
