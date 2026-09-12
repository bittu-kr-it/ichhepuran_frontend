const fs = require('fs');
const path = require('path');

const typesFile = 'src/lib/types.ts';

const heroes = [
    'AboutHero',
    'ContactHero',
    'GalleryHero',
    'GetInvolvedHero',
    'ImpactHero',
    'InitiativesHero'
];

if (fs.existsSync(typesFile)) {
    let content = fs.readFileSync(typesFile, 'utf8');
    
    heroes.forEach(hero => {
        const interfaceDeclaration = `export interface ${hero}Content {
  headline: string;
  subheading: string;
}`;
        const newInterfaceDeclaration = `export interface ${hero}Content {
  headline: string;
  subheading: string;
  backgroundImage?: string | null;
  textAlignment?: "left" | "center" | "right";
  showGlassmorphismButton?: boolean;
}`;
        if (content.includes(interfaceDeclaration)) {
            content = content.replace(interfaceDeclaration, newInterfaceDeclaration);
            console.log(`Updated ${hero}Content in types.ts`);
        } else {
            console.log(`Could not find exact match for ${hero}Content`);
        }
    });

    fs.writeFileSync(typesFile, content);
}
