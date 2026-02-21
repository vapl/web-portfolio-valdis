"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id: string; label: string };

export default function SideToc({ items = [] }: { items?: Item[] }) {
  const safeItems = useMemo(
    () => (Array.isArray(items) ? items : []),
    [items]
  );
  const [active, setActive] = useState(safeItems[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    safeItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [safeItems]);

  return (
    <aside className="hidden lg:block sticky top-24 h-[70vh] w-64 pr-6">
      <nav className="space-y-2 text-sm">
        {safeItems.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`block rounded px-3 py-2 transition
                ${
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-white/70 hover:text-white"
                }`}
            >
              {label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
