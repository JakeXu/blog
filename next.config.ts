import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'build',
  compiler: {
    styledComponents: true
  }
}

export default nextConfig
