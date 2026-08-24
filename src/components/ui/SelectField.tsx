import { forwardRef, type SelectHTMLAttributes } from "react";

const SelectField = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
  }
>(({ label, error, options, placeholder, className = "", ...rest }, ref) => {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">{label}</span>
      <select
        ref={ref}
        defaultValue=""
        // See TextField.tsx's comment — browser extensions injecting
        // attributes before hydration, not an app bug.
        suppressHydrationWarning
        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-charcoal outline-none transition-colors focus:border-forest ${
          error ? "border-red-400" : "border-charcoal/15"
        } ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
});

SelectField.displayName = "SelectField";

export default SelectField;
