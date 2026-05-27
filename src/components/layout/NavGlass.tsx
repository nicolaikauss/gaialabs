"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavGlass() {
  return (
    <nav className="relative z-20 w-full pt-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo — clean, no extra chrome */}
        <Logo variant="full" href="/" light />

        {/* Desktop: floating glass pill nav */}
        <div className="hidden items-center space-x-0.5 rounded-full border border-white/20 bg-white/[0.07] p-1 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] backdrop-blur-2xl ring-1 ring-inset ring-white/15 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA — gradient slide-up */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href={site.ctas.primary.href}
            className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_2px_16px_-4px_rgba(52,211,153,0.25)] transition-all duration-300 hover:shadow-[0_4px_24px_-4px_rgba(52,211,153,0.45)] active:scale-[0.98]"
          >
            <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden />
            <span className="relative z-10 flex items-center gap-1.5">
              {site.ctas.primary.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Mobile: glass icon button */}
        <Sheet>
          <SheetTrigger
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-black/90 backdrop-blur-2xl text-white ring-1 ring-inset ring-white/10"
          >
            <SheetHeader>
              <SheetTitle className="text-white">{site.name}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-2 pt-6">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-lg font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={site.ctas.primary.href}
                className="group relative mt-4 inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 active:scale-[0.98]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden />
                <span className="relative z-10">{site.ctas.primary.label}</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
