/**
 * Maps a Category's `color` token (set via a fixed dropdown in the admin,
 * see backend CategoryResource::COLOR_OPTIONS) to Tailwind classes. Kept as
 * a static lookup with literal class strings — Tailwind's build-time scanner
 * needs to see exact class names in source, it can't resolve a dynamically
 * constructed `bg-${color}` at runtime. Keep this in sync with the backend's
 * COLOR_OPTIONS list whenever a new color is added there.
 */
export const categoryColorClasses: Record<string, string> = {
  forest: "bg-forest text-white",
  sage: "bg-sage text-forest-dark",
  mustard: "bg-mustard text-charcoal",
  "forest-dark": "bg-forest-dark text-white",
};

const FALLBACK = "bg-forest text-white";

export function getCategoryColorClasses(color: string): string {
  return categoryColorClasses[color] ?? FALLBACK;
}
