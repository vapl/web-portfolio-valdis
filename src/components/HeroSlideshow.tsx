"use client";

import { useEffect, useRef, useState } from "react";
import ProjectSlide from "@/components/ProjectSlide";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectMeta } from "@/lib/getProjects";

type HeroSlideshowProps = {
  projects: ProjectMeta[];
  segmentMs?: number;
};

export default function HeroSlideshow({
  segmentMs = 3000,
  projects,
}: HeroSlideshowProps) {
  const segCount = Math.max(1, Math.min(3, projects.length));

  const [index, setIndex] = useState(0); // current slide index
  const [progress, setProgress] = useState(0); // current segment 0..1
  const [activeSegment, setActiveSegment] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const lastSegmentRef = useRef<number>(-1);
  const segCountRef = useRef(segCount);
  const segDurRef = useRef<number>(segmentMs);
  const pauseStartRef = useRef<number | null>(null);

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
      // Enter pause mode
      if (paused) {
        if (pauseStartRef.current == null) pauseStartRef.current = t;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Exit pause mode
      if (pauseStartRef.current != null) {
        const pausedFor = t - pauseStartRef.current;
        if (startRef.current != null) {
          startRef.current += pausedFor;
        }
        pauseStartRef.current = null;
      }

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
        setIndex((i) => (i + 1) % projects.length);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, projects.length]);

  const current = projects[index];

  return (
    <div className="relative h-svh w-full overflow-hidden">
      {/* Absolute stack so slides overlap and can crossfade */}
      <ProjectSlide
        abbreviation={current.abbreviation}
        image={current.cover}
        slug={current.slug}
        progress={progress}
        activeSegment={activeSegment}
        segments={segCount}
        onPauseChange={setPaused}
        onSegmentClick={(index) => setActiveSegment(index)}
      />
    </div>
  );
}
