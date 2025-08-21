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
      <Link
          href={pathName === "about" ? "" : "/about"}
        >
      <div 
        className="fixed left-0 w-8 md:w-11 top-1/2 -translate-y-1/2 flex justify-end cursor-pointer z-[999]"
        onMouseEnter={() => setAboutHovered(true)}
        onMouseLeave={() => setAboutHovered(false)}
      >
        <div
          className={`group flex flex-col items-center tracking-[0.25em] text-text/80`}
        >
          {"ABOUT".split("").map((ch, i) => (
            <span
              key={i}
              className={`transition-all duration-300 ${
                AboutHovered || pathName === "/about"  ? "text-[#d97706] font-extrabold" : "text-text/80"
              }`}
              style={{
                transitionDelay: AboutHovered ? `${i * 50}ms` : "0ms",
                marginTop: AboutHovered || pathName === "about" && i !== 0 ? "0.25rem" : "0.15rem",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
      </Link>

      {/* Contact (right) */}
      <Link
          href={ pathName === "/contact" ? "" : "/contact"}
        >
      <div 
        className={`fixed right-0 w-8 md:w-11 top-1/2 -translate-y-1/2 flex justify-start ${ContactsHovered && pathName === "/contact" ? "cursor-auto" : "cursor-pointer"} z-[999]`}
        onMouseEnter={() => setContactsHovered(true)}
        onMouseLeave={() => setContactsHovered(false)}
      >
        <div
          className="group flex flex-col items-center text-text/80"
        >
          {"CONTACT".split("").map((ch, i) => (
            <span
              key={i}
              className={`transition-all duration-150 ${
                ContactsHovered || pathName === "/contact" ? "text-[#d97706] font-extrabold" : "text-text/80"
              }`}
              style={{
                transitionDelay: ContactsHovered ? `${i * 50}ms` : "0ms",
                marginTop: (ContactsHovered || pathName === "/contact") && i !== 0 ? "0.25rem" : "0.15rem",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
      </Link>
    </>
  );
}
