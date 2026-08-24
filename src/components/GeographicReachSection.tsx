import { MapPin } from "lucide-react";
import type { GeographicReach, SectionHeading } from "@/lib/types";
import BlobAccent from "@/components/ui/BlobAccent";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function GeographicReachSection({
  items,
  heading,
}: {
  items: GeographicReach[];
  heading: SectionHeading;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden bg-pale-green py-24">
      <BlobAccent color="forest" opacity={0.08} className="-bottom-24 -left-20 h-96 w-96" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-mustard" />
        </Reveal>

        {heading.image && (
          <Reveal delay={0.1} className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heading.image}
              alt="Map of Ichhe Puran's geographic reach across West Bengal, Jharkhand, and Odisha"
              className="w-full rounded-3xl shadow-sm ring-1 ring-charcoal/5"
            />
          </Reveal>
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 transition-shadow hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
                  <MapPin className="h-5 w-5 text-forest" strokeWidth={1.75} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-forest/70">
                  {item.state}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-charcoal">
                  {item.region}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
