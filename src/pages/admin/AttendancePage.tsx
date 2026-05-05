import React, { useState, useEffect } from "react";
import { useAdminAttendanceRecords } from "../../features/attendance/hooks/useAdminAttendanceRecords";
import { useAdminAttendanceSummary } from "../../features/attendance/hooks/useAdminAttendanceSummary";
import AttendanceViewAdmin from "../../features/attendance/components/AttendanceView.admin";
import AttendanceFilters from "../../features/attendance/components/AttendanceFilters";
import ManualEntryModal from "../../features/attendance/components/ManualEntryModal";
import EditAttendanceModal from "../../features/attendance/components/EditAttendanceModal";
import Card from "../../components/Card";
import Button from "../../components/Button";
import type { FormEvent } from "react";
import type {
    AttendanceRecord,
} from "../../types/attendanceTypes";

const AttendancePage = () => {
    const { records: allAttendanceRecords, loading: loadingRecords, totalPages, fetchRecords } = useAdminAttendanceRecords();
    const { summary, loading: loadingSummary, fetchSummary } = useAdminAttendanceSummary();

    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [attendancePage, setAttendancePage] = useState(1);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchRecords(attendancePage, 10, dateFilter, statusFilter);
    }, [attendancePage, dateFilter, statusFilter, fetchRecords]);

    const handleRowClick = (record: AttendanceRecord) => {
        setSelectedRecord(record);
        setIsEditModalOpen(true);
    };

    const handleCorrectionSuccess = () => {
        fetchRecords(attendancePage, 10, dateFilter, statusFilter);
        fetchSummary();
        setIsEditModalOpen(false);
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            {/* Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card compact className="border-l-4 border-l-slate-900">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-3xl font-black text-slate-900">{summary?.total ?? '-'}</p>
                </Card>
                <Card compact className="border-l-4 border-l-emerald-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Present</p>
                    <p className="text-3xl font-black text-emerald-600">{summary?.present ?? '-'}</p>
                </Card>
                <Card compact className="border-l-4 border-l-amber-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Late</p>
                    <p className="text-3xl font-black text-amber-600">{summary?.late ?? '-'}</p>
                </Card>
                <Card compact className="border-l-4 border-l-indigo-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Half/Short</p>
                    <p className="text-3xl font-black text-indigo-600">{(summary?.halfDay ?? 0) + (summary?.shortDay ?? 0)}</p>
                </Card>
                <Card compact className="border-l-4 border-l-rose-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Absent</p>
                    <p className="text-3xl font-black text-rose-600">{summary?.absent ?? '-'}</p>
                </Card>
            </div>

            <Card 
                title="Attendance Logs"
                subtitle="Comprehensive history of all employee records"
                headerAction={
                    <Button 
                        variant="primary" 
                        onClick={() => setIsModalOpen(true)}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}
                    >
                        Manual Correction
                    </Button>
                }
            >
                <AttendanceFilters 
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setAttendancePage={setAttendancePage}
                />

                <AttendanceViewAdmin
                    data={allAttendanceRecords}
                    loading={loadingRecords}
                    page={attendancePage}
                    totalPages={totalPages}
                    onPageChange={setAttendancePage}
                    onRowClick={handleRowClick}
                />
            </Card>
            
            <ManualEntryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCorrectionSuccess}
            />
            <EditAttendanceModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                record={selectedRecord}
                onSuccess={handleCorrectionSuccess}
            />
        </div>
    );
};

export default AttendancePage;
