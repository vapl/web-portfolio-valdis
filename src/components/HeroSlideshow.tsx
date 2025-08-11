"use client";

import { useEffect, useRef, useState } from "react";
import ProjectSlide from "@/components/ProjectSlide";
import { projectList } from "@/data/projectList";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroSlideshow({ segmentMs = 3000 }: { segmentMs?: number}) {
  const segCount = Math.max(1, Math.min(3, projectList.length));

  const [index, setIndex] = useState(0); // current slide index
  const [progress, setProgress] = useState(0); // current segment 0..1
  const [activeSegment, setActiveSegment] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const lastSegmentRef = useRef<number>(-1);
  const segCountRef = useRef(segCount);
  const segDurRef = useRef<number>(segmentMs);

  // Reset animation when segment count or duration changes (if you change constants)
  useEffect(() => {
    segCountRef.current = segCount;
    segDurRef.current = segmentMs;

    startRef.current = null;
    lastSegmentRef.current = -1;
    setProgress(0);
    setActiveSegment(0);
  }, [segCount, segmentMs]);

  // Main RAF loop: advance per-segment and switch slides each segment
  useEffect(() => {
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;

      const SEG_DUR = segDurRef.current;
      const SEGMENTS = segCountRef.current;

      const active = Math.floor(elapsed / SEG_DUR);
      const segElapsed = elapsed % SEG_DUR;
      const segProgress = segElapsed / SEG_DUR;

      setProgress(segProgress);
      setActiveSegment(active % SEGMENTS);

      // Switch slide on every segment transition
      if (active !== lastSegmentRef.current) {
        lastSegmentRef.current = active;
        setIndex((i) => (i + 1) % projectList.length);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const current = projectList[index];

  // --- Motion variants for slide transition (fade + slight slide) ---
  const variants = {
    initial: { opacity: 0, y: 12, filter: "blur(2px)" }, // when entering
    animate: { opacity: 1, y: 0, filter: "blur(0px)" }, // when fully visible
    exit: { opacity: 0, y: -12, filter: "blur(2px)" }, // when leaving
  } as const;

  return (
    <div className="relative h-svh w-full overflow-hidden">
      {/* Absolute stack so slides overlap and can crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index} // important for exit/enter to trigger
          className="absolute inset-0 will-change-transform will-change-opacity"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeOut" }} // slide/fade timing
        >
          <ProjectSlide
            abbreviation={current.abbreviation}
            image={current.image}
            slug={current.slug}
            progress={progress}
            activeSegment={activeSegment}
            segments={segCount}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
