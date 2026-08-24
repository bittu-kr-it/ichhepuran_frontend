import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getLegalPage } from "@/lib/api";

// Root-level dynamic route so legal page URLs are clean (/privacy-policy,
// not /legal/privacy-policy). Next.js always resolves an explicit static
// route (/about, /contact, etc.) before falling through to this one, so
// this only ever actually renders for slugs with no matching static page
// — currently just the 3 seeded legal pages. If a future legal page's
// admin-chosen slug collides with a real route name (e.g. "about"), the
// static page wins and silently shadows it — worth knowing if a legal
// page ever mysteriously 404s or shows the wrong content.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  return { title: page.title };
}

export default async function LegalPageDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <section className="bg-pale-green pt-32 pb-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-16">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-forest-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="mt-5 font-display text-4xl font-black leading-tight text-charcoal lg:text-5xl">
              {page.title}
            </h1>
            <p className="mt-3 text-sm text-charcoal-soft">
              Last updated:{" "}
              {new Date(page.updatedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-16">
          <Reveal>
            <div
              className="prose prose-lg max-w-none text-charcoal prose-headings:font-display prose-headings:text-charcoal prose-a:text-forest"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
