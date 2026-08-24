import type { SectionHeading, TeamMember } from "@/lib/types";
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

export default function TeamGrid({
  members,
  heading,
}: {
  members: TeamMember[];
  heading: SectionHeading;
}) {
  const sorted = [...members].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-pale-green py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow>{heading.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-charcoal lg:text-5xl">
            {heading.heading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-mustard" />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.1}>
              <div className="flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-charcoal/5 transition-shadow hover:shadow-md">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.photoAlt ?? member.name}
                    className="h-24 w-24 flex-none rounded-full object-cover ring-4 ring-mustard/30"
                  />
                ) : (
                  <span className="flex h-24 w-24 flex-none items-center justify-center rounded-full bg-forest text-2xl font-semibold text-white ring-4 ring-mustard/30">
                    {initials(member.name)}
                  </span>
                )}
                <h3 className="mt-5 font-display text-lg font-semibold text-charcoal">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-forest">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                    {member.bio}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
