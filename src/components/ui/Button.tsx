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

/**
 * The one pill-shaped CTA button used across the site (Navbar, Hero,
 * CtaBand). Always use this instead of hand-rolling `rounded-full` link
 * markup, so a design tweak (color, size, hover) only needs to change here.
 */
export default function Button({
  href,
  variant = "primary",
  size = "lg",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full text-center font-semibold ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
