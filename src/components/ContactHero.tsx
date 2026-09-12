import type { ContactHeroContent } from "@/lib/types";
import UniversalHero from "@/components/UniversalHero";

export default function ContactHero({ content }: { content: ContactHeroContent }) {
  return (
    <UniversalHero 
      headline={content.headline}
      subheading={content.subheading}
      backgroundImage={content.backgroundImage || "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80"}
      defaultAlignment={content.textAlignment || "center"}
      showGlassmorphismButton={content.showGlassmorphismButton ?? true}
    />
  );
}