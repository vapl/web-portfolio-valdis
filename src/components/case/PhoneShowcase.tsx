"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  center: string;
  left: string;
  right: string;
};

export default function PhoneShowcase({ center, left, right }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Motion values
  const leftX = useTransform(scrollYProgress, [0, 0.8], ["-140%", "-60%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.8], ["140%", "60%"]);

  const sideScale = useTransform(scrollYProgress, [0, 1], [0.85, 0.92]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.7]);
  const sideY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const centerScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <div ref={ref} className="flex justify-center">
      {/* WIDER STAGE */}
      <div className="relative w-full min-h-[240px] md:min-h-[360px] lg:min-h-[640px] flex items-center justify-center">
        {/* LEFT PHONE */}
        <motion.div
          style={{
            x: leftX,
            scale: sideScale,
            opacity: sideOpacity,
            y: sideY,
          }}
          className="absolute left-1/2 -translate-x-1/2 z-10"
        >
          <Image
            src={left}
            alt=""
            width={920}
            height={600}
            className="pointer-events-none select-none"
          />
        </motion.div>

        {/* CENTER PHONE */}
        <motion.div
          style={{ scale: centerScale }}
          className="absolute left-1/2 -translate-x-1/2 z-20"
        >
          <Image
            src={center}
            alt=""
            width={920}
            height={600}
            className="pointer-events-none select-none"
            priority
          />
        </motion.div>

        {/* RIGHT PHONE */}
        <motion.div
          style={{
            x: rightX,
            scale: sideScale,
            opacity: sideOpacity,
            y: sideY,
          }}
          className="absolute left-1/2 -translate-x-1/2 z-10"
        >
          <Image
            src={right}
            alt=""
            width={920}
            height={600}
            className="pointer-events-none select-none"
          />
        </motion.div>
      </div>
    </div>
  );
}
