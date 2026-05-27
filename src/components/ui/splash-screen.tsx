"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";

export function SplashScreen() {
  const [phase, setPhase] = useState<"glitch" | "settle" | "gone">("glitch");

  useEffect(() => {
    // Glitch phase: 1.6s → settle for 0.4s → fade out
    const t1 = setTimeout(() => setPhase("settle"), 1600);
    const t2 = setTimeout(() => setPhase("gone"), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* Inject glitch keyframes once */}
      <style>{`
        @keyframes glitch-clip-1 {
          0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-4px,0); }
          10%      { clip-path: inset(10% 0 80% 0); transform: translate(4px,0); }
          20%      { clip-path: inset(40% 0 50% 0); transform: translate(-3px,0); }
          30%      { clip-path: inset(70% 0 10% 0); transform: translate(5px,0); }
          40%      { clip-path: inset(20% 0 70% 0); transform: translate(-2px,0); }
          50%      { clip-path: inset(60% 0 30% 0); transform: translate(3px,0); }
          60%      { clip-path: inset(5% 0 90% 0);  transform: translate(-5px,0); }
          70%      { clip-path: inset(80% 0 5% 0);  transform: translate(2px,0); }
          80%      { clip-path: inset(30% 0 60% 0); transform: translate(-4px,0); }
          90%      { clip-path: inset(50% 0 40% 0); transform: translate(4px,0); }
        }
        @keyframes glitch-clip-2 {
          0%,100% { clip-path: inset(50% 0 40% 0); transform: translate(4px,0); }
          15%      { clip-path: inset(80% 0 5% 0);  transform: translate(-4px,0); }
          30%      { clip-path: inset(20% 0 70% 0); transform: translate(5px,0); }
          45%      { clip-path: inset(5% 0 90% 0);  transform: translate(-3px,0); }
          60%      { clip-path: inset(60% 0 30% 0); transform: translate(2px,0); }
          75%      { clip-path: inset(35% 0 55% 0); transform: translate(-5px,0); }
          90%      { clip-path: inset(0 0 95% 0);   transform: translate(3px,0); }
        }
        @keyframes block-flicker {
          0%,100% { opacity: 0; }
          5%       { opacity: 1; }
          6%       { opacity: 0; }
          18%      { opacity: 1; }
          20%      { opacity: 0; }
          42%      { opacity: 0.7; }
          43%      { opacity: 0; }
          67%      { opacity: 1; }
          68%      { opacity: 0; }
          85%      { opacity: 0.5; }
          86%      { opacity: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes rgb-shake {
          0%,100% { text-shadow: -2px 0 #34d399, 2px 0 #000, 0 0 0 transparent; }
          25%      { text-shadow: 2px 0 #34d399, -2px 0 #000, 0 0 0 transparent; }
          50%      { text-shadow: -3px 0 #6ee7b7, 3px 0 #000, 0 2px #34d399; }
          75%      { text-shadow: 3px 0 #059669, -3px 0 #000, 0 -2px #6ee7b7; }
        }
        .glitch-layer-1 {
          animation: glitch-clip-1 0.18s steps(1) infinite;
        }
        .glitch-layer-2 {
          animation: glitch-clip-2 0.22s steps(1) infinite;
        }
        .block-flicker {
          animation: block-flicker 0.4s steps(1) infinite;
        }
        .scanline-anim {
          animation: scanline 1.4s linear infinite;
        }
        .rgb-shake {
          animation: rgb-shake 0.15s steps(1) infinite;
        }
      `}</style>

      <AnimatePresence>
        {phase !== "gone" && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          >
            {/* ── Scanline ── */}
            <div
              className="scanline-anim pointer-events-none absolute inset-x-0 h-[2px] bg-emerald-400/20"
              aria-hidden
            />

            {/* ── Block corruption tiles ── */}
            {phase === "glitch" && (
              <>
                {[
                  { top: "12%",  left: "8%",  w: "18%", h: "3px"  },
                  { top: "27%",  left: "55%", w: "30%", h: "2px"  },
                  { top: "43%",  left: "20%", w: "12%", h: "6px"  },
                  { top: "58%",  left: "70%", w: "22%", h: "3px"  },
                  { top: "74%",  left: "5%",  w: "40%", h: "2px"  },
                  { top: "88%",  left: "45%", w: "28%", h: "4px"  },
                  { top: "35%",  left: "80%", w: "15%", h: "8px"  },
                  { top: "65%",  left: "35%", w: "8%",  h: "12px" },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="block-flicker pointer-events-none absolute"
                    style={{
                      top: b.top,
                      left: b.left,
                      width: b.w,
                      height: b.h,
                      background: i % 2 === 0 ? "rgba(52,211,153,0.55)" : "rgba(255,255,255,0.07)",
                      animationDelay: `${i * 0.07}s`,
                    }}
                    aria-hidden
                  />
                ))}
              </>
            )}

            {/* ── Logo stack ── */}
            <div className="relative select-none">
              {/* RGB ghost layers (glitch only) */}
              {phase === "glitch" && (
                <>
                  <img
                    src="/gaia labs negative (1).png"
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="glitch-layer-1 pointer-events-none absolute inset-0 max-h-14 w-auto opacity-70"
                    style={{ filter: "hue-rotate(140deg) saturate(4)", mixBlendMode: "screen" }}
                  />
                  <img
                    src="/gaia labs negative (1).png"
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="glitch-layer-2 pointer-events-none absolute inset-0 max-h-14 w-auto opacity-50"
                    style={{ filter: "hue-rotate(300deg) saturate(6) invert(1)", mixBlendMode: "screen" }}
                  />
                </>
              )}

              {/* Real logo */}
              <motion.img
                src="/gaia labs negative (1).png"
                alt={site.name}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={`relative max-h-14 w-auto object-contain ${phase === "glitch" ? "rgb-shake" : ""}`}
              />
            </div>

            {/* ── Radial glow ── */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(52,211,153,0.07) 0%, transparent 70%)",
              }}
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
