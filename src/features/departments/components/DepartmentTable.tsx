import React from "react";
import Badge from "../../../components/Badge";
import {
  formatDuration,
  formatShiftTime,
} from "../utils/departmentShift.utils";
import type { DepartmentTableProps } from "../../../types/departmentTypes";

const DepartmentTable = ({ departments, loading }: DepartmentTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-50">
            {["Department", "Shift Time", "Duration", "Grace", "Break", "Status"].map((heading) => (
              <th key={heading} className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {loading ? (
            <tr>
              <td colSpan={6} className="py-6 text-center text-sm font-bold text-slate-400">
                Loading...
              </td>
            </tr>
          ) : departments.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-6 text-center text-sm font-bold text-slate-400">
                No departments found.
              </td>
            </tr>
          ) : (
            departments.map((department) => {
              const shift = department.assignedShift;
              return (
                <tr key={department.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6">
                    <p className="text-sm font-black text-slate-900">{department.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {department.description}
                    </p>
                  </td>
                  <td className="py-6 text-sm font-black text-slate-900">
                    {formatShiftTime(shift?.startTime)} - {formatShiftTime(shift?.endTime)}
                  </td>
                  <td className="py-6 text-sm font-bold text-slate-600">
                    {shift?.durationMinutes ? formatDuration(shift.durationMinutes) : "--"}
                  </td>
                  <td className="py-6 text-sm font-bold text-slate-600">
                    {shift?.graceMinutes ?? 0} min
                  </td>
                  <td className="py-6 text-sm font-bold text-slate-600">
                    {shift?.breakMinutes ? `${shift.breakMinutes} min` : "Not set"}
                  </td>
                  <td className="py-6">
                    <Badge variant={shift?.isOvernight ? "warning" : "success"}>
                      {shift?.isOvernight ? "Overnight" : "Active"}
                    </Badge>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
