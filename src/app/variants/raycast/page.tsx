import type { Metadata } from "next";
import { LaserHero } from "@/components/heroes/LaserHero";
import { VariantPageShell } from "@/components/variant-page-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Raycast Glow`,
  description: site.description,
};

export default function RaycastVariantPage() {
  return <VariantPageShell slug="raycast" hero={<LaserHero />} />;
}
