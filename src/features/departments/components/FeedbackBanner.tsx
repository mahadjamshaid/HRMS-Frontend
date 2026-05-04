import React from "react";
import type { FeedbackBannerProps } from "../../../types/departmentTypes";

const FeedbackBanner = ({ message, error }: FeedbackBannerProps) => {
  if (!message && !error) return null;

  return (
    <div
      className={`mb-6 p-4 rounded-2xl border ${
        error
          ? "bg-rose-50 border-rose-100 text-rose-600"
          : "bg-emerald-50 border-emerald-100 text-emerald-600"
      }`}
    >
      <p className="text-sm font-black">{error || message}</p>
    </div>
  );
};

export default FeedbackBanner;
