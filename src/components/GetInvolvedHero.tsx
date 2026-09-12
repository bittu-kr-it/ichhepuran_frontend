import type { GetInvolvedHeroContent } from "@/lib/types";
import UniversalHero from "@/components/UniversalHero";

export default function GetInvolvedHero({ content }: { content: GetInvolvedHeroContent }) {
  return (
    <UniversalHero 
      headline={content.headline}
      subheading={content.subheading}
      backgroundImage={content.backgroundImage || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"}
      defaultAlignment={content.textAlignment || "center"}
      showGlassmorphismButton={content.showGlassmorphismButton ?? true}
    />
  );
}