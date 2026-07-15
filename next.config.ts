import type { NextConfig } from "next";

const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  ...(isStatic ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
