import React, { useEffect } from "react";
import type { ModalProps } from "../types/componentType";

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-md",
  className = "",
}: ModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Don’t render if closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-[2rem] shadow-2xl transition-all animate-in zoom-in-95 duration-200 ${className}`}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="px-8 py-6 border-b border-slate-100 flex items-start justify-between">
            <div>
              {title && (
                <h3 className="text-xl font-black text-slate-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm font-bold text-slate-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
