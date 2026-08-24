import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category, Initiative } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

function InitiativeCard({ item, index }: { item: Initiative; index: number }) {
  const Icon = (Icons[item.icon as keyof typeof Icons] ?? Icons.Sparkles) as LucideIcon;

  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/initiatives/${item.id}`}
        className="group block h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-charcoal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-sage">
          {item.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ) : (
            <Icon className="h-14 w-14 text-white/40" strokeWidth={1.25} />
          )}
          <span className="absolute -bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-charcoal/5">
            <Icon className="h-6 w-6 text-forest" strokeWidth={1.75} />
          </span>
        </div>
        <div className="p-7 pt-9">
          <h3 className="font-display text-xl font-semibold text-charcoal">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-charcoal-soft">{item.summary}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
            Learn more
            <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

// Categories are admin-managed (add/remove/reorder freely, see
// backend CategoryResource) — this groups initiatives by whatever
// categories currently exist, in their configured order, rather than a
// fixed list of 3. Section background alternates by position for visual
// rhythm, not by a specific category's identity.
export default function InitiativesList({
  initiatives,
  categories,
}: {
  initiatives: Initiative[];
  categories: Category[];
}) {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedCategories.map((category, sectionIndex) => {
        const items = initiatives
          .filter((i) => i.category.slug === category.slug)
          .sort((a, b) => a.order - b.order);

        if (items.length === 0) return null;

        return (
          <section
            key={category.slug}
            className={`${sectionIndex % 2 === 0 ? "bg-pale-green" : "bg-cream"} py-24`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-16">
              <Reveal className="max-w-2xl">
                <h2 className="font-display text-4xl font-bold text-charcoal lg:text-5xl">
                  {category.name}
                </h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-mustard" />
              </Reveal>

              <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <InitiativeCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
