"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  abbreviation: string;
  image: string;
  slug: string;
  progress?: number; // 0..1
  activeSegment?: number; // 0..segments-1
  segments?: number;
};

export default function ProjectSlide({
  abbreviation,
  image,
  slug,
  progress = 0,
  activeSegment = 0,
  segments = 3,
}: Props) {
  return (
    <div className="flex items-center justify-center h-svh w-full overflow-hidden text-text">
      {/* Cover */}
      <Image
        src={image}
        alt={`${abbreviation} cover`}
        fill
        className="object-cover brightness-[0.6]"
        priority
      />

      <div className="flex items-center justify-center">
        <div className="flex h-[500px] w-[500px] justify-center gap-10 relative">
          {/* Abbreviation on left */}
          <div className="flex items-center">
            <div className="flex flex-col items-center gap-6 text-7xl md:text-8xl font-thin">
              {abbreviation.split("").map((ch, i) => (
                <span key={i}>{ch}</span>
              ))}
            </div>
          </div>

          {/* Vertical progress */}
          <div className="flex items-center">
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
                        className={`absolute top-0 left-0 w-[3px] rounded origin-top bg-accent ${
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

          {/* P pa labi */}
          <div className="flex items-center">
            <div className="text-7xl md:text-8xl font-semibold text-foreground/90">
              P
            </div>
          </div>

          {/* poga */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <Link
              href={`/projects/${slug}`}
              className="rounded-xl bg-primary px-6 py-3 text-sm text-foreground/90 hover:opacity-90 transition"
            >
              Go to Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
