import { Quote } from "lucide-react";
import Image from "next/image";
import type { SectionHeading, Testimonial } from "@/lib/types";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials({
  items,
  heading,
}: {
  items: Testimonial[];
  heading: SectionHeading;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal>
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {sorted.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <figure className="relative h-full overflow-hidden rounded-3xl border border-forest/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <Quote
                  className="absolute right-6 top-6 h-16 w-16 text-mustard/15"
                  strokeWidth={1}
                  fill="currentColor"
                />
                <blockquote className="relative text-[17px] leading-relaxed text-charcoal">
                  “{item.quote}”
                </blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt={item.photoAlt ?? item.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 flex-none rounded-full object-cover ring-2 ring-mustard/40"
                    />
                  ) : (
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-forest text-sm font-semibold text-white ring-2 ring-mustard/40">
                      {initials(item.name)}
                    </span>
                  )}
                  <span>
                    <p className="font-display text-lg font-semibold text-forest">
                      {item.name}
                    </p>
                    <p className="text-sm text-charcoal-soft">{item.role}</p>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
