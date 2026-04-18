"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowUp,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGamepad,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaHome,
  FaLinkedin,
  FaMapMarkerAlt,
  FaRegFileAlt,
  FaThLarge,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import LeftRailNav from "@/components/ui/LeftRailNav";
import ParticleNetworkBackground from "@/components/ui/ParticleNetworkBackground";
import GitHubProfile from "@/components/GitHubProfile";
import ResumeSection from "@/components/ResumeSection";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { extracurriculars, projects, workExperience } from "@/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const portfolioFilters = [
  { key: "all", label: "All", icon: <FaThLarge /> },
  {
    key: "professional-experience",
    label: "Professional Experience",
    icon: <FaBriefcase />,
  },
  { key: "web-development", label: "Web Development", icon: <FaCode /> },
  {
    key: "extracurricular-activities",
    label: "Extracurricular Activities",
    icon: <FaUsers />,
  },
  { key: "hobbies", label: "Hobbies", icon: <FaGamepad /> },
] as const;

type PortfolioFilter = (typeof portfolioFilters)[number]["key"];

const roles = [
  "Computer Scientist",
  "Backend Engineer",
  "Software Engineer",
  "Data Systems Builder",
];

type ModalCard = {
  title: string;
  shortDesc: string;
  fullDesc: string;
  img: string;
  imgFit: "contain" | "cover";
  role?: string;
  liveLink?: string;
  githubLink?: string;
  archDescription?: string;
  techStack?: { name: string; purpose: string }[];
  features?: string[];
  darkBg?: boolean;
};

type AnimatedPortfolioCard = {
  key: string;
  item: ModalCard;
};

type PortfolioAnimationSpec = {
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
};

function PortfolioCard({
  item,
  onOpen,
}: {
  item: ModalCard;
  onOpen: () => void;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
      <div
        className={`relative h-32 w-full overflow-hidden ${
          item.darkBg ? "bg-zinc-800" : item.imgFit === "cover" ? "bg-zinc-200" : "bg-white"
        }`}
      >
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className={
            item.imgFit === "cover"
              ? "object-cover transition-transform duration-300 group-hover:scale-105"
              : "object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          }
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-zinc-900/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-start p-3">
          <h3 className="text-base font-bold leading-snug text-white">{item.title}</h3>
          {item.role && (
            <p className="text-teal-300 text-sm mt-1 font-medium">{item.role}</p>
          )}
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/80 sm:text-sm">{item.shortDesc}</p>
        </div>
        {/* "+" button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-2xl font-light text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:bg-teal-500"
          aria-label={`Open details for ${item.title}`}
        >
          +
        </button>
      </div>
      {/* Title below image */}
      <div className="flex h-14 items-center border-t border-zinc-100 px-3 py-2.5">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">{item.title}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const [portfolioLoaded, setPortfolioLoaded] = useState(false);
  const [portfolioAnimationCycle, setPortfolioAnimationCycle] = useState(0);
  const [portfolioCardsVisible, setPortfolioCardsVisible] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<PortfolioFilter>("all");
  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalItem, setModalItem] = useState<ModalCard | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const portfolioSectionRef = useRef<HTMLElement | null>(null);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const portfolioWasInViewRef = useRef(false);

  const activeRole = useMemo(() => roles[roleIndex], [roleIndex]);
  const filteredProjects = useMemo(() => {
    if (portfolioFilter === "all") return projects;
    if (portfolioFilter === "extracurricular-activities") return [];
    if (portfolioFilter === "professional-experience") return [];
    return projects.filter((project) => project.category.includes(portfolioFilter));
  }, [portfolioFilter]);
  const showExtracurriculars = portfolioFilter === "extracurricular-activities";
  const showWorkExperience = portfolioFilter === "professional-experience";

  const buildProjectCard = useCallback((p: (typeof projects)[number]): ModalCard => {
    const explicitGithub = (
      p as (typeof projects)[number] & { githubLink?: string }
    ).githubLink;
    const isRepoLink = typeof p.link === "string" && p.link.includes("github.com");

    return {
      title: p.title,
      shortDesc: p.des,
      fullDesc: p.des,
      img: `${BASE}/${p.img}`,
      imgFit: "contain",
      liveLink: isRepoLink ? undefined : p.link,
      githubLink: explicitGithub ?? (isRepoLink ? p.link : undefined),
      archDescription: p.architecture?.description,
      techStack: p.architecture?.techStack,
      features: p.architecture?.features,
      darkBg: p.id === 1 || p.id === 2,
    };
  }, []);

  const projectCards = useMemo<AnimatedPortfolioCard[]>(() => {
    return projects.map((p) => ({
      key: `project-${p.id}`,
      item: buildProjectCard(p),
    }));
  }, [buildProjectCard]);

  const workCards = useMemo<AnimatedPortfolioCard[]>(() => {
    return workExperience.map((j) => ({
      key: `work-${j.id}`,
      item: {
        title: j.title,
        shortDesc: j.desc,
        fullDesc: j.desc,
        img: `${BASE}/${j.thumbnail}`,
        imgFit: "contain",
        darkBg: j.id === 0,
      },
    }));
  }, []);

  const extracurricularCards = useMemo<AnimatedPortfolioCard[]>(() => {
    return extracurriculars.filter((a) => a.id <= 3 || a.id === 9).map((a) => ({
      key: `extra-${a.id}`,
      item: {
        title: a.title,
        shortDesc: a.description,
        fullDesc: a.description,
        img: `${BASE}/${a.image}`,
        imgFit: "cover",
        role: a.role,
      },
    }));
  }, []);

  const hobbyCards = useMemo<AnimatedPortfolioCard[]>(() => {
    return extracurriculars.filter((a) => a.id === 3 || a.id === 4 || a.id === 5 || a.id === 6 || a.id === 7 || a.id === 8).map((a) => ({
      key: `hobby-${a.id}`,
      item: {
        title: a.title,
        shortDesc: a.description,
        fullDesc: a.description,
        img: `${BASE}/${a.image}`,
        imgFit: a.id === 3 || a.id === 7 ? "cover" : "contain",
        role: a.role,
      },
    }));
  }, []);

  const hobbyOnlyCards = useMemo<AnimatedPortfolioCard[]>(() => {
    return hobbyCards.filter((card) => card.key !== "hobby-3");
  }, [hobbyCards]);

  const allCards = useMemo<AnimatedPortfolioCard[]>(() => {
    return [
      ...projectCards,
      ...workCards.filter((card) => card.key !== "work-0"),
      ...extracurricularCards,
      ...hobbyOnlyCards,
    ];
  }, [extracurricularCards, hobbyOnlyCards, projectCards, workCards]);

  const activePortfolioCards = useMemo<AnimatedPortfolioCard[]>(() => {
    if (portfolioFilter === "all") return allCards;
    if (showExtracurriculars) return extracurricularCards;
    if (showWorkExperience) return workCards;
    if (portfolioFilter === "hobbies") {
      const hobbyProjectCards = filteredProjects.map((p) => ({
        key: `project-${p.id}`,
        item: buildProjectCard(p),
      }));

      return [...hobbyProjectCards, ...hobbyCards];
    }

    return filteredProjects.map((p) => ({
      key: `project-${p.id}`,
      item: buildProjectCard(p),
    }));
  }, [allCards, buildProjectCard, extracurricularCards, filteredProjects, hobbyCards, portfolioFilter, showExtracurriculars, showWorkExperience, workCards]);

  const displayPortfolioCards = useMemo<AnimatedPortfolioCard[]>(() => {
    const cards = [...activePortfolioCards];
    // Deterministic shuffle using cycle as seed so same cycle = same order
    const seededRandom = seedRandom(portfolioAnimationCycle);
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }, [activePortfolioCards, portfolioAnimationCycle]);

  const portfolioAnimationSpecs = useMemo(() => {
    return buildPortfolioAnimationSpecs(displayPortfolioCards.length);
  }, [displayPortfolioCards.length]);

  useEffect(() => {
    let hideTimer: number | null = null;

    const completeLoading = () => {
      hideTimer = window.setTimeout(() => {
        setShowInitialLoader(false);
      }, 450);
    };

    if (document.readyState === "complete") {
      completeLoading();
    } else {
      window.addEventListener("load", completeLoading);
    }

    return () => {
      window.removeEventListener("load", completeLoading);
      if (hideTimer !== null) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  useEffect(() => {
    const doneTyping = typedText === activeRole;
    const doneDeleting = typedText === "";

    const delay = isDeleting ? 42 : doneTyping ? 1200 : 78;

    const timer = window.setTimeout(() => {
      if (!isDeleting && !doneTyping) {
        setTypedText(activeRole.slice(0, typedText.length + 1));
      } else if (isDeleting && !doneDeleting) {
        setTypedText(activeRole.slice(0, typedText.length - 1));
      } else if (doneTyping) {
        setIsDeleting(true);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeRole, isDeleting, typedText]);

  useEffect(() => {
    const target = aboutSectionRef.current;
    if (!target || aboutLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setAboutLoaded(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [aboutLoaded]);

  useEffect(() => {
    const target = portfolioSectionRef.current;
    if (!target) return;

    let animationTimer: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? false;

        if (isIntersecting && !portfolioWasInViewRef.current) {
          portfolioWasInViewRef.current = true;
          setPortfolioLoaded(true);
          setPortfolioCardsVisible(false);
          setPortfolioAnimationCycle((prev) => prev + 1);
          animationTimer = window.setTimeout(() => {
            setPortfolioCardsVisible(true);
          }, 35);
        }

        if (!isIntersecting) {
          portfolioWasInViewRef.current = false;
          setPortfolioCardsVisible(false);
        }
      },
      { root: null, threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (animationTimer !== null) {
        window.clearTimeout(animationTimer);
      }
    };
  }, []);

  useEffect(() => {
    const target = skillsSectionRef.current;
    if (!target || skillsLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSkillsLoaded(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [skillsLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-x-clip bg-[#07090d] text-zinc-100">
      {/* Full-screen loader overlay — sits on top while page initialises */}
      {showInitialLoader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030508] text-zinc-100">
          <div className="flex flex-col items-center gap-8">
            {/* Triangle: single dot on top, two on bottom */}
            <div className="flex flex-col items-center gap-4">
              <span className="loader-dot h-7 w-7" style={{ animationDelay: "0ms" }} />
              <div className="flex gap-8">
                <span className="loader-dot h-7 w-7" style={{ animationDelay: "180ms" }} />
                <span className="loader-dot h-7 w-7" style={{ animationDelay: "360ms" }} />
              </div>
            </div>
            <p className="text-4xl font-medium tracking-tight text-white sm:text-5xl">Loading...</p>
          </div>
        </div>
      )}

      <LeftRailNav
        items={[
          { id: "home", label: "Home", icon: <FaHome /> },
          { id: "about", label: "About", icon: <FaUser /> },
          { id: "portfolio", label: "Portfolio", icon: <MdWorkOutline /> },
          { id: "resume", label: "Resume", icon: <FaRegFileAlt /> },
        ]}
      />

      <section id="home" className="relative min-h-screen">
        <ParticleNetworkBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(12,173,164,0.16),transparent_55%)]" />
        <div className="aurora-drift absolute inset-[-18%] opacity-60 bg-[radial-gradient(ellipse_at_70%_35%,rgba(32,255,196,0.14),transparent_42%),radial-gradient(ellipse_at_25%_78%,rgba(0,124,255,0.12),transparent_38%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-8 pl-24 sm:pl-28 lg:pl-32">
          <div className="max-w-5xl">
            {/* <p className="mb-3 text-sm uppercase tracking-[0.35em] text-teal-300/80">Logan Haase</p> */}
            <h1 className="text-6xl font-extrabold leading-tight sm:text-7xl">Logan Haase</h1>
            <p className="mt-5 text-4xl font-semibold text-zinc-200 sm:text-5xl">
              I&apos;m a{" "}
              <span className="relative inline-block pb-1">
                {/* Main white text */}
                <span className="relative text-white">{typedText}</span>
                
                {/* Dark turquoise underline */}
                {typedText.length > 0 && (
                  <span className="absolute bottom-0 left-0 h-1 bg-teal-700" style={{ width: '100%' }} />
                )}
              </span>
              <span className="ml-1 inline-block h-10 w-[2px] animate-pulse bg-white align-middle" />
            </p>

            {/* <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Founder and developer of StudentList. I build backend systems, APIs, and data
              pipelines that run in production and hold up under real user traffic.
            </p> */}

            <div className="mt-9 flex items-center gap-6 text-3xl text-zinc-300">
              <a
                href="https://github.com/lhaase3"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-teal-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/logan-haase-8a15a1280/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-teal-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={`${BASE}/Resume Portfolio.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-zinc-500 px-5 py-2.5 text-base font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-teal-300 hover:text-white"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutSectionRef} className="relative bg-[#e7eaed] py-24 text-zinc-800">
        <div className="mx-auto w-full max-w-[1400px] px-8 sm:pl-32 sm:pr-8 lg:pl-40 lg:pr-10">
          {aboutLoaded ? (
            <div className="scroll-rise-in">
              <div className="mb-14 text-center">
                <h2 className="text-5xl font-extrabold text-zinc-900">About</h2>
                <div className="mx-auto mt-4 h-[3px] w-40 bg-teal-700" />
                <div className="mx-auto mt-10 h-[3px] w-full max-w-6xl bg-teal-600/90" />
              </div>

              <div className="grid gap-16 lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start xl:grid-cols-[430px_minmax(0,1fr)]">
                <div className="relative mx-auto h-80 w-80 overflow-hidden rounded-full border-[7px] border-white shadow-lg lg:mx-0 lg:ml-24 lg:h-[26rem] lg:w-[26rem] xl:ml-28">
                  <Image
                    src={`${BASE}/portfolio_picture.png`}
                    alt="Logan Haase"
                    fill
                    sizes="(max-width: 1024px) 320px, 416px"
                    className="object-cover"
                  />
                </div>

                <div className="max-w-none">
                  <h3 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Computer Scientist, Software Engineer, Founder
                  </h3>
                  <p className="mt-7 text-xl italic leading-10 text-zinc-700 sm:text-[1.45rem]">
                    I am a Computer Science student at the University of Colorado Boulder who
                    enjoys building software systems that move from idea to real users and solve
                    practical problems at scale.
                  </p>

                  <div className="mt-12 grid gap-12 xl:grid-cols-2">
                    <div>
                      <h4 className="text-3xl font-medium text-zinc-800">Online Profiles</h4>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-4 text-zinc-800">
                          <FaGlobe className="text-2xl text-teal-700" />
                          <span className="w-32 text-2xl font-bold">Website</span>
                          <a
                            href="https://lhaase3.github.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl text-teal-700 hover:underline"
                          >
                            lhaase3.github.io
                          </a>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-800">
                          <FaLinkedin className="text-2xl text-teal-700" />
                          <span className="w-32 text-2xl font-bold">LinkedIn</span>
                          <a
                            href="https://www.linkedin.com/in/logan-haase-8a15a1280/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl text-teal-700 hover:underline"
                          >
                            logan-haase
                          </a>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-800">
                          <FaGithub className="text-2xl text-teal-700" />
                          <span className="w-32 text-2xl font-bold">GitHub</span>
                          <a
                            href="https://github.com/lhaase3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl text-teal-700 hover:underline"
                          >
                            lhaase3
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-3xl font-medium text-zinc-800">Personal Information</h4>
                      <div className="mt-6 space-y-6 text-zinc-800">
                        <div className="grid grid-cols-[auto,8rem,1fr] items-center gap-4">
                          <FaGraduationCap className="text-2xl text-teal-700" />
                          <span className="text-2xl font-bold">Major</span>
                          <span className="text-2xl">Computer Science</span>
                        </div>
                        <div className="grid grid-cols-[auto,8rem,1fr] items-center gap-4">
                          <FaRegFileAlt className="text-2xl text-teal-700" />
                          <span className="text-2xl font-bold">Degree</span>
                          <span className="text-2xl">B.S.</span>
                        </div>
                        <div className="grid grid-cols-[auto,8rem,1fr] items-center gap-4">
                          <FaEnvelope className="text-2xl text-teal-700" />
                          <span className="text-2xl font-bold">Email</span>
                          <span className="text-2xl">loganhaase3@gmail.com</span>
                        </div>
                        <div className="grid grid-cols-[auto,8rem,1fr] items-center gap-4">
                          <FaMapMarkerAlt className="text-2xl text-teal-700" />
                          <span className="text-2xl font-bold">State</span>
                          <span className="text-2xl">California, USA</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mx-auto mt-16 max-w-7xl space-y-8">
                <p className="text-[1.35rem] leading-[1.85] text-zinc-700">
                  My name is Logan Haase, and I&apos;m a Computer Science student at the University of Colorado Boulder with a strong interest in building software systems that go beyond theory and create real impact. What drives me most is taking an idea, designing the system behind it, and bringing it to life for real users. I enjoy working on problems where scale, performance, and usability all intersect.
                </p>

                <p className="text-[1.35rem] leading-[1.85] text-zinc-700">
                  Over the past few years, I&apos;ve had the opportunity to build across a range of environments, from internships to founding my own platform. Most notably, I created and now operate StudentList, a cloud-based SaaS platform that serves over 1,900 users and has generated more than $100,000 in revenue. Through this, I&apos;ve gained firsthand experience designing backend systems, building APIs, managing cloud infrastructure, and continuously improving a live product based on real-world feedback. I&apos;ve also worked on data-intensive systems during my time at Polaris Electro-Optics, where I helped develop tools for processing and analyzing large-scale scientific datasets.
                </p>

                <p className="text-[1.35rem] leading-[1.85] text-zinc-700">
                  What makes me unique is my focus on end-to-end ownership. I don&apos;t just write code, I think about how systems are designed, deployed, and used over time. I&apos;m particularly interested in backend engineering, distributed systems, and AI-driven platforms that can handle complex, real-world data.
                </p>

                <p className="text-[1.35rem] leading-[1.85] text-zinc-700">
                  The purpose of this portfolio is to showcase not just what I&apos;ve built, but how I think. Here, you&apos;ll find a collection of my projects, technical experience, and the systems I&apos;ve designed, along with insights into the decisions and challenges behind them. Whether you&apos;re here to evaluate my work, explore my projects, or simply learn more about my background, I hope this gives you a clear picture of what I bring as a developer.
                </p>
              </div>
            </div>
          ) : (
            <div className="min-h-[58vh] rounded-3xl border border-zinc-300 bg-white/50 animate-pulse" />
          )}
        </div>
      </section>

      <section
        id="portfolio"
        ref={portfolioSectionRef}
        className="relative bg-[#e7eaed] py-24 text-zinc-900"
      >
        <div className="mx-auto w-full max-w-[1380px] px-6 sm:px-8 sm:pl-28 lg:px-8 lg:pl-36 xl:px-10 xl:pl-40">
          {portfolioLoaded ? (
            <div>
              <div className="mb-12 text-center">
                <h2 className="text-5xl font-extrabold">Portfolio</h2>
                <div className="mx-auto mt-4 h-[3px] w-32 bg-teal-700" />
                <div className="mx-auto mt-10 h-[3px] w-full max-w-6xl bg-teal-600/90" />
              </div>

              <div className="mx-auto mb-12 flex w-full max-w-[96rem] items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-20 xl:gap-24 rounded-full bg-[#0e8a7b] px-6 sm:px-10 md:px-12 py-3 shadow-sm">
                {portfolioFilters.map((filter) => {
                  const isActive = portfolioFilter === filter.key;

                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setPortfolioFilter(filter.key)}
                      aria-label={filter.label}
                      className={`group relative flex h-10 sm:h-12 min-w-[40px] sm:min-w-[80px] md:min-w-[96px] items-center justify-center overflow-hidden rounded-full px-3 sm:px-6 md:px-8 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:min-w-[140px] sm:hover:min-w-[200px] md:hover:min-w-[250px] sm:text-base ${
                        isActive
                          ? "bg-[#075f57] text-white shadow-inner"
                          : "bg-transparent text-white/85 hover:bg-[#0a7066] hover:text-white"
                      }`}
                    >
                      <span className="transition-all duration-200 group-hover:-translate-y-6 group-hover:opacity-0">
                        <span className="text-xl sm:text-2xl">{filter.icon}</span>
                      </span>
                      <span className="pointer-events-none absolute translate-y-6 whitespace-nowrap opacity-0 normal-case tracking-normal transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        {filter.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayPortfolioCards.map((card, index) => {
                  const spec = portfolioAnimationSpecs[index];

                  return (
                    <div
                      key={`${card.key}-${portfolioAnimationCycle}`}
                      className={`portfolio-scatter-card h-48 sm:h-52 ${portfolioCardsVisible ? "is-visible" : ""}`}
                      style={{
                        ["--card-x" as string]: `${spec?.x ?? 0}px`,
                        ["--card-y" as string]: `${spec?.y ?? 0}px`,
                        ["--card-rotate" as string]: `${spec?.rotate ?? 0}deg`,
                        ["--card-delay" as string]: `${spec?.delay ?? 0}ms`,
                        ["--card-duration" as string]: `${spec?.duration ?? 760}ms`,
                      }}
                    >
                      <PortfolioCard item={card.item} onOpen={() => setModalItem(card.item)} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="mx-auto h-12 w-56 animate-pulse rounded-xl bg-zinc-300/80" />
              <div className="mx-auto h-[3px] w-full max-w-[1400px] bg-teal-600/50" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-48 sm:h-52 animate-pulse rounded-2xl border border-zinc-300 bg-white/60"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <GitHubProfile />
      <ResumeSection />
      
      <section id="skills" ref={skillsSectionRef} className="relative bg-[#e7eaed] py-24 text-zinc-900">
        <div className="mx-auto w-full max-w-[1400px] px-8 sm:pl-32 sm:pr-8 lg:pl-40 lg:pr-10">
          {skillsLoaded ? (
            <div className="scroll-rise-in">
              <Skills />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="mx-auto h-12 w-56 animate-pulse rounded-xl bg-zinc-300/80" />
            </div>
          )}
        </div>
      </section>

      {/* ── Portfolio Item Modal ── */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image */}
            <div className={`relative h-72 w-full shrink-0 bg-zinc-900`}>
              <Image
                src={modalItem.img}
                alt={modalItem.title}
                fill
                sizes="(max-width: 640px) 100vw, 1024px"
                className={modalItem.imgFit === "cover" ? "object-cover" : "object-contain p-8"}
              />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-8">
              {/* Title + links */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-zinc-900 leading-snug">{modalItem.title}</h3>
                  {modalItem.role && (
                    <p className="text-teal-600 text-base font-medium mt-1">{modalItem.role}</p>
                  )}
                </div>
                {(modalItem.liveLink || modalItem.githubLink) && (
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {modalItem.liveLink && (
                      <a href={modalItem.liveLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-base font-semibold text-white hover:bg-teal-700 transition-colors">
                        <FaGlobe /> Live Site
                      </a>
                    )}
                    {modalItem.githubLink && (
                      <a href={modalItem.githubLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 text-base font-semibold text-white hover:bg-zinc-900 transition-colors">
                        <FaGithub /> GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Architecture description (projects) or plain description */}
              <p className="mt-5 text-base leading-7 text-zinc-700">
                {modalItem.archDescription ?? modalItem.fullDesc}
              </p>

              {/* Tech Stack */}
              {modalItem.techStack && modalItem.techStack.length > 0 && (
                <div className="mt-7">
                  <h4 className="text-lg font-bold text-zinc-900 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {modalItem.techStack.map((t) => (
                      <span key={t.name} title={t.purpose}
                        className="rounded-full bg-teal-50 border border-teal-200 px-4 py-1.5 text-sm font-semibold text-teal-800">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {modalItem.features && modalItem.features.length > 0 && (
                <div className="mt-7">
                  <h4 className="text-lg font-bold text-zinc-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {modalItem.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-base text-zinc-700">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setModalItem(null)}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/30 text-white flex items-center justify-center text-xl hover:bg-black/50 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 h-14 w-14 rounded-lg bg-teal-800 flex items-center justify-center hover:bg-teal-900 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Scroll to top"
        >
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <FaArrowUp className="text-teal-800 text-lg" />
          </div>
        </button>
      )}

      <Footer />
    </main>
  );
}

function buildPortfolioAnimationSpecs(count: number): PortfolioAnimationSpec[] {
  const entryOrder = Array.from({ length: count }, (_, index) => index).sort(() => Math.random() - 0.5);
  const delays = new Map<number, number>();

  entryOrder.forEach((cardIndex, orderIndex) => {
    delays.set(cardIndex, orderIndex * 90 + Math.floor(Math.random() * 220));
  });

  return Array.from({ length: count }, (_, index) => ({
    x: randomSignedDistance(320, 900),
    y: randomSignedDistance(220, 720),
    rotate: randomSignedDistance(14, 34),
    delay: delays.get(index) ?? index * 45,
    duration: randomBetween(980, 1480),
  }));
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSignedDistance(min: number, max: number) {
  const magnitude = randomBetween(min, max);
  return Math.random() > 0.5 ? magnitude : -magnitude;
}

function seedRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}
