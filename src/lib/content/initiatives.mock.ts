import type { Category, Initiative, InitiativesHeroContent } from "../types";

// Matches the real content seeded via backend/database/seeders/InitiativesPageSeeder.php
// (see docs/raw-site-content.md). See lib/api.ts for the mock/live API switch.

export const initiativesHeroMock: InitiativesHeroContent = {
  headline: "Nurturing Nature, Empowering Lives",
  subheading:
    "At Ichhe Puran, we translate philanthropic vision into tangible environmental and social impact through carefully structured initiatives.",
};

export const categoriesMock: Category[] = [
  { slug: "environment", name: "Environment", color: "forest", order: 1 },
  { slug: "water", name: "Water", color: "sage", order: 2 },
  { slug: "community", name: "Community", color: "mustard", order: 3 },
];

const [environment, water, community] = categoriesMock;

export const initiativesMock: Initiative[] = [
  {
    id: "tree-plantation",
    title: "Tree Plantation",
    category: environment,
    summary: "Restoring biodiversity by planting native species across degraded forest lands and urban centers.",
    body: "Restoring ecological balance by planting native species across degraded landscapes. Our systematic approach ensures a 95% survival rate through community-led maintenance.",
    image: "/images/pillar-tree-plantation.jpg",
    imageAlt: "Volunteers planting young saplings in a degraded forest clearing.",
    icon: "TreePine",
    order: 1,
  },
  {
    id: "urban-miyawaki",
    title: "Urban Miyawaki",
    category: environment,
    summary: "Creating dense, native urban forests that grow 10x faster and are 30x more dense than traditional plantations.",
    body: "Creating dense, native urban forests that grow 10x faster and are 30x more dense than traditional plantations. Perfect for revitalizing city micro-climates.",
    image: null,
    imageAlt: "A dense Miyawaki-method urban forest plot in a city.",
    icon: "TreePine",
    order: 4,
  },
  {
    id: "agroforestry",
    title: "Agroforestry",
    category: environment,
    summary: "Integrating trees into farming systems to boost biodiversity and improve soil health.",
    body: "Integrating trees into farming systems to boost biodiversity, improve soil health, and provide sustainable alternative incomes for rural farmers. This initiative creates a resilient ecosystem where agriculture and nature thrive together.",
    image: null,
    imageAlt: "Farmland with rows of trees interplanted among crops.",
    icon: "Sprout",
    order: 5,
  },
  {
    id: "water-restoration",
    title: "Water Restoration",
    category: water,
    summary: "Desilting ponds, harvesting rainwater, and ensuring sustainable clean water access for remote villages.",
    body: "Water is the lifeblood of our planet. Through Project Amrit Kund, we focus on the scientific restoration of traditional water bodies, desilting, and groundwater recharge. So far: 50+ Lakes Restored, 10M+ Liters Recharged.",
    image: null,
    icon: "Droplets",
    order: 2,
  },
  {
    id: "holistic-education",
    title: "Holistic Education",
    category: community,
    summary: "Providing modern curriculum, digital literacy, and life skills training to bridge the urban-rural divide.",
    body: null,
    image: null,
    icon: "BookOpen",
    order: 3,
  },
  {
    id: "child-education",
    title: "Child Education",
    category: community,
    summary: "Equipping the next generation with knowledge and ecological consciousness.",
    body: null,
    image: "/images/initiatives-child-education.jpg",
    icon: "BookOpen",
    order: 6,
  },
  {
    id: "health-camps",
    title: "Health Camps",
    category: community,
    summary: "Bringing specialized medical care and preventive health awareness to rural doorsteps.",
    body: null,
    image: "/images/initiatives-health-camps.jpg",
    icon: "HeartPulse",
    order: 7,
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief",
    category: community,
    summary: "Rapid response and long-term rehabilitation support for communities facing crises.",
    body: null,
    image: "/images/initiatives-disaster-relief.jpg",
    icon: "LifeBuoy",
    order: 8,
  },
  {
    id: "farmer-growth",
    title: "Farmer Growth",
    category: community,
    summary: "Empowering farmers with modern sustainable techniques and market linkages.",
    body: null,
    image: "/images/initiatives-farmer-growth.jpg",
    icon: "Wheat",
    order: 9,
  },
];
