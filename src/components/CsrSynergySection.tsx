import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CarbonStat, CsrFeature, CsrPartner, SectionHeading } from "@/lib/types";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

// Three data sources (CsrFeature, CarbonStat, CsrPartner) merged into one
// "Corporate Social Synergy" section — the source content presents these
// as sub-parts of a single section, not three independent ones, so they
// share one admin-editable heading (see CsrFeatureResource's
// SectionHeadingWidget) and one component. bg-forest-dark shell mirrors
// TrustBadgesSection's trust-signaling tone, fitting for a CSR-facing
// section.
export default function CsrSynergySection({
  heading,
  features,
  carbonStats,
  partners,
}: {
  heading: SectionHeading;
  features: CsrFeature[];
  carbonStats: CarbonStat[];
  partners: CsrPartner[];
}) {
  const sortedFeatures = [...features].sort((a, b) => a.order - b.order);
  const sortedStats = [...carbonStats].sort((a, b) => a.order - b.order);
  const sortedPartners = [...partners].sort((a, b) => a.order - b.order);
  const maxTons = Math.max(1, ...sortedStats.map((s) => s.tons));

  return (
    <section className="bg-forest-dark py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal className="text-center">
          <Eyebrow color="mustard">{heading.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-4xl font-bold text-white lg:text-5xl">
            {heading.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {sortedFeatures.map((feature, index) => {
            const Icon = (Icons[feature.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;
            return (
              <Reveal key={feature.id} delay={index * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mustard/15">
                    <Icon className="h-6 w-6 text-mustard" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {sortedStats.length > 0 && (
          <Reveal delay={0.15} className="mt-16">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-white/50">
              Carbon Mitigated (tons CO₂e)
            </p>
            <div className="mx-auto mt-8 flex max-w-lg items-end justify-center gap-10">
              {sortedStats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center">
                  <span className="mb-2 text-sm font-semibold text-white">
                    {stat.tons.toLocaleString("en-IN")}
                    {stat.isProjected && (
                      <span className="ml-1.5 rounded-full bg-mustard/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-mustard">
                        Projected
                      </span>
                    )}
                  </span>
                  <div className="flex h-32 w-14 items-end">
                    <div
                      className={
                        stat.isProjected
                          ? "w-full rounded-t-md border-2 border-dashed border-mustard/60 bg-mustard/10 opacity-70"
                          : "w-full rounded-t-md bg-mustard"
                      }
                      style={{ height: `${Math.max(8, (stat.tons / maxTons) * 100)}%` }}
                    />
                  </div>
                  <span className="mt-2 text-xs text-white/60">{stat.year}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {sortedPartners.length > 0 && (
          <Reveal delay={0.2} className="mt-16 border-t border-white/10 pt-10">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-white/50">
              Our CSR Partners
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
              {sortedPartners.map((partner) =>
                partner.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={partner.id}
                    src={partner.logo}
                    alt={partner.logoAlt ?? partner.name}
                    className="h-10 w-auto opacity-80 grayscale transition-opacity hover:opacity-100"
                  />
                ) : (
                  <span key={partner.id} className="text-sm font-semibold text-white/70">
                    {partner.name}
                  </span>
                )
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
