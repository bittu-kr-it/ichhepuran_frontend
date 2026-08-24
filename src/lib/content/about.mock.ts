import type {
  AboutHeroContent,
  AboutIntroContent,
  AboutMilestone,
  GeographicReach,
  TeamMember,
  TrustBadge,
} from "../types";

// This mock data exists ONLY so the frontend can be built and previewed
// before the Laravel CMS API is live. Values here match the real content
// migrated from the original site (see docs/raw-site-content.md) that's
// also seeded into the backend via AboutPageSeeder, so mock and live data
// agree on day one. See lib/api.ts for how this gets swapped out for real
// API calls once NEXT_PUBLIC_API_URL is set.

export const aboutHeroMock: AboutHeroContent = {
  headline: "Our Roots in Resilience",
  subheading:
    "Born from the tides of necessity, Ichhe Puran stands as a beacon of sustainable hope for the coastal communities of India.",
};

export const aboutIntroMock: AboutIntroContent = {
  originTitle: "Rising from Cyclone Yaas",
  originBody:
    "In May 2021, Cyclone Yaas devastated the coastlines of West Bengal and Odisha. What began as a spontaneous relief effort by a group of passionate individuals quickly transformed into a lifelong commitment. We witnessed firsthand the fragility of life in the Sundarbans. Ichhe Puran was founded not just to provide immediate aid, but to build lasting bridges toward economic independence and ecological security.",
  establishedYear: 2021,
  vision:
    "To create a world where every community thrives in harmony with a restored environment, where green canopies shelter every home and education is the birthright of every child.",
  mission:
    "To empower vulnerable coastal communities through climate-resilient livelihoods, education, and direct environmental stewardship.",
};

export const geographicReachMock: GeographicReach[] = [
  { id: "1", state: "West Bengal", region: "South 24 Parganas", description: "Primary operational area — cyclone relief, agroforestry, pond restoration, school plantations, Miyawaki forest, medical camps.", order: 1 },
  { id: "2", state: "West Bengal", region: "Purulia", description: "Khushir Pujo events, farmer plant distributions at Dhundikha village.", order: 2 },
  { id: "3", state: "West Bengal", region: "Purba Medinipur", description: "Tree plantation and community outreach.", order: 3 },
  { id: "4", state: "West Bengal", region: "Kolkata", description: "Newtown Miyawaki Forest, KKR Runs to Root (Behala and Dakshineswar), lassi distribution drive.", order: 4 },
  { id: "5", state: "West Bengal", region: "Falta", description: "Sadhan Chandra Mahavidyalaya plantation — 950 trees.", order: 5 },
  { id: "6", state: "West Bengal", region: "Sundarbans", description: "Mangrove restoration — 1,500 trees.", order: 6 },
  { id: "7", state: "Jharkhand", region: "East Singhbhum", description: "Agroforestry and school plantations, Jadugora and Potka blocks.", order: 7 },
  { id: "8", state: "Odisha", region: "Rourkela, Balangir, Kalahandi, Nuapada", description: "Community outreach and plantation drives.", order: 8 },
];

export const aboutMilestonesMock: AboutMilestone[] = [
  { id: "1", year: "2021", title: "Foundation in Crisis", description: "Immediate relief for 10,000+ families during Cyclone Yaas. Official registration of Ichhe Puran.", order: 1 },
  { id: "2", year: "2023", title: "Livelihood Programs", description: "Launched the \"Green Craft\" initiative, providing sustainable jobs to 500+ coastal women.", order: 2 },
  { id: "3", year: "2025", title: "Mangrove Restoration", description: "Achieved the milestone of planting 1 million mangrove saplings along the delta edges.", order: 3 },
];

export const teamMembersMock: TeamMember[] = [
  { id: "1", name: "Gargee Das Mondal", role: "Social Work", order: 1 },
  { id: "2", name: "Netai Mondal", role: "Post Treasurer & Senior Operations Manager", order: 2 },
];

export const trustBadgesMock: TrustBadge[] = [
  { id: "1", name: "80G Certified", description: "Tax Exemption Benefits", order: 1 },
  { id: "2", name: "FCRA Registered", description: "International Standards", order: 2 },
  { id: "3", name: "CSR Form 1", description: "Corporate Compliance", order: 3 },
  { id: "4", name: "Platinum Seal", description: "GuideStar Transparency", order: 4 },
];
