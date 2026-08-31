"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Leaf } from "lucide-react";
import Image from "next/image";
import type { HeroCarouselSettings, HeroSlide } from "@/lib/types";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

const AUTOPLAY_INTERVAL_MS = 6000;
const SWIPE_THRESHOLD = 50;
const TRANSITION_DURATION = 0.7;

// Admin-managed carousel (see HeroSlideResource / ManageHeroCarouselSettings
// in the backend) — replaces the old single fixed Hero section. Every slide
// is permanently mounted and stacked absolutely, crossfading via framer-
// motion's plain opacity animation (no new dependency) rather than
// AnimatePresence's mount/unmount — see the comment above the background
// layer for why that distinction matters for the <h1> rule below. Autoplays
// with a pause on hover/focus/touch, and disables all motion for
// prefers-reduced-motion.
export default function Hero({
  slides,
  settings,
}: {
  slides: HeroSlide[];
  settings: HeroCarouselSettings;
}) {
  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);
  const firstSlideId = sortedSlides[0]?.id;
  const hasMultiple = sortedSlides.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const activeSlide = sortedSlides[activeIndex];

  function goTo(index: number) {
    setActiveIndex((index + sortedSlides.length) % sortedSlides.length);
  }
  function goPrev() {
    goTo(activeIndex - 1);
  }
  function goNext() {
    goTo(activeIndex + 1);
  }

  // Autoplay — off entirely under reduced motion, paused while the user is
  // hovering, focused inside, or touching the carousel.
  useEffect(() => {
    if (shouldReduceMotion || isPaused || !hasMultiple) return;
    const id = setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused, shouldReduceMotion, hasMultiple]);

  // Keyboard nav is scoped to only fire while the carousel is already
  // hovered/focused/touched (isPaused) — unlike GalleryLightbox's modal
  // (which owns all keyboard input unconditionally while open), Hero is a
  // permanently-mounted homepage section, so an unconditional document-level
  // listener would hijack arrow keys sitewide.
  useEffect(() => {
    if (!isPaused || !hasMultiple) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, activeIndex, hasMultiple]);

  if (!activeSlide) return null;

  const fadeTransition = { duration: shouldReduceMotion ? 0 : TRANSITION_DURATION, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      // 100dvh (not 100vh) so mobile browser chrome showing/hiding doesn't
      // leave the bottom of the carousel cut off; minus the Navbar's fixed
      // h-20 (see Navbar.tsx) so this fills exactly what's left below it.
      // max(..., 34rem) is a floor for very short/landscape viewports so
      // text and controls never get crushed.
      className="relative isolate min-h-[max(34rem,calc(100dvh-5rem))] overflow-hidden bg-sage"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={(e) => {
        setIsPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || !hasMultiple) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > SWIPE_THRESHOLD) {
          if (delta < 0) goNext();
          else goPrev();
        }
        touchStartX.current = null;
      }}
    >
      {/* Background layer — every slide is permanently mounted and stacked
          absolutely, with only opacity toggled by which one is active. This
          (rather than mounting/unmounting via AnimatePresence) is what makes
          the crossfade work AND keeps slide 1's <h1> (see the content layer
          below) always present in the DOM — an AnimatePresence exit fully
          removes a slide's markup once its exit animation finishes, which
          would otherwise make the page's one <h1> disappear entirely
          whenever any other slide is showing. */}
      {sortedSlides.map((slide, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.div
            key={`bg-${slide.id}`}
            className={`absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={fadeTransition}
            aria-hidden={!isActive}
            inert={!isActive}
          >
            {slide.backgroundImage ? (
              <Image
                src={slide.backgroundImage}
                alt={slide.backgroundImageAlt ?? ""}
                fill
                priority={slide.id === firstSlideId}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              // No photo uploaded for this slide yet — plain color fallback,
              // same graceful-degradation pattern used elsewhere in the project.
              <div className="absolute inset-0 bg-sage" />
            )}
          </motion.div>
        );
      })}

      {settings.gradientOverlay && (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-r from-forest-dark/85 via-forest-dark/60 to-forest-dark/30"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent"
            aria-hidden
          />
        </>
      )}

      {/* Text layer — same always-mounted, opacity-toggled treatment as the
          background (see comment above). Slide 1's headline is the only one
          ever wrapped in <h1> — since it's never unmounted, exactly one <h1>
          exists on this page at all times, regardless of which slide is
          currently active. */}
      {sortedSlides.map((slide, i) => {
        const isActive = i === activeIndex;
        const isFirstSlide = slide.id === firstSlideId;
        return (
          <motion.div
            key={`content-${slide.id}`}
            className={`absolute inset-0 z-10 flex items-center ${isActive ? "" : "pointer-events-none"}`}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={fadeTransition}
            aria-hidden={!isActive}
            inert={!isActive}
          >
            {/* py-12 (not py-24) below lg: with the shorter, viewport-driven
                section height, the old fixed py-24 could push content tall
                enough to clip against overflow-hidden on short screens. */}
            <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-16 lg:py-24">
              <div className="max-w-2xl">
                <Eyebrow color="mustard" variant="badge">
                  {slide.eyebrow}
                </Eyebrow>

                {isFirstSlide ? (
                  <h1 className="mt-4 whitespace-pre-line font-display text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:mt-6 lg:text-7xl">
                    {slide.headline}
                  </h1>
                ) : (
                  <p className="mt-4 whitespace-pre-line font-display text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:mt-6 lg:text-7xl">
                    {slide.headline}
                  </p>
                )}

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:mt-6">
                  {slide.subheading}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 lg:mt-10">
                  <Button href={slide.primaryCtaHref}>{slide.primaryCtaLabel}</Button>
                  <Button href={slide.secondaryCtaHref} variant="secondary">
                    {slide.secondaryCtaLabel}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {hasMultiple && (
        <>
          {/* No visible prev/next controls, per explicit request — indicator
              dots, swipe, and keyboard (while hovered/focused) remain. */}
          <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {sortedSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className="flex items-center justify-center p-1.5"
              >
                <IndicatorMark active={i === activeIndex} style={settings.indicatorStyle} />
              </button>
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/60 sm:flex">
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} />
      </div>
    </section>
  );
}

// The 4 admin-selectable indicator styles (ManageHeroCarouselSettings) —
// circle/dot/dash are plain styled spans, plant reuses lucide-react's Leaf
// (already a dependency, already used in Navbar.tsx).
function IndicatorMark({
  active,
  style,
}: {
  active: boolean;
  style: HeroCarouselSettings["indicatorStyle"];
}) {
  if (style === "plant") {
    return (
      <Leaf
        className={`h-4 w-4 transition-all ${active ? "scale-110 text-mustard" : "text-white/40"}`}
        strokeWidth={1.75}
        fill={active ? "currentColor" : "none"}
      />
    );
  }
  if (style === "dash") {
    return (
      <span className={`block rounded-full transition-all ${active ? "h-1 w-8 bg-white" : "h-1 w-4 bg-white/50"}`} />
    );
  }
  if (style === "circle") {
    return (
      <span
        className={`block h-2.5 w-2.5 rounded-full border-2 transition-all ${
          active ? "border-white bg-white" : "border-white/70 bg-transparent"
        }`}
      />
    );
  }
  // "dot" — default
  return (
    <span
      className={`block rounded-full bg-white transition-all ${active ? "h-2.5 w-2.5 opacity-100" : "h-2 w-2 opacity-50"}`}
    />
  );
}
