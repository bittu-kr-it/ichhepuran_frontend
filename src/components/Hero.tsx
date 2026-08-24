import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { HeroContent } from "@/lib/types";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-sage">
      {/* The largest above-the-fold image on the site — priority skips
          lazy-loading so it doesn't become the LCP bottleneck. */}
      <Image
        src={content.backgroundImage}
        alt={content.backgroundImageAlt ?? ""}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Layered gradient overlay — reads richer than a flat tint and keeps
          text legible over any photo, darkest toward the text side */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-forest-dark/85 via-forest-dark/60 to-forest-dark/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-16">
        <Reveal className="max-w-2xl">
          <Eyebrow color="mustard" variant="badge">
            {content.eyebrow}
          </Eyebrow>

          <h1 className="mt-6 whitespace-pre-line font-display text-5xl font-black leading-[1.08] text-white lg:text-7xl">
            {content.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            {content.subheading}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={content.primaryCtaHref}>{content.primaryCtaLabel}</Button>
            <Button href={content.secondaryCtaHref} variant="secondary">
              {content.secondaryCtaLabel}
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/60 sm:flex">
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} />
      </div>
    </section>
  );
}
