import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Pillar } from "@/lib/types";

export default function CorePillars({ pillars }: { pillars: Pillar[] }) {
  const sorted = [...pillars].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-pale-green py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
            What we do
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal">
            Our Core Pillars
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {sorted.map((pillar) => {
            const Icon = (Icons[pillar.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;
            return (
              <article
                key={pillar.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="h-48 w-full bg-sage bg-cover bg-center"
                  style={{ backgroundImage: `url(${pillar.image})` }}
                />
                <div className="p-7">
                  <Icon className="h-6 w-6 text-forest" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-charcoal-soft">
                    {pillar.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                    Learn more
                    <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
