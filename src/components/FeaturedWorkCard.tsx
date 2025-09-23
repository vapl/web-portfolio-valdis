import React from "react";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  slug: string;
  imageSrc: string;
  title: string;
  subtitle?: string;
  date?: string;
};

const FeaturedWorkCard = ({
  slug,
  imageSrc,
  title,
  subtitle,
  date,
}: HeroProps) => {
  return (
    <Link href={`/projects/${slug}`} className="group">
      <div className="relative w-full max-w-screen-xl aspect-[3/2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-white/10 transition transform hover:-translate-y-2">
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
        </div>

        {/* Content */}
        <div className="relative h-full w-full z-10 flex items-end">
          <div className="w-full flex justify-between items-center gap-8 p-5 backdrop-blur-sm bg-background/60 group-hover:bg-background/70">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-text group-hover:text-primary transition">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-2 text-text/50 text-xs md:text-sm leading-snug">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="inline-flex justify-center items-center px-4 py-1 rounded-full border-1 border-gray-700 text-text/90 text-sm">
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedWorkCard;
