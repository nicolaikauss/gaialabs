import type { Metadata } from "next";
import { CinematicBannerHero } from "@/components/heroes/CinematicBannerHero";
import { VariantPageShell } from "@/components/variant-page-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — 8VC Editorial`,
  description: site.description,
};

export default function EditorialVariantPage() {
  return <VariantPageShell slug="editorial" hero={<CinematicBannerHero />} />;
}
