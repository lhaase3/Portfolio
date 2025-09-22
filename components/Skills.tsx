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
    if (proficiency >= 85) return "bg-gradient-to-r from-green-400 to-green-600";
    if (proficiency >= 70) return "bg-gradient-to-r from-blue-400 to-blue-600";
    if (proficiency >= 55) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    return "bg-gradient-to-r from-red-400 to-red-600";
  };

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon && (
            <div className="w-5 h-5 relative">
              <Image
                src={`${BASE}/${icon}`}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className="text-white font-medium text-sm md:text-base">{name}</span>
        </div>
        <span className="text-purple text-sm font-semibold">{proficiency}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorClass(proficiency)}`}
          style={{
            width: isVisible ? `${animatedWidth}%` : "0%",
            transitionDelay: `${delay}ms`
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="py-20 px-4" id="skills">
      <h1 className="heading mb-16">
        My <span className="text-purple">Technical Skills</span>
      </h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skills.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-purple/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-purple mb-6 text-center">
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

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded"></div>
            <span className="text-gray-300">Expert (85%+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
            <span className="text-gray-300">Proficient (70-84%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded"></div>
            <span className="text-gray-300">Intermediate (55-69%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded"></div>
            <span className="text-gray-300">Learning (Below 55%)</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-purple">
              {skills.reduce((acc, cat) => acc + cat.technologies.length, 0)}
            </div>
            <div className="text-gray-400 text-sm">Technologies</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-purple">
              {skills.reduce((acc, cat) => 
                acc + cat.technologies.filter(tech => tech.proficiency >= 85).length, 0
              )}
            </div>
            <div className="text-gray-400 text-sm">Expert Level</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-purple">
              {Math.round(
                skills.reduce((acc, cat) => 
                  acc + cat.technologies.reduce((sum, tech) => sum + tech.proficiency, 0), 0
                ) / skills.reduce((acc, cat) => acc + cat.technologies.length, 0)
              )}%
            </div>
            <div className="text-gray-400 text-sm">Avg Proficiency</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-purple">4</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;