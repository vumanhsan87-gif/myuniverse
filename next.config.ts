import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: '/myuniverse', // 使用自定义域名时注释掉
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '*.bilibili.com',
      },
    ],
  },
};

export default nextConfig;
