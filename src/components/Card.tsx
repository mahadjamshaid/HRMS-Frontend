import React from "react";
import type { CardProps } from "../types/componentType";

export const Card = ({
  title,
  subtitle,
  children,
  compact = false,
  headerAction,
  className = "",
}: CardProps) => {
  const baseClasses = "bg-white border border-slate-100 transition-all";
  const paddingClasses = compact ? "p-8 rounded-[2rem]" : "p-10 rounded-[2.5rem]";
  const shadowClasses = compact 
    ? "shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    : "shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

  return (
    <div className={`${baseClasses} ${paddingClasses} ${shadowClasses} ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className={`flex items-center justify-between ${compact ? 'mb-6' : 'mb-10'}`}>
          <div>
            {title && (
              <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-slate-900 tracking-tight`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm font-bold text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
