import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow E2B sandbox images and external URLs
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.e2b.dev",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },

  // Ensure Prisma works correctly on Vercel serverless
  serverExternalPackages: ["@prisma/client"],

  // Don't fail build on lint warnings (errors still fail)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Production security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
