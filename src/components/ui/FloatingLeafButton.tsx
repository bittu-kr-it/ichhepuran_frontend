import type { ReactNode } from "react";
import styles from "./FloatingLeafButton.module.css";
import { Leaf1, Leaf2, Leaf3, Leaf4, Leaf5 } from "./LeafIcons";

/**
 * A floating pill button shaped like a little plant pot — on hover its
 * bottom corners round out and five leaves sprout above it. Used by the
 * floating WhatsApp / e-book buttons (see FloatingActions.tsx) to tie the
 * site's "restoring ecosystems" branding into its own chrome, not just its
 * content sections. Motion lives in FloatingLeafButton.module.css (adapted
 * from a Uiverse.io design), colors are passed in as Tailwind classes so
 * each caller can use its own on-brand palette.
 *
 * The pot's own background/label live on an INNER `.pot` span, not the
 * outer `<a>` — a stacking context's own background always paints behind
 * its negative-z-index children (CSS2.1 Appendix E), so a leaf can never
 * be hidden behind its own direct parent's background. Layering the pot
 * as a separate, later, higher-z-index sibling of the leaves is what
 * actually lets the pot's body cover each leaf's stem base, so the leaves
 * read as sprouting from inside the pot instead of floating in front of it.
 */
export default function FloatingLeafButton({
  href,
  icon,
  label,
  ariaLabel,
  className = "",
}: {
  href: string;
  icon: ReactNode;
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={styles.wrap}>
      <div className={`${styles.iconWrap} ${styles.iconWrap1}`}>
        <Leaf1 />
      </div>
      <div className={`${styles.iconWrap} ${styles.iconWrap2}`}>
        <Leaf2 />
      </div>
      <div className={`${styles.iconWrap} ${styles.iconWrap3}`}>
        <Leaf3 />
      </div>
      <div className={`${styles.iconWrap} ${styles.iconWrap4}`}>
        <Leaf4 />
      </div>
      <div className={`${styles.iconWrap} ${styles.iconWrap5}`}>
        <Leaf5 />
      </div>

      <span className={`${styles.pot} px-4 py-2.5 text-sm font-semibold shadow-lg shadow-black/20 ${className}`}>
        {icon}
        <span>{label}</span>
      </span>
    </a>
  );
}
