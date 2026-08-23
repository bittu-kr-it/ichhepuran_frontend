import type { ReactNode } from "react";

type EyebrowColor = "forest" | "mustard";
type EyebrowVariant = "plain" | "badge";

const colorClasses: Record<EyebrowColor, string> = {
  forest: "text-forest",
  mustard: "text-mustard",
};

const badgeColorClasses: Record<EyebrowColor, string> = {
  forest: "border-forest/25 bg-forest/5 text-forest",
  mustard: "border-mustard/40 bg-mustard/10 text-mustard backdrop-blur-sm",
};

/**
 * The small uppercase label above a section heading (used in Hero,
 * CorePillars, Testimonials). `color="mustard"` for dark/photo
 * backgrounds (Hero), `color="forest"` (default) for light backgrounds.
 * `variant="badge"` wraps it in a pill outline for extra emphasis (Hero);
 * `variant="plain"` (default) is just the label, for body sections.
 */
export default function Eyebrow({
  color = "forest",
  variant = "plain",
  children,
}: {
  color?: EyebrowColor;
  variant?: EyebrowVariant;
  children: ReactNode;
}) {
  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] ${badgeColorClasses[color]}`}
      >
        {children}
      </span>
    );
  }

  return (
    <p
      className={`text-sm font-semibold uppercase tracking-[0.2em] ${colorClasses[color]}`}
    >
      {children}
    </p>
  );
}
