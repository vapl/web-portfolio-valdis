"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [AboutHovered, setAboutHovered] = useState(false);
  const [ContactsHovered, setContactsHovered] = useState(false);

  return (
    <>
      {/* About (left) */}
      <div className="absolute left-5 md:left-9 top-1/2 -translate-y-1/2 block cursor-pointer z-[999]">
        <Link
          href={"/about"}
          className={`group flex flex-col items-center tracking-[0.25em] text-text/80`}
          onMouseEnter={() => setAboutHovered(true)}
          onMouseLeave={() => setAboutHovered(false)}
        >
          {"ABOUT".split("").map((ch, i) => (
            <span
              key={i}
              className={`transition-all duration-300 ${
                AboutHovered ? "text-[#d97706]" : "text-text/80"
              }`}
              style={{
                transitionDelay: AboutHovered ? `${i * 80}ms` : "0ms",
                marginTop: AboutHovered && i !== 0 ? "0.5rem" : "0.25rem",
              }}
            >
              {ch}
            </span>
          ))}
        </Link>
      </div>

      {/* Contact (right) */}
      <div className="absolute right-5 md:right-9 top-1/2 -translate-y-1/2 block cursor-pointer z-[999]">
        <Link
          href={"/contact"}
          className="group flex flex-col items-center tracking-[0.25em] text-text/80"
          onMouseEnter={() => setContactsHovered(true)}
          onMouseLeave={() => setContactsHovered(false)}
        >
          {"CONTACT".split("").map((ch, i) => (
            <span
              key={i}
              className={`transition-all duration-300 ${
                ContactsHovered ? "text-[#d97706]" : "text-text/80"
              }`}
              style={{
                transitionDelay: ContactsHovered ? `${i * 80}ms` : "0ms",
                marginTop: ContactsHovered && i !== 0 ? "0.5rem" : "0.25rem",
              }}
            >
              {ch}
            </span>
          ))}
        </Link>
      </div>
    </>
  );
}
