import type { Metadata } from "next";
import GetInvolvedHero from "@/components/GetInvolvedHero";
import DonateSection from "@/components/DonateSection";
import DonationMethodsSection from "@/components/DonationMethodsSection";
import VolunteerForm from "@/components/VolunteerForm";
import CsrInquiryForm from "@/components/CsrInquiryForm";
import CtaBand from "@/components/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import {
  getCta,
  getDonationMethods,
  getGetInvolvedHero,
  getSectionHeading,
  getSeoSetting,
} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// Merged with any admin override set on the Get Involved page's "SEO
// Settings" screen — see lib/seo.ts.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, hero] = await Promise.all([getSeoSetting("get-involved"), getGetInvolvedHero()]);
  return buildPageMetadata({
    seo,
    path: "/get-involved",
    fallbackTitle: hero.headline,
    fallbackDescription: hero.subheading,
  });
}

// The #donate/#volunteer/#csr anchor ids are load-bearing — they match
// the CTA hrefs already seeded on Home (HomePageSeeder.php's
// /get-involved#donate, /get-involved#volunteer) verbatim.
export default async function GetInvolved() {
  const [hero, donationMethods, donateHeading, volunteerHeading, csrHeading, cta] = await Promise.all([
    getGetInvolvedHero(),
    getDonationMethods(),
    getSectionHeading("donation-methods"),
    getSectionHeading("volunteer"),
    getSectionHeading("csr-partnership"),
    getCta(),
  ]);

  return (
    <main>
      <GetInvolvedHero content={hero} />

      <section id="donate" className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-16">
          <Reveal className="text-center">
            <Eyebrow>{donateHeading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
              {donateHeading.heading}
            </h2>
          </Reveal>
          <div className="mt-10">
            <DonateSection />
          </div>
        </div>
      </section>

      <DonationMethodsSection methods={donationMethods} heading={donateHeading} hideHeading />

      <section id="volunteer" className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-16">
          <Reveal className="text-center">
            <Eyebrow>{volunteerHeading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
              {volunteerHeading.heading}
            </h2>
          </Reveal>
          <div className="mt-10">
            <VolunteerForm />
          </div>
        </div>
      </section>

      <section id="csr" className="bg-pale-green py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-16">
          <Reveal className="text-center">
            <Eyebrow>{csrHeading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
              {csrHeading.heading}
            </h2>
          </Reveal>
          <div className="mt-10">
            <CsrInquiryForm />
          </div>
        </div>
      </section>

      <CtaBand content={cta} />
    </main>
  );
}
