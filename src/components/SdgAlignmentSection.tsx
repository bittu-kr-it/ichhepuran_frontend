import type { SdgAlignment, SectionHeading } from "@/lib/types";
import BlobAccent from "@/components/ui/BlobAccent";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

// Renders on both Home and Impact pages — the underlying content is one
// shared, admin-managed list (see SdgAlignment's type doc). Card grid
// rather than a literal <table>, matching this project's established
// list-section visual language (see GeographicReachSection).
export default function SdgAlignmentSection({
  items,
  heading,
}: {
  items: SdgAlignment[];
  heading: SectionHeading;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden bg-pale-green py-24">
      <BlobAccent color="sage" opacity={0.1} className="-top-20 -right-16 h-96 w-96" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-mustard" />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 transition-shadow hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest font-display text-xs font-bold text-white">
                  {item.sdgNumber}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">
                  {item.goalName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  {item.contributionText}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
