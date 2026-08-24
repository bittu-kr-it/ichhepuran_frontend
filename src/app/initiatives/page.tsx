import InitiativesHero from "@/components/InitiativesHero";
import InitiativesList from "@/components/InitiativesList";
import CtaBand from "@/components/CtaBand";
import { getCategories, getCta, getInitiatives, getInitiativesHero } from "@/lib/api";

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
