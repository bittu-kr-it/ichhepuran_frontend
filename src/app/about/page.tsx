import AboutHero from "@/components/AboutHero";
import OriginStory from "@/components/OriginStory";
import GeographicReachSection from "@/components/GeographicReachSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import TeamGrid from "@/components/TeamGrid";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import CtaBand from "@/components/CtaBand";
import {
  getAboutHero,
  getAboutIntro,
  getAboutMilestones,
  getCta,
  getGeographicReach,
  getSectionHeading,
  getTeamMembers,
  getTrustBadges,
} from "@/lib/api";

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
    badges,
    badgesHeading,
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
    getTrustBadges(),
    getSectionHeading("trust-badges"),
    getCta(),
  ]);

  return (
    <main>
      <AboutHero content={hero} />
      <OriginStory content={intro} />
      <GeographicReachSection items={reach} heading={reachHeading} />
      <JourneyTimeline items={milestones} heading={milestonesHeading} />
      <TeamGrid members={team} heading={teamHeading} />
      <TrustBadgesSection badges={badges} heading={badgesHeading} />
      <CtaBand content={cta} />
    </main>
  );
}
