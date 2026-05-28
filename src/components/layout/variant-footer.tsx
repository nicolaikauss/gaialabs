import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export function VariantFooter({ variant }: { variant: VariantSlug }) {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-black">
      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{site.name}</p>
              <p className="text-xs text-white/50">{site.parent}</p>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-white/55">
              Early-stage venture capital at the intersection of deep tech, fintech, and sustainable innovation.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">Navigate</p>
            {site.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">Contact</p>
            <Link
              href="#contact"
              className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
            >
              Get in touch
            </Link>
            <p className="text-xs text-white/40">Gaia Capital · {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/40 sm:flex-row lg:px-8">
          <p>© {currentYear} {site.name}, a {site.parent} company. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-white/50 transition-colors duration-200">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white/50 transition-colors duration-200">Terms of Use</span>
            <span className="cursor-pointer hover:text-white/50 transition-colors duration-200">Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
