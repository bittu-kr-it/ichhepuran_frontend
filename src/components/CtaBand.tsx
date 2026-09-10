import Image from "next/image";
import type { CtaContent } from "@/lib/types";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CtaBand({ content }: { content: CtaContent }) {
  const hasBackground = !!content.background;
  // Admin-set heading/subheading colour; null falls back to the CSS classes
  // (white). Inline style wins over the `text-white` utility.
  const headingStyle = content.textColor ? { color: content.textColor } : undefined;
  const bodyStyle = content.textColor ? { color: content.textColor, opacity: 0.8 } : undefined;

  return (
    <section className="relative overflow-hidden bg-forest-dark py-24">
      {/* Optional full-bleed background photo */}
      {hasBackground && (
        <Image
          src={content.background as string}
          alt={content.backgroundAlt ?? ""}
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      )}

      {/* Darkening overlay — always on when there's a photo unless the admin
          turns it off; keeps the white copy readable. */}
      {hasBackground && content.overlay && (
        <>
          <div className="absolute inset-0 bg-forest-dark/40" aria-hidden />
          <div
            className="absolute inset-0 bg-linear-to-b from-forest-dark/60 to-transparent"
            aria-hidden
          />
        </>
      )}

      {/* Soft radial glow behind the copy, plus a subtle top border to
          separate this band from whatever precedes it. Skipped when there's
          a photo — it competes with the image. */}
      {!hasBackground && (
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 -translate-y-1/3 rounded-full bg-mustard/10 blur-3xl"
          aria-hidden
        />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />

      <Reveal className="relative mx-auto max-w-4xl px-6 text-center lg:px-16">
        <h2 className="font-display text-3xl font-bold text-white lg:text-5xl" style={headingStyle}>
          {content.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75" style={bodyStyle}>
          {content.subheading}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href={content.primaryCtaHref}>{content.primaryCtaLabel}</Button>
          <Button href={content.secondaryCtaHref} variant="secondary">
            {content.secondaryCtaLabel}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
