import type { Category, CtaContent, HeroContent, ImpactStat, Pillar, SectionHeading, SiteSettings, Testimonial } from "../types";

const environmentCategory: Category = { slug: "environment", name: "Environment", color: "forest", order: 1 };
const waterCategory: Category = { slug: "water", name: "Water", color: "sage", order: 2 };
const communityCategory: Category = { slug: "community", name: "Community", color: "mustard", order: 3 };

// This mock data exists ONLY so the frontend can be built and previewed
// before the Laravel CMS API is live. Every value here maps 1:1 to a field
// an admin will edit in Filament. See lib/api.ts for how this gets swapped
// out for real API calls once NEXT_PUBLIC_API_URL is set.

export const siteSettingsMock: SiteSettings = {
  orgName: "Ichhe Puran",
  tagline:
    "Nurturing nature, restoring ecosystems, and empowering communities through transparent philanthropy.",
  phone: "+91 98300 12345",
  email: "info@ichhepuran.org",
  address: "12/A Green Avenue, Salt Lake City, Sector 5, Kolkata, West Bengal - 700091",
  socialLinks: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Initiatives", href: "/initiatives" },
    { label: "Impact", href: "/impact" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  donateHref: "/get-involved#donate",
};

export const heroMock: HeroContent = {
  eyebrow: "Reforestation · Water · Education",
  headline: "Restoring Earth,\nEmpowering Communities",
  subheading:
    "A philanthropic endeavor dedicated to reforestation, water conservation, and quality education for underserved children across eastern India.",
  primaryCtaLabel: "Donate Now",
  primaryCtaHref: "/get-involved#donate",
  secondaryCtaLabel: "Our Mission",
  secondaryCtaHref: "/about",
  backgroundImage: "/images/hero-placeholder.jpg",
  backgroundImageAlt: "Volunteers planting saplings in a restored coastal forest at sunrise.",
};

export const impactStatsMock: ImpactStat[] = [
  { id: "trees", label: "Trees Planted", value: 14000, suffix: "+", icon: "TreePine", order: 1 },
  { id: "saplings", label: "Saplings Distributed", value: 5000, suffix: "+", icon: "Sprout", order: 2 },
  { id: "co2", label: "Metric Ton CO2 / year", value: 420, icon: "Cloud", order: 3 },
  { id: "oxygen", label: "Million Kg Oxygen / yr", value: 3, icon: "Wind", order: 4 },
  { id: "water", label: "Million Litres Water Restored", value: 10, icon: "Droplets", order: 5 },
  { id: "beneficiaries", label: "Total Beneficiaries Impacted", value: 12000, suffix: "+", icon: "Users", order: 6 },
];

export const pillarsMock: Pillar[] = [
  {
    id: "tree-plantation",
    title: "Tree Plantation",
    category: environmentCategory,
    summary:
      "Restoring biodiversity by planting native species across degraded forest lands and urban centers.",
    image: "/images/pillar-tree-plantation.jpg",
    imageAlt: "Volunteers planting young saplings in a degraded forest clearing.",
    icon: "TreePine",
    order: 1,
  },
  {
    id: "water-restoration",
    title: "Water Restoration",
    category: waterCategory,
    summary:
      "Desilting ponds, harvesting rainwater, and ensuring sustainable clean water access for remote villages.",
    image: "/images/pillar-water-restoration.jpg",
    imageAlt: "A restored village pond used for clean water access.",
    icon: "Droplets",
    order: 2,
  },
  {
    id: "holistic-education",
    title: "Holistic Education",
    category: communityCategory,
    summary:
      "Providing modern curriculum, digital literacy, and life skills training to bridge the urban-rural divide.",
    image: "/images/pillar-education.jpg",
    imageAlt: "Children in a rural classroom during a digital literacy session.",
    icon: "BookOpen",
    order: 3,
  },
];

export const testimonialsMock: Testimonial[] = [
  {
    id: "saraswati-devi",
    quote:
      "The water restoration project changed everything for our village. We no longer walk 5 miles for water, and our children spend that time in the new school Ichhe Puran built.",
    name: "Saraswati Devi",
    role: "Community Leader, West Bengal",
    photoAlt: "Portrait of Saraswati Devi, Community Leader in West Bengal.",
    order: 1,
  },
  {
    id: "rahul-mondal",
    quote:
      "I want to be an environmental engineer. The scholarship and the digital classes helped me dream beyond my small village. Now I know I can make a difference.",
    name: "Rahul Mondal",
    role: "Scholarship Recipient",
    photoAlt: "Portrait of Rahul Mondal, scholarship recipient.",
    order: 2,
  },
];

export const ctaMock: CtaContent = {
  heading: "Join the Movement for a Greener Planet",
  subheading:
    "Your contribution directly funds the planting of saplings, the education of children, and the restoration of our precious ecosystems. Every wish matters.",
  primaryCtaLabel: "Donate Now",
  primaryCtaHref: "/get-involved#donate",
  secondaryCtaLabel: "Volunteer",
  secondaryCtaHref: "/get-involved#volunteer",
};

// Keyed by every section-heading key used across the site, not just Home's
// own — getSectionHeading() reads this one map regardless of which page's
// key is requested. geographic-reach/about-milestones/team/trust-badges
// were previously missing here (a latent gap, unnoticed since About was
// only ever verified against the live API, not mock mode) — filled in
// alongside the 4 new Impact-page keys below.
export const sectionHeadingsMock: Record<string, SectionHeading> = {
  pillars: { eyebrow: "What we do", heading: "Our Core Pillars" },
  testimonials: {
    eyebrow: "Voices of impact",
    heading: "Real stories from the communities we serve",
  },
  "geographic-reach": { eyebrow: "Where we work", heading: "Our Geographic Reach" },
  "about-milestones": { eyebrow: "Our journey", heading: "Milestones of Impact" },
  team: { eyebrow: "The people behind it", heading: "Meet Our Team" },
  "trust-badges": { eyebrow: "Transparency & trust", heading: "Certified & Accountable" },
  "impact-milestones": { eyebrow: "Our journey", heading: "Journey of Impact" },
  "impact-testimonials": { eyebrow: "Voices of impact", heading: "Faces of Impact" },
  "sdg-alignment": {
    eyebrow: "Global commitments",
    heading: "Aligned with the UN Sustainable Development Goals",
  },
  "csr-synergy": { eyebrow: "Partner with purpose", heading: "Corporate Social Synergy" },
  "donation-methods": { eyebrow: "Ways to give", heading: "Choose How to Give" },
  volunteer: { eyebrow: "Give your time", heading: "Volunteer With Us" },
  "csr-partnership": { eyebrow: "Partner with purpose", heading: "CSR & Corporate Partnerships" },
};
