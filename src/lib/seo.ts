import type { Metadata } from "next";
import type { SeoSetting } from "./types";

/**
 * Merges an admin-editable SeoSetting override (from the Filament "SEO
 * Settings" page for this route) with this page's own content-derived
 * fallback title/description/image. Canonical URL is generated here from
 * `path` + the root layout's `metadataBase` — deliberately never
 * admin-editable (see SeoSetting's backend model comment for why).
 */
export function buildPageMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}: {
  seo: SeoSetting;
  path: string;
  fallbackTitle?: string;
  fallbackDescription: string;
  fallbackImage?: string | null;
}): Metadata {
  const title = seo.metaTitle || fallbackTitle;
  const description = seo.metaDescription || fallbackDescription;
  const ogTitle = seo.ogTitle || title || fallbackTitle;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage || fallbackImage || undefined;
  const twitterTitle = seo.twitterTitle || ogTitle;
  const twitterDescription = seo.twitterDescription || ogDescription;
  const twitterImage = seo.twitterImage || ogImage;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(ogTitle ? { title: ogTitle } : {}),
      description: ogDescription,
      url: path,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: twitterImage ? "summary_large_image" : "summary",
      ...(twitterTitle ? { title: twitterTitle } : {}),
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}
