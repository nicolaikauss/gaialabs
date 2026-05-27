"use client";

import { BeamsHero } from "@/components/heroes/BeamsHero";
import { ScrollColorSection } from "@/components/sections/ScrollColorSection";
import { Approach } from "@/components/sections/Approach";
import { Focus } from "@/components/sections/Focus";
import { Contact } from "@/components/sections/Contact";
import { VariantFooter } from "@/components/layout/variant-footer";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <BeamsHero />
      <ScrollColorSection />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <Approach variant="beams" />
      </motion.div>
      <Focus variant="beams" />
      <Contact variant="beams" />
      <VariantFooter variant="beams" />
    </div>
  );
}
