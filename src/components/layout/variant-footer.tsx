import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";

export function VariantFooter({ variant }: { variant: VariantSlug }) {
  const isDark = true;
  return (
    <footer
      className={cn(
        "border-t py-10 text-center text-sm",
        isDark
          ? "border-white/[0.06] bg-black text-white/30"
          : "border-border text-muted-foreground",
      )}
    >
      <span className="tracking-wide">{site.name} · {site.parent}</span>
    </footer>
  );
}
