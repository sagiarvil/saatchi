import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' KALDIRILDI -> OpenNext SSR ve Cloudflare Image Optimization desteği için.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.chrono24.com',
      },
    ],
  },
};

export default nextConfig;

// if (process.env.NODE_ENV === 'development') {
//   import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
// }
