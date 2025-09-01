/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.35,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    (window as any).lenis = lenis; // ērti scrollTo
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
