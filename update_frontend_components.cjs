const fs = require('fs');
const path = require('path');

const componentsDir = 'src/components';
const defaultImages = {
    'AboutHero': "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    'ContactHero': "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80",
    'GalleryHero': "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80",
    'GetInvolvedHero': "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80",
    'ImpactHero': "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80",
    'InitiativesHero': "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80",
}

Object.keys(defaultImages).forEach(hero => {
    const compPath = path.join(componentsDir, `${hero}.tsx`);
    if (fs.existsSync(compPath)) {
        const content = `import type { ${hero}Content } from "@/lib/types";
import UniversalHero from "@/components/UniversalHero";

export default function ${hero}({ content }: { content: ${hero}Content }) {
  return (
    <UniversalHero 
      headline={content.headline}
      subheading={content.subheading}
      backgroundImage={content.backgroundImage || "${defaultImages[hero]}"}
      defaultAlignment={content.textAlignment || "center"}
      showGlassmorphismButton={content.showGlassmorphismButton ?? true}
    />
  );
}`;
        fs.writeFileSync(compPath, content);
        console.log(`Updated ${compPath}`);
    }
});
