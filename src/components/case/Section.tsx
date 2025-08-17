"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

const Section = ({ id, title, children, className = "" }: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.style.scrollMarginTop = "96px";
  }, []);

  return (
    <section id={id} ref={ref} className={`py-10 md:py-16 ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default Section;
