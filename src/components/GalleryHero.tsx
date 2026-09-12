import type { GalleryHeroContent } from "@/lib/types";
import UniversalHero from "@/components/UniversalHero";

export default function GalleryHero({ content }: { content: GalleryHeroContent }) {
  return (
    <UniversalHero 
      headline={content.headline}
      subheading={content.subheading}
      backgroundImage={content.backgroundImage || "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80"}
      defaultAlignment={content.textAlignment || "center"}
      showGlassmorphismButton={content.showGlassmorphismButton ?? true}
    />
  );
}