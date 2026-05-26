"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function NavGlass() {
  return (
    <nav className="relative z-20 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo variant="full" href="/" />
        <div className="hidden items-center space-x-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href={site.ctas.primary.href}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-white text-black hover:bg-gray-100",
            )}
          >
            {site.ctas.primary.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <Sheet>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white md:hidden")}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-slate-950 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">{site.name}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-lg font-medium">
                  {item.label}
                </Link>
              ))}
              <Link
                href={site.ctas.primary.href}
                className={cn(buttonVariants(), "mt-4 rounded-full")}
              >
                {site.ctas.primary.label}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
