import React from "react";
import AttendanceTable from "./AttendanceTable";
import WorkHoursWidget from "./WorkHoursWidget";
import { formatTimeInTimezone, formatLongDate, formatWeekday } from "../../../utils/dateUtils";
import Badge from "../../../components/Badge";
import type { Column } from "../../../types/attendanceTableType";
import type { AttendanceRecord, AttendanceViewEmployeeProps } from "../../../types/attendanceTypes";

const AttendanceViewEmployee = ({
    data,
    loading,
    page = 1,
    totalPages,
    onPageChange,
    limit,
}: AttendanceViewEmployeeProps) => {
    const displayData = typeof limit === "number" ? data.slice(0, limit) : data;

    const employeeColumns: Column<AttendanceRecord>[] = [
        {
            header: "Date",
            render: (record) => (
                <>
                    <p className="text-sm font-black text-slate-900">{formatLongDate(record.attendanceDate)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{formatWeekday(record.attendanceDate)}</p>
                </>
            )
        },
        {
            header: "In / Out",
            render: (record) => (
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-900">{record.checkInTime || "--:--"}</span>
                    <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    <span className="text-sm font-black text-slate-900">{record.checkOutTime || "--:--"}</span>
                </div>
            )
        },
        {
            header: "Status",
            render: (record) => (
                <Badge 
                    variant={
                        record.status === 'Present' ? 'success' : 
                        record.status === 'Late' ? 'warning' : 
                        record.status === 'HalfDay' ? 'neutral' :
                        record.status === 'ShortDay' ? 'danger' : 'danger'
                    }
                >
                    {record.status}
                </Badge>
            )
        },
        {
            header: "Work Hours",
            className: "text-right",
            cellClassName: "text-right",
            render: (record) => <WorkHoursWidget 
                checkInTime={record.checkInTime} 
                checkOutTime={record.checkOutTime} 
                checkInTimeRaw={record.checkInTimeRaw}
                checkOutTimeRaw={record.checkOutTimeRaw}
                workMinutes={record.workMinutes} 
            />
        }
    ];

    return (
        <AttendanceTable 
            columns={employeeColumns}
            data={displayData}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            emptyMessage="No attendance records found yet."
        />
    );
};

export default AttendanceViewEmployee;
