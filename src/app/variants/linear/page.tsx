import type { Metadata } from "next";
import { LinearHero } from "@/components/heroes/LinearHero";
import { VariantPageShell } from "@/components/variant-page-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Linear Clarity`,
  description: site.description,
};

export default function LinearVariantPage() {
  return <VariantPageShell slug="linear" hero={<LinearHero />} />;
}
