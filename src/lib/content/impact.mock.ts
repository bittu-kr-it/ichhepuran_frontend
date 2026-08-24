import type { CarbonStat, CsrFeature, CsrPartner, ImpactHeroContent, SdgAlignment } from "../types";

// Mirrors backend/database/seeders/ImpactPageSeeder.php exactly — see that
// file's docblock for why the timeline/testimonials sections reuse
// About's/Home's existing content instead of new mock data here, and why
// the SDG-6 water figure says "10M+ Liters Recharged" not "4.5M litres".

export const impactHeroMock: ImpactHeroContent = {
  headline: "Measuring What Matters",
  subheading:
    "From verified SDG contributions to transparent carbon reporting, every number on this page traces back to a real project on the ground.",
};

export const sdgAlignmentsMock: SdgAlignment[] = [
  { id: "1", sdgNumber: 2, goalName: "Zero Hunger", contributionText: "Food distribution, agroforestry, lassi drive, nutrition support for 3,000+ beneficiaries.", order: 1 },
  { id: "2", sdgNumber: 3, goalName: "Good Health & Well-being", contributionText: "Medical camps, mosquito nets, raincoat drives, health awareness sessions.", order: 2 },
  { id: "3", sdgNumber: 4, goalName: "Quality Education", contributionText: "Kriti Pathshala for migrant children, school plantation partnerships.", order: 3 },
  { id: "4", sdgNumber: 6, goalName: "Clean Water & Sanitation", contributionText: "Project Amrit Kund — 50+ Lakes Restored, 10M+ Liters Recharged; pond restoration in Saheban Bagicha.", order: 4 },
  { id: "5", sdgNumber: 10, goalName: "Reduced Inequalities", contributionText: "Khushir Pujo for 1,455+ marginalised children, welfare support for outdoor workers.", order: 5 },
  { id: "6", sdgNumber: 13, goalName: "Climate Action", contributionText: "14,000+ trees planted, Miyawaki forests, mangrove restoration.", order: 6 },
  { id: "7", sdgNumber: 14, goalName: "Life Below Water", contributionText: "Pond restoration.", order: 7 },
  { id: "8", sdgNumber: 15, goalName: "Life on Land", contributionText: "Agroforestry, mangrove restoration, Miyawaki forests, biodiversity enhancement.", order: 8 },
  { id: "9", sdgNumber: 17, goalName: "Partnerships for the Goals", contributionText: "Manpower, consultation, collaboration, and expertise.", order: 9 },
];

export const csrFeaturesMock: CsrFeature[] = [
  { id: "1", title: "100% Transparency", description: "Blockchain-backed tree tracking for every corporate donation", icon: "ShieldCheck", order: 1 },
  { id: "2", title: "Real-time Dashboard", description: "Custom impact portals for partners to track carbon sequestration", icon: "LayoutDashboard", order: 2 },
  { id: "3", title: "Eco-Audit Reports", description: "Quarterly scientific reports detailing biodiversity net gain", icon: "FileCheck2", order: 3 },
];

// Intentionally empty — no real CSR partner names/logos have been
// confirmed by the client yet. See ImpactPageSeeder's docblock.
export const csrPartnersMock: CsrPartner[] = [];

export const carbonStatsMock: CarbonStat[] = [
  { id: "1", year: "2022", tons: 420, isProjected: false, order: 1 },
  { id: "2", year: "2023", tons: 1150, isProjected: false, order: 2 },
  { id: "3", year: "2024", tons: 2800, isProjected: true, order: 3 },
];
