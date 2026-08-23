import type { HomePageContent, SiteSettings } from "../types";

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

export const homeMock: HomePageContent = {
  hero: {
    eyebrow: "Reforestation · Water · Education",
    headline: "Restoring Earth,\nEmpowering Communities",
    subheading:
      "A philanthropic endeavor dedicated to reforestation, water conservation, and quality education for underserved children across eastern India.",
    primaryCtaLabel: "Donate Now",
    primaryCtaHref: "/get-involved#donate",
    secondaryCtaLabel: "Our Mission",
    secondaryCtaHref: "/about",
    backgroundImage: "/images/hero-placeholder.jpg",
  },
  impactStats: [
    { id: "trees", label: "Trees Planted", value: 14000, suffix: "+", icon: "TreePine", order: 1 },
    { id: "saplings", label: "Saplings Distributed", value: 5000, suffix: "+", icon: "Sprout", order: 2 },
    { id: "co2", label: "Metric Ton CO2 / year", value: 420, icon: "Cloud", order: 3 },
    { id: "oxygen", label: "Million Kg Oxygen / yr", value: 3, icon: "Wind", order: 4 },
    { id: "water", label: "Million Litres Water Restored", value: 10, icon: "Droplets", order: 5 },
    { id: "beneficiaries", label: "Total Beneficiaries Impacted", value: 12000, suffix: "+", icon: "Users", order: 6 },
  ],
  pillars: [
    {
      id: "tree-plantation",
      title: "Tree Plantation",
      category: "environment",
      summary:
        "Restoring biodiversity by planting native species across degraded forest lands and urban centers.",
      image: "/images/pillar-tree-plantation.jpg",
      icon: "TreePine",
      order: 1,
    },
    {
      id: "water-restoration",
      title: "Water Restoration",
      category: "water",
      summary:
        "Desilting ponds, harvesting rainwater, and ensuring sustainable clean water access for remote villages.",
      image: "/images/pillar-water-restoration.jpg",
      icon: "Droplets",
      order: 2,
    },
    {
      id: "holistic-education",
      title: "Holistic Education",
      category: "community",
      summary:
        "Providing modern curriculum, digital literacy, and life skills training to bridge the urban-rural divide.",
      image: "/images/pillar-education.jpg",
      icon: "BookOpen",
      order: 3,
    },
  ],
  testimonials: [
    {
      id: "saraswati-devi",
      quote:
        "The water restoration project changed everything for our village. We no longer walk 5 miles for water, and our children spend that time in the new school Ichhe Puran built.",
      name: "Saraswati Devi",
      role: "Community Leader, West Bengal",
      order: 1,
    },
    {
      id: "rahul-mondal",
      quote:
        "I want to be an environmental engineer. The scholarship and the digital classes helped me dream beyond my small village. Now I know I can make a difference.",
      name: "Rahul Mondal",
      role: "Scholarship Recipient",
      order: 2,
    },
  ],
};
