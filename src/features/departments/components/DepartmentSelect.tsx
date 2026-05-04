import React from "react";
import type { DepartmentSelectProps } from "../../../types/departmentTypes";

const DepartmentSelect = ({
  departments,
  value,
  onChange,
  disabled = false,
}: DepartmentSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-[13px] font-bold text-slate-700 block ml-1">
        Department
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled || departments.length === 0}
        className="w-full py-3.5 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all"
      >
        {departments.length === 0 ? (
          <option value="">No departments available</option>
        ) : (
          departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default DepartmentSelect;
