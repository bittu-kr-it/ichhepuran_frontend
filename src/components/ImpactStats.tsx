"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ImpactStat } from "@/lib/types";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

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
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function ImpactStats({ stats }: { stats: ImpactStat[] }) {
  const sorted = [...stats].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-forest py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 lg:grid-cols-6 lg:px-16">
        {sorted.map((stat) => {
          const Icon = (Icons[stat.icon as keyof typeof Icons] ??
            Icons.Sparkles) as LucideIcon;
          return (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <Icon className="mb-3 h-7 w-7 text-mustard" strokeWidth={1.75} />
              <span className="font-display text-3xl font-bold text-white">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-xs font-medium leading-snug text-white/75">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
