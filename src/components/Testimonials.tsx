import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
          Voices of impact
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-bold text-charcoal">
          Real stories from the communities we serve
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {sorted.map((item) => (
            <figure
              key={item.id}
              className="rounded-2xl border border-forest/10 bg-white p-8"
            >
              <Quote className="h-8 w-8 text-mustard" strokeWidth={1.5} />
              <blockquote className="mt-4 text-[17px] leading-relaxed text-charcoal">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-display text-lg font-semibold text-forest">
                  {item.name}
                </p>
                <p className="text-sm text-charcoal-soft">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
