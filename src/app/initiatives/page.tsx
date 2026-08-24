import type { Metadata } from "next";
import InitiativesHero from "@/components/InitiativesHero";
import InitiativesList from "@/components/InitiativesList";
import CtaBand from "@/components/CtaBand";
import {
  getCategories,
  getCta,
  getInitiatives,
  getInitiativesHero,
  getSeoSetting,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// Merged with any admin override set on the Initiatives page's "SEO
// Settings" screen — see lib/seo.ts.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, hero] = await Promise.all([getSeoSetting("initiatives"), getInitiativesHero()]);
  return buildPageMetadata({
    seo,
    path: "/initiatives",
    fallbackTitle: hero.headline,
    fallbackDescription: hero.subheading,
  });
}

// Server component, same section-wise fetch pattern as Home/About — see
// src/lib/api.ts. Navbar/Footer live in the root layout, not here.
export default async function Initiatives() {
  const [hero, initiatives, categories, cta] = await Promise.all([
    getInitiativesHero(),
    getInitiatives(),
    getCategories(),
    getCta(),
  ]);

  return (
    <main>
      <InitiativesHero content={hero} />
      <InitiativesList initiatives={initiatives} categories={categories} />
      <CtaBand content={cta} />
    </main>
  );
}
