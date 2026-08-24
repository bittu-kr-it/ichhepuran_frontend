import type { Metadata } from "next";
import ImpactHero from "@/components/ImpactHero";
import ImpactStats from "@/components/ImpactStats";
import JourneyTimeline from "@/components/JourneyTimeline";
import Testimonials from "@/components/Testimonials";
import SdgAlignmentSection from "@/components/SdgAlignmentSection";
import CsrSynergySection from "@/components/CsrSynergySection";
import CtaBand from "@/components/CtaBand";
import {
  getAboutMilestones,
  getCarbonStats,
  getCsrFeatures,
  getCsrPartners,
  getCta,
  getImpactHero,
  getImpactStats,
  getSdgAlignments,
  getSectionHeading,
  getSeoSetting,
  getTestimonials,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// Merged with any admin override set on the Impact page's "SEO Settings"
// screen — see lib/seo.ts.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, hero] = await Promise.all([getSeoSetting("impact"), getImpactHero()]);
  return buildPageMetadata({
    seo,
    path: "/impact",
    fallbackTitle: hero.headline,
    fallbackDescription: hero.subheading,
  });
}

// Server component, same section-wise fetch pattern as Home/About/
// Initiatives — see src/lib/api.ts. The "Journey of Impact" timeline and
// "Faces of Impact" testimonials deliberately reuse About's/Home's real
// content (AboutMilestone, Testimonial) rather than new data — see
// backend/database/seeders/ImpactPageSeeder.php's docblock for why. Each
// section still gets its own independently-editable framing copy via a
// dedicated section-heading key (impact-milestones/impact-testimonials).
export default async function Impact() {
  const [
    hero,
    stats,
    milestones,
    milestonesHeading,
    testimonials,
    testimonialsHeading,
    sdgs,
    sdgHeading,
    csrHeading,
    csrFeatures,
    csrPartners,
    carbonStats,
    cta,
  ] = await Promise.all([
    getImpactHero(),
    getImpactStats(),
    getAboutMilestones(),
    getSectionHeading("impact-milestones"),
    getTestimonials(),
    getSectionHeading("impact-testimonials"),
    getSdgAlignments(),
    getSectionHeading("sdg-alignment"),
    getSectionHeading("csr-synergy"),
    getCsrFeatures(),
    getCsrPartners(),
    getCarbonStats(),
    getCta(),
  ]);

  return (
    <main>
      <ImpactHero content={hero} />
      <ImpactStats stats={stats} />
      <JourneyTimeline items={milestones} heading={milestonesHeading} />
      <Testimonials items={testimonials} heading={testimonialsHeading} />
      <SdgAlignmentSection items={sdgs} heading={sdgHeading} />
      <CsrSynergySection
        heading={csrHeading}
        features={csrFeatures}
        partners={csrPartners}
        carbonStats={carbonStats}
      />
      <CtaBand content={cta} />
    </main>
  );
}
