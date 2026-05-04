import React from "react";
import Badge from "../../../components/Badge";
import {
  analyzeShiftForm,
  formatDuration,
  formatShiftTime,
} from "../utils/departmentShift.utils";
import type { ShiftPreviewProps } from "../../../types/departmentTypes";

const ShiftPreview = ({ form, title }: ShiftPreviewProps) => {
  const analysis = analyzeShiftForm(form);
  const breakText =
    form.breakStartTime && form.breakEndTime
      ? `${formatShiftTime(form.breakStartTime)} - ${formatShiftTime(form.breakEndTime)}`
      : "Not set";

  return (
    <div className="space-y-5">
      {title && (
        <p className="text-lg font-black text-slate-900">{title}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Status
        </span>
        <Badge variant={analysis.isOvernight ? "warning" : "primary"}>
          {analysis.isOvernight ? "Overnight" : "Same Day"}
        </Badge>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-bold text-slate-600">
          <span>Start</span>
          <span className="text-slate-900">{formatShiftTime(form.startTime)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-slate-600">
          <span>End</span>
          <span className="text-slate-900">{formatShiftTime(form.endTime)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-slate-600">
          <span>Duration</span>
          <span className="text-slate-900">
            {analysis.durationMinutes ? formatDuration(analysis.durationMinutes) : "--"}
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold text-slate-600">
          <span>Grace</span>
          <span className="text-slate-900">{form.graceMinutes || 0} min</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-slate-600">
          <span>Break</span>
          <span className="text-slate-900">{breakText}</span>
        </div>
      </div>
    </div>
  );
};

export default ShiftPreview;
