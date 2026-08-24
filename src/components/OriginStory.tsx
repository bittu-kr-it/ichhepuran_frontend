import { Compass, Sparkles } from "lucide-react";
import Image from "next/image";
import type { AboutIntroContent } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

export default function OriginStory({ content }: { content: AboutIntroContent }) {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3">
            {content.originImage && (
              <div className="relative mb-8 h-72 w-full overflow-hidden rounded-3xl bg-sage shadow-sm">
                <Image
                  src={content.originImage}
                  alt={content.originImageAlt ?? content.originTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-semibold text-forest">
              Est. {content.establishedYear}
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold text-charcoal lg:text-5xl">
              {content.originTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal-soft">
              {content.originBody}
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-charcoal/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10">
                  <Compass className="h-6 w-6 text-forest" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">
                  Our Vision
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-charcoal-soft">
                  {content.vision}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl bg-forest p-8 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="h-6 w-6 text-mustard" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  Our Mission
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                  {content.mission}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
