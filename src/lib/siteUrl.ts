const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): URL {
  const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

  // Treat NEXT_PUBLIC_SITE_URL as an origin even if it was configured with a
  // trailing slash (or an accidental path), so generated URLs stay canonical.
  return new URL(siteUrl.origin);
}
