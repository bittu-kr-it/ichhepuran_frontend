"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Fade + slide-up on scroll into view. Used to give every section a bit of
 * entrance polish instead of just popping into place. Respects the user's
 * reduced-motion preference (in addition to the site-wide CSS rule in
 * globals.css, which only covers CSS transitions, not Framer Motion).
 *
 * Drives its own IntersectionObserver + `animate` instead of Framer
 * Motion's declarative `whileInView`, plus a hard timeout fallback that
 * forces the section visible if it hasn't revealed on its own within 4s of
 * mounting. `whileInView` alone left a real report of sections stuck
 * permanently at `opacity: 0` for a visitor scrolling normally in their
 * own browser (not reproducible in this project's own dev/test browser) —
 * whatever the exact cause on their end (extension, browser quirk,
 * hydration timing), page content should never depend on one animation
 * API succeeding to be readable at all.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px 0px -80px 0px" }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
