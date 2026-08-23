// Types mirror the CMS content model defined in the project's planning doc
// (Section 7 — CMS Content Model). Every field here is meant to come from
// the Laravel admin panel at runtime — nothing on the frontend should be
// hardcoded once the real API is wired up.

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: { label: string; href: string }[];
  navLinks: NavLink[];
  donateHref: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backgroundImage: string; // media library asset URL once real photography exists
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string; // e.g. "+"
  icon: string; // lucide-react icon name
  order: number;
}

export type PillarCategory = "environment" | "water" | "community";

export interface Pillar {
  id: string;
  title: string;
  category: PillarCategory;
  summary: string;
  image: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo?: string;
  order: number;
}

export interface HomePageContent {
  hero: HeroContent;
  impactStats: ImpactStat[];
  pillars: Pillar[];
  testimonials: Testimonial[];
}
