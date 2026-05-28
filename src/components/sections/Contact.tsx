"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Send, CheckCircle, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import type { VariantSlug } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { TextScrambleInView } from "@/components/ui/text-scramble";
import { motion, AnimatePresence } from "motion/react";

// Web3Forms — free, no backend needed.
// To activate: visit https://web3forms.com, enter ms@gaia-capital.fr, copy your access key and paste it below.
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none ring-1 ring-inset ring-white/[0.06] transition-all duration-200 focus:border-emerald-400/40 focus:ring-emerald-400/20 focus:bg-white/[0.07]";

export function Contact({ variant }: { variant: VariantSlug }) {
  const isDark = true;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New message from Gaia Labs website",
          from_name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value,
          email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value,
          message: (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.value,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-20 border-t border-white/[0.06] px-6 py-28 lg:px-8",
        isDark ? "bg-black" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-3xl">
        {/* Glass card */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.09] backdrop-blur-2xl shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/15">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />

          {/* Static header */}
          <div className="px-8 py-16 text-center sm:px-16 sm:py-20">
            <p className="font-mono text-xs tracking-[0.2em] text-emerald-400/70 uppercase">
              Start a conversation
            </p>
            <h2 className={cn("mt-4 text-[2rem] font-semibold tracking-tight leading-tight md:text-4xl", isDark && "text-white")}>
              <TextScrambleInView as="span" duration={0.9} speed={0.03}>
                Get in touch
              </TextScrambleInView>
            </h2>
            <p className={cn("mt-4 text-base leading-relaxed", isDark ? "text-white/65" : "text-muted-foreground")}>
              {site.name} operates under {site.parent}.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Primary — accordion toggle */}
              <button
                type="button"
                onClick={() => { setOpen(v => !v); if (status === "success") setStatus("idle"); }}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_2px_24px_-4px_rgba(52,211,153,0.25)] transition-all duration-300 hover:shadow-[0_4px_40px_-4px_rgba(52,211,153,0.5)] active:scale-[0.98]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden />
                <span className="relative z-10 flex items-center gap-2">
                  {site.ctas.primary.label}
                  <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
                </span>
              </button>

              {/* Secondary */}
              <Link
                href={site.ctas.secondary.href}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-medium text-white backdrop-blur-xl ring-1 ring-inset ring-white/10 transition-all duration-300 hover:border-emerald-400/40 hover:text-black active:scale-[0.98]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden />
                <span className="relative z-10">{site.ctas.secondary.label}</span>
              </Link>
            </div>
          </div>

          {/* Accordion */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="accordion"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="mx-8 h-px bg-white/[0.08] sm:mx-16" />

                <div className="px-8 pb-14 pt-10 sm:px-16">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-3 py-4 text-center"
                      >
                        <CheckCircle className="size-8 text-emerald-400" />
                        <p className="text-sm font-medium text-white">Message sent — we'll be in touch.</p>
                        <button
                          type="button"
                          onClick={() => { setStatus("idle"); setOpen(false); }}
                          className="mt-1 text-xs text-white/35 underline underline-offset-4 transition-colors hover:text-white/60"
                        >
                          Close
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col gap-5"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-white/30">Name</label>
                            <input name="name" type="text" required placeholder="Your name" className={inputCls} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-white/30">Email</label>
                            <input name="email" type="email" required placeholder="your@email.com" className={inputCls} />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[10px] uppercase tracking-widest text-white/30">Message</label>
                          <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="Tell us about your venture..."
                            className={cn(inputCls, "resize-none")}
                          />
                        </div>

                        {status === "error" && (
                          <p className="text-xs text-red-400/80">Something went wrong. Please try again.</p>
                        )}

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={status === "loading"}
                            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_2px_24px_-4px_rgba(52,211,153,0.25)] transition-all duration-300 hover:shadow-[0_4px_40px_-4px_rgba(52,211,153,0.5)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden />
                            <span className="relative z-10 flex items-center gap-2">
                              {status === "loading"
                                ? <><Loader2 className="size-4 animate-spin" />Sending…</>
                                : <><Send className="size-4" />Send message</>}
                            </span>
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
