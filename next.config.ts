import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const mediaOrigin = apiUrl ? new URL(apiUrl) : undefined;

const nextConfig: NextConfig = {
  // No `output: "export"` — this only mattered while the frontend was also
  // hosted on Hostinger (plain static files only). Now that ichhepuran.com
  // points at Vercel, running as a normal Next.js server means every
  // `fetch(..., { next: { revalidate: 60 } })` call across the app actually
  // does what it already says: admin panel edits show up within ~60s with
  // no rebuild, instead of being frozen into whatever HTML the last build
  // produced.

  experimental: {
    // The backend runs on shared hosting with a small PHP-FPM pool and a
    // permanently high load average. The default worker count (cpus - 1)
    // fires enough concurrent build-time fetches to overwhelm it and get
    // transient 500s. 1 keeps this build fully sequential and as gentle
    // on it as possible, regardless of the machine it runs on.
    cpus: 1,
  },

  images: {
    unoptimized: true, // Media already comes pre-sized from the CMS; skip Vercel's image optimization pipeline
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