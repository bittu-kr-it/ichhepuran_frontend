"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ImpactStat } from "@/lib/types";
import BlobAccent from "@/components/ui/BlobAccent";
import Reveal from "@/components/ui/Reveal";

// Native IntersectionObserver + a timeout fallback, not framer-motion's
// useInView — same reasoning as ui/Reveal.tsx: a report of this section
// staying stuck (counters frozen at 0, in this component's case) for a
// visitor scrolling normally wasn't reproducible in this project's own
// dev/test browser, so the count-up shouldn't depend on one particular
// animation library's observer wiring succeeding to ever run at all.
function Counter({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px 0px -80px 0px" }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setInView(true), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out for a natural deceleration into the final number
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function ImpactStats({ stats }: { stats: ImpactStat[] }) {
  const sorted = [...stats].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden bg-forest py-20">
      <BlobAccent color="mustard" opacity={0.08} className="-top-16 -left-16 h-72 w-72" />
      <BlobAccent color="sage" opacity={0.1} className="-bottom-20 -right-16 h-80 w-80" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 lg:grid-cols-6 lg:gap-y-0 lg:px-16">
        {sorted.map((stat, index) => {
          const Icon = (Icons[stat.icon as keyof typeof Icons] ??
            Icons.Sparkles) as LucideIcon;
          return (
            <Reveal
              key={stat.id}
              delay={index * 0.08}
              className="flex flex-col items-center border-white/10 px-2 text-center lg:border-l lg:first:border-l-0"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-6 w-6 text-mustard" strokeWidth={1.75} />
              </span>
              <span className="mt-4 font-display text-4xl font-bold text-white">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-wide leading-snug text-white/70">
                {stat.label}
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
