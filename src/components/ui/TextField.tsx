import { forwardRef, type InputHTMLAttributes } from "react";

// Small, shared input+label+error styling — not a generic schema-driven
// form builder. Native props spread through so react-hook-form's
// register() output attaches directly (register returns { name, onChange,
// onBlur, ref }, all of which are valid <input> props).
const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }
>(({ label, error, className = "", ...rest }, ref) => {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">{label}</span>
      <input
        ref={ref}
        className={`mt-2 w-full rounded-xl border px-4 py-3 text-[15px] text-charcoal outline-none transition-colors placeholder:text-charcoal-soft/50 focus:border-forest ${
          error ? "border-red-400" : "border-charcoal/15"
        } ${className}`}
        {...rest}
      />
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
});

TextField.displayName = "TextField";

export default TextField;
