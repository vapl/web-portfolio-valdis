"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function AboutHero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress for this section (0..1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 0 at start hits top, 1 when bottom hits top
  });

  // Smoother curve
  const t = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 50,
  });

  // --- Timings (tune to taste) ---
  const SPLIT_END = 0.45; // when the split fully opened
  const ZOOM_END = 0.6;

  // Overlays translate Y in percentages so they slide off screen
  const topY = useTransform(t, [0, SPLIT_END], ["0%", "-110%"]);
  const bottomY = useTransform(t, [0, SPLIT_END], ["0%", "110%"]);

  // Background image scale for a gentle parallax zoom-out
  const imgScale = useTransform(
    t,
    [0, SPLIT_END, ZOOM_END, 1],
    [1.15, 1.0, 1.0, 1.0]
  );
  const vignetteOpacity = useTransform(t, [0, 1], [0.3, 0.1]);

  return (
    <section ref={ref} className="relative h-[230vh] bg-black">
      {/* Sticky stage that stays in view during the animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image (your portrait) */}
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <Image
            src="/images/about/portrait-image.png" // <-- replace with your file
            alt="Valdis portrait"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle vignette to keep text legible */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 pointer-events-none"
            style={{ opacity: vignetteOpacity }}
          />
        </motion.div>

        {/* TOP panel: full-screen, but clipped to the TOP half */}
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{
            y: topY,
            // Slight overlap (49.6%) prevents hairline seam on some DPRs
            clipPath: "inset(0 0 50.1% 0)",
          }}
        >
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/70" />
          {/* the same centered letters for BOTH panels (relative to whole stage) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="relative left-11 md:left-11 lg:left-16 xl:left-20 select-none font-extrabold leading-none text-primary/20 text-[clamp(220px,28vw,520px)]">
              V
            </span>
            <span className="relative right-11 md:right-11 lg:right-16 xl:right-20 select-none font-extrabold leading-none text-white/30 text-[clamp(220px,28vw,520px)]">
              V
            </span>
          </div>
        </motion.div>

        {/* BOTTOM panel: full-screen, but clipped to the BOTTOM half */}
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{
            y: bottomY,
            clipPath: "inset(50.0% 0 0 0)",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="relative left-11 md:left-11 lg:left-16 xl:left-20 select-none font-extrabold leading-none text-primary/20 text-[clamp(220px,28vw,520px)]">
              V
            </span>
            <span className="relative right-11 md:right-11 lg:right-16 xl:right-20 select-none font-extrabold leading-none text-white/30 text-[clamp(220px,28vw,520px)]">
              V
            </span>
          </div>
          {/* Social links */}
          <div className="absolute bottom-0 w-full h-18">
            <div className="flex gap-12 justify-center">
              <a
                href="https://www.linkedin.com/in/valdis-va%C5%A1%C4%8Denkovs-b68511276/"
                className="text-primary hover:text-secondary transition-all duration-300"
                target="_blank"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://x.com/VVascenkovs"
                className="text-primary hover:text-secondary transition-all duration-300"
                target="_blank"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://github.com/vapl"
                className="text-primary hover:text-secondary transition-all duration-300"
                target="_blank"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </motion.div>
        <noscript />
      </div>
    </section>
  );
}
