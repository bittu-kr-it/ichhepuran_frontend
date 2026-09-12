import type { ImpactHeroContent } from "@/lib/types";
import UniversalHero from "@/components/UniversalHero";

export default function ImpactHero({ content }: { content: ImpactHeroContent }) {
  return (
    <UniversalHero 
      headline={content.headline}
      subheading={content.subheading}
      backgroundImage={content.backgroundImage || "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80"}
      defaultAlignment={content.textAlignment || "center"}
      showGlassmorphismButton={content.showGlassmorphismButton ?? true}
    />
  );
}