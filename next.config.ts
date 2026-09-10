import type { NextConfig } from "next";

// Derived from the same NEXT_PUBLIC_API_URL used everywhere else (see
// lib/api.ts) rather than a separate env var — the Laravel backend serves
// both the API and its media disk from one host, so there's only ever one
// media host to allow-list, and it changes automatically with the API URL
// across dev/staging/prod.
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const mediaOrigin = apiUrl ? new URL(apiUrl) : undefined;

const nextConfig: NextConfig = {
  images: {
    // Laravel serves media from localhost during local development. Next.js
    // blocks optimized requests to private IPs by default to reduce SSRF risk.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    // Partner logos (PartnersSection) are frequently SVG. These are uploaded
    // only by trusted admins through the CMS, and next/image is told to
    // serve them with a locked-down CSP + as an attachment, which is the
    // documented mitigation for the script-in-SVG risk.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: mediaOrigin
      ? [
          {
            protocol: mediaOrigin.protocol.replace(":", "") as "http" | "https",
            hostname: mediaOrigin.hostname,
            port: mediaOrigin.port,
            pathname: "/storage/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
