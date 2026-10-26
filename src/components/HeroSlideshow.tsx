"use client";

import { useEffect, useRef, useState } from "react";
import ProjectSlide from "@/components/ProjectSlide";
import { ProjectMeta } from "@/lib/getProjects";

type HeroSlideshowProps = {
  projects: ProjectMeta[];
  segmentMs?: number;
};

export default function HeroSlideshow({
  segmentMs = 3000,
  projects,
}: HeroSlideshowProps) {
  const projectCount = projects.length;

  const [index, setIndex] = useState(0); // current slide index
  const [progress, setProgress] = useState(0); // current segment 0..1
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const firstIndexRef = useRef(0);
  const pauseStartRef = useRef<number | null>(null);

  // Reset animation when segment count or duration changes (if you change constants)
  useEffect(() => {
    startRef.current = null;
    firstIndexRef.current = 0;
    pauseStartRef.current = null;
    setIndex(0);
    setProgress(0);
  }, [projectCount, segmentMs]);

  // Main RAF loop: advance per-segment and switch slides each segment
  useEffect(() => {
    if (projectCount === 0) return;

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

      const active = Math.floor(elapsed / segmentMs);

      setProgress((elapsed % segmentMs) / segmentMs);
      setIndex((firstIndexRef.current + active) % projectCount);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, projectCount, segmentMs]);

  const current = projects[index] ?? projects[0];
  if (!current) return null;

  const selectProject = (selectedIndex: number) => {
    firstIndexRef.current = selectedIndex;
    startRef.current = null;
    pauseStartRef.current = null;
    setIndex(selectedIndex);
    setProgress(0);
  };

  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      {/* Absolute stack so slides overlap and can crossfade */}
      <ProjectSlide
        title={current.title}
        excerpt={current.excerpt}
        image={current.cover}
        slug={current.slug}
        progress={progress}
        activeSegment={index}
        segments={projectCount}
        projectTitles={projects.map((project) => project.title)}
        onPauseChange={setPaused}
        onSegmentClick={selectProject}
      />
    </div>
  );
}
