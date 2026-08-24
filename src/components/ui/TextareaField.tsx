import { forwardRef, type TextareaHTMLAttributes } from "react";

const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }
>(({ label, error, className = "", rows = 4, ...rest }, ref) => {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">{label}</span>
      <textarea
        ref={ref}
        rows={rows}
        className={`mt-2 w-full rounded-xl border px-4 py-3 text-[15px] text-charcoal outline-none transition-colors placeholder:text-charcoal-soft/50 focus:border-forest ${
          error ? "border-red-400" : "border-charcoal/15"
        } ${className}`}
        {...rest}
      />
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
});

TextareaField.displayName = "TextareaField";

export default TextareaField;
