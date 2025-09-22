"use client";
import React, { useEffect, useState } from "react";
import { githubConfig } from "@/data";

interface GitHubUser {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
  topics: string[];
}

interface LanguageStats {
  [key: string]: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${githubConfig.username}`);
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${githubConfig.username}/repos?sort=updated&per_page=100`);
      const reposData = await reposResponse.json();
      setRepos(reposData);

      // Calculate total stars and forks
      const stars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
      const forks = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.forks_count, 0);
      setTotalStars(stars);
      setTotalForks(forks);

      // Calculate language statistics
      const langStats: LanguageStats = {};
      reposData.forEach((repo: GitHubRepo) => {
        if (repo.language) {
          langStats[repo.language] = (langStats[repo.language] || 0) + 1;
        }
      });
      setLanguages(langStats);

      // Generate mock contribution data (GitHub's API requires auth for real contribution data)
      generateMockContributions();

    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockContributions = () => {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    
    // Generate last 365 days
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock contribution count (you could replace this with real data)
      const count = Math.floor(Math.random() * 10);
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    setContributions(contributions);
  };

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-gray-800", // 0 contributions
      "bg-green-900", // 1-2 contributions
      "bg-green-700", // 3-5 contributions
      "bg-green-500", // 6-8 contributions
      "bg-green-300"  // 9+ contributions
    ];
    return colors[level] || colors[0];
  };

  const getTopLanguages = () => {
    return Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6);
  };

  const languageColors: { [key: string]: string } = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-600",
    Python: "bg-green-500",
    Java: "bg-orange-500",
    "C++": "bg-blue-500",
    C: "bg-gray-600",
    HTML: "bg-orange-600",
    CSS: "bg-blue-400",
    Shell: "bg-gray-500",
    Dockerfile: "bg-blue-700"
  };

  if (loading) {
    return (
      <div className="py-20 px-4" id="github">
        <h1 className="heading mb-16">
          My <span className="text-purple">GitHub Activity</span>
        </h1>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-gray-800 rounded-xl"></div>
            <div className="h-64 bg-gray-800 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-48 bg-gray-800 rounded-xl"></div>
              <div className="h-48 bg-gray-800 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4" id="github">
      <h1 className="heading mb-16">
        My <span className="text-purple">GitHub Activity</span>
      </h1>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Profile Card */}
        {user && (
          <div className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-24 h-24 rounded-full border-2 border-purple"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                <p className="text-gray-300 mb-4">{user.bio}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple">{user.public_repos}</div>
                    <div className="text-gray-400 text-sm">Repositories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple">{totalStars}</div>
                    <div className="text-gray-400 text-sm">Stars Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple">{totalForks}</div>
                    <div className="text-gray-400 text-sm">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple">{user.followers}</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contribution Graph */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6">Contribution Activity</h3>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="grid grid-cols-53 gap-1 mb-4">
                {contributions.map((day, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} tooltip`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Languages */}
          <div className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Top Languages</h3>
            <div className="space-y-4">
              {getTopLanguages().map(([language, count]) => {
                const percentage = (count / Object.values(languages).reduce((a, b) => a + b, 0)) * 100;
                return (
                  <div key={language} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${languageColors[language] || 'bg-gray-500'}`} />
                        <span className="text-white font-medium">{language}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{count} repos</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${languageColors[language] || 'bg-gray-500'} transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Repositories */}
          <div className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Featured Repositories</h3>
            <div className="space-y-4">
              {repos
                .filter(repo => githubConfig.featuredRepos.includes(repo.name))
                .slice(0, 4)
                .map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-black/30 rounded-lg border border-white/5 hover:border-purple/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-purple">{repo.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>⭐ {repo.stargazers_count}</span>
                        <span>🍴 {repo.forks_count}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`} />
                        <span className="text-gray-400 text-xs">{repo.language}</span>
                      </div>
                    )}
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* GitHub Link */}
        <div className="text-center">
          <a
            href={`https://github.com/${githubConfig.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple hover:bg-purple/80 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;