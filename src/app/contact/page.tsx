/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import EmailLink from "@/components/contact/EmailLink";

// Utility: split text into characters but keep spaces (NBSP)
function splitText(text: string) {
  return text.split("").map((ch) => (ch === " " ? "\u00A0" : ch));
}

export default function ContactPage() {
  const [intro, setIntro] = useState(true); // intro overlay is visible
  const [showMain, setShowMain] = useState(false); // render main only after intro exit
  const [delay, setDelay] = useState(true); // small delay for accent line
  const [isCaret, setIsCaret] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string[];
    email?: string[];
    message?: string[];
  }>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [touched, setTouched] = useState<{ email?: boolean }>({});
  const title = "Let's talk";

  // Helper: client-side quck checks (optional; server still validates)
  function validateClient() {
    const e: typeof errors = {};
    if (name.trim().length < 3)
      e.name = ["Name must be at least 3 characters."];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = ["Please enter a valid email"];
    if (message.trim().length < 10)
      e.message = ["Message should be at least 10 characters."];
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // onSubmit handler
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateClient()) return;
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp: "" }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrors(json.error ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

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

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  /** Handle form */

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
                className="text-5xl md:text-8xl text-primary font-semibold leading-none"
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
                      transition={{
                        delay: title.length * 0.06 + 0.22 + i * 0.1,
                        duration: 0.2,
                      }}
                      aria-hidden="true"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main layout (two columns) — rendered ONLY after intro fully exited --- */}
      {showMain && (
        <div className="grid grid-cols-1 gap-8 xl:gap-16 xl:grid-cols-2 xl:min-h-screen max-w-4xl xl:max-w-7xl mx-auto px-13 md:px-20">
          {/* LEFT column */}
          <div
            className={`flex flex-col justify-between pt-32 pb-0 xl:pb-18 gap-y-0 md:gap-y-8 xl:gap-y-16`}
          >
            <div className="flex flex-col justify-center gap-8 xl:gap-16">
              <div className="w-full">
                {/* Shared title (no initial fade; avoid crossfade look) */}
                <motion.h1
                  layoutId="title"
                  initial={false} // do not re-run initial opacity animation
                  className="text-5xl md:text-8xl text-primary font-semibold leading-none"
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
                      <span key={i} className="inline-block">
                        {char}
                      </span>
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
                <div className="justify-end gap-2 text-sm md:text-lg mt-3 flex xl:hidden">
                  <p className="text-text">Prefer direct email?</p>
                  <EmailLink />
                </div>
              </div>
              {/* Subcopy */}
              <motion.div
                className="mt-0 max-w-md text-md md:text-xl text-text/80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.25 }}
              >
                <p>
                  I'd love to hear about your project and vision. What
                  challenges are you facing, and how can I help bring your ideas
                  to life? I work remotely with clients worldwide and am
                  flexible with collaboration—whether through platforms like
                  Upwork and Fiverr or direct partnerships.
                </p>
              </motion.div>
              <div className="w-64 h-0.5 bg-white/30 xl:hidden" />
            </div>
            <div className="hidden xl:flex flex-col gap-6">
              <div className="w-64 h-0.5 bg-white/30" />
              <div className="flex gap-12 text-lg">
                <p className="text-text">Prefer direct mail?</p>
                <EmailLink />
              </div>
            </div>
          </div>

          {/* RIGHT column (form placeholder — next step we’ll add conditional reveal) */}
          <div className="flex flex-col items-start justify-start pt-6 pb-18 xl:pt-53">
            <motion.form
              onSubmit={onSubmit}
              className="w-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <div className="relative">
                <motion.div
                  className="text-xl text-text mb-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                  style={{ transformOrigin: "left" }}
                >
                  What should I call you?
                </motion.div>
                <input
                  type="text"
                  placeholder="Type your name"
                  className="w-full border-0 py-3 outline-none focus:text-primary text-primary focus:ring-0 text-4xl md:text-6xl placeholder-text/40"
                  value={name}
                  onInput={(e) => {
                    setIsCaret(false);
                    const v = (e.target as HTMLInputElement).value;
                    const fixed = v.length
                      ? v[0].toUpperCase() + v.slice(1)
                      : v;
                    setName(fixed);
                    setIsVisible(fixed.trim().length > 2);
                  }}
                  onFocus={() => setIsCaret(false)}
                  onBlur={() => setIsCaret(name === "")}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {isCaret && (
                  <span className="absolute left-0 top-[68px] md:top-[85px] -translate-y-1/2 h-[2.5rem] md:h-[4.5rem] w-[1px] bg-text animate-caret pointer-events-none" />
                )}
                {errors.name && (
                  <p id="name-error" className="mt-2 px-1 text-sm text-red-400">
                    {errors.name[0]}
                  </p>
                )}
              </div>

              {/* Next step: make these conditional with AnimatePresence based on name state */}

              <AnimatePresence mode="wait">
                {isVisible && (
                  <div className={`mt-6 space-y-4`}>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ delay: 0.4, duration: 0.85 }}
                    >
                      <span className="flex outline-none text-xl font-light text-primary">
                        your e-mail
                      </span>
                      <input
                        type="email"
                        placeholder="Where can I reach you?"
                        value={email}
                        onChange={(e) => {
                          const v = e.target.value;
                          setEmail(v);

                          // clear or set error live
                          setErrors((prev) => ({
                            ...prev,
                            email: isValidEmail(v) ? undefined : [""],
                          }));
                        }}
                        onBlur={() => {
                          setTouched((t) => ({ ...t, email: true }));
                          // on blur, if empty or invalid -> show error
                          setErrors((prev) => ({
                            ...prev,
                            email:
                              email.length === 0
                                ? ["Email is required"]
                                : isValidEmail(email)
                                ? undefined
                                : ["Please enter a valid email"],
                          }));
                        }}
                        className="w-full border-0 py-3 outline-none focus:text-text text-text focus:ring-0 text-xl placeholder-text/40"
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                      />
                      <p
                        id="email-error"
                        className="flex h-4 px-1 text-sm text-red-400"
                      >
                        {(touched.email || errors.email) &&
                          errors.email &&
                          errors.email[0]}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ delay: 0.5, duration: 0.85 }}
                    >
                      <span className="flex justify-between items-end font-light outline-none text-xl text-primary">
                        your message
                        {message.trim() && (
                          <p className="mt-1 text-sm text-text/60 text-right">
                            {message.trim().length} /2000
                          </p>
                        )}
                      </span>

                      {/* Character counter */}
                      <textarea
                        placeholder="What are you working on?"
                        rows={4}
                        maxLength={2000}
                        value={message}
                        onChange={(e) => {
                          const m = e.target.value;
                          setMessage(m);
                          // clear or set error live
                          setErrors((prev) => ({
                            ...prev,
                            message: m.trim().length > 10 ? [""] : [""],
                          }));
                        }}
                        onBlur={() => {
                          setTouched((t) => ({ ...t, message: true }));
                          // on blur, if empty or invalid -> show error
                          setErrors((prev) => ({
                            ...prev,
                            message:
                              message.trim().length < 10
                                ? ["Message should be at least 10 characters."]
                                : [""],
                          }));
                        }}
                        {...{ resize: "true" }}
                        className="w-full border-0 py-3 outline-none focus:text-text text-text focus:ring-0 text-xl placeholder-text/40"
                        aria-invalid={!!errors.message}
                        aria-describedby="message-error"
                      />

                      <p
                        id="message-error"
                        className="flex h-4 px-1 text-sm text-red-400"
                      >
                        {errors.message && errors.message[0]}
                      </p>
                    </motion.div>

                    <motion.div
                      className="flex-1 flex-col"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ delay: 0.6, duration: 0.85 }}
                    >
                      {/* GDPR note */}
                      <p className="text-sm text-text/80 font-light mb-2">
                        I will only use your information to respond to your
                        message.{" "}
                        <Link
                          href="/privacy"
                          className="text-secondary hover:underline"
                        >
                          Privacy policy
                        </Link>
                      </p>

                      {/* Submit */}
                      <Button
                        icon
                        type="submit"
                        status={status}
                        value="Get in touch!"
                      />

                      {/* Global feedback */}
                      <div className="flex h-8">
                        {status === "success" && (
                          <p
                            role="status"
                            className="flex justify-center text-sm mt-4 text-green-400"
                          >
                            Thanks! I&apos;ll get back to you soon.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      )}
    </main>
  );
}
