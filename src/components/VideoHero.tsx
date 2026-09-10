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
const BAND_HEIGHT = "h-[78svh] min-h-[30rem]";

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
    <section ref={sectionRef} className={`relative ${BAND_HEIGHT}`}>
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
            <div
              className="absolute inset-0 bg-linear-to-r from-forest-dark/85 via-forest-dark/60 to-forest-dark/30"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-forest-dark/70 via-transparent to-transparent"
              aria-hidden
            />
          </>
        )}
      </div>

      {/* Content — normal flow within the band, sits over the fixed video */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-16">
          <div className="max-w-2xl">
            {content.eyebrow && (
              <Eyebrow color="mustard" variant="badge">
                {content.eyebrow}
              </Eyebrow>
            )}

            {content.headline && (
              <h1 className="mt-4 whitespace-pre-line font-display text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:mt-6 lg:text-6xl">
                {content.headline}
              </h1>
            )}

            {content.subheading && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:mt-6">
                {content.subheading}
              </p>
            )}

            {content.ctas.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 lg:mt-8">
                {content.ctas.map((cta, i) => (
                  <Button
                    key={`${cta.href}-${i}`}
                    href={cta.href}
                    variant={i === 0 ? "primary" : "secondary"}
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/60 sm:flex">
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} />
      </div>
    </section>
  );
}
