"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Step = {
  index: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    index: "01",
    title: "Understand the problem",
    description:
      "I start by understanding the business goal, constraints, and what actually needs to be solved.",
  },
  {
    index: "02",
    title: "Design the system",
    description:
      "I design a clear structure and architecture before touching any code.",
  },
  {
    index: "03",
    title: "Build & test",
    description:
      "Implementation with fast feedback, testing early instead of fixing later.",
  },
  {
    index: "04",
    title: "Deliver & support",
    description:
      "Clean delivery, documentation, and a system clients can actually maintain.",
  },
];

export default function ProcessSpine() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-3xl py-32">
      {/* Line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 origin-top top-0 h-full w-px bg-white/10"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="flex flex-col gap-24">
        {STEPS.map((step, i) => (
          <ProcessStep
            key={step.index}
            step={step}
            side={i % 2 === 0 ? "right" : "left"}
            progress={scrollYProgress}
            threshold={0.07 + (i / (STEPS.length - 1)) * 0.6}
          />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  side,
  progress,
  threshold,
}: {
  step: Step;
  side: "left" | "right";
  progress: MotionValue<number>;
  threshold: number;
}) {
  const range = 0.07;

  const opacity = useTransform(
    progress,
    [threshold, threshold + range],
    [0, 1]
  );

  const scale = useTransform(progress, [threshold, threshold + range], [0, 1]);

  const y = useTransform(progress, [threshold, threshold + range], [0, 0]);

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr]">
      {/* Dot */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute left-1/2 -translate-x-1/2 top-1 h-3 w-3 rounded-full bg-primary"
      />

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className={`flex flex-col ${
          side === "right"
            ? "col-start-3 ml-16 text-left"
            : "col-start-1 mr-16 text-right"
        }`}
      >
        <span className="text-lg tracking-widest text-white/40">
          {step.index}
        </span>

        <h3 className="text-[clamp(1.5rem,2.5vw,3.5rem)] font-medium text-primary">
          {step.title}
        </h3>

        <p className="max-w-md text-white/70 text-[clamp(1.2rem,2.5vw,1.8rem)]">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}
