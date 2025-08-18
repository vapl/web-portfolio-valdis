"use client";
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Utility: split text into characters but keep spaces (NBSP)
function splitText(text: string) {
  return text.split("").map((ch) => (ch === " " ? "\u00A0" : ch));
}

export default function ContactPage() {
  const [intro, setIntro] = useState(true);        // intro overlay is visible
  const [showMain, setShowMain] = useState(false); // render main only after intro exit
  const [delay, setDelay] = useState(true);        // small delay for accent line
  const [isCaret, setIsCaret] = useState(false)
  const title = "Let's talk";

  // Close intro after 1.3s (adjust as needed)
  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1300);
    return () => clearTimeout(t);
  }, []);

  // Start the "delay" timer only after main is shown
  useEffect(() => {
    if (!showMain) return;
    const t = setTimeout(() => setDelay(false), 900);
    return () => clearTimeout(t);
  }, [showMain]);

  

  return (
    <div className="relative w-full min-h-screen">
      {/* --- Intro overlay (centered). 'mode="wait"' ensures exit completes before main mounts --- */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setShowMain(true)} // mount main only after intro is fully gone
      >
        {intro && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }} // slower fade-out so it's noticeable
          >
            <div className="text-center">
              <motion.h1
                layoutId="title"
                className="text-7xl md:text-8xl text-primary font-semibold leading-none"
              >
                {/* Per-char entrance while intro is visible */}
                {splitText(title).map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.22 }} // a bit slower
                    aria-hidden="true"
                  >
                    {char}
                  </motion.span>
                ))}

                {/* Blinking caret */}
                <motion.span
                  aria-hidden="true"
                  className="inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  <span className="ml-2 inline-block align-middle h-[0.9em] w-[3px] bg-primary" />
                </motion.span>
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main layout (two columns) — rendered ONLY after intro fully exited --- */}
      {showMain && (
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 min-h-screen max-w-7xl mx-auto px-6 md:px-16">
          {/* LEFT column */}
          <div className="flex flex-col justify-around">
            <div className="w-full">
              {/* Shared title (no initial fade; avoid crossfade look) */}
              <motion.h1
                layoutId="title"
                initial={false} // do not re-run initial opacity animation
                className="text-6xl md:text-8xl text-primary font-semibold leading-none"
                transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.9 }}
              >
                {title}
              </motion.h1>

              {/* Accent line appears with a tiny delay for polish */}
              {!delay && (
                <motion.div
                  className="w-full h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                  style={{ transformOrigin: "left" }}
                />
              )}              
            </div>
            {/* Subcopy */}
              <motion.div
                className="mt-8 max-w-md text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
              >
                <p>Tell me about your company or startup.</p>
                <p>In which role do you see me?</p>
                <p>Do you require me to work locally or remote?</p>
              </motion.div>
          </div>

          {/* RIGHT column (form placeholder — next step we’ll add conditional reveal) */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
                <div className="relative">
                    <div className="text-sm text-muted-foreground mb-2">
                        Why don’t we start with your name?
                    </div>
                    <input
                        type="text"
                        placeholder="Type your name"
                        className="w-full border-0 px-4 py-3 outline-none focus:border-primary focus:ring-0 text-4xl md:text-6xl placeholder-text/40"
                        onInput={() => setIsCaret(true)}
                    />
                    {!isCaret && <span className="absolute left-4 top-[76px] -translate-y-1/2 h-[4.5rem] w-[1px] bg-text animate-caret pointer-events-none" />}

                </div>
              

              {/* Next step: make these conditional with AnimatePresence based on name state */}
              <div className="opacity-40 mt-6 space-y-4 pointer-events-none select-none">
                <input
                  type="email"
                  placeholder="Your E-Mail Address"
                  className="w-full border rounded-xl px-4 py-3"
                />
                <textarea
                  placeholder="Tell me about you and the world"
                  rows={4}
                  className="w-full border rounded-xl px-4 py-3"
                />
                <button className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-3">
                  Get in touch!
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
