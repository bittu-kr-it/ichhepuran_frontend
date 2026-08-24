import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Pillar, SectionHeading } from "@/lib/types";
import { getCategoryColorClasses } from "@/lib/categoryColors";
import BlobAccent from "@/components/ui/BlobAccent";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function CorePillars({
  pillars,
  heading,
}: {
  pillars: Pillar[];
  heading: SectionHeading;
}) {
  const sorted = [...pillars].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden bg-pale-green py-24">
      <BlobAccent color="sage" opacity={0.15} className="top-0 right-0 h-96 w-96" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-mustard" />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {sorted.map((pillar, index) => {
            const Icon = (Icons[pillar.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;
            return (
              <Reveal key={pillar.id} delay={index * 0.1}>
                <Link
                  href={`/initiatives/${pillar.id}`}
                  className="group block h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-charcoal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-sage">
                      {pillar.image ? (
                        <Image
                          src={pillar.image}
                          alt={pillar.imageAlt ?? pillar.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <Icon className="h-16 w-16 text-white/40" strokeWidth={1.25} />
                      )}
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getCategoryColorClasses(pillar.category.color)}`}
                      >
                        {pillar.category.name}
                      </span>
                    </div>
                    {/* Sits outside the image div's overflow-hidden (needed
                        there for the hover-zoom clip) so this badge's
                        intentional -bottom-6 overflow isn't clipped too. */}
                    <span className="absolute -bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-charcoal/5">
                      <Icon className="h-6 w-6 text-forest" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div className="p-7 pt-9">
                    <h3 className="font-display text-xl font-semibold text-charcoal">
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
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
