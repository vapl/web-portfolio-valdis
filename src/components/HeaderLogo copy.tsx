"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import * as flubber from "flubber";

/**
 * Morphs two paths (logoPartA/B) into two arrow paths (arrowA/B) smoothly.
 * We keep the same viewBox (0..500) for both shapes to avoid weird offsets/rotations.
 */
export default function HeaderLogo() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // --- YOUR ORIGINAL LOGO PATHS (exactly as in your SVG) ---
  // Darker (#b45309)
  const LOGO_A =
    "M 185.19179,358.69056 C 184.66685,358.03575 144.51208,287.975 95.958968,203 0.921294,36.670251 4.564155,43.61108 8.405606,36.182532 c 3.196672,-6.181681 3.203453,-6.18253 49.389743,-6.18253 38.660738,0 42.010633,0.135086 43.396921,1.75 0.82623,0.9625 20.30792,34.7125 43.29264,74.999998 22.98471,40.2875 42.29095,73.24487 42.90274,73.23859 0.61179,-0.006 20.01235,-33.1451 43.11235,-73.64185 23.1,-40.496742 42.59464,-74.241609 43.32143,-74.98859 1.07875,-1.108732 10.57151,-1.358148 51.69098,-1.358148 33.95329,0 50.58009,0.340649 51.01553,1.045203 0.35528,0.574862 -1.64316,5.071318 -4.44099,9.992124 C 369.28913,45.958135 367,50.28986 367,50.663385 c 0,0.373525 -0.62034,1.389569 -1.37852,2.257876 -0.75819,0.868308 -8.11863,13.278741 -16.35654,27.578741 -8.2379,14.3 -29.14115,50.524998 -46.45167,80.499998 -17.31051,29.975 -32.11257,55.70724 -32.89346,57.18276 -0.7809,1.47552 -9.09535,15.87552 -18.47656,32 -9.38121,16.12448 -27.36771,47.19458 -39.96999,69.04467 -12.60228,21.85009 -23.45634,39.93584 -24.12014,40.19056 -0.66379,0.25472 -1.63639,-0.0726 -2.16133,-0.72743 z";

  // Lighter (#d97706)
  const LOGO_B =
    "m 244.5,457.64973 c -1.65,-0.75706 -3.71549,-2.22546 -4.58997,-3.2631 C 236.69097,450.56696 203,390.10981 203,388.15301 c 0,-1.11332 7.35673,-14.7657 16.34828,-30.33862 C 228.33983,342.24148 273.60723,263.8 319.94249,183.5 366.27775,103.2 405.27741,35.812502 406.6084,33.750002 l 2.41998,-3.75 h 37.53547 c 41.39933,0 41.86661,0.06416 45.03054,6.18253 3.86995,7.483651 9.61997,-3.255035 -115.26511,215.267848 -68.99393,120.72501 -117.00176,203.70916 -118.49394,204.82323 -3.2886,2.4553 -9.57045,3.10354 -13.33534,1.37612 z";

  // --- TARGET ARROW PARTS (same 500x500 coordinate space) ---
  // A: chevron (maps from LOGO_A, dark fill)
  const ARROW_A =
    "m 150.38831,329.70092 c 0.65481,-0.52494 70.71557,-40.6797 155.69053,-89.23283 166.32977,-95.03767 159.38893,-91.39481 166.81748,-87.55336 6.18168,3.19668 6.18255,3.20346 6.18255,49.38975 0,26.49246 -17.60391,27.18812 -76.75001,62.55675 -40.28749,22.98471 -117.28591,66.38003 -117.27963,66.99183 0.008,0.61179 77.18614,44.26376 117.68291,67.36374 63.59468,32.35359 76.35926,46.42523 76.34673,70.80474 0,33.95331 -0.8281,43.75431 -1.53279,44.18975 -0.57483,0.35527 -4.58374,5.18264 -9.50453,2.3848 -4.92083,-2.79783 -9.25255,-5.08694 -9.62608,-5.08694 -0.37341,0 -1.38954,-0.62033 -2.25785,-1.37854 -0.86831,-0.75818 -13.27877,-8.11862 -27.57877,-16.35651 -14.29999,-8.2379 -50.52498,-29.14118 -80.5,-46.45168 -29.97499,-17.31054 -55.70722,-32.1126 -57.18275,-32.89349 -1.47552,-0.78089 -15.87552,-9.09536 -32.00001,-18.47656 -16.12448,-9.38121 -47.19458,-27.36771 -69.04467,-39.96998 -21.85009,-12.60231 -39.93581,-23.45635 -40.19055,-24.12015 -0.25474,-0.6638 0.0726,-1.63638 0.72744,-2.16132 z";
  // B: shaft (maps from LOGO_B, light fill)
  const ARROW_B =
    "m 280.33898,306.51745 c 79.35278,-2.31149 198.19496,-2.53251 267.31261,-2.59866 92.70943,-0.0888 171.11131,-0.0555 173.34777,0.95622 28.06964,3.0872 31.9587,50.80271 -0.75867,54.68451 -194.62866,0 -206.6818,0.25966 -441.19147,0.25966 0,-27.09593 1.28976,-20.31598 1.28976,-53.30173 z";

  // Build flubber interpolators once
  const interpA = useMemo(
    () => flubber.interpolate(LOGO_A, ARROW_A, { maxSegmentLength: 4 }),
    []
  );
  const interpB = useMemo(
    () => flubber.interpolate(LOGO_B, ARROW_B, { maxSegmentLength: 4 }),
    []
  );

  // Motion driver 0..1
  const t = useMotionValue(0);

  // Current path strings
  const [dA, setDA] = useState(LOGO_A);
  const [dB, setDB] = useState(LOGO_B);

  useEffect(() => {
    // Animate t to 0 (home/logo) or 1 (arrow)
    const controls = animate(t, isHome ? 0 : 1, {
      duration: 0.6,
      ease: [0.4, 0.0, 0.2, 1], // easeInOut-ish
    });
    const unsub = t.on("change", (v) => {
      // Compute morphed paths for both parts
      setDA(interpA(v));
      setDB(interpB(v));
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [isHome, interpA, interpB, t]);

  // Click: on home do nothing (link to /), on subpages go back()
  const onClick = () => {
    if (!isHome) router.back();
  };

  return (
    
    <Link href="/" className="fixed left-7 top-6 z-[999]">
      <Image
        src={"images/logo/vv-logo_1.svg"}
        alt="Logo"
        width={32}
        height={32}
        priority
        className="hover cursor-pointer"
      />
    </Link>

    <button
      aria-label={isHome ? "Home" : "Back"}
      onClick={onClick}
      className="fixed left-3 md:left-7 top-12 z-[999] h-10 w-10 cursor-pointer"
    >
      {/* One SVG, two paths (match your original two fills) */}
      <svg
        viewBox="0 0 1000 900"
        width={50}
        height={50}
        role="img"
        className="block"
      >
        {/* Dark part */}
        <path d={dA} fill={isHome ? "#b45309" : "#d97706"} />
        {/* Light part */}
        <path d={dB} fill="#d97706" />
      </svg>
    </button>
    
  );
}
