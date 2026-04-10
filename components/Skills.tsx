"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { skills } from "@/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface SkillBarProps {
  name: string;
  proficiency: number;
  icon?: string;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, proficiency, icon, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate the skill bar after it becomes visible
          setTimeout(() => {
            setAnimatedWidth(proficiency);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [proficiency, delay]);

  const getColorClass = (proficiency: number) => {
    if (proficiency >= 85) return "bg-gradient-to-r from-emerald-400 to-emerald-500";
    if (proficiency >= 70) return "bg-gradient-to-r from-sky-400 to-blue-500";
    if (proficiency >= 55) return "bg-gradient-to-r from-amber-400 to-amber-500";
    return "bg-gradient-to-r from-rose-400 to-red-500";
  };

  return (
    <div ref={ref} className="mb-5 last:mb-0">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="relative h-6 w-6 shrink-0">
              <Image
                src={`${BASE}/${icon}`}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className="text-base font-semibold text-zinc-900 md:text-lg">{name}</span>
        </div>
        <span className="text-base font-semibold text-teal-700">{proficiency}%</span>
      </div>
      
      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorClass(proficiency)}`}
          style={{
            width: isVisible ? `${animatedWidth}%` : "0%",
            transitionDelay: `${delay}ms`
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <>
      <div className="mb-14 text-center">
        <h2 className="text-5xl font-extrabold text-zinc-900">Technical Skills</h2>
        <div className="mx-auto mt-4 h-[3px] w-40 bg-teal-700" />
        <div className="mx-auto mt-10 h-[3px] w-full max-w-6xl bg-teal-600/90" />
      </div>

      <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skills.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="mb-8 text-center text-3xl font-bold text-teal-700">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <SkillBar
                    key={tech.name}
                    name={tech.name}
                    proficiency={tech.proficiency}
                    icon={tech.icon}
                    delay={categoryIndex * 200 + techIndex * 100}
                  />
                ))}
              </div>
            </div>
          ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm md:text-base">
            <div className="flex items-center gap-2.5">
              <div className="h-3 w-5 rounded bg-gradient-to-r from-emerald-400 to-emerald-500" />
              <span className="text-zinc-700">Expert (85%+)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-3 w-5 rounded bg-gradient-to-r from-sky-400 to-blue-500" />
              <span className="text-zinc-700">Proficient (70-84%)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-3 w-5 rounded bg-gradient-to-r from-amber-400 to-amber-500" />
              <span className="text-zinc-700">Intermediate (55-69%)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-3 w-5 rounded bg-gradient-to-r from-rose-400 to-red-500" />
              <span className="text-zinc-700">Learning (Below 55%)</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-teal-700">
                {skills.reduce((acc, cat) => acc + cat.technologies.length, 0)}
              </div>
              <div className="mt-1 text-sm text-zinc-500">Technologies</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-teal-700">
                {skills.reduce((acc, cat) => 
                  acc + cat.technologies.filter((tech) => tech.proficiency >= 85).length, 0
                )}
              </div>
              <div className="mt-1 text-sm text-zinc-500">Expert Level</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-teal-700">
                {Math.round(
                  skills.reduce((acc, cat) => 
                    acc + cat.technologies.reduce((sum, tech) => sum + tech.proficiency, 0), 0
                  ) / skills.reduce((acc, cat) => acc + cat.technologies.length, 0)
                )}%
              </div>
              <div className="mt-1 text-sm text-zinc-500">Avg Proficiency</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-teal-700">{skills.length}</div>
              <div className="mt-1 text-sm text-zinc-500">Categories</div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Skills;