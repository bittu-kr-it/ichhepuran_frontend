import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import OriginStory from "@/components/OriginStory";
import GeographicReachSection from "@/components/GeographicReachSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import TeamGrid from "@/components/TeamGrid";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import PartnersSection from "@/components/PartnersSection";
import CtaBand from "@/components/CtaBand";
import {
  getAboutHero,
  getAboutIntro,
  getAboutMilestones,
  getCta,
  getGeographicReach,
  getPartners,
  getSectionHeading,
  getSeoSetting,
  getTeamMembers,
  getTrustBadges,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// Sourced from the same CMS content the page itself renders (getAboutHero()
// is deduped by Next.js's fetch cache — calling it here and in the page
// component doesn't double the request) rather than hardcoded copy, per the
// project's zero-hardcoded-content rule. Merged with any admin override set
// on the About page's "SEO Settings" screen — see lib/seo.ts.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, hero, intro] = await Promise.all([
    getSeoSetting("about"),
    getAboutHero(),
    getAboutIntro(),
  ]);
  return buildPageMetadata({
    seo,
    path: "/about",
    fallbackTitle: hero.headline,
    fallbackDescription: hero.subheading,
    fallbackImage: intro.originImage,
  });
}

// Server component, same section-wise fetch pattern as the Home page — see
// src/lib/api.ts. Nothing on this page is hardcoded. Navbar/Footer live in
// the root layout, not here.
export default async function About() {
  const [
    hero,
    intro,
    reach,
    reachHeading,
    milestones,
    milestonesHeading,
    team,
    teamHeading,
    advisoryBoardHeading,
    badges,
    badgesHeading,
    partners,
    partnersPartnershipHeading,
    partnersImplementedForHeading,
    cta,
  ] = await Promise.all([
    getAboutHero(),
    getAboutIntro(),
    getGeographicReach(),
    getSectionHeading("geographic-reach"),
    getAboutMilestones(),
    getSectionHeading("about-milestones"),
    getTeamMembers(),
    getSectionHeading("team"),
    getSectionHeading("advisory-board"),
    getTrustBadges(),
    getSectionHeading("trust-badges"),
    getPartners(),
    getSectionHeading("partners-partnership"),
    getSectionHeading("partners-implemented-for"),
    getCta(),
  ]);

  return (
    <main>
      <AboutHero content={hero} />
      <OriginStory content={intro} />
      <GeographicReachSection items={reach} heading={reachHeading} />
      <JourneyTimeline items={milestones} heading={milestonesHeading} />
      <TeamGrid members={team.filter((m) => m.group !== "advisory_board")} heading={teamHeading} />
      <TeamGrid
        members={team.filter((m) => m.group === "advisory_board")}
        heading={advisoryBoardHeading}
        background="cream"
      />
      <TrustBadgesSection badges={badges} heading={badgesHeading} />
      <PartnersSection
        partners={partners}
        partnershipHeading={partnersPartnershipHeading}
        implementedForHeading={partnersImplementedForHeading}
      />
      <CtaBand content={cta} />
    </main>
  );
}
