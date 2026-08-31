import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import CorePillars from "@/components/CorePillars";
import Testimonials from "@/components/Testimonials";
import SdgAlignmentSection from "@/components/SdgAlignmentSection";
import CtaBand from "@/components/CtaBand";
import {
  getCta,
  getHeroCarouselSettings,
  getHeroSlides,
  getImpactStats,
  getPillars,
  getSdgAlignments,
  getSectionHeading,
  getSeoSetting,
  getTestimonials,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// No fallbackTitle here — omitting it (unless the admin sets an override in
// SEO Settings) lets the title inherit the root layout's own default rather
// than repeating it, since Home's hero headline has a line break that isn't
// title-shaped. Description/image come from the carousel's first slide (by
// order) — the same slide that renders as the page's one <h1> — not a new
// hardcoded string.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, heroSlides] = await Promise.all([getSeoSetting("home"), getHeroSlides()]);
  const firstSlide = [...heroSlides].sort((a, b) => a.order - b.order)[0];
  return buildPageMetadata({
    seo,
    path: "/",
    fallbackDescription: firstSlide?.subheading ?? "",
    fallbackImage: firstSlide?.backgroundImage,
  });
}

// Server component — fetches from the Laravel CMS API at request/build time
// once NEXT_PUBLIC_API_URL is configured (see src/lib/api.ts). Nothing on
// this page is hardcoded; it all flows through the content model.
// Each section is its own endpoint, fetched in parallel — see lib/api.ts for
// why (reuse across pages, independent caching), rather than one combined
// /home payload. Navbar/Footer live in the root layout, not here.
export default async function Home() {
  const [
    heroSlides,
    heroCarouselSettings,
    impactStats,
    pillars,
    pillarsHeading,
    testimonials,
    testimonialsHeading,
    sdgs,
    sdgHeading,
    cta,
  ] = await Promise.all([
    getHeroSlides(),
    getHeroCarouselSettings(),
    getImpactStats(),
    getPillars(),
    getSectionHeading("pillars"),
    getTestimonials(),
    getSectionHeading("testimonials"),
    getSdgAlignments(),
    getSectionHeading("sdg-alignment"),
    getCta(),
  ]);

  return (
    <main>
      <Hero slides={heroSlides} settings={heroCarouselSettings} />
      <ImpactStats stats={impactStats} />
      <CorePillars pillars={pillars} heading={pillarsHeading} />
      <Testimonials items={testimonials} heading={testimonialsHeading} />
      <SdgAlignmentSection items={sdgs} heading={sdgHeading} />
      <CtaBand content={cta} />
    </main>
  );
}
