// components/RecentProjects.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { projects } from "@/data";
import { PinContainer } from "./ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa";
import { Modal } from "./ui/Modal";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""; // '' locally, '/Portfolio' on Pages

// Define the project type including architecture
type Project = {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  architecture?: {
    description: string;
    techStack: { name: string; purpose: string }[];
    features: string[];
    challenges: string[];
  };
};

const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of <span className="text-purple">recent projects</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="sm:w-[570px] w-[80vw] flex flex-col items-center"
          >
            <div className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]">
              <PinContainer title={project.link} href={project.link}>
                <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                  <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
                    {/* Background image */}
                    <Image
                      src={`${BASE}/bg.png`}
                      alt="Background"
                      fill
                      sizes="(max-width: 640px) 80vw, 570px"
                    />
                  </div>

                  {/* Project hero image */}
                  <Image
                    src={`${BASE}/${project.img}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 80vw, 570px"
                    className="z-10 absolute bottom-0 object-contain"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {project.title}
                </h1>

                <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
                  {project.des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {project.iconLists.map((icon: string, index: number) => (
                      <div
                        key={icon}
                        className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{ transform: `translateX(-${5 * index * 2}px)` }}
                      >
                        <Image
                          src={`${BASE}/${icon}`}
                          alt=""
                          width={32}
                          height={32}
                          className="p-2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="flex lg:text-lg md:text-xs text-sm text-purple">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </div>

            {/* Learn More Button - Outside PinContainer */}
            {project.architecture && (
              <div className="mt-4 sm:w-[570px] w-[80vw]">
                <button
                  onClick={() => openModal(project)}
                  className="w-full bg-purple/20 hover:bg-purple/30 border border-purple/50 rounded-lg py-3 px-6 text-purple font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple/25"
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && selectedProject.architecture && (
        <Modal isOpen={!!selectedProject} onClose={closeModal}>
          <div className="max-w-4xl max-h-[80vh] overflow-y-auto p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-gray-300 text-lg">
                {selectedProject.architecture.description}
              </p>
            </div>

            {/* Project Image */}
            <div className="mb-6 relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={`${BASE}/${selectedProject.img}`}
                alt={selectedProject.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple mb-3">
                Tech Stack
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProject.architecture.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-black/50 border border-white/10 rounded-lg p-3"
                  >
                    <div className="font-semibold text-white">{tech.name}</div>
                    <div className="text-gray-400 text-sm">{tech.purpose}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {selectedProject.architecture.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-gray-300"
                  >
                    <span className="text-purple mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple mb-3">
                Technical Challenges
              </h3>
              <ul className="space-y-2">
                {selectedProject.architecture.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-gray-300"
                  >
                    <span className="text-red-400 mt-1">⚡</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-purple hover:bg-purple/80 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center"
              >
                View Source Code
              </a>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecentProjects;
