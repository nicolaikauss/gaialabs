"use client";

import { useTheme, type Theme } from "@/components/providers/theme-provider";
import { useEffect } from "react";
import type { VariantSlug } from "@/lib/variants";
import { variants } from "@/lib/variants";

export function VariantTheme({ slug }: { slug: VariantSlug }) {
  const { setTheme } = useTheme();
  const variant = variants.find((v) => v.slug === slug);

  useEffect(() => {
    if (variant) {
      setTheme(variant.defaultTheme as Theme);
    }
  }, [slug, setTheme, variant]);

  return null;
}
