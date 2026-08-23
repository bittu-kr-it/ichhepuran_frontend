import Link from "next/link";
import type { HeroContent } from "@/lib/types";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-sage">
      {/* Background photo — swapped for real project photography once available */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
        aria-hidden
      />
      {/* Dark green overlay so white text stays readable over any photo */}
      <div className="absolute inset-0 bg-forest-dark/60" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mustard">
            {content.eyebrow}
          </p>

          <h1 className="mt-5 whitespace-pre-line font-display text-5xl font-black leading-[1.08] text-white lg:text-6xl">
            {content.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            {content.subheading}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={content.primaryCtaHref}
              className="rounded-full bg-mustard px-8 py-4 text-[15px] font-semibold text-charcoal shadow-lg shadow-black/10 transition-transform hover:scale-[1.03]"
            >
              {content.primaryCtaLabel}
            </Link>
            <Link
              href={content.secondaryCtaHref}
              className="rounded-full border border-white/70 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
