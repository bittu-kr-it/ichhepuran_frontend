import Image from "next/image";
import type { AboutMilestone, SectionHeading } from "@/lib/types";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function JourneyTimeline({
  items,
  heading,
}: {
  items: AboutMilestone[];
  heading: SectionHeading;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-mustard" />
        </Reveal>

        <div className="relative mt-14">
          <div
            className="absolute bottom-0 left-[27px] top-0 w-px bg-forest/15 sm:left-[31px]"
            aria-hidden
          />

          <div className="flex flex-col gap-10">
            {sorted.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.1}>
                <div className="relative flex gap-6 sm:gap-8">
                  <span className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-white shadow-md sm:h-16 sm:w-16 sm:text-base">
                    {item.year}
                  </span>
                  <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 sm:flex-row sm:items-center">
                    {item.image && (
                      <div className="relative h-40 w-full flex-none overflow-hidden rounded-xl bg-sage sm:h-24 sm:w-32">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 128px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-xl font-semibold text-charcoal">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-charcoal-soft">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
