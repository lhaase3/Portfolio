// next.config.ts
const isProd = process.env.NODE_ENV === 'production'
const repo = 'Portfolio' // <- repo name

const nextConfig = {
  output: 'export',                 // emit static files
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },    // needed for static export
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/Portfolio' : '' }
}

export default nextConfig
