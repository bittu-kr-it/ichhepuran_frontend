import Image from "next/image";
import type { Partner, SectionHeading } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

// The "Partners" logo wall — two labelled rows ("In partnership with" /
// "Project implemented for"), admin-managed via /admin/partners
// (App\Models\Partner). Renders on Home and About. Distinct from the "Our
// CSR Partners" row inside the Impact page's Corporate Social Synergy
// section (CsrSynergySection.tsx).
//
// Row titles come from editable SectionHeadings (keys 'partners-partnership'
// / 'partners-implemented-for') — only their `heading` is used here.
export default function PartnersSection({
  partners,
  partnershipHeading,
  implementedForHeading,
}: {
  partners: Partner[];
  partnershipHeading: SectionHeading;
  implementedForHeading: SectionHeading;
}) {
  const rows = [
    { label: partnershipHeading.heading, items: partners.filter((p) => p.group === "partnership") },
    { label: implementedForHeading.heading, items: partners.filter((p) => p.group === "implemented_for") },
  ]
    .map((row) => ({ ...row, items: [...row.items].sort((a, b) => a.order - b.order) }))
    .filter((row) => row.items.length > 0);

  if (rows.length === 0) return null;

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="space-y-14">
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.1} className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-forest">
                {row.label}
              </p>
              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-10">
                {row.items.map((partner) => (
                  <li key={partner.id} className="flex items-center justify-center">
                    {partner.logo ? (
                      // Fixed contain-box — partner logos have varied aspect
                      // ratios, and next/image fill needs a sized ancestor.
                      <span className="relative block h-24 w-56 sm:h-28 sm:w-64">
                        <Image
                          src={partner.logo}
                          alt={partner.logoAlt}
                          fill
                          sizes="(min-width: 640px) 256px, 224px"
                          className="object-contain"
                        />
                      </span>
                    ) : (
                      <span className="text-lg font-semibold text-charcoal/70">
                        {partner.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
