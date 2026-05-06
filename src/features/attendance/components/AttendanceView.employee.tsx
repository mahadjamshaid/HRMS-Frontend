import React from "react";
import AttendanceTable from "./AttendanceTable";
import WorkHoursWidget from "./WorkHoursWidget";
import { formatLongDate, formatWeekday } from "../../../utils/dateUtils";
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
            header: "Check In",
            cellClassName: "text-sm font-black text-slate-900",
            render: (record) => record.checkInTime || "--:--"
        },
        {
            header: "Check Out",
            cellClassName: "text-sm font-black text-slate-900",
            render: (record) => record.checkOutTime || "--:--"
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
                requiredWorkMinutes={record.requiredWorkMinutes}
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
