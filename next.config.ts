import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const mediaOrigin = apiUrl ? new URL(apiUrl) : undefined;

const nextConfig: NextConfig = {
  output: "export", // <-- Static HTML export generate karne ke liye

  experimental: {
    // The backend runs on shared hosting with a small PHP-FPM pool. The
    // default worker count (cpus - 1) fires enough concurrent build-time
    // fetches to overwhelm it and get transient 500s. A low, fixed number
    // keeps this build gentle on it regardless of the machine it runs on.
    cpus: 2,
  },

  images: {
    unoptimized: true, // <-- Static export ke liye zaroori
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(mediaOrigin
        ? [
          {
            protocol: mediaOrigin.protocol.replace(":", "") as "http" | "https",
            hostname: mediaOrigin.hostname,
            port: mediaOrigin.port,
            pathname: "/storage/**",
          },
        ]
        : []),
    ],
  },
};

export default nextConfig;