"use client";
import { motion } from "framer-motion";
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
};

export default function ProjectSlide({
  abbreviation,
  image,
  slug,
  progress = 0,
  activeSegment = 0,
  segments = 3,
  onPauseChange = () => {},
}: Props) {
  // augšā var paturēt lokāli
  const pauseCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect x='5' y='3' width='5' height='18' fill='white' stroke='black' stroke-width='1'/%3E%3Crect x='14' y='3' width='5' height='18' fill='white' stroke='black' stroke-width='1'/%3E%3C/svg%3E") 12 12, auto`;

  return (
    <div className="flex items-center justify-center h-svh w-full overflow-hidden text-text">
      {/* Cover */}
      <Image
        src={image}
        alt={`${abbreviation} cover`}
        fill
        className="object-cover brightness-[0.6] ponter-events-none -z-10"
        priority
      />

      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex justify-center gap-10 relative">
          {/* Abbreviation on left */}
          <div className="flex items-center">
            <div className="flex flex-col items-center gap-6 text-7xl md:text-8xl font-thin">
              {abbreviation.split("").map((ch, i) => (
                <span key={i}>{ch}</span>
              ))}
            </div>
          </div>

          {/* Vertical progress */}
          <div
            className="flex items-center"
            onMouseEnter={() => onPauseChange(true)}
            onMouseLeave={() => onPauseChange(false)}
            onTouchStart={() => onPauseChange(true)}
            onTouchEnd={() => onPauseChange(false)}
            style={{ cursor: pauseCursor }}
          >
            <div className="flex h-[320px] w-[4px]">
              {/* slots ar konst. atstarpi starp tiem */}
              <div className="flex h-full flex-col items-center gap-3">
                {Array.from({ length: segments }).map((_, i) => {
                  const isActive = i === activeSegment;

                  return (
                    <div key={i} className="relative h-[160px] w-[3px]">
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
        <div className="flex items-center">
          <motion.div
            className="rounded-xl border-2 border-primary px-6 py-3 text-md text-primary hover:text-foreground/90 hover:bg-primary transition cursor-pointer"
            initial={{ opacity: 0, scale: 0.5, x: "0vw", y: "-30vh" }} // no ekrāna vidus
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.6 }}
          >
            <Link href={`/projects/${slug}`}>
              Go to Project
            </Link>
          </motion.div>


          
        </div>
      </div>
    </div>
  );
}
