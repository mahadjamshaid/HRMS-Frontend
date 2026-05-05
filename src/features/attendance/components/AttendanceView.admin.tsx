import React from "react";
import AttendanceTable from "./AttendanceTable";
import Badge from "../../../components/Badge";
import { Column } from "../../../types/attendanceTableType";
import { AttendanceRecord, AttendanceViewAdminProps } from "../../../types/adminViewType";

const AttendanceViewAdmin = ({ data, loading, page = 1, totalPages, onPageChange, onRowClick }: AttendanceViewAdminProps) => {
    const adminColumns: Column<AttendanceRecord>[] = [
        {
            header: "Employee",
            render: (record) => (
                <div>
                    <p className="text-sm font-black text-slate-900">{record.employeeName || "Unknown"}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{record.employeeDepartment || "N/A"}</p>
                </div>
            )
        },
        {
            header: "Date",
            cellClassName: "text-sm font-bold text-slate-600",
            render: (record) => record.attendanceDate
        },
        {
            header: "Check In",
            cellClassName: "text-sm font-black text-slate-900",
            render: (record) => record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'
        },
        {
            header: "Check Out",
            cellClassName: "text-sm font-black text-slate-900",
            render: (record) => record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'
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
        }
    ];

    return (
        <AttendanceTable
            columns={adminColumns}
            data={data}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onRowClick={onRowClick}
        />
    );
};

export default AttendanceViewAdmin;
