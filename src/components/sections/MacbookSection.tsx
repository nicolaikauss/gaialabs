"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { MacScreenUI } from "@/components/ui/mac-screen";
import { site } from "@/lib/site";

export function MacbookSection() {
  return (
    <section className="relative bg-black">
      <MacbookScroll
        title={
          <span className="text-white">
            Gaia Labs
            <br />
            <span className="text-emerald-400">Venture Platform</span>
          </span>
        }
        screenContent={<MacScreenUI description={site.description} />}
        showGradient={false}
      />
    </section>
  );
}
