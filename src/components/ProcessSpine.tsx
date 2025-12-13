"use client";

import { motion, useInView } from "framer-motion";
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
  return (
    <section className="relative mx-auto max-w-3xl py-32">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-px bg-white/10" />

      <div className="flex flex-col gap-24">
        {STEPS.map((step, i) => (
          <ProcessStep key={step.index} step={step} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({ step, delay }: { step: Step; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <div ref={ref} className="relative pl-16">
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: "easeOut", delay }}
        className="absolute left-[9px] top-1 h-3 w-3 rounded-full bg-primary"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: delay + 0.05,
        }}
        className="flex flex-col gap-3"
      >
        <span className="text-sm tracking-widest text-white/40">
          {step.index}
        </span>

        <h3 className="text-xl font-medium text-primary">{step.title}</h3>

        <p className="max-w-md text-white/70">{step.description}</p>
      </motion.div>
    </div>
  );
}
