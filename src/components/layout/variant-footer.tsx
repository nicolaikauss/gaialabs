import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";

export function VariantFooter({ variant }: { variant: VariantSlug }) {
  const isDark = variant !== "linear";
  return (
    <footer
      className={cn(
        "border-t py-8 text-center text-sm",
        isDark
          ? "border-white/10 bg-black text-white/40"
          : "border-border text-muted-foreground",
      )}
    >
      {site.name} · {site.parent}
    </footer>
  );
}
