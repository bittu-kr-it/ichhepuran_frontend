import { ShieldCheck } from "lucide-react";
import type { SectionHeading, TrustBadge } from "@/lib/types";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function TrustBadgesSection({
  badges,
  heading,
}: {
  badges: TrustBadge[];
  heading: SectionHeading;
}) {
  const sorted = [...badges].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-forest-dark py-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-16">
        <Reveal>
          <Eyebrow color="mustard">{heading.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-4xl font-bold text-white lg:text-5xl">
            {heading.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((badge, index) => (
            <Reveal key={badge.id} delay={index * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mustard/15">
                  <ShieldCheck className="h-6 w-6 text-mustard" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {badge.name}
                </h3>
                <p className="mt-1 text-sm text-white/60">{badge.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
