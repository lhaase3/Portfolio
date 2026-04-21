"use client";
        


// Move "use client" to the very top of the file

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
// Simple intersection observer hook with typing for strict TS/Next.js
import type { RefObject } from "react";
function useInView(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}
import { FaChevronLeft, FaChevronRight, FaUniversity } from "react-icons/fa";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const greekListPhotos = [
  {
    src: `${BASE}/gl-photo-1.png`,
    alt: "GreekList recruiting event and student participation",
  },
  {
    src: `${BASE}/gl-photo-3.png`,
    alt: "GreekList community activation photo",
  },
  {
    src: `${BASE}/linkedin-gl2.png`,
    alt: "GreekList outreach and campus update",
  },
  {
    src: `${BASE}/linkedin-gl3.png`,
    alt: "GreekList campus partnership progress",
  },
  {
    src: `${BASE}/gl-photo-6.png`,
    alt: "GreekList event and user engagement",
  },
];

const featureSummary = [
  "Shared rush calendar for chapter-wide and Potential New Member-visible planning.",
  "Potential New Member directory with detailed profile cards for recruiter review.",
  "Fraternity discovery pages with chapter details and context.",
  "Chapter admin dashboard for recruitment operations and pipeline tracking.",
  "Per-event QR attendance check-in with audit logs.",
  "Pre-bid and bid workflows with status management through each phase.",
  "IFC analytics covering funnel conversion, engagement, and chapter comparisons.",
  "Rush cycle and phase controls, including active-cycle payment gating.",
  "Role-based access for Potential New Member, fraternity admin, and IFC admin users.",
  "Communication tooling for announcements and bid-result outreach.",
  "Recruiter workflow tools such as star/hide and shortlist management.",
  "Campus-aware architecture for multi-school rollout and configuration.",
];

export default function CurrentActivity() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = greekListPhotos.length;
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slideCount]);
  const activePhoto = useMemo(() => greekListPhotos[activeIndex], [activeIndex]);
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  // Animation hooks
  const mainInViewTuple = useInView();
  const mainRef = mainInViewTuple[0];
  const mainInView = mainInViewTuple[1];
  const newsletterInViewTuple = useInView();
  const newsletterRef = newsletterInViewTuple[0];
  const newsletterInView = newsletterInViewTuple[1];
  const headerInViewTuple = useInView();
  const headerRef = headerInViewTuple[0];
  const headerInView = headerInViewTuple[1];

  return (
    <section id="current-activity" className="relative bg-[#e7eaed] py-24 text-zinc-900">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 sm:pl-28 sm:pr-8 lg:pl-40 lg:pr-10">
        <div
          ref={headerRef}
          className={`mb-14 text-center transition-all duration-700 ease-out transform
            ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Current Activity</h2>
          <div className="mx-auto mt-4 h-[3px] w-36 bg-teal-700" />
          <div className="mx-auto mt-8 h-[3px] w-full max-w-6xl bg-teal-600/90" />
        </div>

        <div className="space-y-10">
          <div
            ref={mainRef}
            className={`rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm md:p-10 transition-all duration-700 ease-out transform
              ${mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-zinc-900 p-2">
                <Image
                  src={`${BASE}/gl-white-logo.png`}
                  alt="GreekList logo"
                  fill
                  sizes="56px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold leading-tight text-zinc-900">GreekList</h3>
                <p className="text-base font-medium text-zinc-600">Operating under StudentList LLC</p>
              </div>
            </div>

            <p className="text-lg leading-8 text-zinc-700">
              GreekList is a recruitment operating system for fraternity rush. It centralizes event planning,
              candidate tracking, chapter operations, and IFC-level analytics so rush teams can run a structured,
              data-driven process from first touch through bids.
            </p>
            <p className="text-lg leading-8 text-zinc-700">
                During Fall Rush, IFC saw a record 1,300+ participants and generated $84,000 in revenue, marking a 25% year-over-year increase with 260 more participants than the previous year. Spring Rush brought in around 400 participants and $26,000 in revenue, with fraternity event attendance up by 22%.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">Current Campus Work</p>
                <p className="mt-2 text-base text-zinc-700">Actively collaborating with the University of Colorado Boulder.</p>
              </div>
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">Expansion Discussions</p>
                <p className="mt-2 text-base text-zinc-700">In active conversations with additional colleges across the U.S.</p>
              </div>
            </div>
              <div className="mb-4 flex items-center gap-3 mt-10">
                <h4 className="text-2xl font-bold tracking-tight text-zinc-900">Core Platform Features</h4>
              </div>
              <ul className="grid gap-3 text-[1.02rem] leading-7 text-zinc-700 md:grid-cols-2">
                {featureSummary.map((feature) => (
                  <li key={feature} className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                    {feature}
                  </li>
                ))}

              </ul>
          </div>

          {/* Newsletter Card Section */}
          <div
            ref={newsletterRef}
            className={`mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-zinc-200 bg-white p-7 shadow-md transition-all duration-700 ease-out transform
              ${newsletterInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <Image
              src={`${BASE}/news-photo.png`}
              alt="IFC 2025 Newsletter cover"
              width={700}
              height={350}
              className="rounded-xl mb-5 object-cover w-full h-auto"
              priority
            />
            <h3 className="mb-2 text-2xl font-bold text-teal-800 flex items-center gap-2">
              IFC 2025 Newsletter
            </h3>
            <p className="text-base text-zinc-700 text-center max-w-xl mb-2">
              <span className="font-semibold text-teal-700">See page 8</span> for a summary of how GreekList improved rush this year, as highlighted by the Interfraternity Council.
            </p>
            <a
              href="/IFC2025Newsletter.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-teal-700 px-7 py-3 text-base font-semibold text-white shadow hover:bg-teal-800 transition-colors"
            >
              View IFC 2025 Newsletter (PDF)
            </a>
          </div>
        </div>
      </div>
  </section>
  );
}