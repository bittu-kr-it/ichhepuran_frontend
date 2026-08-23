import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="bg-forest-dark py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-16">
        <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
          Join the Movement for a Greener Planet
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Your contribution directly funds the planting of saplings, the
          education of children, and the restoration of our precious
          ecosystems. Every wish matters.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/get-involved#donate"
            className="rounded-full bg-mustard px-8 py-4 text-[15px] font-semibold text-charcoal transition-transform hover:scale-[1.03]"
          >
            Donate Now
          </Link>
          <Link
            href="/get-involved#volunteer"
            className="rounded-full border border-white/70 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
