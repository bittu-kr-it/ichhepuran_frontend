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
  backgroundImageAlt?: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string; // e.g. "+"
  icon: string; // lucide-react icon name
  order: number;
}

/**
 * The category master for Initiatives — admin-managed (add/remove/reorder
 * freely via the admin panel), not a fixed set. `color` is one of a small
 * fixed set of approved design-token keys (see lib/categoryColors.ts),
 * chosen from a dropdown in the admin, not a free color picker.
 */
export interface Category {
  slug: string;
  name: string;
  color: string;
  order: number;
}

export interface Pillar {
  id: string;
  title: string;
  category: Category;
  summary: string;
  image: string;
  imageAlt?: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  order: number;
}

export interface CtaContent {
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface SectionHeading {
  eyebrow: string;
  heading: string;
  image?: string;
  imageAlt?: string;
}

export interface AboutHeroContent {
  headline: string;
  subheading: string;
}

export interface AboutIntroContent {
  originTitle: string;
  originBody: string;
  establishedYear: number;
  vision: string;
  mission: string;
  originImage?: string;
  originImageAlt?: string;
}

export interface GeographicReach {
  id: string;
  state: string;
  region: string;
  description: string;
  order: number;
}

export interface AboutMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  photoAlt?: string;
  order: number;
}

export interface TrustBadge {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface InitiativesHeroContent {
  headline: string;
  subheading: string;
}

/**
 * Admin-editable SEO overrides for a top-level page (one per page, keyed by
 * a fixed set of route keys — see lib/api.ts's getSeoSetting). Every field
 * is optional: the frontend falls back to that page's own content-derived
 * title/description/image whenever an override hasn't been set. Canonical
 * URL is NOT part of this shape — it's generated on the frontend from the
 * page's own route, never admin-editable (see lib/seo.ts).
 */
export interface SeoSetting {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
}

/**
 * Fuller version of Pillar (which is Home's lean 3-featured-item shape) —
 * used by the full Initiatives page listing. Same underlying backend
 * model (Initiative), different API endpoint/shape: adds `body`.
 */
export interface Initiative {
  id: string;
  title: string;
  category: Category;
  summary: string;
  body: string | null;
  image: string | null;
  imageAlt?: string;
  icon: string;
  order: number;
}
