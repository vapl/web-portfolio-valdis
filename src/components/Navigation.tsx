"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [AboutHovered, setAboutHovered] = useState(false);
  const [ContactsHovered, setContactsHovered] = useState(false);
  const pathName = usePathname();

  return (
    <>
      {/* About (left) */}
      <div 
        className="fixed left-0 w-8 md:w-11 top-1/2 -translate-y-1/2 flex justify-end cursor-pointer z-[999]"
        onMouseEnter={() => setAboutHovered(true)}
        onMouseLeave={() => setAboutHovered(false)}
      >
        <Link
          href={"/about"}
          className={`group flex flex-col items-center tracking-[0.25em] text-text/80`}
        >
          {"ABOUT".split("").map((ch, i) => (
            <span
              key={i}
              className={`transition-all duration-300 ${
                AboutHovered || pathName === "/about"  ? "text-[#d97706] font-bold" : "text-text/80"
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
      <div 
        className="fixed right-0 w-8 md:w-11 top-1/2 -translate-y-1/2 flex justify-start cursor-pointer z-[999]"
        onMouseEnter={() => setContactsHovered(true)}
        onMouseLeave={() => setContactsHovered(false)}
      >
        <Link
          href={"/contact"}
          className="group flex flex-col items-center tracking-[0.25em] text-text/80"
        >
          {"CONTACT".split("").map((ch, i) => (
            <span
              key={i}
              className={`transition-all duration-150 ${
                ContactsHovered || pathName === "/contact" ? "text-[#d97706] font-bold" : "text-text/80"
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
