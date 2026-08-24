import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCategoryColorClasses } from "@/lib/categoryColors";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/ui/Reveal";
import { getCta, getInitiative } from "@/lib/api";

// Genuinely unique per-initiative metadata (title, description, and a real
// social-share image when one's been uploaded) — the highest-value case for
// SEO here, since these 9+ pages would otherwise all share one generic title.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const initiative = await getInitiative(slug);

  if (!initiative) {
    return { title: "Initiative Not Found" };
  }

  return {
    title: initiative.title,
    description: initiative.summary,
    openGraph: {
      title: initiative.title,
      description: initiative.summary,
      images: initiative.image ? [{ url: initiative.image }] : undefined,
    },
  };
}

export default async function InitiativeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [initiative, cta] = await Promise.all([getInitiative(slug), getCta()]);

  if (!initiative) {
    notFound();
  }

  const Icon = (Icons[initiative.icon as keyof typeof Icons] ?? Icons.Sparkles) as LucideIcon;

  return (
    <main>
      <section className="relative isolate flex min-h-[380px] items-end overflow-hidden bg-sage">
        {initiative.image ? (
          <Image
            src={initiative.image}
            alt={initiative.imageAlt ?? initiative.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-forest">
            <Icon className="h-24 w-24 text-white/25" strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/30 to-transparent" aria-hidden />

        <div className="relative mx-auto w-full max-w-4xl px-6 pb-14 pt-24 lg:px-16">
          <Reveal>
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Initiatives
            </Link>
            <span
              className={`mt-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getCategoryColorClasses(initiative.category.color)}`}
            >
              {initiative.category.name}
            </span>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight text-white lg:text-5xl">
              {initiative.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-16">
          <Reveal>
            <p className="text-xl leading-relaxed text-charcoal-soft">{initiative.summary}</p>
            {initiative.body && (
              <div
                className="prose prose-lg mt-8 max-w-none text-charcoal prose-headings:font-display prose-headings:text-charcoal prose-a:text-forest"
                dangerouslySetInnerHTML={{ __html: initiative.body }}
              />
            )}
          </Reveal>
        </div>
      </section>

      <CtaBand content={cta} />
    </main>
  );
}
