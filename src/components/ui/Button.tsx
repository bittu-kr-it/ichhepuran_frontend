import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-mustard text-charcoal shadow-lg shadow-black/10 transition-transform hover:scale-[1.03]",
  secondary:
    "border border-white/70 text-white transition-colors hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

// Two mutually-exclusive modes: an `href` link (the original, still the
// common case across Navbar/Hero/CtaBand) or a real `<button>` for form
// submit / "Pay Now" triggers, which need onClick/disabled and can't be
// a next/link. Discriminated union keeps the two shapes from being mixed.
type ButtonProps =
  | (SharedProps & { href: string; type?: never; onClick?: never; disabled?: never })
  | (SharedProps & { href?: undefined; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean });

/**
 * The one pill-shaped CTA button used across the site (Navbar, Hero,
 * CtaBand, and now forms). Always use this instead of hand-rolling
 * `rounded-full` link/button markup, so a design tweak (color, size,
 * hover) only needs to change here.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", className = "", children } = props;
  const classes = `rounded-full text-center font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      // Browser extensions inject attributes into form controls before
      // React hydrates (see TextField.tsx's comment) — not an app bug.
      suppressHydrationWarning
      className={`${classes} disabled:pointer-events-none disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
