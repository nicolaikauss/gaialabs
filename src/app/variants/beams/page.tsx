import type { Metadata } from "next";
import { BeamsHero } from "@/components/heroes/BeamsHero";
import { VariantPageShell } from "@/components/variant-page-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Ethereal Beams`,
  description: site.description,
};

export default function BeamsVariantPage() {
  return <VariantPageShell slug="beams" hero={<BeamsHero />} />;
}
