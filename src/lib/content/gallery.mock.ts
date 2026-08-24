import type { Category, GalleryHeroContent, GalleryItem } from "../types";

// Mirrors backend/database/seeders/GalleryPageSeeder.php's real content
// (captions, categories) but with placeholder image paths — real files
// only exist via the backend's uploaded media (see that seeder's docblock
// for why: this is the first content type whose real images come from a
// client asset pack rather than something already migrated).

export const galleryHeroMock: GalleryHeroContent = {
  headline: "Moments From the Field",
  subheading:
    "A visual record of restoration projects, community events, and everyday work across our operating villages — before, during, and after.",
};

export const galleryCategoriesMock: Category[] = [
  { slug: "before_after", name: "Before & After", color: "forest", order: 1 },
  { slug: "event", name: "Events", color: "mustard", order: 2 },
  { slug: "general", name: "General", color: "sage", order: 3 },
];

const [beforeAfter, event] = galleryCategoriesMock;

export const galleryItemsMock: GalleryItem[] = [
  {
    id: "1",
    image: "/images/gallery-before-after-1.jpg",
    caption: "A reforestation plot before planting — bare, dry earth — and the same site months later, with staked saplings knee-high.",
    category: beforeAfter,
    order: 1,
    isFeatured: true,
  },
  {
    id: "2",
    image: "/images/gallery-before-after-2.jpg",
    caption: "Freshly tilled planting rows growing into a dense line of young trees at the same site.",
    category: beforeAfter,
    order: 2,
    isFeatured: false,
  },
  {
    id: "3",
    image: "/images/gallery-amrit-kund-1.jpg",
    caption: "Amrit Kund pond restoration: a pond fully choked with water hyacinth, cleared and reopened with new steps and marigold-decorated railings. Implemented by Ichhe Puran under the CSR initiative of Tega Industries Limited.",
    category: event,
    order: 3,
    isFeatured: false,
  },
  {
    id: "4",
    image: "/images/gallery-amrit-kund-2.jpg",
    caption: "The Amrit Kund handover event — the hyacinth-covered pond cleared and reopened, with the community gathered for the inauguration.",
    category: event,
    order: 4,
    isFeatured: false,
  },
  {
    id: "5",
    image: "/images/gallery-before-after-5.jpg",
    caption: "A mango sapling planted near a field grows into a mature, fruiting tree — the same farmer standing beside it years later.",
    category: beforeAfter,
    order: 5,
    isFeatured: false,
  },
  {
    id: "6",
    image: "/images/gallery-before-after-6.jpg",
    caption: "Women desilting a garbage-choked village pond, and the same pond afterward — cleared, with the removed debris bagged at the bank.",
    category: beforeAfter,
    order: 6,
    isFeatured: false,
  },
];
