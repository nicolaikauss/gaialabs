"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const LAYERS = 3;
const BEAMS_PER_LAYER = 8;
const WORDS: string[] = site.approach.map((a) => a.title.toLowerCase());

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function createBeam(width: number, height: number, layer: number): Beam {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 1 + Math.random() * 2 * (1 + layer * 0.5),
    length: height * (0.25 + Math.random() * 0.35),
    angle: -35 + Math.random() * 10,
    speed: 0.3 + Math.random() * 0.4 * (1 - layer * 0.1),
    opacity: 0.12 + Math.random() * 0.08,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.008,
    layer,
  };
}

const stagger: Variants = {
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function LaserHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);
  const [wordIndex, setWordIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  // Generate noise texture once
  useEffect(() => {
    const canvas = noiseRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 200;
    canvas.height = 200;
    const imgData = ctx.createImageData(200, 200);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 15;
    }
    ctx.putImageData(imgData, 0, 0);
  }, []);

  // Rotate words
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Beam canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      beamsRef.current = [];
      for (let layer = 0; layer < LAYERS; layer++) {
        for (let j = 0; j < BEAMS_PER_LAYER; j++) {
          beamsRef.current.push(createBeam(w, h, layer));
        }
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#020408");
      bg.addColorStop(0.5, "#070d12");
      bg.addColorStop(1, "#020408");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (let layer = LAYERS - 1; layer >= 0; layer--) {
        const layerBeams = beamsRef.current.filter((b) => b.layer === layer);
        for (const beam of layerBeams) {
          beam.pulse += beam.pulseSpeed;
          const alpha = beam.opacity * (0.7 + 0.3 * Math.sin(beam.pulse));

          ctx.save();
          ctx.translate(beam.x, beam.y);
          ctx.rotate((beam.angle * Math.PI) / 180);

          const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
          grad.addColorStop(0, `rgba(52,211,153,0)`);
          grad.addColorStop(0.4, `rgba(52,211,153,${alpha})`);
          grad.addColorStop(0.6, `rgba(52,211,153,${alpha * 0.8})`);
          grad.addColorStop(1, `rgba(52,211,153,0)`);

          ctx.fillStyle = grad;
          ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
          ctx.restore();

          beam.y += beam.speed;
          if (beam.y - beam.length > h * 1.25) {
            const fresh = createBeam(w, h, layer);
            fresh.y = -fresh.length;
            Object.assign(beam, fresh);
          }
        }
      }

      const noiseCanvas = noiseRef.current;
      if (noiseCanvas) {
        const pattern = ctx.createPattern(noiseCanvas, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.globalAlpha = 0.03;
          ctx.fillRect(0, 0, w, h);
          ctx.globalAlpha = 1;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <header className="dark relative min-h-screen w-full overflow-hidden bg-[#020408]">
      <canvas ref={noiseRef} className="hidden" aria-hidden />
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" aria-hidden />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Nav */}
      <div className="relative z-20 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Logo variant="full" href="/" light className="max-h-8" />
          <div className="hidden gap-6 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={site.ctas.primary.href}
            className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
          >
            {site.ctas.primary.label}
          </Link>
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-16 text-center lg:px-8"
        variants={stagger}
        initial={reducedMotion ? "show" : "hidden"}
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-xl">
            {site.parent}&nbsp;Â·&nbsp;{site.tagline}
          </span>
        </motion.div>

        {/* Animated headline */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span>We </span>
          <span
            className="relative inline-block overflow-hidden align-bottom"
            style={{ minWidth: "6ch" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[wordIndex]}
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="inline-block text-emerald-400"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span> with purpose</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
        >
          {site.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={site.ctas.primary.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-white text-black shadow-xl shadow-emerald-500/20 hover:bg-gray-100",
            )}
          >
            {site.ctas.primary.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={site.ctas.secondary.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full border-white/20 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10",
            )}
          >
            {site.ctas.secondary.label}
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
}

