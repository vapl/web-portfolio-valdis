'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type Props = {
  abbreviation: string;
  image: string;
  slug: string;
  progress?: number; // 0..1 no vecāka
};

export default function ProjectSlide({
  abbreviation,
  image,
  slug,
  progress = 0,
}: Props) {
  // cik segmentu un cik no tiem “aizdegt”
  const SEGMENTS = 4;
  const activeCount = useMemo(
    () => Math.min(SEGMENTS, Math.floor(progress * (SEGMENTS + 0.999))),
    [progress]
  );

  return (
    <div className="relative h-svh w-full overflow-hidden text-text">

      {/* Fona bilde */}
      <Image
        src={image}
        alt={`${abbreviation} cover`}
        fill
        className="object-cover brightness-[0.6]"
        priority
      />

      {/* About (pa kreisi) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="tracking-[0.25em] text-text/80">ABOUT</span>
      </div>

      {/* Contact (pa labi) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="tracking-[0.25em] text-text/80">CONTACT</span>
      </div>

      {/* NG (vertikāli centrā, kreisajā pusē no līnijas) */}
      <div className="absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-[calc(50%+56px)] md:-translate-x-[calc(50%+72px)]">
        <div className="flex flex-col items-center gap-6 text-7xl md:text-8xl font-light tracking-[0.25em]">
          {abbreviation.split('').map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
      </div>

      {/* Vertikālā progresijas līnija (segmentēta) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* pilnā līnija (track) */}
        <div className="h-[320px] w-[4px] rounded bg-white/15 relative">
          {/* segmenti */}
          <div className="absolute inset-1 flex flex-col justify-between py-2">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <div
                key={i}
                className={`mx-auto h-[20%] w-[4px] rounded ${
                  i < activeCount ? 'bg-primary' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* P burts pa labi no līnijas */}
      <div className="absolute left-[calc(50%+72px)] md:left-[calc(50%+96px)] top-1/2 -translate-y-1/2">
        <div className="text-7xl md:text-8xl font-semibold text-foreground/90">P</div>
      </div>

      {/* Poga apakšā centrā */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link
          href={`/projects/${slug}`}
          className="rounded-xl bg-primary px-6 py-3 text-sm text-foreground/90 hover:opacity-90 transition"
        >
          Go to Project
        </Link>
      </div>
    </div>
  );
}
