"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroCoverProps = {
  /** Full-bleed background image URL */
  imageSrc: string;
  /** Main title */
  title: string;
  /** Optional subtitle/excerpt */
  excerpt?: string;

  /** How many px of scroll completes the animation */
  shrinkDistance?: number; // default 500
  /** Final bottom offset for the title block (px) */
  bottomOffset?: number; // default 32 (Tailwind bottom-8)
  /** Body container paddings to align text with the content below */
  containerPadBase?: number; // default 64  (px-16)
  containerPadMd?: number; // default 96  (md:px-24)
};

const HeroShrinkingCover = ({
  imageSrc,
  title,
  excerpt,
  shrinkDistance = 500,
  bottomOffset = 82,
  containerPadBase = 64,
  containerPadMd = 96,
}: HeroCoverProps) => {
  // --- 1) Measure viewport + choose container padding (match your body container) ---
  const [vw, setVw] = useState(1200);
  const [vh, setVh] = useState(800);
  const [pad, setPad] = useState(containerPadBase);

  useEffect(() => {
    // Keep it super simple; no abservers needed
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      setPad(window.innerWidth >= 768 ? containerPadMd : containerPadBase);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [containerPadBase, containerPadMd]);

  // --- 2) Progress relative to the hero section (stable 0..1) ---
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Gentle smoothing so it doesn't jump on wheel ticks
  const eased = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  // Convert section progress -> "finish after shrinkDistance px"
  const p = useTransform(eased, (val) => {
    const factor = vh > 0 ? vh / shrinkDistance : 1;
    return Math.min(1, val * factor);
  });

  // --- 3) Background parallax (full-bleed, no gaps) ---
  // Keep the viewport fixed 100vh; move ONLY the inner layer
  const imageScale = useTransform(p, [0, 1], [1.02, 0.92]);
  const imageY = useTransform(p, [0, 1], [0, -24]); // small parallax
  // Inner is larger than viewport; we don't scale here (size set by min-w/min-h)
  // If you want subtle zoom: const

  // --- 4) Text transforms (center -> bottom-left container edge) ---
  const textScale = useTransform(p, [0, 1], [1, 0.92]);
  const textOpacity = useTransform(p, [0, 1], [1, 1]);

  // Title size transform
  const titleSize = useTransform(p, [0, 1], ["5rem", "3.75rem"]);
  const subtitleSize = useTransform(p, [0, 1], ["2rem", "1.2rem"]);

  // Delta from viewport center to container's left edge and bottom offset:
  const endDX = -(vw / 2 - pad);
  const endDY = vh / 2 - bottomOffset;

  // We keep anchor at 50%/50% and add pixel deltas with calc()
  const textTX = useTransform(p, (t) => `calc(-50% + ${endDX * t}px)`);
  const textTY = useTransform(p, (t) => `calc(-50% + ${endDY * t}px)`);

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Sticky viewport: full-bleed, clipping inner parallax */}
      <div className="sticky top-0 h-[100vh] w-[100vw] overflow-hidden bg-black">
        {/* Parallax layer (bigger than viewport to hide edges) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[115vw] min-h-[115vh] transform-gpu"
            style={{ scale: imageScale, y: imageY }}
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />
          </motion.div>
        </div>

        {/* Text block (one wrapper, continuous motion) */}
        <motion.div
          className="relative left-1/2 top-1/2 flex items-center justify-center"
          style={{
            translateX: textTX,
            translateY: textTY,
            scale: textScale,
            opacity: textOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* This container must match your page body container */}
          <div className="px-16">
            <motion.h1
              className="font-bold tracking-tight leading-tight"
              style={{ fontSize: titleSize }}
            >
              {title}
            </motion.h1>
            {excerpt && (
              <motion.p
                className="mt-3 text-text/85 max-w-2xl"
                style={{ fontSize: subtitleSize }}
              >
                {excerpt}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroShrinkingCover;
