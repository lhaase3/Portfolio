import type { NextConfig } from 'next'

const repo = 'Portfolio'
const isGithubPagesBuild = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github-pages'
const basePath = isGithubPagesBuild ? `/${repo}` : ''

const nextConfig: NextConfig = {
  ...(isGithubPagesBuild
    ? {
        output: 'export',
        distDir: 'docs',
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
  basePath,
  images: {
    unoptimized: isGithubPagesBuild,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
