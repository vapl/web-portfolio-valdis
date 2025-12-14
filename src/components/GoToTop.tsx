"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowRoundUp } from "react-icons/io";

export default function GoTotop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 1000);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="
                        fixed bottom-6 right-6 z-999
                        rounded-full border border-white/20
                        bg-background/80 backdrop-blur
                        px-3 py-3 text-sm
                        hover:border-primary hover:text-primary
                    "
        >
          <div className="flex items-center">
            <IoIosArrowRoundUp size={20} />
            <span className="pr-2">Top</span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
