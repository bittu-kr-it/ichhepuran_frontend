import type { Metadata } from "next";
import GalleryHero from "@/components/GalleryHero";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBand from "@/components/CtaBand";
import {
  getCta,
  getGalleryCategories,
  getGalleryHero,
  getGalleryItems,
  getSectionHeading,
  getSeoSetting,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// Merged with any admin override set on the Gallery page's "SEO Settings"
// screen — see lib/seo.ts.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, hero] = await Promise.all([getSeoSetting("gallery"), getGalleryHero()]);
  return buildPageMetadata({
    seo,
    path: "/gallery",
    fallbackTitle: hero.headline,
    fallbackDescription: hero.subheading,
  });
}

// Server component, same section-wise fetch pattern as every other page —
// see src/lib/api.ts. Navbar/Footer live in the root layout, not here.
export default async function Gallery() {
  const [hero, items, categories, heading, cta] = await Promise.all([
    getGalleryHero(),
    getGalleryItems(),
    getGalleryCategories(),
    getSectionHeading("gallery-items"),
    getCta(),
  ]);

  return (
    <main>
      <GalleryHero content={hero} />
      <GalleryGrid items={items} categories={categories} heading={heading} />
      <CtaBand content={cta} />
    </main>
  );
}
