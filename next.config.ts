import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // This enables React's Strict Mode
  swcMinify: true,        // Enabling SWC-based minification (for faster builds)
};

export default nextConfig;
