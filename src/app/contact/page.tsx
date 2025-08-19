/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, resize } from "framer-motion";
import { useDelay } from "@/hooks/useDelay";

// Utility: split text into characters but keep spaces (NBSP)
function splitText(text: string) {
  return text.split("").map((ch) => (ch === " " ? "\u00A0" : ch));
}

export default function ContactPage() {
  const [intro, setIntro] = useState(true); // intro overlay is visible
  const [showMain, setShowMain] = useState(false); // render main only after intro exit
  const [delay, setDelay] = useState(true); // small delay for accent line
  const [isCaret, setIsCaret] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const title = "Let's talk";

  const delay_1 = useDelay(900, []);

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
    <main className="relative w-full min-h-screen bg-background">
      {/* --- Intro overlay (centered). 'mode="wait"' ensures exit completes before main mounts --- */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setShowMain(true)} // mount main only after intro is fully gone
      >
        {intro && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
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

                {/* ellipsis */}
                    <motion.span>
                        {"...".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: title.length * 0.06 + 0.22 + i * 0.1, duration: 0.2 }}
                                aria-hidden="true"
                            >{char}</motion.span>
                        ))}
                    </motion.span>
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main layout (two columns) — rendered ONLY after intro fully exited --- */}
      {showMain && (
        <div className="grid grid-cols-1 gap-8 xl:gap-16 xl:grid-cols-2 min-h-screen max-w-4xl xl:max-w-7xl mx-auto px-13 md:px-16">
          {/* LEFT column */}
          <div
            className={`flex flex-col justify-between ${
              !isVisible && "h-36 md:h-56 xl:h-full"
            } pt-32 pb-0 xl:pb-18 gap-y-0 md:gap-y-8 xl:gap-y-16`}
          >
            <div className="flex flex-col justify-center gap-8 xl:gap-16">
              <div className="w-full">
                {/* Shared title (no initial fade; avoid crossfade look) */}
                <motion.h1
                  layoutId="title"
                  initial={false} // do not re-run initial opacity animation
                  className="text-6xl md:text-8xl text-primary font-semibold leading-none"
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 20,
                    mass: 0.9,
                  }}
                >
                  {title}
                  <motion.span>
                    {"...".split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.16, duration: 0.22 }}
                        >{char}</motion.span>
                    ))}
                  </motion.span>
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
                <div className="justify-end gap-12 text-lg mt-3 flex xl:hidden">
                  <p className="text-text">Prefer direct mail?</p>
                  <a
                    href="mailito:hello@gmail.com"
                    className="text-secondary hover:underline"
                  >
                    hello@gmail.com
                  </a>
                </div>
              </div>
              {/* Subcopy */}
              <motion.div
                className="mt-8 max-w-md text-xl text-text/50"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
              >
                <p>Tell me about your company or startup.</p>
                <p>In which role do you see me?</p>
                <p>Do you require me to work locally or remote?</p>
              </motion.div>
            </div>
            <div className="hidden xl:flex flex-col gap-6">
              <div className="w-64 h-0.5 bg-white/30" />
              <div className="flex gap-12 text-lg">
                <p className="text-text">Prefer direct mail?</p>
                <a
                  href={"mailito:hello@gmail.com"}
                  className="text-secondary hover:underline"
                >
                  hello@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT column (form placeholder — next step we’ll add conditional reveal) */}
          <div className="flex flex-col items-center justify-between pt-0 pb-18 xl:pt-53">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <div className="relative">
                <motion.div 
                    className="text-xl text-text mb-2 px-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1 }}
                    style={{ transformOrigin: "left" }}
                >
                  Why don’t we start with your name?
                </motion.div>
                <input
                  type="text"
                  placeholder="Type your name"
                  className="w-full border-0 px-4 py-3 outline-none focus:text-primary text-primary focus:ring-0 text-4xl md:text-6xl placeholder-text/40"
                  onInput={(e) => {
                    setIsCaret(true);
                    const value = (e.target as HTMLInputElement).value;
                    value.length > 2 ? setIsVisible(true) : setIsVisible(false);
                  }}
                />
                {!isCaret && (
                  <span className="absolute left-4 top-[68px] md:top-[85px] -translate-y-1/2 h-[2.5rem] md:h-[4.5rem] w-[1px] bg-text animate-caret pointer-events-none" />
                )}
              </div>

              {/* Next step: make these conditional with AnimatePresence based on name state */}
              
              {isVisible && <div
                className={`mt-6 space-y-16`}
              >
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: 0}}
                    transition={{ delay: 0.5, duration: 0.65 }}
                >
                    <span className="flex px-4 outline-none text-xl font-light text-primary">Your e-mail</span>
                    <input
                        type="email"
                        placeholder="Your E-Mail Address"
                        className="w-full border-0 px-4 py-3 outline-none focus:text-text text-text focus:ring-0 text-xl placeholder-text/40"
                    />
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: 0}}
                    transition={{ delay: 0.5, duration: 0.65 }}
                >
                <span className="flex px-4 font-light outline-none text-xl text-primary">What's is on your mind?</span>
                    <textarea
                    placeholder="Tell me about you and the world"
                    rows={4}
                    {...{resize: "true"}}
                    className="w-full border-0 px-4 py-3 outline-none focus:text-text text-text focus:ring-0 text-xl placeholder-text/40"
                    />
                </motion.div>
                <motion.button 
                    className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.65 }}
                >
                  Get in touch!
                </motion.button>
              </div>
                }
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
}
