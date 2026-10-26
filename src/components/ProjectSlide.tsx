"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  progress?: number;
  activeSegment?: number;
  segments: number;
  projectTitles: string[];
  onPauseChange: (paused: boolean) => void;
  onSegmentClick: (segmentIndex: number) => void;
};

export default function ProjectSlide({
  title,
  excerpt,
  image,
  slug,
  progress = 0,
  activeSegment = 0,
  segments,
  projectTitles,
  onPauseChange,
  onSegmentClick,
}: Props) {
  return (
    <div className="relative isolate flex min-h-svh w-full items-center overflow-hidden bg-black text-white">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={image}
          className="pointer-events-none absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/80 to-black/65" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-11 py-28 md:px-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <div className="min-w-0">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-primary md:text-base">
            Valdis Vascenkovs
          </p>
          <h1 className="max-w-3xl text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.08] tracking-tight">
            Internal tools, automation &amp; web applications.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            I turn business problems into working digital systems with modern
            web technologies and AI-assisted development.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-xl bg-primary px-5 py-3 font-medium text-black transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Explore projects
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-white/30 px-5 py-3 font-medium transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              About me
            </Link>
          </div>
        </div>

        <section
          aria-label="Featured project"
          className="min-w-0 rounded-2xl border border-white/20 bg-black/55 p-6 shadow-2xl md:p-8"
          onMouseEnter={() => onPauseChange(true)}
          onMouseLeave={() => onPauseChange(false)}
          onFocus={() => onPauseChange(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              onPauseChange(false);
            }
          }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">
            Selected work · {activeSegment + 1} / {segments}
          </p>
          <h2 className="mt-5 break-words text-2xl font-semibold leading-tight md:text-3xl">
            <Link
              href={`/projects/${slug}`}
              className="transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {title}
            </Link>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
            {excerpt}
          </p>
          <Link
            href={`/projects/${slug}`}
            className="mt-6 inline-flex items-center gap-3 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View case study <span aria-hidden="true">→</span>
          </Link>

          <div className="mt-7 flex gap-3" aria-label="Project navigation">
            {projectTitles.map((projectTitle, index) => (
              <button
                key={projectTitle}
                type="button"
                aria-label={`Show ${projectTitle}`}
                aria-current={index === activeSegment ? "true" : undefined}
                onClick={() => onSegmentClick(index)}
                className="group relative h-10 min-w-0 flex-1 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="absolute inset-x-0 top-1/2 h-1 overflow-hidden rounded-full bg-white/25 transition group-hover:bg-white/40">
                  <span
                    className="absolute inset-0 origin-left bg-primary"
                    style={{
                      transform: `scaleX(${index === activeSegment ? Math.max(0, Math.min(1, progress)) : 0})`,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
