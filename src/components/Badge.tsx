import React from "react";
import type { BadgeVariant, BadgeProps } from "../types/componentType";

const variants: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-rose-50 text-rose-600",
  neutral: "bg-slate-50 text-slate-600",
  primary: "bg-indigo-50 text-indigo-600"
};

const Badge = ({
  children,
  variant = "neutral",
  className = "",
}:BadgeProps) => {
  const baseClasses = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight";
  const variantClasses = variants[variant] || variants.neutral;

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
