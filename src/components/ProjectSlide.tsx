"use client";

import Image from "next/image";
import Link from "next/link";

type ProjectSlideProps = {
  abbreviation: string;
  image: string;
  slug: string;
};

export default function ProjectSlide({
  abbreviation,
  image,
  slug,
}: ProjectSlideProps) {
  return (
    <div
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center`}
    >
      <Image
        src={image}
        alt="NFTs Guard project cover"
        fill
        className="object-cover brightness-[0.5]"
        priority
      />

      {/* Centered abbreviation */}
      <div className="absolute text-8xl front-light tracking-widest flex flex-col items-center text-white font-thin">
        {abbreviation.split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>

      {/* View project button */}
      <Link
        href={`/projects/${slug}`}
        className="absolute bottom-10 px-6 py-3 bg-purple-500 rounded-md text-white text-sm hover:bg-purple-600 transition"
      >
        View Project
      </Link>
    </div>
  );
}
