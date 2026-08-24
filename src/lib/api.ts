import type {
  AboutHeroContent,
  AboutIntroContent,
  AboutMilestone,
  Category,
  CtaContent,
  GeographicReach,
  HeroContent,
  ImpactStat,
  Initiative,
  InitiativesHeroContent,
  Pillar,
  SectionHeading,
  SeoSetting,
  SiteSettings,
  TeamMember,
  Testimonial,
  TrustBadge,
} from "./types";

// Single seam between "no backend yet" and "real Laravel CMS API".
// Set NEXT_PUBLIC_API_URL (e.g. https://api.ichhepuran.org/api/v1) once the
// Laravel backend is deployed, and every page automatically switches from
// mock content to live CMS content — no component changes required.

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    // ISR: re-check with the CMS at most once a minute. The Laravel backend
    // can also call Next.js's on-demand revalidation webhook on publish for
    // instant updates (see project doc, Section 6 — System Architecture).
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }
  return res.json();
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!API_BASE) {
    const { siteSettingsMock } = await import("./content/home.mock");
    return siteSettingsMock;
  }
  return fetchJson<SiteSettings>("/settings");
}

export async function getHero(): Promise<HeroContent> {
  if (!API_BASE) {
    const { heroMock } = await import("./content/home.mock");
    return heroMock;
  }
  return fetchJson<HeroContent>("/hero");
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  if (!API_BASE) {
    const { impactStatsMock } = await import("./content/home.mock");
    return impactStatsMock;
  }
  return fetchJson<ImpactStat[]>("/impact-stats");
}

export async function getPillars(): Promise<Pillar[]> {
  if (!API_BASE) {
    const { pillarsMock } = await import("./content/home.mock");
    return pillarsMock;
  }
  return fetchJson<Pillar[]>("/pillars");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!API_BASE) {
    const { testimonialsMock } = await import("./content/home.mock");
    return testimonialsMock;
  }
  return fetchJson<Testimonial[]>("/testimonials");
}

export async function getCta(): Promise<CtaContent> {
  if (!API_BASE) {
    const { ctaMock } = await import("./content/home.mock");
    return ctaMock;
  }
  return fetchJson<CtaContent>("/cta-band");
}

export async function getSectionHeading(key: string): Promise<SectionHeading> {
  if (!API_BASE) {
    const { sectionHeadingsMock } = await import("./content/home.mock");
    return sectionHeadingsMock[key];
  }
  return fetchJson<SectionHeading>(`/section-headings/${key}`);
}

export async function getAboutHero(): Promise<AboutHeroContent> {
  if (!API_BASE) {
    const { aboutHeroMock } = await import("./content/about.mock");
    return aboutHeroMock;
  }
  return fetchJson<AboutHeroContent>("/about-hero");
}

export async function getAboutIntro(): Promise<AboutIntroContent> {
  if (!API_BASE) {
    const { aboutIntroMock } = await import("./content/about.mock");
    return aboutIntroMock;
  }
  return fetchJson<AboutIntroContent>("/about-intro");
}

export async function getGeographicReach(): Promise<GeographicReach[]> {
  if (!API_BASE) {
    const { geographicReachMock } = await import("./content/about.mock");
    return geographicReachMock;
  }
  return fetchJson<GeographicReach[]>("/geographic-reach");
}

export async function getAboutMilestones(): Promise<AboutMilestone[]> {
  if (!API_BASE) {
    const { aboutMilestonesMock } = await import("./content/about.mock");
    return aboutMilestonesMock;
  }
  return fetchJson<AboutMilestone[]>("/about-milestones");
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!API_BASE) {
    const { teamMembersMock } = await import("./content/about.mock");
    return teamMembersMock;
  }
  return fetchJson<TeamMember[]>("/team");
}

export async function getTrustBadges(): Promise<TrustBadge[]> {
  if (!API_BASE) {
    const { trustBadgesMock } = await import("./content/about.mock");
    return trustBadgesMock;
  }
  return fetchJson<TrustBadge[]>("/trust-badges");
}

export async function getInitiativesHero(): Promise<InitiativesHeroContent> {
  if (!API_BASE) {
    const { initiativesHeroMock } = await import("./content/initiatives.mock");
    return initiativesHeroMock;
  }
  return fetchJson<InitiativesHeroContent>("/initiatives-hero");
}

export async function getInitiatives(): Promise<Initiative[]> {
  if (!API_BASE) {
    const { initiativesMock } = await import("./content/initiatives.mock");
    return initiativesMock;
  }
  return fetchJson<Initiative[]>("/initiatives");
}

// Returns null on a genuine 404 (unknown slug) so the page can call
// notFound() — distinct from fetchJson's generic "throw on any non-ok
// response", since a missing initiative isn't an API failure.
export async function getInitiative(slug: string): Promise<Initiative | null> {
  if (!API_BASE) {
    const { initiativesMock } = await import("./content/initiatives.mock");
    return initiativesMock.find((initiative) => initiative.id === slug) ?? null;
  }
  const res = await fetch(`${API_BASE}/initiatives/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API request failed: /initiatives/${slug} (${res.status})`);
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  if (!API_BASE) {
    const { categoriesMock } = await import("./content/initiatives.mock");
    return categoriesMock;
  }
  return fetchJson<Category[]>("/categories");
}

// Every field is optional and unset by default (an admin hasn't overridden
// anything yet) — so unlike the other mock fallbacks, this doesn't need its
// own mock content file; an empty object already matches that real state.
export async function getSeoSetting(key: string): Promise<SeoSetting> {
  if (!API_BASE) {
    return {};
  }
  return fetchJson<SeoSetting>(`/seo-settings/${key}`);
}
