"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type ContactProps = {
  email?: string;
};

export default function EmailLink({
  email = "hello.valdis@gmail.com",
}: ContactProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`mailto:${email}`} className="text-secondary">
      <motion.div
        className="relative w-fit inline"
        initial="initial"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {email}
        <motion.div
          variants={{
            rest: { width: 0 },
            hover: { width: "100%" },
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`absolute ${
            isHovered ? "left-0" : "right-0"
          } -bottom-0.5 h-[1px] bg-secondary`}
        />
      </motion.div>
    </Link>
  );
}
