"use client";

import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaRegFileAlt } from "react-icons/fa";

type ResumeEntry = {
  title: string;
  role?: string;
  date?: string;
  location?: string;
  bullets: string[];
};

const educationEntries: ResumeEntry[] = [
  {
    title: "University of Colorado at Boulder - Engineering & Applied Sciences",
    role: "Bachelor of Science in Computer Science",
    date: "Aug 2022 - May 2026",
    location: "Boulder, CO",
    bullets: [
      "Relevant Coursework: Operating Systems, Network Systems, Database Systems, Algorithms, Data Structures, Artificial Intelligence, Advanced Data Science.",
    ],
  },
];

const experienceEntries: ResumeEntry[] = [
  {
    title: "StudentList",
    role: "Founder",
    date: "Jan 2025 - Present",
    location: "Boulder, CO",
    bullets: [
      "Architected and operated a cloud-hosted backend platform serving 1,900+ users, generating $100K+ in revenue for CU Boulder IFC.",
      "Built and maintained backend services and APIs powering payment workflows, QR-based data ingestion, and analytics pipelines, with a focus on reliability and scalability.",
      "Deployed and managed containerized services in production, iterating on system design based on real-world usage, performance, and operational issues.",
    ],
  },
  {
    title: "Polaris Electro-Optics",
    role: "Software Engineer Intern",
    date: "May 2025 - Aug 2025",
    location: "Broomfield, CO",
    bullets: [
      "Built a backend data platform for ingesting, transforming, and querying large scientific datasets, supporting repeatable analysis and visualization workflows.",
      "Developed automation and tooling to manage metadata, validation, and reproducibility across experimental pipelines.",
      "Refactored legacy engineering libraries into modular, testable components, improving maintainability and long-term system reliability.",
    ],
  },
  {
    title: "Consensus Technology Group",
    role: "Software Engineer Intern",
    date: "May 2024 - Aug 2024",
    location: "Irvine, CA",
    bullets: [
      "Developed and tested authentication and access-control services (login, registration, MFA) as part of production infrastructure systems.",
      "Worked within structured development workflows emphasizing security, correctness, and system lifecycle management.",
    ],
  },
  {
    title: "Modern Prairie",
    role: "Software Development Intern",
    date: "May - Aug 2022, May - Aug 2023",
    location: "Huntington Beach, CA",
    bullets: [
      "Built JavaScript APIs to automate newsletters, sign-ups, product views, and abandoned cart emails.",
      "Implemented real-time user event tracking with Node.js for enhanced marketing automation.",
    ],
  },
];

const projectEntries: ResumeEntry[] = [
  {
    title: "Satellite Telemetry Anomaly Detection System",
    date: "Aug 2025 - Nov 2025",
    bullets: [
      "Built a telemetry platform using Python, FastAPI, PostgreSQL, and Docker for ingesting and analyzing satellite time-series data.",
      "Designed real-time ingestion pipelines and APIs supporting anomaly detection workflows evaluated on NASA JPL Telemanom datasets.",
    ],
  },
  {
    title: "CultureCampAI - Senior Capstone",
    date: "Aug 2025 - Present",
    bullets: [
      "Supported development of AI-powered workflows, contributing to data preparation, evaluation pipelines, and iteration based on real usage feedback.",
      "Assisted in testing and refining AI system behavior as part of a larger application lifecycle.",
    ],
  },
];

const leadershipEntries: ResumeEntry[] = [
  {
    title: "Chi Psi Fraternity",
    role: "Philanthropy Chairman",
    date: "Apr 2023 - Apr 2024",
    location: "Boulder, CO",
    bullets: [
      "Managed a $3,000 operating budget to plan and execute fundraising events with CU Boulder and local Boulder businesses.",
      "Raised $36,000 for the National MS Society through planning, sponsorship outreach, and coordinated member engagement.",
    ],
  },
  {
    title: "University of Colorado Student Government",
    role: "Student Government Campaign Manager",
    date: "Jan 2024 - Apr 2024",
    location: "Boulder, CO",
    bullets: [
      "Managed a campus-wide campaign website and led a 17-person outreach team to drive student voter engagement through campus-held events.",
    ],
  },
];

const skillsBuckets = [
  {
    label: "Languages",
    value: "Python, C, JavaScript, SQL, Bash",
  },
  {
    label: "Cloud & Systems",
    value: "Docker, Linux, CI/CD workflows",
  },
  {
    label: "Frameworks & Tools",
    value: "FastAPI, Firebase, GitHub/GitLab, Jira",
  },
];

function TimelineBlock({
  title,
  role,
  date,
  location,
  bullets,
}: {
  title: string;
  role?: string;
  date?: string;
  location?: string;
  bullets: string[];
}) {
  return (
    <article className="resume-timeline-item relative pl-10 pb-10 last:pb-0">
      <span className="absolute left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-teal-600 bg-[#e7eaed]" />
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
        <h4 className="max-w-4xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">{title}</h4>
        {date && <p className="text-xl font-semibold text-teal-700">{date}</p>}
      </div>
      {(role || location) && (
        <div className="mt-1 flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
          {role && <p className="text-2xl font-semibold italic text-teal-700">{role}</p>}
          {location && <p className="text-xl italic text-zinc-600">{location}</p>}
        </div>
      )}
      <ul className="mt-5 space-y-3 text-xl leading-9 text-zinc-700">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-600" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ResumeSection() {
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const resumeSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = resumeSectionRef.current;
    if (!target || resumeLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setResumeLoaded(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [resumeLoaded]);

  return (
    <section ref={resumeSectionRef} id="resume" className="relative bg-[#e7eaed] py-24 text-zinc-900">
      <div className="mx-auto w-full max-w-[1650px] px-8 sm:pl-28 lg:pl-40">
        {resumeLoaded ? (
          <div className="scroll-rise-in">
            <div className="mb-12 text-center">
              <h2 className="text-5xl font-extrabold">Resume</h2>
              <div className="mx-auto mt-4 h-[3px] w-40 bg-teal-700" />
              <p className="mx-auto mt-8 max-w-6xl text-2xl leading-10 text-zinc-700">
                A highly motivated and detail-oriented Computer Science student at CU Boulder with experience in software development, cybersecurity, and machine learning.
              </p>
              <div className="mx-auto mt-10 h-[3px] w-full max-w-6xl bg-teal-600/90" />
            </div>

            <div className="mb-12 flex justify-center">
              <a
                href="/Resume Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border-2 border-teal-700 bg-white px-7 py-3 text-lg font-semibold text-teal-700 transition-colors hover:bg-teal-700 hover:text-white"
              >
                <FaRegFileAlt />
                View Full Resume (PDF)
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </div>

            <div className="grid gap-10 xl:grid-cols-2 xl:items-start">
              <div>
                <h3 className="mb-8 text-center text-5xl font-extrabold text-zinc-900">Education</h3>
                <div className="resume-timeline relative border-l-2 border-teal-600 pl-2">
                  {educationEntries.map((entry) => (
                    <TimelineBlock
                      key={entry.title}
                      title={entry.title}
                      role={entry.role}
                      date={entry.date}
                      location={entry.location}
                      bullets={entry.bullets}
                    />
                  ))}
                </div>

                <div className="mt-14">
                  <h3 className="mb-8 text-center text-5xl font-extrabold text-zinc-900">Professional Experience</h3>
                  <div className="resume-timeline relative border-l-2 border-teal-600 pl-2">
                    {experienceEntries.map((entry) => (
                      <TimelineBlock
                        key={entry.title}
                        title={entry.title}
                        role={entry.role}
                        date={entry.date}
                        location={entry.location}
                        bullets={entry.bullets}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-8 text-center text-5xl font-extrabold text-zinc-900">Projects</h3>
                <div className="resume-timeline relative border-l-2 border-teal-600 pl-2">
                  {projectEntries.map((entry) => (
                    <TimelineBlock
                      key={entry.title}
                      title={entry.title}
                      date={entry.date}
                      bullets={entry.bullets}
                    />
                  ))}
                </div>

                <div className="mt-14">
                  <h3 className="mb-8 text-center text-5xl font-extrabold text-zinc-900">Leadership</h3>
                  <div className="resume-timeline relative border-l-2 border-teal-600 pl-2">
                    {leadershipEntries.map((entry) => (
                      <TimelineBlock
                        key={entry.title}
                        title={entry.title}
                        role={entry.role}
                        date={entry.date}
                        location={entry.location}
                        bullets={entry.bullets}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-14">
                  <h3 className="mb-6 text-center text-5xl font-extrabold text-zinc-900">Skills</h3>
                  <div className="resume-timeline relative border-l-2 border-teal-600 pl-2">
                    <article className="resume-timeline-item relative pl-10 pb-0">
                      <span className="absolute left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-teal-600 bg-[#e7eaed]" />
                      <h4 className="mb-5 text-3xl font-bold text-zinc-900">Technical Skills</h4>
                      <ul className="space-y-4 text-xl leading-9 text-zinc-700">
                        {skillsBuckets.map((bucket) => (
                          <li key={bucket.label} className="flex items-start gap-3">
                            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-600" />
                            <span>
                              <span className="font-semibold text-zinc-900">{bucket.label}: </span>
                              {bucket.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[58vh] rounded-3xl border border-zinc-300 bg-white/50 animate-pulse" />
        )}
      </div>
    </section>
  );
}
