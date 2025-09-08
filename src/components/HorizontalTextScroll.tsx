"use client";

import React, { useRef, useState, useEffect } from "react";

type Props = {
  topRowText: string;
  botRowText: string;
};

export default function HorizontalTextScroll({
  topRowText,
  botRowText,
}: Props) {
  const [offset, setOffset] = useState(0); // inertia offset (desktop only)
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [limits, setLimits] = useState({ top: 0, bot: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const DAMPING = 0.95;
  const SPEED = 0.00008;

  // Detect if it's mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Measure available scroll distances
  useEffect(() => {
    const updateLimits = () => {
      if (containerRef.current && topRef.current && botRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const topWidth = topRef.current.scrollWidth;
        const botWidth = botRef.current.scrollWidth;

        const newLimits = {
          top: Math.max(0, (topWidth - containerWidth) / containerWidth),
          bot: Math.max(0, (botWidth - containerWidth) / containerWidth),
        };

        setLimits(newLimits);

        setOffset(-newLimits.bot);
      }
    };
    updateLimits();
    window.addEventListener("resize", updateLimits);
    return () => window.removeEventListener("resize", updateLimits);
  }, []);

  // Desktop animation with inertia
  const animate = () => {
    setOffset((prev) => {
      let next = prev + velocityRef.current;

      const maxLimit = Math.max(limits.top, limits.bot);
      const min = -maxLimit;
      const max = 0;

      if (next < min) {
        next = min;
        velocityRef.current = 0;
      }
      if (next > max) {
        next = max;
        velocityRef.current = 0;
      }

      return next;
    });

    velocityRef.current *= DAMPING;

    if (Math.abs(velocityRef.current) > 0.001) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      velocityRef.current = 0;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  };

  // Desktop wheel input
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.preventDefault();
    velocityRef.current += e.deltaY * SPEED;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  // Mobile scroll progress
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visible = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1
      );
      setScrollProgress(visible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // --- calculate relative progress (0..1 shared between rows) ---
  const maxLimit = Math.max(limits.top, limits.bot);
  const effective = isMobile ? -scrollProgress : offset / (maxLimit || 1);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="overflow-hidden flex flex-col gap-0 select-none"
    >
      {/* TOP row - moves left */}
      <div
        ref={topRef}
        className="text-[clamp(2rem,15vw,20rem)] font-extrabold uppercase whitespace-nowrap text-white/10 leading-none -ml-[350px]"
        style={{
          transform: `translateX(${effective * limits.top * -100}%)`,
          willChange: "transform",
          lineHeight: 0.78,
        }}
      >
        {topRowText}
      </div>

      {/* BOTTOM row - moves right */}
      <div
        ref={botRef}
        className="text-[clamp(2rem,15vw,20rem)] font-extrabold uppercase whitespace-nowrap text-white/10 leading-none -mr-[100px]"
        style={{
          transform: `translateX(${effective * limits.bot * 100}%)`,
          willChange: "transform",
          lineHeight: 0.78,
        }}
      >
        {botRowText}
      </div>
    </div>
  );
}
