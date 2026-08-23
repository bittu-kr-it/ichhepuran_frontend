import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import CorePillars from "@/components/CorePillars";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import {
  getCta,
  getHero,
  getImpactStats,
  getPillars,
  getSectionHeading,
  getSiteSettings,
  getTestimonials,
} from "@/lib/api";

// Server component — fetches from the Laravel CMS API at request/build time
// once NEXT_PUBLIC_API_URL is configured (see src/lib/api.ts). Nothing on
// this page is hardcoded; it all flows through the content model.
// Each section is its own endpoint, fetched in parallel — see lib/api.ts for
// why (reuse across pages, independent caching), rather than one combined
// /home payload.
export default async function Home() {
  const [
    settings,
    hero,
    impactStats,
    pillars,
    pillarsHeading,
    testimonials,
    testimonialsHeading,
    cta,
  ] = await Promise.all([
    getSiteSettings(),
    getHero(),
    getImpactStats(),
    getPillars(),
    getSectionHeading("pillars"),
    getTestimonials(),
    getSectionHeading("testimonials"),
    getCta(),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <Hero content={hero} />
        <ImpactStats stats={impactStats} />
        <CorePillars pillars={pillars} heading={pillarsHeading} />
        <Testimonials items={testimonials} heading={testimonialsHeading} />
        <CtaBand content={cta} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
