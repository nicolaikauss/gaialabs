import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";

export function Contact({ variant }: { variant: VariantSlug }) {
  const isDark = variant !== "linear";
  const isEditorial = variant === "editorial";

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-20 border-t px-6 py-24 lg:px-8",
        isDark ? "border-white/10 bg-black" : "border-border",
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            isEditorial
              ? "font-serif text-4xl font-medium tracking-tight md:text-5xl"
              : "font-sans text-3xl font-semibold tracking-tight md:text-4xl",
            isDark && "text-white",
          )}
        >
          Get in touch
        </h2>
        <p className={cn("mt-4", isDark ? "text-white/60" : "text-muted-foreground")}>
          {site.name} operates under {site.parent}.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={site.ctas.primary.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2",
              isDark && "bg-white text-black hover:bg-gray-100",
            )}
          >
            {site.ctas.primary.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={site.ctas.secondary.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              isDark && "border-white/20 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10",
            )}
          >
            {site.ctas.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
