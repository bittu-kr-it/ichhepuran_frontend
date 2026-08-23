import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import CorePillars from "@/components/CorePillars";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { getHomePageContent, getSiteSettings } from "@/lib/api";

// Server component — fetches from the Laravel CMS API at request/build time
// once NEXT_PUBLIC_API_URL is configured (see src/lib/api.ts). Nothing on
// this page is hardcoded; it all flows through the content model.
export default async function Home() {
  const [settings, content] = await Promise.all([
    getSiteSettings(),
    getHomePageContent(),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <Hero content={content.hero} />
        <ImpactStats stats={content.impactStats} />
        <CorePillars pillars={content.pillars} />
        <Testimonials items={content.testimonials} />
        <CtaBand />
      </main>
      <Footer settings={settings} />
    </>
  );
}
