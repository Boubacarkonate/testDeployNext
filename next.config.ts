import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs TypeScript pendant le build
  },
};

export default nextConfig;
