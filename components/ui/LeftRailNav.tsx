"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

type LeftRailItem = {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  openInNewTab?: boolean;
};

type LeftRailNavProps = {
  items: LeftRailItem[];
};

export default function LeftRailNav({ items }: LeftRailNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  const sectionIds = useMemo(
    () => items.filter((item) => !item.href || item.href.startsWith("#")).map((item) => item.id),
    [items]
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      { threshold: [0.2, 0.5, 0.75], rootMargin: "-10% 0px -35% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav className="fixed z-30 left-5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-4">
      {items.map((item) => {
        const isActive = item.id === active;
        const href = item.href ?? `#${item.id}`;
        const openInNewTab = Boolean(item.openInNewTab);
        return (
          <a
            key={item.id}
            href={href}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            className={`group flex h-[4.75rem] w-[4.75rem] items-center overflow-hidden rounded-full border pl-6 pr-4 transition-all duration-300 ease-out hover:w-52 ${
              isActive
                ? "bg-teal-500/90 text-white border-teal-300 shadow-[0_0_0_5px_rgba(17,24,39,0.35)]"
                : "bg-zinc-900/65 text-zinc-300 border-zinc-700 hover:bg-teal-500/90 hover:text-white hover:border-teal-300"
            }`}
          >
            <span className="text-[1.75rem] transition-transform duration-200 ease-out group-hover:rotate-[20deg]">
              {item.icon}
            </span>
            <span className="ml-3 whitespace-nowrap text-base font-semibold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:text-lg">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
