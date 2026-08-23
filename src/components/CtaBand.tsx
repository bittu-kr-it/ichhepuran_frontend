import type { CtaContent } from "@/lib/types";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CtaBand({ content }: { content: CtaContent }) {
  return (
    <section className="relative overflow-hidden bg-forest-dark py-24">
      {/* Soft radial glow behind the copy, plus a subtle top border to
          separate this band from whatever precedes it */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-mustard/10 blur-3xl"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />

      <Reveal className="relative mx-auto max-w-4xl px-6 text-center lg:px-16">
        <h2 className="font-display text-3xl font-bold text-white lg:text-5xl">
          {content.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
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
