import React from "react";

import Input from "../../../components/Input";
import { AttendanceFiltersProps } from "../../../types/attendanceFilterType";

const AttendanceFilters = ({ dateFilter, setDateFilter, statusFilter, setStatusFilter, setAttendancePage }: AttendanceFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input 
                type="date" 
                value={dateFilter}
                onChange={(e) => { setDateFilter(e.target.value); setAttendancePage(1); }}
                containerClassName="flex-1"
            />
            <div className="flex-1 space-y-2">
                <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setAttendancePage(1); }}
                    className="w-full py-3.5 px-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
                >
                    <option value="">All Statuses</option>
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                </select>
            </div>
        </div>
    );
};

export default AttendanceFilters;
