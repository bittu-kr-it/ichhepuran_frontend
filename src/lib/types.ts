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
  orgLogo?: string;
  logoAlt?: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: { label: string; href: string }[];
  navLinks: NavLink[];
  donateHref: string;
}

/**
 * One slide of the Home hero carousel — a full CRUD list (add/remove/
 * reorder freely from the admin), same `{id, order, ...}` convention as
 * Pillar/Testimonial/AboutMilestone. `backgroundImage` can be null (a
 * slide can be published with no photo yet, falling back to a plain
 * color background) — see Hero.tsx.
 */
export interface HeroSlide {
  id: string;
  order: number;
  eyebrow: string;
  headline: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backgroundImage: string | null;
  backgroundImageAlt?: string;
}

/**
 * Optional full-bleed video band shown ABOVE the hero carousel on the Home
 * page (see VideoHero.tsx). `enabled` is the master switch — when false the
 * whole section renders nothing. `video` is an uploaded file URL, `videoUrl`
 * an external fallback (used only when `video` is null); `ctas` is already
 * filtered server-side to 0–3 complete label+link pairs.
 */
export interface HomeVideoHeroContent {
  enabled: boolean;
  eyebrow: string | null;
  headline: string | null;
  subheading: string | null;
  video: string | null;
  videoUrl: string | null;
  poster: string | null;
  posterAlt: string | null;
  overlay: boolean;
  ctas: { label: string; href: string }[];
}

export type HeroIndicatorStyle = "circle" | "dot" | "dash" | "plant";

/**
 * Carousel-wide display options — global to the whole carousel, not
 * per-slide (see backend/CLAUDE.md's Home Page entry for why).
 */
export interface HeroCarouselSettings {
  indicatorStyle: HeroIndicatorStyle;
  gradientOverlay: boolean;
}

export interface ImpactStat {
  id: string;
  label: string;
  prefix?: string;
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
  // Optional full-bleed background photo for the band; `overlay` toggles
  // the darkening gradient that keeps the white text readable over it.
  background: string | null;
  backgroundAlt: string | null;
  overlay: boolean;
  // Hex colour for the heading + subheading. null = white (the default).
  textColor: string | null;
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

export type PartnerGroup = "partnership" | "implemented_for";

/**
 * One logo in the Partners section (PartnersSection.tsx — renders on Home
 * and About). `group` picks which of the two labelled rows it belongs to
 * (the row titles are editable SectionHeadings, fetched separately).
 * `logo` can be null (row seeded without an image yet).
 */
export interface Partner {
  id: string;
  name: string;
  group: PartnerGroup;
  logo: string | null;
  logoAlt: string;
  order: number;
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

export interface ImpactHeroContent {
  headline: string;
  subheading: string;
}

/**
 * Renders on both Home and Impact pages — one shared, admin-managed
 * content type (see backend/CLAUDE.md's "Site-wide" note).
 */
export interface SdgAlignment {
  id: string;
  sdgNumber: number;
  goalName: string;
  contributionText: string;
  order: number;
}

export interface CsrFeature {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  order: number;
}

/**
 * Deliberately can be an empty array — no real CSR partners have been
 * confirmed with the client yet (see ImpactPageSeeder). Components
 * rendering this list must handle zero items gracefully.
 */
export interface CsrPartner {
  id: string;
  name: string;
  logo?: string;
  logoAlt?: string;
  order: number;
}

export interface CarbonStat {
  id: string;
  year: string;
  tons: number;
  isProjected: boolean;
  order: number;
}

export interface GalleryHeroContent {
  headline: string;
  subheading: string;
}

/**
 * `category` is an admin-managed Category master, same pattern as
 * Initiative's category (see backend/CLAUDE.md's "Gallery" note) — a
 * fixed 3-value enum was tried first, then converted to this master per
 * an explicit request to mirror Initiative's add/remove/reorder pattern.
 * `caption`/`imageAlt` are optional: the lightbox only shows a caption
 * when present.
 */
export interface GalleryItem {
  id: string;
  image: string | null;
  imageAlt?: string;
  caption?: string | null;
  category: Category;
  order: number;
  // Explicit admin choice — at most one item is true at a time (enforced
  // backend-side), replacing an earlier "lowest order = featured"
  // convention.
  isFeatured: boolean;
}

export interface GetInvolvedHeroContent {
  headline: string;
  subheading: string;
}

export interface ContactHeroContent {
  headline: string;
  subheading: string;
}

/**
 * Static, admin-managed donation details (bank/UPI/international) —
 * distinct from the Razorpay online-payment integration. `fields` is a
 * flexible label->value map since each type needs different fields.
 */
export interface DonationMethod {
  id: string;
  type: "bank" | "upi" | "international";
  title: string;
  fields: Record<string, string>;
  qrImage?: string | null;
  qrImageAlt?: string;
  instructions?: string | null;
  order: number;
}

// Payload/response shapes for the write-form and Razorpay endpoints —
// camelCase, matching the backend FormRequests field-for-field. These
// endpoints have no mock fallback (see lib/api.ts's postJson) since
// there's nothing meaningful to fall back to for a real submission.

export interface CreateDonationOrderPayload {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
}

export interface CreateDonationOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  donationId: string;
}

export interface VerifyDonationPayload {
  donationId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export type AreaOfInterest =
  | "reforestation"
  | "waste_management"
  | "community_education"
  | "administrative_support";

export interface VolunteerApplicationPayload {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  areaOfInterest: AreaOfInterest;
  message: string;
}

export type BudgetRange = "5l_10l" | "10l_50l" | "50l_plus";

export interface CsrInquiryPayload {
  organizationName: string;
  contactPerson: string;
  email: string;
  countryCode: string;
  phone: string;
  budgetRange: BudgetRange;
  goals: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface NewsletterSubscribePayload {
  email: string;
}

/**
 * Lean shape for the Footer's dynamic link list — see LegalPageSummaryResource.
 * A full LegalPage admin resource (not fixed singleton pages, unlike
 * SeoSetting's per-page keys) so the client can add more legal pages later
 * (e.g. a Cookie Policy once analytics is added) without a code change.
 */
export interface LegalPageSummary {
  title: string;
  slug: string;
}

export interface LegalPage {
  id: string;
  title: string;
  slug: string;
  body: string;
  updatedAt: string;
}
