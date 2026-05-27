"use client";

import { cn } from "@/lib/utils";

const stats = [
  { label: "Stage", value: "Seed & Series A" },
  { label: "Focus", value: "Deep Tech · Fintech" },
  { label: "Mission", value: "Sustainable Innovation" },
];

const chips = ["Deep Tech", "Fintech", "Sustainable Innovation", "Seed & Series A"];

function GlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.12] bg-white/[0.08] shadow-lg ring-1 ring-inset ring-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MacScreenUI({ description }: { description: string }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#050810] p-4 gap-3">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(52,211,153,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <GlassCard className="relative z-10 flex items-center justify-between px-4 py-2.5 bg-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" />
          <span className="text-xs font-semibold tracking-wide text-white/80">
            Gaia Labs
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">
            Portfolio Platform
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Active
        </span>
      </GlassCard>

      {/* Stat cards row */}
      <div className="relative z-10 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <GlassCard key={s.label} className="flex flex-col gap-1 p-3 bg-white/[0.05]">
            <span className="text-[9px] font-medium uppercase tracking-widest text-white/30">
              {s.label}
            </span>
            <span className="text-[11px] font-semibold leading-tight text-white/80">
              {s.value}
            </span>
          </GlassCard>
        ))}
      </div>

      {/* Main description card */}
      <GlassCard className="relative z-10 flex-1 overflow-hidden">
        {/* Emerald left accent */}
        <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-emerald-400/80 via-emerald-500/50 to-transparent" />
        <div className="p-4 pl-5">
          <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-400/70 mb-2">
            About
          </p>
          <p className="text-[12px] leading-relaxed text-white/70">
            {description}
          </p>
        </div>
      </GlassCard>

      {/* Focus chips */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/50 ring-1 ring-inset ring-white/[0.06]"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
