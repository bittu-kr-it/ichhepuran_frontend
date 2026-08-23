type BlobColor = "sage" | "mustard" | "forest";

const fillClasses: Record<BlobColor, string> = {
  sage: "fill-sage",
  mustard: "fill-mustard",
  forest: "fill-forest",
};

/**
 * Purely decorative organic blob shape, dropped behind section content at
 * low opacity to break up flat color bands. Absolutely positioned by the
 * caller via `className` (e.g. "-top-24 -right-24 h-80 w-80").
 */
export default function BlobAccent({
  color = "sage",
  opacity = 0.12,
  className = "",
}: {
  color?: BlobColor;
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <path
        className={fillClasses[color]}
        d="M45.3,-58.5C58.5,-49.6,68.8,-34.8,72.8,-18.3C76.8,-1.8,74.5,16.4,66.2,31.4C57.9,46.4,43.7,58.2,27.5,64.9C11.4,71.6,-6.8,73.1,-23.6,68.5C-40.4,63.8,-55.9,53,-64.8,38.1C-73.7,23.2,-76.1,4.2,-72.1,-12.9C-68.1,-30.1,-57.8,-45.4,-44.1,-54.4C-30.4,-63.4,-15.2,-66.1,1.3,-67.7C17.8,-69.3,35.6,-69.7,45.3,-58.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
