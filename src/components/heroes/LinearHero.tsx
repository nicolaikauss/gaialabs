"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";

export function LinearHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="dark w-full isolate min-h-screen overflow-hidden relative bg-black">
      {/* Dark gradient background — no external URLs */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #020408 0%, #0d1117 45%, #080d14 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 72% 58%, rgba(52,211,153,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Nav */}
      <header className="relative z-20">
        <div className="mx-6 pt-4">
          <div className="flex items-center justify-between">
            <Logo variant="full" href="/" />

            <nav className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={site.ctas.primary.href}
                  className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                >
                  {site.ctas.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white/90" />
              ) : (
                <Menu className="h-5 w-5 text-white/90" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur md:hidden">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-32 md:pt-40 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-up">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-900">
                {site.parent}
              </span>
              <span className="text-sm font-medium text-white/90">{site.tagline}</span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up-delay-1 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {site.headlines.linear.split(" ").map((word, i) =>
                i === 1 ? (
                  <span key={word} className="text-emerald-400">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={word}>{word} </span>
                ),
              )}
            </h1>

            {/* Description */}
            <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
              {site.description}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={site.ctas.primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                {site.ctas.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={site.ctas.secondary.href}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {site.ctas.secondary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Focus tags */}
          <div className="animate-fade-up-delay-3 mx-auto mt-20 max-w-2xl">
            <div className="flex flex-wrap justify-center gap-2">
              {site.focus.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
