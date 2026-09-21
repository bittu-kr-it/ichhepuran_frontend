import type { CSSProperties, ReactNode } from "react";
import styles from "./GlassIconButton.module.css";

/**
 * Round, frosted-glass floating icon button with an ambient pulsing glow
 * in the caller's brand color. `href` starting with "tel:" opens the
 * dialer in-page (no target/rel needed); anything else opens in a new
 * tab, same convention as FloatingLeafButton.
 */
export default function GlassIconButton({
  href,
  icon,
  ariaLabel,
  glowColor,
  size = 56,
}: {
  href: string;
  icon: ReactNode;
  ariaLabel: string;
  glowColor: string;
  size?: number;
}) {
  const isTel = href.startsWith("tel:");

  return (
    <a
      href={href}
      target={isTel ? undefined : "_blank"}
      rel={isTel ? undefined : "noopener noreferrer"}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={styles.wrap}
      style={{ width: size, height: size, "--glow-color": glowColor } as CSSProperties}
    >
      <span className={styles.glass}>{icon}</span>
    </a>
  );
}
