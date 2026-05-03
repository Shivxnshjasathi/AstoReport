import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@node-jhora/core', '@node-jhora/prediction'],
};

export default nextConfig;
