import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/imageLoader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn2.chrono24.com' },
      { protocol: 'https', hostname: 'www.belginkuyumculuk.com' },
      { protocol: 'https', hostname: 'tse1.mm.bing.net' },
    ],
  },
};

export default nextConfig;
