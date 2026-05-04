import React from "react";
import type { ButtonProps, ButtonSize, ButtonVariant } from "../types/componentType";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none",
  secondary: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm disabled:bg-slate-50 disabled:text-slate-300",
  danger: "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 disabled:bg-slate-50 disabled:text-slate-300",
  ghost: "bg-transparent hover:bg-slate-50 text-slate-600 disabled:text-slate-300"
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base"
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  loading = false, // Destructure to prevent leak to DOM
  disabled = false,
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  const actualLoading = isLoading || loading;
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition-all active:scale-[0.98]";
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const cursorClass = disabled || actualLoading ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${cursorClass} ${className}`}
      disabled={disabled || actualLoading}
      {...props}
    >
      {actualLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
