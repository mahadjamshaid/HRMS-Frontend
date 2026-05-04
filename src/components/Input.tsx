import React, { forwardRef } from "react";
import type { InputProps } from "../types/componentType";

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = "",
  containerClassName = "",
  ...props
}, ref) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="text-[13px] font-bold text-slate-700 block ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-5 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full py-3.5 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:bg-white transition-all placeholder:text-slate-400 text-slate-800 font-medium ${
            icon ? "pl-12 pr-5" : "px-5"
          } ${
            error 
              ? "border-rose-200 focus:ring-rose-500/10 focus:border-rose-500" 
              : "border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500"
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-bold text-rose-500 ml-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
