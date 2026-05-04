import React from "react";
import Button from "../../../components/Button";
import { AttendanceTableProps,Column } from "../../../types/attendanceTableType";


const AttendanceTable = <T extends { id?: number | string }>({
    columns,
    data,
    loading,
    page,
    totalPages,
    onPageChange,
    onRowClick,
    emptyMessage = "No records found.",
}: AttendanceTableProps<T>) => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50">
                            {columns.map((col, index: number) => (
                                <th key={index}
                                    className={`pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan={columns.length} className="py-6 text-center text-sm font-bold text-slate-400">Loading...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={columns.length} className="py-6 text-center text-sm font-bold text-slate-400">{emptyMessage}</td></tr>
                        ) : data.map((record, rowIndex: number) => (
                            <tr
                                key={record.id || rowIndex}
                                onClick={() => onRowClick && onRowClick(record)}
                                className={`group hover:bg-slate-50/50 transition-colors ${onRowClick ? 'cursor-pointer active:bg-slate-100' : ''}`}
                            >
                                {columns.map((col, colIndex: number) => {
                                    const cellContent = "render" in col && typeof col.render === "function"
                                        ? col.render(record)
                                        : (record[col.accessor] as React.ReactNode);

                                    return (
                                        <td key={colIndex} className={`py-6 ${col.cellClassName || ''}`}>
                                            {cellContent}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {(onPageChange && totalPages !== undefined) && (
                <div className="flex justify-between items-center pt-8 border-t border-slate-50 mt-8">
                    <Button
                        variant="secondary"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-bold text-slate-400">Page {page} of {totalPages || 1}</span>
                    <Button
                        variant="secondary"
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </>
    );
};

export default AttendanceTable;
