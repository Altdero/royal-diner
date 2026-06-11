import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-violet-700 bg-violet-700 text-white hover:bg-violet-800",
  secondary:
    "border-cyan-400 bg-cyan-50 text-cyan-400 hover:border-cyan-500 hover:text-cyan-500",
  ghost:
    "border-slate-400 bg-slate-50 text-slate-400 hover:border-slate-500 hover:text-slate-500",
  danger:
    "border-rose-400 bg-rose-50 text-rose-400 hover:border-rose-500 hover:text-rose-500",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-lg border font-semibold uppercase transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
