"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { HomeVideoHeroContent } from "@/lib/types";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

// Optional video band at the very top of the Home page, above the hero
// carousel. Admin-managed via /admin/home-video-hero (App\Models\HomeVideoHero).
//
// Scroll behaviour: the video is NOT full height and it does NOT scroll away
// with the section. Its media layer is `position: fixed`, so the footage
// stays pinned in place while you scroll; the opaque carousel below then
// rises up and covers it. An IntersectionObserver switches the fixed layer
// (and video playback) off once the band has left the viewport, so it isn't
// sitting behind the rest of the page.
//
// Renders nothing unless enabled AND there's something to show. Motion is
// respected: prefers-reduced-motion shows the poster image, not video.

// Visible height of the band — deliberately less than the viewport. The
// fixed media layer itself always fills the whole viewport (so there's no
// gap under the sticky navbar); the carousel below simply scrolls up and
// covers everything past this height.
const BAND_HEIGHT = "h-[max(34rem,calc(100dvh-5rem))] min-h-[30rem]";

export default function VideoHero({ content }: { content: HomeVideoHeroContent }) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(true);

  const src = content.video ?? content.videoUrl;
  const showVideo = !!src && !shouldReduceMotion;

  // Pin the fixed layer only while the band is near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "10% 0px 10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause with visibility + reduced motion. Browsers also often need a
  // manual play() after hydration for a React-set source.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    if (active) {
      video.play().catch(() => {
        /* autoplay blocked — poster frame stays visible, which is fine */
      });
    } else {
      video.pause();
    }
  }, [active, showVideo]);

  if (!content.enabled) return null;
  if (!src && !content.poster) return null;

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${BAND_HEIGHT}`}>
      {/* Fixed media layer — fills the viewport and stays pinned while the
          page scrolls. -z-10 keeps it behind the page's in-flow content;
          every section below this band is opaque, so the video is only ever
          seen through this (transparent) band and during the scroll away. */}
      <div
        aria-hidden
        className={`fixed inset-0 -z-10 overflow-hidden bg-forest-dark transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {showVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={src ?? undefined}
            poster={content.poster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : content.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={content.poster}
            alt={content.posterAlt ?? ""}
          />
        ) : null}

        {content.overlay && (
          <>
            {/* Even wash + a top/bottom vignette — symmetric, for the
                centered content. */}
            <div className="absolute inset-0 bg-forest-dark/55" aria-hidden />
            <div
              className="absolute inset-0 bg-linear-to-b from-forest-dark/60 via-transparent to-forest-dark/60"
              aria-hidden
            />
          </>
        )}
      </div>

      {/* Content — normal flow within the band, sits over the fixed video,
          centered both axes. */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-12 text-center lg:max-w-4xl lg:px-16 xl:max-w-6xl">
          {content.eyebrow && (
            <Eyebrow color="mustard" variant="badge">
              {content.eyebrow}
            </Eyebrow>
          )}

          {content.headline && (
            // Outlined display type — transparent fill, white stroke, so
            // the video shows through the letters. Stroke width scales with
            // the font so it doesn't look hairline on big screens.
            <h1
              className="mt-4 whitespace-pre-line font-display text-4xl font-black leading-[1.08] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.95)] sm:text-5xl sm:[-webkit-text-stroke-width:2px] lg:mt-6 lg:text-7xl lg:[-webkit-text-stroke-width:2.5px] xl:text-8xl xl:[-webkit-text-stroke-width:3px]"
            >
              {content.headline}
            </h1>
          )}

          {content.subheading && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg lg:max-w-2xl lg:text-xl xl:max-w-3xl xl:text-2xl">
              {content.subheading}
            </p>
          )}

          {content.ctas.length > 0 && (
            <div className="mt-7 flex flex-wrap justify-center gap-4 lg:mt-10">
              {content.ctas.map((cta, i) => (
                // All ghost-style over the video — white outline, transparent
                // fill — matching the reference site's hero.
                <Button
                  key={`${cta.href}-${i}`}
                  href={cta.href}
                  variant="secondary"
                  className="xl:px-10 xl:py-5 xl:text-base"
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/60 sm:flex">
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} />
      </div>
    </section>
  );
}
