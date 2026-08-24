import type { MetadataRoute } from "next";
import { getInitiatives, getLegalPages } from "@/lib/api";
import { getSiteUrl } from "@/lib/siteUrl";

export const revalidate = 60;

const staticRoutes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/initiatives", changeFrequency: "weekly", priority: 0.9 },
  { path: "/impact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/get-involved", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [initiatives, legalPages] = await Promise.all([
    getInitiatives(),
    getLegalPages(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const initiativeEntries: MetadataRoute.Sitemap = initiatives.map(
    (initiative) => ({
      url: new URL(
        `/initiatives/${encodeURIComponent(initiative.id)}`,
        siteUrl,
      ).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const legalEntries: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: new URL(`/${encodeURIComponent(page.slug)}`, siteUrl).toString(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...staticEntries, ...initiativeEntries, ...legalEntries];
}
