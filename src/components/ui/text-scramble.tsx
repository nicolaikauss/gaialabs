"use client";

import { useEffect, useRef, useState, type JSX, type ElementType } from "react";
import { motion, type MotionProps } from "motion/react";

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(Component as keyof JSX.IntrinsicElements);
  const [displayText, setDisplayText] = useState(children);
  const isAnimating = useRef(false);

  const scramble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      const progress = step / steps;
      let scrambled = "";

      for (let i = 0; i < children.length; i++) {
        if (children[i] === " ") {
          scrambled += " ";
          continue;
        }
        if (progress * children.length > i) {
          scrambled += children[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(children);
        isAnimating.current = false;
        onScrambleComplete?.();
      }
    }, speed * 1000);
  };

  useEffect(() => {
    if (!trigger) return;
    scramble();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}

/** Variant that auto-triggers when it scrolls into view. */
export function TextScrambleInView({
  children,
  threshold = 0.3,
  ...props
}: TextScrambleProps & { threshold?: number }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      <TextScramble {...props} trigger={triggered}>
        {children}
      </TextScramble>
    </span>
  );
}
