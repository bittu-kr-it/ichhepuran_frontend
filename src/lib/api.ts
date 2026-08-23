import type { CtaContent, HeroContent, ImpactStat, Pillar, SectionHeading, SiteSettings, Testimonial } from "./types";

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
