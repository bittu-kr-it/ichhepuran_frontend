"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Alignment = "left" | "center" | "right";

export interface UniversalHeroProps {
  headline: string;
  subheading: string;
  backgroundImage?: string | null;
  defaultAlignment?: Alignment;
  showGlassmorphismButton?: boolean;
}

export default function UniversalHero({
  headline,
  subheading,
  backgroundImage,
  defaultAlignment = "center",
  showGlassmorphismButton = true,
}: UniversalHeroProps) {
  const [alignment, setAlignment] = useState<Alignment>(defaultAlignment);

  // Cycle through alignments
  const toggleAlignment = () => {
    if (alignment === "left") setAlignment("center");
    else if (alignment === "center") setAlignment("right");
    else setAlignment("left");
  };

  const getAlignmentClasses = () => {
    switch (alignment) {
      case "left":
        return "text-left items-start mr-auto";
      case "right":
        return "text-right items-end ml-auto";
      case "center":
      default:
        return "text-center items-center mx-auto";
    }
  };

  return (
    <section className="relative isolate flex min-h-[500px] lg:min-h-[600px] w-full items-center overflow-hidden bg-forest-dark">
      {/* Background Image / Color Layer */}
      {backgroundImage ? (
        <div className="absolute inset-0 -z-20">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        // Fallback stunning gradient if no image is provided
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-forest-dark via-forest to-sage" />
      )}

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-dark/70 via-forest-dark/40 to-forest-dark/90" />

      {/* Glassmorphism Toggle Button Group (Floating top right) */}
      {showGlassmorphismButton && (
        <div className="absolute top-24 right-6 lg:top-32 lg:right-16 z-20">
          <button
            onClick={toggleAlignment}
            className="group relative flex items-center justify-center rounded-full p-[2px] overflow-hidden transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 focus-visible:ring-offset-forest-dark"
            aria-label="Toggle text alignment"
          >
            {/* Animated Gradient Border Layer */}
            <span 
              className="absolute inset-[0px] animate-[spin_4s_linear_infinite] rounded-full" 
              style={{ background: "conic-gradient(from 90deg at 50% 50%, #F3A712 0%, #4A6B53 50%, #E9F1E8 100%)" }}
            />
            
            {/* Glassmorphism Inner Button */}
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-forest-dark/30 backdrop-blur-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors group-hover:bg-forest-dark/50">
              <motion.div
                key={alignment}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {alignment === "left" && <AlignLeft className="h-5 w-5 text-mustard" />}
                {alignment === "center" && <AlignCenter className="h-5 w-5 text-mustard" />}
                {alignment === "right" && <AlignRight className="h-5 w-5 text-mustard" />}
              </motion.div>
            </span>
          </button>
        </div>
      )}

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-16 z-10">
        <Reveal>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`flex max-w-3xl flex-col ${getAlignmentClasses()}`}
          >
            <h1 className="font-display text-5xl font-black leading-[1.08] text-white lg:text-7xl drop-shadow-md">
              {headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90 drop-shadow-sm sm:text-xl">
              {subheading}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
