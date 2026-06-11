import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border bg-white px-3 py-2 text-stone-900 transition duration-200 outline-none placeholder:text-stone-400 focus:ring-2 ${
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-300 focus:border-violet-500 focus:ring-violet-100"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  );
}
