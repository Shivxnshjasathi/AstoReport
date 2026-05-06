import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@node-jhora/core', '@node-jhora/prediction'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
