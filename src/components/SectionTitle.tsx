"use client";

import React, { useEffect, useRef, useState } from "react";

type TitleProps = {
  titleTop: string;
  titleBot?: string;
  className?: string;
};

const useIntersectionObserver = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

const SectionTitle = ({ titleTop, titleBot, className }: TitleProps) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <h1
      ref={ref}
      className={`text-[clamp(2.5rem,6.0vw,6.8rem)] text-center flex flex-col leading-none uppercase font-extrabold text-text ${className} `}
    >
      <span
        className={`transition-all duration-[600ms] ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 delay-100"
            }
        `}
      >
        {titleTop}
      </span>
      {titleBot && (
        <span
          className={`transition-all duration-[600ms] ease-out
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0 delay-100"
                        : "opacity-0 translate-y-10"
                    }
                `}
        >
          {titleBot}
        </span>
      )}
    </h1>
  );
};

export default SectionTitle;
