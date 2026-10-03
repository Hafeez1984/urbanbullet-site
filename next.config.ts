import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true' || process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  trailingSlash: false,
  ...(isStaticExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
