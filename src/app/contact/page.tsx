import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/ui/Reveal";
import { getContactHero, getCta, getSeoSetting, getSiteSettings } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

// Merged with any admin override set on the Contact page's "SEO Settings"
// screen — see lib/seo.ts.
export async function generateMetadata(): Promise<Metadata> {
  const [seo, hero] = await Promise.all([getSeoSetting("contact"), getContactHero()]);
  return buildPageMetadata({
    seo,
    path: "/contact",
    fallbackTitle: hero.headline,
    fallbackDescription: hero.subheading,
  });
}

// Office info comes straight from SiteSettings — the same source Navbar/
// Footer already use — no separate content type needed just for this page.
export default async function Contact() {
  const [hero, settings, cta] = await Promise.all([getContactHero(), getSiteSettings(), getCta()]);

  return (
    <main>
      <ContactHero content={hero} />

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5 lg:px-16">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-charcoal">Reach out directly</h2>
            <ul className="mt-6 space-y-5 text-[15px]">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-none text-forest" strokeWidth={1.75} />
                <span className="text-charcoal-soft">{settings.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-none text-forest" strokeWidth={1.75} />
                <span className="text-charcoal-soft">{settings.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-none text-forest" strokeWidth={1.75} />
                <span className="text-charcoal-soft">{settings.address}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CtaBand content={cta} />
    </main>
  );
}
