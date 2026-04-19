"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCodeBranch, FaGithub, FaLinkedin, FaRegStar } from "react-icons/fa";
import { githubConfig } from "@/data";

interface GitHubUser {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildContributionGrid(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = Math.random() < 0.35 ? Math.floor(Math.random() * 9) : 0;
    days.push({
      date: d.toISOString().split("T")[0],
      count,
      level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4,
    });
  }
  return days;
}

function getColor(level: number) {
  return ["bg-zinc-200", "bg-teal-200", "bg-teal-400", "bg-teal-600", "bg-teal-800"][level];
}

// Build week columns for the grid
function buildWeeks(days: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  // Pad front so first day lands on correct weekday
  const firstDay = new Date(days[0].date);
  const padCount = firstDay.getDay(); // 0=Sun
  const padded: (ContributionDay | null)[] = [
    ...Array(padCount).fill(null),
    ...days,
  ];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7) as ContributionDay[]);
  }
  return weeks;
}

// Returns month label positions for the header row
function getMonthLabels(weeks: ContributionDay[][]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const firstReal = week.find((d) => d !== null);
    if (!firstReal) return;
    const m = new Date(firstReal.date).getMonth();
    if (m !== lastMonth) {
      labels.push({ label: MONTHS[m], col });
      lastMonth = m;
    }
  });
  return labels;
}

export default function GitHubProfile() {
  const [githubLoaded, setGithubLoaded] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [featuredRepos, setFeaturedRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposSectionVisible, setReposSectionVisible] = useState(false);
  const [contributions] = useState<ContributionDay[]>(buildContributionGrid);
  const [heatmapCellSize, setHeatmapCellSize] = useState(12);
  const [heatmapGap, setHeatmapGap] = useState(3);
  const [weekdayLabelWidth, setWeekdayLabelWidth] = useState(36);
  const [showWeekdayLabels, setShowWeekdayLabels] = useState(true);
  const heatmapContainerRef = useRef<HTMLDivElement | null>(null);
  const githubSectionRef = useRef<HTMLElement | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${githubConfig.username}`
      );
      const data = await res.json();
      setUser(data);
    } catch {
      // silently fail — static fallback shown
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeaturedRepos = useCallback(async () => {
    try {
      const repos = await Promise.all(
        githubConfig.featuredRepos.map(async (repoName) => {
          const response = await fetch(
            `https://api.github.com/repos/${githubConfig.username}/${repoName}`
          );

          if (!response.ok) {
            return null;
          }

          const data = (await response.json()) as GitHubRepo;
          return data;
        })
      );

      setFeaturedRepos(repos.filter((repo): repo is GitHubRepo => repo !== null));
    } catch {
      setFeaturedRepos([]);
    } finally {
      setReposLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const target = githubSectionRef.current;
    if (!target || githubLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setGithubLoaded(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [githubLoaded]);

  useEffect(() => {
    if (!githubLoaded || reposSectionVisible) return;
    setReposSectionVisible(true);
  }, [githubLoaded, reposSectionVisible]);

  useEffect(() => {
    if (!reposSectionVisible) return;
    fetchFeaturedRepos();
  }, [fetchFeaturedRepos, reposSectionVisible]);

  useEffect(() => {
    const weekCount = 53;
    const updateCellSize = () => {
      if (!heatmapContainerRef.current) return;
      const containerWidth = heatmapContainerRef.current.clientWidth;
      const isNarrow = containerWidth < 430;
      const gap = isNarrow ? 1 : 3;
      const labelWidth = isNarrow ? 0 : 36;
      const minCell = isNarrow ? 2 : 6;
      const maxCell = isNarrow ? 14 : 14;
      const availableWidth = containerWidth - labelWidth - (weekCount - 1) * gap;
      const computed = Math.floor(availableWidth / weekCount);

      setHeatmapGap(gap);
      setWeekdayLabelWidth(labelWidth);
      setShowWeekdayLabels(!isNarrow);
      setHeatmapCellSize(Math.max(minCell, Math.min(maxCell, computed)));
    };
    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [githubLoaded]);

  const weeks = buildWeeks(contributions);
  const monthLabels = getMonthLabels(weeks);

  return (
    <section
      ref={githubSectionRef}
      id="github"
      className="relative overflow-x-hidden bg-[#e7eaed] py-24 text-zinc-900"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 sm:pl-28 sm:pr-8 lg:pl-40 lg:pr-10">
        {githubLoaded ? (
          <div className="scroll-rise-in">
            {/* Header */}
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Featured Profiles &amp; Repositories</h2>
              <div className="mx-auto mt-4 h-[3px] w-48 bg-teal-700" />
              <div className="mx-auto mt-6 h-[3px] w-full max-w-6xl bg-teal-600/90" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)] xl:gap-10 xl:grid-cols-[500px_minmax(0,1fr)]">
          {/* ── LEFT COLUMN ── single enclosing white box ── */}
          <div className="flex min-w-0 flex-col gap-10 rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-400 md:p-10 xl:p-12">
            {/* GitHub Profile */}
            <div>
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="mx-auto h-32 w-32 rounded-full bg-zinc-300" />
                  <div className="mx-auto h-6 w-40 rounded bg-zinc-300" />
                  <div className="mx-auto h-4 w-56 rounded bg-zinc-200" />
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center">
                    <Image
                      src={user?.avatar_url ?? `${BASE}/portfolio_picture.png`}
                      alt={user?.name ?? githubConfig.displayName}
                      width={132}
                      height={132}
                      unoptimized
                      className="h-32 w-32 shrink-0 rounded-full border-4 border-zinc-100 shadow"
                    />
                    <h3 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900">
                      {user?.name ?? githubConfig.displayName}
                    </h3>
                    <p className="mt-2 text-base text-zinc-500">@{user?.login ?? githubConfig.username}</p>
                    {user?.bio && (
                      <p className="mt-3 max-w-sm text-base leading-relaxed text-zinc-600">{user.bio}</p>
                    )}
                  </div>

                  <div className="mt-8 grid grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-zinc-50">
                    <div className="flex flex-col items-center py-5">
                      <span className="text-2xl font-bold text-zinc-900">{user?.followers ?? "—"}</span>
                      <span className="mt-1 text-sm text-zinc-500">followers</span>
                    </div>
                    <div className="flex flex-col items-center py-5">
                      <span className="text-2xl font-bold text-zinc-900">{user?.following ?? "—"}</span>
                      <span className="mt-1 text-sm text-zinc-500">following</span>
                    </div>
                    <div className="flex flex-col items-center py-5">
                      <span className="text-2xl font-bold text-zinc-900">{user?.public_repos ?? "—"}</span>
                      <span className="mt-1 text-sm text-zinc-500">repositories</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-zinc-200" />

            {/* LinkedIn Card */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <FaLinkedin className="text-4xl text-[#0a66c2]" />
                <span className="text-2xl font-bold">
                  <span className="text-[#0a66c2]">Linked</span>
                  <span className="rounded bg-[#0a66c2] px-1 text-white text-lg font-bold">in</span>
                </span>
              </div>
              <div className="flex items-center gap-5">
                <Image
                  src={`${BASE}/portfolio_picture.png`}
                  alt="Logan Haase"
                  width={76}
                  height={76}
                  className="h-[76px] w-[76px] shrink-0 rounded-full border-2 border-zinc-200 object-cover"
                />
                <div>
                  <p className="text-xl font-bold text-zinc-900">Logan Haase</p>
                  <p className="mt-1 text-base leading-snug text-zinc-600">
                    Software Engineer · Founder of StudentList
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">University of Colorado Boulder</p>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/logan-haase-8a15a1280/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full rounded-full border-2 border-[#0a66c2] py-3 text-center text-base font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2]/10"
              >
                View profile
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="min-w-0 space-y-10 rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-400 md:p-10 xl:p-12 xl:min-h-[680px]">
            {/* Activity */}
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900">Activity</h3>
              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-zinc-600">
                Check out my latest projects and contributions on GitHub. I&apos;m actively working on
                backend systems, SaaS platforms, and open-source engineering tools.
              </p>
              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-zinc-600">
                My coding activity spans {user?.public_repos ?? githubConfig.featuredRepos.length} public repositories across
                various technologies and domains — from full-stack web apps to low-level systems programming.
              </p>
            </div>

            {/* Contribution Statistics */}
            <div>
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900">Contribution Statistics</h3>

              {/* Month labels */}
              <div ref={heatmapContainerRef} className="w-full">
                <div>
                  {/* Month label row */}
                  <div className="relative mb-2 flex" style={{ paddingLeft: `${weekdayLabelWidth}px` }}>
                    {monthLabels.map(({ label, col }) => (
                      <div
                        key={`${label}-${col}`}
                        className="absolute text-sm text-zinc-500"
                        style={{ left: `${weekdayLabelWidth + col * (heatmapCellSize + heatmapGap)}px` }}
                      >
                        {label}
                      </div>
                    ))}
                    <div className="h-5" />
                  </div>

                  {/* Grid rows: 7 weekdays */}
                  <div className="flex" style={{ gap: `${heatmapGap}px` }}>
                    {/* Weekday labels */}
                    {showWeekdayLabels && (
                      <div className="flex flex-col pr-1 text-right" style={{ width: `${weekdayLabelWidth}px`, gap: `${heatmapGap}px` }}>
                        {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                          <div
                            key={i}
                            className="text-[10px] leading-none text-zinc-400"
                            style={{ height: `${heatmapCellSize}px` }}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Week columns */}
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col" style={{ gap: `${heatmapGap}px` }}>
                        {week.map((day, di) =>
                          day ? (
                            <div
                              key={di}
                              title={`${day.count} contributions on ${day.date}`}
                              className={`rounded-[3px] ${getColor(day.level)}`}
                              style={{ height: `${heatmapCellSize}px`, width: `${heatmapCellSize}px` }}
                            />
                          ) : (
                            <div key={di} style={{ height: `${heatmapCellSize}px`, width: `${heatmapCellSize}px` }} />
                          )
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <span className="text-sm text-zinc-400">Less</span>
                    {[0, 1, 2, 3, 4].map((l) => (
                      <div
                        key={l}
                        className={`rounded-[3px] ${getColor(l)}`}
                        style={{ height: `${heatmapCellSize}px`, width: `${heatmapCellSize}px` }}
                      />
                    ))}
                    <span className="text-sm text-zinc-400">More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 sm:gap-5">
              <a
                href={`https://github.com/${githubConfig.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-700 sm:gap-3 sm:px-10 sm:py-5 sm:text-xl"
              >
                <FaGithub className="text-xl sm:text-2xl" />
                View My GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/logan-haase-8a15a1280/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-[#0a66c2] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0854a0] sm:gap-3 sm:px-10 sm:py-5 sm:text-xl"
              >
                <FaLinkedin className="text-2xl" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
            </div>

            <div className="mt-16">
          {reposSectionVisible ? (
            <div className="scroll-rise-in">
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  Featured Repositories
                </h3>
              </div>

              {reposLoading ? (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {githubConfig.featuredRepos.map((repoName) => (
                    <div
                      key={repoName}
                      className="rounded-2xl border-l-4 border-l-teal-700 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                    >
                      <div className="animate-pulse space-y-4">
                        <div className="h-6 w-2/3 rounded bg-zinc-200" />
                        <div className="h-4 w-full rounded bg-zinc-100" />
                        <div className="h-4 w-3/4 rounded bg-zinc-100" />
                        <div className="h-10 w-28 rounded-full bg-zinc-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : featuredRepos.length === 0 ? (
                <div className="rounded-2xl border border-zinc-200 bg-white p-7 text-zinc-700 shadow-sm">
                  <p className="text-base leading-relaxed">
                    Featured repository metadata is temporarily unavailable from GitHub right now.
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    You can still view the selected repositories directly:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {githubConfig.featuredRepos.map((repoName) => (
                      <a
                        key={repoName}
                        href={`https://github.com/${githubConfig.username}/${repoName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-teal-600 px-3 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
                      >
                        {repoName}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {featuredRepos.map((repo, idx) => (
                    <article
                      key={repo.id}
                      className="scroll-rise-in group flex min-h-[205px] h-full flex-col rounded-2xl border-l-4 border-l-teal-700 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-2 hover:ring-teal-400"
                      style={{ animationDelay: `${idx * 90}ms` }}
                    >
                      <div>
                        <h4 className="text-[1.15rem] font-medium tracking-tight text-teal-700 sm:text-[1.35rem]">
                          {repo.name}
                        </h4>
                        <p className="mt-2 min-h-[3.5rem] max-w-[34ch] text-[0.95rem] leading-8 text-zinc-600 sm:text-[1rem]">
                          {repo.description ?? "No description"}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        {repo.language && (
                          <span className="rounded-lg border border-teal-300 bg-[#d9f1eb] px-3 py-1 text-sm font-semibold text-teal-700">
                            {repo.language}
                          </span>
                        )}
                        <span>Updated {formatRepoDate(repo.updated_at)}</span>
                      </div>

                      <div className="mt-5 flex items-center gap-5 text-sm text-zinc-600">
                        <span className="inline-flex items-center gap-2">
                          <FaRegStar className="text-zinc-500" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <FaCodeBranch className="text-zinc-500" />
                          {repo.forks_count}
                        </span>
                      </div>

                      <div className="mt-auto flex justify-end pt-5">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-teal-600 px-4 py-2.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
                        >
                          View Repo
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="h-12 w-80 max-w-full rounded-lg bg-zinc-300/70" />
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-[205px] animate-pulse rounded-2xl border border-zinc-300 bg-white/60" />
                ))}
              </div>
            </div>
          )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="mx-auto h-12 w-80 max-w-full animate-pulse rounded-xl bg-zinc-300/80" />
            <div className="mx-auto h-[3px] w-full max-w-[1400px] bg-teal-600/50" />
            <div className="grid gap-8 lg:grid-cols-[500px_minmax(0,1fr)]">
              <div className="h-[640px] animate-pulse rounded-[28px] border border-zinc-300 bg-white/60" />
              <div className="h-[640px] animate-pulse rounded-[28px] border border-zinc-300 bg-white/60" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function formatRepoDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
