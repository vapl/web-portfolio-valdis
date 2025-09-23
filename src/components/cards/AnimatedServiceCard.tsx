"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

type Props = {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedServiceCard({
  index,
  total,
  scrollYProgress,
  children,
  className = "",
}: Props) {
  const step = 1 / total;
  const start = index * step;
  const range: [number, number] = [start, 1];

  const targetScale = 1 - (total - index - 1) * 0.06;

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  return (
    <div
      className={`sticky ${className}`}
      style={{ top: `${80 + index * 30}px` }}
    >
      <motion.div
        style={{ scale }}
        className="will-change-transform rounded-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
