import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // Ignore les erreurs de build TypeScript
  },
  /* Autres options de configuration ici */
};

export default nextConfig;
