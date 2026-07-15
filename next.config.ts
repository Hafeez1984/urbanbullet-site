import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
