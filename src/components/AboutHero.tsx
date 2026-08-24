import type { AboutHeroContent } from "@/lib/types";
import BlobAccent from "@/components/ui/BlobAccent";
import Reveal from "@/components/ui/Reveal";

// About's hero has no CTAs and no background photo (per the actual source
// content) — styled as a solid gradient banner rather than reusing Home's
// photo-backed Hero.
export default function AboutHero({ content }: { content: AboutHeroContent }) {
  return (
    <section className="relative isolate flex min-h-[420px] items-center overflow-hidden bg-gradient-to-br from-forest via-forest to-forest-dark">
      <BlobAccent color="mustard" opacity={0.12} className="-top-20 -right-10 h-96 w-96" />
      <BlobAccent color="sage" opacity={0.14} className="-bottom-24 -left-16 h-80 w-80" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 text-center lg:px-16">
        <Reveal>
          <h1 className="font-display text-5xl font-black leading-[1.08] text-white lg:text-6xl">
            {content.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {content.subheading}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
