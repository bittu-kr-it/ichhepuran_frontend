"use client";

import { useState } from "react";
import type { Category, GalleryItem, SectionHeading } from "@/lib/types";
import { getCategoryColorClasses } from "@/lib/categoryColors";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";

// "all" plus a category slug — categories are admin-managed (see
// backend GalleryCategoryResource), not a fixed list, so tabs are built
// dynamically and only shown for categories that currently have at least
// one published item (an empty tab is confusing, not useful).
type FilterKey = string;
const ALL: FilterKey = "all";

// Masonry (CSS columns), not a fixed-aspect grid — the real photos have
// genuinely varied aspect ratios (portrait/tall/square/landscape); a
// uniform grid would crop/distort them.
export default function GalleryGrid({
  items,
  categories,
  heading,
}: {
  items: GalleryItem[];
  categories: Category[];
  heading: SectionHeading;
}) {
  const [activeCategory, setActiveCategory] = useState<FilterKey>(ALL);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.category.slug, (counts.get(item.category.slug) ?? 0) + 1);
  }

  const visibleCategories = [...categories]
    .filter((category) => (counts.get(category.slug) ?? 0) > 0)
    .sort((a, b) => a.order - b.order);

  const filtered = items
    .filter((item) => activeCategory === ALL || item.category.slug === activeCategory)
    .sort((a, b) => a.order - b.order);

  // Featured is an explicit admin choice (GalleryItem.isFeatured — at most
  // one item is ever true, enforced backend-side), not an implicit
  // "lowest order" convention. Only shown on the unfiltered view — a
  // single-category filter can have very few items, where pulling one out
  // into its own banner would leave the grid looking sparse. CSS multi-
  // column masonry can't span a grid item across columns, so "featured"
  // means a separate full-width banner above the grid instead.
  const featured = activeCategory === ALL ? items.find((item) => item.isFeatured) : undefined;
  const gridItems = featured ? filtered.filter((item) => item.id !== featured.id) : filtered;

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory(ALL)}
            aria-pressed={activeCategory === ALL}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeCategory === ALL
                ? "bg-forest text-white"
                : "bg-white text-charcoal ring-1 ring-charcoal/10 hover:bg-pale-green"
            }`}
          >
            All ({items.length})
          </button>
          {visibleCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              aria-pressed={activeCategory === category.slug}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category.slug
                  ? "bg-forest text-white"
                  : "bg-white text-charcoal ring-1 ring-charcoal/10 hover:bg-pale-green"
              }`}
            >
              {category.name} ({counts.get(category.slug) ?? 0})
            </button>
          ))}
        </div>

        {featured && (
          <Reveal delay={0.05} className="mt-10">
            <button
              type="button"
              onClick={() => setSelectedIndex(filtered.findIndex((item) => item.id === featured.id))}
              className="group block w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-charcoal/5 transition-shadow hover:shadow-xl"
            >
              <div className="relative">
                {featured.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.image}
                    alt={featured.imageAlt ?? featured.caption ?? "Gallery photo"}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-96"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-mustard px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
                  Featured
                </span>
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getCategoryColorClasses(featured.category.color)}`}
                >
                  {featured.category.name}
                </span>
              </div>
              {featured.caption && (
                <p className="p-6 text-left text-base text-charcoal-soft">{featured.caption}</p>
              )}
            </button>
          </Reveal>
        )}

        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {gridItems.map((item, i) => {
            const realIndex = filtered.findIndex((f) => f.id === item.id);
            return (
              <Reveal key={item.id} delay={i * 0.05} className="mb-6 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(realIndex)}
                  className="group block w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-charcoal/5 transition-shadow hover:shadow-xl"
                >
                  <div className="relative">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? item.caption ?? "Gallery photo"}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getCategoryColorClasses(item.category.color)}`}
                    >
                      {item.category.name}
                    </span>
                  </div>
                  {item.caption && (
                    <p className="p-4 text-left text-sm text-charcoal-soft">{item.caption}</p>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-charcoal-soft">No items in this category yet.</p>
        )}
      </div>

      {selectedIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </section>
  );
}
