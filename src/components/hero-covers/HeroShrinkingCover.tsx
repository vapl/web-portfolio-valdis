"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectLinks } from "../ProjectLinks";

type HeroCoverProps = {
  /** Full-bleed background image URL */
  imageSrc: string;
  /** Main title */
  title: string;
  /** Optional subtitle/excerpt */
  excerpt?: string;
  liveUrl?: string;
  githubUrl?: string;

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
  liveUrl,
  githubUrl,
  shrinkDistance = 500,
  bottomOffset = 82,
  containerPadBase = 64,
  containerPadMd = 96,
}: HeroCoverProps) => {
  // --- 1) Measure viewport + choose container padding (match your body container) ---
  const [vh, setVh] = useState(800);
  const [isMobile, setIsmobile] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      setIsmobile(window.innerWidth < 768);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  useEffect(() => {
    // Keep it super simple; no abservers needed
    const onResize = () => {
      setVh(window.innerHeight);
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
  const imageScale = useTransform(p, [0, 1], [1.05, 0.92]);
  const imageY = useTransform(p, [0, 1], [0, -20]); // small parallax
  // Inner is larger than viewport; we don't scale here (size set by min-w/min-h)
  // If you want subtle zoom: const

  // --- 4) Text transforms (center -> bottom-left container edge) ---
  const textOpacity = useTransform(p, [0, 1], [1, 1]);

  // Title size transform
  const titleSizeDesktop = useTransform(p, [0, 1], ["5rem", "3.75rem"]);
  const titleSizeMobile = useTransform(p, [0, 1], ["5rem", "2.25rem"]);
  const subtitleSize = useTransform(p, [0, 1], ["2rem", "1.2rem"]);

  // Delta from viewport center to container's left edge and bottom offset:
  const endDY = vh / 2 - bottomOffset;
  const textY = useTransform(p, [0, 1], [0, endDY]);

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Sticky viewport: full-bleed, clipping inner parallax */}
      <div className="sticky top-0 pb-32 md:pb-16 h-[100vh] w-[100vw] overflow-hidden bg-black">
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
          className="absolute w-full pb-16 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            y: textY,
            opacity: textOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* This container must match your page body container */}
          <div ref={containerRef} className="px-16">
            <motion.h1
              className="font-bold tracking-tight leading-tight"
              style={{
                fontSize: isMobile ? titleSizeMobile : titleSizeDesktop,
              }}
            >
              {title}
            </motion.h1>
            {excerpt && (
              <motion.p
                className="mt-3 text-text/85 max-w-5xl"
                style={{ fontSize: subtitleSize }}
              >
                {excerpt}
              </motion.p>
            )}
            <div className="flex justify-start">
              {liveUrl && githubUrl && (
                <ProjectLinks liveUrl={liveUrl} githubUrl={githubUrl} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroShrinkingCover;
