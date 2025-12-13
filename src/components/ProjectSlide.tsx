"use client";

import { AnimatePresence, motion, easeOut, easeIn } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  abbreviation: string;
  image: string;
  slug: string;
  progress?: number; // 0..1
  activeSegment?: number; // 0..segments-1
  segments?: number;
  onPauseChange?: (paused: boolean) => void;
  onSegmentClick?: (segmentIndex: number) => void;
};

export default function ProjectSlide({
  abbreviation,
  image,
  slug,
  progress = 0,
  activeSegment = 0,
  segments = 3,
  onPauseChange = () => {},
  onSegmentClick,
}: Props) {
  return (
    <div className="flex items-center justify-center h-svh w-full overflow-hidden text-text">
      <AnimatePresence mode="wait">
        {/* Cover */}
        <motion.div
          key={image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={image}
            alt={`${abbreviation} cover`}
            fill
            className="object-cover brightness-[0.6] pointer-events-none"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex justify-center gap-10 relative">
          {/* Abbreviation on left */}
          <div className="flex items-center w-12">
            <div className="flex flex-col items-center gap-6 text-7xl md:text-8xl font-thin">
              <AnimatePresence mode="wait">
                <motion.div
                  key={abbreviation}
                  className="flex flex-col items-center gap-6 text-7xl md:text-8xl font-thin"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {abbreviation.split("").map((ch, i, arr) => {
                    const isTop = i === 0;
                    const isBottom = i === arr.length - 1;

                    // Direction logic
                    const fromY = isTop ? -44 : isBottom ? 44 : 0;
                    const exitY = isTop ? 44 : isBottom ? -44 : 0;

                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: fromY }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.35,
                            ease: "easeIn",
                            delay: i * 0.08, // stagger manually
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: exitY,
                          transition: {
                            duration: 0.2,
                            ease: "easeIn",
                          },
                        }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Vertical progress */}
          <div
            className="flex items-center cursor-pointer"
            onMouseEnter={() => onPauseChange(true)}
            onMouseLeave={() => onPauseChange(false)}
            onTouchStart={() => onPauseChange(true)}
            onTouchEnd={() => onPauseChange(false)}
          >
            <div className="flex h-[320px] w-[4px]">
              {/* slots ar konst. atstarpi starp tiem */}
              <div className="flex h-full flex-col items-center gap-3">
                {Array.from({ length: segments }).map((_, i) => {
                  const isActive = i === activeSegment;

                  return (
                    <div
                      key={i}
                      className="relative h-[160px] w-[3px]"
                      onClick={() => onSegmentClick?.(i)}
                    >
                      {/* statiska fona līnija */}
                      <div className="absolute inset-0 w-[3px] rounded bg-white/20" />

                      {/* progresējošā pārklājuma līnija (no augšas uz leju) */}
                      <div
                        key={`${i}-${isActive}`} // force remount, lai nebūtu animācijas atpakaļ lecot uz nākamo
                        className={`absolute top-0 left-0 w-[3px] rounded origin-top bg-primary ${
                          isActive ? "" : "opacity-0"
                        }`}
                        style={{
                          height: "100%",
                          transform: `scaleY(${
                            isActive ? Math.max(0, Math.min(1, progress)) : 0
                          })`,
                          transition: isActive
                            ? "transform 120ms linear"
                            : "none",
                          willChange: isActive ? "transform" : "auto",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* P on right */}
          <div className="flex items-center">
            <div className="text-7xl md:text-8xl font-semibold text-foreground/90">
              P
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex items-center z-10">
          <motion.div
            className="rounded-xl border border-primary px-6 py-3 text-md text-primary hover:text-foreground/90 hover:bg-primary transition cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.6 }}
            onMouseEnter={() => onPauseChange(true)}
            onMouseLeave={() => onPauseChange(false)}
          >
            <Link href={`/projects/${slug}`}>Go to Project</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
