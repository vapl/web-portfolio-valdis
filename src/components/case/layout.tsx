"use client";

import { LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type LayoutProps = {
  meta: {
    title: string;
    excerpt: string;
    cover: string;
    tags: string[];
    publishedAt: string;
    liveUrl?: string;
    githubUrl?: string;
  };
  children: React.ReactNode;
};

export const CaseStuddyLayout = ({ meta, children }: LayoutProps) => {
  // How many pixels of scroll should complete the shrink animation
  const SHRINK_DISTANCE = 50;

  // Framer: global window scroll value
  const { scrollY } = useScroll();

  // Map scrollY -> CSS height (strings are allowed in Motion style)
  const heroHeight = useTransform(
    scrollY,
    [0, SHRINK_DISTANCE],
    ["100vh", "44vh"]
  );

  // Calculate animation progress (0 -> 1)
  const progress = useTransform(scrollY, [0, SHRINK_DISTANCE], [0, 1]);

  // Slight text scaliing while docking to corner
  const textScale = useTransform(progress, [0, 1], [1, 0.94]);
  const textOpacity = useTransform(progress, [0, 1], [1, 1]); // keep opaque (tweek if needed)

  // Boolean: when fully shrunk, render "docked" container
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const unsub = progress.on("change", (v) => setIsDocked(v >= 1));
    return () => unsub();
  }, [progress]);

  return (
    <main className="min-h-screen text-text bg-background">
      {/* Hero */}
      <motion.section
        // Animate height via Motion style - smooth and GPU friendly
        className="relative w-full overflow-hidden will-change-[height]"
        style={{ height: heroHeight }}
      >
        <Image
          src={meta.cover}
          alt={meta.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to black/80" />
        {/* Shared layout group lets the text jump between wrappers and animate position */}
        <LayoutGroup>
          {/* Centered wrapper (visible while not docked). We keep it mounted until docking finishes */}
          {!isDocked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                layoutId="heroText"
                style={{ scale: textScale, opacity: textOpacity }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="pointer-events-auto max-w-3xl px-6 text-center"
              >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {meta.title}
                </h1>
                <p className="mt-3 text-text/85 text-base md:text-lg max-w-2xl">
                  {meta.excerpt}
                </p>
              </motion.div>
            </div>
          )}

          {isDocked && (
            <div className="absolute bottom-8 left-6 md:left-10 max-w-3xl pointer-events-none">
              <motion.div
                layoutId="heroText" // <— same key; Motion morphs position/size
                style={{ scale: textScale, opacity: textOpacity }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="pointer-events-auto max-w-3xl text-left px-8 md:px-12"
              >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {meta.title}
                </h1>
                <p className="mt-3 text-text/85 text-base md:text-lg max-w-2xl">
                  {meta.excerpt}
                </p>
              </motion.div>
            </div>
          )}
        </LayoutGroup>
      </motion.section>

      {/* Body */}
      <section className="max-w-5xl mx-auto px-16 md:px-24 py-10 md:py-14">
        {children}
      </section>
    </main>
  );
};
