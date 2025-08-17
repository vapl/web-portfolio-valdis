"use client";

import { ReactNode } from "react";

type IntroCardProps = {
  eyebrow?: string;
  title: string;
  /** Plain text body (optional if you pass children) */
  body?: string;
  /** MDX/React content preferred in MDX */
  children?: ReactNode;
  invert?: boolean;
  maxWidth?: "md" | "lg" | "xl";
};

export default function IntroCard({
  eyebrow = "",
  title,
  body,
  children,
  invert = false,
  maxWidth = "lg",
}: IntroCardProps) {
  const textBase = invert ? "text-white" : "text-zinc-800";
  const textDim = invert ? "text-white/70" : "text-zinc-600";
  const maxW =
    maxWidth === "md"
      ? "max-w-2xl"
      : maxWidth === "lg"
      ? "max-w-3xl"
      : "max-w-4xl";

  // Normalize body content: prefer children in MDX, fallback to body string
  const isStringBody = typeof body === "string" && !children;

  return (
    <section className={`w-full ${textBase} selection:bg-orange-500/20`}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 py-10 md:py-16">
          {/* Left column */}
          <div className="md:col-span-5">
            {eyebrow && (
              <p className={`mb-3 text-md tracking-wide ${textDim}`}>
                {eyebrow}
              </p>
            )}
            <h2
              className="
                font-medium tracking-[-0.02em]
                text-[clamp(2.25rem,6vw,4.25rem)]
                leading-[0.95]
              "
            >
              {title}
            </h2>
          </div>

          {/* Right column */}
          <div className="md:col-span-7">
            <div className={`${maxW} leading-relaxed ${textDim}`}>
              {isStringBody ? (
                // Split paragraphs if body is a plain string
                body!.split(/\n\s*\n/).map((para, i) => (
                  <p
                    key={i}
                    className={`${
                      i ? "mt-5 md:mt-6" : ""
                    } text-base md:text-lg`}
                  >
                    {para}
                  </p>
                ))
              ) : (
                // Render MDX children (can include links, bold text, etc.)
                <div className="prose text-[clamp(1.4rem,6vw,1.6rem)] font-light prose-zinc dark:prose-invert max-w-none">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
