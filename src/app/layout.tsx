import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/api";

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

export const metadata: Metadata = {
  title: "Ichhe Puran | Restoring Earth, Empowering Communities",
  description:
    "Ichhe Puran restores ecosystems and empowers coastal and rural communities across eastern India through reforestation, water conservation, and education.",
};

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
      </body>
    </html>
  );
}
