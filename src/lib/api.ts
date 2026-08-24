import type {
  AboutHeroContent,
  AboutIntroContent,
  AboutMilestone,
  CarbonStat,
  Category,
  ContactHeroContent,
  ContactSubmissionPayload,
  CreateDonationOrderPayload,
  CreateDonationOrderResponse,
  CsrFeature,
  CsrInquiryPayload,
  CsrPartner,
  CtaContent,
  DonationMethod,
  GalleryHeroContent,
  GalleryItem,
  GeographicReach,
  GetInvolvedHeroContent,
  HeroContent,
  ImpactHeroContent,
  ImpactStat,
  Initiative,
  InitiativesHeroContent,
  LegalPage,
  LegalPageSummary,
  NewsletterSubscribePayload,
  Pillar,
  SdgAlignment,
  SectionHeading,
  SeoSetting,
  SiteSettings,
  TeamMember,
  Testimonial,
  TrustBadge,
  VerifyDonationPayload,
  VolunteerApplicationPayload,
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

// For the write/POST endpoints (forms, Razorpay). Deliberately has no
// mock-fallback branch — unlike every getX() below, there's nothing
// meaningful to fall back to for a real form submission when
// NEXT_PUBLIC_API_URL is unset; it just throws a clear error instead.
async function postJson<TResponse, TPayload>(path: string, payload: TPayload): Promise<TResponse> {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_URL is not set — cannot submit this form in the current environment.");
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const firstFieldError = body?.errors ? Object.values(body.errors)[0] : undefined;
    const message =
      (Array.isArray(firstFieldError) ? firstFieldError[0] : undefined) ?? body?.message ?? `Request failed (${res.status})`;
    throw new Error(message);
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

export async function getImpactHero(): Promise<ImpactHeroContent> {
  if (!API_BASE) {
    const { impactHeroMock } = await import("./content/impact.mock");
    return impactHeroMock;
  }
  return fetchJson<ImpactHeroContent>("/impact-hero");
}

// Renders on both Home and Impact pages — see the SdgAlignment type doc.
export async function getSdgAlignments(): Promise<SdgAlignment[]> {
  if (!API_BASE) {
    const { sdgAlignmentsMock } = await import("./content/impact.mock");
    return sdgAlignmentsMock;
  }
  return fetchJson<SdgAlignment[]>("/sdg-alignments");
}

export async function getCsrFeatures(): Promise<CsrFeature[]> {
  if (!API_BASE) {
    const { csrFeaturesMock } = await import("./content/impact.mock");
    return csrFeaturesMock;
  }
  return fetchJson<CsrFeature[]>("/csr-features");
}

// Can legitimately return an empty array — see CsrPartner's type doc.
export async function getCsrPartners(): Promise<CsrPartner[]> {
  if (!API_BASE) {
    const { csrPartnersMock } = await import("./content/impact.mock");
    return csrPartnersMock;
  }
  return fetchJson<CsrPartner[]>("/csr-partners");
}

export async function getCarbonStats(): Promise<CarbonStat[]> {
  if (!API_BASE) {
    const { carbonStatsMock } = await import("./content/impact.mock");
    return carbonStatsMock;
  }
  return fetchJson<CarbonStat[]>("/carbon-stats");
}

export async function getGalleryHero(): Promise<GalleryHeroContent> {
  if (!API_BASE) {
    const { galleryHeroMock } = await import("./content/gallery.mock");
    return galleryHeroMock;
  }
  return fetchJson<GalleryHeroContent>("/gallery-hero");
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!API_BASE) {
    const { galleryItemsMock } = await import("./content/gallery.mock");
    return galleryItemsMock;
  }
  return fetchJson<GalleryItem[]>("/gallery-items");
}

export async function getGalleryCategories(): Promise<Category[]> {
  if (!API_BASE) {
    const { galleryCategoriesMock } = await import("./content/gallery.mock");
    return galleryCategoriesMock;
  }
  return fetchJson<Category[]>("/gallery-categories");
}

export async function getGetInvolvedHero(): Promise<GetInvolvedHeroContent> {
  if (!API_BASE) {
    const { getInvolvedHeroMock } = await import("./content/getInvolved.mock");
    return getInvolvedHeroMock;
  }
  return fetchJson<GetInvolvedHeroContent>("/get-involved-hero");
}

export async function getDonationMethods(): Promise<DonationMethod[]> {
  if (!API_BASE) {
    const { donationMethodsMock } = await import("./content/getInvolved.mock");
    return donationMethodsMock;
  }
  return fetchJson<DonationMethod[]>("/donation-methods");
}

export async function getContactHero(): Promise<ContactHeroContent> {
  if (!API_BASE) {
    const { contactHeroMock } = await import("./content/contact.mock");
    return contactHeroMock;
  }
  return fetchJson<ContactHeroContent>("/contact-hero");
}

export async function getLegalPages(): Promise<LegalPageSummary[]> {
  if (!API_BASE) {
    const { legalPagesSummaryMock } = await import("./content/legal.mock");
    return legalPagesSummaryMock;
  }
  return fetchJson<LegalPageSummary[]>("/legal-pages");
}

// Returns null on a genuine 404 (unknown slug), same convention as
// getInitiative — lets the page call notFound() instead of throwing.
export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  if (!API_BASE) {
    const { legalPagesMock } = await import("./content/legal.mock");
    return legalPagesMock.find((page) => page.slug === slug) ?? null;
  }
  const res = await fetch(`${API_BASE}/legal-pages/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`API request failed: /legal-pages/${slug} (${res.status})`);
  }
  return res.json();
}

export async function createDonationOrder(
  payload: CreateDonationOrderPayload
): Promise<CreateDonationOrderResponse> {
  return postJson<CreateDonationOrderResponse, CreateDonationOrderPayload>("/donations/create-order", payload);
}

export async function verifyDonation(payload: VerifyDonationPayload): Promise<{ status: string }> {
  return postJson<{ status: string }, VerifyDonationPayload>("/donations/verify", payload);
}

export async function submitVolunteerApplication(payload: VolunteerApplicationPayload): Promise<{ message: string }> {
  return postJson<{ message: string }, VolunteerApplicationPayload>("/volunteer-applications", payload);
}

export async function submitCsrInquiry(payload: CsrInquiryPayload): Promise<{ message: string }> {
  return postJson<{ message: string }, CsrInquiryPayload>("/csr-inquiries", payload);
}

export async function submitContactForm(payload: ContactSubmissionPayload): Promise<{ message: string }> {
  return postJson<{ message: string }, ContactSubmissionPayload>("/contact-submissions", payload);
}

export async function subscribeToNewsletter(payload: NewsletterSubscribePayload): Promise<{ message: string }> {
  return postJson<{ message: string }, NewsletterSubscribePayload>("/newsletter-subscribers", payload);
}
