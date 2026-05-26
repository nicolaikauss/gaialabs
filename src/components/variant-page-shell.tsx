import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Focus } from "@/components/sections/Focus";
import { FeaturesBento } from "@/components/sections/FeaturesBento";
import { VariantFooter } from "@/components/layout/variant-footer";
import { VariantTheme } from "@/components/variant-theme";
import type { VariantSlug } from "@/lib/variants";
import type { ReactNode } from "react";

export function VariantPageShell({
  slug,
  hero,
}: {
  slug: VariantSlug;
  hero: ReactNode;
}) {
  return (
    <div data-variant={slug} className="min-h-screen">
      <VariantTheme slug={slug} />
      {hero}
      {slug === "linear" ? (
        <>
          <FeaturesBento />
          <Contact variant={slug} />
        </>
      ) : (
        <>
          <Approach variant={slug} />
          <Focus variant={slug} />
          <Contact variant={slug} />
        </>
      )}
      <VariantFooter variant={slug} />
    </div>
  );
}
