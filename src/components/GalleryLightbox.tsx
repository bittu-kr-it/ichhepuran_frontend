"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

const SWIPE_THRESHOLD = 50;

// Navigates within whatever list it's given (the currently filtered set,
// passed down from GalleryGrid) — not the full unfiltered gallery, so
// prev/next stays consistent with what's on screen. Wraps around at both
// ends rather than disabling the buttons at the boundary.
export default function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const item = items[index];
  const hasMultiple = items.length > 1;
  const touchStartX = useRef<number | null>(null);

  function goPrev() {
    onNavigate((index - 1 + items.length) % items.length);
  }

  function goNext() {
    onNavigate((index + 1) % items.length);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-6"
      onClick={onClose}
      onTouchStart={(e) => {
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
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <div className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.id}
            src={item.image}
            alt={item.imageAlt ?? item.caption ?? "Gallery photo"}
            className="max-h-[75vh] w-auto rounded-2xl object-contain"
          />
        )}
        {item.caption && <p className="mt-4 text-center text-white/90">{item.caption}</p>}
        {hasMultiple && (
          <p className="mt-2 text-center text-sm text-white/50">
            {index + 1} / {items.length}
          </p>
        )}
      </div>
    </div>
  );
}
