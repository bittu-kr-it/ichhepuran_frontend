import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/lib/ipv4Fetch";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getSiteSettings } from "@/lib/api";
import { getSiteUrl } from "@/lib/siteUrl";

// Self-hosted variable fonts (SIL Open Font License — see src/fonts/OFL-*.txt).
// Self-hosting avoids a Google Fonts request at build/runtime entirely.
const fraunces = localFont({
  src: "../fonts/Fraunces-Variable.ttf",
  variable: "--font-fraunces",
  weight: "300 900",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// `title.template` lets each page set just its own short title (e.g. "About")
// and have "| Ichhe Puran" appended automatically — `default` is used for
// Home, which doesn't override title/description (its own copy already
// matches this closely). See src/app/about/page.tsx etc. for the pattern.
// metadataBase lets every page's `alternates.canonical` (see lib/seo.ts) be
// just a relative path ("/", "/about") — Next resolves the absolute
// canonical URL from this automatically, which is what "auto-generated on
// the frontend" means in practice: no canonical URL is ever stored in the CMS.
//
// generateMetadata (not a static object) so the favicon can follow the logo
// uploaded in the CMS (SiteSettings → Branding). getSiteSettings() is deduped
// by Next's fetch cache — calling it here and in RootLayout is one request.
// Falls back to the bundled app/favicon.ico when no logo is set.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: getSiteUrl(),
    title: {
      template: "%s | Ichhe Puran",
      default: "Ichhe Puran | Restoring Earth, Empowering Communities",
    },
    description:
      "Ichhe Puran restores ecosystems and empowers coastal and rural communities across eastern India through reforestation, water conservation, and education.",
    icons: settings.orgLogo
      ? {
          icon: [{ url: settings.orgLogo }],
          shortcut: [{ url: settings.orgLogo }],
          apple: [{ url: settings.orgLogo }],
        }
      : undefined,
  };
}

// Navbar and Footer are genuinely global chrome — fetched once here rather
// than duplicated in every page.tsx (each of which used to fetch the same
// settings and render the same two components independently).
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <Navbar settings={settings} />
        {children}
        <Footer settings={settings} />
        <FloatingActions settings={settings} />
      </body>
    </html>
  );
}
