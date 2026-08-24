import { Building2, Globe2, QrCode } from "lucide-react";
import Image from "next/image";
import type { DonationMethod, SectionHeading } from "@/lib/types";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const TYPE_ICONS = { bank: Building2, upi: QrCode, international: Globe2 } as const;

export default function DonationMethodsSection({
  methods,
  heading,
  hideHeading = false,
}: {
  methods: DonationMethod[];
  heading: SectionHeading;
  // The Get Involved page already shows this section's heading above the
  // Razorpay donate form right before this section — passing the same
  // `heading` prop again there would duplicate it, so that page renders
  // this with hideHeading instead of a second Eyebrow/h2.
  hideHeading?: boolean;
}) {
  const sorted = [...methods].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-pale-green py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        {!hideHeading && (
          <Reveal className="max-w-2xl">
            <Eyebrow>{heading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-charcoal lg:text-4xl">
              {heading.heading}
            </h2>
          </Reveal>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sorted.map((method, index) => {
            const Icon = TYPE_ICONS[method.type] ?? Building2;
            return (
              <Reveal key={method.id} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10">
                    <Icon className="h-5 w-5 text-forest" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">
                    {method.title}
                  </h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    {Object.entries(method.fields).map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3">
                        <dt className="text-charcoal-soft">{label}</dt>
                        <dd className="text-right font-medium text-charcoal">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {method.qrImage && (
                    <Image
                      src={method.qrImage}
                      alt={method.qrImageAlt ?? `${method.title} QR code`}
                      width={128}
                      height={128}
                      className="mt-4 h-32 w-32 self-center rounded-lg object-contain"
                    />
                  )}
                  {method.instructions && (
                    <p className="mt-4 text-xs leading-relaxed text-charcoal-soft">
                      {method.instructions}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
